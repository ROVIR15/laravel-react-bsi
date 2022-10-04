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
import { FormControl, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material';

import {fCurrency} from '../../../../utils/formatNumber';
import { sum } from 'lodash';

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

export default function BasicTable({ payload, approval }) {

  const [margin, setMargin] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const {total_labors, total_work_days, qty_to_produce, components_numbers, cm_cost, average_of_product_cost, total_cost_of_wc, total_overhead_cost, total_cost_of_items, additionalCost, average_add_cost, list_of_service} = payload;

  const rows = [
    createData('Work Days', `Spent ${total_work_days} days for working on the projects`, total_cost_of_wc),
    createData('Material', `${components_numbers} Types of material to be consumpted`, total_cost_of_items),
    createData('Overhead', `Additional cost to execute the project`, total_overhead_cost),
    createData('Additional Fee', `Cost occured when an order is placed such as ${list_of_service}`, additionalCost),
  ];

  function OfferingPrice(price){
    return fCurrency(price * ((1+margin/100)));
  }

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto'}}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
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
              key="total-cost"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> Total Costs Expected </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(sum([total_cost_of_wc, total_overhead_cost, total_cost_of_items, additionalCost]))} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="unit_produced"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> Unit Produced </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(qty_to_produce)} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="cost_of_material"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> Material Cost </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(average_of_product_cost)} </Typography>
              </NoBorderCell>
            </TableRow>

            <TableRow
              key="cm_cost"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> HDE Fee </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(average_add_cost)} </Typography>
              </NoBorderCell>
            </TableRow>

            <TableRow
              key="cm_cost"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> CM Cost </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(cm_cost)} </Typography>
              </NoBorderCell>
            </TableRow>

            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> Cost per Product </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {fCurrency(sum([cm_cost, average_of_product_cost, average_add_cost]))} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="margin"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> Margin </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <Input
            id="filled-adornment-amount"
            disabled={!approval}
            inputProps={{ style: {textAlign: 'end'}}}
            onChange={(e) => setMargin(e.target.value)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
          />
        </FormControl>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={3}>
                <BoxStyle />
                <Typography variant="inherit"> Offering Price </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {OfferingPrice(sum([cm_cost, average_of_product_cost, average_add_cost]))} </Typography>
              </NoBorderCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}