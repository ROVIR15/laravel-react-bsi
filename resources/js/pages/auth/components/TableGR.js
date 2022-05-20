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

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 12
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(
  name,
  qty_order,
  qty_on_receipt,
  qty_received
) {
  return { name, qty_order, qty_on_receipt, qty_received};
}

const rows = [
  createData('Product A', 200, 150, 100),
  createData('Product B', 200, 120, 100),
  createData('Product C', 200, 130, 100),
  createData('Product D', 200, 190, 10)
];

export default function BasicTable() {

  const total_delivery = () => {
    var total = 0;
    rows.map(function({qty_on_receipt}){ total = total + qty_on_receipt});
    return total;
  } 

  const rejected = () => {
    var total = 0;
    rows.map(function({qty_on_receipt, qty_received}){ total = total + (qty_on_receipt - qty_received)});
    return total;
  }

  const total_received = () => {
    var total = 0;
    rows.map(function({qty_received}){ total = total + qty_received});
    return total;
  }

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto'}}>
      <Table sx={{ minWidth: 120 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Qty Ordered</TableCell>
            <TableCell align="right">Qty Delivered</TableCell>
            <TableCell align="right">Qty Received</TableCell>
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
              <TableCell align="right">{row.qty_order}</TableCell>
              <TableCell align="right">{row.qty_on_receipt}</TableCell>
              <TableCell align="right">{row.qty_received}</TableCell>
            </TableRow>
          ))}
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={4}>
                <BoxStyle />
                <Typography variant="body1"> Total Delivery </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {total_delivery() } </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={4}>
                <BoxStyle />
                <Typography variant="body1"> Subtotal Received </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {total_received()} </Typography>
              </NoBorderCell>
            </TableRow>
            <TableRow
              key="Total"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <NoBorderCell align="right" colSpan={4}>
                <BoxStyle />
                <Typography variant="h6"> Rejected </Typography>
              </NoBorderCell>
              <NoBorderCell align="right">
                <BoxStyle />
                <Typography variant="body1"> {rejected()} </Typography>
              </NoBorderCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}