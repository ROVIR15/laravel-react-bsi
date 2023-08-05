import React, { useEffect, useState } from 'react';
import { filter, isArray, isEmpty } from 'lodash';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
//components
import Scrollbar from '../../../../../components/Scrollbar';
import SearchNotFound from '../../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../../components/Table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'po_number', label: 'Sales Order', alignRight: false },
    { id: 'product_name', label: 'Nama Pesanan', alignRight: false },
    { id: 'output', label: 'Output', alignRight: true },
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
  if(!isArray(array)) return []
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

function TableD({ list, placeHolder, selected, setSelected}) {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list?.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData?.length === 0;  

  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table
            size="small"
          >
            <ListHead
              active={false}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={list?.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                isEmpty(list) ? null : (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      po_number,
                      product_name,
                      size,
                      color,
                      output
                    } = row;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{po_number}</TableCell>
                        <TableCell align="left">{`${product_name} ${color} - ${size}`}</TableCell>
                        <TableCell align="left">{output}</TableCell>
                        {/* <TableCell align="left">{target}</TableCell> */}
                      </TableRow>
                    );
              }))}
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
        rowsPerPageOptions={[15, 20, 25]}
        component="div"
        count={list?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default TableD;