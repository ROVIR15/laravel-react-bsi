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

function createData(name, qty_order, qty_on_receipt, qty_received) {
  return { name, qty_order, qty_on_receipt, qty_received };
}

const rows = [
  createData('Product A', 200, 150, 100),
  createData('Product B', 200, 120, 100),
  createData('Product C', 200, 130, 100),
  createData('Product D', 200, 190, 10)
];

export default function BasicTable({ payload }) {
  const total_delivery = () => {
    var total = payload.reduce((initial, { deliv_qty }) => initial + deliv_qty, 0);
    return total;
  };

  const rejected = () => {
    var total = 0;
    payload.map(function ({ qty_on_receipt, qty_received }) {
      total = total + (qty_on_receipt - qty_received);
    });
    return total;
  };

  const total_received = () => {
    var total = 0;
    payload.map(function ({ qty_received }) {
      total = total + qty_received;
    });
    return total;
  };

  return (
    <div className="wk_table wk_style1">
      <div className="wk_border">
        <div className="wk_table_responsive">
          <table>
            <thead>
              <tr>
                <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">#</th>
                <th className="wk_width_8 wk_semi_bold wk_primary_color wk_gray_bg">Item Name</th>
                <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg wk_text_right">Qty</th>
              </tr>
            </thead>
            <tbody>
              {payload.map((row, index) => (
                <tr>
                  <td className="wk_width_1">{index+1}</td>
                  <td className="wk_width_8">{`${row.name} ${row.color} - ${row.size}`}</td>
                  <td className="wk_width_2 wk_text_right">{row.deliv_qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="wk_invoice_footer wk_mb30 wk_m0_md">
        <div className="wk_left_footer" style={{width: '58%'}}></div>
        <div className="wk_right_footer">
          <table>
            <tbody>
              <tr>
                <td className="wk_width_3 wk_primary_color wk_border_none wk_bold">Grand Total</td>
                <td className="wk_width_3 wk_primary_color wk_text_right wk_border_none wk_bold">
                  {total_delivery()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
