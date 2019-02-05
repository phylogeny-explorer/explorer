import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  Grid,
  Col,
  Row,
} from 'react-bootstrap';
import s from './Transaction.css';
import Request from '../../core/Request';
import history from '../../core/history';

let title = '';

class Form extends React.Component {

  static propTypes = {
    transaction: React.PropTypes.any.isRequired,
    mode: React.PropTypes.string,
  };

  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      title = `${this.props.mode} Transaction`;
      context.setTitle(title);
    }

    const before = {
      data: this.props.transaction.data.before,
      assets: this.props.transaction.assets.before,
    };


    const after = {
      data: this.props.transaction.data.after,
      assets: this.props.transaction.assets.after,
    };

    this.state = {
      before: JSON.stringify(before, null, 2),
      after: JSON.stringify(after, null, 2),
      mode: this.props.transaction.mode,
      identifier: this.props.transaction.identifier,
    };
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

  onCancel(e) {
    e.preventDefault();
    history.push('/transactions');
  }

  removeBadCharacters(source) {
    return source.replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
  }

  onSubmit(e) {
    e.preventDefault();
    const before = this.state.before || '{}';
    const after = this.state.after || '{}';
    const postObj = {
      before: JSON.parse(this.removeBadCharacters(before)),
      after: JSON.parse(this.removeBadCharacters(after)),
      deletion: this.props.transaction.deletion,
    };

    (async() => {
      let resp = null;
      let key = '';
      switch (this.props.mode) {
        case 'Update':
          resp = await new Request(`/transactions/${this.props.transaction._id}`,
            'PUT', postObj).fetch();
          key = resp._id;
          break;
        case 'Destroy':
          resp = await new Request(`/transactions/${this.props.transaction._id}`,
            'DELETE', postObj).fetch();
          key = resp.transactionId;
          break;
        default:
          break;
      }

      if (key !== '') {
        history.push('/transactions');
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
          <hr />
          <form onSubmit={(e) => this.onSubmit(e)}>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} md={5}>
                  <FormGroup controlId="before">
                    <ControlLabel>Before</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows="15"
                      value={this.state.before}
                      onChange={(e) => this.onChange(e)}
                      disabled={this.props.mode === 'Destroy'}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={5}>
                  <FormGroup controlId="after">
                    <ControlLabel>After</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows="15"
                      value={this.state.after}
                      onChange={(e) => this.onChange(e)}
                      disabled={this.props.mode === 'Destroy'}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
            <FormGroup controlId="mode">
              <ControlLabel>Mode</ControlLabel>
              <FormControl
                type="text"
                value={this.state.mode}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
              />
            </FormGroup>
            <FormGroup controlId="identifier">
              <ControlLabel>Identifier</ControlLabel>
              <FormControl
                type="text"
                value={this.state.identifier}
                onChange={(e) => this.onChange(e)}
                disabled={this.props.mode === 'Destroy'}
              />
            </FormGroup>
            <ButtonToolbar>
              <Button
		id="submitButton"
                type="submit"
                bsStyle={this.getButtonStyle()}
                style={{ display: this.props.mode === 'Destroy' ? 'block' : 'none' }}
              >
                {this.props.mode}
              </Button>
              <Button id="cancelButton" type="button" bsStyle="warning" onClick={(e) => this.onCancel(e)}>
                Cancel
              </Button>
            </ButtonToolbar>
          </form>
        </div>
      </div>
    );
  }
}

Form.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Form);
