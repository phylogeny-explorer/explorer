import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Attribution.css';
import {
  Table,
  Button,
  Glyphicon,
  FormControl,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';

class Attribution extends React.Component {
  constructor(props)
  {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    e.preventDefault();
    const shouldDelete = confirm("Are you sure you want to delete this " + this.props.attribution.type + " attribution?");
    if (shouldDelete) this.props.onDelete(this.props.attribution);
    return false;
  }

  updateName(name)
  {
    this.props.onChange(Object.assign({}, this.props.attribution, {
      name
    }));
  }

  updateDate(date)
  {
    this.props.onChange(Object.assign({}, this.props.attribution, {
      date
    }));
  }

  render() {
    return (
      <div id={`attribution.${this.props.attribution.index}`} className={s.compact}>
        <Table className={s.compacttable}>
          <tbody>
          <tr>
            <td colSpan="3">
              <table className={s.compacttable}>
                <tbody>
                <tr>
                  <td className={s.row}>
                    <h4>{this.props.attribution.type}</h4>
                  </td>
                  {
                    this.props.extraLabel &&
                    <td className={s.row}>
                      {this.props.extraLabel}
                    </td>
                  }
                  <td className={s.row}>
                    <Button onClick={this.onDelete} bsStyle="danger" className={s.delete_button}>
                      <Glyphicon glyph="remove" />
                    </Button>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <FormGroup controlId="name">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  placeholder="Name"
                  type="text"
                  value={this.props.attribution.name || ''}
                  onChange={(e) => this.updateName(e.target.value)}
                />
              </FormGroup>
            </td>
            <td>
              <FormGroup controlId="name">
                <ControlLabel>Date</ControlLabel>
                <FormControl
                  placeholder="Date"
                  type="text"
                  value={this.props.attribution.date || ''}
                  onChange={(e) => this.updateDate(e.target.value)}
                />
              </FormGroup>
            </td>
            {
              this.props.extraField &&
              <td>
                {this.props.extraField}
              </td>
            }
          </tr>
          {this.props.attribution.errors.map((error, i) => (
            <tr key={i}>
              <td colSpan="3" className={s.error}>
                {error}
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withStyles(s)(Attribution);
