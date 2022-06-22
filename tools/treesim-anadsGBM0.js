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
        var anads0TreeSimulate = function anads0TreeSimulate(globalStore, _k83, _address263, startTime, lambda0, stepsize, logAlpha, sigma, rho, max_R) {
            var _currentAddress = _address263;
            _addr.save(_globalCurrentAddress, _address263);
            return function () {
                return anads0TreeSim(globalStore, function (globalStore, Tree) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k88 = function (globalStore, _dummy87) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var stringTree = Tree.join('');
                        return function () {
                            return stringTree.includes('ERROR_MAX') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy84 = fs.write(filename, message);
                                return function () {
                                    return _k83(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Tree too big.') : stringTree.includes('ERROR_ZERO') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy85 = fs.write(filename, message);
                                return function () {
                                    return _k83(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Evolution stopped.') : function (globalStore, Tree) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy86 = fs.write(filename, Tree);
                                return function () {
                                    return _k83(globalStore, Tree);
                                };
                            }(globalStore, ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';'));
                        };
                    };
                    return function () {
                        return ad.scalar.eq(Tree, !1) ? function (globalStore, message) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _dummy89 = fs.write(filename, message);
                            return function () {
                                return _k83(globalStore, message);
                            };
                        }(globalStore, 'No survivors.') : _k88(globalStore, undefined);
                    };
                }, _address263.concat('_685'), startTime, lambda0, stepsize, logAlpha, sigma, rho, max_R);
            };
        };
        var anads0TreeSim = function anads0TreeSim(globalStore, _k52, _address264, startTime, lambda, stepsize, logAlpha, sigma, rho, max_R) {
            var _currentAddress = _address264;
            _addr.save(_globalCurrentAddress, _address264);
            var _k82 = function (globalStore, _dummy81) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k80 = function (globalStore, _dummy79) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k78 = function (globalStore, _dummy77) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k76 = function (globalStore, _dummy75) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return exponential(globalStore, function (globalStore, timeToSpeciation) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var timeToAnagenesis = stepsize;
                                    return function () {
                                        return ad.scalar.lt(timeToAnagenesis, timeToSpeciation) ? function (globalStore, currentTime) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            var _k55 = function (globalStore, _dummy54) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var internalBranch = timeToAnagenesis;
                                                return function () {
                                                    return gaussian(globalStore, function (globalStore, _result53) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var multip = ad.scalar.exp(_result53);
                                                        var lambdaNew = ad.scalar.mul(lambda, multip);
                                                        return function () {
                                                            return anads0TreeSim(globalStore, function (globalStore, Tree) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return ad.scalar.eq(Tree, !1) ? _k52(globalStore, !1) : function (globalStore, newBranch) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var NewickTree = [
                                                                            Tree[0],
                                                                            newBranch
                                                                        ];
                                                                        return function () {
                                                                            return _k52(globalStore, NewickTree);
                                                                        };
                                                                    }(globalStore, ad.scalar.add(Tree[1], internalBranch));
                                                                };
                                                            }, _address264.concat('_689'), currentTime, lambdaNew, stepsize, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1));
                                                        };
                                                    }, _address264.concat('_688'), {
                                                        mu: ad.scalar.mul(logAlpha, stepsize),
                                                        sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(stepsize))
                                                    });
                                                };
                                            };
                                            return function () {
                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy57) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return flip(globalStore, function (globalStore, _result56) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result56 ? function (globalStore, Label) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var NewickTree = [
                                                                        Label,
                                                                        startTime
                                                                    ];
                                                                    return function () {
                                                                        return _k52(globalStore, NewickTree);
                                                                    };
                                                                }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k52(globalStore, !1);
                                                            };
                                                        }, _address264.concat('_687'), rho);
                                                    };
                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k55(globalStore, undefined);
                                            };
                                        }(globalStore, ad.scalar.sub(startTime, timeToAnagenesis)) : function (globalStore, currentTime) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            var internalBranch = timeToSpeciation;
                                            return function () {
                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy59) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return flip(globalStore, function (globalStore, _result58) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result58 ? function (globalStore, Label) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var NewickTree = [
                                                                        Label,
                                                                        startTime
                                                                    ];
                                                                    return function () {
                                                                        return _k52(globalStore, NewickTree);
                                                                    };
                                                                }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k52(globalStore, !1);
                                                            };
                                                        }, _address264.concat('_690'), rho);
                                                    };
                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : function (globalStore, delta) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return gaussian(globalStore, function (globalStore, _result74) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var multip = ad.scalar.exp(_result74);
                                                            var lambdaNew = ad.scalar.mul(lambda, multip);
                                                            return function () {
                                                                return anads0TreeSim(globalStore, function (globalStore, leftTree) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var _k71 = function (globalStore, _dummy70) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        return function () {
                                                                            return anads0TreeSim(globalStore, function (globalStore, rightTree) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k67 = function (globalStore, _dummy66) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    var _k63 = function (globalStore, _dummy62) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        var _k61 = function (globalStore, _dummy60) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return ad.scalar.eq(leftTree, !1) ? function (globalStore, newBranch) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    var NewickTree = [
                                                                                                        rightTree[0],
                                                                                                        newBranch
                                                                                                    ];
                                                                                                    return function () {
                                                                                                        return _k52(globalStore, NewickTree);
                                                                                                    };
                                                                                                }(globalStore, ad.scalar.add(rightTree[1], internalBranch)) : function (globalStore, NewickTree) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    return function () {
                                                                                                        return _k52(globalStore, NewickTree);
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
                                                                                                    return _k52(globalStore, NewickTree);
                                                                                                };
                                                                                            }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k61(globalStore, undefined);
                                                                                        };
                                                                                    };
                                                                                    var _k65 = function (globalStore, _result64) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        return function () {
                                                                                            return _result64 ? _k52(globalStore, !1) : _k63(globalStore, undefined);
                                                                                        };
                                                                                    };
                                                                                    return function () {
                                                                                        return ad.scalar.eq(leftTree, !1) ? _k65(globalStore, ad.scalar.eq(rightTree, !1)) : _k65(globalStore, ad.scalar.eq(leftTree, !1));
                                                                                    };
                                                                                };
                                                                                var _k69 = function (globalStore, _result68) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return _result68 ? _k52(globalStore, rightTree) : _k67(globalStore, undefined);
                                                                                    };
                                                                                };
                                                                                return function () {
                                                                                    return rightTree ? checkError(globalStore, _k69, _address264.concat('_695'), rightTree) : _k69(globalStore, rightTree);
                                                                                };
                                                                            }, _address264.concat('_694'), currentTime, lambdaNew, stepsize, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1));
                                                                        };
                                                                    };
                                                                    var _k73 = function (globalStore, _result72) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        return function () {
                                                                            return _result72 ? _k52(globalStore, leftTree) : _k71(globalStore, undefined);
                                                                        };
                                                                    };
                                                                    return function () {
                                                                        return leftTree ? checkError(globalStore, _k73, _address264.concat('_693'), leftTree) : _k73(globalStore, leftTree);
                                                                    };
                                                                }, _address264.concat('_692'), currentTime, lambdaNew, stepsize, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1));
                                                            };
                                                        }, _address264.concat('_691'), {
                                                            mu: ad.scalar.mul(logAlpha, delta),
                                                            sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(delta))
                                                        });
                                                    };
                                                }(globalStore, timeToSpeciation);
                                            };
                                        }(globalStore, ad.scalar.sub(startTime, timeToSpeciation));
                                    };
                                }, _address264.concat('_686'), { a: lambda });
                            };
                        };
                        return function () {
                            return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k52(globalStore, [
                                'ERROR_MAX_TAXA:',
                                startTime
                            ]) : _k76(globalStore, undefined);
                        };
                    };
                    return function () {
                        return ad.scalar.eq(lambda, 0) ? _k52(globalStore, [
                            'ERROR_ZERO:',
                            startTime
                        ]) : _k78(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k52(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k80(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k52(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k82(globalStore, undefined);
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
                    logAlpha: sample.log_α_gbm,
                    sigma: sample.sigma2_gbm,
                    rho: rho,
                    stepsize: 0.05,
                    max_R: 5000,
                    MAX_LAMBDA: 1000000000000,
                    MAX_NODES: 1000000,
                    MAX_DIV: 1000000000000
                });
            };
        };
        var anads0TreeSimulate = function anads0TreeSimulate(globalStore, _k36, _address267, dirname) {
            var _currentAddress = _address267;
            _addr.save(_globalCurrentAddress, _address267);
            return function () {
                return getHyperParamsFromDir(globalStore, function (globalStore, obj) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var startTime = obj.startTime;
                    var lambda0 = obj.lambda0;
                    var logAlpha = obj.logAlpha;
                    var sigma = obj.sigma;
                    var rho = obj.rho;
                    var stepsize = obj.stepsize;
                    var max_R = obj.max_R;
                    var MAX_LAMBDA = obj.MAX_LAMBDA;
                    var MAX_NODES = obj.MAX_NODES;
                    return function () {
                        return anads0TreeSim(globalStore, function (globalStore, TreeLeft) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return ad.scalar.eq(TreeLeft, !1) ? function (globalStore, _dummy38) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy37 = globalStore.n = 0;
                                    return function () {
                                        return anads0TreeSimulate(globalStore, _k36, _address267.concat('_698'), dirname);
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
                                                    return anads0TreeSimulate(globalStore, _k36, _address267.concat('_699'), dirname);
                                                };
                                            }(globalStore, console.log('Error: Guards hit')) : anads0TreeSim(globalStore, function (globalStore, TreeRight) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return ad.scalar.eq(TreeRight, !1) ? function (globalStore, _dummy43) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _dummy42 = globalStore.n = 0;
                                                        return function () {
                                                            return anads0TreeSimulate(globalStore, _k36, _address267.concat('_701'), dirname);
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
                                                                        return anads0TreeSimulate(globalStore, _k36, _address267.concat('_702'), dirname);
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
                                            }, _address267.concat('_700'), startTime, lambda0, stepsize, logAlpha, sigma, rho, max_R, MAX_LAMBDA, MAX_NODES);
                                        };
                                    };
                                    return function () {
                                        return stringTreeLeft.includes('ERROR_MAX') ? _k48(globalStore, stringTreeLeft.includes('ERROR_MAX')) : _k48(globalStore, stringTreeLeft.includes('ERROR_ZERO'));
                                    };
                                }(globalStore, TreeLeft.join(''));
                            };
                        }, _address267.concat('_697'), startTime, lambda0, stepsize, logAlpha, sigma, rho, max_R, MAX_LAMBDA, MAX_NODES);
                    };
                }, _address267.concat('_696'), dirname);
            };
        };
        var anads0TreeSim = function anads0TreeSim(globalStore, _k1, _address268, startTime, lambda, stepsize, logAlpha, sigma, rho, max_R, MAX_LAMBDA, MAX_NODES) {
            var _currentAddress = _address268;
            _addr.save(_globalCurrentAddress, _address268);
            var _k34 = function (globalStore, _dummy33) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k31 = function (globalStore, _dummy30) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k28 = function (globalStore, _dummy27) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k25 = function (globalStore, _dummy24) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return exponential(globalStore, function (globalStore, timeToSpeciation) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var timeToAnagenesis = stepsize;
                                    return function () {
                                        return ad.scalar.lt(timeToAnagenesis, timeToSpeciation) ? function (globalStore, currentTime) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            var _k4 = function (globalStore, _dummy3) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var internalBranch = timeToAnagenesis;
                                                return function () {
                                                    return gaussian(globalStore, function (globalStore, _result2) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var multip = ad.scalar.exp(_result2);
                                                        var lambdaNew = ad.scalar.mul(lambda, multip);
                                                        return function () {
                                                            return anads0TreeSim(globalStore, function (globalStore, Tree) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return ad.scalar.eq(Tree, !1) ? _k1(globalStore, !1) : function (globalStore, newBranch) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var NewickTree = [
                                                                            Tree[0],
                                                                            newBranch
                                                                        ];
                                                                        return function () {
                                                                            return _k1(globalStore, NewickTree);
                                                                        };
                                                                    }(globalStore, ad.scalar.add(Tree[1], internalBranch));
                                                                };
                                                            }, _address268.concat('_706'), currentTime, lambdaNew, stepsize, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES);
                                                        };
                                                    }, _address268.concat('_705'), {
                                                        mu: ad.scalar.mul(logAlpha, stepsize),
                                                        sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(stepsize))
                                                    });
                                                };
                                            };
                                            return function () {
                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy6) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return flip(globalStore, function (globalStore, _result5) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result5 ? function (globalStore, Label) {
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
                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k4(globalStore, undefined);
                                            };
                                        }(globalStore, ad.scalar.sub(startTime, timeToAnagenesis)) : function (globalStore, currentTime) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            var internalBranch = timeToSpeciation;
                                            return function () {
                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy8) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return flip(globalStore, function (globalStore, _result7) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result7 ? function (globalStore, Label) {
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
                                                        }, _address268.concat('_707'), rho);
                                                    };
                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : function (globalStore, delta) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return gaussian(globalStore, function (globalStore, _result23) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var multip = ad.scalar.exp(_result23);
                                                            var lambdaNew = ad.scalar.mul(lambda, multip);
                                                            return function () {
                                                                return anads0TreeSim(globalStore, function (globalStore, leftTree) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var _k20 = function (globalStore, _dummy19) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        return function () {
                                                                            return anads0TreeSim(globalStore, function (globalStore, rightTree) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k16 = function (globalStore, _dummy15) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    var _k12 = function (globalStore, _dummy11) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        var _k10 = function (globalStore, _dummy9) {
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
                                                                                            }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k10(globalStore, undefined);
                                                                                        };
                                                                                    };
                                                                                    var _k14 = function (globalStore, _result13) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        return function () {
                                                                                            return _result13 ? _k1(globalStore, !1) : _k12(globalStore, undefined);
                                                                                        };
                                                                                    };
                                                                                    return function () {
                                                                                        return ad.scalar.eq(leftTree, !1) ? _k14(globalStore, ad.scalar.eq(rightTree, !1)) : _k14(globalStore, ad.scalar.eq(leftTree, !1));
                                                                                    };
                                                                                };
                                                                                var _k18 = function (globalStore, _result17) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return _result17 ? _k1(globalStore, rightTree) : _k16(globalStore, undefined);
                                                                                    };
                                                                                };
                                                                                return function () {
                                                                                    return rightTree ? checkError(globalStore, _k18, _address268.concat('_712'), rightTree) : _k18(globalStore, rightTree);
                                                                                };
                                                                            }, _address268.concat('_711'), currentTime, lambdaNew, stepsize, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES);
                                                                        };
                                                                    };
                                                                    var _k22 = function (globalStore, _result21) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        return function () {
                                                                            return _result21 ? _k1(globalStore, leftTree) : _k20(globalStore, undefined);
                                                                        };
                                                                    };
                                                                    return function () {
                                                                        return leftTree ? checkError(globalStore, _k22, _address268.concat('_710'), leftTree) : _k22(globalStore, leftTree);
                                                                    };
                                                                }, _address268.concat('_709'), currentTime, lambdaNew, stepsize, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES);
                                                            };
                                                        }, _address268.concat('_708'), {
                                                            mu: ad.scalar.mul(logAlpha, delta),
                                                            sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(delta))
                                                        });
                                                    };
                                                }(globalStore, timeToSpeciation);
                                            };
                                        }(globalStore, ad.scalar.sub(startTime, timeToSpeciation));
                                    };
                                }, _address268.concat('_703'), { a: lambda });
                            };
                        };
                        return function () {
                            return ad.scalar.gt(globalStore.n, MAX_NODES) ? function (globalStore, _dummy26) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return _k1(globalStore, [
                                        'ERROR_MAX_TAXA:',
                                        startTime
                                    ]);
                                };
                            }(globalStore, console.log('MAX_TAXA')) : _k25(globalStore, undefined);
                        };
                    };
                    return function () {
                        return ad.scalar.eq(lambda, 0) ? function (globalStore, _dummy29) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return _k1(globalStore, [
                                    'ERROR_ZERO:',
                                    startTime
                                ]);
                            };
                        }(globalStore, console.log('ZERO')) : _k28(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? function (globalStore, _dummy32) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return _k1(globalStore, [
                                'ERROR_MAX_LAMBDA:',
                                startTime
                            ]);
                        };
                    }(globalStore, console.log('MAX_LAMBDA')) : _k31(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? function (globalStore, _dummy35) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return _k1(globalStore, [
                            'ERROR_MAX_RECURSION:',
                            startTime
                        ]);
                    };
                }(globalStore, console.log('MAX_REC')) : _k34(globalStore, undefined);
            };
        };
        return function () {
            return anads0TreeSimulate(globalStore, _k0, _address0.concat('_713'), dirname);
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');