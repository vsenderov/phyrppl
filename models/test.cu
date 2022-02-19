/**
 * TEST PROGRAM
 */

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

#define STEP_SIZE 0.1
#define REPEATS 10


/* Program state */
struct progState_t {
  floating_t f = 0;
};


#define NUM_BBLOCKS 1


INIT_MODEL(progState_t)

/*
 * simCombineDS - required BBLOCK
 */
BBLOCK(test,
{
  normalInverseGamma_t alphaSigma = normalInverseGamma_t(0, 1.0, 3.0, 0.05);
  PSTATE.f = 0;
  for (int i = 0; i < REPEATS; i++) {
    floating_t f =  SAMPLE(linearNormalInverseGammaNormal, alphaSigma, STEP_SIZE, 0, STEP_SIZE);
    PSTATE.f += f;
  }

  NEXT = NULL;
})

CALLBACK(printResults, {
  floating_t meanF = 0;
  floating_t varF = 0;
  for (int i = 0; i < N; i++) {
    meanF += PSTATES[i].f;
  }
  meanF = meanF / N; 
  for (int i = 0; i < N; i++ ) {
    varF += pow(meanF - PSTATES[i].f, 2.0);
  }
  varF = varF / (N - 1);
  printf("mean, var\n");
  printf("%f, %f\n", meanF, varF);
})

CALLBACK(dumpSample, {
    //printf("multiplier\n");
    for (int i = 0; i < N; i++) {
      printf("%f\n", PSTATES[i].f);
    }
  })

MAIN({
    FIRST_BBLOCK(test)
    //SMC(printResults)
    SMC(dumpSample)
    //SMC(NULL)
})
