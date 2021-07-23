import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import EntidadActions from '@/modules/entidades/entidad-table/EntidadActions';
import { Entidad } from '@/types/models/entidades/EntidadApp';
import useStyles from './TableItem.style';

interface TableItemProps {
  data: Entidad;
}

const TableItem: React.FC<TableItemProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <TableRow key={data.id} className="item-hover">
      <TableCell component="th" scope="row" className={classes.tableCell}>
        <Box className={classes.anchar}>{data.id}</Box>
      </TableCell>
      <TableCell
        align="left"
        className={clsx(classes.tableCell, classes.tableCell)}
      >
        {data.nombre}
      </TableCell>
      <TableCell align="right" className={classes.tableCell}>
        <EntidadActions />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
