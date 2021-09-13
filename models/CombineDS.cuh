/* 
 *  models/CombineDS.cuh
 *
 *  Copyright (C) 2020-2021 Viktor Senderov and TODO paper authors
 *
 *  CombineDS diversification model sconditionally simulates several
 *  different types of evolution:
 *
 *    - cladogenetic (ClaDS-like) changes in diversification
 *      rates, ClaDS versions 0-2. TODO version 0
 *	      
 *    - anagenetic (happening on a single lineage)
 *
 *    - a second distribution from which occasionallu rare (larger)
 *      shits are drawn 
 *
 *    - uncoupling (redrawing) of the turnover and anagenesis rates at
 *        the rare shifts points
 *
 *  This file needs to be included by a .cu file (TODO), containing
 *  the MAIN macro, needed global parameters, needed tuning
 *  parameters, and the tree structure as a datatype.
 * 
 *  Needed global parameters (with examples):
 * 
 *    const floating_t k = 1;            // prior Γ-shape for λ
 *    const floating_t theta = 1;        // prior Γ-scale for λ
 *
 *    const floating_t epsilon = SAMPLE(uniform, a_epsilon, b_epsilon);   // rescaling for μ_0
 *    const floating_t upsilon = SAMPLE(uniform, a_upsilon, b_upsilon;    // rescaling for ν_0
 *
 *    const floating_t a_epsilon = 0; 
 *    const floating_t a_epsilon = 1; 
 *    const floating_t a_upsilon = 0; 
 *    const floating_t a_upsilon = 1; 
 *
 *    const floating_t m0 = 0;   // Hyper-param of prior for α and σ
 *    const floating_t v = 1;    // Hyper-param of prior for α and σ
 *    const floating_t a = 1.0;  // Hyper-param of prior for α and σ
 *    const floating_t b = 0.2;  // Hyper-param of prior for α and σ
 *
 *    // Hyper-param of prior for α and σ (large shifts)
 *    const floating_t m0_rare = 0;  
 *    const floating_t v_rare = 1;   
 *    const floating_t a_rare = 1.0;  
 *    const floating_t b_rare = 0.2;
 * 
 *  Needed tuning parameters:
 *
 *    #define CLADS true                   // Cladogenetic changes
 *    #define CONST_EXTINCTION false
 *    #define NO_EXTINCTION false          //TODO
 *    #define ANADS true                   // Anagenetic changes
 *    #define CONST_ANAGENESIS false
 *    #define RARE_SHIFT false             // Activate rare shifts
 *    #define UNCOUPLE true                // Uncouples turnover and anagesis rates at rare shifts
 *
 *    #define M 20                         // Number of subsamples to draw
 *    #define DEBUG false                  // debugging output
 *    #define GUARD true
 *    #define MAX_FACTOR 1e5 
 *    #define MIN_FACTOR 1e-5
 *
 *  Tree selection, 3 steps:
 *
 *    #include "trees/cetaceans.cuh"       // (1)
 *    typedef cetaceans_87_tree_t tree_t;  // (2)
 *    const floating_t rhoConst = 1.00;    // (3) sampling rate
 *
 *  models/CombineDS.cuh defines the following BBLOCKS that can be included
 *  in the MAIN macro:
 *
 *    - simCombinedDS         (required)
 *
 *    - simTree               (required)
 *
 *    - conditionOnDetection  (optional, corrects for survivorship bias)
 *
 *    - sampleFinalLambda     (optional, samples the global parameters,
 *                             which have been delayed)
 *
 *    - saveResults           (optional callback, needs to be used in 
 *                             conjunction with sampleFinalLambda)
 */

BBLOCK_DATA(tree, tree_t, 1)
BBLOCK_DATA_CONST(rho, floating_t, rhoConst)
typedef short treeIdx_t;

struct progState_t {
  floating_t factors[(tree->NUM_NODES)] = {1.0}; // first is 1, all other 0 for now
  // TODO
  // Technically we don't need a factor for the root (it is assumed to be 1)
  // But for now we are going to waste one posistion for easier debugging.

  floating_t turnover_rates[(tree->NUM_NODES)]; // used to multiply the scale of μ
  //floating_t anagenesis_rates[(tree->NUM_NODES)]; // TODO
  
  bool cladsShifts[(tree->NUM_NODES)] = {0}; // initalize with 0 
  bool anadsShifts[(tree->NUM_NODES)] = {0};
  
  // Distributions, use underscores to denote distributions
  gamma_t lambda_0;
  gamma_t mu_0;
  gamma_t nu; // TODO rename to nu_0
  normalInverseGamma_t alpha_sigma;
  normalInverseGamma_t alpha_sigma_rare;
  beta_t ab;
  
  // Final Values/ Hyperparameters
  floating_t lambda0;
  floating_t mu0;
  //  floating_t nu; // name clash
  floating_t alpha;
  floating_t sigma;
  floating_t alpha_rare;
  floating_t sigma_rare;
  floating_t pEpsilon; // probability of large shift
  treeIdx_t treeIdx;
  int nshifts_clads;   // number of shifts
  int nshifts_anads;
  // TODO maybe no need to store these in each particle as globally same?
  floating_t epsilon;
  floating_t ypsilon;
};

INIT_MODEL(progState_t, NUM_BBLOCKS)

/*
 * simCombineDS - required BBLOCK
 */
BBLOCK(simCombineDS,
{
  // Set up tree traversal
  tree_t* treeP = DATA_POINTER(tree);
  PSTATE.treeIdx = treeP->idxLeft[ROOT_IDX];
  
  // Draw initial rates, or delayed declare them
  gamma_t lambda_0(k, theta);
  gamma_t mu_0(k, theta);
  gamma_t nu(k, theta);
  beta_t ab(a_epsilon, b_epsilon);
  normalInverseGamma_t alpha_sigma(m0, v, a, b);
  normalInverseGamma_t alpha_sigma_rare(m0_rare, v_rare, a_rare, b_rare);

  PSTATE.epsilon = epsilon;
  PSTATE.lambda_0 = lambda_0;
  PSTATE.mu_0 = mu_0;
  PSTATE.nu = nu;
  PSTATE.ab = ab;
  PSTATE.alpha_sigma = alpha_sigma;
  PSTATE.alpha_sigma_rare = alpha_sigma_rare;
  
  // Correction factor
  int numLeaves = countLeaves(treeP->idxLeft, treeP->idxRight, treeP->NUM_NODES);
  floating_t corrFactor = (numLeaves - 1) * log(2.0) - lnFactorial(numLeaves);
  WEIGHT(corrFactor);

  // CRBD case
  floating_t leftf = 1.0;
  floating_t rightf = 1.0;
  
  // Optional cladogenetic event
  if (CLADS) {
    floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
    floating_t f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
    // We cannot sort here because traversing set tree!
    // Cannot have a rare shift here, because meaningless; both factors are 1.
    // Initial multiplier is 1.0
    leftf = exp(f1);
    rightf = exp(f2);
    
  }

  // The factors that are saved are the total accumulated factors
  PSTATE.factors[PSTATE.treeIdx] = leftf; // same a treeP->idxLeft[ROOT_IDX]
  PSTATE.factors[treeP->idxRight[ROOT_IDX]] = rightf;
  PSTATE.turnover_rates[PSTATE.treeIdx] = epsilon;
  PSTATE.turnover_rates[treeP->idxRight[ROOT_IDX]] = epsilon;
      
  // Advance to next BBLOCK
  PC++;
   
  // We don't need the following?
  // BBLOCK_CALL(DATA_POINTER(bblocksArr)[PC], NULL);
  // BBLOCK_CALL(simTree);
})


/* 
 * simBranchReturn_t - return type
 *
 *   - floating_t r0  the accumulated factors along the branch
 *   - floating_t r1  the new turnover-rate
 *   - floating_t r2  the accumulated probability along the branch
 *   - bool rc        a cladogenetic shift
 *   - bool ra        an anagenetic shift        
 */
struct simBranchReturn_t {
  floating_t r0;
  floating_t r1;
  floating_t r2;
  bool rc;
  bool ra;

  DEV simBranchReturn_t(){};
  
  DEV simBranchReturn_t(floating_t r0_, floating_t r1_, floating_t r2_, bool rc_, bool ra_) {
    r0 = r0_;
    r1 = r1_;
    r2 = r2_;
    rc = rc_;
    ra = ra_;
  }
};


int order3(floating_t x1, floating_t x2, floating_t x3) {
  return x1 <= x2 ?
    (x1 <= x3 ? 1 : 3) : (x2 <= x3 ? 2 : 3);
}

#define SWAPIF(f1, f2) if (f2 < f1) { \
  floating_t tf = f1; \
  f1 = f2; \
  f2 = tf; \
  }	   \
  assert(f1 <= f2);


/*
 * goesUndetected - helper function
 *
 * boolean, simulates hidden tree, returns probability of the hidden
 * tree not being detected at present
 *
 * Side effect: proposals are updated
 */
BBLOCK_HELPER(goesUndetected,
{
  if (DEBUG) depth++;
    
  if (GUARD && (CLADS || ANADS)) {
      if (factor > MAX_FACTOR) {
      return false; 
    }
    if (factor < MIN_FACTOR) {
      return false;
    } 
  }

  floating_t waitingTime_speciation = SAMPLE(sample_GammaExponential, lambda_0, factor);
  floating_t waitingTime_extinction = CONST_EXTINCTION ? SAMPLE(sample_GammaExponential, mu_0, epsilon) : SAMPLE(sample_GammaExponential, mu_0, factor*epsilon);
  floating_t waitingTime_anagenesis = ANADS ? (CONST_ANAGENESIS ? SAMPLE(sample_GammaExponential, nu, ypsilon) : SAMPLE(sample_GammaExponential, nu, factor*ypsilon) ) : INFINITY;
  floating_t t                      = MIN(waitingTime_speciation, waitingTime_extinction);

  if (DEBUG) printf("%f %f %f %f %f %f %d %d\n", factor, epsilon, ypsilon, waitingTime_speciation,  waitingTime_extinction, waitingTime_anagenesis,  order3(waitingTime_speciation, waitingTime_extinction, waitingTime_anagenesis), depth);

  if (t < waitingTime_anagenesis) { // cladogenetic or CRBD case
    floating_t currentTime = startTime - t;
    
    if (currentTime < 0) { // we are in the future, rho is the detection probability
      bool undetected = !SAMPLE(bernoulli, rhoLocal);
      return undetected;
    }
    
    bool speciation =  (waitingTime_speciation < waitingTime_extinction) ? true : false;
    bool extinction = !speciation;
    if(extinction) {
      return true;
    }
    
    // Speciation
    // CRBD case
    floating_t f1 = 0.0;
    floating_t f2 = 0.0;
    
    if (CLADS) { // cladogenetic change
      if (RARE_SHIFT && SAMPLE(betaBernoulli, ab)) {
	f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_rare);
	f2 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_rare);

	SWAPIF(f1, f2);
	
	if (UNCOUPLE) {
	  // new turnover rate will aply to both left and right branch
	  epsilon = SAMPLE(uniform, 0.0, 1.0);
	  // ypsilon = SAMPLE(uniform, 0.0, 1.0); // TODO
	} 
      }
      else  { // not RARE_SHIFT or event didn't happen
	f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
	f2 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
      
	if (f2 < f1) { // TODO replace with SWAPIF
	  floating_t tf = f1;
	  f1 = f2;
	  f2 = tf;
	}  // invariant: f1 is always smaller or equal than f2
	assert(f1 <= f2);
      }
    }

    bool ret1 = BBLOCK_CALL(goesUndetected, currentTime, lambda_0, mu_0, nu, factor*exp(f1), epsilon, alpha_sigma, alpha_sigma_rare, ab, rhoLocal);
    bool leftDetection = !ret1;
    if (leftDetection) return ret1; // no need to descend to the right side of the tree
    bool ret2 = BBLOCK_CALL(goesUndetected, currentTime, lambda_0, mu_0, nu, factor*exp(f2), epsilon, alpha_sigma, alpha_sigma_rare, ab, rhoLocal);
    return ret2;
  }
  
  else { // anagenesis
    floating_t currentTime = startTime - waitingTime_anagenesis;
    if (currentTime <0 ) {
      bool undetected = !SAMPLE(bernoulli, rhoLocal);
      return undetected;
    }
      
    floating_t f1 = 0.0;
    if (RARE_SHIFT && SAMPLE(betaBernoulli, ab)) { // rare shifts on and event happened
      f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_rare);
      if (UNCOUPLE) {
	epsilon = SAMPLE(uniform, 0.0, 1.0);
	//ypsilon = SAMPLE(uniform, 0.0, 1.0); TODO
      }
    }
    else { // rare event didn't happen or shifts turned off
      f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
    }

    bool ret1 = BBLOCK_CALL(goesUndetected, currentTime, lambda_0, mu_0, nu, factor*exp(f1), epsilon, alpha_sigma, alpha_sigma_rare, ab, rhoLocal);
    return ret1;
  }
},
		bool,
		floating_t startTime,
		gamma_t& lambda_0,
		gamma_t& mu_0,
		gamma_t& nu,
		floating_t factor,
		floating_t epsilon,
		normalInverseGamma_t& alpha_sigma,
		normalInverseGamma_t& alpha_sigma_rare,
		beta_t& ab,
		floating_t rhoLocal)



/* 
 * simBranch - helper to simTree
 * 
 *  - has side-effects on arguments
 *
 */
BBLOCK_HELPER(simBranch,
{ 		   
  floating_t branchLengthTime = startTime - stopTime;
  assert(0.0 <= branchLengthTime);
  if(GUARD && (ANADS || CLADS)) {
    if (factor > MAX_FACTOR) {
      simBranchReturn_t ret(factor, epsilon, -INFINITY, cladogeneticShift, anageneticShift);
      return ret;
    }
    if (factor < MIN_FACTOR) {
      simBranchReturn_t ret(factor, epsilon, -INFINITY, cladogeneticShift, anageneticShift);
      return ret;
    }
  }
  floating_t t = SAMPLE(sample_GammaExponential, lambda_0, factor);
  // The anagenetic shift rate itself doesn't change.
  // floating_t tAnagenetic = ANADS ? SAMPLE(sample_GammaExponential, nu, 1.0) : INFINITY;
  floating_t tAnagenetic = ANADS ? (CONST_ANAGENESIS ? SAMPLE(sample_GammaExponential, nu, ypsilon) : SAMPLE(sample_GammaExponential, nu, factor*ypsilon) ) : INFINITY;
  
  if (t <= tAnagenetic) { //Cladogenetic or CRBD case
    floating_t currentTime = startTime - t;
    if(currentTime <= stopTime) {
      floating_t ret1 = CONST_EXTINCTION ? score_GammaPoisson(0, branchLengthTime, mu_0, epsilon) : score_GammaPoisson(0, branchLengthTime, mu_0, factor*epsilon);
      simBranchReturn_t ret(factor, epsilon, ret1, cladogeneticShift, anageneticShift);
      return ret;
    }
    // CRBD case
    floating_t f1 = 0.0;
    floating_t f2 = 0.0;
    // sample factors for left and right subtrees
    if (CLADS) {
      cladogeneticShift = true;
      if (RARE_SHIFT && SAMPLE(betaBernoulli, ab)) {  
	f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_rare);
	f2 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_rare);
	if (UNCOUPLE) {
	  epsilon = SAMPLE(uniform, 0.0, 1.0);
	  //	  ypsilon = SAMPLE(uniform, 0.0, 1.0); TODO
	}
      }
      else {
	f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
	f2 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
	// cannot swap here
      }
    }

    if (DEBUG) {
      depth = 0;
    }
    
    // we need to check if the side was undetected
    // w.l.o.g. we choose the left side to die
    bool sideUndetected = BBLOCK_CALL(goesUndetected, currentTime, lambda_0, mu_0, nu, factor*exp(f1), epsilon, alpha_sigma, alpha_sigma_rare, ab, rhoLocal);
    if(!sideUndetected) {
      // this particle needs to die
      simBranchReturn_t ret(factor, epsilon, -INFINITY, cladogeneticShift, anageneticShift);
      return ret;
    }
    // Now we will enter into the recursion to process the rest of the branch
    // and accummulate the factor
    simBranchReturn_t ret2 = BBLOCK_CALL(simBranch, currentTime, stopTime, lambda_0, mu_0, nu, factor*exp(f2), epsilon, alpha_sigma, alpha_sigma_rare, ab, rhoLocal, cladogeneticShift, anageneticShift);
    
    floating_t extinctionProb = CONST_EXTINCTION? score_GammaPoisson(0, t, mu_0, epsilon) : score_GammaPoisson(0, t, mu_0, factor*epsilon);  // branch didn't go extinct
   //floating_t extinctionProb = score_GammaPoisson(0, t, mu_0, factor);  // branch didn't go extinct
    // Now gather all weights and add 2 for the end of the branch
    simBranchReturn_t rt(ret2.r0, ret2.r1, ret2.r2 + log(2.0) + extinctionProb, ret2.rc, ret2.ra);
    return rt;
  }

  else if (tAnagenetic < t) { // Anagenetic shift
    floating_t currentTime = startTime - tAnagenetic;
    if(currentTime <= stopTime) {
      floating_t ret1 = CONST_EXTINCTION? score_GammaPoisson(0, branchLengthTime, mu_0, epsilon) : score_GammaPoisson(0, branchLengthTime, mu_0, factor*epsilon);
      simBranchReturn_t ret(factor, epsilon, ret1, cladogeneticShift, anageneticShift);
      return ret;
    }
    // sample new multiplier
    floating_t f1 = 0.0;
    if (RARE_SHIFT && SAMPLE(betaBernoulli, ab)) {  
      f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_rare);
     	 if (UNCOUPLE) {
     	    // new turnover rate will aply to both left and right branch
     	    epsilon = SAMPLE(uniform, 0.0, 1.0);
	    //	    ypsilon = SAMPLE(uniform, 0.0, 1.0); TODO
       }
    }
    else { // common shift
      f1 = SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
    }
    // Now we will enter into the recursion to process the rest of the branch
    // and accummulate the factor
    simBranchReturn_t ret2 = BBLOCK_CALL(simBranch, currentTime, stopTime, lambda_0, mu_0, nu, factor*exp(f1), epsilon, alpha_sigma, alpha_sigma_rare, ab, rhoLocal, cladogeneticShift, true);
    floating_t extinctionProb = CONST_EXTINCTION? score_GammaPoisson(0, tAnagenetic, mu_0, epsilon) : score_GammaPoisson(0, tAnagenetic, mu_0, factor*epsilon);  // branch didn't go extinct
    // Now gather all weights and add 2 for the end of the branch
    // we are not at branch end, so no need to add 2!!!!
    simBranchReturn_t rt(ret2.r0, ret2.r1, ret2.r2 +  extinctionProb, ret2.rc, true);
    return rt;
  }
  else {
    assert(false);
  }
},
	      simBranchReturn_t,
	      floating_t startTime,
	      floating_t stopTime,
	      gamma_t& lambda_0,
	      gamma_t& mu_0,
	      gamma_t& nu,
	      floating_t factor,
	      floating_t epsilon,
	      normalInverseGamma_t& alpha_sigma,
	      normalInverseGamma_t& alpha_sigma_rare,
	      beta_t& ab,
	      floating_t rhoLocal,
	      bool cladogeneticShift,
	      bool anageneticShift);


	      
/*
 * simTree - required
 */
BBLOCK(simTree,
{
  tree_t* treeP = DATA_POINTER(tree);
  treeIdx_t treeIdx = PSTATE.treeIdx; // During first invocation it goes left from root
  int indexParent = treeP->idxParent[treeIdx];

  if (DEBUG) {
    printf("Traversing node %d.\n", PSTATE.treeIdx);
  }
  
  // Terminate if tree is fully traversed
  if(treeIdx == -1) {
    PC++;

    // We don't need the following, can cause a bug if no next BBLOCK
    // BBLOCK_CALL(DATA_POINTER(bblocksArr)[PC], NULL);
    return;
  }
  PSTATE.treeIdx = treeP->idxNext[treeIdx]; // advance
  
  // Branch simulation
  simBranchReturn_t ret =
      BBLOCK_CALL(simBranch,
		  treeP->ages[indexParent], // parent age
		  treeP->ages[treeIdx],     // node age
		  PSTATE.lambda_0,
		  PSTATE.mu_0,
		  PSTATE.nu,
		  PSTATE.factors[treeIdx],
		  PSTATE.turnover_rates[treeIdx], // epsilon for this node
		  PSTATE.alpha_sigma,
		  PSTATE.alpha_sigma_rare,
		  PSTATE.ab,
		  DATA_CONST(rho), // can also directly grab rho, I think, maybe more performant like this? ask J
		  false, // so far no anagenetic shifts
		  false); // ... cladogenetic
  
  floating_t factorEnd = ret.r0;
  floating_t epsilon = ret.r1; // the new epsilon after the branch has been simulated
  floating_t accummulatedProbability = ret.r2;
  PSTATE.cladsShifts[treeIdx] = ret.rc;  // can reflect a hidden cladogenetic large shift
  PSTATE.anadsShifts[treeIdx] = ret.ra;
     
  bool interiorNode = treeP->idxLeft[treeIdx] != -1 || treeP->idxRight[treeIdx] != -1;
  floating_t lnTerminalProb =
    interiorNode ? score_GammaExponential(0, PSTATE.lambda_0, factorEnd) : log(DATA_CONST(rho));
  WEIGHT(accummulatedProbability + lnTerminalProb);

  // Split simulation
  if(interiorNode) {
    // CRBD case
    floating_t leftf = 1.0;
    floating_t rightf = 1.0;
    floating_t f1 = 0.0;
    floating_t f2 = 0.0;
    
    if (CLADS) {
      if (RARE_SHIFT && SAMPLE(betaBernoulli, PSTATE.ab)) {
	f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma_rare);
	f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma_rare);
	leftf = factorEnd*exp(f1);
	rightf = factorEnd*exp(f2);
	// TODO Can we swap here? Probably not.
	PSTATE.cladsShifts[treeIdx] = true;
	if (UNCOUPLE) {
	  epsilon = SAMPLE(uniform, 0.0, 1.0);
	  //	  ypsilon = SAMPLE(uniform, 0.0, 1.0); TODO
	}
      }
      else { // common shift
	f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
	f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
	leftf = factorEnd*exp(f1);
	rightf = factorEnd*exp(f2);
      }
    }
    
    PSTATE.factors[treeP->idxLeft[treeIdx]] = leftf;
    PSTATE.factors[treeP->idxRight[treeIdx]] = rightf;
    PSTATE.turnover_rates[treeP->idxLeft[treeIdx]] = epsilon;
    PSTATE.turnover_rates[treeP->idxRight[treeIdx]] = epsilon;
  } 
})

