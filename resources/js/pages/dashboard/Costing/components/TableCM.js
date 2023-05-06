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
import useCurrencyExchange from '../../../../context/currency';

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

export default function BasicTable({ initialCurrency, switchCurrency, payload, qty }) {

  const { exchanger } = useCurrencyExchange();

  const sumSubTotal = () => {
    var sub = 0;
    sub = payload.reduce((prev, next) => {
      return prev + Math.floor((Math.round(qty/(next.work_center_info?.prod_capacity*0.85)) + next.work_center_info?.layout_produksi) * next.work_center_info?.cost_per_hour);
    }, 0)
    return Math.floor(sub);
  }

  const total = () => {
    let res = payload.reduce((prev, next) => {
      return prev + Math.floor((next.work_center_info?.overhead_cost + next.work_center_info?.cost_per_hour)/(next.work_center_info?.prod_capacity*0.85));
    }, 0)
    return Math.floor(res/payload.length);
  }

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto', margin: '2em 0'}}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="left">Manpower</TableCell>
            <TableCell align="right">Output Target in a day</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Workdays</TableCell>
            <TableCell align="right">CM Cost (each line)</TableCell>
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
               {row.work_center_info?.company_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.work_center_info?.labor_alloc}
              </TableCell>
              <TableCell align="right">{row.work_center_info?.prod_capacity * 0.85}</TableCell>
              <TableCell align="right">{qty}</TableCell>
              <TableCell align="right">{Math.round((qty/(row.work_center_info?.prod_capacity * 0.85)))+row.work_center_info?.layout_produksi}</TableCell>
              <TableCell align="right">{fCurrency(exchanger(row.work_center_info?.cost_per_hour, initialCurrency, switchCurrency), switchCurrency)}</TableCell>
              <TableCell align="right">{fCurrency(exchanger(Math.round((qty/(row.work_center_info?.prod_capacity*0.85))+row.work_center_info?.layout_produksi) * row.work_center_info?.cost_per_hour, initialCurrency, switchCurrency), switchCurrency)}</TableCell>
            </TableRow>
          ))}
          
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={7}>
                <BoxStyle />
                <Typography variant="body1"> Subtotal </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(exchanger(sumSubTotal(), initialCurrency, switchCurrency), switchCurrency) } </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={7}>
                <BoxStyle />
                <Typography variant="body1"> CM Cost </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(exchanger(total(), initialCurrency, switchCurrency), switchCurrency) } </Typography>
              </NoBorderCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}