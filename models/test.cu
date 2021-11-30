/* 
 *  models/CombineDS.cuh
 *
 *  Copyright (C) 2020-2021 Viktor Senderov, Joey Öhman, David Broman
 * 
 *
 *  CombineDS diversification model supports conditionally simulates
 *  several different types of evolution:
 *
 *    - cladogenetic (ClaDS-like) small changes in diversification
 *      rates, ClaDS versions 0-2.
 *	      
 *    - anagenetic small changes (happening on a single lineage)
 *
 *    - rare large shits (both anagenetic and cladogenetic)
 *
 *    - uncoupling of the turnover rate at the rare large shifts for
 *      ClaDS2
 *
 *
 *  This file needs to be included by a .cu file, containing the MAIN
 *  macro, needed global parameters, needed tuning parameters, and 
 *  the tree structure as a datatype.
 * 
 *  Needed global parameters:
 * 
 *    const floating_t k = 1;            // prior Γ-shape for λ
 *    const floating_t theta = 1;        // prior Γ-scale for λ
 *
 *    const floating_t kNu = 1;          // prior Γ-shape for ν
 *    const floating_t thetaNu = 0.5;    // prior Γ-shape for ν
 *
 *    const floating_t a_epsilon = 1;    // prior β-shape 1 for p_ε
 *    const floating_t b_epsilon = 100;  // prior β-shape 2 for p_ε
 *
 *    const floating_t m0 = 0;   // Hyper-param of prior for α and σ
 *    const floating_t v = 1;    // Hyper-param of prior for α and σ
 *    const floating_t a = 1.0;  // Hyper-param of prior for α and σ
 *    const floating_t b = 0.2;  // Hyper-param of prior for α and σ
 * 
 *  Needed tuning parameters:
 *
 *    #define M 20              // Number of subsamples to draw
 *    #define RARE_SHIFT false  // Activate rare shifts
 *    #define CLADS true        // Cladogenetic changes
 *    #define ANADS true        // Anagenetic changes
 *    #define UNCOUPLE true     // Uncouples turnover rate at rare shifts
 *    #define CLADS1 false      // ClaDS version: 0, 1, or 2, TODO 0
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

/* Preamble */
#include <iostream>
#include <cstring>
#include <cassert>
#include <string>
#include <fstream>
#include <algorithm>
#include <random>

#include "inference/smc/smc.cuh"
#include "trees/tree_utils.cuh"
#include "utils/math.cuh"
#include "utils/stack.cuh"
#include "dists/delayed.cuh"

#include "trees/cetaceans.cuh"
#include "trees/default_trees.cuh"




/////////////////////////////////////////////////////////////////////////////

#define STEPS 4


/* Program state */
struct progState_t {
  floating_t f = 0;
  floating_t f_1_2 = 0;
};


#define NUM_BBLOCKS 1

INIT_MODEL(progState_t)

/*
 * simCombineDS - required BBLOCK
 */
BBLOCK(test,
{
  normalInverseGamma_t alpha_sigma = normalInverseGamma_t(0, 1.0, 3.0, 1.0);
  floating_t f =  SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma);
  PSTATE.f = f;

  floating_t factorSum = 0;
  normalInverseGamma_t alpha_sigma_nu = normalInverseGamma_t(0, 2*2, 3.0, 0.25);
  for (int i = 0; i < STEPS; i++) {
    factorSum += SAMPLE(sample_NormalInverseGammaNormal, alpha_sigma_nu);
  }

  PSTATE.f_1_2 = factorSum;
  NEXT = NULL;
})

CALLBACK(printResults, {
  floating_t meanF = 0;
  floating_t varF = 0;
  floating_t meanF1_2 = 0;
  floating_t varF1_2 = 0;
  for (int i = 0; i < N; i++) {
    meanF += PSTATES[i].f;
    meanF1_2 += PSTATES[i].f_1_2;
  }
  meanF = meanF / N; meanF1_2 = meanF1_2 / N;
  for (int i = 0; i < N; i++ ) {
    varF += pow(meanF - PSTATES[i].f, 2.0);
    varF1_2 += pow(meanF1_2 - PSTATES[i].f_1_2, 2.0);
  }
  varF = varF / (N - 1); varF1_2 = varF1_2 / (N - 1);
  printf("meanF\t\tvarF1\t\tmeanF1_2\t\tvarF1_2\n");
  printf("%f\t%f\t%f\t%f\n", meanF, varF, meanF1_2, varF1_2);
})

MAIN({
    FIRST_BBLOCK(test)
    SMC(printResults)
    //SMC(NULL)
})
