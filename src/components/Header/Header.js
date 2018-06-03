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
  NavDropdown,
  MenuItem,
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
      currentKey: 6,
    };
    this.handleClick = this.handleClick.bind(this);
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
    let target = this ? this : e.target;
    e.preventDefault();
    if (target.href !== '#') {
      history.push(target.href);
    }
  }

  handleClick(key) {
    this.setState({currentKey: key});
  }

  render() {
    const admin = (
      <Nav bsStyle="pills" activeKey={this.state.currentKey} onSelect={this.handleSelect}>
        <NavItem eventKey={6} onSelect={this.handleClick} href="/clades">Cladogram</NavItem>
        <NavItem eventKey={2} onSelect={this.handleClick} href="/roles">Roles</NavItem>
        <NavItem eventKey={3} onSelect={this.handleClick} href="/users">Users</NavItem>
        <NavItem eventKey={5} onSelect={this.handleClick} href="/rules">Rules</NavItem>
        <NavItem eventKey={7} onSelect={this.handleClick} href="/transactions">Transactions</NavItem>
      </Nav>
    );

    const user = (
      <Nav bsStyle="pills" activeKey={1} onSelect={this.handleSelect}>
        <NavItem eventKey={6} onSelect={this.handleClick} href="/clades">Cladogram</NavItem>
        <NavItem eventKey={7} onSelect={this.handleClick} href="/transactions">Transactions</NavItem>
      </Nav>
    );

    const auth = (
      <Navbar.Collapse>
        <Nav pullRight bsStyle="pills" activeKey={2} onSelect={this.handleSelect}>
          <NavDropdown eventKey={9} title={this.state.username} id="User Menu">
            <MenuItem eventKey={9.2} onSelect={this.handleClick} href="/profile"><span className="glyphicon glyphicon-user" /> Profile</MenuItem>
            <MenuItem eventKey={9.1} onSelect={this.handleClick} href="/profile/settings"><span className="glyphicon glyphicon-cog" /> Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={9.3} onSelect={this.handleClick} href="/auth/logout"><span className="glyphicon glyphicon-off" /> Log Out</MenuItem>
          </NavDropdown>
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
