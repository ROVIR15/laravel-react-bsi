import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { StyledTableCell as TableCell } from './components/TableCell';

import { fCurrency } from '../../../../utils/formatNumber';
import { titleCase } from '../../../../utils/formatCase';

import downloadIcon from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

import { __payload1 } from '../data-testing/mutasi_bahan';
import { __payload2 } from '../data-testing/mutasi_barang_hasil_produksi';
import { isEmpty, values } from 'lodash';

import API from '../../../../helpers';

import { generalizeSKU } from './utils';

const names = ['Bahan Baku', 'Skrap'];

function Inbound() {
  const [searchParams] = useSearchParams();

  const xlsRef = useRef(null);
  const [payloadData, setPayloadData] = useState([]);

  // get pathname
  const { pathname } = useLocation();
  const pagename = pathname.split('/')[3]?.replaceAll('-', ' ');

  const [valueOfSelect, setValueofSelect] = React.useState('');

  // range of date
  const [values, setValues] = useState({
    start_date: '',
    end_date: '',
    category: 'Bahan Baku'
  });

  const handleSelectChange = (event) => {
    setValues({ ...values, category: event.target.value });
  };

  const handleGo = () => {
    try {
      let cat = searchParams.get('cat');

      if (isEmpty(values.start_date) || isEmpty(values.start_date) || isEmpty(values.category))
        new Error('Error processing your request!');

      let param = `?fromDate=${rangeDate.start_date}&thruDate=${rangeDate.end_date}&cat=${cat}`;

      API.getReportMutasi_alt(param, function (res) {
        if (!res) return;
        if (!res.data) new Error('Error processing request');
        else {
          // let _res = rearrange_data_material_transfer(res.data);
          setPayloadData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  function exportToExcel(tableID, filename = '') {
    let downloadLink;
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.getElementById(tableID);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }

  const handleDownload = React.useCallback(() => {
    let downloadLink;
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = xlsRef.current;

    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    const filename = 'laporan mutasi barang' + '.xls';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }, [xlsRef]);

  /** Handle Pagination */

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {

    if(searchParams.get('cat') === 'bahan_jadi'){
      setPayloadData(__payload2)
    } else {
      setPayloadData(__payload1)
    }
    // handleGo();
  }, []);

  const [rangeDate, setRangeDate] = useState({
    start_date: '2023-05-01',
    end_date: '2023-05-15'
  });

  /** Handle Date Changes */
  const handleChangeDate = (e) => {
    const {
      target: { name, value }
    } = e;
    setRangeDate({ ...rangeDate, [name]: value });
  };

  return (
    <div>
      <Paper sx={{ marginBottom: '1em', paddingY: '1em', paddingX: '1.25em' }}>
        <Grid container direction="column" spacing={2}>
          {/* Top row contain title and button to export and download */}
          <Grid item>
            <Stack direction="row" justifyContent="space-between" sx={{ marginX: '1em' }}>
              <Typography variant="h5">{`${titleCase(pagename)}`}</Typography>
              <Button
                variant="contained"
                startIcon={<Icon icon={downloadIcon} />}
                onClick={handleDownload}
              >
                Download
              </Button>
            </Stack>
          </Grid>

          <Grid item>
            <Stack direction="row" justifyContent="space-between">
              {/* Left Side contains button to set start and end date also category */}
              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  label="Start Date"
                  type="date"
                  name="start_date"
                  value={rangeDate.start_date}
                  onChange={handleChangeDate}
                />
                <TextField
                  size="small"
                  label="End Date"
                  type="date"
                  name="end_date"
                  value={rangeDate.end_date}
                  onChange={handleChangeDate}
                  sx={{ minWidth: '10em' }}
                />
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  size="small"
                  value={values.category}
                  label="Kategori"
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Name" />}
                  sx={{ minWidth: '10em' }}
                  // MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>

              <Button onClick={handleGo}> Go </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ paddingY: '1em', paddingX: '1.25em' }}>
        <Stack direction="column" spacing={2}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={payloadData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '& .MuiTablePagination-selectLabel': {
                margin: 'auto'
              },
              '& .MuiTablePagination-displayedRows': {
                margin: 'auto'
              }
            }}
          />

          <TableContainer sx={{ minWidth: 800 }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: 'rgba(241, 243, 244, 1)' }}>
                <TableRow>
                  <TableCell>Kode Barang</TableCell>
                  <TableCell>Nama Item</TableCell>
                  <TableCell>Kategori Barang</TableCell>
                  <TableCell>Satuan</TableCell>
                  <TableCell>Saldo Awal</TableCell>
                  <TableCell>Jumlah Pemasukan Barang</TableCell>
                  <TableCell>Jumlah Pengeluaran Barang</TableCell>
                  <TableCell>Saldo Akhir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payloadData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => (
                    <TableRow>
                      <TableCell>
                        {row.sku_barang}
                        {/* {generalizeSKU(row.goods_id, row.product_feature_id, row.product_id)} */}
                      </TableCell>
                      <TableCell>{row.item_name}</TableCell>
                      <TableCell>{row.category_name}</TableCell>
                      <TableCell>{row.unit_measurement}</TableCell>
                      <TableCell>{row.initial_stock}</TableCell>
                      <TableCell>{row.qty_pemasukan}</TableCell>
                      <TableCell>{row.qty_pengeluaran}</TableCell>
                      <TableCell>{row.final_stock}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>

      <div ref={xlsRef} style={{ display: 'none' }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Laporan Mutasi Barang</Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <div>
                <Typography variant="p" style={{ marginRight: '3em' }}>
                  Dari Tanggal
                </Typography>
                <Typography variant="p">{`: ${values.start_date}`}</Typography>
              </div>

              <div>
                <Typography variant="p" style={{ marginRight: '1.4em' }}>
                  Sampai Tanggal
                </Typography>
                <Typography variant="p">{`: ${values.end_date}`}</Typography>
              </div>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <div className="wk_table wk_style1">
              <div className="wk_border">
                <div className="wk_table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Kode Barang
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Nama Barang
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Kategori
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">
                          Satuan
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">
                          Saldo Awal
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">
                          Jumlah Pemasukan Barang
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">
                          Jumlah Pengeluaran Barang
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">
                          Saldo Akhir
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payloadData?.map((row, index) => (
                        <tr>
                          <td className="wk_width_3">
                            {generalizeSKU(row.goods_id, row.product_feature_id, row.product_id)}
                          </td>
                          <td className="wk_width_2">{row.item_name}</td>
                          <td className="wk_width_2">{row.category_name}</td>
                          <td className="wk_width_3">{row.unit_measurement}</td>
                          <td className="wk_width_1">{row.initial_stock}</td>
                          <td className="wk_width_1">{row.qty_pemasukan}</td>
                          <td className="wk_width_1">{row.qty_pengeluaran}</td>
                          <td className="wk_width_1">{row.final_stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Inbound;