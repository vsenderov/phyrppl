#include <iostream>
#include <cstring>
#include <cassert>
#include <string>
#include <fstream>
#include <algorithm>
#include <random>

#include "inference/smc/smc.cuh"
#include "trees/tree_utils.cuh"
#include "trees/cetaceans.cuh"
#include "trees/default_trees.cuh"
#include "utils/math.cuh"
#include "utils/stack.cuh"
#include "dists/delayed.cuh"
 
/** Tree selection */
typedef cetaceans_87_tree_t tree_t;
//typedef bisse32_tree_t tree_t;
const floating_t rhoConst = 1.00;
//const floating_t rhoConst = 0.8410596026490066;
//typedef bisse32_tree_t tree_t;
//const floating_t rho = 1.0;

const int M = 20;

/** Global parameters*/
const floating_t k = 1;
const floating_t theta = 1.0;
const floating_t kMu = 1;
const floating_t thetaMu = 0.5;
const floating_t a_epsilon = 1;
const floating_t b_epsilon = 100;

const floating_t m0 = 0;
const floating_t v = 1;
const floating_t a = 1.0;
const floating_t b = 0.2;

std::string analysisName = "ClaDS2Plus_delayed_test";

#define NUM_BBLOCKS 3

#include "models/ClaDS2Plus_delayed.cuh"

MAIN({

    ADD_BBLOCK(simClaDS2);
    ADD_BBLOCK(simTree);
    //ADD_BBLOCK(conditionOnDetection);
    ADD_BBLOCK(justResample);
    //ADD_BBLOCK(sampleFinalLambda);
    //SMC(saveResults);
    SMC(NULL)
})
 

