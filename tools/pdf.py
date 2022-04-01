#!/usr/bin/env python

import numpy as np
import pandas as pd
import numpy.random as npr
from scipy.stats import gamma, norm, invgamma, t
import matplotlib.pyplot as plt

data_file = "CombineDS.csv"
header_file = "CombineDS_header.csv"
logZ_file = "logz.txt"

# Grids (row vectors)
λ = np.linspace(0, 1, num=201)
μ = np.linspace(0, 1, num=201)
η = np.linspace(0, 0.05, num=201)
log_α = np.linspace(-1, 1, num=201)
σ2 = np.linspace(0, 1, num=201)


def plot_pdf(x, data, pdf_fn, parameter_map, plotname):
    kwargs = {k: data[v].values.reshape((-1, 1)) for k, v in parameter_map.items()}
    pdf = np.sum(data['W'].values.reshape((-1, 1)) * pdf_fn(x.reshape((1, -1)), **kwargs), axis=0)
    plt.figure()
    plt.plot(x, pdf)
    plt.show()
    plt.savefig(plotname)


def pdf_normal_inverse_gamma(x, μ, a2, α, β):
    σ = np.sqrt(a2*β/α)
    return t.pdf((x - μ)/σ, 2.0*α)/σ

def pdf_normal_inverse_gamma_v(x, μ, v, α, β):
    a2 = 1/v
    σ = np.sqrt(a2*β/α)
    return t.pdf((x - μ)/σ, 2.0*α)/σ



columns = pd.read_csv(header_file, delimiter=', ', engine='python').columns
data = pd.read_csv(data_file, header=None, delimiter=', ', engine='python')
logZ = pd.read_csv(logZ_file, header=None)

data.columns = columns
data['logZ'] = logZ[0].repeat(len(data) / len(logZ)).values
data['W'] = np.exp(data['logZ'] - data['logZ'].max())
data['W'] /= data['W'].sum()

plot_pdf(λ, data, gamma.pdf, {'a': 'lambda_0.k', 'scale': 'lambda_0.theta'}, 'plots/lambda0.png')
plot_pdf(μ, data, gamma.pdf, {'a': 'mu_0.k', 'scale': 'mu_0.theta'}, 'plots/mu0.png')
#plot_pdf(η, data, gamma.pdf, {'a': 'η_k', 'scale': 'η_θ'}, 'eta.png')
plot_pdf(log_α, data, pdf_normal_inverse_gamma_v, {'μ': 'alphaSigma_gbm.m0', 'v': 'alphaSigma_gbm.v', 'α': 'alphaSigma_gbm.a', 'β': 'alphaSigma_gbm.b'}, 'plots/gbm-log-alpha.png')
plot_pdf(σ2, data, invgamma.pdf, {'a': 'alphaSigma_gbm.a', 'scale': 'alphaSigma_gbm.b'}, 'plots/gbm-sigma2.png')
plot_pdf(log_α, data, pdf_normal_inverse_gamma_v, {'μ': 'alphaSigma.m0', 'v': 'alphaSigma.v', 'α': 'alphaSigma.a', 'β': 'alphaSigma.b'}, 'plots/log-alpha.png')
plot_pdf(σ2, data, invgamma.pdf, {'a': 'alphaSigma.a', 'scale': 'alphaSigma.b'}, 'plots/sigma2.png')
