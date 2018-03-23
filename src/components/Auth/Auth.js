/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 27/12/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

const listeners = [];

class Auth {
  /**
   * Add event listener
   *
   * @param listener
   */
  static addListener(listener) {
    listeners.push(listener);
  }

  /**
   * onAuthenticationStatusChange
   *
   * @param status
   */
  static onAuthenticationStatusChange(status) {
    for (let i = 0; i < listeners.length; i += 1) {
      listeners[i](status);
    }
  }

  /**
   * Authenticate a user. Save a token string in Local Storage
   * @param token
   * @param role
   * @param username
   */
  static authenticateUser(token, role, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    Auth.onAuthenticationStatusChange(true);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    Auth.onAuthenticationStatusChange(false);
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get a role value.
   *
   * @returns {string}
   */
  static getRole() {
    return localStorage.getItem('role');
  }

  /**
   * Get a username value.
   *
   * @returns {string}
   */
  static getUsername() {
    return localStorage.getItem('username');
  }
}

export default Auth;
