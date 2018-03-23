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

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _morgan = __webpack_require__(3);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _cookieParser = __webpack_require__(4);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _bodyParser = __webpack_require__(5);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _index = __webpack_require__(6);

	var _index2 = _interopRequireDefault(_index);

	var _modules = __webpack_require__(8);

	var _modules2 = _interopRequireDefault(_modules);

	__webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import favicon from 'serve-favicon';
	/*!
	 * Phylogeny Explorer
	 *
	 * @summary Application bootstrap
	 * @author John Ropas
	 * @since 19/09/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var app = (0, _express2.default)();

	// view engine setup
	// app.set('views', path.join(__dirname, 'views'));
	// app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use((0, _cookieParser2.default)());
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

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
	  res.setHeader('Access-Control-Allow-Credentials', true);

	  // Pass to next layer of middleware
	  next();
	});

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
	var factory = new _modules2.default.Server(app, 5500, 'phylex-public-api:server');

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

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _clade = __webpack_require__(7);

	var _clade2 = _interopRequireDefault(_clade);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (app) {
	  app.use('/', _clade2.default);
	}; /*!
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modules = __webpack_require__(8);

	var _modules2 = _interopRequireDefault(_modules);

	var _clade = __webpack_require__(19);

	var _clade2 = _interopRequireDefault(_clade);

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

	var controller = new _clade2.default();
	var router = new _modules2.default.Router(controller);

	router.get('/clades/generate', controller.generate).get('/clades/tree', controller.getClades).get('/clades/tree/:id/', controller.getClades).get('/clades/tree/depth/:depth', controller.getClades).get('/clades/tree/:id/depth/:depth', controller.getClades).get('/clades/:id', controller.getCladeById).post('/clades/enrich', controller.enrichClades).post('/clades/search', controller.searchForClades);

	exports.default = router;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _controller = __webpack_require__(9);

	var _controller2 = _interopRequireDefault(_controller);

	var _server = __webpack_require__(11);

	var _server2 = _interopRequireDefault(_server);

	var _router = __webpack_require__(15);

	var _router2 = _interopRequireDefault(_router);

	var _tree = __webpack_require__(17);

	var _tree2 = _interopRequireDefault(_tree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*!
	 * Modules
	 *
	 * @summary
	 * @author John Ropas
	 * @since 24/10/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var Modules = {
	  Controller: _controller2.default,
	  Server: _server2.default,
	  Router: _router2.default,
	  Tree: _tree2.default
	};

	exports.default = Modules;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _controller = __webpack_require__(10);

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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _WebServerFactory = __webpack_require__(12);

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
/* 12 */
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

	var _http = __webpack_require__(13);

	var _http2 = _interopRequireDefault(_http);

	var _debug = __webpack_require__(14);

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
/* 13 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _router = __webpack_require__(16);

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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tree = __webpack_require__(18);

	var _tree2 = _interopRequireDefault(_tree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _tree2.default; /*!
	                                   * Phylogeny Explorer
	                                   *
	                                   * @summary 
	                                   * @author John Ropas
	                                   * @since 05/11/2016
	                                   * 
	                                   * Copyright(c) 2016 Phylogeny Explorer
	                                   */

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*!
	 * Phylogeny Explorer
	 *
	 * @summary
	 * @author John Ropas
	 * @since 05/11/2016
	 *
	 * Copyright(c) 2016 Phylogeny Explorer
	 */

	var Tree = function () {
	  function Tree(schema, root, depth, callback) {
	    _classCallCheck(this, Tree);

	    this._depth = depth;
	    this._actualDepth = depth;
	    this._root = root;
	    this._schema = schema;
	    this._callback = callback;
	    this._nodes = new Array(depth);
	    this._nodeIds = new Array(depth);
	    this._total = 1;
	    this.fill();
	  }

	  _createClass(Tree, [{
	    key: 'fill',
	    value: function fill() {
	      for (var i = 0; i < this._depth; i += 1) {
	        this._nodes[i] = {};
	        this._nodeIds[i] = [];
	      }
	      this._nodes[0][this._root._id] = this._root;
	      this._nodeIds[0] = [this._root._id];
	    }
	  }, {
	    key: 'attributeToParent',
	    value: function attributeToParent(child, level) {
	      var parent = this._nodes[level][child.parent];
	      if (parent !== undefined) {
	        if (parent.children === undefined) {
	          parent.children = [];
	        }
	        parent.children.push(child);
	        this._nodes[level + 1][child._id] = child;
	        this._nodeIds[level + 1].push(child._id);
	        this._total += 1;
	      } else {
	        console.error('Couldn\'t find suitable parent for ' + child.name);
	      }
	    }
	  }, {
	    key: 'traverse',
	    value: function traverse(level, nodeIds, callback) {
	      var _this = this;

	      if (nodeIds.length > 1000) {
	        console.warn('Warning: your are exceeding the safe id count');
	      }
	      this._schema.find({ parent: { $in: nodeIds } }, function (err2, children) {
	        for (var i = 0; i < children.length; i += 1) {
	          var child = children[i].toObject();
	          child.children = [];
	          _this.attributeToParent(child, level);
	        }
	        callback(level + 1);
	      });
	    }
	  }, {
	    key: 'walk',
	    value: function walk(level) {
	      var _this2 = this;

	      if (level < this._depth - 1 && this._nodeIds[level].length > 0) {
	        this.traverse(level, this._nodeIds[level], function (e) {
	          return _this2.walk(e);
	        });
	      } else {
	        if (this._nodeIds[level].length === 0) {
	          this._actualDepth = level;
	        } else {
	          this._actualDepth = level + 1;
	        }
	        this.reply();
	      }
	    }
	  }, {
	    key: 'begin',
	    value: function begin() {
	      if (this._depth <= 1) {
	        this.reply();
	      } else {
	        this.walk(0);
	      }
	    }
	  }, {
	    key: 'reply',
	    value: function reply() {
	      var result = {
	        total: this._total,
	        depth: this._depth,
	        actualDepth: this._actualDepth,
	        root: this._root
	      };
	      this._callback(result);
	    }
	  }, {
	    key: 'print',
	    value: function print() {
	      var str = '';
	      for (var i = 0; i < this._depth; i += 1) {
	        str += 'Level: ' + (i + 1) + ', Count: ' + this._nodeIds[i].length + ' \n';
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = Object.entries(this._nodes[i])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2);

	            var key = _step$value[0];
	            var value = _step$value[1];

	            str += key + ': ' + value.name + ', ';
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

	        str += '\n';
	      }
	      console.error(str);
	    }
	  }]);

	  return Tree;
	}();

	exports.default = Tree;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mongoose = __webpack_require__(20);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _modules = __webpack_require__(8);

	var _modules2 = _interopRequireDefault(_modules);

	var _clade = __webpack_require__(21);

	var _clade2 = _interopRequireDefault(_clade);

	var _AccessControl = __webpack_require__(22);

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

	var CladeController = function (_Modules$Controller) {
	  _inherits(CladeController, _Modules$Controller);

	  function CladeController() {
	    _classCallCheck(this, CladeController);

	    return _possibleConstructorReturn(this, (CladeController.__proto__ || Object.getPrototypeOf(CladeController)).call(this, _AccessControl2.default));
	  }

	  _createClass(CladeController, [{
	    key: 'getClades',
	    value: function getClades(req, res, next) {
	      var _this2 = this;

	      var nodeId = req.params.id || '55ae8ce9343108fa191058d2'; // Root node
	      var depth = Number.parseInt(req.params.depth, 10) || 3;
	      _clade2.default.findById(nodeId, '-__v', function (err, clade) {
	        if (clade) {
	          var tree = new _modules2.default.Tree(_clade2.default, clade.toObject(), depth, function (result) {
	            return _this2.handleResponse(res, next, err, result);
	          });
	          tree.begin();
	        } else {
	          _this2.handleResponse(res, next, err, { root: {}, depth: depth, total: CladeController.total });
	        }
	      });
	    }
	  }, {
	    key: 'getCladeById',
	    value: function getCladeById(req, res, next) {
	      var _this3 = this;

	      var cladeId = req.params.id;
	      _clade2.default.findById(cladeId, '-__v', function (err, clade) {
	        var finalClade = JSON.parse(JSON.stringify(clade));
	        _clade2.default.find({ parent: clade._id }, function (err1, children) {
	          finalClade.hasChildren = children.length > 0;
	          _this3.handleResponse(res, next, err, finalClade);
	        });
	      }).populate('parent');
	    }
	  }, {
	    key: 'enrichClades',
	    value: function enrichClades(req, res, next) {
	      var _this4 = this;

	      var cladeIds = req.body.cladeIds;
	      _clade2.default.find({ _id: { $in: cladeIds } }, '-__v', function (err, clades) {
	        _this4.handleResponse(res, next, err, clades);
	      });
	    }
	  }, {
	    key: 'searchForClades',
	    value: function searchForClades(req, res, next) {
	      var _this5 = this;

	      var name = req.body.name;
	      var self = req.body.self;
	      _clade2.default.find({ name: { $regex: '^' + name, $options: 'i' }, _id: { $ne: self } }, 'name', function (err, clades) {
	        return _this5.handleResponse(res, next, err, clades);
	      });
	    }
	  }, {
	    key: 'generate',
	    value: function generate(req, res, next) {
	      var _this6 = this;

	      var localConn = _mongoose2.default.createConnection('mongodb://localhost:27017/phylex-public');
	      var connectionString = 'mongodb://35.162.254.17:27017/phylex-public';

	      var options = {
	        user: 'phylexpublicuser',
	        pass: '53010c7ca48711e680f576304dec7eb7'
	      };

	      var remoteConn = _mongoose2.default.createConnection(connectionString, options);
	      var localClade = localConn.model('clades', _clade2.default.schema);
	      var RemoteClade = remoteConn.model('clades', _clade2.default.schema);

	      localClade.find({}, function (err, olClades) {
	        for (var i = 0; i < olClades.length; i += 1) {
	          var o = olClades[i];
	          var clade = new RemoteClade();

	          if (o.name !== null) {
	            o.name = o.name.trim();
	            if (o.name.indexOf('DUPLICATE') >= 0) {
	              continue;
	            }
	            if (o.name.indexOf('Paparia') >= 0) {
	              continue;
	            }
	            if (o.name.indexOf('†') >= 0) {
	              o.name = o.name.replace('†', '').trim();
	              o.extant = false;
	            }
	            if (o.name.indexOf('|') >= 0) {
	              o.name = null;
	            }
	          }

	          clade._id = o._id;
	          clade.parent = o.parent;
	          clade.name = o.name || null;
	          clade.description = o.description || null;
	          clade.otherNames = o.otherNames || null;
	          clade.extant = o.extant || null;
	          clade.created = Date.now();
	          clade.modified = null;
	          clade.save(function (err1, data) {
	            return console.error(err1, data.name);
	          });
	        }
	        _this6.handleResponse(res, next, err, 'Finished ' + olClades.length + ' old clades');
	      });
	    }
	  }]);

	  return CladeController;
	}(_modules2.default.Controller);

	exports.default = CladeController;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(20);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Clade schema definition
	 */

	var asset = new _mongoose2.default.Schema({
	  name: { type: String },
	  isDefault: { type: Boolean }
	}, { _id: false }); /*!
	                     * Phylogeny Explorer
	                     *
	                     * @summary Model representing a role
	                     * @author John Ropas
	                     * @since 29/09/2016
	                     *
	                     * Copyright(c) 2016 Phylogeny Explorer
	                     */

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

	exports.default = _mongoose2.default.model('Clade', CladeSchema);

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(20);

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

	var db = _mongoose2.default.connect(connectionString, options);

	exports.default = db;

/***/ }
/******/ ]);