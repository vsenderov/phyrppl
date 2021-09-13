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

#define CLADS false              // Cladogenetic changes
#define CONST_EXTINCTION false   // Constant extinction rate, if it is false CONSTANT_EXTINCTION
#define ANADS true               // Anagenetic changes
#define CONST_ANAGENESIS false  
#define RARE_SHIFT false          // Activate rare shifts - works both on ClaDS and AnaDS
#define UNCOUPLE false            // Uncouples turnover rate at rare shifts

/* Do not tune unless you know what you're doing! */
#define GUARD true
#define MAX_FACTOR 1e3 
#define MIN_FACTOR 1e-3
#define M 20              // Number of subsamples to draw
#define DEBUG false
unsigned int depth;

typedef cetaceans_87_tree_t tree_t;
//typedef bisse32_tree_t tree_t;
const floating_t rhoConst = 1.0;

const floating_t k = 1.0;
const floating_t theta = 1.0;
const floating_t a_epsilon = 0;     // TODO leftovers need to be removed/refactored
const floating_t b_epsilon = 100;   // TODO

const floating_t epsilon = 0.5;
const floating_t ypsilon = 1;

const floating_t m0 = 0;
const floating_t v = 1;
const floating_t a = 1.0;
const floating_t b = 0.2;

const floating_t m0_rare = 0;
const floating_t v_rare = 1;
const floating_t a_rare = 1.0;
const floating_t b_rare = 0.2;

#define NUM_BBLOCKS 2
#include "../models/CombineDS.cuh"

MAIN({
    ADD_BBLOCK(simCombineDS);
    ADD_BBLOCK(simTree);
    //ADD_BBLOCK(conditionOnDetection);
    //ADD_BBLOCK(sampleFinalLambda);
    //SMC(saveResults);
    SMC(NULL)
})
