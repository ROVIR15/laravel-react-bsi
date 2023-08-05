import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import API from '../../../helpers';
import { fCurrency } from '../../../utils/formatNumber';
import { initial, isArray, isEmpty, isUndefined, sum } from 'lodash';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';

import moment from 'moment';
import { countWorkingDays } from './utils';
moment.locale('id');
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function PPICChart() {
  const [date, setDate] = useState([]);
  const [row, setRow] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [monthYear, setMonthYear] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [totalVal, setTotalVal] = useState({});

  moment.locale('id');

  const handleGetReport = () => {
    try {
      if (isEmpty(monthYear)) throw new Error('cannot be empty');
      API.getOSRPPIC(`?monthYear=${monthYear}`, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('failed to load report');
        else {
          setRow(res.data);
          console.log(res.data);
          // setTotalVal(total_array);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleMonthYear = (event) => {
    setMonthYear(event.target.value);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Paper style={{ padding: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField type="month" label="Bulan" onChange={handleMonthYear} />
          <Button variant="outlined" onClick={handleGetReport}>
            Search
          </Button>
        </Stack>
      </Paper>
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
              <TableCell
                className="wk_primary_color wk_gray_bg"
                align="center"
                colSpan={13}
              >
                Bulan
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="wk_primary_color wk_gray_bg">Nama Buyer</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Gambar</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Nama Pesanan</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Order Qty</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Line yg Digunakan</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Jumlah Mesin</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Tanggal Mulai Produksi</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Tanggal Selesai Produksi</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Target Kecepatan Harian</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Jumlah Hari Kerja</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg">Output Saat Ini</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Januari</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Februari</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Maret</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">April</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Mei</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Juni</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Juli</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Agustus</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">September</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Oktober</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">November</TableCell>
              <TableCell className="wk_primary_color wk_black_bg">Desember</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((_row) => (
              <TableRow
                key={row.sold_to}
                sx={{
                  '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                }}
              >
                <TableCell component="th" align="left">
                  {_row.buyer_name}
                </TableCell>
                <TableCell component="th" align="left">
                  <img src={_row.imageUrl} alt="Image" />
                </TableCell>
                <TableCell component="th" align="left">
                  {_row.sales_order_name}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row.order_qty} pcs`}
                </TableCell>
                <TableCell component="th" align="left">
                  {_row.line}
                </TableCell>
                <TableCell component="th" align="left">
                  {_row.number_machines}
                </TableCell>
                <TableCell component="th" align="left">
                  {moment(_row.line_start_date).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell component="th" align="left">
                  {moment(_row.line_end_date).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${_row.anticipated_pcs_per_line_output} pcs/hari`}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${countWorkingDays(_row.line_start_date, _row.line_end_date)} hari`}
                </TableCell>
                <TableCell component="th" align="left">
                  {`${0} pcs`}
                </TableCell>
                {_row.expected_output.map((_d) => (
                  <TableCell component="th" align="right">
                    {_d.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
