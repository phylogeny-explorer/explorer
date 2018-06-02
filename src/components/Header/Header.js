/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import Auth from '../Auth';

import history from '../../core/history';
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: 'not-yet',
      role: 'not-yet',
      username: 'not-yet',
    };
  }

  componentDidMount() {
    this.onAuthenticationStatusChange(Auth.isUserAuthenticated());
    Auth.addListener(this.onAuthenticationStatusChange.bind(this));
  }

  onAuthenticationStatusChange(status) {
    this.setState({
      isAuthenticated: status,
      role: Auth.getRole(),
      username: Auth.getUsername(),
    });
  }

  handleSelect(key, e) {
    e.preventDefault();
    if (this.href !== '#') {
      history.push(this.href);
    }
  }

  render() {
    const admin = (
      <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
        <NavItem eventKey={2} href="/roles">Roles</NavItem>
        <NavItem eventKey={3} href="/users">Users</NavItem>
        <NavItem eventKey={5} href="/rules">Rules</NavItem>
        <NavItem eventKey={7} href="/transactions">Transactions</NavItem>
      </Nav>
    );

    const user = (
      <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
        <NavItem eventKey={7} href="/transactions">Transactions</NavItem>
      </Nav>
    );

    const auth = (
      <Navbar.Collapse>
        <Nav pullRight bsStyle="pills" activeKey={2} onSelect={this.handleSelect}>
          <NavItem eventKey={8} href="/auth/logout">Logout</NavItem>
          <NavItem eventKey={9} href="/">{this.state.username}</NavItem>
        </Nav>
        {this.state.role === 'admin' ? admin : user}
      </Navbar.Collapse>
    );

    const unauth = (
      <Navbar.Collapse>
        <Nav pullRight bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={9} href="/auth/login">Login</NavItem>
          <NavItem eventKey={10} href="/auth/signup">Register</NavItem>
        </Nav>
      </Navbar.Collapse>
    );

    const display = this.state.isAuthenticated ? auth : '';

    const finalResult = this.state.isAuthenticated === 'not-yet' ? '' : display;

    return (
      <Navbar className={s.header}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className={s.brand} to="/">Phylogeny Explorer</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {finalResult}
      </Navbar>
    );
  }


}

export default withStyles(s)(Header);
