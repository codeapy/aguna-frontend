import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import AuditoriaActions from '@/modules/auditorias/auditoria-table/AuditoriaActions';
import { Auditoria } from '@/types/models/auditorias/App';
import useStyles from './TableItem.style';

interface TableItemProps {
  data: Auditoria;
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
        <AuditoriaActions data={data} />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
