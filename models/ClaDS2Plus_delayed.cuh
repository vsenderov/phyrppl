/**
 * ClaDS2+ Model with manual delayed sampling.
 * - based on ClaDS2 model
 * - contains rare large shifts 
 */

#define MAX_FACTOR 1e5
#define MIN_FACTOR 1e-5
#define SINGULARITY_PROTECTION false
#define RARE_SHIFT false

BBLOCK_DATA(tree, tree_t, 1)
BBLOCK_DATA_CONST(rho, floating_t, rhoConst)

typedef short treeIdx_t;

struct progState_t {
  floating_t factors[(tree->NUM_NODES)];
  // TODO
  // Technically we don't need a factor for the root (it is assumed to be 1)
  // But for now we are going to waste one posistion for easier debugging.

  int nshifts;

  // Distributions, use underscores to denote distributions
  gamma_t lambda_0;
  gamma_t mu_0;
  normalInverseGamma_t alpha_sigma;
  beta_t ab;
  
  // Final Values/ Hyperparameters
  // TODO do we need all?
  floating_t lambda0;
  floating_t mu0;
  floating_t alpha;
  floating_t sigma;
  floating_t epsilon;
  floating_t pEpsilon;
  treeIdx_t treeIdx;
};

// NUM_BBLOCKS needs to be specified in the including file
INIT_MODEL(progState_t, NUM_BBLOCKS)

/**
 * Simulate hidden side branches 
 * return TRUE if hidden branch is not sampled.
 * bool
 * floating_t startTime
 * gamma_t& lambda_0
 * gamma_t& mu_0
 * floating_t factor
 * normalInverseGamma_t& alpha_sigma 
 * beta_t& ab)
 *
 * Side effect: proposal for lambda_0 and mu_0 are updated
 */
BBLOCK_HELPER(ClaDSPlus_goesUndetected, {
    // GUARD 1
    if (factor > MAX_FACTOR) {
      return false; 
    }
    if (factor < MIN_FACTOR) {
      return false;
    }
    // END GUARD 1

    // TODO rename sample_GammaExponential to GammaExponential
    floating_t waitingTime_speciation = SAMPLE(sample_GammaExponential, lambda_0, factor);
    floating_t waitingTime_extinction = SAMPLE(sample_GammaExponential, mu_0, factor);
    floating_t t                      = MIN(waitingTime_speciation, waitingTime_extinction);
   
    floating_t currentTime = startTime - t;
    if(currentTime < 0) { // we are in the future, rho is the detection probability
        bool undetected = !SAMPLE(bernoulli, rho);  
        return undetected;
    }
   
    bool speciation =  (waitingTime_speciation < waitingTime_extinction) ? true : false;
    bool extinction = !speciation;
    if(extinction) {
      return true;
    }
    
    // Realizes the new factor by which the current lambda (= lambda_0 x old factors)
    // is going to be multiplied. One for left and right.
    // TODO rename so that there is no sample
    floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
    floating_t f2 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);

    // Nicolas' optimization: follow lower rate first
    if (SINGULARITY_PROTECTION) {
      if (f2 < f1) {
	floating_t tf = f1;
	f1 = f2;
	f2 = tf;
      }  // invariant: f1 is always smaller or equal than f2
      assert(f1 <= f2);
    }

    // "+" rarely, we will reset factor
    if (RARE_SHIFT) {
     
      int rareEvent = SAMPLE(betaBernoulli, ab);
      if (rareEvent) {
	//factor = 1.0;
	factor = SAMPLE(uniform, 0.0, 1.0);
       //printf("+");
       }
    }
    
    bool ret1 = BBLOCK_CALL(ClaDSPlus_goesUndetected, currentTime, lambda_0, mu_0, factor*exp(f1), alpha_sigma, ab);
    
    bool leftDetection = !ret1;
    if (leftDetection) return ret1; // no need to descend to the right side of the tree
    
    bool ret2 = BBLOCK_CALL(ClaDSPlus_goesUndetected, currentTime, lambda_0, mu_0, factor*exp(f2), alpha_sigma, ab);
    return ret2;
    
  }, bool, floating_t startTime, gamma_t& lambda_0, gamma_t& mu_0, floating_t factor, normalInverseGamma_t& alpha_sigma, beta_t& ab)


/** 
 * Return type of simBranch
 *   - r0 the accumulated factors along the branch
 *   - r1 if there was a big shift on TODO
 *   - r2 the accumulated probability along the branch
 */
struct simBranchReturn_t {
    floating_t r0;
    floating_t r1;
    floating_t r2;

    DEV simBranchReturn_t(){};

    DEV simBranchReturn_t(floating_t r0_, floating_t r1_, floating_t r2_) {
        r0 = r0_;
        r1 = r1_;
        r2 = r2_;
    }
};




/** Simulates the hidden speciation events along a branch
 * Returns simBranchReturn_t
 *  - floating_t startTime
 *  - floating_t stopTime
 *  - gamma_t& lambda_0
 *  - gamma_t& mu_0
 *  - floating_t factor
 *  - normalInverseGamma_t& alpha_sigma
 *  - beta_t& ab
 * has side-effects!
 */
BBLOCK_HELPER(simBranchDelayed, {
    floating_t t1 = startTime - stopTime;
    assert(0.0 <= t1);
    
    // GUARD 2/2
    if (factor > 1e5 ) {
      simBranchReturn_t ret(0.0, 0.0, -INFINITY);
      return ret;
    }

    if (factor < 1e-5) {
      simBranchReturn_t ret(factor, 0.0, -INFINITY);
      return ret;
    }
    // END GUARD 2/2

    // TODO rename
    floating_t t = SAMPLE(sample_GammaExponential, lambda_0, factor);
    floating_t currentTime = startTime - t;
    
    if(currentTime <= stopTime) {
      floating_t ret1 = score_GammaPoisson(0, t1, mu_0, factor);
      simBranchReturn_t ret(factor, 0.0, ret1);
      return ret;
    }
    
    // sample factors for left and right subtrees
    floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
    floating_t f2 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);

    // For now we don't have singularity protection here, because not obvious it's correct
    //if (SINGULARITY_PROTECTION) {
    //  if (f2 < f1) {
    //	floating_t tf = f1;
    //	f1 = f2;
//	f2 = tf;
  //    }
    //}
    
    if (RARE_SHIFT) {  
     
      int rareEvent = SAMPLE(betaBernoulli, ab);
      if (rareEvent) {
	//        factor = 1.0;
	factor = SAMPLE(uniform, 0.0, 1.0);
	PSTATE.nshifts++;
        // printf("-");
         }
    }
    
    // we need to check if the side was undetected
    // w.l.o.g. we choose the left side to die
    bool sideUndetected = BBLOCK_CALL(ClaDSPlus_goesUndetected, currentTime, lambda_0, mu_0, factor*exp(f1), alpha_sigma, ab);

    if(! sideUndetected) {
      // this particle needs to die
      simBranchReturn_t ret(0.0, 0.0, -INFINITY);
      return ret;
    }
    
    // Now we will enter into the recursion to process the rest of the branch
    // and accummulate the factor
    simBranchReturn_t ret7 = BBLOCK_CALL(simBranchDelayed, currentTime, stopTime, lambda_0, mu_0, factor*exp(f2), alpha_sigma, ab);
    
    floating_t extinctionProb = score_GammaPoisson(0, t, mu_0, factor);  // branch didn't go extinct
    
    // Now gather all weights and add 2 for the end of the branch
    simBranchReturn_t rt(ret7.r0, 0.0, ret7.r2 + log(2.0) + extinctionProb);
    
    return rt;
  }, simBranchReturn_t, floating_t startTime, floating_t stopTime, gamma_t& lambda_0, gamma_t& mu_0, floating_t factor, normalInverseGamma_t& alpha_sigma, beta_t& ab);



 



// Not called on root as in WebPPL, instead root is handled in simClaDS2 bblock
BBLOCK(simTree, {
    // Fetch tree data
    tree_t* treeP = DATA_POINTER(tree);
    treeIdx_t treeIdx = PSTATE.treeIdx;
    
    // Terminate if tree is fully traversed
    if(treeIdx == -1) {
      PC++;
      BBLOCK_CALL(DATA_POINTER(bblocksArr)[PC], NULL);
      return;
    }
    
    PSTATE.treeIdx = treeP->idxNext[treeIdx];
    
    int indexParent = treeP->idxParent[treeIdx];
       
    //floating_t factor = PSTATE.factors[treeIdx];
    
    simBranchReturn_t ret =
      BBLOCK_CALL(simBranchDelayed,
		  treeP->ages[indexParent], treeP->ages[treeIdx],
		  PSTATE.lambda_0, PSTATE.mu_0,
		  PSTATE.factors[treeIdx], PSTATE.alpha_sigma, PSTATE.ab);

    floating_t factorEnd = ret.r0;
     
   
    
    //PSTATE.factorEndArr[treeIdx] = factorEnd;
    
    bool interiorNode = treeP->idxLeft[treeIdx] != -1 || treeP->idxRight[treeIdx] != -1;
    floating_t lnTerminalProb =
      interiorNode ? score_GammaExponential(0, PSTATE.lambda_0, factorEnd) : log(rho);
    WEIGHT(ret.r2 + lnTerminalProb);
   
       
    if(interiorNode) {
      if (RARE_SHIFT) {  
	
	int rareEvent = SAMPLE(betaBernoulli, PSTATE.ab);
	if (rareEvent) {
	  PSTATE.nshifts++;
	  //	  factorEnd = 1.0;
	  factorEnd = SAMPLE(uniform, 0.0, 1.0);
	 
	}
      }
      floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
      floating_t f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);

      floating_t leftf = factorEnd*exp(f1);
      floating_t rightf = factorEnd*exp(f2);
      
      PSTATE.factors[treeP->idxLeft[treeIdx]] = leftf;
      PSTATE.factors[treeP->idxRight[treeIdx]] = rightf;
    }
})


 
BBLOCK(simClaDS2, {
    tree_t* treeP = DATA_POINTER(tree);
    PSTATE.treeIdx = treeP->idxLeft[ROOT_IDX];
    gamma_t lambda_0(k, theta);
    gamma_t mu_0(kMu, thetaMu);
    beta_t ab(a_epsilon, b_epsilon);

    //floating_t sigmaSquared = 1.0 / SAMPLE(gamma, 1.0, 1.0 / 0.2);
    //floating_t sigma = sqrt(sigmaSquared);
    //floating_t alpha = exp(SAMPLE(normal, 0.0, sigma));
    // * σ^2 | a,b ~ InverseGamma(a, b)
    // * m ~ N(m0, v σ^2)
    
    normalInverseGamma_t alpha_sigma(m0, v, a, b);
    //    floating_t epsilon = SAMPLE(uniform, 0.0, 1.0);
    floating_t factor = 1.0;
    
    PSTATE.lambda_0 = lambda_0;
    PSTATE.mu_0 = mu_0;
    PSTATE.alpha_sigma = alpha_sigma;
    PSTATE.ab = ab;
    //PSTATE.epsilon = epsilon;
    PSTATE.nshifts = 0;
 
    // Correction Factor
    int numLeaves = countLeaves(treeP->idxLeft, treeP->idxRight, treeP->NUM_NODES);
    floating_t corrFactor = (numLeaves - 1) * log(2.0) - lnFactorial(numLeaves);
    WEIGHT(corrFactor);
    
    floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
    floating_t f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);

    floating_t leftf = factor*exp(f1);
    floating_t rightf = factor*exp(f2);

    
    PSTATE.factors[PSTATE.treeIdx] = leftf;
    PSTATE.factors[treeP->idxRight[ROOT_IDX]] = rightf;

    PC++;
    BBLOCK_CALL(simTree);
    
})


// Should be equivalent to forward sampling
BBLOCK(conditionOnDetection, {

    tree_t* treeP = DATA_POINTER(tree);
    floating_t treeAge = treeP->ages[ROOT_IDX];
    // floating_t factor = PSTATE.stack.pop();
    floating_t factor = 1.0;
    
    // floating_t epsilon = PSTATE.epsilon;
    // floating_t rho = PSTATE.rho;

    int numSamples = 100;
    int numDetected = 0;
    for(int i = 0; i < numSamples; i++) {
      bool undetected = BBLOCK_CALL(ClaDSPlus_goesUndetected, treeAge, PSTATE.lambda_0, PSTATE.mu_0, factor, PSTATE.alpha_sigma, PSTATE.ab);
        if(! undetected)
            numDetected++;
    }
    //printf("condition weihght: %f", -2.0 * log(numDetected / static_cast<floating_t>(numSamples)) );
    WEIGHT(-2.0 * log(numDetected / static_cast<floating_t>(numSamples)));
    PC++;
})




BBLOCK(justResample, {
    //std::cout << "Resampling...\r\r\r\r\r\r\r\r\r\r\r\r";
    PC++;
})



BBLOCK(sampleFinalLambda, {
    PSTATE.lambda0 = SAMPLE(gamma, PSTATE.lambda_0.k, PSTATE.lambda_0.theta);
    PSTATE.mu0 = SAMPLE(gamma, PSTATE.mu_0.k, PSTATE.mu_0.theta);
    PSTATE.epsilon = PSTATE.mu0/PSTATE.lambda0;
    
    floating_t sigmaSquared = 1.0 / SAMPLE(gamma, PSTATE.alpha_sigma.a, 1.0 / PSTATE.alpha_sigma.b);
    PSTATE.sigma = sigmaSquared;
    PSTATE.alpha = SAMPLE(normal, PSTATE.alpha_sigma.m0, 1/PSTATE.alpha_sigma.v * PSTATE.sigma);
    PC++;
})
 


CALLBACK(saveResults, {
    printf("lambda0_k, lambda_0.theta, mu_0.k, mu_0.theta, alphaSigma.a, alphaSigma.b, alphaSigma.m0, alphaSigma.v, nshifts\n");

    floating_t maxWeight = WEIGHTS[0];
    for (int i = 1; i < N; i++) if (WEIGHTS[i] > maxWeight) maxWeight = WEIGHTS[i];

    /* Use the weights to choose the subsample in a numerically stable way. */
    floating_t probs[N]; 
    for (int i = 0; i < N; i++) probs[i] = exp(WEIGHTS[i] - maxWeight) ;
    
    for (int j = 0; j < M; j++) {
      int k = SAMPLE(discrete, probs, N);
      printf("%f, %f, %f, %f, %f, %f, %f, %f, %d\n", PSTATES[k].lambda_0.k, PSTATES[k].lambda_0.theta, PSTATES[k].mu_0.k, PSTATES[k].mu_0.theta, PSTATES[k].alpha_sigma.a, PSTATES[k].alpha_sigma.b, PSTATES[k].alpha_sigma.m0, PSTATES[k].alpha_sigma.v, PSTATES[k].nshifts);
    }
  })

