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
        var exponential = function exponential(globalStore, _k1257, _address10, arg0) {
            var _currentAddress = _address10;
            _addr.save(_globalCurrentAddress, _address10);
            var _k1259 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Exponential(globalStore, function (globalStore, _result1258) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1257, _address10.concat('_19'), _result1258);
                        };
                    }, _address10.concat('_18'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1259(globalStore, arg0) : _k1259(globalStore, { a: arg0 });
            };
        };
        var Gamma = dists.makeGamma;
        var Gaussian = dists.makeGaussian;
        var gaussian = function gaussian(globalStore, _k1251, _address12, arg0, arg1) {
            var _currentAddress = _address12;
            _addr.save(_globalCurrentAddress, _address12);
            var _k1253 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Gaussian(globalStore, function (globalStore, _result1252) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1251, _address12.concat('_23'), _result1252);
                        };
                    }, _address12.concat('_22'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1253(globalStore, arg0) : _k1253(globalStore, {
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
        var flip = function flip(globalStore, _k1204, _address27, p) {
            var _currentAddress = _address27;
            _addr.save(_globalCurrentAddress, _address27);
            var _k1207 = function (globalStore, _result1206) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var params = { p: _result1206 };
                return function () {
                    return Bernoulli(globalStore, function (globalStore, _result1205) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1204, _address27.concat('_53'), _result1205);
                        };
                    }, _address27.concat('_52'), params);
                };
            };
            return function () {
                return ad.scalar.pneq(p, undefined) ? _k1207(globalStore, p) : _k1207(globalStore, 0.5);
            };
        };
        var constF = function constF(globalStore, _k1155, _address47, f) {
            var _currentAddress = _address47;
            _addr.save(_globalCurrentAddress, _address47);
            return function () {
                return _k1155(globalStore, function (globalStore, _k1156, _address48) {
                    var _currentAddress = _address48;
                    _addr.save(_globalCurrentAddress, _address48);
                    return function () {
                        return _k1156(globalStore, f);
                    };
                });
            };
        };
        var error = function error(globalStore, _k1028, _address122, msg) {
            var _currentAddress = _address122;
            _addr.save(_globalCurrentAddress, _address122);
            return function () {
                return _k1028(globalStore, util.error(msg));
            };
        };
        var SampleGuide = function SampleGuide(globalStore, _k1024, _address126, wpplFn, options) {
            var _currentAddress = _address126;
            _addr.save(_globalCurrentAddress, _address126);
            return function () {
                return ForwardSample(globalStore, _k1024, _address126.concat('_156'), wpplFn, _.assign({ guide: !0 }, _.omit(options, 'guide')));
            };
        };
        var OptimizeThenSample = function OptimizeThenSample(globalStore, _k1022, _address127, wpplFn, options) {
            var _currentAddress = _address127;
            _addr.save(_globalCurrentAddress, _address127);
            return function () {
                return Optimize(globalStore, function (globalStore, _dummy1023) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var opts = _.pick(options, 'samples', 'onlyMAP', 'callbacks', 'verbose');
                    return function () {
                        return SampleGuide(globalStore, _k1022, _address127.concat('_158'), wpplFn, opts);
                    };
                }, _address127.concat('_157'), wpplFn, _.omit(options, 'samples', 'onlyMAP', 'callbacks'));
            };
        };
        var AISforInfer = function AISforInfer(globalStore, _k1018, _address128, wpplFn, options) {
            var _currentAddress = _address128;
            _addr.save(_globalCurrentAddress, _address128);
            return function () {
                return constF(globalStore, function (globalStore, _result1021) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return Infer(globalStore, function (globalStore, dummyMarginal) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return AIS(globalStore, function (globalStore, _result1020) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy1019 = _.assign(dummyMarginal, { normalizationConstant: _result1020 });
                                    return function () {
                                        return _k1018(globalStore, dummyMarginal);
                                    };
                                }, _address128.concat('_161'), wpplFn, options);
                            };
                        }, _address128.concat('_160'), _result1021);
                    };
                }, _address128.concat('_159'), !0);
            };
        };
        var DefaultInfer = function DefaultInfer(globalStore, _k1008, _address129, wpplFn, options) {
            var _currentAddress = _address129;
            _addr.save(_globalCurrentAddress, _address129);
            var _dummy1017 = util.mergeDefaults(options, {}, 'Infer');
            var maxEnumTreeSize = 200000;
            var minSampleRate = 250;
            var samples = 1000;
            return function () {
                return Enumerate(globalStore, function (globalStore, enumResult) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k1016 = function (globalStore, _dummy1015) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _dummy1014 = console.log('Using "rejection"');
                        return function () {
                            return Rejection(globalStore, function (globalStore, rejResult) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return rejResult instanceof Error ? function (globalStore, _dummy1013) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return CheckSampleAfterFactor(globalStore, function (globalStore, hasSampleAfterFactor) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _k1011 = function (globalStore, _dummy1010) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _dummy1009 = console.log('Using "MCMC"');
                                                    return function () {
                                                        return MCMC(globalStore, _k1008, _address129.concat('_168'), wpplFn, { samples: samples });
                                                    };
                                                };
                                                return function () {
                                                    return hasSampleAfterFactor ? function (globalStore, _dummy1012) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return SMC(globalStore, function (globalStore, smcResult) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return dists.isDist(smcResult) ? _k1008(globalStore, smcResult) : smcResult instanceof Error ? _k1011(globalStore, console.log(ad.scalar.add(smcResult.message, '..quit SMC'))) : error(globalStore, _k1011, _address129.concat('_167'), 'Invalid return value from SMC');
                                                                };
                                                            }, _address129.concat('_166'), wpplFn, {
                                                                throwOnError: !1,
                                                                particles: samples
                                                            });
                                                        };
                                                    }(globalStore, console.log('Using "SMC" (interleaving samples and factors detected)')) : _k1011(globalStore, undefined);
                                                };
                                            }, _address129.concat('_165'), wpplFn);
                                        };
                                    }(globalStore, console.log(ad.scalar.add(rejResult.message, '..quit rejection'))) : dists.isDist(rejResult) ? _k1008(globalStore, rejResult) : error(globalStore, _k1008, _address129.concat('_169'), 'Invalid return value from rejection');
                                };
                            }, _address129.concat('_164'), wpplFn, {
                                minSampleRate: minSampleRate,
                                throwOnError: !1,
                                samples: samples
                            });
                        };
                    };
                    return function () {
                        return dists.isDist(enumResult) ? _k1008(globalStore, enumResult) : enumResult instanceof Error ? _k1016(globalStore, console.log(ad.scalar.add(enumResult.message, '..quit enumerate'))) : error(globalStore, _k1016, _address129.concat('_163'), 'Invalid return value from enumerate');
                    };
                }, _address129.concat('_162'), wpplFn, {
                    maxEnumTreeSize: maxEnumTreeSize,
                    maxRuntimeInMS: 5000,
                    throwOnError: !1,
                    strategy: 'depthFirst'
                });
            };
        };
        var Infer = function Infer(globalStore, _k1001, _address130, options, maybeFn) {
            var _currentAddress = _address130;
            _addr.save(_globalCurrentAddress, _address130);
            var _k1007 = function (globalStore, wpplFn) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k1006 = function (globalStore, _dummy1005) {
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
                    var _k1004 = function (globalStore, methodName) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k1003 = function (globalStore, _dummy1002) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var method = methodMap[methodName];
                            return function () {
                                return method(globalStore, _k1001, _address130.concat('_172'), wpplFn, _.omit(options, 'method', 'model'));
                            };
                        };
                        return function () {
                            return _.has(methodMap, methodName) ? _k1003(globalStore, undefined) : function (globalStore, methodNames) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var msg = ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('Infer: \'', methodName), '\' is not a valid method. The following methods are available: '), methodNames.join(', ')), '.');
                                return function () {
                                    return error(globalStore, _k1003, _address130.concat('_171'), msg);
                                };
                            }(globalStore, _.keys(methodMap));
                        };
                    };
                    return function () {
                        return options.method ? _k1004(globalStore, options.method) : _k1004(globalStore, 'defaultInfer');
                    };
                };
                return function () {
                    return _.isFunction(wpplFn) ? _k1006(globalStore, undefined) : error(globalStore, _k1006, _address130.concat('_170'), 'Infer: a model was not specified.');
                };
            };
            return function () {
                return util.isObject(options) ? maybeFn ? _k1007(globalStore, maybeFn) : _k1007(globalStore, options.model) : _k1007(globalStore, options);
            };
        };
        var fs = {
            read: webpplFs.read,
            write: webpplFs.write,
            mkdirp: webpplFs.mkdirp,
            node: webpplFs.node
        };
        var checkError = function checkError(globalStore, _k336, _address250, tree) {
            var _currentAddress = _address250;
            _addr.save(_globalCurrentAddress, _address250);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k336(globalStore, !0) : _k336(globalStore, !1);
            };
        };
        var anads2TreeSimulate = function anads2TreeSimulate(globalStore, _k179, _address259, startTime, lambda0, stepsize, logAlpha, sigma, epsilon, rho, max_R) {
            var _currentAddress = _address259;
            _addr.save(_globalCurrentAddress, _address259);
            return function () {
                return anads2TreeSim(globalStore, function (globalStore, Tree) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k184 = function (globalStore, _dummy183) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var stringTree = Tree.join('');
                        return function () {
                            return stringTree.includes('ERROR_MAX') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy180 = fs.write(filename, message);
                                return function () {
                                    return _k179(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Tree too big.') : stringTree.includes('ERROR_ZERO') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy181 = fs.write(filename, message);
                                return function () {
                                    return _k179(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Evolution stopped.') : function (globalStore, Tree) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy182 = fs.write(filename, Tree);
                                return function () {
                                    return _k179(globalStore, Tree);
                                };
                            }(globalStore, ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';'));
                        };
                    };
                    return function () {
                        return ad.scalar.eq(Tree, !1) ? function (globalStore, message) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _dummy185 = fs.write(filename, message);
                            return function () {
                                return _k179(globalStore, message);
                            };
                        }(globalStore, 'No survivors.') : _k184(globalStore, undefined);
                    };
                }, _address259.concat('_661'), startTime, lambda0, stepsize, logAlpha, sigma, epsilon, rho, max_R);
            };
        };
        var anads2TreeSim = function anads2TreeSim(globalStore, _k140, _address260, startTime, lambda, stepsize, logAlpha, sigma, epsilon, rho, max_R) {
            var _currentAddress = _address260;
            _addr.save(_globalCurrentAddress, _address260);
            var mu = ad.scalar.mul(epsilon, lambda);
            var _k178 = function (globalStore, _dummy177) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k176 = function (globalStore, _dummy175) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k174 = function (globalStore, _dummy173) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k170 = function (globalStore, _dummy169) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _k168 = function (globalStore, _dummy167) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return exponential(globalStore, function (globalStore, timeToSpeciation) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return exponential(globalStore, function (globalStore, timeToExtinction) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var timeToAnagenesis = stepsize;
                                                var _k166 = function (globalStore, _result141) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return _result141 ? function (globalStore, currentTime) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var _k144 = function (globalStore, _dummy143) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                var internalBranch = timeToAnagenesis;
                                                                return function () {
                                                                    return gaussian(globalStore, function (globalStore, _result142) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var multip = ad.scalar.exp(_result142);
                                                                        var lambdaNew = ad.scalar.mul(lambda, multip);
                                                                        return function () {
                                                                            return anads2TreeSim(globalStore, function (globalStore, Tree) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                return function () {
                                                                                    return ad.scalar.eq(Tree, !1) ? _k140(globalStore, !1) : function (globalStore, newBranch) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        var NewickTree = [
                                                                                            Tree[0],
                                                                                            newBranch
                                                                                        ];
                                                                                        return function () {
                                                                                            return _k140(globalStore, NewickTree);
                                                                                        };
                                                                                    }(globalStore, ad.scalar.add(Tree[1], internalBranch));
                                                                                };
                                                                            }, _address260.concat('_666'), currentTime, lambdaNew, stepsize, logAlpha, sigma, epsilon, rho, ad.scalar.sub(max_R, 1));
                                                                        };
                                                                    }, _address260.concat('_665'), {
                                                                        mu: ad.scalar.mul(logAlpha, stepsize),
                                                                        sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(stepsize))
                                                                    });
                                                                };
                                                            };
                                                            return function () {
                                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy146) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    return function () {
                                                                        return flip(globalStore, function (globalStore, _result145) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result145 ? function (globalStore, Label) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    var NewickTree = [
                                                                                        Label,
                                                                                        startTime
                                                                                    ];
                                                                                    return function () {
                                                                                        return _k140(globalStore, NewickTree);
                                                                                    };
                                                                                }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k140(globalStore, !1);
                                                                            };
                                                                        }, _address260.concat('_664'), rho);
                                                                    };
                                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k144(globalStore, undefined);
                                                            };
                                                        }(globalStore, ad.scalar.sub(startTime, timeToAnagenesis)) : function (globalStore, timeToEvent) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var currentTime = ad.scalar.sub(startTime, timeToEvent);
                                                            var internalBranch = timeToEvent;
                                                            var _k163 = function (globalStore, _dummy162) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return ad.scalar.eq(timeToExtinction, timeToEvent) ? _k140(globalStore, !1) : function (globalStore, delta) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        return function () {
                                                                            return gaussian(globalStore, function (globalStore, _result161) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var multip = ad.scalar.exp(_result161);
                                                                                var lambdaNew = ad.scalar.mul(lambda, multip);
                                                                                return function () {
                                                                                    return anads2TreeSim(globalStore, function (globalStore, leftTree) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        var _k158 = function (globalStore, _dummy157) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return anads2TreeSim(globalStore, function (globalStore, rightTree) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    var _k154 = function (globalStore, _dummy153) {
                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                        var _k150 = function (globalStore, _dummy149) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            var _k148 = function (globalStore, _dummy147) {
                                                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                return function () {
                                                                                                                    return ad.scalar.eq(leftTree, !1) ? function (globalStore, newBranch) {
                                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                        var NewickTree = [
                                                                                                                            rightTree[0],
                                                                                                                            newBranch
                                                                                                                        ];
                                                                                                                        return function () {
                                                                                                                            return _k140(globalStore, NewickTree);
                                                                                                                        };
                                                                                                                    }(globalStore, ad.scalar.add(rightTree[1], internalBranch)) : function (globalStore, NewickTree) {
                                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                                        return function () {
                                                                                                                            return _k140(globalStore, NewickTree);
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
                                                                                                                        return _k140(globalStore, NewickTree);
                                                                                                                    };
                                                                                                                }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k148(globalStore, undefined);
                                                                                                            };
                                                                                                        };
                                                                                                        var _k152 = function (globalStore, _result151) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            return function () {
                                                                                                                return _result151 ? _k140(globalStore, !1) : _k150(globalStore, undefined);
                                                                                                            };
                                                                                                        };
                                                                                                        return function () {
                                                                                                            return ad.scalar.eq(leftTree, !1) ? _k152(globalStore, ad.scalar.eq(rightTree, !1)) : _k152(globalStore, ad.scalar.eq(leftTree, !1));
                                                                                                        };
                                                                                                    };
                                                                                                    var _k156 = function (globalStore, _result155) {
                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                        return function () {
                                                                                                            return _result155 ? _k140(globalStore, rightTree) : _k154(globalStore, undefined);
                                                                                                        };
                                                                                                    };
                                                                                                    return function () {
                                                                                                        return rightTree ? checkError(globalStore, _k156, _address260.concat('_672'), rightTree) : _k156(globalStore, rightTree);
                                                                                                    };
                                                                                                }, _address260.concat('_671'), currentTime, lambdaNew, stepsize, logAlpha, sigma, epsilon, rho, ad.scalar.sub(max_R, 1));
                                                                                            };
                                                                                        };
                                                                                        var _k160 = function (globalStore, _result159) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return _result159 ? _k140(globalStore, leftTree) : _k158(globalStore, undefined);
                                                                                            };
                                                                                        };
                                                                                        return function () {
                                                                                            return leftTree ? checkError(globalStore, _k160, _address260.concat('_670'), leftTree) : _k160(globalStore, leftTree);
                                                                                        };
                                                                                    }, _address260.concat('_669'), currentTime, lambdaNew, stepsize, logAlpha, sigma, epsilon, rho, ad.scalar.sub(max_R, 1));
                                                                                };
                                                                            }, _address260.concat('_668'), {
                                                                                mu: ad.scalar.mul(logAlpha, delta),
                                                                                sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(delta))
                                                                            });
                                                                        };
                                                                    }(globalStore, timeToSpeciation);
                                                                };
                                                            };
                                                            return function () {
                                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy165) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    return function () {
                                                                        return flip(globalStore, function (globalStore, _result164) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result164 ? function (globalStore, Label) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    var NewickTree = [
                                                                                        Label,
                                                                                        startTime
                                                                                    ];
                                                                                    return function () {
                                                                                        return _k140(globalStore, NewickTree);
                                                                                    };
                                                                                }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k140(globalStore, !1);
                                                                            };
                                                                        }, _address260.concat('_667'), rho);
                                                                    };
                                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k163(globalStore, undefined);
                                                            };
                                                        }(globalStore, ad.scalar.min(timeToSpeciation, timeToExtinction));
                                                    };
                                                };
                                                return function () {
                                                    return ad.scalar.lt(timeToAnagenesis, timeToSpeciation) ? _k166(globalStore, ad.scalar.lt(timeToAnagenesis, timeToExtinction)) : _k166(globalStore, ad.scalar.lt(timeToAnagenesis, timeToSpeciation));
                                                };
                                            }, _address260.concat('_663'), { a: mu });
                                        };
                                    }, _address260.concat('_662'), { a: lambda });
                                };
                            };
                            return function () {
                                return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k140(globalStore, [
                                    'ERROR_MAX_TAXA:',
                                    startTime
                                ]) : _k168(globalStore, undefined);
                            };
                        };
                        var _k172 = function (globalStore, _result171) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return _result171 ? _k140(globalStore, [
                                    'ERROR_ZERO:',
                                    startTime
                                ]) : _k170(globalStore, undefined);
                            };
                        };
                        return function () {
                            return ad.scalar.eq(lambda, 0) ? _k172(globalStore, ad.scalar.eq(lambda, 0)) : _k172(globalStore, ad.scalar.eq(mu, 0));
                        };
                    };
                    return function () {
                        return ad.scalar.gt(ad.scalar.sub(lambda, mu), MAX_DIV) ? _k140(globalStore, [
                            'ERROR_MAX_DIV:',
                            startTime
                        ]) : _k174(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k140(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k176(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k140(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k178(globalStore, undefined);
            };
        };
        var dirname = argv._[1];
        var age = argv._[2];
        var rho = argv._[3];
        var _dummy55 = globalStore.n = 0;
        var checkError = function checkError(globalStore, _k54, _address265, tree) {
            var _currentAddress = _address265;
            _addr.save(_globalCurrentAddress, _address265);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k54(globalStore, !0) : _k54(globalStore, !1);
            };
        };
        var getHyperParamsFromDir = function getHyperParamsFromDir(globalStore, _k53, _address266, dirname) {
            var _currentAddress = _address266;
            _addr.save(_globalCurrentAddress, _address266);
            var sample = phyjs.sample(dirname);
            return function () {
                return _k53(globalStore, {
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
        var anads2TreeSimulate = function anads2TreeSimulate(globalStore, _k40, _address267, dirname) {
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
                    var stepsize = obj.stepsize;
                    var max_R = obj.max_R;
                    var MAX_LAMBDA = obj.MAX_LAMBDA;
                    var MAX_NODES = obj.MAX_NODES;
                    var MAX_DIV = obj.MAX_DIV;
                    return function () {
                        return anads2TreeSim(globalStore, function (globalStore, TreeLeft) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return ad.scalar.eq(TreeLeft, !1) ? function (globalStore, _dummy42) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy41 = globalStore.n = 0;
                                    return function () {
                                        return anads2TreeSimulate(globalStore, _k40, _address267.concat('_698'), dirname);
                                    };
                                }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeLeft) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _k52 = function (globalStore, _result43) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return _result43 ? function (globalStore, _dummy45) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _dummy44 = globalStore.n = 0;
                                                return function () {
                                                    return anads2TreeSimulate(globalStore, _k40, _address267.concat('_699'), dirname);
                                                };
                                            }(globalStore, console.log('Error: Guards hit')) : anads2TreeSim(globalStore, function (globalStore, TreeRight) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return ad.scalar.eq(TreeRight, !1) ? function (globalStore, _dummy47) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _dummy46 = globalStore.n = 0;
                                                        return function () {
                                                            return anads2TreeSimulate(globalStore, _k40, _address267.concat('_701'), dirname);
                                                        };
                                                    }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeRight) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _k51 = function (globalStore, _result48) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result48 ? function (globalStore, _dummy50) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var _dummy49 = globalStore.n = 0;
                                                                    return function () {
                                                                        return anads2TreeSimulate(globalStore, _k40, _address267.concat('_702'), dirname);
                                                                    };
                                                                }(globalStore, console.log('Error: Guards hit')) : function (globalStore, stringTree) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var Tree = ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';');
                                                                    return function () {
                                                                        return _k40(globalStore, Tree);
                                                                    };
                                                                }(globalStore, [ad.scalar.add(ad.scalar.add(TreeLeft.join(''), ','), TreeRight.join(''))]);
                                                            };
                                                        };
                                                        return function () {
                                                            return stringTreeRight.includes('ERROR_MAX') ? _k51(globalStore, stringTreeRight.includes('ERROR_MAX')) : _k51(globalStore, stringTreeRight.includes('ERROR_ZERO'));
                                                        };
                                                    }(globalStore, TreeRight.join(''));
                                                };
                                            }, _address267.concat('_700'), startTime, lambda0, stepsize, logAlpha, sigma, mu, rho, max_R, MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                        };
                                    };
                                    return function () {
                                        return stringTreeLeft.includes('ERROR_MAX') ? _k52(globalStore, stringTreeLeft.includes('ERROR_MAX')) : _k52(globalStore, stringTreeLeft.includes('ERROR_ZERO'));
                                    };
                                }(globalStore, TreeLeft.join(''));
                            };
                        }, _address267.concat('_697'), startTime, lambda0, stepsize, logAlpha, sigma, mu, rho, max_R, MAX_LAMBDA, MAX_NODES, MAX_DIV);
                    };
                }, _address267.concat('_696'), dirname);
            };
        };
        var anads2TreeSim = function anads2TreeSim(globalStore, _k1, _address268, startTime, lambda, stepsize, logAlpha, sigma, epsilon, rho, max_R, MAX_LAMBDA, MAX_NODES, MAX_DIV) {
            var _currentAddress = _address268;
            _addr.save(_globalCurrentAddress, _address268);
            var mu = ad.scalar.mul(epsilon, lambda);
            var _k39 = function (globalStore, _dummy38) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k37 = function (globalStore, _dummy36) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k35 = function (globalStore, _dummy34) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k31 = function (globalStore, _dummy30) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _k29 = function (globalStore, _dummy28) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return exponential(globalStore, function (globalStore, timeToSpeciation) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return exponential(globalStore, function (globalStore, timeToExtinction) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var timeToAnagenesis = stepsize;
                                                var _k27 = function (globalStore, _result2) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return _result2 ? function (globalStore, currentTime) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var _k5 = function (globalStore, _dummy4) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                var internalBranch = timeToAnagenesis;
                                                                return function () {
                                                                    return gaussian(globalStore, function (globalStore, _result3) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var multip = ad.scalar.exp(_result3);
                                                                        var lambdaNew = ad.scalar.mul(lambda, multip);
                                                                        return function () {
                                                                            return anads2TreeSim(globalStore, function (globalStore, Tree) {
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
                                                                            }, _address268.concat('_707'), currentTime, lambdaNew, stepsize, logAlpha, sigma, epsilon, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                                                        };
                                                                    }, _address268.concat('_706'), {
                                                                        mu: ad.scalar.mul(logAlpha, stepsize),
                                                                        sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(stepsize))
                                                                    });
                                                                };
                                                            };
                                                            return function () {
                                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy7) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    return function () {
                                                                        return flip(globalStore, function (globalStore, _result6) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result6 ? function (globalStore, Label) {
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
                                                                        }, _address268.concat('_705'), rho);
                                                                    };
                                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k5(globalStore, undefined);
                                                            };
                                                        }(globalStore, ad.scalar.sub(startTime, timeToAnagenesis)) : function (globalStore, timeToEvent) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var currentTime = ad.scalar.sub(startTime, timeToEvent);
                                                            var internalBranch = timeToEvent;
                                                            var _k24 = function (globalStore, _dummy23) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return ad.scalar.eq(timeToExtinction, timeToEvent) ? _k1(globalStore, !1) : function (globalStore, delta) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        return function () {
                                                                            return gaussian(globalStore, function (globalStore, _result22) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var multip = ad.scalar.exp(_result22);
                                                                                var lambdaNew = ad.scalar.mul(lambda, multip);
                                                                                return function () {
                                                                                    return anads2TreeSim(globalStore, function (globalStore, leftTree) {
                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                        var _k19 = function (globalStore, _dummy18) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return anads2TreeSim(globalStore, function (globalStore, rightTree) {
                                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                    var _k15 = function (globalStore, _dummy14) {
                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                        var _k11 = function (globalStore, _dummy10) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            var _k9 = function (globalStore, _dummy8) {
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
                                                                                                                }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k9(globalStore, undefined);
                                                                                                            };
                                                                                                        };
                                                                                                        var _k13 = function (globalStore, _result12) {
                                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                            return function () {
                                                                                                                return _result12 ? _k1(globalStore, !1) : _k11(globalStore, undefined);
                                                                                                            };
                                                                                                        };
                                                                                                        return function () {
                                                                                                            return ad.scalar.eq(leftTree, !1) ? _k13(globalStore, ad.scalar.eq(rightTree, !1)) : _k13(globalStore, ad.scalar.eq(leftTree, !1));
                                                                                                        };
                                                                                                    };
                                                                                                    var _k17 = function (globalStore, _result16) {
                                                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                                        return function () {
                                                                                                            return _result16 ? _k1(globalStore, rightTree) : _k15(globalStore, undefined);
                                                                                                        };
                                                                                                    };
                                                                                                    return function () {
                                                                                                        return rightTree ? checkError(globalStore, _k17, _address268.concat('_713'), rightTree) : _k17(globalStore, rightTree);
                                                                                                    };
                                                                                                }, _address268.concat('_712'), currentTime, lambdaNew, stepsize, logAlpha, sigma, epsilon, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                                                                            };
                                                                                        };
                                                                                        var _k21 = function (globalStore, _result20) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return _result20 ? _k1(globalStore, leftTree) : _k19(globalStore, undefined);
                                                                                            };
                                                                                        };
                                                                                        return function () {
                                                                                            return leftTree ? checkError(globalStore, _k21, _address268.concat('_711'), leftTree) : _k21(globalStore, leftTree);
                                                                                        };
                                                                                    }, _address268.concat('_710'), currentTime, lambdaNew, stepsize, logAlpha, sigma, epsilon, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES, MAX_DIV);
                                                                                };
                                                                            }, _address268.concat('_709'), {
                                                                                mu: ad.scalar.mul(logAlpha, delta),
                                                                                sigma: ad.scalar.mul(sigma, ad.scalar.sqrt(delta))
                                                                            });
                                                                        };
                                                                    }(globalStore, timeToSpeciation);
                                                                };
                                                            };
                                                            return function () {
                                                                return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy26) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    return function () {
                                                                        return flip(globalStore, function (globalStore, _result25) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result25 ? function (globalStore, Label) {
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
                                                                        }, _address268.concat('_708'), rho);
                                                                    };
                                                                }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : _k24(globalStore, undefined);
                                                            };
                                                        }(globalStore, ad.scalar.min(timeToSpeciation, timeToExtinction));
                                                    };
                                                };
                                                return function () {
                                                    return ad.scalar.lt(timeToAnagenesis, timeToSpeciation) ? _k27(globalStore, ad.scalar.lt(timeToAnagenesis, timeToExtinction)) : _k27(globalStore, ad.scalar.lt(timeToAnagenesis, timeToSpeciation));
                                                };
                                            }, _address268.concat('_704'), { a: mu });
                                        };
                                    }, _address268.concat('_703'), { a: lambda });
                                };
                            };
                            return function () {
                                return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k1(globalStore, [
                                    'ERROR_MAX_TAXA:',
                                    startTime
                                ]) : _k29(globalStore, undefined);
                            };
                        };
                        var _k33 = function (globalStore, _result32) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return _result32 ? _k1(globalStore, [
                                    'ERROR_ZERO:',
                                    startTime
                                ]) : _k31(globalStore, undefined);
                            };
                        };
                        return function () {
                            return ad.scalar.eq(lambda, 0) ? _k33(globalStore, ad.scalar.eq(lambda, 0)) : _k33(globalStore, ad.scalar.eq(mu, 0));
                        };
                    };
                    return function () {
                        return ad.scalar.gt(ad.scalar.sub(lambda, mu), MAX_DIV) ? _k1(globalStore, [
                            'ERROR_MAX_DIV:',
                            startTime
                        ]) : _k35(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k1(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k37(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k1(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k39(globalStore, undefined);
            };
        };
        return function () {
            return anads2TreeSimulate(globalStore, _k0, _address0.concat('_714'), dirname);
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');