var webppl = require("/usr/local/lib/node_modules/webppl/src/main.js");
var args = require("/usr/local/lib/node_modules/webppl/src/args.js");
args.makeGlobal(__filename, process.argv.slice(2));
var webpplFs = require("/home/viktor/.webppl/node_modules/webppl-fs");
var phyjs = require("/home/viktor/Dropbox/Work/phywppl/phywppl/node_modules/phyjs");
var __runner__ = util.trampolineRunners.cli();
function topK(s, x) {
  console.log(x);
};
var main = (function (_globalCurrentAddress) {
    return function (p) {
        return function (runTrampoline) {
            return function (s, k, a) {
                runTrampoline(function () {
                    return p(s, k, a);
                });
            };
        };
    }(function (globalStore, _k0, _address0) {
        var _currentAddress = _address0;
        _addr.save(_globalCurrentAddress, _address0);
        var Bernoulli = dists.makeBernoulli;
        var Beta = dists.makeBeta;
        var Binomial = dists.makeBinomial;
        var Categorical = dists.makeCategorical;
        var Cauchy = dists.makeCauchy;
        var Delta = dists.makeDelta;
        var DiagCovGaussian = dists.makeDiagCovGaussian;
        var Dirichlet = dists.makeDirichlet;
        var Discrete = dists.makeDiscrete;
        var Exponential = dists.makeExponential;
        var exponential = function exponential(globalStore, _k1253, _address10, arg0) {
            var _currentAddress = _address10;
            _addr.save(_globalCurrentAddress, _address10);
            var _k1255 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Exponential(globalStore, function (globalStore, _result1254) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1253, _address10.concat('_19'), _result1254);
                        };
                    }, _address10.concat('_18'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1255(globalStore, arg0) : _k1255(globalStore, { a: arg0 });
            };
        };
        var Gamma = dists.makeGamma;
        var Gaussian = dists.makeGaussian;
        var gaussian = function gaussian(globalStore, _k1247, _address12, arg0, arg1) {
            var _currentAddress = _address12;
            _addr.save(_globalCurrentAddress, _address12);
            var _k1249 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Gaussian(globalStore, function (globalStore, _result1248) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1247, _address12.concat('_23'), _result1248);
                        };
                    }, _address12.concat('_22'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1249(globalStore, arg0) : _k1249(globalStore, {
                    mu: arg0,
                    sigma: arg1
                });
            };
        };
        var ImproperUniform = dists.makeImproperUniform;
        var IspNormal = dists.makeIspNormal;
        var KDE = dists.makeKDE;
        var Laplace = dists.makeLaplace;
        var LogNormal = dists.makeLogNormal;
        var LogisticNormal = dists.makeLogisticNormal;
        var LogitNormal = dists.makeLogitNormal;
        var Marginal = dists.makeMarginal;
        var Mixture = dists.makeMixture;
        var Multinomial = dists.makeMultinomial;
        var MultivariateBernoulli = dists.makeMultivariateBernoulli;
        var MultivariateGaussian = dists.makeMultivariateGaussian;
        var Poisson = dists.makePoisson;
        var RandomInteger = dists.makeRandomInteger;
        var SampleBasedMarginal = dists.makeSampleBasedMarginal;
        var TensorGaussian = dists.makeTensorGaussian;
        var TensorLaplace = dists.makeTensorLaplace;
        var Uniform = dists.makeUniform;
        var flip = function flip(globalStore, _k1200, _address27, p) {
            var _currentAddress = _address27;
            _addr.save(_globalCurrentAddress, _address27);
            var _k1203 = function (globalStore, _result1202) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var params = { p: _result1202 };
                return function () {
                    return Bernoulli(globalStore, function (globalStore, _result1201) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1200, _address27.concat('_53'), _result1201);
                        };
                    }, _address27.concat('_52'), params);
                };
            };
            return function () {
                return ad.scalar.pneq(p, undefined) ? _k1203(globalStore, p) : _k1203(globalStore, 0.5);
            };
        };
        var constF = function constF(globalStore, _k1151, _address47, f) {
            var _currentAddress = _address47;
            _addr.save(_globalCurrentAddress, _address47);
            return function () {
                return _k1151(globalStore, function (globalStore, _k1152, _address48) {
                    var _currentAddress = _address48;
                    _addr.save(_globalCurrentAddress, _address48);
                    return function () {
                        return _k1152(globalStore, f);
                    };
                });
            };
        };
        var error = function error(globalStore, _k1024, _address122, msg) {
            var _currentAddress = _address122;
            _addr.save(_globalCurrentAddress, _address122);
            return function () {
                return _k1024(globalStore, util.error(msg));
            };
        };
        var SampleGuide = function SampleGuide(globalStore, _k1020, _address126, wpplFn, options) {
            var _currentAddress = _address126;
            _addr.save(_globalCurrentAddress, _address126);
            return function () {
                return ForwardSample(globalStore, _k1020, _address126.concat('_156'), wpplFn, _.assign({ guide: !0 }, _.omit(options, 'guide')));
            };
        };
        var OptimizeThenSample = function OptimizeThenSample(globalStore, _k1018, _address127, wpplFn, options) {
            var _currentAddress = _address127;
            _addr.save(_globalCurrentAddress, _address127);
            return function () {
                return Optimize(globalStore, function (globalStore, _dummy1019) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var opts = _.pick(options, 'samples', 'onlyMAP', 'callbacks', 'verbose');
                    return function () {
                        return SampleGuide(globalStore, _k1018, _address127.concat('_158'), wpplFn, opts);
                    };
                }, _address127.concat('_157'), wpplFn, _.omit(options, 'samples', 'onlyMAP', 'callbacks'));
            };
        };
        var AISforInfer = function AISforInfer(globalStore, _k1014, _address128, wpplFn, options) {
            var _currentAddress = _address128;
            _addr.save(_globalCurrentAddress, _address128);
            return function () {
                return constF(globalStore, function (globalStore, _result1017) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return Infer(globalStore, function (globalStore, dummyMarginal) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return AIS(globalStore, function (globalStore, _result1016) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy1015 = _.assign(dummyMarginal, { normalizationConstant: _result1016 });
                                    return function () {
                                        return _k1014(globalStore, dummyMarginal);
                                    };
                                }, _address128.concat('_161'), wpplFn, options);
                            };
                        }, _address128.concat('_160'), _result1017);
                    };
                }, _address128.concat('_159'), !0);
            };
        };
        var DefaultInfer = function DefaultInfer(globalStore, _k1004, _address129, wpplFn, options) {
            var _currentAddress = _address129;
            _addr.save(_globalCurrentAddress, _address129);
            var _dummy1013 = util.mergeDefaults(options, {}, 'Infer');
            var maxEnumTreeSize = 200000;
            var minSampleRate = 250;
            var samples = 1000;
            return function () {
                return Enumerate(globalStore, function (globalStore, enumResult) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k1012 = function (globalStore, _dummy1011) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _dummy1010 = console.log('Using "rejection"');
                        return function () {
                            return Rejection(globalStore, function (globalStore, rejResult) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return rejResult instanceof Error ? function (globalStore, _dummy1009) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return CheckSampleAfterFactor(globalStore, function (globalStore, hasSampleAfterFactor) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _k1007 = function (globalStore, _dummy1006) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _dummy1005 = console.log('Using "MCMC"');
                                                    return function () {
                                                        return MCMC(globalStore, _k1004, _address129.concat('_168'), wpplFn, { samples: samples });
                                                    };
                                                };
                                                return function () {
                                                    return hasSampleAfterFactor ? function (globalStore, _dummy1008) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return SMC(globalStore, function (globalStore, smcResult) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return dists.isDist(smcResult) ? _k1004(globalStore, smcResult) : smcResult instanceof Error ? _k1007(globalStore, console.log(ad.scalar.add(smcResult.message, '..quit SMC'))) : error(globalStore, _k1007, _address129.concat('_167'), 'Invalid return value from SMC');
                                                                };
                                                            }, _address129.concat('_166'), wpplFn, {
                                                                throwOnError: !1,
                                                                particles: samples
                                                            });
                                                        };
                                                    }(globalStore, console.log('Using "SMC" (interleaving samples and factors detected)')) : _k1007(globalStore, undefined);
                                                };
                                            }, _address129.concat('_165'), wpplFn);
                                        };
                                    }(globalStore, console.log(ad.scalar.add(rejResult.message, '..quit rejection'))) : dists.isDist(rejResult) ? _k1004(globalStore, rejResult) : error(globalStore, _k1004, _address129.concat('_169'), 'Invalid return value from rejection');
                                };
                            }, _address129.concat('_164'), wpplFn, {
                                minSampleRate: minSampleRate,
                                throwOnError: !1,
                                samples: samples
                            });
                        };
                    };
                    return function () {
                        return dists.isDist(enumResult) ? _k1004(globalStore, enumResult) : enumResult instanceof Error ? _k1012(globalStore, console.log(ad.scalar.add(enumResult.message, '..quit enumerate'))) : error(globalStore, _k1012, _address129.concat('_163'), 'Invalid return value from enumerate');
                    };
                }, _address129.concat('_162'), wpplFn, {
                    maxEnumTreeSize: maxEnumTreeSize,
                    maxRuntimeInMS: 5000,
                    throwOnError: !1,
                    strategy: 'depthFirst'
                });
            };
        };
        var Infer = function Infer(globalStore, _k997, _address130, options, maybeFn) {
            var _currentAddress = _address130;
            _addr.save(_globalCurrentAddress, _address130);
            var _k1003 = function (globalStore, wpplFn) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k1002 = function (globalStore, _dummy1001) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var methodMap = {
                        SMC: SMC,
                        MCMC: MCMC,
                        PMCMC: PMCMC,
                        asyncPF: AsyncPF,
                        rejection: Rejection,
                        enumerate: Enumerate,
                        incrementalMH: IncrementalMH,
                        forward: ForwardSample,
                        optimize: OptimizeThenSample,
                        AIS: AISforInfer,
                        defaultInfer: DefaultInfer
                    };
                    var _k1000 = function (globalStore, methodName) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k999 = function (globalStore, _dummy998) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var method = methodMap[methodName];
                            return function () {
                                return method(globalStore, _k997, _address130.concat('_172'), wpplFn, _.omit(options, 'method', 'model'));
                            };
                        };
                        return function () {
                            return _.has(methodMap, methodName) ? _k999(globalStore, undefined) : function (globalStore, methodNames) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var msg = ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('Infer: \'', methodName), '\' is not a valid method. The following methods are available: '), methodNames.join(', ')), '.');
                                return function () {
                                    return error(globalStore, _k999, _address130.concat('_171'), msg);
                                };
                            }(globalStore, _.keys(methodMap));
                        };
                    };
                    return function () {
                        return options.method ? _k1000(globalStore, options.method) : _k1000(globalStore, 'defaultInfer');
                    };
                };
                return function () {
                    return _.isFunction(wpplFn) ? _k1002(globalStore, undefined) : error(globalStore, _k1002, _address130.concat('_170'), 'Infer: a model was not specified.');
                };
            };
            return function () {
                return util.isObject(options) ? maybeFn ? _k1003(globalStore, maybeFn) : _k1003(globalStore, options.model) : _k1003(globalStore, options);
            };
        };
        var fs = {
            read: webpplFs.read,
            write: webpplFs.write,
            mkdirp: webpplFs.mkdirp,
            node: webpplFs.node
        };
        var checkError = function checkError(globalStore, _k332, _address250, tree) {
            var _currentAddress = _address250;
            _addr.save(_globalCurrentAddress, _address250);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k332(globalStore, !0) : _k332(globalStore, !1);
            };
        };
        var clads1TreeSimulate = function clads1TreeSimulate(globalStore, _k283, _address253, startTime, lambda0, logAlpha, sigma, mu, rho, max_R) {
            var _currentAddress = _address253;
            _addr.save(_globalCurrentAddress, _address253);
            return function () {
                return clads1TreeSim(globalStore, function (globalStore, Tree) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k288 = function (globalStore, _dummy287) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var stringTree = Tree.join('');
                        return function () {
                            return stringTree.includes('ERROR_MAX') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy284 = fs.write(filename, message);
                                return function () {
                                    return _k283(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Tree too big.') : stringTree.includes('ERROR_ZERO') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy285 = fs.write(filename, message);
                                return function () {
                                    return _k283(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Evolution stopped.') : function (globalStore, Tree) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy286 = fs.write(filename, Tree);
                                return function () {
                                    return _k283(globalStore, Tree);
                                };
                            }(globalStore, ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';'));
                        };
                    };
                    return function () {
                        return ad.scalar.eq(Tree, !1) ? function (globalStore, message) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _dummy289 = fs.write(filename, message);
                            return function () {
                                return _k283(globalStore, message);
                            };
                        }(globalStore, 'No survivors.') : _k288(globalStore, undefined);
                    };
                }, _address253.concat('_634'), startTime, lambda0, logAlpha, sigma, mu, rho, max_R);
            };
        };
        var clads1TreeSim = function clads1TreeSim(globalStore, _k248, _address254, startTime, lambda, logAlpha, sigma, mu, rho, max_R) {
            var _currentAddress = _address254;
            _addr.save(_globalCurrentAddress, _address254);
            var _k282 = function (globalStore, _dummy281) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k280 = function (globalStore, _dummy279) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k278 = function (globalStore, _dummy277) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k274 = function (globalStore, _dummy273) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _k272 = function (globalStore, _dummy271) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return exponential(globalStore, function (globalStore, t) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        var currentTime = ad.scalar.sub(startTime, t);
                                        var internalBranch = t;
                                        var _k268 = function (globalStore, _dummy267) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, extinction) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _k266 = function (globalStore, _dummy265) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return gaussian(globalStore, function (globalStore, _result264) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                var multip1 = ad.scalar.exp(_result264);
                                                                return function () {
                                                                    return gaussian(globalStore, function (globalStore, _result263) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var multip2 = ad.scalar.exp(_result263);
                                                                        var lambda1 = ad.scalar.mul(lambda, multip1);
                                                                        var lambda2 = ad.scalar.mul(lambda, multip2);
                                                                        return function () {
                                                                            return clads1TreeSim(globalStore, function (globalStore, leftTree) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k260 = function (globalStore, _dummy259) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return clads1TreeSim(globalStore, function (globalStore, rightTree) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            var _k256 = function (globalStore, _dummy255) {
                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                var _k252 = function (globalStore, _dummy251) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    var _k250 = function (globalStore, _dummy249) {
                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                        return function () {
                                                                                                            return ad.scalar.eq(leftTree, !1) ? function (globalStore, newBranch) {
                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                var NewickTree = [
                                                                                                                    rightTree[0],
                                                                                                                    newBranch
                                                                                                                ];
                                                                                                                return function () {
                                                                                                                    return _k248(globalStore, NewickTree);
                                                                                                                };
                                                                                                            }(globalStore, ad.scalar.add(rightTree[1], internalBranch)) : function (globalStore, NewickTree) {
                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                return function () {
                                                                                                                    return _k248(globalStore, NewickTree);
                                                                                                                };
                                                                                                            }(globalStore, [
                                                                                                                ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('(', leftTree.join('')), ','), rightTree.join('')), ')'), ':'),
                                                                                                                internalBranch
                                                                                                            ]);
                                                                                                        };
                                                                                                    };
                                                                                                    return function () {
                                                                                                        return ad.scalar.eq(rightTree, !1) ? function (globalStore, newBranch) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            var NewickTree = [
                                                                                                                leftTree[0],
                                                                                                                newBranch
                                                                                                            ];
                                                                                                            return function () {
                                                                                                                return _k248(globalStore, NewickTree);
                                                                                                            };
                                                                                                        }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k250(globalStore, undefined);
                                                                                                    };
                                                                                                };
                                                                                                var _k254 = function (globalStore, _result253) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    return function () {
                                                                                                        return _result253 ? _k248(globalStore, !1) : _k252(globalStore, undefined);
                                                                                                    };
                                                                                                };
                                                                                                return function () {
                                                                                                    return ad.scalar.eq(leftTree, !1) ? _k254(globalStore, ad.scalar.eq(rightTree, !1)) : _k254(globalStore, ad.scalar.eq(leftTree, !1));
                                                                                                };
                                                                                            };
                                                                                            var _k258 = function (globalStore, _result257) {
                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                return function () {
                                                                                                    return _result257 ? _k248(globalStore, rightTree) : _k256(globalStore, undefined);
                                                                                                };
                                                                                            };
                                                                                            return function () {
                                                                                                return rightTree ? checkError(globalStore, _k258, _address254.concat('_643'), rightTree) : _k258(globalStore, rightTree);
                                                                                            };
                                                                                        }, _address254.concat('_642'), currentTime, lambda2, logAlpha, sigma, mu, rho, ad.scalar.sub(max_R, 1));
                                                                                    };
                                                                                };
                                                                                var _k262 = function (globalStore, _result261) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return _result261 ? _k248(globalStore, leftTree) : _k260(globalStore, undefined);
                                                                                    };
                                                                                };
                                                                                return function () {
                                                                                    return leftTree ? checkError(globalStore, _k262, _address254.concat('_641'), leftTree) : _k262(globalStore, leftTree);
                                                                                };
                                                                            }, _address254.concat('_640'), currentTime, lambda1, logAlpha, sigma, mu, rho, ad.scalar.sub(max_R, 1));
                                                                        };
                                                                    }, _address254.concat('_639'), {
                                                                        mu: logAlpha,
                                                                        sigma: sigma
                                                                    });
                                                                };
                                                            }, _address254.concat('_638'), {
                                                                mu: logAlpha,
                                                                sigma: sigma
                                                            });
                                                        };
                                                    };
                                                    return function () {
                                                        return extinction ? _k248(globalStore, !1) : _k266(globalStore, undefined);
                                                    };
                                                }, _address254.concat('_637'), ad.scalar.div(mu, ad.scalar.add(mu, lambda)));
                                            };
                                        };
                                        return function () {
                                            return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy270) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return flip(globalStore, function (globalStore, _result269) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return _result269 ? function (globalStore, Label) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                var NewickTree = [
                                                                    Label,
                                                                    startTime
                                                                ];
                                                                return function () {
                                                                    return _k248(globalStore, NewickTree);
                                                                };
                                                            }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k248(globalStore, !1);
                                                        };
                                                    }, _address254.concat('_636'), rho);
                                                };
                                            }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k268(globalStore, undefined);
                                        };
                                    }, _address254.concat('_635'), { a: ad.scalar.add(lambda, mu) });
                                };
                            };
                            return function () {
                                return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k248(globalStore, [
                                    'ERROR_MAX_TAXA:',
                                    startTime
                                ]) : _k272(globalStore, undefined);
                            };
                        };
                        var _k276 = function (globalStore, _result275) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return _result275 ? _k248(globalStore, [
                                    'ERROR_ZERO:',
                                    startTime
                                ]) : _k274(globalStore, undefined);
                            };
                        };
                        return function () {
                            return ad.scalar.eq(lambda, 0) ? _k276(globalStore, ad.scalar.eq(lambda, 0)) : _k276(globalStore, ad.scalar.eq(mu, 0));
                        };
                    };
                    return function () {
                        return ad.scalar.gt(ad.scalar.sub(lambda, mu), MAX_DIV) ? _k248(globalStore, [
                            'ERROR_MAX_DIV:',
                            startTime
                        ]) : _k278(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k248(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k280(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k248(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k282(globalStore, undefined);
            };
        };
        var dirname = argv._[1];
        var age = argv._[2];
        var rho = argv._[3];
        var _dummy51 = globalStore.n = 0;
        var checkError = function checkError(globalStore, _k50, _address265, tree) {
            var _currentAddress = _address265;
            _addr.save(_globalCurrentAddress, _address265);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k50(globalStore, !0) : _k50(globalStore, !1);
            };
        };
        var getHyperParamsFromDir = function getHyperParamsFromDir(globalStore, _k49, _address266, dirname) {
            var _currentAddress = _address266;
            _addr.save(_globalCurrentAddress, _address266);
            var sample = phyjs.sample(dirname);
            return function () {
                return _k49(globalStore, {
                    startTime: age,
                    lambda0: sample.lambda,
                    mu: sample.mu,
                    logAlpha: sample.log_α,
                    sigma: sample.sigma2,
                    rho: rho,
                    stepsize: 0.05,
                    max_R: 5000,
                    MAX_LAMBDA: 1000000000000,
                    MAX_NODES: 1000000,
                    MAX_DIV: 1000000000000
                });
            };
        };
        var clads1TreeSimulate = function clads1TreeSimulate(globalStore, _k36, _address267, dirname) {
            var _currentAddress = _address267;
            _addr.save(_globalCurrentAddress, _address267);
            return function () {
                return getHyperParamsFromDir(globalStore, function (globalStore, obj) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var startTime = obj.startTime;
                    var lambda0 = obj.lambda0;
                    var mu = obj.mu;
                    var logAlpha = obj.logAlpha;
                    var sigma = obj.sigma;
                    var rho = obj.rho;
                    var max_R = obj.max_R;
                    var MAX_LAMBDA = obj.MAX_LAMBDA;
                    var MAX_NODES = obj.MAX_NODES;
                    var MAX_DIV = obj.MAX_DIV;
                    return function () {
                        return clads1TreeSim(globalStore, function (globalStore, TreeLeft) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return ad.scalar.eq(TreeLeft, !1) ? function (globalStore, _dummy38) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy37 = globalStore.n = 0;
                                    return function () {
                                        return clads1TreeSimulate(globalStore, _k36, _address267.concat('_698'), dirname);
                                    };
                                }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeLeft) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _k48 = function (globalStore, _result39) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return _result39 ? function (globalStore, _dummy41) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _dummy40 = globalStore.n = 0;
                                                return function () {
                                                    return clads1TreeSimulate(globalStore, _k36, _address267.concat('_699'), dirname);
                                                };
                                            }(globalStore, console.log('Error: Guards hit')) : clads1TreeSim(globalStore, function (globalStore, TreeRight) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return ad.scalar.eq(TreeRight, !1) ? function (globalStore, _dummy43) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _dummy42 = globalStore.n = 0;
                                                        return function () {
                                                            return clads1TreeSimulate(globalStore, _k36, _address267.concat('_701'), dirname);
                                                        };
                                                    }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeRight) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _k47 = function (globalStore, _result44) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result44 ? function (globalStore, _dummy46) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var _dummy45 = globalStore.n = 0;
                                                                    return function () {
                                                                        return clads1TreeSimulate(globalStore, _k36, _address267.concat('_702'), dirname);
                                                                    };
                                                                }(globalStore, console.log('Error: Guards hit')) : function (globalStore, stringTree) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var Tree = ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';');
                                                                    return function () {
                                                                        return _k36(globalStore, Tree);
                                                                    };
                                                                }(globalStore, [ad.scalar.add(ad.scalar.add(TreeLeft.join(''), ','), TreeRight.join(''))]);
                                                            };
                                                        };
                                                        return function () {
                                                            return stringTreeRight.includes('ERROR_MAX') ? _k47(globalStore, stringTreeRight.includes('ERROR_MAX')) : _k47(globalStore, stringTreeRight.includes('ERROR_ZERO'));
                                                        };
                                                    }(globalStore, TreeRight.join(''));
                                                };
                                            }, _address267.concat('_700'), startTime, lambda0, logAlpha, sigma, mu, rho, max_R, MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                        };
                                    };
                                    return function () {
                                        return stringTreeLeft.includes('ERROR_MAX') ? _k48(globalStore, stringTreeLeft.includes('ERROR_MAX')) : _k48(globalStore, stringTreeLeft.includes('ERROR_ZERO'));
                                    };
                                }(globalStore, TreeLeft.join(''));
                            };
                        }, _address267.concat('_697'), startTime, lambda0, logAlpha, sigma, mu, rho, max_R, MAX_LAMBDA, MAX_NODES, MAX_DIV);
                    };
                }, _address267.concat('_696'), dirname);
            };
        };
        var clads1TreeSim = function clads1TreeSim(globalStore, _k1, _address268, startTime, lambda, logAlpha, sigma, mu, rho, max_R, MAX_LAMBDA, MAX_NODES, MAX_DIV) {
            var _currentAddress = _address268;
            _addr.save(_globalCurrentAddress, _address268);
            var _k35 = function (globalStore, _dummy34) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k33 = function (globalStore, _dummy32) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k31 = function (globalStore, _dummy30) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k27 = function (globalStore, _dummy26) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _k25 = function (globalStore, _dummy24) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return exponential(globalStore, function (globalStore, t) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        var currentTime = ad.scalar.sub(startTime, t);
                                        var internalBranch = t;
                                        var _k21 = function (globalStore, _dummy20) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, extinction) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _k19 = function (globalStore, _dummy18) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return gaussian(globalStore, function (globalStore, _result17) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                var multip1 = ad.scalar.exp(_result17);
                                                                return function () {
                                                                    return gaussian(globalStore, function (globalStore, _result16) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var multip2 = ad.scalar.exp(_result16);
                                                                        var lambda1 = ad.scalar.mul(lambda, multip1);
                                                                        var lambda2 = ad.scalar.mul(lambda, multip2);
                                                                        return function () {
                                                                            return clads1TreeSim(globalStore, function (globalStore, leftTree) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k13 = function (globalStore, _dummy12) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return clads1TreeSim(globalStore, function (globalStore, rightTree) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            var _k9 = function (globalStore, _dummy8) {
                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                var _k5 = function (globalStore, _dummy4) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    var _k3 = function (globalStore, _dummy2) {
                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                        return function () {
                                                                                                            return ad.scalar.eq(leftTree, !1) ? function (globalStore, newBranch) {
                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                var NewickTree = [
                                                                                                                    rightTree[0],
                                                                                                                    newBranch
                                                                                                                ];
                                                                                                                return function () {
                                                                                                                    return _k1(globalStore, NewickTree);
                                                                                                                };
                                                                                                            }(globalStore, ad.scalar.add(rightTree[1], internalBranch)) : function (globalStore, NewickTree) {
                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                return function () {
                                                                                                                    return _k1(globalStore, NewickTree);
                                                                                                                };
                                                                                                            }(globalStore, [
                                                                                                                ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('(', leftTree.join('')), ','), rightTree.join('')), ')'), ':'),
                                                                                                                internalBranch
                                                                                                            ]);
                                                                                                        };
                                                                                                    };
                                                                                                    return function () {
                                                                                                        return ad.scalar.eq(rightTree, !1) ? function (globalStore, newBranch) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            var NewickTree = [
                                                                                                                leftTree[0],
                                                                                                                newBranch
                                                                                                            ];
                                                                                                            return function () {
                                                                                                                return _k1(globalStore, NewickTree);
                                                                                                            };
                                                                                                        }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k3(globalStore, undefined);
                                                                                                    };
                                                                                                };
                                                                                                var _k7 = function (globalStore, _result6) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    return function () {
                                                                                                        return _result6 ? _k1(globalStore, !1) : _k5(globalStore, undefined);
                                                                                                    };
                                                                                                };
                                                                                                return function () {
                                                                                                    return ad.scalar.eq(leftTree, !1) ? _k7(globalStore, ad.scalar.eq(rightTree, !1)) : _k7(globalStore, ad.scalar.eq(leftTree, !1));
                                                                                                };
                                                                                            };
                                                                                            var _k11 = function (globalStore, _result10) {
                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                return function () {
                                                                                                    return _result10 ? _k1(globalStore, rightTree) : _k9(globalStore, undefined);
                                                                                                };
                                                                                            };
                                                                                            return function () {
                                                                                                return rightTree ? checkError(globalStore, _k11, _address268.concat('_711'), rightTree) : _k11(globalStore, rightTree);
                                                                                            };
                                                                                        }, _address268.concat('_710'), currentTime, lambda2, logAlpha, sigma, mu, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                                                                    };
                                                                                };
                                                                                var _k15 = function (globalStore, _result14) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return _result14 ? _k1(globalStore, leftTree) : _k13(globalStore, undefined);
                                                                                    };
                                                                                };
                                                                                return function () {
                                                                                    return leftTree ? checkError(globalStore, _k15, _address268.concat('_709'), leftTree) : _k15(globalStore, leftTree);
                                                                                };
                                                                            }, _address268.concat('_708'), currentTime, lambda1, logAlpha, sigma, mu, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                                                        };
                                                                    }, _address268.concat('_707'), {
                                                                        mu: logAlpha,
                                                                        sigma: sigma
                                                                    });
                                                                };
                                                            }, _address268.concat('_706'), {
                                                                mu: logAlpha,
                                                                sigma: sigma
                                                            });
                                                        };
                                                    };
                                                    return function () {
                                                        return extinction ? _k1(globalStore, !1) : _k19(globalStore, undefined);
                                                    };
                                                }, _address268.concat('_705'), ad.scalar.div(mu, ad.scalar.add(mu, lambda)));
                                            };
                                        };
                                        return function () {
                                            return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy23) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return flip(globalStore, function (globalStore, _result22) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return _result22 ? function (globalStore, Label) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                var NewickTree = [
                                                                    Label,
                                                                    startTime
                                                                ];
                                                                return function () {
                                                                    return _k1(globalStore, NewickTree);
                                                                };
                                                            }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k1(globalStore, !1);
                                                        };
                                                    }, _address268.concat('_704'), rho);
                                                };
                                            }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k21(globalStore, undefined);
                                        };
                                    }, _address268.concat('_703'), { a: ad.scalar.add(lambda, mu) });
                                };
                            };
                            return function () {
                                return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k1(globalStore, [
                                    'ERROR_MAX_TAXA:',
                                    startTime
                                ]) : _k25(globalStore, undefined);
                            };
                        };
                        var _k29 = function (globalStore, _result28) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return _result28 ? _k1(globalStore, [
                                    'ERROR_ZERO:',
                                    startTime
                                ]) : _k27(globalStore, undefined);
                            };
                        };
                        return function () {
                            return ad.scalar.eq(lambda, 0) ? _k29(globalStore, ad.scalar.eq(lambda, 0)) : _k29(globalStore, ad.scalar.eq(mu, 0));
                        };
                    };
                    return function () {
                        return ad.scalar.gt(ad.scalar.sub(lambda, mu), MAX_DIV) ? _k1(globalStore, [
                            'ERROR_MAX_DIV:',
                            startTime
                        ]) : _k31(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k1(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k33(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k1(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k35(globalStore, undefined);
            };
        };
        return function () {
            return clads1TreeSimulate(globalStore, _k0, _address0.concat('_712'), dirname);
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');