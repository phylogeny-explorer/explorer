import http from 'http';
import debug from 'debug';

class WebServerFactory {

  constructor(app, preferredPort, name) {
    this._defaultPort = 3000;
    this._preferredPort = process.env.PORT || preferredPort;
    this._app = app;
    this._server = {};
    this._name = name;
    this._debug = debug(name);
  }

  createAndStartServer() {
    this.port = this.normalizePort();
    this.app.set('port', this.port);

    // Create HTTP server.
    this.server = http.createServer(this.app, (req, res, next) => {
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
  normalizePort() {
    const result = parseInt(this.preferredPort, 10);

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
  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof this.port === 'string' ? `Pipe  ${this.port}` : `Port ${this.port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  onListening() {
    const address = this.server.address();
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `port ${address.port}`;

    this.debug(`Listening on ${bind}`);
  }

  get defaultPort() {
    return process.env.PORT || this._defaultPort;
  }

  /**
   * Setter for debug instance
   * @param debugInstance
   */
  set debug(debugInstance) {
    this._debug = debugInstance;
  }

  /**
   * Getter for debug instance
   * @returns {*}
   */
  get debug() {
    return this._debug;
  }

  /**
   * Setter for server name
   * @param name
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Getter for server name
   * @returns {*}
   */
  get name() {
    return this._name;
  }

  /**
   * Setter for app instance
   * @param app
   */
  set app(app) {
    this._app = app;
  }

  /**
   * Getter for app instance
   * @returns {*}
   */
  get app() {
    return this._app;
  }

  /**
   * Setter for server instance
   * @param server
   */
  set server(server) {
    this._server = server;
  }

  /**
   * Getter for server instance
   * @returns {*}
   */
  get server() {
    return this._server;
  }

  /**
   * Setter for user preferred port
   * @param preferredPort
   */
  set preferredPort(preferredPort) {
    this._preferredPort = preferredPort;
  }

  /**
   * Getter for preferred port
   * @returns {*} the preferred port value
   */
  get preferredPort() {
    return this._preferredPort;
  }

  /**
   * Setter for port value
   * @param port
   */
  set port(port) {
    this._port = port;
  }

  /**
   * Getter for actual used port
   * @returns {*} the port value
   */
  get port() {
    return this._port;
  }

}


export default WebServerFactory;
