import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../components/title';

// Generate Order Data
function createData(id: number, date: string, name: string, shipTo: string) {
  return { id, date, name, shipTo };
}

const rows = [
  createData(0, 'Ramon Pinho', 'AirCross', 'KWI9985'),
  createData(1, 'Renan Pinho', 'Volvo', 'QWE1234'),
  createData(2, 'Tiago Neves', 'Del Rey', 'IUY6548'),
  createData(3, 'Leandro Galvão', 'BYD Dolphin', 'JHG6548'),
  createData(4, 'Noele Fernandes', 'HB20', 'HBG8754')
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Apartamento</TableCell>
            <TableCell>Veiculo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
