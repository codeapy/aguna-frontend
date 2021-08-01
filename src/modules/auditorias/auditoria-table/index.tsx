import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Auditoria } from '@/types/models/auditorias/App';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../@crema/core/AppTableContainer';

interface AuditoriaTableProps {
  auditoriaData: Auditoria[];
}

const AuditoriaTable: React.FC<AuditoriaTableProps> = ({ auditoriaData }) => (
  <AppTableContainer>
    <Table stickyHeader className="table">
      <TableHead>
        <TableHeading />
      </TableHead>
      <TableBody>
        {auditoriaData.map((data) => (
          <TableItem data={data} key={data.id} />
        ))}
      </TableBody>
    </Table>
  </AppTableContainer>
);

export default AuditoriaTable;
