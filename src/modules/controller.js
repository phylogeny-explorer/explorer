export default class Controller {
  /**
   * Constructor
   * @param middlewareFn [ ] an array of methods to be called
   * as middleware before every member method
   * @param ignoreFns [ ] an array of string names of member
   * methods to ignore when calling the middleware
   */
  constructor(middlewareFn, ignoreFns) {
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
  handleResponse(response, next, error, data) {
    if (error) {
      const err = error;
      err.source = this._name;
      return next(err);
    }
    return response.json(data);
  }

  _wrapMethods() {
    for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      const method = this[name];
      if (method instanceof Function && name !== 'constructor' && this._ignoreFns.indexOf(name) === -1) {
        this[name] = this._wrap(method, name);
        this[name] = Controller.renameFunction(name, this[name]);
      }
    }
  }

  _wrap(methodToWrap, methodName) {
    return (...args) => {
      this._invokeMiddleware(args, methodName);
      methodToWrap.apply(this, args);
    };
  }

  _invokeMiddleware(args, methodName) {
    this._middleware()(...args, methodName);
  }

  static renameFunction(name, fn) {
    return new Function('action', `return function ${name}(...args){ action(...args) };`)(fn);
  }

  get middleware() {
    return this._middleware;
  }

  set middleware(middleware) {
    this._middleware = middleware;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }
};