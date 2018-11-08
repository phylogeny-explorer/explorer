import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Column, Cell } from '../../components/DataTable';
import s from './Rule.css';

class RuleList extends React.Component {

  static propTypes = {
    rules: PropTypes.any.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Rules</h1>
          <Table
            rowsCount={this.props.rules.length}
            rowHeight={50}
            headerHeight={50}
            width={1000}
            height={500}
          >
            <Column
              header={<Cell>Path</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.rules[props.rowIndex].path}
                </Cell>
              )}
              width={400}
            />
            <Column
              header={<Cell>Controller</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.rules[props.rowIndex].controller}
                </Cell>
              )}
              width={200}
            />
            <Column
              header={<Cell>Action</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.rules[props.rowIndex].action}
                </Cell>
              )}
              width={200}
            />
            <Column
              header={<Cell>Method</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.rules[props.rowIndex].method}
                </Cell>
              )}
              width={200}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RuleList);
