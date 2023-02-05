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
import { Stack, Typography } from '@mui/material';
import { fCurrency } from '../../../../utils/formatNumber';

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

export default function BasicTable({ payload, tax, currency }) {
  const sumSubTotal = () => {
    var sub = 0;
    payload.map(function (item) {
      sub = sub + item.qty * item.unit_price;
    });
    return fCurrency(Math.floor(sub), currency);
  };

  const total = () => {
    var sub = 0;
    payload.map(function (item) {
      sub = sub + item.qty * item.unit_price;
    });

    if(tax < 1) return fCurrency(Math.floor(sub), currency);
    else return fCurrency(Math.floor(sub) * (1+(tax/100)), currency);
  };
  return (
    <>
      <div className="wk_table wk_style1">
        <div className="wk_border">
          <div className="wk_table_responsive">
            <table>
              <thead>
                <tr>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">Item Name</th>
                  <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">Qty</th>
                  <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg">Price</th>
                  <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg wk_text_right">
                    Total
                  </th>
                  <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg wk_text_left">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload.map((row, index) => (
                  <tr>
                    <td className="wk_width_3">
                      {`${row.name} ${row.color === '1' ? '' : row.color} ${
                        row.size === '1' ? '' : `- ${row.size}`
                      }`}
                    </td>
                    <td className="wk_width_1">{row.qty}</td>
                    <td className="wk_width_2">{fCurrency(row.unit_price, currency)}</td>
                    <td className="wk_width_2 wk_text_right">
                      {fCurrency(Math.floor(row.qty * row.unit_price), currency)}
                    </td>
                    <td className="wk_width_2 wk_text_left">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="wk_invoice_footer wk_mb30 wk_m0_md">
        <div className="wk_left_footer" style={{ width: '38%' }}>
          {/* <p className="wk_mb2">
            Total Weight: <b className="wk_primary_color">40kg</b>
          </p>
          <p className="wk_m0">
            Shipment Terms: <b className="wk_primary_color">DDU</b>
          </p> */}
        </div>
        <div className="wk_right_footer">
          <table>
            <tbody>
              <tr>
                <td className="wk_width_3 wk_primary_color wk_border_none wk_bold">Subtotal</td>
                <td className="wk_width_3 wk_primary_color wk_text_right wk_border_none wk_bold">
                  {fCurrency(sumSubTotal(), currency)}
                </td>
              </tr>
              <tr>
                <td className="wk_width_3 wk_primary_color wk_border_none wk_pt0">
                  Tax <span className="wk_ternary_color">{tax}%</span>
                </td>
                <td className="wk_width_3 wk_primary_color wk_text_right wk_border_none wk_pt0">
                  {sumSubTotal() * (tax/100)}
                </td>
              </tr>
              <tr className="wk_border_top wk_border_bottom">
                <td className="wk_width_3 wk_border_top_0 wk_bold wk_f16 wk_primary_color">
                  Grand Total{' '}
                </td>
                <td className="wk_width_3 wk_border_top_0 wk_bold wk_f16 wk_primary_color wk_text_right">
                  {total()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
    // <TableContainer component={Paper} sx={{marginLeft: 'auto'}}>
    //   <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="left">#</TableCell>
    //         <TableCell>Product Name</TableCell>
    //         <TableCell align="right">Qty Order</TableCell>
    //         <TableCell align="right">Unit Price</TableCell>
    //         <TableCell align="right">Total</TableCell>
    //         <TableCell align="right">Keterangan</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {payload.map((row, index) => (
    //         <TableRow
    //           key={row.name}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell align="left">{index+1}</TableCell>
    //           <TableCell component="th" scope="row">
    //             {`${row.name} ${row.color === '1' ? '' : row.color} ${row.size === '1' ? '' : `- ${row.size}`}`}
    //           </TableCell>
    //           <TableCell align="right">{row.qty}</TableCell>
    //           <TableCell align="right">{fCurrency(row.unit_price)}</TableCell>
    //           <TableCell align="right">Rp. {fCurrency(Math.floor(row.qty * row.unit_price))}</TableCell>
    //           <TableCell align="right">{row.description}</TableCell>
    //         </TableRow>
    //       ))}

    //         <TableRow
    //           key="Total"
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <NoBorderCell align="right" colSpan={4}>
    //             <BoxStyle />
    //             <Typography variant="body1"> Subtotal </Typography>
    //           </NoBorderCell>
    //           <NoBorderCell align="right">
    //             <BoxStyle />
    //             <Typography variant="body1"> Rp. {sumSubTotal() } </Typography>
    //           </NoBorderCell>
    //         </TableRow>
    //         <TableRow
    //           key="Total"
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <NoBorderCell align="right" colSpan={4}>
    //             <BoxStyle />
    //             <Typography variant="body1"> Taxes </Typography>
    //           </NoBorderCell>
    //           <NoBorderCell align="right">
    //             <BoxStyle />
    //             <Typography variant="body1"> {`${11}%`} </Typography>
    //           </NoBorderCell>
    //         </TableRow>
    //         <TableRow
    //           key="Total"
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <NoBorderCell align="right" colSpan={4}>
    //             <BoxStyle />
    //             <Typography variant="h6"> Total </Typography>
    //           </NoBorderCell>
    //           <NoBorderCell align="right">
    //             <BoxStyle />
    //             <Typography variant="body1"> Rp. {total()} </Typography>
    //           </NoBorderCell>
    //         </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
