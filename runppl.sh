#!/bin/bash
#
# Usage
#
#  runppl TEMPLATE-FILE ... NPARTS NSWEEPS NOMPTHREADS CUDAPARTPERTHREAD
#
# Some examples
#
#  ./runppl.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 3.0 0.1 0 1.0 3.0 0.1 false 2 0 1 10 50000 10 28 1
#

args=("$@")
for ((i=0; i < $#; i++))
do
    dir+="${args[$i]}"_
done

cp models/$1.tmpl results/$dir.cu

for ((i=0; i < $#; i++))
do
    if [ $i -gt 0 ]
    then 
	sed -i "s/__($i)__/${args[$i]}/g" results/$dir.cu
    fi
done

#rootppl clean
rootppl -o $dir.out results/$dir.cu $RPPL_FLAGS

for i in `seq "${args[$(($#-3))]}"`; do
    #\time -v ./$dir.out  "${args[$(($#-4))]}" "${args[$(($#-3))]}" "${args[$(($#-2))]}" "${args[$(($#-1))]}";
    \time -v ./$dir.out  "${args[$(($#-4))]}" 1 "${args[$(($#-2))]}" "${args[$(($#-1))]}";
done 1> logz.txt 2>> results/time.txt
mkdir $dir
mkdir $dir/plots
cp tools/pdf.py $dir/
cp tools/sample.py $dir/
mv logz.txt $dir/
mv results/* $dir/
cp $dir/logz.txt $dir/logz.uncleaned
(cd $dir/ ; sed -i '/Weight Sum is NaN, terminating.../d' logz.txt)
(cd $dir/ ; python3 pdf.py > estimates.csv)
#mv log_norm_const.txt $dir/

rm $dir.out
