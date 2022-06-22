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
        var exponential = function exponential(globalStore, _k1243, _address10, arg0) {
            var _currentAddress = _address10;
            _addr.save(_globalCurrentAddress, _address10);
            var _k1245 = function (globalStore, params) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                return function () {
                    return Exponential(globalStore, function (globalStore, _result1244) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1243, _address10.concat('_19'), _result1244);
                        };
                    }, _address10.concat('_18'), params);
                };
            };
            return function () {
                return util.isObject(arg0) ? _k1245(globalStore, arg0) : _k1245(globalStore, { a: arg0 });
            };
        };
        var Gamma = dists.makeGamma;
        var Gaussian = dists.makeGaussian;
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
        var flip = function flip(globalStore, _k1190, _address27, p) {
            var _currentAddress = _address27;
            _addr.save(_globalCurrentAddress, _address27);
            var _k1193 = function (globalStore, _result1192) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var params = { p: _result1192 };
                return function () {
                    return Bernoulli(globalStore, function (globalStore, _result1191) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        return function () {
                            return sample(globalStore, _k1190, _address27.concat('_53'), _result1191);
                        };
                    }, _address27.concat('_52'), params);
                };
            };
            return function () {
                return ad.scalar.pneq(p, undefined) ? _k1193(globalStore, p) : _k1193(globalStore, 0.5);
            };
        };
        var constF = function constF(globalStore, _k1141, _address47, f) {
            var _currentAddress = _address47;
            _addr.save(_globalCurrentAddress, _address47);
            return function () {
                return _k1141(globalStore, function (globalStore, _k1142, _address48) {
                    var _currentAddress = _address48;
                    _addr.save(_globalCurrentAddress, _address48);
                    return function () {
                        return _k1142(globalStore, f);
                    };
                });
            };
        };
        var error = function error(globalStore, _k1014, _address122, msg) {
            var _currentAddress = _address122;
            _addr.save(_globalCurrentAddress, _address122);
            return function () {
                return _k1014(globalStore, util.error(msg));
            };
        };
        var SampleGuide = function SampleGuide(globalStore, _k1010, _address126, wpplFn, options) {
            var _currentAddress = _address126;
            _addr.save(_globalCurrentAddress, _address126);
            return function () {
                return ForwardSample(globalStore, _k1010, _address126.concat('_156'), wpplFn, _.assign({ guide: !0 }, _.omit(options, 'guide')));
            };
        };
        var OptimizeThenSample = function OptimizeThenSample(globalStore, _k1008, _address127, wpplFn, options) {
            var _currentAddress = _address127;
            _addr.save(_globalCurrentAddress, _address127);
            return function () {
                return Optimize(globalStore, function (globalStore, _dummy1009) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var opts = _.pick(options, 'samples', 'onlyMAP', 'callbacks', 'verbose');
                    return function () {
                        return SampleGuide(globalStore, _k1008, _address127.concat('_158'), wpplFn, opts);
                    };
                }, _address127.concat('_157'), wpplFn, _.omit(options, 'samples', 'onlyMAP', 'callbacks'));
            };
        };
        var AISforInfer = function AISforInfer(globalStore, _k1004, _address128, wpplFn, options) {
            var _currentAddress = _address128;
            _addr.save(_globalCurrentAddress, _address128);
            return function () {
                return constF(globalStore, function (globalStore, _result1007) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    return function () {
                        return Infer(globalStore, function (globalStore, dummyMarginal) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return AIS(globalStore, function (globalStore, _result1006) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy1005 = _.assign(dummyMarginal, { normalizationConstant: _result1006 });
                                    return function () {
                                        return _k1004(globalStore, dummyMarginal);
                                    };
                                }, _address128.concat('_161'), wpplFn, options);
                            };
                        }, _address128.concat('_160'), _result1007);
                    };
                }, _address128.concat('_159'), !0);
            };
        };
        var DefaultInfer = function DefaultInfer(globalStore, _k994, _address129, wpplFn, options) {
            var _currentAddress = _address129;
            _addr.save(_globalCurrentAddress, _address129);
            var _dummy1003 = util.mergeDefaults(options, {}, 'Infer');
            var maxEnumTreeSize = 200000;
            var minSampleRate = 250;
            var samples = 1000;
            return function () {
                return Enumerate(globalStore, function (globalStore, enumResult) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k1002 = function (globalStore, _dummy1001) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _dummy1000 = console.log('Using "rejection"');
                        return function () {
                            return Rejection(globalStore, function (globalStore, rejResult) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                return function () {
                                    return rejResult instanceof Error ? function (globalStore, _dummy999) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return CheckSampleAfterFactor(globalStore, function (globalStore, hasSampleAfterFactor) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _k997 = function (globalStore, _dummy996) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    var _dummy995 = console.log('Using "MCMC"');
                                                    return function () {
                                                        return MCMC(globalStore, _k994, _address129.concat('_168'), wpplFn, { samples: samples });
                                                    };
                                                };
                                                return function () {
                                                    return hasSampleAfterFactor ? function (globalStore, _dummy998) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        return function () {
                                                            return SMC(globalStore, function (globalStore, smcResult) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return dists.isDist(smcResult) ? _k994(globalStore, smcResult) : smcResult instanceof Error ? _k997(globalStore, console.log(ad.scalar.add(smcResult.message, '..quit SMC'))) : error(globalStore, _k997, _address129.concat('_167'), 'Invalid return value from SMC');
                                                                };
                                                            }, _address129.concat('_166'), wpplFn, {
                                                                throwOnError: !1,
                                                                particles: samples
                                                            });
                                                        };
                                                    }(globalStore, console.log('Using "SMC" (interleaving samples and factors detected)')) : _k997(globalStore, undefined);
                                                };
                                            }, _address129.concat('_165'), wpplFn);
                                        };
                                    }(globalStore, console.log(ad.scalar.add(rejResult.message, '..quit rejection'))) : dists.isDist(rejResult) ? _k994(globalStore, rejResult) : error(globalStore, _k994, _address129.concat('_169'), 'Invalid return value from rejection');
                                };
                            }, _address129.concat('_164'), wpplFn, {
                                minSampleRate: minSampleRate,
                                throwOnError: !1,
                                samples: samples
                            });
                        };
                    };
                    return function () {
                        return dists.isDist(enumResult) ? _k994(globalStore, enumResult) : enumResult instanceof Error ? _k1002(globalStore, console.log(ad.scalar.add(enumResult.message, '..quit enumerate'))) : error(globalStore, _k1002, _address129.concat('_163'), 'Invalid return value from enumerate');
                    };
                }, _address129.concat('_162'), wpplFn, {
                    maxEnumTreeSize: maxEnumTreeSize,
                    maxRuntimeInMS: 5000,
                    throwOnError: !1,
                    strategy: 'depthFirst'
                });
            };
        };
        var Infer = function Infer(globalStore, _k987, _address130, options, maybeFn) {
            var _currentAddress = _address130;
            _addr.save(_globalCurrentAddress, _address130);
            var _k993 = function (globalStore, wpplFn) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k992 = function (globalStore, _dummy991) {
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
                    var _k990 = function (globalStore, methodName) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k989 = function (globalStore, _dummy988) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var method = methodMap[methodName];
                            return function () {
                                return method(globalStore, _k987, _address130.concat('_172'), wpplFn, _.omit(options, 'method', 'model'));
                            };
                        };
                        return function () {
                            return _.has(methodMap, methodName) ? _k989(globalStore, undefined) : function (globalStore, methodNames) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var msg = ad.scalar.add(ad.scalar.add(ad.scalar.add(ad.scalar.add('Infer: \'', methodName), '\' is not a valid method. The following methods are available: '), methodNames.join(', ')), '.');
                                return function () {
                                    return error(globalStore, _k989, _address130.concat('_171'), msg);
                                };
                            }(globalStore, _.keys(methodMap));
                        };
                    };
                    return function () {
                        return options.method ? _k990(globalStore, options.method) : _k990(globalStore, 'defaultInfer');
                    };
                };
                return function () {
                    return _.isFunction(wpplFn) ? _k992(globalStore, undefined) : error(globalStore, _k992, _address130.concat('_170'), 'Infer: a model was not specified.');
                };
            };
            return function () {
                return util.isObject(options) ? maybeFn ? _k993(globalStore, maybeFn) : _k993(globalStore, options.model) : _k993(globalStore, options);
            };
        };
        var fs = {
            read: webpplFs.read,
            write: webpplFs.write,
            mkdirp: webpplFs.mkdirp,
            node: webpplFs.node
        };
        var checkError = function checkError(globalStore, _k322, _address250, tree) {
            var _currentAddress = _address250;
            _addr.save(_globalCurrentAddress, _address250);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k322(globalStore, !0) : _k322(globalStore, !1);
            };
        };
        var crbdTreeSimulate = function crbdTreeSimulate(globalStore, _k197, _address257, startTime, lambda, mu, rho, filename, max_R) {
            var _currentAddress = _address257;
            _addr.save(_globalCurrentAddress, _address257);
            return function () {
                return crbdTreeSim(globalStore, function (globalStore, Tree) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k202 = function (globalStore, _dummy201) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var stringTree = Tree.join('');
                        return function () {
                            return stringTree.includes('ERROR_MAX') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy198 = fs.write(filename, message);
                                return function () {
                                    return _k197(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Tree too big.') : stringTree.includes('ERROR_ZERO') ? function (globalStore, message) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy199 = fs.write(filename, message);
                                return function () {
                                    return _k197(globalStore, message);
                                };
                            }(globalStore, 'Guards hit. Evolution stopped.') : function (globalStore, Tree) {
                                _addr.save(_globalCurrentAddress, _currentAddress);
                                var _dummy200 = fs.write(filename, Tree);
                                return function () {
                                    return _k197(globalStore, Tree);
                                };
                            }(globalStore, ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';'));
                        };
                    };
                    return function () {
                        return ad.scalar.eq(Tree, !1) ? function (globalStore, message) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            var _dummy203 = fs.write(filename, message);
                            return function () {
                                return _k197(globalStore, message);
                            };
                        }(globalStore, 'No survivors.') : _k202(globalStore, undefined);
                    };
                }, _address257.concat('_653'), startTime, lambda, mu, rho, max_R);
            };
        };
        var crbdTreeSim = function crbdTreeSim(globalStore, _k172, _address258, startTime, lambda, mu, rho, max_R) {
            var _currentAddress = _address258;
            _addr.save(_globalCurrentAddress, _address258);
            var _k196 = function (globalStore, _dummy195) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k194 = function (globalStore, _dummy193) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k192 = function (globalStore, _dummy191) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k190 = function (globalStore, _dummy189) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return exponential(globalStore, function (globalStore, t) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var currentTime = ad.scalar.sub(startTime, t);
                                    return function () {
                                        return ad.scalar.lt(currentTime, 0) ? function (globalStore, _dummy174) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, _result173) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return _result173 ? function (globalStore, Label) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var NewickTree = [
                                                                Label,
                                                                startTime
                                                            ];
                                                            return function () {
                                                                return _k172(globalStore, NewickTree);
                                                            };
                                                        }(globalStore, ad.scalar.add(ad.scalar.add('Taxon_', globalStore.n), ':')) : _k172(globalStore, !1);
                                                    };
                                                }, _address258.concat('_655'), rho);
                                            };
                                        }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : function (globalStore, internalBranch) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, speciation) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return ad.scalar.eq(speciation, !0) ? crbdTreeSim(globalStore, function (globalStore, leftTree) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var _k186 = function (globalStore, _dummy185) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return crbdTreeSim(globalStore, function (globalStore, rightTree) {
                                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                                        var _k182 = function (globalStore, _dummy181) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            var _k178 = function (globalStore, _dummy177) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                var _k176 = function (globalStore, _dummy175) {
                                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                    return function () {
                                                                                        return ad.scalar.eq(leftTree, !1) ? function (globalStore, newBranch) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            var NewickTree = [
                                                                                                rightTree[0],
                                                                                                newBranch
                                                                                            ];
                                                                                            return function () {
                                                                                                return _k172(globalStore, NewickTree);
                                                                                            };
                                                                                        }(globalStore, ad.scalar.add(rightTree[1], internalBranch)) : function (globalStore, NewickTree) {
                                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                            return function () {
                                                                                                return _k172(globalStore, NewickTree);
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
                                                                                            return _k172(globalStore, NewickTree);
                                                                                        };
                                                                                    }(globalStore, ad.scalar.add(leftTree[1], internalBranch)) : _k176(globalStore, undefined);
                                                                                };
                                                                            };
                                                                            var _k180 = function (globalStore, _result179) {
                                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                                return function () {
                                                                                    return _result179 ? _k172(globalStore, !1) : _k178(globalStore, undefined);
                                                                                };
                                                                            };
                                                                            return function () {
                                                                                return ad.scalar.eq(leftTree, !1) ? _k180(globalStore, ad.scalar.eq(rightTree, !1)) : _k180(globalStore, ad.scalar.eq(leftTree, !1));
                                                                            };
                                                                        };
                                                                        var _k184 = function (globalStore, _result183) {
                                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                                            return function () {
                                                                                return _result183 ? _k172(globalStore, rightTree) : _k182(globalStore, undefined);
                                                                            };
                                                                        };
                                                                        return function () {
                                                                            return rightTree ? checkError(globalStore, _k184, _address258.concat('_660'), rightTree) : _k184(globalStore, rightTree);
                                                                        };
                                                                    }, _address258.concat('_659'), currentTime, lambda, mu, rho, ad.scalar.sub(max_R, 1));
                                                                };
                                                            };
                                                            var _k188 = function (globalStore, _result187) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return _result187 ? _k172(globalStore, leftTree) : _k186(globalStore, undefined);
                                                                };
                                                            };
                                                            return function () {
                                                                return leftTree ? checkError(globalStore, _k188, _address258.concat('_658'), leftTree) : _k188(globalStore, leftTree);
                                                            };
                                                        }, _address258.concat('_657'), currentTime, lambda, mu, rho, ad.scalar.sub(max_R, 1)) : _k172(globalStore, !1);
                                                    };
                                                }, _address258.concat('_656'), ad.scalar.div(lambda, ad.scalar.add(lambda, mu)));
                                            };
                                        }(globalStore, ad.scalar.sub(startTime, currentTime));
                                    };
                                }, _address258.concat('_654'), { a: ad.scalar.add(lambda, mu) });
                            };
                        };
                        return function () {
                            return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k172(globalStore, [
                                'ERROR_MAX_TAXA:',
                                startTime
                            ]) : _k190(globalStore, undefined);
                        };
                    };
                    return function () {
                        return ad.scalar.eq(lambda, 0) ? _k172(globalStore, [
                            'ERROR_ZERO:',
                            startTime
                        ]) : _k192(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k172(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k194(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k172(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k196(globalStore, undefined);
            };
        };
        var dirname = argv._[1];
        var age = argv._[2];
        var rho = argv._[3];
        var _dummy41 = globalStore.n = 0;
        var checkError = function checkError(globalStore, _k40, _address265, tree) {
            var _currentAddress = _address265;
            _addr.save(_globalCurrentAddress, _address265);
            var stringTree = tree.join('');
            return function () {
                return stringTree.includes('ERROR') ? _k40(globalStore, !0) : _k40(globalStore, !1);
            };
        };
        var getHyperParamsFromDir = function getHyperParamsFromDir(globalStore, _k39, _address266, dirname) {
            var _currentAddress = _address266;
            _addr.save(_globalCurrentAddress, _address266);
            var sample = phyjs.sample(dirname);
            return function () {
                return _k39(globalStore, {
                    startTime: age,
                    lambda0: sample.lambda,
                    mu: sample.mu,
                    logAlpha: 0,
                    sigma: 0,
                    rho: rho,
                    stepsize: 0,
                    max_R: 5000,
                    MAX_LAMBDA: 1000000000000,
                    MAX_NODES: 1000000,
                    MAX_DIV: 1000000000000
                });
            };
        };
        var crbdTreeSimulate = function crbdTreeSimulate(globalStore, _k26, _address267, dirname) {
            var _currentAddress = _address267;
            _addr.save(_globalCurrentAddress, _address267);
            return function () {
                return getHyperParamsFromDir(globalStore, function (globalStore, obj) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var startTime = obj.startTime;
                    var lambda0 = obj.lambda0;
                    var mu = obj.mu;
                    var rho = obj.rho;
                    var max_R = obj.max_R;
                    var MAX_LAMBDA = obj.MAX_LAMBDA;
                    var MAX_NODES = obj.MAX_NODES;
                    return function () {
                        return crbdTreeSim(globalStore, function (globalStore, TreeLeft) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return ad.scalar.eq(TreeLeft, !1) ? function (globalStore, _dummy28) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _dummy27 = globalStore.n = 0;
                                    return function () {
                                        return crbdTreeSimulate(globalStore, _k26, _address267.concat('_698'), dirname);
                                    };
                                }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeLeft) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var _k38 = function (globalStore, _result29) {
                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                        return function () {
                                            return _result29 ? function (globalStore, _dummy31) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                var _dummy30 = globalStore.n = 0;
                                                return function () {
                                                    return crbdTreeSimulate(globalStore, _k26, _address267.concat('_699'), dirname);
                                                };
                                            }(globalStore, console.log('Error: Guards hit')) : crbdTreeSim(globalStore, function (globalStore, TreeRight) {
                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                return function () {
                                                    return ad.scalar.eq(TreeRight, !1) ? function (globalStore, _dummy33) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _dummy32 = globalStore.n = 0;
                                                        return function () {
                                                            return crbdTreeSimulate(globalStore, _k26, _address267.concat('_701'), dirname);
                                                        };
                                                    }(globalStore, console.log('Error: No survivors in this subtree')) : function (globalStore, stringTreeRight) {
                                                        _addr.save(_globalCurrentAddress, _currentAddress);
                                                        var _k37 = function (globalStore, _result34) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            return function () {
                                                                return _result34 ? function (globalStore, _dummy36) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var _dummy35 = globalStore.n = 0;
                                                                    return function () {
                                                                        return crbdTreeSimulate(globalStore, _k26, _address267.concat('_702'), dirname);
                                                                    };
                                                                }(globalStore, console.log('Error: Guards hit')) : function (globalStore, stringTree) {
                                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                                    var Tree = ad.scalar.add(ad.scalar.add(ad.scalar.add('(', stringTree), ')'), ';');
                                                                    return function () {
                                                                        return _k26(globalStore, Tree);
                                                                    };
                                                                }(globalStore, [ad.scalar.add(ad.scalar.add(TreeLeft.join(''), ','), TreeRight.join(''))]);
                                                            };
                                                        };
                                                        return function () {
                                                            return stringTreeRight.includes('ERROR_MAX') ? _k37(globalStore, stringTreeRight.includes('ERROR_MAX')) : _k37(globalStore, stringTreeRight.includes('ERROR_ZERO'));
                                                        };
                                                    }(globalStore, TreeRight.join(''));
                                                };
                                            }, _address267.concat('_700'), startTime, lambda0, mu, rho, max_R, MAX_LAMBDA, MAX_NODES);
                                        };
                                    };
                                    return function () {
                                        return stringTreeLeft.includes('ERROR_MAX') ? _k38(globalStore, stringTreeLeft.includes('ERROR_MAX')) : _k38(globalStore, stringTreeLeft.includes('ERROR_ZERO'));
                                    };
                                }(globalStore, TreeLeft.join(''));
                            };
                        }, _address267.concat('_697'), startTime, lambda0, mu, rho, max_R, MAX_LAMBDA, MAX_NODES);
                    };
                }, _address267.concat('_696'), dirname);
            };
        };
        var crbdTreeSim = function crbdTreeSim(globalStore, _k1, _address268, startTime, lambda, mu, rho, max_R, MAX_LAMBDA, MAX_NODES) {
            var _currentAddress = _address268;
            _addr.save(_globalCurrentAddress, _address268);
            var _k25 = function (globalStore, _dummy24) {
                _addr.save(_globalCurrentAddress, _currentAddress);
                var _k23 = function (globalStore, _dummy22) {
                    _addr.save(_globalCurrentAddress, _currentAddress);
                    var _k21 = function (globalStore, _dummy20) {
                        _addr.save(_globalCurrentAddress, _currentAddress);
                        var _k19 = function (globalStore, _dummy18) {
                            _addr.save(_globalCurrentAddress, _currentAddress);
                            return function () {
                                return exponential(globalStore, function (globalStore, t) {
                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                    var currentTime = ad.scalar.sub(startTime, t);
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
                                        }(globalStore, globalStore.n = ad.scalar.add(globalStore.n, 1)) : function (globalStore, internalBranch) {
                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                            return function () {
                                                return flip(globalStore, function (globalStore, speciation) {
                                                    _addr.save(_globalCurrentAddress, _currentAddress);
                                                    return function () {
                                                        return ad.scalar.eq(speciation, !0) ? crbdTreeSim(globalStore, function (globalStore, leftTree) {
                                                            _addr.save(_globalCurrentAddress, _currentAddress);
                                                            var _k15 = function (globalStore, _dummy14) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return crbdTreeSim(globalStore, function (globalStore, rightTree) {
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
                                                                            return rightTree ? checkError(globalStore, _k13, _address268.concat('_709'), rightTree) : _k13(globalStore, rightTree);
                                                                        };
                                                                    }, _address268.concat('_708'), currentTime, lambda, mu, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES);
                                                                };
                                                            };
                                                            var _k17 = function (globalStore, _result16) {
                                                                _addr.save(_globalCurrentAddress, _currentAddress);
                                                                return function () {
                                                                    return _result16 ? _k1(globalStore, leftTree) : _k15(globalStore, undefined);
                                                                };
                                                            };
                                                            return function () {
                                                                return leftTree ? checkError(globalStore, _k17, _address268.concat('_707'), leftTree) : _k17(globalStore, leftTree);
                                                            };
                                                        }, _address268.concat('_706'), currentTime, lambda, mu, rho, ad.scalar.sub(max_R, 1), MAX_LAMBDA, MAX_NODES) : _k1(globalStore, !1);
                                                    };
                                                }, _address268.concat('_705'), ad.scalar.div(lambda, ad.scalar.add(lambda, mu)));
                                            };
                                        }(globalStore, ad.scalar.sub(startTime, currentTime));
                                    };
                                }, _address268.concat('_703'), { a: ad.scalar.add(lambda, mu) });
                            };
                        };
                        return function () {
                            return ad.scalar.gt(globalStore.n, MAX_NODES) ? _k1(globalStore, [
                                'ERROR_MAX_TAXA:',
                                startTime
                            ]) : _k19(globalStore, undefined);
                        };
                    };
                    return function () {
                        return ad.scalar.eq(lambda, 0) ? _k1(globalStore, [
                            'ERROR_ZERO:',
                            startTime
                        ]) : _k21(globalStore, undefined);
                    };
                };
                return function () {
                    return ad.scalar.gt(lambda, MAX_LAMBDA) ? _k1(globalStore, [
                        'ERROR_MAX_LAMBDA:',
                        startTime
                    ]) : _k23(globalStore, undefined);
                };
            };
            return function () {
                return ad.scalar.eq(max_R, 0) ? _k1(globalStore, [
                    'ERROR_MAX_RECURSION:',
                    startTime
                ]) : _k25(globalStore, undefined);
            };
        };
        return function () {
            return crbdTreeSimulate(globalStore, _k0, _address0.concat('_710'), dirname);
        };
    });
});

webppl.runEvaled(main, __runner__, {}, {}, topK, '');