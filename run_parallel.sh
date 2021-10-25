# work in progress

# have to store data in differently named files to avoid issues

\time --format "%E" ./$dir.out  "${args[$(($#-2))]}" "${args[$(($#-1))]}" 2> results/time.txt
mkdir $dir
mv log_norm_const.txt $dir/
mv results/* $dir/
rm $dir.out
