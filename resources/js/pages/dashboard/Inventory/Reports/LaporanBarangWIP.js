import React, { useRef, useState, useEffect } from 'react';
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

import { StyledTableCell as TableCell } from './components/TableCell';
import { fCurrency } from '../../../../utils/formatNumber';
import { titleCase } from '../../../../utils/formatCase';

import { Icon } from '@iconify/react';
import { downloadIcon } from '@iconify/icons-eva/download-fill';

import { __payload } from '../data-testing/wip';

import API from '../../../../helpers';
import { isEmpty } from 'lodash';

import { generalizeSKU } from '../utils';

const names = ['Bahan Baku', 'Barang Jadi', 'Skrap', 'WIP', 'Mesin & Alat Tulis'];

function Inbound() {
  const xlsRef = useRef(null);
  const [payloadData, setPayloadData] = useState(__payload);

  // get pathname
  const { pathname } = useLocation();
  const pagename = pathname?.split('/')[3].replaceAll('-', ' ');

  const [valueOfSelect, setValueofSelect] = React.useState('');

  // range of date
  const [values, setValues] = useState({
    start_date: '2023-01-01',
    end_date: '2023-01-14',
    category: 1
  });

  const handleChangeDateRange = (event) => {
    let {
      target: { name, value }
    } = event;

    setValues({ ...values, [name]: value });
  };

  const handleGo = () => {
    try {
      // if (isEmpty(values.start_date) || isEmpty(values.start_date) || isEmpty(values.category))
      //   new Error('Error processing your request!');
      // let param = `?fromDate=${values.start_date}&thruDate=${values.end_date}`;
      // API.getReportWIP_beta(param, function (res) {
      //   if (!res) return;
      //   if (!res.data) new Error('Error processing request');
      //   else {
      //     // console.log(res.data);
      //     // let _res = rearrange_data_material_transfer(res.data);
      //     setPayloadData(res.data);
      //   }
      // });
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
    const filename = 'laporan barang wip' + '.xls';

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
    handleGo();
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
                Download
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
                  value={values.start_date}
                  onChange={handleChangeDateRange}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="End Date"
                  type="date"
                  name="end_date"
                  value={values.end_date}
                  onChange={handleChangeDateRange}
                />
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  size="small"
                  value={valueOfSelect}
                  label="Kategori"
                  // onChange={handleSelectChange}
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
                  <TableCell>Nomor Bukti Pengeluaran dan/atau Penerimaan</TableCell>
                  <TableCell>Tanggal Bukti Pengeluaran dan/atau Penerimaan</TableCell>
                  <TableCell>Kode Barang</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Satuan</TableCell>
                  <TableCell>Jumlah Barang</TableCell>
                  <TableCell>Perusahaan Sub Kontrak</TableCell>
                  <TableCell>Lokasi Gudang</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payloadData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    let convertedString = row.category?.replace(
                      /(^|\s)([a-z])/g,
                      function (match, group1, group2) {
                        return group1 + group2.toUpperCase();
                      }
                    );

                    let last_stock = parseFloat(row.total_output) - parseFloat(row.next_wip_output);

                    return (
                      <TableRow>
                        <TableCell>{row.nomor_bukti}</TableCell>
                        <TableCell>{row.tanggal_bukti}</TableCell>
                        <TableCell>{`WIP-00${row.id}`}</TableCell>
                        <TableCell>{row.item_name}</TableCell>
                        {/* <TableCell>{convertedString}</TableCell> */}
                        <TableCell>{row.category_name}</TableCell>
                        <TableCell>{row.unit_measurement}</TableCell>
                        <TableCell>{row.total_output}</TableCell>
                        <TableCell>{row.sub_kontrak}</TableCell>
                        <TableCell>{row.current_position}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Paper>

      <div ref={xlsRef} style={{ display: 'none' }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Laporan WIP</Typography>
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
                          Item Name
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Category Name
                        </th>
                        <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                          Satuan
                        </th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">Stok Awal</th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">Stok Masuk</th>
                        <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">Stok Keluar</th>
                        <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg">
                          Stok Akhir
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payloadData.map((row, index) => {
                        let convertedString = row.category?.replace(
                          /(^|\s)([a-z])/g,
                          function (match, group1, group2) {
                            return group1 + group2.toUpperCase();
                          }
                        );

                        let last_stock =
                          parseFloat(row.total_output) - parseFloat(row.next_wip_output);

                        return (
                          <tr>
                            <td className="wk_width_3">{row.material_code}</td>
                            <td className="wk_width_2">{row.item_name}</td>
                            <td className="wk_width_2">{convertedString}</td>
                            <td className="wk_width_3">{row.unit_measurement}</td>
                            <td className="wk_width_1">{row.total_output}</td>
                            <td className="wk_width_1">{row.total_output}</td>
                            <td className="wk_width_1">{row.next_wip_output}</td>
                            <td className="wk_width_2">{last_stock}</td>
                          </tr>
                        );
                      })}
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