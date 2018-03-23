/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _minimist = __webpack_require__(1);

	var _minimist2 = _interopRequireDefault(_minimist);

	var _async = __webpack_require__(2);

	var _async2 = _interopRequireDefault(_async);

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _transaction = __webpack_require__(4);

	var _transaction2 = _interopRequireDefault(_transaction);

	var _CentralProcessor = __webpack_require__(7);

	var _CentralProcessor2 = _interopRequireDefault(_CentralProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var argv = (0, _minimist2.default)(process.argv.slice(2)); /*!
	                                                            * Phylogeny Explorer
	                                                            *
	                                                            * @summary Application bootstrap
	                                                            * @author John Ropas
	                                                            * @since 19/09/2016
	                                                            *
	                                                            * Copyright(c) 2016 Phylogeny Explorer
	                                                            */


	var filter = {};

	if (argv.transactionId) {
	  filter = { _id: argv.transactionId, status: { $in: ['FAILED', 'PENDING'] } };
	} else {
	  filter = { type: 'CLADE', status: { $in: ['FAILED', 'PENDING'] } };
	}

	_transaction2.default.find(filter, function (transactionError, transactions) {
	  var cycle = new _mongoose2.default.Types.ObjectId();
	  if (transactionError) {
	    console.error(transactionError);
	    process.exit(0);
	  }
	  console.log('Found ' + transactions.length + ' transactions. Cycle: ' + cycle);
	  _async2.default.forEachOf(transactions, function (v, k, callback) {
	    var tr = v;
	    tr.cycle = cycle;
	    console.log(k + 1 + ' - Processing transaction Id: ' + tr._id + ', Mode: ' + tr.mode);
	    var cp = new _CentralProcessor2.default(tr, k, callback);
	    cp.process();
	  }, function (err) {
	    if (err) {
	      console.error('A transaction failed to process');
	      console.error(err);
	    } else {
	      console.log('All transactions have been processed successfully');
	      process.exit(0);
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("minimist");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("async");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _adminConnection = __webpack_require__(5);

	var _adminConnection2 = _interopRequireDefault(_adminConnection);

	__webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var asset = new _mongoose2.default.Schema({
	  name: { type: String },
	  isDefault: { type: Boolean },
	  folder: { type: String }
	}, { _id: false });

	/**
	 * Transaction schema definition
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 16/11/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var TransactionSchema = new _mongoose2.default.Schema({
	  user: { type: _mongoose2.default.Schema.ObjectId, ref: 'User' },
	  cycle: { type: _mongoose2.default.Schema.ObjectId },
	  identifier: { type: _mongoose2.default.Schema.ObjectId },
	  data: {
	    before: { type: Object, default: {} },
	    after: { type: Object, default: {} }
	  },
	  assets: {
	    before: [asset],
	    after: [asset]
	  },
	  mode: {
	    type: String,
	    enum: ['CREATE', 'UPDATE', 'DESTROY']
	  },
	  type: {
	    type: String,
	    enum: ['CLADE', 'USER', 'ROLE', 'SETTINGS']
	  },
	  status: {
	    type: String,
	    enum: ['PENDING', 'DONE', 'FAILED'],
	    default: 'DONE'
	  },
	  created: { type: Date, default: Date.now },
	  modified: { type: Date }
	}, { minimize: false });

	exports.default = _adminConnection2.default.model('transactions', TransactionSchema);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var connectionString = 'mongodb://35.162.254.17:27017/phylex-admin'; /*!
	                                                                      * Phylogeny Explorer
	                                                                      *
	                                                                      * @summary 
	                                                                      * @author John Ropas
	                                                                      * @since 30/11/2016
	                                                                      * 
	                                                                      * Copyright(c) 2016 Phylogeny Explorer
	                                                                      */

	var options = {
	  user: 'phylexadminuser',
	  pass: 'ed86ec0502b244519ed3c86f8bf39cf4'
	};

	var adminConn = _mongoose2.default.createConnection(connectionString, options);

	exports.default = adminConn;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * User schema definition
	 */
	var UserSchema = new _mongoose2.default.Schema({
	  title: { type: String },
	  firstName: { type: String },
	  lastName: { type: String },
	  username: { type: String, unique: true, required: true },
	  password: { type: String, required: true },
	  address: { type: String, required: true },
	  postcode: { type: String, required: true },
	  phone: { type: String },
	  email: { type: String, unique: true, required: true },
	  dateOfBirth: { type: Date },
	  gender: { type: String, required: true },
	  coverLetter: { type: String },
	  subscribed: { type: Boolean, default: true },
	  isActive: { type: Boolean, default: false },
	  isConfirmed: { type: Boolean, default: false },
	  created: { type: Date, default: Date.now },
	  modified: { type: Date }
	}); /*!
	     * Phylogeny Explorer
	     *
	     * @summary Model representing a user
	     * @author John Ropas
	     * @since 19/09/2016
	     *
	     * Copyright(c) 2016 Phylogeny Explorer
	     */

	exports.default = _mongoose2.default.model('User', UserSchema);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @summary 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 02/12/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _CladeTransactionProcessor = __webpack_require__(8);

	var _CladeTransactionProcessor2 = _interopRequireDefault(_CladeTransactionProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CentralProcessor = function () {
	  function CentralProcessor(transaction, index, callback) {
	    _classCallCheck(this, CentralProcessor);

	    this._transaction = transaction;
	    this._index = index;
	    this._callback = callback;
	    this._ctp = new _CladeTransactionProcessor2.default(this._transaction, this._index, this._callback);
	  }

	  _createClass(CentralProcessor, [{
	    key: 'process',
	    value: function process() {
	      switch (this._transaction.mode) {
	        case 'UPDATE':
	          {
	            this._processUpdateClade();
	            break;
	          }
	        case 'CREATE':
	          {
	            this._processCreateClade();
	            break;
	          }
	        case 'DESTROY':
	          {
	            this._processDestroyClade();
	            break;
	          }
	        default:
	          {
	            console.error('Transaction is missing its mode!');
	            break;
	          }
	      }
	    }
	  }, {
	    key: '_processCreateClade',
	    value: function _processCreateClade() {
	      this._ctp.createClade();
	    }
	  }, {
	    key: '_processUpdateClade',
	    value: function _processUpdateClade() {
	      this._ctp.updateClade();
	    }
	  }, {
	    key: '_processDestroyClade',
	    value: function _processDestroyClade() {
	      this._ctp.destroyClade();
	    }
	  }]);

	  return CentralProcessor;
	}();

	exports.default = CentralProcessor;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 01/12/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _async = __webpack_require__(2);

	var _async2 = _interopRequireDefault(_async);

	var _clade = __webpack_require__(9);

	var _clade2 = _interopRequireDefault(_clade);

	var _AwsS3FileManager = __webpack_require__(11);

	var _AwsS3FileManager2 = _interopRequireDefault(_AwsS3FileManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CladeTransactionProcessor = function () {
	  function CladeTransactionProcessor(transaction, index, cb) {
	    _classCallCheck(this, CladeTransactionProcessor);

	    this._transaction = transaction;
	    this._index = index;
	    this._callback = cb;
	  }

	  _createClass(CladeTransactionProcessor, [{
	    key: 'createClade',
	    value: function createClade() {
	      var _this = this;

	      var nc = new _clade2.default();
	      nc.parent = this._transaction.data.after.parent;
	      nc.name = this._transaction.data.after.name;
	      nc.description = this._transaction.data.after.description;
	      nc.otherNames = this._transaction.data.after.otherNames;
	      nc.extant = this._transaction.data.after.extant;
	      nc.save(function (error, clade) {
	        _this._registerAssets(clade, function (err) {
	          var status = err ? 'FAILED' : 'DONE';
	          _this._updateCurrentTransaction(err, status, clade._id);
	        });
	      });
	    }
	  }, {
	    key: 'updateClade',
	    value: function updateClade() {
	      var _this2 = this;

	      _clade2.default.findById(this._transaction.identifier, function (err, oldClade) {
	        var nc = oldClade;
	        nc.parent = _this2._transaction.data.after.parent;
	        nc.name = _this2._transaction.data.after.name;
	        nc.description = _this2._transaction.data.after.description;
	        nc.otherNames = _this2._transaction.data.after.otherNames;
	        nc.extant = _this2._transaction.data.after.extant;
	        nc.modified = Date.now();
	        nc.save(function (err1, clade) {
	          _this2._registerAssets(clade, function (err2) {
	            var finalError = err || err1 || err2 || null;
	            var status = finalError ? 'FAILED' : 'DONE';
	            _this2._updateCurrentTransaction(finalError, status);
	          });
	        });
	      });
	    }
	  }, {
	    key: 'destroyClade',
	    value: function destroyClade() {
	      var _this3 = this;

	      _clade2.default.findOne(this._transaction.identifier, function (err, clade) {
	        _this3._deleteAssets(clade, function (err1) {
	          console.log(_this3._transaction._id, _this3._transaction.identifier, err1);
	          if (clade) {
	            clade.remove(function (err2, deleted) {
	              var finalError = err || err1 || err2 || null;
	              var status = finalError ? 'FAILED' : 'DONE';
	              _this3._updateCurrentTransaction(finalError, status);
	            });
	          } else {
	            _this3._updateCurrentTransaction(err1, 'FAILED');
	          }
	        });
	      });
	    }
	  }, {
	    key: '_deleteAssets',
	    value: function _deleteAssets(clade, cb) {
	      var assets = this._transaction.assets.before;
	      var fileManager = new _AwsS3FileManager2.default();
	      _async2.default.forEachOf(assets, function (asset, index, callback) {
	        fileManager.destroyCladeImage(clade._id, asset.name, callback);
	      }, function (err) {
	        cb(err);
	      });
	    }
	  }, {
	    key: '_registerAssets',
	    value: function _registerAssets(clade, cb) {
	      var assets = this._transaction.assets.after;
	      var fileManager = new _AwsS3FileManager2.default();
	      _async2.default.forEachOf(assets, function (asset, index, callback) {
	        if (asset.folder === 'temp') {
	          fileManager.moveTempImageToCladeFolder(asset.name, clade._id, callback);
	        } else {
	          callback();
	        }
	      }, function (err) {
	        if (err) {
	          cb(err);
	        } else {
	          var cl = clade;
	          cl.assets = assets;
	          cl.save(function (err1) {
	            return cb(err1);
	          }); // save & return to update the status
	        }
	      });
	    }
	  }, {
	    key: '_updateCurrentTransaction',
	    value: function _updateCurrentTransaction(err, newStatus, identifier) {
	      var _this4 = this;

	      this._transaction.status = newStatus; // status required
	      this._transaction.identifier = identifier || this._transaction.identifier;
	      this._transaction.save(function (err1) {
	        return _this4._callback(err || err1 || null);
	      });
	    }
	  }]);

	  return CladeTransactionProcessor;
	}();

	exports.default = CladeTransactionProcessor;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _publicConnection = __webpack_require__(10);

	var _publicConnection2 = _interopRequireDefault(_publicConnection);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Clade schema definition
	 */

	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Model representing a role
	 * @author John Ropas
	 * @since 29/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var asset = new _mongoose2.default.Schema({
	  name: { type: String },
	  isDefault: { type: Boolean }
	}, { _id: false });

	var CladeSchema = new _mongoose2.default.Schema({
	  parent: { type: _mongoose2.default.Schema.ObjectId, ref: 'Clade' },
	  name: { type: String },
	  description: { type: String },
	  otherNames: { type: String },
	  extant: { type: Boolean },
	  assets: [asset],
	  created: { type: Date, default: Date.now() },
	  modified: { type: Date }
	});

	exports.default = _publicConnection2.default.model('clades', CladeSchema);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(3);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_mongoose2.default.Promise = global.Promise; /*!
	                                              * Phylogeny Explorer
	                                              *
	                                              * @summary Database Connection Configuration
	                                              * @author John Ropas
	                                              * @since 19/09/2016
	                                              *
	                                              * Copyright(c) 2016 Phylogeny Explorer
	                                              */

	var connectionString = 'mongodb://35.162.254.17:27017/phylex-public';

	var options = {
	  user: 'phylexpublicuser',
	  pass: '53010c7ca48711e680f576304dec7eb7'
	};

	var publicConn = _mongoose2.default.createConnection(connectionString, options);

	exports.default = publicConn;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 17/11/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _awsSdk = __webpack_require__(12);

	var _awsSdk2 = _interopRequireDefault(_awsSdk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AwsS3FileManager = function () {
	  function AwsS3FileManager() {
	    _classCallCheck(this, AwsS3FileManager);

	    this._keys = { clades: 'clades/', users: 'users/', temp: 'temp/' };
	    this._bucketName = 'phylex-public';
	    this._bucketRegion = 'us-west-2';
	    this._IdentityPoolId = 'us-west-2:b2f72e6f-7da5-4c9b-b7ff-074bfe8b7b2e';
	    _awsSdk2.default.config.update({
	      region: this._bucketRegion,
	      credentials: new _awsSdk2.default.CognitoIdentityCredentials({
	        IdentityPoolId: this._IdentityPoolId
	      })
	    });

	    this.s3 = new _awsSdk2.default.S3({
	      apiVersion: '2006-03-01',
	      params: { Bucket: this._bucketName },
	      accessKeyId: 'AKIAJSYMTOIUYJCOV4DQ',
	      secretAccessKey: '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'
	    });
	  }

	  _createClass(AwsS3FileManager, [{
	    key: 'uploadTempImage',
	    value: function uploadTempImage(key, blob, cb) {
	      var finalKey = this._keys.temp + key;
	      var params = { Key: finalKey, Body: blob };
	      this.s3.putObject(params, function (err, data) {
	        return cb(err, data);
	      });
	    }
	  }, {
	    key: 'destroyTempImage',
	    value: function destroyTempImage(key, cb) {
	      var finalKey = this._keys.temp + key;
	      var params = { Key: finalKey };
	      this.s3.deleteObject(params, function (err, data) {
	        return cb(err, data);
	      });
	    }
	  }, {
	    key: 'destroyCladeImage',
	    value: function destroyCladeImage(id, key, cb) {
	      var finalKey = '' + this._keys.clades + id + '/' + key;
	      var params = { Key: finalKey };
	      this.s3.deleteObject(params, function (err, data) {
	        return cb(err, data);
	      });
	    }
	  }, {
	    key: 'moveTempImageToCladeFolder',
	    value: function moveTempImageToCladeFolder(key, cladeId, cb) {
	      var _this = this;

	      var sourceKey = this._bucketName + '/' + this._keys.temp + key;
	      var destinationKey = '' + this._keys.clades + cladeId + '/' + key;
	      console.error(sourceKey, destinationKey);
	      var params = { Key: destinationKey, CopySource: sourceKey };
	      this.s3.copyObject(params, function (err, data) {
	        if (err) {
	          cb(err);
	        } else {
	          _this.destroyTempImage(key, function (err1, data1) {
	            cb(err1);
	          });
	        }
	      });
	    }
	  }]);

	  return AwsS3FileManager;
	}();

	exports.default = AwsS3FileManager;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("aws-sdk");

/***/ }
/******/ ]);