#!/bin/bash

#* PROCESS THE TREES GENERATED BY JEREMY FOR THE SAKE OF VERIFICATION 
#* AS PART OF THE ANADS-BDD PAPER
#* 
#* The real parameter values are:
#*
#* CRBD:
#* μ	0.293320623251769
#* λ	0.5029778176383463
#* t_height	10.0
#* ρ	0.77
#*
#* BDD:
#* μ	0.7108008375407112
#* σλ	0.0705207851905104
#* t_height	10.0
#* ρ	0.77
#* α	-0.06919019343536957
#* λ0	1.4275984344338288
#*
#* We will use the new priors.

#SBATCH -J Jeremy                         
#SBATCH -t 7-00:00:00                       
#SBATCH -N 1                                
#SBATCH --mem 64000
#SBATCH --mail-type=ALL
#SBATCH --mail-user=vsenderov@gmail.com

ulimit -s unlimited
export OMP_STACKSIZE=" 32G" 

#module load buildenv-intel/2018a-eb

#*     __(1)__  - tree
#*     __(2)__  - rho
#*     __(3)__  - lamdba0 shape (Speciation)
#*     __(4)__  - lambda0 scale
#*     __(5)__  - mu0 shape     (Exctinction)
#*     __(6)__  - mu0 scale
#*     __(7)__  - nu0 scape     (Anagenesis)
#*     __(8)__  - nu0 scale
#*     __(9)__  - alpha, sigma - 1st param (ClaDS or LS)
#*     __(10)__ - alpha, sigma - 2nd param (ClaDS or LS)
#*     __(11)__ - alpha, sigma - 3nd param (ClaDS or LS)
#*     __(12)__ - alpha, sigma - 4nd param (ClaDS or LS)
#*     __(13)__ - alpha, sigma - 1st param (GBM)
#*     __(14)__ - alpha, sigma - 2nd param (GBM)
#*     __(15)__ - alpha, sigma - 3nd param (GBM)
#*     __(16)__ - alpha, sigma - 4nd param (GBM)
#*     __(17)__ - clads (true/false)
#*     __(18)__ - extinction level
#*     __(19)__ - anads level
#*     __(20)__ - STEP_SIZE
#*     __(21)__ - DEPTH
#*     __(22)__ - dump factors (true/false)

MODEL=CombineDS   # CombineDS is the version that uses recursion, i.e. _not_ CUDA optimized
TREE=jeremy_bdd
AGE=10.0
RHO=0.77
#L0EST0=0.23
#L0EST2=0.35

NCORES=28
PART=200000
ITER=1000

LSH=1.5
LSC=2.0
MSH=1.5
MSC=1.0
NSH=1.0
NSC=1.0                # Base rate, will rescale
C1=0.0
C2=1.0
C3=3.0
C4=2.0                 # Base rate, will rescale
G1=0.0
G2=1.0
G3=3.0
G4=2.0                 # Base rate, will rescale 

STEP=0.1
GUA=`echo "scale = 2; 2.0 / $STEP" | bc`              # Base rate, will rescale

#export RPPL_FLAGS=" --target sm_75 -j $NCORES" # CUDA
export RPPL_FLAGS=" --target omp -j $NCORES"    # OMP
cd ..

# CRBD                                                              (-ClaDS/rare--) (-GBM---------) ClDS? E A Step GUA Factors? PART  I     CP      Th Name
NSCN=`echo "scale = 2; $NSC / $AGE" | bc`
GUAN=`echo "$GUA*$AGE" | bc | awk '{print int($1+0.5)}'`
echo ./runppl.sh $MODEL $TREE $RHO $LSH $LSC $MSH $MSC $NSH $NSCN $C1 $C2 $C3 $C4 $G1 $G2 $G3 $G4 false 1 0 9999 $GUAN false $PART $ITER $NCORES 1 crbd 
./runppl.sh $MODEL $TREE $RHO $LSH $LSC $MSH $MSC $NSH $NSCN $C1 $C2 $C3 $C4 $G1 $G2 $G3 $G4 false 1 0 9999 $GUAN false $PART $ITER $NCORES 1 crbd 

# # Anads-GBM.[0-2]                                                   (-ClaDS/rare--) (-GBM--------------) ClDS? E A Step  GUA Factors? PART  I     CP      Th Name
G4N=`echo "scale = 2; $G4/$AGE" | bc`
echo ./runppl.sh $MODEL $TREE $RHO $LSH $LSC $MSH $MSC $NSH $NSCN $C1 $C2 $C3 $C4 $G1 $G2 $G3 $G4N false 0 0 $STEP $GUAN true $PART $ITER $NCORES 1 anadsGBM0 
./runppl.sh $MODEL $TREE $RHO $LSH $LSC $MSH $MSC $NSH $NSCN $C1 $C2 $C3 $C4 $G1 $G2 $G3 $G4N false 0 0 $STEP $GUAN true $PART $ITER $NCORES 1 anadsGBM0 
echo ./runppl.sh $MODEL $TREE $RHO $LSH $LSC $MSH $MSC $NSH $NSCN $C1 $C2 $C3 $C4 $G1 $G2 $G3 $G4N false 2 0 $STEP $GUAN true $PART $ITER $NCORES 1 anadsGBM2 
./runppl.sh $MODEL $TREE $RHO $LSH $LSC $MSH $MSC $NSH $NSCN $C1 $C2 $C3 $C4 $G1 $G2 $G3 $G4N false 2 0 $STEP $GUAN true $PART $ITER $NCORES 1 anadsGBM2 
