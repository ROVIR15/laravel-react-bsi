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

import { fCurrency, fNumber } from '../../../../../utils/formatNumber';
import { isEmpty } from 'lodash';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 12
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(name, qty, unit_price) {
  return { name, qty, unit_price };
}

const rows = [
  createData('Product A', 200, 20000),
  createData('Product B', 200, 20000),
  createData('Product C', 200, 20000),
  createData('Product D', 200, 20000)
];

export default function BasicTable({ payload, total }) {
  // const total = () => {
  //   return (subTotal() * (1 + tax / 100)).toFixed(2);
  // };

  // const subTotal = () => {
  //   return payload.reduce((initial, next) => {
  //     return initial + next.qty * next.amount;
  //   }, 0);
  // };

  // const total_price = (qty, amount) => {
  //   let total = qty * amount;
  //   return total;
  // };

  return (
    <TableContainer component={Paper} sx={{ marginLeft: 'auto' }}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Ref Number</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payload.map((row, index) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{row.effective_date}</TableCell>
              <TableCell component="th" scope="row">
                {`${row.ref_num}`}
              </TableCell>
              <TableCell align="right">Rp. {fCurrency(row.total_amount)}</TableCell>
            </TableRow>
          ))}
          {isEmpty(payload) ? (
            <TableRow>
              <TableCell align="right" colSpan={2}>
                No Data
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
