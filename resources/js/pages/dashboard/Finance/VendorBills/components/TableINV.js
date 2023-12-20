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

import { terbilang } from '../../../../../helpers/data/terbilang.min';

import { fCurrency } from '../../../../../utils/formatNumber';
import { number } from 'yup';
import { isEqual, isNaN } from 'lodash';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 12
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(name, qty, unit_price) {
  return { name, qty, unit_price };
}

function valueType(param, param2) {
  let type = param.toLowerCase();
  if (type === 'percentage') return `${param2} %`;
  if (type === 'number') return `Rp. ${fCurrency(param2)}`;
  else return null;
}

const rows = [
  createData('Product A', 200, 20000),
  createData('Product B', 200, 20000),
  createData('Product C', 200, 20000),
  createData('Product D', 200, 20000)
];

export default function BasicTable({ payload, terms, tax }) {
  const total = () => {
    let sub_total = subTotal() * (1 + tax / 100);
    let sub_total2 = terms.reduce(function (initial, next) {
      let type = next.value_type.toLowerCase();
      if (type === 'percentage') return initial * (1 + next.term_value / 100);
      if (type === 'number') return initial + next.term_value;
      else return number;
    }, sub_total);
    return sub_total2.toFixed(0);
  };

  const subTotal = () => {
    return payload.reduce((initial, next) => {
      return initial + next.qty * next.amount;
    }, 0);
  };

  const total_price = (qty, amount) => {
    let total = qty * amount;
    return total;
  };

  const terbilang2 = () => {
    let value = parseInt(total());
    if (isNaN(value) || isEqual(value, 0)) return '-';
    else return terbilang(value);
  };

  return (
    <TableContainer component={Paper} sx={{ marginLeft: 'auto' }}>
      <Table
        className="wk_table wk_style1 wk_border"
        sx={{ minWidth: 120 }}
        size="small"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell className="wk_primary_color wk_gray_bg" align="left">
              #
            </TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Product Name</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg" align="right">
              Qty Ordered
            </TableCell>
            <TableCell className="wk_primary_color wk_gray_bg" align="right">
              Unit Price
            </TableCell>
            <TableCell className="wk_primary_color wk_gray_bg" align="right">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payload.map((row, index) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">
                {`${row.name}`}
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{fCurrency(total_price(row.qty, row.amount))}</TableCell>
              <TableCell align="right">{fCurrency(row.amount)}</TableCell>
            </TableRow>
          ))}
          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={4}>
              <BoxStyle />
              <Typography variant="body1"> Subtotal </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">Rp. {fCurrency(subTotal())} </Typography>
            </NoBorderCell>
          </TableRow>
          {terms.map(function (item) {
            return (
              <TableRow
                key="item.terms_description"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <NoBorderCell align="right" colSpan={4}>
                  <BoxStyle />
                  <Typography variant="body1"> {item.term_description} </Typography>
                </NoBorderCell>
                <NoBorderCell align="right">
                  <BoxStyle />
                  <Typography variant="body1">
                    {valueType(item.value_type, item.term_value)}
                  </Typography>
                </NoBorderCell>
              </TableRow>
            );
          })}
          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={4}>
              <BoxStyle />
              <Typography variant="body1"> Taxes </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1"> {`${tax}%`} </Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={4}>
              <BoxStyle />
              <Typography variant="h6"> Grand Total </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">{fCurrency(total())} </Typography>
            </NoBorderCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box marginTop={2}>
        <Typography variant="h6"> Terbilang </Typography>
        <Typography variant="body2" style={{ fontStyle: 'italic' }}>{`${terbilang2(
          total()
        )} Rupiah`}</Typography>
      </Box>

      <div style={{height: '4px'}}/>

    </TableContainer>
  );
}
