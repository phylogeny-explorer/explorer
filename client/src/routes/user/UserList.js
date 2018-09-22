/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 21/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */
import React, { PropTypes } from 'react';
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

  onChangeUserActivationStatus(e, id, status) {
    e.preventDefault();
    (async() => {
      const action = status === true ? 'deactivate' : 'activate';
      await new Request(`/users/${id}/${action}`, 'PATCH').fetch();
      history.push('/users');
    })();
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
            rowHeight={50}
            headerHeight={50}
            width={1000}
            height={500}
          >
            <Column
              header={<Cell>Name</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.users[props.rowIndex].title}&nbsp;
                  {this.props.users[props.rowIndex].firstName}&nbsp;
                  {this.props.users[props.rowIndex].lastName}
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
              header={<Cell>Active</Cell>}
              cell={props => (
                <Cell {...props}>
                  <Checkbox
                    checked={this.props.users[props.rowIndex].isActive}
                    value={this.props.users[props.rowIndex].isActive}
                    onChange={(e) => this.onChangeUserActivationStatus(
                      e,
                      this.props.users[props.rowIndex]._id,
                      this.props.users[props.rowIndex].isActive
                    )}
                    bsSize="small"
                  />
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
