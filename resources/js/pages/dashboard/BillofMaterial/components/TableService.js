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

export default function BasicTable({ payload, qty }) {

  const sumSubTotal = () => {
    var sub = 0;
    sub = payload.reduce((prev, next) => {
      return prev + Math.floor(qty * next.unit_price);
    }, 0)
    return fCurrency(Math.floor(sub));
  }

  const total = () => {
    var sub = payload.reduce((prev, next) => {
      return (prev + next.unit_price);
    }, 0)
    return fCurrency(Math.floor(sub));
  }

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto', margin: '2em 0'}}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Service Name</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payload.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index+1}</TableCell>
              <TableCell component="th" scope="row">
                {row.product?.service?.name} 
              </TableCell>
              <TableCell align="right">{qty}</TableCell>
              <TableCell align="right">{fCurrency(row.unit_price)}</TableCell>
              <TableCell align="right">Rp. {fCurrency(Math.floor(qty * row.unit_price))}</TableCell>
            </TableRow>
          ))}
          
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={4}>
                <BoxStyle />
                <Typography variant="body1"> Subtotal </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> Rp. {sumSubTotal() } </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={4}>
                <BoxStyle />
                <Typography variant="body1"> Taxes </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {`Included`} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={4}>
                <BoxStyle />
                <Typography variant="body1"> Service Cost (/pcs) </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> Rp. {total()} </Typography>
              </NoBorderCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}