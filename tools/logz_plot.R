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
  experiment_files = list.files(experiment_dir, pattern = "*")
  #experiment_files = experiment_files[experiment_files != "special"]
  experiment_metadata = as.data.frame(do.call(rbind, strsplit(experiment_files, "_")))
  names(experiment_metadata) = fields
  return(experiment_metadata)
}

plot_logz_directory = function(experiment_dir, xvar = "step", plotf = "plot.svg", title)
{
  experiment_files = list.files(experiment_dir)
  experiment_metadata = cbind(metadata_from_dir(experiment_dir), model = as.factor(1:length(experiment_files)))
 
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
  edata$nsteps = 1/edata$step
  
  ggplot(data = edata, mapping = aes_string(x = xvar, y = "logz")) + 
    geom_point() + geom_smooth(method="gam", formula = y ~ s(x, bs = "cs", k=K)) + 
    
    ggtitle(title)
}
################################################################################
plot_logz_directory_box = function(experiment_dir, xvar = "step", plotf = "plot.svg", title)
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
  edata$depth = as.factor(as.numeric(edata$depth))
  edata$nsteps = as.factor(round(1/edata$step))
  
  
  ggplot(data = edata, mapping = aes_string(x = xvar, y = "logz")) + 
    geom_boxplot() +
    #geom_violin()+ geom_jitter(alpha = 0.1, width = 0.15) +
    ggtitle(title)
}
################################################################################
plot_logz_directory_violin = function(experiment_dir, xvar = "step", plotf = "plot.svg", title)
{
  experiment_files = list.files(experiment_dir, pattern = "*")
  
  models = sapply(experiment_files, function(ef) {
    readLines(file.path(experiment_dir, ef, "model.txt"))
  })
  experiment_metadata = cbind(metadata_from_dir(experiment_dir), model = models)
  
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
  edata$depth = as.factor(as.numeric(edata$depth))
  edata$nsteps = as.factor(round(1/edata$step))
  
  #logz_crbd = mean(as.numeric(readLines(con = file.path(experiment_dir, ".special", "crbd_logz.txt"))))
  #logz_tdbd = mean(as.numeric(readLines(con = file.path(experiment_dir, ".special", "tdbd_logz.txt"))))
  #cat(logz_tdbd)
  ggplot(data = edata, mapping = aes_string(x = xvar, y = "logz", col = xvar), show.legend = FALSE) + #geom_hline(yintercept = logz_crbd, linetype = "dotted") + scale_x_discrete() + ylab(TeX("$\\log Z$")) +
    #geom_hline(yintercept = logz_tdbd, linetype = "dashed") +
    geom_violin()+ geom_jitter(alpha = 0.1, width = 0.15) +
    ggtitle(title) + 
    geom_smooth(method="gam", aes(x = as.numeric(depth), y=logz), formula = y ~ s(x, bs = "cs", k=K)) +
    theme_light() + ggplot2::xlab("") + theme(legend.position = "none", panel.grid.minor = element_blank())
}
################################################################################



  
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
    cbind("loss" = sum(is.na(data[ix, 2]))/length(data[ix, 2])*100, experiment_metadata[i,])
  }))
    loss$nsteps = 1/as.numeric(loss$step)
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

