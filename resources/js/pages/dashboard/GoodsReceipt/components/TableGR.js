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
import { isEmpty, parseInt } from 'lodash';

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
  const [summary, setSummary] = React.useState({
    total_delivery: 0,
    difference: 0,
    total_received: 0
  });

  React.useEffect(() => {
    if (isEmpty(payload)) return;
    else {
      let data_summary = payload.reduce(
        (initial, next) => {
          console.log(next)
          var _qty_shipped = parseInt(next.qty_shipped); // qty on hand
          var _deliv_qty = parseInt(next.qty); // qty sent by supplier

          return {
            ...initial,
            total_delivery: initial.total_delivery + _deliv_qty,
            difference: initial.difference + (_qty_shipped - _deliv_qty),
            total_received: initial.total_received + _qty_shipped
          };
        },
        {
          total_delivery: 0,
          difference: 0,
          total_received: 0
        }
      );

      setSummary(data_summary);
    }
  }, [payload]);

  return (
    <Stack direction="column" spacing={2}>
      <div className="wk_table wk_style1">
        <div className="wk_border">
          <div className="wk_table_responsive">
            <table style={{ fontSize: '11px' }}>
              <thead>
                <tr>
                  <th className="wk_width_2 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    SKU ID
                  </th>
                  <th className="wk_width_3 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Item Name
                  </th>
                  <th className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Qty Dipesan
                  </th>
                  <th className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Qty Dikirim
                  </th>
                  <th className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Qty Diterima
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload.map((row, index) => (
                  <tr>
                    <td className="wk_width_2 wk_padd_8_20">{row?.sku_id}</td>
                    <td className="wk_width_3 wk_padd_8_20">{row?.item_name}</td>
                    <td className="wk_width_1 wk_padd_8_20">{`${row.qty_order} ${row.satuan}`}</td>
                    <td className="wk_width_1 wk_padd_8_20">{`${row.qty} ${row.satuan}`}</td>
                    <td className="wk_width_1 wk_padd_8_20">{`${row.qty_shipped} ${row.satuan}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="wk_table wk_style1">
        <div className="wk_border">
          <div className="wk_table_responsive">
            <table style={{ fontSize: '11px' }}>
              <thead>
                <tr>
                  <th className="wk_width_3 wk_text_center wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Total Pengiriman
                  </th>
                  <th className="wk_width_3 wk_text_center wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Total Diterima
                  </th>
                  <th className="wk_width_3 wk_text_center wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                    Selisih
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="wk_width_3 wk_text_center wk_padd_8_20">{`${summary?.total_delivery}`}</td>
                  <td className="wk_width_3 wk_text_center wk_padd_8_20">{`${summary?.total_received}`}</td>
                  <td className="wk_width_3 wk_text_center wk_padd_8_20">{`${summary?.difference}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Stack>
  );
}
