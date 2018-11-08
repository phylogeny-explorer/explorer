import React, { PropTypes } from 'react';
import { Button, ButtonToolbar, Checkbox } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';
import Request from '../../core/Request';
import { Table, Column, Cell } from '../../components/DataTable';
import s from './Role.css';

const title = 'Roles';

class RoleList extends React.Component {
  static propTypes = {
    roles: PropTypes.any.isRequired,
  };

  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
  }

  onCreate(e) {
    e.preventDefault();
    history.push('/roles/create');
  }

  onUpdate(e, id) {
    e.preventDefault();
    history.push(`/roles/update/${id}`);
  }

  onDestroy(e, id) {
    e.preventDefault();
    history.push(`/roles/destroy/${id}`);
  }

  onSetDefaultRole(e, id) {
    e.preventDefault();
    (async() => {
      await new Request(`/roles/${id}`, 'PATCH').fetch();
      history.push('/roles');
    })();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <ButtonToolbar>
            <Button type="button" onClick={(e) => this.onCreate(e)} bsStyle="primary">
              Create New Role
            </Button>
          </ButtonToolbar>
          <br />
          <Table
            rowsCount={this.props.roles.length}
            rowHeight={50}
            headerHeight={50}
            width={1000}
            height={500}
          >
            <Column
              header={<Cell>Description</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.roles[props.rowIndex].description}
                </Cell>
              )}
              width={130}
            />

            <Column
              header={<Cell>Active</Cell>}
              cell={props => (
                <Cell {...props}>
                  <Checkbox
                    checked={this.props.roles[props.rowIndex].isActive}
                    onChange={(e) => (undefined)}
                    bsSize="small"
                  />
                </Cell>
              )}
              width={100}
            />

            <Column
              header={<Cell>Default</Cell>}
              cell={props => (
                <Cell {...props}>
                  <Checkbox
                    checked={this.props.roles[props.rowIndex].isDefault}
                    onChange={(e) => this.onSetDefaultRole(e, this.props.roles[props.rowIndex]._id)}
                    bsSize="small"
                  />
                </Cell>
              )}
              width={100}
            />

            <Column
              header={<Cell>Created</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.roles[props.rowIndex].created}
                </Cell>
              )}
              width={250}
            />
            <Column
              header={<Cell>Modified</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.roles[props.rowIndex].modified}
                </Cell>
              )}
              width={250}
            />
            <Column
              header={<Cell>Actions</Cell>}
              cell={props => (
                <Cell {...props}>
                  <ButtonToolbar>
                    <Button
                      type="button"
                      onClick={(e) => this.onUpdate(e, this.props.roles[props.rowIndex]._id)}
                      bsStyle="info"
                    >
                      <span className="glyphicon glyphicon-pencil" aria-hidden="true"/>
                    </Button>
                    <Button
                      type="button"
                      onClick={(e) => this.onDestroy(e, this.props.roles[props.rowIndex]._id)}
                      bsStyle="danger"
                    >
                      <span className="glyphicon glyphicon-trash" aria-hidden="true"/>
                    </Button>
                  </ButtonToolbar>
                </Cell>
              )}
              width={170}
            />
          </Table>
        </div>
      </div>
    );
  }
}

RoleList.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(RoleList);
