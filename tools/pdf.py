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


def pdf_normal_inverse_gamma_v(x, μ, v, α, β):
    σ = np.sqrt(β/α/v)
    return t.pdf(x, 2.0*α, μ, σ)

 
def sample(data, dist, parameter_map):
    idx = npr.choice(len(data), 50000, p=data['W'])
    data = data.loc[idx]
    kwargs = {k: data[v].values.reshape((-1, 1)) for k, v in parameter_map.items()}
    if dist == "normal_inverse_gamma_v":
        kwargs = {
            'df': 2.0*kwargs['α'],
            'loc': kwargs['μ'],
            'scale': np.sqrt(kwargs['β']/kwargs['α']/kwargs['v'])
        }
        dist = t
    return dist.rvs(**kwargs, size=(len(data), 1000)).flatten()


columns = pd.read_csv(header_file, delimiter=', ', engine='python').columns
data = pd.read_csv(data_file, header=None, delimiter=', ', engine='python')
logZ = pd.read_csv(logZ_file, header=None)

data.columns = columns
data['logZ'] = logZ[0].repeat(len(data) / len(logZ)).values
data['W'] = np.exp(data['logZ'] - data['logZ'].max())
data['W'] /= data['W'].sum()

sample_λ = sample(data, gamma, {'a': 'lambda_0.k', 'scale': 'lambda_0.theta'})
sample_μ = sample(data, gamma, {'a': 'mu_0.k', 'scale': 'mu_0.theta'})
sample_log_α_gbm = sample(data, "normal_inverse_gamma_v", {'μ': 'alphaSigma_gbm.m0', 'v': 'alphaSigma_gbm.v', 'α': 'alphaSigma_gbm.a', 'β': 'alphaSigma_gbm.b'})
sample_sigma2_gbm = sample(data, invgamma, {'a': 'alphaSigma_gbm.a', 'scale': 'alphaSigma_gbm.b'})
sample_log_α = sample(data, "normal_inverse_gamma_v", {'μ': 'alphaSigma.m0', 'v': 'alphaSigma.v', 'α': 'alphaSigma.a', 'β': 'alphaSigma.b'})
sample_sigma2 = sample(data, invgamma, {'a': 'alphaSigma.a', 'scale': 'alphaSigma.b'})

"""
print("lmbd\tmu\tbm_loga\tbm_s2\tloga\ts2")
print('%.2f' % np.mean(sample_λ), '%.2f' % np.mean(sample_μ), '%.2f' % np.mean(sample_log_α_gbm), '%.2f' % np.mean(sample_sigma2_gbm),'%.2f' % np.mean(sample_log_α), '%.2f' % np.mean(sample_sigma2), sep = "\t")
"""

print("Statistic, Value")
print("lambda_mixture_mean,", np.sum(data['W'] * data['lambda_0.k'] * data['lambda_0.theta']))
print("lambda_sample_median,", np.median(sample_λ))
print("mu_mixture_mean,", np.sum(data['W'] * data['mu_0.k'] * data['mu_0.theta']))
print("mu_sample_median,", np.median(sample_μ))
print("gbm_log_alpha_sample_mean,", np.mean(sample_log_α_gbm))
print("gbm_log_alpha_sample_median,", np.median(sample_log_α_gbm))
print("gbm_sigma2_sample_mean,", np.mean(sample_sigma2_gbm))
print("gbm_sigma2_sample_median,", np.median(sample_sigma2_gbm))
print("loga_sample_mean,", np.mean(sample_log_α))
print("loga_sample_median,", np.median(sample_log_α))
print("sigma2_sample_mean,", np.mean(sample_sigma2))
print("sigma2_sample_median,", np.median(sample_sigma2))


"""
# lambda
print("Mean of the mixture λ:", np.sum(data['W'] * data['lambda_0.k'] * data['lambda_0.theta']))
print("Mean λ:", np.mean(sample_λ))
print("Var λ", np.var(sample_λ))
print("Median λ:", np.median(sample_λ))

# mu
print("Mean of the mixture μ:", np.sum(data['W'] * data['mu_0.k'] * data['mu_0.theta']))
print("Mean μ:", np.mean(sample_μ))
print("Var μ:", np.var(sample_μ))
print("Median μ:", np.median(sample_μ))

# GBM log alpha
print("GBM Mean log α:", np.mean(sample_log_α_gbm))
print("GBM Var log α:", np.var(sample_log_α_gbm))
print("GBM Median log α:", np.median(sample_log_α_gbm))

# GBM sigma
print("GBM Mean sigma2", np.mean(sample_sigma_gbm))
print("GBM Var sigma2", np.var(sample_sigma_gbm))
print("GBM Median sigma2", np.median(sample_sigma_gbm))

# log alpha
print("Mean log α:", np.mean(sample_log_α))
print("Var log α:", np.var(sample_log_α))
print("Median log α:", np.median(sample_log_α))

# sigma
print("Mean sigma2", np.mean(sample_sigma))
print("Var sigma2", np.var(sample_sigma))
print("Median sigma2", np.median(sample_sigma))
"""
plot_pdf(λ, data, gamma.pdf, {'a': 'lambda_0.k', 'scale': 'lambda_0.theta'}, 'plots/lambda0.png')
plot_pdf(μ, data, gamma.pdf, {'a': 'mu_0.k', 'scale': 'mu_0.theta'}, 'plots/mu0.png')
#plot_pdf(η, data, gamma.pdf, {'a': 'η_k', 'scale': 'η_θ'}, 'eta.png')
plot_pdf(log_α, data, pdf_normal_inverse_gamma_v, {'μ': 'alphaSigma_gbm.m0', 'v': 'alphaSigma_gbm.v', 'α': 'alphaSigma_gbm.a', 'β': 'alphaSigma_gbm.b'}, 'plots/gbm-log-alpha.png')
plot_pdf(σ2, data, invgamma.pdf, {'a': 'alphaSigma_gbm.a', 'scale': 'alphaSigma_gbm.b'}, 'plots/gbm-sigma2.png')
plot_pdf(log_α, data, pdf_normal_inverse_gamma_v, {'μ': 'alphaSigma.m0', 'v': 'alphaSigma.v', 'α': 'alphaSigma.a', 'β': 'alphaSigma.b'}, 'plots/log-alpha.png')
plot_pdf(σ2, data, invgamma.pdf, {'a': 'alphaSigma.a', 'scale': 'alphaSigma.b'}, 'plots/sigma2.png')
