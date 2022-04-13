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

import {fCurrency} from '../../../../utils/formatNumber';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 6
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(
  name,
  details,
  total_cost
) {
  return { name, details, total_cost};
}

export default function BasicTable({ payload }) {

  const {total_labor, qty_to_produce, many_components, total_cost, total_overhead, total_goods} = payload;

  const rows = [
    createData('Labor', `${total_labor} Labor works on the projects`, total_cost),
    createData('Material', `${many_components} Types of material to be consumpted`, total_goods),
    createData('Overhead', `Additional cost to execute the project`, total_overhead),
  ];

  function total(_param1, _param2, _param3){
    return parseInt(_param1) + parseInt(_param2) + parseInt(_param3);
  }

  function costPerProduct(_param1, _param2, _param3, qty){
    return fCurrency(parseInt(total(_param1, _param2, _param3)/parseInt(qty)))
  }

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto'}}>
      <Table sx={{ minWidth: 120 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Cost Breakdown</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="right">Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index+1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.details}</TableCell>
              <TableCell align="right">{fCurrency(row.total_cost)}</TableCell>
            </TableRow>
          ))}
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="body1"> Total Costs Expected </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(total(total_cost, total_overhead, total_goods))} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="body1"> Unit Produced </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(qty_to_produce)} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="body1"> Cost per Product </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {costPerProduct(total_cost, total_overhead, total_goods, qty_to_produce)} </Typography>
              </NoBorderCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}