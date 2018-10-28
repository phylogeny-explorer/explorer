import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import Auth from '../Auth';
import Search from '../Search';

import history from '../../core/history';
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      role: null,
      username: null,
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
    return (
      <Navbar className={s.header}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className={s.brand} to="/">
              <img src="/images/logo3.png" className={s.logo} />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        {
          this.state.isAuthenticated &&
          <Nav pullRight bsStyle="pills" activeKey={2} onSelect={this.handleSelect}>
            <NavDropdown eventKey={9} title={this.state.username} id="User Menu">
              <MenuItem eventKey={7} onSelect={this.handleClick} href="/transactions"><span className="glyphicon glyphicon-th-list" /> Transactions</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={9.2} onSelect={this.handleClick} href="/profile"><span className="glyphicon glyphicon-user" /> Profile</MenuItem>
              <MenuItem eventKey={9.1} onSelect={this.handleClick} href="/profile/settings"><span className="glyphicon glyphicon-cog" /> Settings</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={9.3} onSelect={this.handleClick} href="/auth/logout"><span className="glyphicon glyphicon-off" /> Log Out</MenuItem>
            </NavDropdown>
          </Nav>
        }

        {
          this.state.isAuthenticated && this.state.role === 'admin' &&
          <Nav pullRight bsStyle="pills" onSelect={this.handleSelect}>
            <NavDropdown eventKey={9} title="Admin" id="Admin Menu">
              <NavItem eventKey={2} onSelect={this.handleClick} href="/roles">Manage Roles</NavItem>
              <NavItem eventKey={3} onSelect={this.handleClick} href="/users">Manage Users</NavItem>
            </NavDropdown>
          </Nav>
        }
      </Navbar>
    );
  }


}

export default withStyles(s)(Header);
