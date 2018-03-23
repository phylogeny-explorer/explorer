/*!
 * Router
 *
 * @summary
 * @author John Ropas
 * @since 30/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import express from 'express';

class Router extends express.Router {
  constructor(controller) {
    super();
    this._controller = controller.name;
  }

  get controller() {
    return this._controller;
  }

  set controller(controller) {
    this._controller = controller;
  }
}

export default Router;
