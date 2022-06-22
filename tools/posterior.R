importance_sample = function(variable_name = "lambda0",
                             package_dir = "results",
                             analysis_name = "CombineDS")
{
    logz_file = paste0(package_dir, "/log_norm_const.txt")
    data_file = paste0(package_dir, "/", analysis_name, ".csv")
    data_header_file = paste0(package_dir, "/", analysis_name, "_header.csv")
    
    logz = as.numeric(jsonlite::fromJSON(logz_file))
    data_header = read.csv(data_header_file, header = TRUE)
    nsweeps = nrow(data_header) + 1
    data = read.csv(data_file, header = FALSE)
    M = nrow(data)/nsweeps
    names(data) = names(data_header)
    
    data$logz =  unlist(lapply(logz, function(x) rep(x, M)))
    data$weight = exp(data$logz - max(data$logz))/sum(exp(data$logz - max(data$logz)))

    return(data)
}


birch_data = function(variable_name = "lambda0",
                      package_dir = "experiments/Anatinae-birch")
{
    birch_dat = read.table(paste0(package_dir, "/pdf_", variable_name, ".csv"), sep = ";")
    names(birch_dat) = c(variable_name, "pdf")
    return(birch_dat)
}



# plotting
plot_posterior = function(variable_name = "lambda0",
                          experiment_dir = "Anatinae",
                          exp_subset = NA, note = "",
                          plotf  = "plot.png", xlim = c(0,2))
{
  experiment_files = list.files(experiment_dir)
  atitle = paste("Posterior plot of", variable_name, "for", experiment_dir, note)
  #data = importance_sample(variable_name, paste0(experiment_dir, "//", experiment_files[1]))
  data = read.csv(file.path(experiment_dir, experiment_files[1], "data", paste0( variable_name, ".csv")))
  colors = as.factor(sapply(strsplit(experiment_files, "_"), function(split) {split[length(split)]}))
  
  p = ggplot()# + geom_line(data = data, aes(x = x, y = pdf, color = colors[1])) + xlim(xlim)
  
  if (length(exp_subset) == 1 && is.na(exp_subset)) {
    exp_subset = 1:length(experiment_files)
  }
  
  for (experiment_nr in exp_subset) {
    #data = importance_sample(variable_name, paste0(experiment_dir, "//", experiment_files[experiment_nr]))
    data = read.csv(file.path(experiment_dir, experiment_files[experiment_nr], "data", paste0( variable_name, ".csv")))
    
    p = p + geom_line(data = data, aes_string(x = "x", y = "pdf", color = colors[experiment_nr])) + xlim(xlim)  
  }
  
 p = p +    ggplot2::ggtitle(atitle) + ggplot2::theme_light()
  
 ggsave(plotf, p)
 p  
}
