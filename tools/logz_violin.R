# A script to produce violin plots of the logZ estimates

library(ggplot2)

metadata_from_dir = function(experiment_dir, fields = c("Model",
                                                        "tree", 
                                                        "rho", 
                                                        "λ0.k",
                                                        "λ0.θ",
                                                        "μ0.k",
                                                        "μ0.θ",
                                                        "ν0.k",
                                                        "ν0.θ",
                                                        "α.σ.m0",
                                                        "α.σ.ν.v",
                                                        "α.σ.a",
                                                        "α.σ.b",
                                                        "α.σ.ν.m0",
                                                        "α.σ.ν.v",
                                                        "α.σ.νu.a",
                                                        "α.σ.ν.b",
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

plot_logz_directory = function(experiment_dir, labels = FALSE,
                               y = c(-577, -576, -576, -577, -576, -577), label = "", plotf = "plot.svg")
{
  experiment_files = list.files(experiment_dir)
  experiment_metadata = as.data.frame(do.call(rbind, strsplit(experiment_files, "_")))
  names(experiment_metadata) = c("Model",
                              "tree", 
                               "rho", 
                              "λ0.k",
                              "λ0.theta",
                              "μ0.k",
                              "μ0.theta",
                              "ν0.k",
                              "ν0.theta",
                              "α.σ.m0",
                              "α.σ.ν.v",
                              "α.σ.a",
                              "α.σ.b",
                              "α.σ.ν.m0",
                              "α.σ.ν.v",
                              "α.σ.νu.a",
                              "α.σ.ν.b",
                              "clads",
                              "extinction_level",
                              "anads_level",
                              "N",
                              "sweeps")

  extract_logz = function(experiment_nr) {
    logz_file = paste0(experiment_dir, "//", experiment_files[experiment_nr], "//log_norm_const.txt")
    logz = as.numeric(jsonlite::fromJSON(logz_file))
    data.frame(epxeriment_nr = as.factor(rep(experiment_nr, length(logz))), logz = logz)
  }

  data = do.call(rbind, lapply(1:length(experiment_files), extract_logz))

  if (labels) {
    return(ggplot(data, aes(factor(epxeriment_nr),logz)) + geom_violin() + 
      labs(title = experiment_dir) + xlab("Experiment #") + 
      annotate("Text", x = 2, y = y[1], label = label[1], size = 3) +
      annotate("Text", x = 5, y = y[2], label = label[2], size = 3) +
      annotate("Text", x = 8, y = y[3], label = label[3], size = 3) +
      annotate("Text", x =11, y = y[4], label = label[4], size = 3)  +
      annotate("Text", x =14, y = y[5], label = label[5], size = 3)  +
      annotate("Text", x =17, y = y[6], label = label[6], size = 3)  )
  }  else {
    p = (ggplot(data, aes(factor(epxeriment_nr),logz)) + geom_violin() + 
      labs(title = experiment_dir) + xlab("Experiment #")  + stat_summary(fun = "mean",
                                                                           geom = "point",
                                                                           color = "red"))
    ggsave(plotf, p)
    return(p)
  }
  
}


plot_running_times = function(experiment_dir, labels = TRUE,
                               y = c(-577, -576, -576, -577, -576, -577),
                               label = c("Very low sigma", "Low Sigma", "Equivalent models", "ClaDS", "Large sigma", "Verification")
)
{
  experiment_files = list.files(experiment_dir)
  experiment_metadata = as.data.frame(do.call(rbind, strsplit(experiment_files, "_")))
  names(experiment_metadata) = c("Model",
                                 "tree", 
                                 "rho", 
                                 "lamdba0.k",
                                 "lambda0.theta",
                                 "mu0.k",
                                 "mu0.theta",
                                 "nu0.k",
                                 "nu0.theta",
                                 "alpha_sigma.mu",
                                 "alpha_sigma.v",
                                 "alpha_sigma.a",
                                 "alpha_sigma.b",
                                 "alpha_sigma_nu.mu",
                                 "alpha_sigma_nu.v",
                                 "alpha_sigma_nu.a",
                                 "alpha_sigma_nu.b",
                                 "clads",
                                 "extinction_level",
                                 "anads_level",
                                 "N",
                                 "sweeps")
  
  extract_running_time = function(experiment_nr) {
    logz_file = paste0(experiment_dir, "//", experiment_files[experiment_nr], "//time.txt")
    logz = readLines(jsonlite::fromJSON(logz_file))
    data.frame(epxeriment_nr = as.factor(rep(experiment_nr, length(logz))), logz = logz)
  }
  
  data = do.call(rbind, lapply(1:length(experiment_files), extract_running_time))
  
 
}


# TODO export metadata as latex
# draw posteriors
# TODO do the times

#plot_logz_directory("experiments/Anatinae")
#plot_logz_directory("experiments/Lari", y = c(-714, -714, -714, -713, -714, -714, -714))
