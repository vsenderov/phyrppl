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
 *    - anagenetic (AnaDS) happening on a single lineage)
 *
 *    - a second distribution from which occasionallu rare (larger)
 *      shits are drawn (RareDS, TOD))
 *
 *    - uncoupling (redrawing) of the turnover and anagenesis rates at
 *        the rare shifts points
 *
 *  This file needs to be included by a .cu file, containing the MAIN
 *  macro, needed library includes, needed tuning parameters, and the
 *  tree structure as a datatype. You also need to define NUM_BLOCKS.
 * 
 *  Priors need to be set in PSTATE via the initialize macro. See
 *  progState_t for details.
 * 
 *  Tunable parameters:
 *
 *    #define CLADS false             // Cladogenetic changes
 *    #define ANADS 2                 // NEW
 *    #define EXTINCTION 2            // 2 - constant turnover, 1 - const, 0 - no exticntion
 *
 *
 * Not tunable! (unless you know)
 *
 *    #define M 20                         // Number of subsamples to draw
 *    #define DEBUG false                  // debugging output
 *    #define GUARD true
 *    #define MAX_FACTOR 1e5 
 *    #define MIN_FACTOR 1e-5
 *
 *  Tree selection, 4 steps:
 *
 *    #include "trees/cetaceans.cuh"       // (1)
 *    typedef cetaceans_87_tree_t tree_t;  // (2)
 *    BBLOCK_DATA(tree, tree_t, 1)         // 3
 *    BBLOCK_DATA_CONST(rho, floating_t, 1.0) // rate (4)
 *
 *  models/CombineDS.cuh defines the following BBLOCKS that can be included
 *  in the MAIN macro:
 *
 *    - initialization        (required), see progstate
 *
 *    - simCombinedDS         (required)
 *
 *    - simTree               (required)
 *
 *    - conditionOnDetection  (optional, corrects for survivorship bias) TODO
 *
 *    - sampleFinalLambda     (optional, samples the global parameters,
 *                             which have been delayed)
 *
 *    - saveResults           (optional callback, needs to be used in 
 *                             conjunction with sampleFinalLambda)
 * 
 *  TODOs:
 *    - RareDS
 *    - Count number of anagenetic and cladogenetic shifts (an anagenetic shift,
 *       if it is the last one before a hidden or seen speciation event is considered
 *       a cladogenetic change
 *    - Posteriors outputs and importance sampling & visualization
 *    - Bias corrections
 */
typedef short treeIdx_t;

struct progState_t {
  treeIdx_t treeIdx;
  
  // Priors, need to be initialized manually 
  gamma_t lambda_0;
  gamma_t mu_0;
  gamma_t nu_0;
  normalInverseGamma_t alpha_sigma;
  normalInverseGamma_t alpha_sigma_nu; // for anads

  //Posterior samples
  floating_t lambda0;
  floating_t mu0;
  floating_t nu0;
  floating_t alpha;
  floating_t sigma;
  floating_t alpha_nu; // for anads
  floating_t sigma_nu; // for anads
  floating_t epsilon;
  floating_t ypsilon;
  
  floating_t factors[(tree->NUM_NODES)]; // first is 1, all other 0 for now
  // TODO
  // Technically we don't need a factor for the root (it is assumed to be 1)
  // But for now we are going to waste one posistion for easier debugging.
  
  int numberShifts_ClaDS;
  int numberShifts_AnaDS;  
};

INIT_MODEL(progState_t)


/*
 
 * goesUndetected - helper function
 *
 *            bool,
 *            floating_t startTime,

 *	      floating_t factor,
 *	      floating_t epsilon,
 *	      floating_t ypsilon,
 */
BBLOCK_HELPER(goesUndetected,
{
  if (GUARD) {
    if (factor > MAX_FACTOR) {
      return false; 
    }
    if (factor < MIN_FACTOR) {
      return false;
    } 
  }

  floating_t waitingTime_speciation = SAMPLE(sample_GammaExponential, PSTATE.lambda_0, factor);
  floating_t waitingTime_extinction = INFINITY; // case 0
  //floating_t waitingTime_anagenesis = ANADS ? SAMPLE(sample_GammaExponential, PSTATE.lambda_0, factor*ypsilon) : INFINITY;
  // floating_t waitingTime_anagenesis = ANADS ? SAMPLE(sample_GammaExponential, PSTATE.nu_0, factor) : INFINITY;

  switch(EXTINCTION) {
  case 1:
    waitingTime_extinction = SAMPLE(sample_GammaExponential, PSTATE.mu_0, 1.0); 
  case 2:
    waitingTime_extinction = SAMPLE(sample_GammaExponential, PSTATE.mu_0, factor); 
  }


  floating_t waitingTime_anagenesis =  INFINITY; // case 0
  switch(ANADS) {
  case 1:
    
    waitingTime_anagenesis =   SAMPLE(sample_GammaExponential, PSTATE.nu_0, 1.0);
    
  case 2:
    waitingTime_anagenesis =   SAMPLE(sample_GammaExponential, PSTATE.nu_0, factor);
  } 
  
  
  floating_t t                      = MIN(waitingTime_speciation, waitingTime_extinction);
  
  if (DEBUG) printf( "%f  %f %f %f %f %d\n", startTime, factor, waitingTime_speciation,  waitingTime_extinction, waitingTime_anagenesis, depth);
  
  if (t < waitingTime_anagenesis) { // cladogenetic or CRBD case
    floating_t currentTime = startTime - t;
    
    if (currentTime < 0) { // we are in the future, rho is the detection probability
      bool undetected = !SAMPLE(bernoulli, DATA_CONST(rho));
      return undetected;
    }
    
    bool speciation =  (waitingTime_speciation < waitingTime_extinction) ? true : false;
    bool extinction = !speciation;
    if(extinction) {
      return true;
    }
    
    // Speciation
    // CRBD case
    floating_t fMin = 0.0;
    floating_t fMax = 0.0;
    
    if (CLADS) { // cladogenetic change
      floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
      floating_t f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
      if (NICOLAS) {
	fMin = MIN(f1, f2);
	fMax = MAX(f1, f2);
	assert(fMin <= fMax);
      }
      else {
      	fMin = f1;
      	fMax = f2;
      }
    }
    
    bool leftDetection = ! BBLOCK_CALL(goesUndetected, currentTime, factor*exp(fMin), depth + 1);
    if (leftDetection) return false; // no need to descend to the right side of the tree
    return BBLOCK_CALL(goesUndetected, currentTime, factor*exp(fMax),  depth + 1);
    
  }
  
  else { // anagenesis
    floating_t currentTime = startTime - waitingTime_anagenesis;
    if (currentTime <0 ) {
      bool undetected = !SAMPLE(bernoulli, DATA_CONST(rho));
      return undetected;
    }
    
    //floating_t f1 =  SAMPLE(normal, log(alpha), sigma);
    //floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
    floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma_nu);
    return BBLOCK_CALL(goesUndetected, currentTime, factor*exp(f1), depth + 1);
  }
 },
	      bool,
	      floating_t startTime,
	      floating_t factor,
	      int depth)






/* 
 * simBranchReturn_t - return type
 *
 *   - floating_t factorEnd  the accumulated factors along the branch
 *   - floating_t prob       the accumulated probability along the branch
 */
struct simBranchReturn_t {
  floating_t factorEnd;
  floating_t prob;

  DEV simBranchReturn_t(){};
  
  DEV simBranchReturn_t(floating_t factorEnd_, floating_t prob_) {
    factorEnd = factorEnd_;
    prob = prob_;
  }
};



/* 
 * TODO this one will have to count cladogenetic vs anagenetic shifts
 * see slack message on how to do it
 * simBranch - helper to simTree
 * 
 *  - has side-effects on arguments
 *
 */
BBLOCK_HELPER(simBranch,
{ 		   
  if(GUARD) {
    if (factor > MAX_FACTOR) {
      simBranchReturn_t ret(MAX_FACTOR, -INFINITY);
      return ret;
      
    }
    if (factor < MIN_FACTOR) {
      simBranchReturn_t ret(MIN_FACTOR, -INFINITY);
      return ret;
    }
  }

  floating_t branchLengthTime = startTime - stopTime;  
  floating_t tCladogenetic = SAMPLE(sample_GammaExponential, PSTATE.lambda_0, factor);
  //floating_t tAnagenetic = ANADS ? SAMPLE(sample_GammaExponential, PSTATE.lambda_0, factor*ypsilon) : INFINITY;
  //floating_t tAnagenetic = ANADS ? SAMPLE(sample_GammaExponential, PSTATE.nu_0, factor) : INFINITY;


  floating_t tAnagenetic =  INFINITY; // case 0
  switch(ANADS) {
  case 1:
    tAnagenetic =   SAMPLE(sample_GammaExponential, PSTATE.nu_0, 1.0);
  case 2:
    tAnagenetic =   SAMPLE(sample_GammaExponential, PSTATE.nu_0, factor);
 
  } 

  
  floating_t t = MIN(tAnagenetic, tCladogenetic);
  
  if (tCladogenetic < tAnagenetic) { //Cladogenetic or CRBD case
    floating_t currentTime = startTime - t;
    
    if(currentTime <= stopTime) {
      simBranchReturn_t ret(factor, 0);
      switch (EXTINCTION) {
      case 1:
	//ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.lambda_0, epsilon);
	ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.mu_0, 1.0);
      case 2:
	//ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.lambda_0, factor*epsilon);
	ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.mu_0, factor);
      }
      return ret;
    }
    
    // hidden speciation event CRBD case
    floating_t f1 = 0.0;
    floating_t f2 = 0.0;
    
    if (CLADS) {
      // TODO count shifts, also in AnaDS case
      f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
      f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
      // cannot swap here
    }
    
    /* if (DEBUG) { */
    /*   depth = 0; */
    /* } */
    
    bool sideUndetected = BBLOCK_CALL(goesUndetected, currentTime, factor*exp(f1), 0);
    if(!sideUndetected) {
      simBranchReturn_t ret(factor, -INFINITY);
      return ret;
    }

    simBranchReturn_t ret2 = BBLOCK_CALL(simBranch, currentTime, stopTime,  factor*exp(f2));
    
    floating_t extinctionProb = 0;
    switch (EXTINCTION) {
    case 1:
      //extinctionProb = score_GammaPoisson(0, t, PSTATE.lambda_0, epsilon);
      extinctionProb = score_GammaPoisson(0, t, PSTATE.mu_0, 1.0);
    case 2:
      //extinctionProb = score_GammaPoisson(0, t, PSTATE.lambda_0, factor*epsilon);
      extinctionProb = score_GammaPoisson(0, t, PSTATE.mu_0, factor);
    }

    simBranchReturn_t ret(ret2.factorEnd, ret2.prob + log(2.0) + extinctionProb);
    return ret;
  }

  else { // Anagenetic shift
    floating_t currentTime = startTime - t;
    
    if(currentTime <= stopTime) {
      simBranchReturn_t ret(factor, 0);
      switch (EXTINCTION) {
      case 1:
	//ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.lambda_0, epsilon);
	ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.mu_0, 1.0);
      case 2:
	//ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.lambda_0, factor*epsilon);
	ret.prob = score_GammaPoisson(0, branchLengthTime, PSTATE.mu_0, factor);
      }
      return ret;
    }

    floating_t f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma_nu);
  
    floating_t extinctionProb = 0;
    switch (EXTINCTION) {
      case 1:
	//extinctionProb = score_GammaPoisson(0, t, PSTATE.lambda_0, epsilon);
	extinctionProb = score_GammaPoisson(0, t, PSTATE.mu_0, 1.0);
      case 2:
	//extinctionProb = score_GammaPoisson(0, t, PSTATE.lambda_0, factor*epsilon);
	extinctionProb = score_GammaPoisson(0, t, PSTATE.mu_0, factor);
      }
    
    simBranchReturn_t ret2 = BBLOCK_CALL(simBranch, currentTime, stopTime,  factor*exp(f1));
    
    // Now gather all weights and add 2 for the end of the branch
    // we are not at branch end, so no need to add 2!!!!
    simBranchReturn_t ret(ret2.factorEnd, ret2.prob + extinctionProb);
    return ret;
  }

},
	      simBranchReturn_t,
	      floating_t startTime,
	      floating_t stopTime,
	      floating_t factor);


BBLOCK(sampleFinalLambda, {
    PSTATE.lambda0 = SAMPLE(gamma, PSTATE.lambda_0.k, PSTATE.lambda_0.theta);
    PSTATE.mu0 = SAMPLE(gamma, PSTATE.mu_0.k, PSTATE.mu_0.theta);
    PSTATE.nu0 = SAMPLE(gamma, PSTATE.nu_0.k, PSTATE.nu_0.theta);
    
    floating_t sigmaSquared = 1.0 / SAMPLE(gamma, PSTATE.alpha_sigma.a, 1.0 / PSTATE.alpha_sigma.b);
    PSTATE.sigma = sigmaSquared;
    PSTATE.alpha = SAMPLE(normal, PSTATE.alpha_sigma.m0, 1/PSTATE.alpha_sigma.v * PSTATE.sigma);

    floating_t sigmaSquared_nu = 1.0 / SAMPLE(gamma, PSTATE.alpha_sigma_nu.a, 1.0 / PSTATE.alpha_sigma_nu.b);
    PSTATE.sigma_nu = sigmaSquared_nu;
    PSTATE.alpha_nu = SAMPLE(normal, PSTATE.alpha_sigma_nu.m0, 1/PSTATE.alpha_sigma_nu.v * PSTATE.sigma);

    NEXT = NULL;
})

// Should be equivalent to forward sampling
BBLOCK(conditionOnDetection, {
    tree_t* treeP = DATA_POINTER(tree);
    floating_t treeAge = treeP->ages[ROOT_IDX];

    int numSamples = 100;
    int numDetected = 0;
    for(int i = 0; i < numSamples; i++) {
      bool undetected = BBLOCK_CALL(goesUndetected, treeAge, 1.0, 1);
        if(! undetected)
            numDetected++;
    }
    WEIGHT(-2.0 * log(numDetected / static_cast<floating_t>(numSamples)));
    NEXT = sampleFinalLambda;
    BBLOCK_CALL(NEXT, NULL);
})
	      
/*
 * simTree - required
 */
BBLOCK(simTree,
{
  tree_t* treeP = DATA_POINTER(tree);
  treeIdx_t treeIdx = PSTATE.treeIdx; // During first invocation it goes left from root
  int indexParent = treeP->idxParent[treeIdx];

    if (DEBUG) {
    printf("node %d\n", PSTATE.treeIdx);
  }
  
  // Terminate if tree is fully traversed
  if(treeIdx == -1) {
    //NEXT = NULL;
    NEXT = conditionOnDetection;
    BBLOCK_CALL(NEXT, NULL);
    return;
  }
  PSTATE.treeIdx = treeP->idxNext[treeIdx]; // advance
  
  // Branch simulation
  simBranchReturn_t ret =
      BBLOCK_CALL(simBranch,
		  treeP->ages[indexParent], // parent age
		  treeP->ages[treeIdx],     // node age
		  PSTATE.factors[treeIdx]  // factor at the beginning of the branch
		); 
  
  floating_t factorEnd = ret.factorEnd;
  floating_t accummulatedProbability = ret.prob;
     
  bool interiorNode = treeP->idxLeft[treeIdx] != -1 || treeP->idxRight[treeIdx] != -1;
  //floating_t lambdaEnd = factorEnd*PSTATE.lambda0;
  //floating_t lnTerminalProb =
  //  interiorNode ? log(lambdaEnd) : log(DATA_CONST(rho));
  floating_t lnTerminalProb = interiorNode ? score_GammaExponential(0, PSTATE.lambda_0, factorEnd) : log(DATA_CONST(rho));
  
  WEIGHT(accummulatedProbability + lnTerminalProb);

  // Split simulation
  if(interiorNode) {
    // CRBD case
    floating_t f1 = 0.0;
    floating_t f2 = 0.0;

    if (CLADS) {
      f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
      f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
    }

    floating_t leftFactorEnd = factorEnd*exp(f1);
    floating_t rightFactorEnd = factorEnd*exp(f2);
    
    PSTATE.factors[treeP->idxLeft[treeIdx]] = leftFactorEnd;
    PSTATE.factors[treeP->idxRight[treeIdx]] = rightFactorEnd;
  } 
})




/*
 * simCombineDS - required BBLOCK
 */
BBLOCK(simCombineDS,
{
  // Set up tree traversal
  tree_t* treeP = DATA_POINTER(tree);
  PSTATE.treeIdx = treeP->idxLeft[ROOT_IDX];
    
  // Correction factor
  int numLeaves = countLeaves(treeP->idxLeft, treeP->idxRight, treeP->NUM_NODES);
  floating_t corrFactor = (numLeaves - 1) * log(2.0) - lnFactorial(numLeaves);
  WEIGHT(corrFactor);

  // CRBD case
//  floating_t leftf = 1.0;
//  floating_t rightf = 1.0;
  floating_t f1 = 0.0;
  floating_t f2 = 0.0;
  
  if (CLADS) {
    f1 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
    f2 = SAMPLE(sample_NormalInverseGammaNormal, PSTATE.alpha_sigma);
  }
  
  floating_t leftFactor = 1.0 * exp(f1);
  floating_t rightFactor = 1.0 * exp(f2);
    
  // The factors that are saved are the total accumulated factors
  PSTATE.factors[PSTATE.treeIdx] = leftFactor; // same as left of root, treeP->idxLeft[ROOT_IDX]
  PSTATE.factors[treeP->idxRight[ROOT_IDX]] = rightFactor;
      
  NEXT = simTree;
  BBLOCK_CALL(NEXT, NULL);

 })


int adiscrete(const floating_t* ps, const int n) {
  //floating_t u = SAMPLE(uniform, 0, 1);    // replace this with c++ std library uniform
  //std::default_random_engine generator;
  std::random_device rd;
  std::mt19937 generator(rd());
  std::uniform_real_distribution<double> distribution(0.0,1.0);
  floating_t u = distribution(generator);
  floating_t sum = 0;    
  int idx = 0;    
  for(idx = 0; idx < n-1; idx++) {        
    sum += ps[idx];        
    if(u <= sum)            
      break;    
  }    
  return idx;
}
 

CALLBACK(saveResultsFile, {
    std::string headerFileName = "results/" + analysisName + "_header.csv";
    std::ofstream headerFile (headerFileName, std::ios_base::app);
    if (headerFile.is_open()) {
      //headerFile << "k, p, lambda_0.k, lambda_0.theta, mu_0.k, mu_0.theta, nu_0.k, nu_0.theta" << std::endl;
      headerFile << "lambda0, mu0, nu0, alpha, sigma, alpha_nu, sigma_nu" << std::endl;
      headerFile.close();
    }

    std::string resultsFileName = "results/" + analysisName + ".csv";
    std::ofstream resultsFile (resultsFileName, std::ios_base::app);
    if (resultsFile.is_open()) {
      floating_t maxWeight = WEIGHTS[0];
      for (int i = 1; i < N; i++) if (WEIGHTS[i] > maxWeight) maxWeight = WEIGHTS[i];
      
      /* Use the weights to choose the subsample in a numerically stable way. */
      floating_t probs[N]; 
      for (int i = 0; i < N; i++) probs[i] = exp(WEIGHTS[i] - maxWeight) ;
      
      for (int j = 0; j < M; j++) {
	//int k = SAMPLE(discrete, probs, N); doesn't work on GPU
	int k = adiscrete(probs, N);
	resultsFile << PSTATES[k].lambda0 << ", "
		    << PSTATES[k].mu0 << ", "
		    << PSTATES[k].nu0 << ", "
	            << PSTATES[k].alpha << ", "
		    << PSTATES[k].sigma << ", "
		    << PSTATES[k].alpha_nu << ", "
		    << PSTATES[k].sigma_nu << std::endl;

      }
      resultsFile.close();
    }
    
  })

