import FixedDataTable from 'fixed-data-table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// eslint-disable-next-line import/no-unresolved, max-len, default-export
import * as tableStyle from '!!isomorphic-style-loader!css?modules=false!fixed-data-table/dist/fixed-data-table.min.css';
// eslint-disable-next-line import/no-unresolved, default-export
import customTableStyle from './DataTable.css';


export const Table = withStyles(tableStyle, customTableStyle)(FixedDataTable.Table);
export const Column = FixedDataTable.Column;
export const Cell = FixedDataTable.Cell;

