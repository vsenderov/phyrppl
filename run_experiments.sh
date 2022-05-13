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

#### Anatinae

export RPPL_FLAGS=" --target sm_75 -j 28"

# CRBD
./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 10000 5 28 1

# Anads-GBM.[0-2]

#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.1 500 100000 500 28 1

# ClaDS.[0-2] lambda0 ~ 0.18 0.45 0.4
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.55 0 1.0 3.0 0.1 true 0 0 9999 500 100000 500 28 1
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.22 0 1.0 3.0 0.1 true 1 0 9999 500 100000 500 28 1
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.25 0 1.0 3.0 0.1 true 2 0 9999 500 100000 500 28 1

# AnaDS-GBM+ClaDS.[0-2]
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 true 2 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 true 1 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Anatinae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 true 0 0 0.1 500 100000 500 28 1

#### Alcedinidae

# CRBD
#./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 100000 500 28 1

# Anads-GBM.[0-2]

#./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.1 500 100000 500 28 1

# ClaDS.[0,2] lambda0 ~ 0.15 0.39
#./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.67 0 1.0 3.0 0.1 true 0 0 9999 500 100000 500 28 1
#./runppl.sh CombineDS Alcedinidae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.25 0 1.0 3.0 0.1 true 2 0 9999 500 100000 500 28 1

#### M6

#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 999999 500000 500 28 1

# CRBD
#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 500 100000 500 28 1

# Anads-GBM.[0-2]

#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.1 150 100000 500 28 1
#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.1 150 100000 500 28 1

# ClaDS[0,2]. lambda0 ~ 0.82 1.07
#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.12 0 1.0 3.0 0.1 true 0 0 9999 500 100000 500 28 1
#./runppl.sh CombineDS M6 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.09 0 1.0 3.0 0.1 true 2 0 9999 150 100000 500 28 1


#### Accipitridae

# CRBD
#./runppl.sh CombineDS Accipitridae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 9999 150 100000 500 28 1

# Anads-GBM.[0-2]

#./runppl.sh CombineDS Accipitridae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 2 0 0.1 150 100000 500 28 1
#./runppl.sh CombineDS Accipitridae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 1 0 0.1 500 100000 500 28 1
#./runppl.sh CombineDS Accipitridae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.5 0 1.0 3.0 0.1 false 0 0 0.1 150 100000 500 28 1

# ClaDS[0,2] lambda0 ~ 0.12 0.18
#./runppl.sh CombineDS Accipitridae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.83 0 1.0 3.0 0.1 true 0 0 9999 500 100000 500 28 1
#./runppl.sh CombineDS Accipitridae 0.87 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.55 0 1.0 3.0 0.1 true 2 0 9999 150 100000 500 28 1

##### Lari

##### cetaceans
