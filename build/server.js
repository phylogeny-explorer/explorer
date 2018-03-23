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

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(2);

	var _passport2 = _interopRequireDefault(_passport);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _morgan = __webpack_require__(4);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _cookieParser = __webpack_require__(5);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _bodyParser = __webpack_require__(6);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _index = __webpack_require__(7);

	var _index2 = _interopRequireDefault(_index);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _signup = __webpack_require__(50);

	var _signup2 = _interopRequireDefault(_signup);

	var _login = __webpack_require__(52);

	var _login2 = _interopRequireDefault(_login);

	__webpack_require__(53);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import favicon from 'serve-favicon';
	var app = (0, _express2.default)();

	// view engine setup
	// app.set('views', path.join(__dirname, 'views'));
	// app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Application bootstrap
	 * @author John Ropas
	 * @since 19/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use((0, _cookieParser2.default)());
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
	app.use(_passport2.default.initialize());

	// Add headers
	app.use(function (req, res, next) {
	  // Website you wish to allow to connect
	  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

	  res.setHeader('Access-Control-Allow-Origin', '*');

	  // Request methods you wish to allow
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	  // Request headers you wish to allow
	  res.setHeader('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, X-Request-URL');

	  // Set to true if you need the website to include cookies in the requests sent
	  // to the API (e.g. in case you use sessions)
	  res.setHeader('Access-Control-Allow-Credentials', false);

	  // Pass to next layer of middleware
	  next();
	});

	_passport2.default.use('local-signup', _signup2.default);
	_passport2.default.use('local-login', _login2.default);

	// load all routes
	(0, _index2.default)(app);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {

	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.json({
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	  res.status(err.status || 500);
	  res.json({
	    message: err.message,
	    error: {}
	  });
	});

	// pretty printing responses
	app.set('json spaces', 2);

	// Produce and spin up the server
	var factory = new _modules2.default.Server(app, 5000, 'phylex:server');

	factory.createAndStartServer();

	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _users = __webpack_require__(8);

	var _users2 = _interopRequireDefault(_users);

	var _roles = __webpack_require__(27);

	var _roles2 = _interopRequireDefault(_roles);

	var _rules = __webpack_require__(29);

	var _rules2 = _interopRequireDefault(_rules);

	var _auth = __webpack_require__(32);

	var _auth2 = _interopRequireDefault(_auth);

	var _settings = __webpack_require__(33);

	var _settings2 = _interopRequireDefault(_settings);

	var _transactions = __webpack_require__(36);

	var _transactions2 = _interopRequireDefault(_transactions);

	var _assets = __webpack_require__(40);

	var _assets2 = _interopRequireDefault(_assets);

	var _AuthCheck = __webpack_require__(47);

	var _AuthCheck2 = _interopRequireDefault(_AuthCheck);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Register all routers
	 * @author John Ropas
	 * @since 19/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies
	 */

	exports.default = function (app) {
	  app.use('/', _auth2.default);
	  app.use('/', _AuthCheck2.default, _users2.default);
	  app.use('/', _AuthCheck2.default, _roles2.default);
	  app.use('/', _AuthCheck2.default, _rules2.default);
	  app.use('/', _AuthCheck2.default, _settings2.default);
	  app.use('/', _AuthCheck2.default, _transactions2.default);
	  app.use('/', _AuthCheck2.default, _assets2.default);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _user = __webpack_require__(18);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Router to server routes for user
	 */

	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Define user routes
	 * @author John Ropas
	 * @since 19/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies.
	 */

	var controller = new _user2.default();
	var router = new _modules2.default.Router(controller);

	router.get('/users', controller.getUsers).get('/users/:userId', controller.getUser).post('/users', controller.createUser).put('/users/:userId', controller.updateUser).patch('/users/:userId/assign-role', controller.assignUserRole).patch('/users/:userId/activate', controller.activateUser).patch('/users/:userId/confirm', controller.confirmUser).patch('/users/:userId/disapprove', controller.disapproveUser).patch('/users/:userId/deactivate', controller.deactivateUser).delete('/users/:userId', controller.destroyUser);

	exports.default = router;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _controller = __webpack_require__(10);

	var _controller2 = _interopRequireDefault(_controller);

	var _server = __webpack_require__(12);

	var _server2 = _interopRequireDefault(_server);

	var _router = __webpack_require__(16);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Modules = {
	  Controller: _controller2.default,
	  Server: _server2.default,
	  Router: _router2.default
	}; /*!
	    * Modules
	    *
	    * @summary
	    * @author John Ropas
	    * @since 24/10/2016
	    *
	    * Copyright(c) 2016 Phylogeny Explorer
	    */

	exports.default = Modules;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _controller = __webpack_require__(11);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _controller2.default; /*!
	                                         * Phylogeny Explorer
	                                         *
	                                         * @summary
	                                         * @author John Ropas
	                                         * @since 30/09/2016
	                                         *
	                                         * Copyright(c) 2016 Phylogeny Explorer
	                                         */

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*!
	 * Controller
	 *
	 * @summary Controller class that support class-based middleware
	 * @author John Ropas
	 * @since 29/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var Controller = function () {
	  /**
	   * Constructor
	   * @param middlewareFn [ ] an array of methods to be called
	   * as middleware before every member method
	   * @param ignoreFns [ ] an array of string names of member
	   * methods to ignore when calling the middleware
	   */
	  function Controller(middlewareFn, ignoreFns) {
	    _classCallCheck(this, Controller);

	    this._name = this.constructor.name || 'Controller';
	    this._middleware = middlewareFn || [];
	    this._ignoreFns = ignoreFns || [];
	    if (middlewareFn) {
	      this._wrapMethods();
	    }
	  }

	  /**
	   * [Private] Gracefully handles the response to the client on a RESTfull manner
	   * @param response The response object
	   * @param next The call stack to be followed
	   * @param error The error object
	   * @param data The data object to be returned as a json
	   * @returns {*} The appropriate response depending on the outcome of the queries
	   */


	  _createClass(Controller, [{
	    key: 'handleResponse',
	    value: function handleResponse(response, next, error, data) {
	      if (error) {
	        var err = error;
	        err.source = this._name;
	        return next(err);
	      }
	      return response.json(data);
	    }
	  }, {
	    key: '_wrapMethods',
	    value: function _wrapMethods() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.getOwnPropertyNames(Object.getPrototypeOf(this))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var name = _step.value;

	          var method = this[name];
	          if (method instanceof Function && name !== 'constructor' && this._ignoreFns.indexOf(name) === -1) {
	            this[name] = this._wrap(method, name);
	            this[name] = Controller.renameFunction(name, this[name]);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_wrap',
	    value: function _wrap(methodToWrap, methodName) {
	      var _this = this;

	      return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        _this._invokeMiddleware(args, methodName);
	        methodToWrap.apply(_this, args);
	      };
	    }
	  }, {
	    key: '_invokeMiddleware',
	    value: function _invokeMiddleware(args, methodName) {
	      this._middleware().apply(undefined, _toConsumableArray(args).concat([methodName]));
	    }
	  }, {
	    key: 'middleware',
	    get: function get() {
	      return this._middleware;
	    },
	    set: function set(middleware) {
	      this._middleware = middleware;
	    }
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    },
	    set: function set(name) {
	      this._name = name;
	    }
	  }], [{
	    key: 'renameFunction',
	    value: function renameFunction(name, fn) {
	      var Fn = Function;
	      return new Fn('action', 'return function ' + name + '(...args){ action(...args) };')(fn);
	    }
	  }]);

	  return Controller;
	}();

	exports.default = Controller;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WebServerFactory = __webpack_require__(13);

	var _WebServerFactory2 = _interopRequireDefault(_WebServerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _WebServerFactory2.default; /*!
	                                               * Phylogeny Explorer
	                                               *
	                                               * @summary
	                                               * @author John Ropas
	                                               * @since 30/09/2016
	                                               *
	                                               * Copyright(c) 2016 Phylogeny Explorer
	                                               */

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * clade
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @since 27/09/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _http = __webpack_require__(14);

	var _http2 = _interopRequireDefault(_http);

	var _debug = __webpack_require__(15);

	var _debug2 = _interopRequireDefault(_debug);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WebServerFactory = function () {
	  function WebServerFactory(app, preferredPort, name) {
	    _classCallCheck(this, WebServerFactory);

	    this._defaultPort = 3000;
	    this._preferredPort = process.env.PORT || preferredPort;
	    this._app = app;
	    this._server = {};
	    this._name = name;
	    this._debug = (0, _debug2.default)(name);
	  }

	  _createClass(WebServerFactory, [{
	    key: 'createAndStartServer',
	    value: function createAndStartServer() {
	      this.port = this.normalizePort();
	      this.app.set('port', this.port);

	      // Create HTTP server.
	      this.server = _http2.default.createServer(this.app, function (req, res, next) {
	        res.setHeader('Content-Type', 'application/json');
	        next();
	      });

	      // Listen on provided port, on all network interfaces.
	      this.server.listen(this.port);
	      this.server.on('error', this.onError.bind(this));
	      this.server.on('listening', this.onListening.bind(this));
	    }

	    /**
	     * Normalize a port into a number, string, or false.
	     * @returns {*} normalized port
	     */

	  }, {
	    key: 'normalizePort',
	    value: function normalizePort() {
	      var result = parseInt(this.preferredPort, 10);

	      if (isNaN(result)) {
	        // named pipe
	        return this.preferredPort;
	      }

	      if (result >= 0) {
	        // port number
	        return result;
	      }

	      return this.defaultPort;
	    }

	    /**
	     * Event listener for HTTP server "error" event.
	     * @param error
	     */

	  }, {
	    key: 'onError',
	    value: function onError(error) {
	      if (error.syscall !== 'listen') {
	        throw error;
	      }

	      var bind = typeof this.port === 'string' ? 'Pipe  ' + this.port : 'Port ' + this.port;

	      // handle specific listen errors with friendly messages
	      switch (error.code) {
	        case 'EACCES':
	          console.error(bind + ' requires elevated privileges');
	          process.exit(1);
	          break;
	        case 'EADDRINUSE':
	          console.error(bind + ' is already in use');
	          process.exit(1);
	          break;
	        default:
	          throw error;
	      }
	    }

	    /**
	     * Event listener for HTTP server "listening" event.
	     */

	  }, {
	    key: 'onListening',
	    value: function onListening() {
	      var address = this.server.address();
	      var bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;

	      this.debug('Listening on ' + bind);
	    }
	  }, {
	    key: 'defaultPort',
	    get: function get() {
	      return process.env.PORT || this._defaultPort;
	    }

	    /**
	     * Setter for debug instance
	     * @param debugInstance
	     */

	  }, {
	    key: 'debug',
	    set: function set(debugInstance) {
	      this._debug = debugInstance;
	    }

	    /**
	     * Getter for debug instance
	     * @returns {*}
	     */
	    ,
	    get: function get() {
	      return this._debug;
	    }

	    /**
	     * Setter for server name
	     * @param name
	     */

	  }, {
	    key: 'name',
	    set: function set(name) {
	      this._name = name;
	    }

	    /**
	     * Getter for server name
	     * @returns {*}
	     */
	    ,
	    get: function get() {
	      return this._name;
	    }

	    /**
	     * Setter for app instance
	     * @param app
	     */

	  }, {
	    key: 'app',
	    set: function set(app) {
	      this._app = app;
	    }

	    /**
	     * Getter for app instance
	     * @returns {*}
	     */
	    ,
	    get: function get() {
	      return this._app;
	    }

	    /**
	     * Setter for server instance
	     * @param server
	     */

	  }, {
	    key: 'server',
	    set: function set(server) {
	      this._server = server;
	    }

	    /**
	     * Getter for server instance
	     * @returns {*}
	     */
	    ,
	    get: function get() {
	      return this._server;
	    }

	    /**
	     * Setter for user preferred port
	     * @param preferredPort
	     */

	  }, {
	    key: 'preferredPort',
	    set: function set(preferredPort) {
	      this._preferredPort = preferredPort;
	    }

	    /**
	     * Getter for preferred port
	     * @returns {*} the preferred port value
	     */
	    ,
	    get: function get() {
	      return this._preferredPort;
	    }

	    /**
	     * Setter for port value
	     * @param port
	     */

	  }, {
	    key: 'port',
	    set: function set(port) {
	      this._port = port;
	    }

	    /**
	     * Getter for actual used port
	     * @returns {*} the port value
	     */
	    ,
	    get: function get() {
	      return this._port;
	    }
	  }]);

	  return WebServerFactory;
	}();

	exports.default = WebServerFactory;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _router = __webpack_require__(17);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _router2.default; /*!
	                                     * Phylogeny Explorer
	                                     *
	                                     * @summary
	                                     * @author John Ropas
	                                     * @since 30/09/2016
	                                     *
	                                     * Copyright(c) 2016 Phylogeny Explorer
	                                     */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Router
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 30/09/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Router = function (_express$Router) {
	  _inherits(Router, _express$Router);

	  function Router(controller) {
	    _classCallCheck(this, Router);

	    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

	    _this._controller = controller.name;
	    return _this;
	  }

	  _createClass(Router, [{
	    key: 'controller',
	    get: function get() {
	      return this._controller;
	    },
	    set: function set(controller) {
	      this._controller = controller;
	    }
	  }]);

	  return Router;
	}(_express2.default.Router);

	exports.default = Router;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _passwordHash = __webpack_require__(19);

	var _passwordHash2 = _interopRequireDefault(_passwordHash);

	var _user = __webpack_require__(20);

	var _user2 = _interopRequireDefault(_user);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _AccessControl = __webpack_require__(24);

	var _AccessControl2 = _interopRequireDefault(_AccessControl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary User controller class
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 19/09/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var UserController = function (_Modules$Controller) {
	  _inherits(UserController, _Modules$Controller);

	  function UserController() {
	    _classCallCheck(this, UserController);

	    return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).call(this, _AccessControl2.default));
	  }

	  _createClass(UserController, [{
	    key: 'getUsers',
	    value: function getUsers(req, res, next) {
	      var _this2 = this;

	      _user2.default.find({}, function (err, users) {
	        return _this2.handleResponse(res, next, err, users);
	      }).populate('role', 'description');
	    }
	  }, {
	    key: 'getUser',
	    value: function getUser(req, res, next) {
	      var _this3 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        return _this3.handleResponse(res, next, err, user);
	      }).populate('role', 'description');
	    }
	  }, {
	    key: 'createUser',
	    value: function createUser(req, res, next) {
	      var _this4 = this;

	      var user = new _user2.default();
	      user.role = req.body.roleId;
	      user.title = req.body.title;
	      user.firstName = req.body.firstName;
	      user.lastName = req.body.lastName;
	      user.username = req.body.username;
	      user.password = req.body.password;
	      user.address = req.body.address;
	      user.postcode = req.body.postcode;
	      user.phone = req.body.phone;
	      user.email = req.body.email;
	      user.dateOfBirth = req.body.dateOfBirth;
	      user.gender = req.body.gender;
	      user.coverLetter = req.body.coverLetter;
	      user.subscribed = req.body.subscribed;
	      user.isActive = false;
	      user.isConfirmed = false;
	      user.created = Date.now();
	      user.modified = null;
	      user.save(function (err, newUser) {
	        return _this4.handleResponse(res, next, err, newUser);
	      });
	    }
	  }, {
	    key: 'updateUser',
	    value: function updateUser(req, res, next) {
	      var _this5 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        if (err) {
	          return next(err);
	        }
	        var updatedUser = user;
	        updatedUser.role = req.body.roleId;
	        updatedUser.title = req.body.title;
	        updatedUser.firstName = req.body.firstName;
	        updatedUser.lastName = req.body.lastName;
	        updatedUser.username = req.body.username;
	        updatedUser.address = req.body.address;
	        updatedUser.postcode = req.body.postcode;
	        updatedUser.phone = req.body.phone;
	        updatedUser.email = req.body.email;
	        updatedUser.dateOfBirth = req.body.dateOfBirth;
	        updatedUser.gender = req.body.gender;
	        updatedUser.subscribed = req.body.subscribed;
	        updatedUser.coverLetter = req.body.coverLetter;
	        updatedUser.modified = Date.now();
	        updatedUser.save(function (err2) {
	          return _this5.handleResponse(res, next, err2, updatedUser);
	        });
	        return undefined;
	      });
	    }
	  }, {
	    key: 'destroyUser',
	    value: function destroyUser(req, res, next) {
	      var _this6 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }).remove(function (err, deleted) {
	        return _this6.handleResponse(res, next, err, { deleted: deleted, userId: userId });
	      });
	    }
	  }, {
	    key: 'activateUser',
	    value: function activateUser(req, res, next) {
	      var _this7 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        if (err) {
	          return next(err);
	        }
	        var updatedUser = user;
	        updatedUser.isActive = true;
	        updatedUser.save(function (err2) {
	          return _this7.handleResponse(res, next, err2, user);
	        });
	        return undefined;
	      });
	    }
	  }, {
	    key: 'deactivateUser',
	    value: function deactivateUser(req, res, next) {
	      var _this8 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        if (err) {
	          return next(err);
	        }
	        var updatedUser = user;
	        updatedUser.isActive = false;
	        updatedUser.save(function (err2) {
	          return _this8.handleResponse(res, next, err2, user);
	        });
	        return undefined;
	      });
	    }
	  }, {
	    key: 'confirmUser',
	    value: function confirmUser(req, res, next) {
	      var _this9 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        if (err) {
	          return next(err);
	        }
	        var updatedUser = user;
	        updatedUser.isConfirmed = true;
	        updatedUser.save(function (err2) {
	          return _this9.handleResponse(res, next, err2, user);
	        });
	        return undefined;
	      });
	    }
	  }, {
	    key: 'disapproveUser',
	    value: function disapproveUser(req, res, next) {
	      var _this10 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        if (err) {
	          return next(err);
	        }
	        var updatedUser = user;
	        updatedUser.isConfirmed = false;
	        updatedUser.save(function (err2) {
	          return _this10.handleResponse(res, next, err2, user);
	        });
	        return undefined;
	      });
	    }
	  }, {
	    key: 'assignUserRole',
	    value: function assignUserRole(req, res, next) {
	      var _this11 = this;

	      var userId = req.params.userId;
	      _user2.default.findOne({ _id: userId }, function (err, user) {
	        if (err) {
	          return next(err);
	        }
	        var updatedUser = user;
	        updatedUser.role = req.body.roleId;
	        updatedUser.save(function (err2) {
	          return _this11.handleResponse(res, next, err2, user);
	        });
	        return undefined;
	      });
	    }
	  }]);

	  return UserController;
	}(_modules2.default.Controller);

	exports.default = UserController;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("password-hash");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(21);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _bcrypt = __webpack_require__(22);

	var _bcrypt2 = _interopRequireDefault(_bcrypt);

	__webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * User schema definition
	 */
	var UserSchema = new _mongoose2.default.Schema({
	  role: { type: _mongoose2.default.Schema.ObjectId, ref: 'Role' },
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
	});

	/**
	 * Compare the passed password with the value in the database. A model method.
	 *
	 * @param {string} password
	 * @returns {object} callback
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Model representing a user
	 * @author John Ropas
	 * @since 19/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	UserSchema.methods.comparePassword = function comparePassword(password, callback) {
	  _bcrypt2.default.compare(password, this.password, callback);
	};

	/**
	 * The pre-save hook method.
	 */
	UserSchema.pre('save', function saveHook(next) {
	  var user = this;

	  // proceed further only if the password is modified or the user is new
	  if (!user.isModified('password')) return next();

	  return _bcrypt2.default.genSalt(function (saltError, salt) {
	    if (saltError) {
	      return next(saltError);
	    }

	    return _bcrypt2.default.hash(user.password, salt, function (hashError, hash) {
	      if (hashError) {
	        return next(hashError);
	      }

	      // replace a password string with hash value
	      user.password = hash;

	      return next();
	    });
	  });
	});

	exports.default = _mongoose2.default.model('User', UserSchema);

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoleSchema = undefined;

	var _mongoose = __webpack_require__(21);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Role schema definition
	 */

	var permissionRules = new _mongoose2.default.Schema({
	  path: { type: String },
	  controller: { type: String },
	  action: { type: String },
	  method: { type: String },
	  allow: { type: Boolean }
	}, { _id: false }); /*!
	                     * Phylogeny Explorer
	                     *
	                     * @summary Model representing a role
	                     * @author John Ropas
	                     * @since 29/09/2016
	                     *
	                     * Copyright(c) 2016 Phylogeny Explorer
	                     */

	var RoleSchema = exports.RoleSchema = new _mongoose2.default.Schema({
	  description: { type: String, unique: true },
	  isDefault: { type: Boolean, default: false },
	  isActive: { type: Boolean, default: false },
	  rules: [permissionRules],
	  created: { type: Date, default: Date.now },
	  modified: { type: Date }
	});

	exports.default = _mongoose2.default.model('Role', RoleSchema);

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AccessControl;
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Action level universal access control
	 * @author John Ropas
	 * @since 29/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	function AccessControl() {
	  return function (req, res, next, eventName) {
	    //TODO handle access control
	    // console.error({
	    //   path: req.route.path,
	    //   method: req.method,
	    //   controller: this.name,
	    //   action: eventName,
	    // });
	  };
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _validator = __webpack_require__(26);

	var _validator2 = _interopRequireDefault(_validator);

	var _passport = __webpack_require__(2);

	var _passport2 = _interopRequireDefault(_passport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 06/10/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var AuthenticationController = {
	  /**
	   * Validate the sign up form
	   *
	   * @param {object} payload - the HTTP body message
	   * @returns {object} The result of validation. Object contains a boolean validation result,
	   *                   errors tips, and a global message for the whole form.
	   */
	  validateSignupForm: function validateSignupForm(payload) {
	    var errors = {};
	    var isFormValid = true;
	    var message = '';

	    if (!payload || typeof payload.email !== 'string' || !_validator2.default.isEmail(payload.email)) {
	      isFormValid = false;
	      errors.email = 'Please provide a correct email address.';
	    }

	    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
	      isFormValid = false;
	      errors.password = 'Password must have at least 8 characters.';
	    }

	    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
	      isFormValid = false;
	      errors.name = 'Please provide your username.';
	    }

	    if (!isFormValid) {
	      message = 'Check the form for errors.';
	    }
	    return {
	      success: isFormValid,
	      message: message,
	      errors: errors
	    };
	  },

	  /**
	   * Validate the login form
	   *
	   * @param {object} payload - the HTTP body message
	   * @returns {object} The result of validation. Object contains a boolean validation result,
	   *                   errors tips, and a global message for the whole form.
	   */
	  validateLoginForm: function validateLoginForm(payload) {
	    var errors = {};
	    var isFormValid = true;
	    var message = '';

	    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
	      isFormValid = false;
	      errors.username = 'Please provide your username.';
	    }

	    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
	      isFormValid = false;
	      errors.password = 'Please provide your password.';
	    }

	    if (!isFormValid) {
	      message = 'Check the form for errors.';
	    }

	    return {
	      success: isFormValid,
	      message: message,
	      errors: errors
	    };
	  },

	  signup: function signup(req, res, next) {
	    var validationResult = AuthenticationController.validateSignupForm(req.body);
	    if (!validationResult.success) {
	      return res.status(400).json({
	        success: false,
	        message: validationResult.message,
	        errors: validationResult.errors
	      });
	    }
	    return _passport2.default.authenticate('local-signup', function (err) {
	      if (err) {
	        if (err.name === 'MongoError' && err.code === 11000) {
	          // the 11000 Mongo code is for a duplication email error
	          // the 409 HTTP status code is for conflict error
	          return res.status(409).json({
	            success: false,
	            message: 'Check the form for errors.',
	            errors: {
	              email: 'This email is already taken.'
	            }
	          });
	        }

	        return res.status(400).json({
	          success: false,
	          message: 'Could not process the form.'
	        });
	      }

	      return res.status(200).json({
	        success: true,
	        message: 'You have successfully signed up! Now you should be able to log in.'
	      });
	    })(req, res, next);
	  },

	  login: function login(req, res, next) {
	    var validationResult = AuthenticationController.validateLoginForm(req.body);
	    if (!validationResult.success) {
	      return res.status(400).json({
	        success: false,
	        message: validationResult.message,
	        errors: validationResult.errors
	      });
	    }

	    return _passport2.default.authenticate('local-login', function (err, token, userData) {
	      if (err) {
	        if (err.name === 'IncorrectCredentialsError') {
	          return res.status(400).json({
	            success: false,
	            message: err.message
	          });
	        }

	        return res.status(400).json({
	          success: false,
	          message: 'Could not process the form.'
	        });
	      }

	      return res.json({
	        success: true,
	        message: 'You have successfully logged in!',
	        token: token,
	        user: userData
	      });
	    })(req, res, next);
	  },

	  logout: function logout(req, res, next) {}
	};

	exports.default = AuthenticationController;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _role = __webpack_require__(28);

	var _role2 = _interopRequireDefault(_role);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Router to server routes for user
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Define role routes
	 * @author John Ropas
	 * @since 30/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies.
	 */

	var controller = new _role2.default();
	var router = new _modules2.default.Router(controller);

	router.get('/roles', controller.getRoles).get('/roles/active', controller.getActiveRoles).get('/roles/:roleId', controller.getRole).post('/roles', controller.createRole).put('/roles/:roleId', controller.updateRole).patch('/roles/:roleId', controller.setDefaultRole).delete('/roles/:roleId', controller.destroyRole);

	exports.default = router;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _role = __webpack_require__(23);

	var _role2 = _interopRequireDefault(_role);

	var _AccessControl = __webpack_require__(24);

	var _AccessControl2 = _interopRequireDefault(_AccessControl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 30/09/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var RoleController = function (_Modules$Controller) {
	  _inherits(RoleController, _Modules$Controller);

	  function RoleController() {
	    _classCallCheck(this, RoleController);

	    return _possibleConstructorReturn(this, (RoleController.__proto__ || Object.getPrototypeOf(RoleController)).call(this, _AccessControl2.default));
	  }

	  _createClass(RoleController, [{
	    key: 'getActiveRoles',
	    value: function getActiveRoles(req, res, next) {
	      var _this2 = this;

	      _role2.default.find({ isActive: true }, 'description isDefault', function (err, roles) {
	        return _this2.handleResponse(res, next, err, roles);
	      });
	    }
	  }, {
	    key: 'getRoles',
	    value: function getRoles(req, res, next) {
	      var _this3 = this;

	      _role2.default.find({}, function (err, roles) {
	        return _this3.handleResponse(res, next, err, roles);
	      });
	    }
	  }, {
	    key: 'getRole',
	    value: function getRole(req, res, next) {
	      var _this4 = this;

	      var roleId = req.params.roleId;
	      _role2.default.findOne({ _id: roleId }, function (err, role) {
	        return _this4.handleResponse(res, next, err, role);
	      });
	    }
	  }, {
	    key: 'createRole',
	    value: function createRole(req, res, next) {
	      var _this5 = this;

	      var role = new _role2.default();
	      role.description = req.body.description;
	      role.isActive = req.body.isActive;
	      role.created = Date.now();
	      role.modified = null;
	      role.rules = req.body.rules;
	      role.save(function (err, newRole) {
	        return _this5.handleResponse(res, next, err, newRole);
	      });
	    }
	  }, {
	    key: 'updateRole',
	    value: function updateRole(req, res, next) {
	      var _this6 = this;

	      var roleId = req.params.roleId;
	      _role2.default.findOne({ _id: roleId }, function (err, role) {
	        if (err) {
	          return next(err);
	        }
	        var updatedRole = role;
	        updatedRole.description = req.body.description;
	        updatedRole.isActive = req.body.isActive;
	        updatedRole.modified = Date.now();
	        updatedRole.rules = req.body.rules;
	        updatedRole.save(function (err2) {
	          return _this6.handleResponse(res, next, err2, updatedRole);
	        });
	        return undefined;
	      });
	    }
	  }, {
	    key: 'destroyRole',
	    value: function destroyRole(req, res, next) {
	      var _this7 = this;

	      var roleId = req.params.roleId;
	      _role2.default.findOne({ _id: roleId }).remove(function (err, deleted) {
	        return _this7.handleResponse(res, next, err, { deleted: deleted, roleId: roleId });
	      });
	    }
	  }, {
	    key: 'setDefaultRole',
	    value: function setDefaultRole(req, res, next) {
	      var _this8 = this;

	      var roleId = req.params.roleId;
	      _role2.default.findOne({ _id: roleId }, function (err, foundRole) {
	        if (err) {
	          return next(err);
	        }
	        _role2.default.find({}, function (err2, roles) {
	          roles.forEach(function (role) {
	            var updatedRole = role;
	            updatedRole.isDefault = foundRole._id.equals(role._id);
	            updatedRole.save();
	          });
	          _this8.handleResponse(res, next, err2, roleId);
	        });
	        return undefined;
	      });
	    }
	  }]);

	  return RoleController;
	}(_modules2.default.Controller);

	exports.default = RoleController;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _rule = __webpack_require__(30);

	var _rule2 = _interopRequireDefault(_rule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Router to server routes for user
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Define role routes
	 * @author John Ropas
	 * @since 30/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies.
	 */

	var controller = new _rule2.default();
	var router = new _modules2.default.Router(controller);

	router.get('/rules', controller.getRules).get('/rules/generate', controller.generate);

	exports.default = router;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _AccessControl = __webpack_require__(24);

	var _AccessControl2 = _interopRequireDefault(_AccessControl);

	var _rule = __webpack_require__(31);

	var _rule2 = _interopRequireDefault(_rule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 05/10/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var RuleController = function (_Modules$Controller) {
	  _inherits(RuleController, _Modules$Controller);

	  function RuleController() {
	    _classCallCheck(this, RuleController);

	    return _possibleConstructorReturn(this, (RuleController.__proto__ || Object.getPrototypeOf(RuleController)).call(this, _AccessControl2.default));
	  }

	  _createClass(RuleController, [{
	    key: 'generate',
	    value: function generate(req, res, next) {
	      // Rule.remove({}, (err, deleted) => {
	      //   let route = [];
	      //   const routes = [];
	      //
	      //   req.app._router.stack.forEach((middleware) => {
	      //     if (middleware.route) { // routes registered directly on the app
	      //       routes.push(middleware.route);
	      //     } else if (middleware.name === 'router') { // router middleware
	      //       middleware.handle.stack.forEach((handler) => {
	      //         route = handler.route;
	      //         route.controller = middleware.handle._controller;
	      //         routes.push(route);
	      //       });
	      //     }
	      //   });
	      //
	      //   for (const r of routes) {
	      //     const newRule = new Rule();
	      //     newRule.path = r.path;
	      //     newRule.method = r.stack[0].method.toUpperCase();
	      //     newRule.controller = r.controller;
	      //     newRule.action = r.stack[0].name;
	      //     newRule.created = Date.now();
	      //     newRule.modified = null;
	      //     newRule.save();
	      //   }
	      //
	      //   this.handleResponse(res, next, null, 'done');
	      // });

	      this.handleResponse(res, next, null, 'nothing happened');
	    }
	  }, {
	    key: 'getRules',
	    value: function getRules(req, res, next) {
	      var _this2 = this;

	      _rule2.default.find({}, 'path method controller action -_id', function (err, rules) {
	        _this2.handleResponse(res, next, err, rules);
	      });
	    }
	  }]);

	  return RuleController;
	}(_modules2.default.Controller);

	exports.default = RuleController;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(21);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Rule schema definition
	 */
	var RuleSchema = new _mongoose2.default.Schema({
	  path: { type: String },
	  method: { type: String },
	  controller: { type: String },
	  action: { type: String },
	  created: { type: Date, default: Date.now },
	  modified: { type: Date }
	}); /*!
	     * Phylogeny Explorer
	     *
	     * @summary 
	     * @author John Ropas
	     * @since 23/10/2016
	     * 
	     * Copyright(c) 2016 Phylogeny Explorer
	     */

	exports.default = _mongoose2.default.model('Rule', RuleSchema);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _authentication = __webpack_require__(25);

	var _authentication2 = _interopRequireDefault(_authentication);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Router to serve routes for security
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Define security routes
	 * @author John Ropas
	 * @since 06/10/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies.
	 */

	var controller = _authentication2.default;
	var router = new _modules2.default.Router(controller);
	router.post('/auth/login', controller.login).post('/auth/signup', controller.signup).post('/auth/logout', controller.logout);

	exports.default = router;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _setting = __webpack_require__(34);

	var _setting2 = _interopRequireDefault(_setting);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Router to serve routes for security
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 06/10/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies.
	 */

	var controller = new _setting2.default();
	var router = new _modules2.default.Router(controller);

	router.get('/settings', controller.getSettings).patch('/settings', controller.saveSettings);

	exports.default = router;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _setting = __webpack_require__(35);

	var _setting2 = _interopRequireDefault(_setting);

	var _AccessControl = __webpack_require__(24);

	var _AccessControl2 = _interopRequireDefault(_AccessControl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 06/10/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var SettingController = function (_Modules$Controller) {
	  _inherits(SettingController, _Modules$Controller);

	  function SettingController() {
	    _classCallCheck(this, SettingController);

	    return _possibleConstructorReturn(this, (SettingController.__proto__ || Object.getPrototypeOf(SettingController)).call(this, _AccessControl2.default));
	  }

	  _createClass(SettingController, [{
	    key: 'saveSettings',
	    value: function saveSettings(req, res, next) {
	      var _this2 = this;

	      _setting2.default.find({}, function (err, settings) {
	        if (err) {
	          next(err);
	        }

	        var setting = {};

	        if (settings.length > 0) {
	          setting = settings[0];
	        } else {
	          setting = new _setting2.default();
	        }

	        setting.allowUserRegistration = req.body.allowUserRegistration;
	        setting.allowUserConfirmation = req.body.allowUserConfirmation;
	        setting.allowUserInvitation = req.body.allowUserInvitation;
	        setting.logoutUserAfterMinutesOfInactivity = req.body.logoutUserAfterMinutesOfInactivity;
	        setting.deactivateUserAfterDaysOfInactivity = req.body.deactivateUserAfterDaysOfInactivity;
	        setting.save(function (err2) {
	          return _this2.handleResponse(res, next, err2, setting);
	        });
	      });
	    }
	  }, {
	    key: 'getSettings',
	    value: function getSettings(req, res, next) {
	      var _this3 = this;

	      _setting2.default.find({}, function (err, settings) {
	        if (err) {
	          next(err);
	        }

	        var setting = {};

	        if (settings.length > 0) {
	          setting = settings[0];
	        } else {
	          setting = new _setting2.default();
	          setting.save();
	        }
	        _this3.handleResponse(res, next, err, setting);
	      });
	    }
	  }]);

	  return SettingController;
	}(_modules2.default.Controller);

	exports.default = SettingController;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(21);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Setting schema definition
	 */
	var SettingSchema = new _mongoose2.default.Schema({
	  allowUserRegistration: { type: Boolean, default: false },
	  allowUserConfirmation: { type: Boolean, default: false },
	  allowUserInvitation: { type: Boolean, default: false },
	  logoutUserAfterMinutesOfInactivity: { type: Number, default: 600 },
	  deactivateUserAfterDaysOfInactivity: { type: Number, default: 30 }
	}); /*!
	     * Phylogeny Explorer
	     *
	     * @summary Setting schema definition
	     * @author John Ropas
	     * @since 05/10/2016
	     *
	     * Copyright(c) 2016 Phylogeny Explorer
	     */

	exports.default = _mongoose2.default.model('Setting', SettingSchema);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _transaction = __webpack_require__(37);

	var _transaction2 = _interopRequireDefault(_transaction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Router to server routes for user
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

	/**
	 * Module dependencies.
	 */

	var controller = new _transaction2.default();
	var router = new _modules2.default.Router(controller);

	router.get('/transactions', controller.getCladeTransactions).get('/transactions/:transactionId', controller.getCladeTransaction).post('/transactions', controller.createCladeTransaction)
	// .put('/transactions/:transactionId', controller.updateCladeTransaction)
	.delete('/transactions/:transactionId', controller.destroyCladeTransaction);

	exports.default = router;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _child_process = __webpack_require__(38);

	var _child_process2 = _interopRequireDefault(_child_process);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _transaction = __webpack_require__(39);

	var _transaction2 = _interopRequireDefault(_transaction);

	var _AccessControl = __webpack_require__(24);

	var _AccessControl2 = _interopRequireDefault(_AccessControl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 16/11/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var TransactionController = function (_Modules$Controller) {
	  _inherits(TransactionController, _Modules$Controller);

	  _createClass(TransactionController, null, [{
	    key: 'invokeCladeTransactionProcessing',
	    value: function invokeCladeTransactionProcessing(id, cb) {
	      var exec = _child_process2.default.exec;
	      var cmd = 'npm --prefix /Projects/phylex/admin-api-daemon/ run execute -- --transactionId ' + id;

	      exec(cmd, function (error, stdout, stderr) {
	        console.error(stdout);
	        if (stderr) {
	          console.error(stderr);
	        }
	        cb();
	      });
	    }
	  }]);

	  function TransactionController() {
	    _classCallCheck(this, TransactionController);

	    return _possibleConstructorReturn(this, (TransactionController.__proto__ || Object.getPrototypeOf(TransactionController)).call(this, _AccessControl2.default));
	  }

	  _createClass(TransactionController, [{
	    key: 'getCladeTransactions',
	    value: function getCladeTransactions(req, res, next) {
	      var _this2 = this;

	      if (req.user.role.description === 'admin') {
	        _transaction2.default.find({ type: 'CLADE' }, function (err, trs) {
	          return _this2.handleResponse(res, next, err, trs);
	        }).populate('user');
	      } else {
	        _transaction2.default.find({ type: 'CLADE', user: req.user._id }, function (err, trs) {
	          return _this2.handleResponse(res, next, err, trs);
	        }).populate('user');
	      }
	    }
	  }, {
	    key: 'getCladeTransaction',
	    value: function getCladeTransaction(req, res, next) {
	      var _this3 = this;

	      var transactionId = req.params.transactionId;
	      _transaction2.default.findOne({ _id: transactionId, type: 'CLADE' }, function (err, role) {
	        return _this3.handleResponse(res, next, err, role);
	      }).populate('user', 'username');
	    }
	  }, {
	    key: 'createCladeTransaction',
	    value: function createCladeTransaction(req, res, next) {
	      var _this4 = this;

	      var userId = req.user._id;
	      var transaction = new _transaction2.default();
	      var hasChildren = req.body.hasChildren;

	      transaction.identifier = req.body.identifier;
	      transaction.data = {
	        before: req.body.data.before || {},
	        after: req.body.data.after || {}
	      };
	      transaction.assets = {
	        before: req.body.assets.before || [],
	        after: req.body.assets.after || []
	      };
	      transaction.mode = req.body.mode.toUpperCase();
	      transaction.user = userId;
	      transaction.type = 'CLADE';
	      if (transaction.mode === 'DESTROY' && hasChildren) {
	        transaction.status = 'REVIEW';
	      } else {
	        transaction.status = 'PENDING';
	      }
	      transaction.created = Date.now();
	      transaction.modified = null;
	      transaction.save(function (err, tr) {
	        if (transaction.data.after.name === null && transaction.mode === 'CREATE') {
	          TransactionController.invokeCladeTransactionProcessing(transaction._id, function () {
	            _this4.handleResponse(res, next, err, tr);
	          });
	        } else {
	          _this4.handleResponse(res, next, err, tr);
	        }
	      });
	    }

	    // updateCladeTransaction(req, res, next) {
	    //   const transactionId = req.params.transactionId;
	    //   const before = req.body.before || {};
	    //   const after = req.body.after || {};
	    //   const deletion = req.body.deletion;
	    //   // TODO change this according to session
	    //   const userId = '582001e2076a0f0be4f01e63';
	    //   Transaction.findOne({ _id: transactionId, type: 'CLADE', status: 'PENDING' }, (err, tr) => {
	    //     if (err) {
	    //       return next(err);
	    //     }
	    //     const updatedTr = tr;
	    //     updatedTr.before = before;
	    //     updatedTr.after = after;
	    //     updatedTr.deletion = deletion;
	    //     updatedTr.user = userId;
	    //     updatedTr.type = 'CLADE';
	    //     updatedTr.status = 'PENDING';
	    //     updatedTr.modified = Date.now();
	    //     updatedTr.save(err2 => this.handleResponse(res, next, err2, updatedTr));
	    //     return undefined;
	    //   });
	    // }

	  }, {
	    key: 'destroyCladeTransaction',
	    value: function destroyCladeTransaction(req, res, next) {
	      var _this5 = this;

	      var transactionId = req.params.transactionId;
	      _transaction2.default.findOne({ _id: transactionId, type: 'CLADE', status: 'PENDING' }).remove(function (err, deleted) {
	        return _this5.handleResponse(res, next, err, { deleted: deleted, transactionId: transactionId });
	      });
	    }
	  }]);

	  return TransactionController;
	}(_modules2.default.Controller);

	exports.default = TransactionController;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(21);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	__webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 16/11/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var asset = new _mongoose2.default.Schema({
	  name: { type: String },
	  isDefault: { type: Boolean },
	  folder: { type: String }
	}, { _id: false });

	/**
	 * Transaction schema definition
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
	    enum: ['REVIEW', 'PENDING', 'DONE', 'FAILED'],
	    default: 'DONE'
	  },
	  created: { type: Date, default: Date.now },
	  modified: { type: Date }
	}, { minimize: false });

	exports.default = _mongoose2.default.model('Transaction', TransactionSchema);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _multer = __webpack_require__(41);

	var _multer2 = _interopRequireDefault(_multer);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _asset = __webpack_require__(42);

	var _asset2 = _interopRequireDefault(_asset);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var upload = (0, _multer2.default)({ dest: './build/temp' });

	/**
	 * Router to server routes for user
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary 
	 * @author John Ropas
	 * @since 18/11/2016
	 * 
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	/**
	 * Module dependencies.
	 */

	var controller = new _asset2.default();
	var router = new _modules2.default.Router(controller);

	router.post('/assets/temp', upload.single('cladeImg'), controller.uploadTempImage).delete('/assets/clades/', controller.destroyCladeImage).delete('/assets/temp/', controller.destroyTempImage);

	exports.default = router;

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fs = __webpack_require__(43);

	var _fs2 = _interopRequireDefault(_fs);

	var _mime = __webpack_require__(44);

	var _mime2 = _interopRequireDefault(_mime);

	var _modules = __webpack_require__(9);

	var _modules2 = _interopRequireDefault(_modules);

	var _AccessControl = __webpack_require__(24);

	var _AccessControl2 = _interopRequireDefault(_AccessControl);

	var _AwsS3FileManager = __webpack_require__(45);

	var _AwsS3FileManager2 = _interopRequireDefault(_AwsS3FileManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @summary
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author John Ropas
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 18/11/2016
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright(c) 2016 Phylogeny Explorer
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var AssetController = function (_Modules$Controller) {
	  _inherits(AssetController, _Modules$Controller);

	  function AssetController() {
	    _classCallCheck(this, AssetController);

	    return _possibleConstructorReturn(this, (AssetController.__proto__ || Object.getPrototypeOf(AssetController)).call(this, _AccessControl2.default));
	  }

	  _createClass(AssetController, [{
	    key: 'destroyTempImage',
	    value: function destroyTempImage(req, res, next) {
	      var _this2 = this;

	      var key = req.body.asset.name;
	      var fileManager = new _AwsS3FileManager2.default();
	      fileManager.destroyTempImage(key, function (err, data) {
	        _this2.handleResponse(res, next, err, { deleted: req.body.asset.name, data: data });
	      });
	    }
	  }, {
	    key: 'destroyCladeImage',
	    value: function destroyCladeImage(req, res, next) {
	      var _this3 = this;

	      var key = req.body.asset.name;
	      var id = req.body.asset.id;
	      var fileManager = new _AwsS3FileManager2.default();
	      fileManager.destroyCladeImage(id, key, function (err, data) {
	        _this3.handleResponse(res, next, err, { deleted: req.body.asset.name, data: data });
	      });
	    }
	  }, {
	    key: 'uploadTempImage',
	    value: function uploadTempImage(req, res, next) {
	      var _this4 = this;

	      var img = req.file;
	      if (!img) {
	        this.handleResponse(res, next, { error: 'image missing from request' }, {});
	      }
	      var fileManager = new _AwsS3FileManager2.default();
	      _fs2.default.readFile(img.path, function (err, imgData) {
	        if (err) {
	          console.error(err);
	        } else {
	          (function () {
	            var key = img.filename + '.' + _mime2.default.extension(img.mimetype);
	            fileManager.uploadTempImage(key, imgData, function (err1, data) {
	              _fs2.default.unlink(img.path, function (err2) {
	                if (err2) {
	                  // TODO log in server log
	                  throw err2;
	                }
	              });
	              _this4.handleResponse(res, next, err1, {
	                link: 'https://phylex-public.s3.amazonaws.com/temp/' + key,
	                folder: 'temp',
	                name: key,
	                id: img.filename,
	                ETag: data.ETag
	              });
	            });
	          })();
	        }
	      });
	    }
	  }]);

	  return AssetController;
	}(_modules2.default.Controller);

	exports.default = AssetController;

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("mime");

/***/ },
/* 45 */
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

	var _awsSdk = __webpack_require__(46);

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
	  }]);

	  return AwsS3FileManager;
	}();

	exports.default = AwsS3FileManager;

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("aws-sdk");

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsonwebtoken = __webpack_require__(48);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _user = __webpack_require__(20);

	var _user2 = _interopRequireDefault(_user);

	var _authentication = __webpack_require__(49);

	var _authentication2 = _interopRequireDefault(_authentication);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *  The Auth Checker middleware function.
	 */
	var AuthCheck = function AuthCheck(req, res, next) {
	  if (req.method === 'OPTIONS') {
	    next();
	  }
	  if (!req.headers.authorization) {
	    return res.status(401).end();
	  }

	  // get the last part from a authorization header string like "bearer token-value"
	  var token = req.headers.authorization.split(' ')[1];

	  // decode the token using a secret key-phrase
	  return _jsonwebtoken2.default.verify(token, _authentication2.default.jwtSecret, function (err, decoded) {
	    // the 401 code is for unauthorized status
	    if (err) {
	      return res.status(401).end();
	    }

	    var userId = decoded.sub;

	    // check if a user exists
	    return _user2.default.findById(userId, function (userErr, user) {
	      if (userErr || !user) {
	        return res.status(401).end();
	      }
	      req.user = user;
	      return next();
	    }).populate('role');
	  });
	}; /*!
	    * Phylogeny Explorer
	    *
	    * @summary
	    * @author John Ropas
	    * @since 27/12/2016
	    *
	    * Copyright(c) 2016 Phylogeny Explorer
	    */

	exports.default = AuthCheck;

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 27/12/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	exports.default = {
	  jwtSecret: 'a secret phrase!!'
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _passportLocal = __webpack_require__(51);

	var _passportLocal2 = _interopRequireDefault(_passportLocal);

	var _user = __webpack_require__(20);

	var _user2 = _interopRequireDefault(_user);

	var _role = __webpack_require__(23);

	var _role2 = _interopRequireDefault(_role);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Return the Passport Local Strategy object.
	 */
	var SignUpStrategy = new _passportLocal2.default({
	  usernameField: 'username',
	  passwordField: 'password',
	  session: false,
	  passReqToCallback: true
	}, function (req, username, password, done) {
	  _role2.default.findOne({ isDefault: true }, function (errRole, role) {
	    var newUser = new _user2.default();
	    newUser.role = role._id;
	    newUser.title = req.body.title;
	    newUser.firstName = req.body.firstName;
	    newUser.lastName = req.body.lastName;
	    newUser.username = username.trim();
	    newUser.password = password.trim();
	    newUser.address = req.body.address;
	    newUser.postcode = req.body.postcode;
	    newUser.phone = req.body.phone;
	    newUser.email = req.body.email.trim();
	    newUser.dateOfBirth = req.body.dateOfBirth;
	    newUser.gender = req.body.gender;
	    newUser.coverLetter = req.body.coverLetter;
	    newUser.subscribed = req.body.subscribed;
	    newUser.isActive = true;
	    newUser.isConfirmed = false;
	    newUser.created = Date.now();
	    newUser.modified = null;
	    newUser.save(function (err) {
	      if (err) {
	        return done(err);
	      }
	      return done(null);
	    });
	  });
	}); /*!
	     * Phylogeny Explorer
	     *
	     * @summary 
	     * @author John Ropas
	     * @since 27/12/2016
	     * 
	     * Copyright(c) 2016 Phylogeny Explorer
	     */

	exports.default = SignUpStrategy;

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jsonwebtoken = __webpack_require__(48);

	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

	var _passportLocal = __webpack_require__(51);

	var _passportLocal2 = _interopRequireDefault(_passportLocal);

	var _user = __webpack_require__(20);

	var _user2 = _interopRequireDefault(_user);

	var _authentication = __webpack_require__(49);

	var _authentication2 = _interopRequireDefault(_authentication);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Return the Passport Local Strategy object.
	 */
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 27/12/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var LoginStrategy = new _passportLocal2.default({
	  usernameField: 'username',
	  passwordField: 'password',
	  session: false,
	  passReqToCallback: true
	}, function (req, username, password, done) {
	  var userData = {
	    username: username.trim(),
	    password: password.trim()
	  };

	  // find a user by email address
	  return _user2.default.findOne({ username: userData.username, isConfirmed: true, isActive: true }, function (err, user) {
	    if (err) {
	      return done(err);
	    }

	    if (!user) {
	      var error = new Error("Incorrect username, password or user hasn't been confirmed yet");
	      error.name = 'IncorrectCredentialsError';

	      return done(error);
	    }

	    // check if a hashed user's password is equal to a value saved in the database
	    return user.comparePassword(userData.password, function (passwordErr, isMatch) {
	      if (err) {
	        return done(err);
	      }

	      if (!isMatch) {
	        var _error = new Error('Incorrect username or password');
	        _error.name = 'IncorrectCredentialsError';

	        return done(_error);
	      }

	      var payload = {
	        sub: user._id
	      };

	      // create a token string
	      var token = _jsonwebtoken2.default.sign(payload, _authentication2.default.jwtSecret);
	      var data = {
	        username: user.username,
	        role: user.role.description
	      };

	      return done(null, token, data);
	    });
	  }).populate('role');
	});

	exports.default = LoginStrategy;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(21);

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

	var connectionString = 'mongodb://35.162.254.17:27017/phylex-admin';

	var options = {
	  user: 'phylexadminuser',
	  pass: 'ed86ec0502b244519ed3c86f8bf39cf4'
	};

	var db = _mongoose2.default.connect(connectionString, options);

	exports.default = db;

/***/ }
/******/ ]);