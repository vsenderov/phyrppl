# Input: a directory of experiment packages
# Produces:
#   - a plot of log Z vs a variable (for example step size or guard setting)
#   - a plot of execution loss (% of crashed programs)

library(ggplot2)

metadata_from_dir = function(experiment_dir, fields = c("Model",
                                                        "tree", 
                                                        "rho", 
                                                        "lambda_0.k",
                                                        "lambda_0.theta",
                                                        "mu_0.k",
                                                        "mu_0.theta",
                                                        "nu_0.k",
                                                        "nu_0.theta",
                                                        "alpha.sigma.m0",
                                                        "alpha.sigma.v",
                                                        "alpha.sigma.a",
                                                        "alpha.sigma.b",
                                                        "alpha.sigma.nu.m0",
                                                        "alpha.sigma.nu.v",
                                                        "alpha.sigma.nu.a",
                                                        "alpha.sigma.nu.b",
                                                        "clads",
                                                        "extinct",
                                                        "anads",
                                                        "step",
                                                        "depth",
                                                        "N",
                                                        "sweeps")) {
  experiment_files = list.files(experiment_dir)
  experiment_metadata = as.data.frame(do.call(rbind, strsplit(experiment_files, "_")))
  names(experiment_metadata) = fields
  return(experiment_metadata)
}

plot_logz_directory = function(experiment_dir, xvar = "step", plotf = "plot.svg", title)
{
  experiment_files = list.files(experiment_dir)
  experiment_metadata = metadata_from_dir(experiment_dir)
 
  extract_logz = function(experiment_nr) {
    logz_file = paste0(experiment_dir, "//", experiment_files[experiment_nr], "//logz.txt")
    logz = as.numeric(readLines(logz_file))
    data.frame(epxeriment_nr = as.factor(rep(experiment_nr, length(logz))), logz = logz)
  }
  
  data = do.call(rbind, lapply(1:length(experiment_files), extract_logz))
  
  edata =  do.call(rbind, lapply ( 1:nrow(data) , function(i) {
   cbind(data[i,], experiment_metadata[data[i,1],])
  }))
  edata$step = as.numeric(edata$step)
  edata$depth = as.numeric(edata$depth)
  
  ggplot(data = edata, mapping = aes_string(x = xvar, y = "logz")) + 
    geom_point()  + geom_smooth() + ggtitle(title)
  
}
  
percentage_loss_plot = function(experiment_dir, xvar, title) {
  experiment_files = list.files(experiment_dir)
  experiment_metadata = metadata_from_dir(experiment_dir)
  
  extract_logz = function(experiment_nr) {
    logz_file = paste0(experiment_dir, "//", experiment_files[experiment_nr], "//logz.txt")
    logz = as.numeric(readLines(logz_file))
    data.frame(epxeriment_nr = as.factor(rep(experiment_nr, length(logz))), logz = logz)
  }
  
  data = do.call(rbind, lapply(1:length(experiment_files), extract_logz))
  loss = do.call(rbind, lapply(unique(data$epxeriment_nr), function(i) {
    ix = data$epxeriment_nr == i
    cbind("loss" = sum(is.na(data[ix, 2])), experiment_metadata[i,])
  }))
  loss[[xvar]] = as.numeric(loss[[xvar]])
  
  ggplot(data=loss, aes_string(x=xvar, y="loss")) +
    geom_line()+
    geom_point() + ggtitle(title)
}
  
logz_violin = function(experiment_dir, plotf = "plot.svg")
{
  experiment_files = list.files(experiment_dir)
  experiment_metadata = metadata_from_dir(experiment_dir)
  
  extract_logz = function(experiment_nr) {
    logz_file = paste0(experiment_dir, "//", experiment_files[experiment_nr], "//logz.txt")
    logz = as.numeric(readLines(logz_file))
    data.frame(epxeriment_nr = as.factor(rep(experiment_nr, length(logz))), logz = logz)
  }
  
  data = do.call(rbind, lapply(1:length(experiment_files), extract_logz))
  
    p = (ggplot(data, aes(factor(epxeriment_nr),logz)) + geom_violin()   + stat_summary(fun = "mean",
                                                                               geom = "point",
                                                                               color = "red"))
    #ggsave(plotf, p)
    return(p)
  
  
}



plot_logz_directory("experiments/guards", xvar = "depth", title = "Effect of maximum recursion depth on log Z in AnaDS-GBM for step of 0.125")
percentage_loss_plot("experiments/guards", xvar = "depth", "% of computations lost with maximum depth setting")
plot_logz_directory("experiments/rescaling", xvar = "step", title = "Effect of step size (while rescaling the variance) on log Z for AnaDS-GBM")
percentage_loss_plot("experiments/rescaling", xvar = "step",  "% of computations lost with certain step size")
#plot_logz_directory("experiments/models", xvar = "epxeriment_nr")

logz_violin("experiments/models/") +  annotate("Text", x = 1, y = -581, label = "AnaDS1", size = 10) +
  annotate("Text", x = 2, y = -587, label = "AnaDS2", size = 10) +
  annotate("Text", x = 3, y = -581, label = "AnaDS-GBM", size = 10) + ggtitle("Comparison between models of gradual evolution")

  
