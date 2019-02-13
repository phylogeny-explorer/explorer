import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Checkbox } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';
import Request from '../../core/Request';
import { Table, Column, Cell } from '../../components/DataTable';
import s from './User.css';

const title = 'Users';

class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.any.isRequired,
  };

  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
  }

  onCreate(e) {
    e.preventDefault();
    history.push('/users/create');
  }

  onUpdate(e, id) {
    e.preventDefault();
    history.push(`/users/update/${id}`);
  }

  onDestroy(e, id) {
    e.preventDefault();
    history.push(`/users/destroy/${id}`);
  }

  onChangeUserConfirmationStatus(e, id, status) {
    e.preventDefault();
    (async() => {
      const action = status === true ? 'disapprove' : 'confirm';
      await new Request(`/users/${id}/${action}`, 'PATCH').fetch();
      history.push('/users');
    })();
  }

  getName(user) {
    return (`${user.firstName.trim()} ${user.lastName.trim()}`).trim();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <ButtonToolbar>
            <Button type="button" onClick={(e) => this.onCreate(e)} bsStyle="primary">
              Create New User
            </Button>
          </ButtonToolbar>
          <br />
          <Table
            rowsCount={this.props.users.length}
            rowHeight={60}
            headerHeight={50}
            width={1000}
            height={500}
          >
            <Column
              header={<Cell>Name</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.getName(this.props.users[props.rowIndex])}
                </Cell>
              )}
              width={150}
            />

            <Column
              header={<Cell>Username</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.users[props.rowIndex].username}
                </Cell>
              )}
              width={180}
            />

            <Column
              header={<Cell>Role</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.users[props.rowIndex].role.description}
                </Cell>
              )}
              width={100}
            />

            <Column
              header={<Cell>Ref Code</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.users[props.rowIndex].referenceCode}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={<Cell>Confirmed</Cell>}
              cell={props => (
                <Cell {...props}>
                  <Checkbox
                    checked={this.props.users[props.rowIndex].isConfirmed}
                    value={this.props.users[props.rowIndex].isConfirmed}
                    bsSize="small"
                    onChange={(e) => this.onChangeUserConfirmationStatus(
                      e,
                      this.props.users[props.rowIndex]._id,
                      this.props.users[props.rowIndex].isConfirmed
                    )}
                  />
                </Cell>
              )}
              width={100}
            />
            <Column
              header={<Cell>Created</Cell>}
              cell={props => (
                <Cell {...props}>
                  {(new Date(this.props.users[props.rowIndex].created)).toUTCString()}
                </Cell>
              )}
              width={260}
            />
            <Column
              header={<Cell>Actions</Cell>}
              cell={props => (
                <Cell {...props}>
                  <ButtonToolbar>
                    <Button
                      type="button"
                      onClick={(e) => this.onUpdate(e, this.props.users[props.rowIndex]._id)}
                      bsStyle="info"
                    >
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      onClick={(e) => this.onDestroy(e, this.props.users[props.rowIndex]._id)}
                      bsStyle="danger"
                    >
                      <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                    </Button>
                  </ButtonToolbar>
                </Cell>
              )}
              width={110}
            />
          </Table>
        </div>
      </div>
    );
  }
}

UserList.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(UserList);
