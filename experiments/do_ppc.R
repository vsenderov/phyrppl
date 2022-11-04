#!/usr/bin/env r
modelpattern = c("*clads0_", "*clads2_", "*anadsGBM0_", "*anadsGBM2_" )
titles = c( "ClaDS0", "ClaDS2", "GBM0", "GBM2")
shortcuts = c("clads0", "clads2", "anadsGBM0", "anadsGBM2")

nriterations = 2 ## rerun with 100 for Thamno

if (is.null(argv) | length(argv)<1) {
  cat("Usage: do_ppc.r expdir1 [expdir2 exprdir3 ...]\n")
  q()
}

# argv is the experiments that we will process
library(stringr)
argv = str_replace(argv, "/", "")

source("../tools/R/logz_plot.R")
source("../tools/R/posterior.R")
source("../tools/R/simulate_trees.R")
source("../tools/R/tree_stats.R")
library(dplyr)
library(readr)

birds_metadata = read_csv(file = "../trees/birds_metadata.csv") %>% dplyr::filter(experiments %in% argv)
attach(birds_metadata)

dir_prefix = file.path(c("../trees/birds-nexus/"))
num_exp = length(experiments)
original_tree = file.path(rep(dir_prefix, num_exp), paste0(tree_names, rep(".tre", num_exp)))

# PPC - data generation
for (k in 1:length(experiments)) {
  original = original_tree[k]
  experiment_dir = experiments[k]
  rho = rhos[k]
  age = ages[k]
  cat("Processing ", experiments[k], "\n")
  fname = paste0("data_", experiments[k], ".Rdata")
  if (!file.exists(fname)) {
    data = do.call(rbind, lapply(1:length(modelpattern), function(i) {
      subdir = list.files(path = experiment_dir, pattern = modelpattern[i])
      cat(subdir)
      data = simulate_trees(model_dir = file.path(experiment_dir, subdir), tree_age = age, rho = rho, N = nriterations, minsize = 2)
    }))
    
    post_data_samples = do.call(rbind, lapply(1:length(shortcuts), function(i) {
      post_data = get_posterior_samples(experiment_dir = experiment_dir, model = shortcuts[i], N = nriterations)
      post_data.m = cbind(post_data, model = titles[i])  
    }) )
    
    cat("Saving...\n")
    save(data, post_data_samples, file = paste0("data_", experiments[k], ".Rdata"))
  }
  else {
    cat("Loading...\n")
    load(fname)
  }
}