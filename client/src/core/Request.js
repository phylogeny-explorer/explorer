/**
 *  Request
 *
 *  @author John Ropas
 *  @since 21/10/2016
 *
 *  Copyright (c) 2016 Phylogeny Explorer. All rights reserved.
 */

import fetch from './fetch';
import { adminApiHost, publicApiHost } from '../config';
import Auth from '../components/Auth';

class Request {

  static endPoints = {
    admin: adminApiHost,
    public: publicApiHost,
  };

  constructor(url, method, params, endPoint) {
    this._endPoint = endPoint || Request.endPoints.admin;

    this._params = params || {};

    this._config = {};

    this._url = this.localUrl(url);

    this._method = method;

    let isMultipart = false;

    Object.keys(this._params).forEach((k) => (isMultipart = (this._params[k] instanceof File)));

    if (isMultipart) {
      this._payload = new FormData();
      Object.keys(this._params).forEach((k) => this._payload.append(k, this._params[k]));
      this._config.headers = {};
    } else if (Object.keys(this._params).length !== 0 &&
      JSON.stringify(this._params) !== JSON.stringify({})) {
      this._payload = JSON.stringify(this._params);
      this._config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      this._payload = JSON.stringify({});
      this._config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }

    if (Auth.isUserAuthenticated()) {
      this._config.headers.Authorization = `bearer ${Auth.getToken()}`;
    }

    this._config.method = this._method;
    this._config.body = this._payload;
    if (this._config.method === 'GET') {
      delete this._config.body;
    }
  }

  localUrl(url) {
    if (url.startsWith('http')) {
      return url;
    }

    return `//${this._endPoint}${url}`;
  }


  async fetch() {
    const response = await fetch(this._url, this._config)
      .then(resp => resp.json())
      .then(data => data);
    return response;
  }
}

export default Request;
