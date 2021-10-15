#!/bin/bash
# Usage
#  package_results package_name
mv log_norm_const.txt results/
mv results/ $1
tar czvf $1.tgz $1