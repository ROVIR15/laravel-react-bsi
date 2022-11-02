import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { fCurrency } from '../../../../utils/formatNumber';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 12
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(
  name,
  qty,
  unit_price
) {
  return { name, qty, unit_price};
}

const rows = [
  createData('Product A', 200, 20000),
  createData('Product B', 200, 20000),
  createData('Product C', 200, 20000),
  createData('Product D', 200, 20000)
];

export default function BasicTable({ payload, qty, tax }) {

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto', margin: '2em 0'}}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Person</TableCell>
            <TableCell align="right">Final Price</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payload.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index+1}</TableCell>
              <TableCell align="left">{row?.user?.name}</TableCell>
              <TableCell align="left">{row?.final_price}</TableCell>
              <TableCell align="left">{row?.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}