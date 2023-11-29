import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import moment from 'moment';
import { isEmpty, isNull } from 'lodash';
import { countWorkingDays } from '../../pages/dashboard/OSR/utils';
import API from '../../helpers';

function numericMonthToName(numericMonth) {
  if (numericMonth >= 1 && numericMonth <= 12) {
    const date = new Date(2000, numericMonth - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  } else {
    return 'Invalid';
  }
}

export default function OSRPPIC() {
  const [OSRRows, setOSRRows] = useState([]);
  const [month, setMonth] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      let dateNow = new Date();
      let monthYear = moment(dateNow).format('YYYY-MM');
      setMonth(dateNow.getMonth() + 1);
      API.getOSRVerHelmi(`?monthYear=${monthYear}`, function (res) {
        if (!res) return;
        else {
          setOSRRows(res.data);

          if (!isEmpty(res.data)) {
            let _total = res.data.reduce(function (init, next) {
              let qty = next.filter((item) => item.value > 0);
              return init + parseInt(qty);
            }, 0);
            setTotal(_total);
          }
        }
      });
    } catch (error) {
      alert('Error get osr');
    }
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table
        className="wk_table wk_style1 wk_border"
        sx={{ minWidth: 650, margin: 2 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell className="wk_primary_color wk_gray_bg" colSpan={10} />
            <TableCell className="wk_primary_color wk_gray_bg" align="center" colSpan={13}>
              Bulan
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="wk_primary_color wk_gray_bg">No</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Sales Order ID</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Nama Buyer</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Gambar</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Nama Pesanan</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Order Qty</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Tanggal Terima PO</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Fabric Mills</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Fabric ETD</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Garment Delivery</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Line yg Digunakan</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Jumlah Mesin</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Tanggal Mulai Produksi</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Tanggal Selesai Produksi</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Target Kecepatan Harian</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Jumlah Hari Kerja</TableCell>
            <TableCell className="wk_primary_color wk_gray_bg">Output Saat Ini</TableCell>
            <TableCell className="wk_primary_color wk_black_bg">
              {numericMonthToName(month)}
            </TableCell>
            <TableCell className="wk_primary_color wk_gray_bg"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isEmpty(OSRRows) ? (
            OSRRows.map((_row, index) => (
              <TableRow
                key={_row.sold_to}
                sx={{
                  '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                }}
              >
                <TableCell component="th" align="left">
                  {index + 1}
                </TableCell>
                <TableCell component="th" align="left">
                  {isNull(_row?.sales_order_id) ? null : (
                    <Typography
                      variant="body1"
                      component="a"
                      href={`/dashboard/order/sales-order/${_row?.sales_order_id}`}
                    >
                      {`SO-${_row?.sales_order_id}`}
                    </Typography>
                  )}
                </TableCell>
                <TableCell component="th" align="left">
                  {_row?.buyer_name}
                </TableCell>
                <TableCell component="th" align="left">
                  <img src={_row?.imageUrl} alt="Image" style={{ height: '112px' }} />
                </TableCell>
                <TableCell component="th" align="left">
                  {_row?.sales_order_name}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row?.order_qty} pcs`}
                </TableCell>
                <TableCell component="th" align="left">
                  {moment(_row?.garment_delivery_date).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row?.fabric_mill}`}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row?.fabric_etd}`}
                </TableCell>
                <TableCell component="th" align="left">
                  {moment(_row?.date_po_recieved).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell component="th" align="left">
                  {_row?.line}
                </TableCell>
                <TableCell component="th" align="left">
                  {_row?.number_machines}
                </TableCell>
                <TableCell component="th" align="left">
                  {moment(_row?.line_start_date).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell component="th" align="left">
                  {moment(_row?.line_end_date).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row?.anticipated_pcs_per_line_output} pcs/hari`}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${countWorkingDays(_row?.line_start_date, _row?.line_end_date)} hari`}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row?.output} pcs`}
                </TableCell>
                {_row?.expected_output.map((_d) => {
                  if (_d?.value > 0) {
                    return (
                      <TableCell component="th" align="right">
                        {_d.value}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))
          ) : (
            <TableCell>No Data</TableCell>
          )}
          <TableRow
            key={'Total'}
            sx={{
              '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
            }}
          >
            <TableCell component="th" align="right" colSpan={16}>
              <b>Total</b>
            </TableCell>{' '}
            <TableCell component="th" align="left">
              {`${total} pcs`}
            </TableCell>{' '}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
