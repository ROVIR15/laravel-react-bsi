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
import { useLocation } from 'react-router-dom';

import { fCurrency } from '../../../../utils/formatNumber';
import { titleCase } from '../../../../utils/formatCase';

import downloadIcon from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

import { __payload } from '../data-testing/pengeluaran_barang';
import { StyledTableCell as TableCell } from './components/TableCell';

import API from '../../../../helpers';
import { isEmpty } from 'lodash';

import { generalizeSKU, rearrange_data_out } from './utils';
import moment from 'moment';
import { strPadLeft } from '../../../../utils/formatProduct';

const names = ['Bahan Baku', 'Barang Jadi', 'Skrap', 'WIP', 'Mesin & Alat Tulis'];

function Inbound() {
  const xlsRef = useRef(null);
  const [payloadData, setPayloadData] = useState([]);

  // get pathname
  const { pathname } = useLocation();
  const pagename = pathname.split('/')[3].replaceAll('-', ' ');

  const [valueOfSelect, setValueofSelect] = React.useState('');

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
    const filename = 'laporan barang keluar' + '.xls';

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

  //
  function getData() {
    if (isEmpty(rangeDate.start_date) && isEmpty(rangeData.end_date)) return;
    let param = `?fromDate=${rangeDate.start_date}&thruDate=${rangeDate.end_date}`;
    try {
      API.getOutboundMaterial(param, (res) => {
        if (!res) return;
        if (isEmpty(res.data)) throw new Error('Request error!');
        else {
          setPayloadData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  const [rangeDate, setRangeDate] = useState({
    start_date: moment().subtract(7, 'd').format('YYYY-MM-DD'),
    end_date: moment().format('YYYY-MM-DD')
  });

  /** Handle Date Changes */
  const handleChangeDate = (e) => {
    const {
      target: { name, value }
    } = e;
    setRangeDate({ ...rangeDate, [name]: value });
  };

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
    getData();
  }, []);

  return (
    <div>
      <Paper sx={{ marginBottom: '1em', paddingY: '1em', paddingX: '1.25em' }}>
        <Grid container direction="column" spacing={2}>
          {/* Top row contain title and button to export and download */}
          <Grid item>
            <Stack direction="row" justifyContent="space-between" sx={{ marginX: '1em' }}>
              <Typography variant="h5">{titleCase(pagename)}</Typography>
              <Button
                variant="contained"
                onClick={handleDownload}
                startIcon={<Icon icon={downloadIcon} />}
              >
                {' '}
                Download{' '}
              </Button>
            </Stack>
          </Grid>

          <Grid item>
            <Stack direction="row" justifyContent="space-between">
              {/* Left Side contains button to set start and end date also category */}
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Start Date"
                  type="date"
                  name="start_date"
                  value={rangeDate.start_date}
                  onChange={handleChangeDate}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="End Date"
                  type="date"
                  name="end_date"
                  value={rangeDate.end_date}
                  onChange={handleChangeDate}
                />
              </Stack>

              <Button onClick={getData}> Go </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ paddingY: '1em', paddingX: '1.25em' }}>
        <Stack direction="column" spacing={2}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={__payload?.length}
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
                  <TableCell colSpan={1}> </TableCell>
                  <TableCell align="center" colSpan={2}>
                    PEB
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                    Bukti Pengeluaran Barang
                  </TableCell>
                  <TableCell colSpan={9}> </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>No</TableCell>
                  {/*  */}
                  <TableCell>Nomor</TableCell>
                  <TableCell>Tanggal</TableCell>
                  {/*  */}
                  <TableCell>Nomor</TableCell>
                  <TableCell>Tanggal</TableCell>
                  {/*  */}
                  <TableCell>Penerima</TableCell>
                  <TableCell>Negara Tujuan</TableCell>
                  <TableCell>Kode BB</TableCell>
                  <TableCell>Nama Barang</TableCell>
                  {/* <TableCell>Category Name</TableCell> */}
                  <TableCell>Satuan</TableCell>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>Mata Uang</TableCell>
                  <TableCell>Nilai Barang</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payloadData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow>
                      <TableCell>{row?.id}</TableCell>
                      <TableCell>{row?.export_document_number}</TableCell>
                      <TableCell>{row?.export_document_date}</TableCell>
                      {/* <TableCell>{row?.serial_number}</TableCell> */}
                      <TableCell>{`OUTSHIP-${strPadLeft(row?.sales_order_id, 4, 0)}-${strPadLeft(row?.shipment_id, 4, 0)}`} </TableCell>
                      <TableCell>{row?.shipment_date} </TableCell>
                      <TableCell>{row.buyer_name}</TableCell>
                      <TableCell>{row.country}</TableCell>
                      <TableCell>
                        {generalizeSKU(row.goods_id, row.product_feature_id, row.product_id)}
                      </TableCell>
                      <TableCell>{row.item_name}</TableCell>
                      <TableCell>{row.unit_measurement}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>{row.currency === 2 ? 'Rupiah' : 'Dollar US'}</TableCell>
                      <TableCell>{fCurrency(row.unit_price, 'id')}</TableCell>
                      {/* <TableCell>{fCurrency(row.valuation, 'id')}</TableCell> */}
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
            <Typography variant="h3">{titleCase(pagename)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="column" spacing={2}>
              <div>
                <Typography variant="p" style={{ marginRight: '3em' }}>
                  Dari Tanggal
                </Typography>
                <Typography variant="p">{`: ${rangeDate.start_date}`}</Typography>
              </div>

              <div>
                <Typography variant="p" style={{ marginRight: '1.4em' }}>
                  Sampai Tanggal
                </Typography>
                <Typography variant="p">{`: ${rangeDate.end_date}`}</Typography>
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
                        <th className="wk_text_center" colSpan={1}></th>
                        <th
                          className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                          colSpan={2}
                        >
                          PEB
                        </th>
                        <th
                          className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                          colSpan={2}
                        >
                          Bukti Pengeluaran
                        </th>
                      </tr>

                      <tr>
                        <th className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                          No
                        </th>
                        <th className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                          Nomor Dokumen
                        </th>
                        <th className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                          Tanggal
                        </th>

                        <th className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                          Nomor Dokumen
                        </th>
                        <th className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                          Tanggal
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Penerima
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Negara Tujuan
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Kode BB
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Nama Barang
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Satuan
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Jumlah
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Mata Uang
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">
                          Nilai Barang
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payloadData.map((row, index) => (
                        <tr>
                          <td className="wk_width_2">{row?.id}</td>
                          <td className="wk_width_2">{row?.export_document_number}</td>
                          <td className="wk_width_2">{row?.export_document_date}</td>
                          <td className="wk_width_2">{`OBSHIP-${row?.order_id}-${row?.shipment_id}`} </td>
                          <td className="wk_width_2">{row?.shipment_date} </td>
                          <td className="wk_width_2">{row.buyer_name}</td>
                          <td className="wk_width_2">{row.country}</td>
                          <td className="wk_width_2">
                            {generalizeSKU(row.goods_id, row.product_feature_id, row.product_id)}
                          </td>
                          <td className="wk_width_2">{row.item_name}</td>
                          <td className="wk_width_2">{row.unit_measurement}</td>
                          <td className="wk_width_2">{row.qty}</td>
                          <td className="wk_width_2">{row.currency === 2 ? 'Rupiah' : 'Dollar US'}</td>
                          <td className="wk_width_2">{fCurrency(row.unit_price, 'id')}</td>
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
