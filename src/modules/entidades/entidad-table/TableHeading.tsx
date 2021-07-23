import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Fonts } from '../../../shared/constants/AppEnums';

const useStyles = makeStyles(() => ({
  tableRowRoot: {
    color: grey[500],
  },
  tableCellRoot: {
    borderBottom: `0 none`,
    fontSize: 13,
    padding: 8,
    fontWeight: Fonts.BOLD,
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 20,
    },
  },
}));

const TableHeading = () => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>ID</TableCell>
      <TableCell align="left" className={classes.tableCellRoot}>
        Nombre
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;