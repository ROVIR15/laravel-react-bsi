import React, { useEffect, useState } from 'react';
import { filter, isArray, isNull, isEmpty } from 'lodash';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Radio
} from '@mui/material';
//components
import Scrollbar from '../../../../../components/Scrollbar';
import SearchNotFound from '../../../../../components/SearchNotFound';
import { ListHead, ListRadioHead, ListToolbar, MoreMenu } from '../../../../../components/Table';
import moment from 'moment';

moment.locale('id');
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'imageUrl', label: 'Gambar', alignRight: false },
  { id: 'po_number', label: 'Sales Order', alignRight: false },
  { id: 'buyer_name', label: 'Buyer Name', alignRight: false },
  { id: 'line_start_date', label: 'Rencana Mulai Produksi', alignRight: false },
  { id: 'real_start_date', label: 'Realisasi Mulai Produksi', alignRight: false },
  { id: 'line_end_date', label: 'Rencana Selesai Produksi', alignRight: false },
  { id: 'real_end_date', label: 'Realisasi Selesai Produksi', alignRight: false },
  { id: 'target_in_total', label: 'Jumlah Rencana Output', alignRight: false },
  { id: 'output', label: 'Akumulasi Target Output', alignRight: false },
  { id: 'avg_output', label: 'Rata-rata Harian', alignRight: false },
  { id: 'target_output', label: 'Target Harian ', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if (!isArray(array)) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function TableD({ list, placeHolder, selected, setSelected }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  //   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    setSelected({ ...selected, id: name.id, sales_order_id: name.sales_order_id });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isAvailableQty = (current_output, plan_output) => {
    return current_output < plan_output;
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list?.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData?.length === 0;

  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListRadioHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={list?.length}
              numSelected={selected?.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {isEmpty(list)
                ? null
                : filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      let isItemSelected = selected.id === row.id;
                      const {
                        id,
                        imageUrl,
                        po_number,
                        buyer_name,
                        output,
                        target_in_total,
                        avg_output,
                        target_output,
                        real_start_date,
                        line_start_date,
                        real_end_date,
                        line_end_date
                      } = row;
                      
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="radio"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="none">
                            <Radio
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">
                            <img src={imageUrl}/>
                          </TableCell>
                          <TableCell align="left">{po_number}</TableCell>
                          <TableCell align="left">{buyer_name}</TableCell>
                          <TableCell align="left">{!isNull(real_start_date) ? moment(real_start_date).format('LL') : 'Belum Mulai'}</TableCell>
                          <TableCell align="left">{moment(line_start_date).format('LL')}</TableCell>
                          <TableCell align="left">{(!isAvailableQty(output, target_in_total) ? moment(real_end_date).format('LL') : 'Masih berjalan')}</TableCell>
                          <TableCell align="left">{moment(line_end_date).format('LL')}</TableCell>
                          <TableCell align="left">{`${target_in_total} pcs`}</TableCell>
                          <TableCell align="left">{`${output} pcs`}</TableCell>
                          <TableCell align="left">{`${parseFloat(avg_output).toFixed(2)} pcs`}</TableCell>
                          <TableCell align="left">{`${target_output} pcs`}</TableCell>
                        </TableRow>
                      );
                    })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isDataNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={list?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default TableD;
