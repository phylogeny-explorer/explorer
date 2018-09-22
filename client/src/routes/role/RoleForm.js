/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 22/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Table,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Checkbox,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import s from './Role.css';
import Request from '../../core/Request';
import history from '../../core/history';

let title = '';

class RoleForm extends React.Component {

  static propTypes = {
    role: React.PropTypes.any,
    rules: React.PropTypes.array,
    mode: React.PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    if (context.setTitle) {
      title = `${this.props.mode} Role`;
      context.setTitle(title);
    }

    if (this.props.mode !== 'Create') {
      this.state = {
        description: this.props.role.description,
        isActive: this.props.role.isActive,
        rules: this.props.role.rules,
        selectedRules: this.props.role.rules.map((r) =>
        r.path + r.controller + r.action + r.method),
      };
    } else {
      this.state = { description: '', isActive: false, rules: [], selectedRules: [] };
    }
  }

  onChange(e) {
    const model = {};
    this.setState(model);
    if (e.target.type === 'checkbox') {
      model[e.target.id] = e.target.checked;
    } else {
      model[e.target.id] = e.target.value;
    }
  }

  onChangePermission(e, row) {
    const rules = this.state.rules;
    rules[row].allow = e.target.checked;
    this.setState({ rules });
  }

  onSelect(e) {
    const rules = [];
    for (let i = 0; i < e.target.length; i++) {
      const option = e.target[i];
      if (option.selected) {
        this.props.rules.map((r) => {
          if ((r.path + r.controller + r.action + r.method) === option.value) {
            const rule = r;
            if (rule.allow === undefined) {
              rule.allow = true;
            }
            rules.push(rule);
          }
          return undefined;
        });
      } else {
        this.props.rules.map((r) => {
          if ((r.path + r.controller + r.action + r.method) === option.value) {
            const rule = r;
            rule.allow = true;
          }
          return undefined;
        });
      }
    }
    this.setState({ rules,
      selectedRules: rules.map((rule) =>
      rule.path + rule.controller + rule.action + rule.method) });
  }

  onCancel(e) {
    e.preventDefault();
    history.push('/roles');
  }


  onSubmit(e) {
    e.preventDefault();
    (async() => {
      let resp = null;
      let key = '';
      switch (this.props.mode) {
        case 'Create':
          resp = await new Request('/roles', 'POST', this.state).fetch();
          key = resp._id;
          break;
        case 'Update':
          resp = await new Request(`/roles/${this.props.role._id}`, 'PUT', this.state).fetch();
          key = resp._id;
          break;
        case 'Destroy':
          resp = await new Request(`/roles/${this.props.role._id}`, 'DELETE', this.state).fetch();
          key = resp.roleId;
          break;
        default:
          break;
      }

      if (key !== '') {
        history.push('/roles');
      }
    })();
  }

  getButtonStyle() {
    switch (this.props.mode) {
      case 'Destroy':
        return 'danger';
      case 'Update':
        return 'info';
      default:
        return 'success';
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <FormGroup controlId="description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                placeholder="description"
                value={this.state.description}
                onChange={(e) => this.onChange(e)}
                required
                disabled={this.props.mode === 'Destroy'}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>State</ControlLabel>
              <Checkbox
                id="isActive"
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
                value={this.state.isActive}
                checked={this.state.isActive}
              >
                Is Role Active?
              </Checkbox>
            </FormGroup>

            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Available Permissions</ControlLabel>
              <FormControl
                componentClass="select"
                multiple
                disabled={this.props.mode === 'Destroy'}
                value={this.state.selectedRules}
                onChange={(e) => this.onSelect(e)}
                size={this.props.rules.length}
              >
                {this.props.rules.map((rule, j) =>
                  <option key={j} value={rule.path + rule.controller + rule.action + rule.method}>
                    {rule.path} ~ {rule.controller} ~ {rule.action} ~ {rule.method}
                  </option>
                )}
              </FormControl>
              <HelpBlock> Press and hold CMD/CTRL and click on the desired permissions</HelpBlock>
            </FormGroup>


            <FormGroup>
              <ControlLabel>Role's Permissions</ControlLabel>

              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Controller</th>
                    <th>Action</th>
                    <th>Method</th>
                    <th>Permission</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rules.map((rule, j) =>
                    <tr key={j}>
                      <td>{rule.path}</td>
                      <td>{rule.controller}</td>
                      <td>{rule.action}</td>
                      <td>{rule.method}</td>
                      <td>
                        <Checkbox
                          onChange={(e) => this.onChangePermission(e, j)}
                          disabled={this.props.mode === 'Destroy'}
                          value={rule.allow}
                          checked={rule.allow}
                          bsSize="small"
                        >
                          Allow
                        </Checkbox>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </FormGroup>
            <ButtonToolbar>
              <Button type="submit" bsStyle={this.getButtonStyle()}>
                {this.props.mode}
              </Button>
              <Button type="button" bsStyle="warning" onClick={(e) => this.onCancel(e)}>
                Cancel
              </Button>
            </ButtonToolbar>

          </form>
        </div>
      </div>
    );
  }
}

RoleForm.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(RoleForm);
