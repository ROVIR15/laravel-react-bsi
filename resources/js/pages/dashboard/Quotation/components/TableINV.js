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

export default function BasicTable({ payload }) {

  const sumSubTotal = () => {
    var sub = 0;
    payload.map(function(item){
      sub = sub + (item.qty*item.unit_price)
    })
    return fCurrency(Math.floor(sub));
  }

  const total = () => {
    var sub = 0;
    payload.map(function(item){
      sub = sub + (item.qty*item.unit_price)
    })
    return fCurrency(Math.floor(sub)*1.1);
  }
  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto', margin: '2em 0'}}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="left">Color</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="right">Qty Ordered</TableCell>
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
                {row.name} 
              </TableCell>
              <TableCell component="th" scope="row">
                {row.color}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.size}
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{fCurrency(row.unit_price)}</TableCell>
              <TableCell align="right">Rp. {fCurrency(Math.floor(row.qty * row.unit_price))}</TableCell>
            </TableRow>
          ))}
          
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={6}>
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
              <NoBorderCell align="right" colSpan={6}>
                <BoxStyle />
                <Typography variant="body1"> Taxes </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {`${10}%`} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={6}>
                <BoxStyle />
                <Typography variant="h6"> Total </Typography>
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