importance_sample = function(variable_name = "lambda0",
                                  package_dir = "results")
{
    logz_file = paste0(package_dir, "/log_norm_const.txt")
    data_file = paste0(package_dir, "/data.csv")
    data_header_file = paste0(package_dir, "/header.csv")
    
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
                      package_dir = "birch-dat")
{
    birch_dat = read.table(paste0(package_dir, "/pdf_", variable_name, ".csv"), sep = ";")
    names(birch_dat) = c(variable_name, "pdf")
    return(birch_dat)
}



# plotting
colors <- c("ClaDS2" = 1, "AnaDS21" = 2, "Birch" = 3)
atitle = paste("Plot of lambda0", "lambda0")
data_clads2 = importance_sample("lambda0", "results-clads2")
data_anads21 = importance_sample("lamda0", "results-anads21-gamma")
p = ggplot2::ggplot(data_clads2, ggplot2::aes_string(x = "lambda0")) +
    ggplot2::geom_density(ggplot2::aes(color = "ClaDS2")) +
    ggplot2::ggtitle(atitle) + ggplot2::theme_light() +
    ggplot2::scale_color_manual(values = colors) +
    ggplot2::geom_line(data = birch_data(), ggplot2::aes_string(x = "lambda0", y = "pdf", color = '"Birch"'))  +
    ggplot2::geom_density(data = data_anads21, ggplot2::aes_string(x="lambda0", color='"AnaDS21"'))

p

