#!/bin/bash
#
# Usage
#
#  compile_template template_file [params]
#
# E.g.
#
#  ./compile_template.sh CombineDS Anatinae 0.8709677419354839 1.0 1.0 1.0 0.5 1.0 1.0 0 1.0 1.0 0.2 0 1.0 1.0 0.2 false 2 1 1 10
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

rootppl -o $dir.out results/$dir.cu
