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
plot_posterior = function(variable_name = "lambda0", experiment_dir = "experiments/Anatinae", exp_subset = NA, note="",
                          plotf  = "plot.png", xlim = c(0,4), Q3p = 1.0) {
  experiment_files = list.files(experiment_dir)
  atitle = paste("Plot of",variable_name,experiment_dir, note)
  data = importance_sample(variable_name, paste0(experiment_dir, "//", experiment_files[1]))

  colors <- as.factor(substr(experiment_files, 90, 110))
  p = ggplot()
  #p = ggplot2::ggplot(data, ggplot2::aes_string(x = variable_name)) +
   # ggplot2::geom_density(aes(color = colors[1])) +   ggplot2::scale_color_manual(values = colors)
    
  if (is.na(exp_subset)) {
    exp_subset = 1:length(experiment_files)
  }
  for (experiment_nr in exp_subset) {
    
    data = importance_sample(variable_name, paste0(experiment_dir, "//", experiment_files[experiment_nr]))
    Q3 <- quantile(data[[variable_name]], Q3p)
    IQR = IQR(data[[variable_name]])
    no_outliers <- subset(data[[variable_name]], data[[variable_name]] <= (Q3))
    mval = mean(no_outliers, na.rm = TRUE)
    p = p +  ggplot2::geom_density(data = data, ggplot2::aes_string(x=variable_name, color = colors[experiment_nr]) )    +
      geom_vline(data = data,aes_string(xintercept=mval, color = colors[experiment_nr]),     linetype="dashed", size=1) + xlim(xlim)
  }
  
 p = p +    ggplot2::ggtitle(atitle) + ggplot2::theme_light()
  
 ggsave(plotf, p)
  
}


#plot_posterior(exp_subset = 1:3, note = "very low sigma")
#plot_posterior(exp_subset = 4:6, note = "low sigma")
#plot_posterior(exp_subset = 7:9, note = "equivalent model")
#plot_posterior(exp_subset = 10:12, note = "ClaDS") + ggplot2::geom_line(data = birch_data(), ggplot2::aes_string(x = "lambda0", y = "pdf"))
#plot_posterior(exp_subset = 7:12, note = "equivalent model vs clads") + ggplot2::geom_line(data = birch_data(), ggplot2::aes_string(x = "lambda0", y = "pdf"))
#plot_posterior(exp_subset = 13:15, note = "Large sigma")
#plot_posterior(exp_subset = 16:18, note = "Verification")



#plot_posterior(exp_subset = 10:12, experiment_dir = "experiments/Lari") +  ggplot2::geom_line(data = birch_data(package_dir = "experiments/Lari-birch"), ggplot2::aes_string(x = "lambda0", y = "pdf"))
#colors <- c(paste0("Experiment", package_nr) = 1, "Birch" = 2)

#data_clads2 = importance_sample(variable_name, paste0("experiments/", experiment_files[package_nr]))
#p = ggplot2::ggplot(data_clads2, ggplot2::aes_string(x = "lambda0")) +
#  ggplot2::geom_density(ggplot2::aes(color = "ClaDS2")) +
#  ggplot2::ggtitle(atitle) + ggplot2::theme_light() +
#  ggplot2::scale_color_manual(values = colors) +
#  ggplot2::geom_line(data = birch_data(), ggplot2::aes_string(x = "lambda0", y = "pdf", color = '"Birch"'))  +
#  ggplot2::geom_density(data = data_anads21, ggplot2::aes_string(x="lambda0", color='"AnaDS21"'))

#p
