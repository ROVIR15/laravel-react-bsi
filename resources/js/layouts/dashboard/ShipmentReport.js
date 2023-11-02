import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Paper
} from '@mui/material';
import API from '../../helpers';
import { isEmpty, isNull } from 'lodash';
import moment from 'moment';

export default function ShipmentReport() {
  const [currentMonth, setCurrentMonth] = useState([]);
  const [prevMonth, setPrevMonth] = useState([]);

  const [currentTotal, setCurrentTotal] = useState({ qty_order_sum: 0, qty_delivery_sum: 0 });
  const [prevTotal, setPrevTotal] = useState({ qty_order_sum: 0, qty_delivery_sum: 0 });
  const [month, setMonth] = useState(0);

  useEffect(() => {
    try {
      let dateNow = new Date();
      let monthYear = moment(dateNow).format('YYYY-MM');
      setMonth(dateNow.getMonth() + 1);
      API.getOSRShipment(`?monthYear=${monthYear}`, function (res) {
        if (!res) return;
        else {
          setCurrentMonth(res.data);
          setPrevMonth(res.data_prev);

          if (!isEmpty(res.data)) {
            let total_current_month = res.data.reduce(
              function (init, next) {
                return {
                  ...init,
                  qty_order_sum: init.qty_order_sum + parseInt(next.order_qty),
                  qty_delivery_sum: init.qty_delivery_sum + parseInt(next.total_delivery_qty)
                };
              },
              { qty_order_sum: 0, qty_delivery_sum: 0 }
            );

            setCurrentTotal(total_current_month);
          }

          if (!isEmpty(res.data_prev)) {
            let total_prev_month = res.data_prev.reduce(
              function (init, next) {
                return {
                  ...init,
                  qty_order_sum: init.qty_order_sum + parseInt(next.order_qty),
                  qty_delivery_sum: init.qty_delivery_sum + parseInt(next.total_delivery_qty)
                };
              },
              { qty_order_sum: 0, qty_delivery_sum: 0 }
            );

            setPrevTotal(total_prev_month);
          }
        }
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <Typography variant="h5" padding={2}>
          Laporan Pengiriman Bulan Ini
        </Typography>
        <TableContainer component={Paper}>
          <Table
            className="wk_table wk_style1 wk_border"
            sx={{ margin: 2 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell className="wk_primary_color wk_gray_bg">Sales Order ID</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Sales Order</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Garment Delivery</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Qty Order</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Qty Terkirim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(currentMonth) ? (
                currentMonth?.map((_row) => (
                  <TableRow
                    key={_row.id}
                    sx={{
                      '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                    }}
                  >
                    <TableCell component="th" align="left">
                      {isNull(_row?.id) ? null : (
                        <Typography
                          variant="body1"
                          component="a"
                          href={`/dashboard/order/sales-order/${_row?.id}`}
                        >
                          {`SO-${_row?.id}`}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {_row?.sales_order_name}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {_row?.delivery_date}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {`${_row?.order_qty} pcs`}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {`${_row?.total_delivery_qty} pcs`}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell>No Data</TableCell>
              )}
              <TableRow
                key="total_current"
                sx={{
                  '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                }}
              >
                <TableCell component="th" align="right" colSpan={3}>
                  <b>Total</b>
                </TableCell>{' '}
                <TableCell component="th" align="left">
                  {`${currentTotal?.qty_order_sum} pcs`}
                </TableCell>{' '}
                <TableCell component="th" align="left">
                  {`${currentTotal?.qty_delivery_sum} pcs`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography variant="h5" padding={2}>
          Laporan Sales Order yang Tertunda
        </Typography>
        <TableContainer component={Paper}>
          <Table
            className="wk_table wk_style1 wk_border"
            sx={{ minWidth: 650, margin: 2 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell className="wk_primary_color wk_gray_bg">Sales Order ID</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Sales Order</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Garment Delivery</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Qty Order</TableCell>
                <TableCell className="wk_primary_color wk_gray_bg">Qty Terkirim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(prevMonth) ? (
                prevMonth?.map((_row) => (
                  <TableRow
                    key={_row.id}
                    sx={{
                      '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                    }}
                  >
                    <TableCell component="th" align="left">
                      {isNull(_row?.id) ? null : (
                        <Typography
                          variant="body1"
                          component="a"
                          href={`/dashboard/order/sales-order/${_row?.id}`}
                        >
                          {`SO-${_row?.id}`}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {_row?.sales_order_name}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {_row?.delivery_date}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {`${_row?.order_qty} pcs`}
                    </TableCell>
                    <TableCell component="th" align="left">
                      {`${_row?.total_delivery_qty} pcs`}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell>No Data</TableCell>
              )}
              <TableRow
                key="total_prev"
                sx={{
                  '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                }}
              >
                <TableCell component="th" align="right" colSpan={3}>
                  <b>Total</b>
                </TableCell>{' '}
                <TableCell component="th" align="left">
                  {`${prevTotal?.qty_order_sum} pcs`}
                </TableCell>{' '}
                <TableCell component="th" align="left">
                  {`${prevTotal?.qty_delivery_sum} pcs`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
