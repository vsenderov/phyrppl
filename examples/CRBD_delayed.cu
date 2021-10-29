/**
 Example using CRBD 
 */

#include <stdio.h>
#include <string>
#include <fstream>

#include "inference/smc/smc.cuh"
#include "trees/tree_utils.cuh"
#include "trees/default_trees.cuh"
#include "trees/birds.cuh"
#include "utils/math.cuh"


typedef Anatinae_tree_t tree_t;
const floating_t rhoConst = 0.8709677419354839;

const floating_t kLambda = 1.0;
const floating_t thetaLambda = 1.0;
const floating_t kMu = 1.0;
const floating_t thetaMu = 0.5;

#include "models/CRBD_delayed.cuh"

MAIN(
    FIRST_BBLOCK(simCRBD)
    //SMC(saveResults)
    SMC(NULL)
) 
