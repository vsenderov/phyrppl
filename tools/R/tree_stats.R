## Tree stats

get_posterior_samples = function(experiment_dir, model="anadsGBM0", N=10) {
  curd = getwd()
  setwd(file.path(experiment_dir, list.files(experiment_dir, pattern = model, all.files = TRUE)))
  outp = do.call(rbind,lapply(1:N, function(i) 
  {
    data.frame(jsonlite::fromJSON(system("python3 sample.py", intern = TRUE)))
  }))
  setwd(curd)
  return(outp)
}

get_number_nodes = function(treepath) {
  tr = read.nexus(file.path(treepath))
  return(tr$Nnode)
}

get_colles = function(treepath) {
  tr = read.nexus(file.path(treepath))
  if (tr$Nnode > 2) { 
    tree = collapse.singles(tr)
    aptree = as.treeshape(tr)
    colval = (colless(aptree))
  } else colval = NA
}

get_gamma = function(treepath) {
  tr = read.nexus(file.path(treepath))
  gammaval = gammatest(ltt(tr, plot=FALSE))$gamma 
}

compute_gain = function(experiment_dir, base = "crbd", rest = "tdbd") {
  base_dir = list.files(experiment_dir, pattern = base, all.files = TRUE)
  base_file = file.path(experiment_dir, base_dir, "logz.txt")
  base_logz = as.numeric(readLines(base_file))
  
  rest_dir = list.files(experiment_dir, pattern = rest, all.files = TRUE)
  rest_file = file.path(experiment_dir, rest_dir, "logz.txt")
  rest_logz = as.numeric(readLines(rest_file))
  gain_logz = rest_logz - base_logz
  return_val = c(mean(gain_logz), quantile(gain_logz, c(0.05, 0.95)))
  names(return_val) = paste(base, rest, names(return_val), sep = "_")
  return(return_val)
}
