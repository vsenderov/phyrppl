#!/bin/bash
#
#SBATCH -J CLDS2Anatinae
#SBATCH -t 7-00:00:00
#SBATCH -N 1
#SBATCH --mem 64000
#SBATCH --mail-type=ALL
#SBATCH --mail-user=viktor.senderov@nrm.se
#

ulimit -s unlimited
export OMP_STACKSIZE=" 32G" 

#module load buildenv-intel/2018a-eb

 #*     __(1)__ - tree
 #*     __(2)__ - rho
 #*     __(3)__ - lamdba0 shape
 #*     __(4)__ - lambda0 scale
 #*     __(5)__ - mu0 shape
 #*     __(6)__ - mu0 scale
 #*     __(7)__ - nu0 scape
 #*     __(8)__ - nu0 scale
 #*     __(9)__ - alpha, sigma - 1st param
 #*     __(10)__ - alpha, sigma - 2nd param
 #*     __(11)__ - alpha, sigma - 3nd param
 #*     __(12)__ - alpha, sigma - 4nd param
 #*     __(13)__ - alpha, sigma - 1st param (GBM)
 #*     __(14)__ - alpha, sigma - 2nd param (GBM)
 #*     __(15)__ - alpha, sigma - 3nd param (GBM)
 #*     __(16)__ - alpha, sigma - 4nd param (GBM)
 #*     __(17)__ - clads (true/false)
 #*     __(18)__ - extinction level
 #*     __(19)__ - anads level
 #*     __(20)__ - STEP_SIZE
 #*     __(21)__ - DEPTH
 #*

# viktor 2022-06-03
# The purpose of this experiment is to rerun the 4 bird trees (finally, hopefully)
# with 0.05 step size, 500 depth, and the _correct_ priors.
# We're running only 100 iterations, though, hopefully this will be correct.
# 2022-06-12 - 100 iterations not enough, running another 100 + 200 for clads (lambda0 estimates based only on 100 iterations though)

#### Anatinae

export RPPL_FLAGS=" --target omp"

# CRBD
./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 100000 100 28 1 crbd

# Anads-GBM.[0-2]

./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.05 500 100000 100 28 1 anadsGBM0
./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.05 500 100000 100 28 1 anadsGBM2

# ClaDS.[0-2] lambda0 GBM0 ~ 0.1/0.21583704337743892 = 0.4633125; GBM2 ~ 0.1/0.42588624478199844 = 0.2348045
./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.55 0 1.0 3.0 0.46 true 0 0 9999 500 100000 200 28 1 clads0
./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.25 0 1.0 3.0 0.23 true 2 0 9999 500 100000 500 28 1 clads2

#### Alcedinidae

# CRBD
./runppl.sh CombineDS Alcedinidae 0.57 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 100000 100 28 1 crbd

# Anads-GBM.[0-2]

./runppl.sh CombineDS Alcedinidae 0.57 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.05 500 100000 100 28 1 anadsGBM0
./runppl.sh CombineDS Alcedinidae 0.57 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.05 500 100000 100 28 1 anadsGBM2

# ClaDS.[0,2] lambda0 GBM0 ~ 0.1/0.13277552908064916 = 0.7531508; GBM2 ~ 0.1/0.3480547165639467 = 0.2873111
./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.67 0 1.0 3.0 0.75 true 0 0 9999 500 100000 200 28 1 clads0
./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.25 0 1.0 3.0 0.29 true 2 0 9999 500 100000 200 28 1 clads2

#### M6

# CRBD
./runppl.sh CombineDS M6 0.77 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 100000 100 28 1 crbd

# Anads-GBM.[0-2]

./runppl.sh CombineDS M6 0.77 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.05 500 100000 100 28 1 anadsGBM0
./runppl.sh CombineDS M6 0.77 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.05 500 100000 100 28 1 anadsGBM2

# ClaDS[0,2]. GBM0: lambda0 ~ 0.1/0.8158907158351305=0.1225654; GBM2 ~ 0.1/1.0942973023640103 =  0.09138284
./runppl.sh CombineDS M6 0.77 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.12 0 1.0 3.0 0.12 true 0 0 9999 500 100000 200 28 1 clads0
./runppl.sh CombineDS M6 0.7 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.09 0 1.0 3.0 0.09 true 2 0 9999 500 100000 200 28 1 clads2

#### Accipitridae

# CRBD
./runppl.sh CombineDS Accipitridae 0.71 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 100000 100 28 1 crbd

# Anads-GBM.[0-2]

./runppl.sh CombineDS Accipitridae 0.71 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.05 500 100000 100 28 1 anadsGBM0
./runppl.sh CombineDS Accipitridae 0.71 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.05 500 100000 100 28 1 anadsGBM2

# ClaDS[0,2] lambda0 GBM0 ~ 0.1/0.12418703233897882 = 0.8052371 GBM2 ~ 0.1/0.21113466629524846 =  0.4736314
./runppl.sh CombineDS Accipitridae 0.71 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.83 0 1.0 3.0 0.81 true 0 0 9999 500 100000 200 28 1 clads0
./runppl.sh CombineDS Accipitridae 0.71 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.55 0 1.0 3.0 0.47 true 2 0 9999 500 100000 200 28 1 clads2

