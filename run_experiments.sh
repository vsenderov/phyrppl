#!/bin/bash
#
# Runs the phylogenetic experiments


#screen -dmS scr1
#screen -S scr1 -p 0 -X stuff "./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false #2 1 20000 10\nexit\n"
#screen -list

#clads
#screen -dmS scr2
#screen -S scr2 -p 0 -X stuff "./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 2 0 20000 10\n"
#screen -list

 #__(1)__ - tree
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
 #*     __(13)__ - alpha, sigma - 1st param
 #*     __(14)__ - alpha, sigma - 2nd param
 #*     __(15)__ - alpha, sigma - 3nd param
 #*     __(16)__ - alpha, sigma - 4nd param
 #*     __(17)__ - clads (true/false)
 #*     __(18)__ - extinction level
 #*     __(19)__ - anads level
 #*     __(20)__ - STEP_SIZE
 #      __(21)__ - DEPTH
 #*



# anads-gbm rescaling - anatinae - changing max depth,
# we start by step size 2 My and initial alpha sigma  0 1.0 3.0 0.2
# guard on depth 32
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 1.0 3.0 0.2 false 2 0 2 10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 2.0 3.0 0.1 false 2 0 1 10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 4.0 3.0 0.05 false 2 0 0.5 10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 8.0 3.0 0.025 false 2 0 0.25 10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 32.0 3.0 0.00625 false 2 0 0.0625 10e4 50000 100

#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.050*10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.049*10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.048*10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.047*10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.046*10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.045*10e4 50000 100
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1.04*10e4 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 100000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 90000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 80000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 70000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 60000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 50000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 40000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 30000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 20000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 10000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 9000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 8000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 7000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 6000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 5000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 4000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 3000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 2000 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 1000 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 900 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 800 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 700 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 600 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 500 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 400 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 300 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 200 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 100 50000 100
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 90 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 80 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 70 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 60 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 50 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 40 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 30 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 20 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 10 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 9 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 8 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 7 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 6 50000 10
./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 0 0.125 5 50000 10








# Comparison with AnaDS1 with similar settings
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 0.125 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 1 2000 10e4 50000 100

# With AnaDS2, no guard needed
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 0.125 0 1.0 3.0 0.1 0 16.0 3.0 0.0125 false 2 2 2000 10e100 50000 100

# Wtih ClaDS2
#./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 0.125 0 16.0 3.0 0.0125 0 16.0 3.0 0.0125 true 2 0 2000 10e100 50000 100

##### Lari

# anads (const) 0,1,2 - Lari
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 2 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 1 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 0 1 50000 100

# clads 0,1,2 - Lari
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 2 0 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 1 0 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 0 0 50000 100

# anads (const) 0,1,2 - Lari equivalent nu * sigma^2 scenario (sigma - halved, scale - multiplied by 4)
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 4.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 2 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 4.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 1 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 4.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 0 1 50000 100

# anads (const) 0,1,2 - Lari narrow prior
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 2 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 1 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 0 1 50000 100

# anads (const) 0,1,2 - Lari very narrow prior
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.05 false 2 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.05 false 1 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.05 false 0 1 50000 100

# anads (const) 0,1,2 - Lari broad prior
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.4 false 2 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.4 false 1 1 50000 100
#./runppl.sh CombineDS Lari 0.8410596026490066 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.4 false 0 1 50000 100




##### Cetaceans

# anads (const) 0,1,2 - cetaceans
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 2 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 1 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 0 1 50000 100

# clads 0,1,2 - cetaceans
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 2 0 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 1 0 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 true 0 0 50000 100

# anads (const) 0,1,2 - cetaceans equivalent nu * sigma^2 scenario (sigma - halved, scale - multiplied by 4)
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 4.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 2 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 4.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 1 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 4.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 0 1 50000 100

# anads (const) 0,1,2 - cetaceans narrow prior
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 2 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 1 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.1 false 0 1 50000 100

# anads (const) 0,1,2 - cetaceans very narrow prior
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.05 false 2 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.05 false 1 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.05 false 0 1 50000 100

# anads (const) 0,1,2 - cetaceans broad prior
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.4 false 2 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.4 false 1 1 50000 100
#./runppl.sh CombineDS cetaceans 1.0 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.4 false 0 1 50000 100
