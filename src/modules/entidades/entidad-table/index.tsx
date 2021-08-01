import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Entidad } from '@/types/models/entidades/EntidadApp';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../@crema/core/AppTableContainer';

interface EntidadTableProps {
  entidadData: Entidad[];
}

const EntidadTable: React.FC<EntidadTableProps> = ({ entidadData }) => (
  <AppTableContainer>
    <Table stickyHeader className="table">
      <TableHead>
        <TableHeading />
      </TableHead>
      <TableBody>
        {entidadData.map((data) => (
          <TableItem data={data} key={data.id} />
        ))}
      </TableBody>
    </Table>
  </AppTableContainer>
);

export default EntidadTable;
