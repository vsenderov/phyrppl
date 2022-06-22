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
        var exponential = function exponential(globalStore, _k1245, _address10, arg0) {
            var _currentAddress = _address10;
            _addr.save(_globalCurrentAddress, _address10);
            var _k1247 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Exponential(globalStore, function (globalStore, _result1246) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1245, _address10.concat('_19'), _result1246);
                        };
                    }, _address10.concat('_18'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1247(globalStore, arg0) : _k1247(globalStore, { a: arg0 });
            };
        };
        var Gamma = dists.makeGamma;
        var Gaussian = dists.makeGaussian;
        var gaussian = function gaussian(globalStore, _k1239, _address12, arg0, arg1) {
            var _currentAddress = _address12;
            _addr.save(_globalCurrentAddress, _address12);
            var _k1241 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Gaussian(globalStore, function (globalStore, _result1240) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1239, _address12.concat('_23'), _result1240);
                        };
                    }, _address12.concat('_22'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1241(globalStore, arg0) : _k1241(globalStore, {
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
        var flip = function flip(globalStore, _k1192, _address27, p) {
            var _currentAddress = _address27;
            _addr.save(_globalCurrentAddress, _address27);
            var _k1195 = function (globalStore, _result1194) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var params = { p: _result1194 };
                return function () {
                    return Bernoulli(globalStore, function (globalStore, _result1193) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1192, _address27.concat('_53'), _result1193);
                        };
                    }, _address27.concat('_52'), params);
                };
            };
            return function () {
                return ad.scalar.pneq(p, undefined) ? _k1195(globalStore, p) : _k1195(globalStore, 0.5);
            };
        };
        var constF = function constF(globalStore, _k1143, _address47, f) {
            var _currentAddress = _address47;
            _addr.save(_globalCurrentAddress, _address47);
            return function () {
                return _k1143(globalStore, function (globalStore, _k1144, _address48) {
                    var _currentAddress = _address48;
                    _addr.save(_globalCurrentAddress, _address48);
                    return function () {
                        return _k1144(globalStore, f);
                    };
                });
            };
        };
        var error = function error(globalStore, _k1016, _address122, msg) {
            var _currentAddress = _address122;
            _addr.save(_globalCurrentAddress, _address122);
            return function () {
                return _k1016(globalStore, util.error(msg));
            };
        };
        var SampleGuide = function SampleGuide(globalStore, _k1012, _address126, wpplFn, options) {
            var _currentAddress = _address126;
            _addr.save(_globalCurrentAddress, _address126);
            return function () {
                return ForwardSample(globalStore, _k1012, _address126.concat('_156'), wpplFn, _.assign({ guide: !0 }, _.omit(options, 'guide')));
            };
        };
        var OptimizeThenSample = function OptimizeThenSample(globalStore, _k1010, _address127, wpplFn, options) {
            var _currentAddress = _address127;
            _addr.save(_globalCurrentAddress, _address127);
            return function () {
                return Optimize(globalStore, function (globalStore, _dummy1011) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var opts = _.pick(options, 'samples', 'onlyMAP', 'callbacks', 'verbose');
                    return function () {
                        return SampleGuide(globalStore, _k1010, _address127.concat('_158'), wpplFn, opts);
                    };
                }, _address127.concat('_157'), wpplFn, _.omit(options, 'samples', 'onlyMAP', 'callbacks'));
            };
        };
        var AISforInfer = function AISforInfer(globalStore, _k1006, _address128, wpplFn, options) {
            var _currentAddress = _address128;
            _addr.save(_globalCurrentAddress, _address128);
            return function () {
                return constF(globalStore, function (globalStore, _result1009) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return Infer(globalStore, function (globalStore, dummyMarginal) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return AIS(globalStore, function (globalStore, _result1008) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy1007 = _.assign(dummyMarginal, { normalizationConstant: _result1008 });
                                    return function () {
                                        return _k1006(globalStore, dummyMarginal);
                                    };
                                }, _address128.concat('_161'), wpplFn, options);
                            };
                        }, _address128.concat('_160'), _result1009);
                    };
                }, _address128.concat('_159'), !0);
            };
        };
        var DefaultInfer = function DefaultInfer(globalStore, _k996, _address129, wpplFn, options) {
            var _currentAddress = _address129;
            _addr.save(_globalCurrentAddress, _address129);
            var _dummy1005 = util.mergeDefaults(options, {}, 'Infer');
            var maxEnumTreeSize = 200000;
            var minSampleRate = 250;
            var samples = 1000;
            return function () {
                return Enumerate(globalStore, function (globalStore, enumResult) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k1004 = function (globalStore, _dummy1003) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _dummy1002 = console.log('Using "rejection"');
                        return function () {
                            return Rejection(globalStore, function (globalStore, rejResult) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return rejResult instanceof Error ? function (globalStore, _dummy1001) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return CheckSampleAfterFactor(globalStore, function (globalStore, hasSampleAfterFactor) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _k999 = function (globalStore, _dummy998) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _dummy997 = console.log('Using "MCMC"');
                                                    return function () {
                                                        return MCMC(globalStore, _k996, _address129.concat('_168'), wpplFn, { samples: samples });
                                                    };
                                                };
                                                return function () {
                                                    return hasSampleAfterFactor ? function (globalStore, _dummy1000) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return SMC(globalStore, function (globalStore, smcResult) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return dists.isDist(smcResult) ? _k996(globalStore, smcResult) : smcResult instanceof Error ? _k999(globalStore, console.log(ad.scalar.add(smcResult.message, '..quit SMC'))) : error(globalStore, _k999, _address129.concat('_167'), 'Invalid return value from SMC');
                                                                };
                                                            }, _address129.concat('_166'), wpplFn, {
                                                                throwOnError: !1,
                                                                particles: samples
                                                            });
                                                        };
                                                    }(globalStore, console.log('Using "SMC" (interleaving samples and factors detected)')) : _k999(globalStore, undefined);
                                                };
                                            }, _address129.concat('_165'), wpplFn);
                                        };
                                    }(globalStore, console.log(ad.scalar.add(rejResult.message, '..quit rejection'))) : dists.isDist(rejResult) ? _k996(globalStore, rejResult) : error(globalStore, _k996, _address129.concat('_169'), 'Invalid return value from rejection');
                                };
                            }, _address129.concat('_164'), wpplFn, {
                                minSampleRate: minSampleRate,
                                throwOnError: !1,
                                samples: samples
                            });
                        };
                    };
                    return function () {
                        return dists.isDist(enumResult) ? _k996(globalStore, enumResult) : enumResult instanceof Error ? _k1004(globalStore, console.log(ad.scalar.add(enumResult.message, '..quit enumerate'))) : error(globalStore, _k1004, _address129.concat('_163'), 'Invalid return value from enumerate');
                    };
                }, _address129.concat('_162'), wpplFn, {
                    maxEnumTreeSize: maxEnumTreeSize,
                    maxRuntimeInMS: 5000,
                    throwOnError: !1,
                    strategy: 'depthFirst'
                });
            };
        };
        var Infer = function Infer(globalStore, _k989, _address130, options, maybeFn) {
            var _currentAddress = _address130;
            _addr.save(_globalCurrentAddress, _address130);
            var _k995 = function (globalStore, wpplFn) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k994 = function (globalStore, _dummy993) {
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
                    var _k992 = function (globalStore, methodName) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k991 = function (globalStore, _dummy990) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var method = methodMap[methodName];
                            return function () {
                                return method(globalStore, _k989, _address130.concat('_172'), wpplFn, _.omit(options, 'method', 'model'));
                            };
                        };
                        return function () {
                            return _.has(methodMap, methodName) ? _k991(globalStore, undefined) : function (globalStore, methodNames) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var msg = ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('Infer: \'', methodName), '\' is not a valid method. The following methods are available: '), methodNames.join(', ')), '.');
                                return function () {
                                    return error(globalStore, _k991, _address130.concat('_171'), msg);
                                };
                            }(globalStore, _.keys(methodMap));
                        };
                    };
                    return function () {
                        return options.method ? _k992(globalStore, options.method) : _k992(globalStore, 'defaultInfer');
                    };
                };
                return function () {
                    return _.isFunction(wpplFn) ? _k994(globalStore, undefined) : error(globalStore, _k994, _address130.concat('_170'), 'Infer: a model was not specified.');
                };
            };
            return function () {
                return util.isObject(options) ? maybeFn ? _k995(globalStore, maybeFn) : _k995(globalStore, options.model) : _k995(globalStore, options);
            };
        };
        var fs = {
            read: webpplFs.read,
            write: webpplFs.write,
            mkdirp: webpplFs.mkdirp,
            node: webpplFs.node
        };
        var checkError = function checkError(globalStore, _k324, _address250, tree) {
            var _currentAddress = _address250;
            _addr.save(_globalCurrentAddress, _address250);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k324(globalStore, !0) : _k324(globalStore, !1);
            };
        };
        var clads0TreeSimulate = function clads0TreeSimulate(globalStore, _k233, _address255, startTime, lambda0, logAlpha, sigma, rho, max_R) {
            var _currentAddress = _address255;
            _addr.save(_globalCurrentAddress, _address255);
            return function () {
                return clads0TreeSim(globalStore, function (globalStore, Tree) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k238 = function (globalStore, _dummy237) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var stringTree = Tree.join('');
                        return function () {
                            return stringTree.includes('ERROR_MAX') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy234 = fs.write(filename, message);
                                return function () {
                                    return _k233(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Tree too big.') : stringTree.includes('ERROR_ZERO') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy235 = fs.write(filename, message);
                                return function () {
                                    return _k233(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Evolution stopped.') : function (globalStore, Tree) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy236 = fs.write(filename, Tree);
                                return function () {
                                    return _k233(globalStore, Tree);
                                };
                            }(globalStore, ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';'));
                        };
                    };
                    return function () {
                        return ad.scalar.eq(Tree, !1) ? function (globalStore, message) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _dummy239 = fs.write(filename, message);
                            return function () {
                                return _k233(globalStore, message);
                            };
                        }(globalStore, 'No survivors.') : _k238(globalStore, undefined);
                    };
                }, _address255.concat('_644'), startTime, lambda0, logAlpha, sigma, rho, max_R);
            };
        };
        var clads0TreeSim = function clads0TreeSim(globalStore, _k206, _address256, startTime, lambda, logAlpha, sigma, rho, max_R) {
            var _currentAddress = _address256;
            _addr.save(_globalCurrentAddress, _address256);
            var _k232 = function (globalStore, _dummy231) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k230 = function (globalStore, _dummy229) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k228 = function (globalStore, _dummy227) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k226 = function (globalStore, _dummy225) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return exponential(globalStore, function (globalStore, t) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var currentTime = ad.scalar.sub(startTime, t);
                                    var internalBranch = t;
                                    return function () {
                                        return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy208) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, _result207) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return _result207 ? function (globalStore, Label) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var NewickTree = [
                                                                Label,
                                                                startTime
                                                            ];
                                                            return function () {
                                                                return _k206(globalStore, NewickTree);
                                                            };
                                                        }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k206(globalStore, !1);
                                                    };
                                                }, _address256.concat('_646'), rho);
                                            };
                                        }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : gaussian(globalStore, function (globalStore, _result224) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            var multip1 = ad.scalar.exp(_result224);
                                            return function () {
                                                return gaussian(globalStore, function (globalStore, _result223) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var multip2 = ad.scalar.exp(_result223);
                                                    var lambda1 = ad.scalar.mul(lambda, multip1);
                                                    var lambda2 = ad.scalar.mul(lambda, multip2);
                                                    return function () {
                                                        return clads0TreeSim(globalStore, function (globalStore, leftTree) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var _k220 = function (globalStore, _dummy219) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return clads0TreeSim(globalStore, function (globalStore, rightTree) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var _k216 = function (globalStore, _dummy215) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            var _k212 = function (globalStore, _dummy211) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k210 = function (globalStore, _dummy209) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return ad.scalar.eq(leftTree, !1) ? function (globalStore, newBranch) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            var NewickTree = [
                                                                                                rightTree[0],
                                                                                                newBranch
                                                                                            ];
                                                                                            return function () {
                                                                                                return _k206(globalStore, NewickTree);
                                                                                            };
                                                                                        }(globalStore, ad.scalar.add(rightTree[1], internalBranch)) : function (globalStore, NewickTree) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return _k206(globalStore, NewickTree);
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
                                                                                            return _k206(globalStore, NewickTree);
                                                                                        };
                                                                                    }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k210(globalStore, undefined);
                                                                                };
                                                                            };
                                                                            var _k214 = function (globalStore, _result213) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                return function () {
                                                                                    return _result213 ? _k206(globalStore, !1) : _k212(globalStore, undefined);
                                                                                };
                                                                            };
                                                                            return function () {
                                                                                return ad.scalar.eq(leftTree, !1) ? _k214(globalStore, ad.scalar.eq(rightTree, !1)) : _k214(globalStore, ad.scalar.eq(leftTree, !1));
                                                                            };
                                                                        };
                                                                        var _k218 = function (globalStore, _result217) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result217 ? _k206(globalStore, rightTree) : _k216(globalStore, undefined);
                                                                            };
                                                                        };
                                                                        return function () {
                                                                            return rightTree ? checkError(globalStore, _k218, _address256.concat('_652'), rightTree) : _k218(globalStore, rightTree);
                                                                        };
                                                                    }, _address256.concat('_651'), currentTime, lambda2, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1));
                                                                };
                                                            };
                                                            var _k222 = function (globalStore, _result221) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return _result221 ? _k206(globalStore, leftTree) : _k220(globalStore, undefined);
                                                                };
                                                            };
                                                            return function () {
                                                                return leftTree ? checkError(globalStore, _k222, _address256.concat('_650'), leftTree) : _k222(globalStore, leftTree);
                                                            };
                                                        }, _address256.concat('_649'), currentTime, lambda1, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1));
                                                    };
                                                }, _address256.concat('_648'), {
                                                    mu: logAlpha,
                                                    sigma: sigma
                                                });
                                            };
                                        }, _address256.concat('_647'), {
                                            mu: logAlpha,
                                            sigma: sigma
                                        });
                                    };
                                }, _address256.concat('_645'), { a: lambda });
                            };
                        };
                        return function () {
                            return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k206(globalStore, [
                                'ERROR_MAX_TAXA:',
                                startTime
                            ]) : _k226(globalStore, undefined);
                        };
                    };
                    return function () {
                        return ad.scalar.eq(lambda, 0) ? _k206(globalStore, [
                            'ERROR_ZERO:',
                            startTime
                        ]) : _k228(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k206(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k230(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k206(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k232(globalStore, undefined);
            };
        };
        var dirname = argv._[1];
        var age = argv._[2];
        var rho = argv._[3];
        var _dummy43 = globalStore.n = 0;
        var checkError = function checkError(globalStore, _k42, _address265, tree) {
            var _currentAddress = _address265;
            _addr.save(_globalCurrentAddress, _address265);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k42(globalStore, !0) : _k42(globalStore, !1);
            };
        };
        var getHyperParamsFromDir = function getHyperParamsFromDir(globalStore, _k41, _address266, dirname) {
            var _currentAddress = _address266;
            _addr.save(_globalCurrentAddress, _address266);
            var sample = phyjs.sample(dirname);
            return function () {
                return _k41(globalStore, {
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
        var clads0TreeSimulate = function clads0TreeSimulate(globalStore, _k28, _address267, dirname) {
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
                    var max_R = obj.max_R;
                    var MAX_LAMBDA = obj.MAX_LAMBDA;
                    var MAX_NODES = obj.MAX_NODES;
                    return function () {
                        return clads0TreeSim(globalStore, function (globalStore, TreeLeft) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return ad.scalar.eq(TreeLeft, !1) ? function (globalStore, _dummy30) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy29 = globalStore.n = 0;
                                    return function () {
                                        return clads0TreeSimulate(globalStore, _k28, _address267.concat('_698'), dirname);
                                    };
                                }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeLeft) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _k40 = function (globalStore, _result31) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return _result31 ? function (globalStore, _dummy33) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _dummy32 = globalStore.n = 0;
                                                return function () {
                                                    return clads0TreeSimulate(globalStore, _k28, _address267.concat('_699'), dirname);
                                                };
                                            }(globalStore, console.log('Error: Guards hit')) : clads0TreeSim(globalStore, function (globalStore, TreeRight) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return ad.scalar.eq(TreeRight, !1) ? function (globalStore, _dummy35) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _dummy34 = globalStore.n = 0;
                                                        return function () {
                                                            return clads0TreeSimulate(globalStore, _k28, _address267.concat('_701'), dirname);
                                                        };
                                                    }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeRight) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _k39 = function (globalStore, _result36) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result36 ? function (globalStore, _dummy38) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var _dummy37 = globalStore.n = 0;
                                                                    return function () {
                                                                        return clads0TreeSimulate(globalStore, _k28, _address267.concat('_702'), dirname);
                                                                    };
                                                                }(globalStore, console.log('Error: Guards hit')) : function (globalStore, stringTree) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var Tree = ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';');
                                                                    return function () {
                                                                        return _k28(globalStore, Tree);
                                                                    };
                                                                }(globalStore, [ad.scalar.add(ad.scalar.add(TreeLeft.join(''), ','), TreeRight.join(''))]);
                                                            };
                                                        };
                                                        return function () {
                                                            return stringTreeRight.includes('ERROR_MAX') ? _k39(globalStore, stringTreeRight.includes('ERROR_MAX')) : _k39(globalStore, stringTreeRight.includes('ERROR_ZERO'));
                                                        };
                                                    }(globalStore, TreeRight.join(''));
                                                };
                                            }, _address267.concat('_700'), startTime, lambda0, logAlpha, sigma, rho, max_R, MAX_LAMBDA, MAX_NODES);
                                        };
                                    };
                                    return function () {
                                        return stringTreeLeft.includes('ERROR_MAX') ? _k40(globalStore, stringTreeLeft.includes('ERROR_MAX')) : _k40(globalStore, stringTreeLeft.includes('ERROR_ZERO'));
                                    };
                                }(globalStore, TreeLeft.join(''));
                            };
                        }, _address267.concat('_697'), startTime, lambda0, logAlpha, sigma, rho, max_R, MAX_LAMBDA, MAX_NODES);
                    };
                }, _address267.concat('_696'), dirname);
            };
        };
        var clads0TreeSim = function clads0TreeSim(globalStore, _k1, _address268, startTime, lambda, logAlpha, sigma, rho, max_R, MAX_LAMBDA, MAX_NODES) {
            var _currentAddress = _address268;
            _addr.save(_globalCurrentAddress, _address268);
            var _k27 = function (globalStore, _dummy26) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k25 = function (globalStore, _dummy24) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k23 = function (globalStore, _dummy22) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k21 = function (globalStore, _dummy20) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return exponential(globalStore, function (globalStore, t) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var currentTime = ad.scalar.sub(startTime, t);
                                    var internalBranch = t;
                                    return function () {
                                        return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy3) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, _result2) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return _result2 ? function (globalStore, Label) {
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
                                        }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : gaussian(globalStore, function (globalStore, _result19) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            var multip1 = ad.scalar.exp(_result19);
                                            return function () {
                                                return gaussian(globalStore, function (globalStore, _result18) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var multip2 = ad.scalar.exp(_result18);
                                                    var lambda1 = ad.scalar.mul(lambda, multip1);
                                                    var lambda2 = ad.scalar.mul(lambda, multip2);
                                                    return function () {
                                                        return clads0TreeSim(globalStore, function (globalStore, leftTree) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var _k15 = function (globalStore, _dummy14) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return clads0TreeSim(globalStore, function (globalStore, rightTree) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var _k11 = function (globalStore, _dummy10) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            var _k7 = function (globalStore, _dummy6) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k5 = function (globalStore, _dummy4) {
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
                                                                                    }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k5(globalStore, undefined);
                                                                                };
                                                                            };
                                                                            var _k9 = function (globalStore, _result8) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                return function () {
                                                                                    return _result8 ? _k1(globalStore, !1) : _k7(globalStore, undefined);
                                                                                };
                                                                            };
                                                                            return function () {
                                                                                return ad.scalar.eq(leftTree, !1) ? _k9(globalStore, ad.scalar.eq(rightTree, !1)) : _k9(globalStore, ad.scalar.eq(leftTree, !1));
                                                                            };
                                                                        };
                                                                        var _k13 = function (globalStore, _result12) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result12 ? _k1(globalStore, rightTree) : _k11(globalStore, undefined);
                                                                            };
                                                                        };
                                                                        return function () {
                                                                            return rightTree ? checkError(globalStore, _k13, _address268.concat('_710'), rightTree) : _k13(globalStore, rightTree);
                                                                        };
                                                                    }, _address268.concat('_709'), currentTime, lambda2, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES);
                                                                };
                                                            };
                                                            var _k17 = function (globalStore, _result16) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return _result16 ? _k1(globalStore, leftTree) : _k15(globalStore, undefined);
                                                                };
                                                            };
                                                            return function () {
                                                                return leftTree ? checkError(globalStore, _k17, _address268.concat('_708'), leftTree) : _k17(globalStore, leftTree);
                                                            };
                                                        }, _address268.concat('_707'), currentTime, lambda1, logAlpha, sigma, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES);
                                                    };
                                                }, _address268.concat('_706'), {
                                                    mu: logAlpha,
                                                    sigma: sigma
                                                });
                                            };
                                        }, _address268.concat('_705'), {
                                            mu: logAlpha,
                                            sigma: sigma
                                        });
                                    };
                                }, _address268.concat('_703'), { a: lambda });
                            };
                        };
                        return function () {
                            return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k1(globalStore, [
                                'ERROR_MAX_TAXA:',
                                startTime
                            ]) : _k21(globalStore, undefined);
                        };
                    };
                    return function () {
                        return ad.scalar.eq(lambda, 0) ? _k1(globalStore, [
                            'ERROR_ZERO:',
                            startTime
                        ]) : _k23(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k1(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k25(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k1(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k27(globalStore, undefined);
            };
        };
        return function () {
            return clads0TreeSimulate(globalStore, _k0, _address0.concat('_711'), dirname);
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');