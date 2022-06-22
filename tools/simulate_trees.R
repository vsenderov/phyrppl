digs = function(x, k = 2) {
  format(round(x, 2), nsmall = k)
}

#' Validate trees among possible cases
#' 
#'  - valid tree
#'  - guards
#'  - bo Survivors
#'
#' @param trees  A list of string containing possible Newick trees
#' @param pattern1  No survivors regexp
#' @param pattern2  Guards regexp
#'
#' @return  A character vector with valid trees
#' @export
#' 
valid_trees = function(trees, pattern1 = "^No", pattern2 = "^Guards") {
  na.omit(sapply(trees, function(tree) {
    if(grepl(pattern1, tree)[1] || grepl(pattern2, tree)[1]) {
      return(NA)
    } else return(tree)
  }))
}

#' Find zero trees
#'
#' @param trees  A list of strings containing possible Newick trees
#' @param pattern  No survivors regexp
#'
#' @return  The number of zero node trees founds
#' @export
#'
zero_trees = function(trees, pattern = "^No") {
  sum(sapply(trees, function(tree) {
    if(grepl(pattern, tree)[1]) {
      return(TRUE)
    } else return(FALSE)
  }))
}


#' Simulates exactly tree
#'
#' @param model_dir 
#' @param tree_age 
#' @param rho 
#'
#' @return Newick string with tree
#' @export
#'
#' @examples
#' simtree("Anatinae/CombineDS_Anatinae_0.87_1.0_1.0_1.0_0.5_1.0_1.0_0_1.0_3.0_0.5_0_1.0_3.0_0.1_false_0_0_0.05_500_100000_100_28_1_anadsGBM0_/", 5, 0.5)
#' 
simtree = function(model_dir, tree_age, rho) {
  a = getwd()
  setwd(model_dir)
  cmd = "node"
  script = list.files(pattern = "*.js")
  args = c(script, "--stack-size=1024", ".", tree_age, rho)
  r = system2(command = cmd, args = args, stdout = TRUE)
  setwd(a)
  return(r)
}

#' Runs simtree but returns a single row dataframe with the stats
#'
#' @param model_dir 
#' @param tree_age 
#' @param rho 
#'
#' @return data frame
#' @export
#'
#' @examples
#' simtree_df("Anatinae/CombineDS_Anatinae_0.87_1.0_1.0_1.0_0.5_1.0_1.0_0_1.0_3.0_0.5_0_1.0_3.0_0.1_false_0_0_0.05_500_100000_100_28_1_anadsGBM0_/", 5, 0.5)
#' 
simtree_df = function(model_dir, tree_age, rho) {
  simresult = simtree(model_dir, tree_age, rho)
  modelname = readLines(con = file.path(model_dir, "model.txt"))
  length = length(simresult)
  tr = read.newick(text = simresult[length])
  cat(".")
  nodes = tr$Nnode
  cat(".")
  gammaval = gammatest(ltt(tr))$gamma # the gamma stat value for each tree in the experiment
  cat(".")
  if (tr$Nnode > 2) { 
      tree = collapse.singles(tr)
      aptree = as.treeshape(tr)
      colval = (colless(aptree))
  } else colval = NA
  cat(".\n")
  fails = length - 1
  zeros = zero_trees(simresult, pattern = "^Error: No")
  maxed = fails - zeros
  return(data.frame(nodes, gammaval, colval, zeros, maxed, modelname))
}

gamma_from_file = function(original) {
  tr = read.nexus(original)
  gammatest(ltt(tr))$gamma
}

nodes_from_file = function(original) {
  tr = read.nexus(original)
  tr$Nnode
} 

colval_from_file = function(original) {
  tr = read.nexus(original)
  if (tr$Nnode > 2) { 
    tree = collapse.singles(tr)
    aptree = as.treeshape(tr)
    colless(aptree)
  } else NA
} 


plotsimtree = function(model_dir, tree_age, rho, ...) {
  simresult = simtree(model_dir, tree_age, rho)  
  length = length(simresult)
  tr = read.newick(text = simresult[length])
  plot.phylo(tr, ...)
  title("Simulated tree")
}

simulate_trees = function(model_dir, tree_age, rho, N) {
  index = seq(from = 1, to = N, by = 1)
  do.call(rbind, lapply(index, function(i) {
    simtree_df(model_dir, tree_age, rho)
  }))
}