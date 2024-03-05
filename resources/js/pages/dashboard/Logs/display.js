import React, { useEffect, useState } from 'react';
import { filter, isArray, isUndefined } from 'lodash';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
//components
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../components/Table';
//
import BUYERLIST from '../../../_mocks_/buyer';
// api
import API from '../../../helpers';
import { serviceList2 } from '../../../helpers/data';
import moment from 'moment';

moment.locale('id');
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'user_name', label: 'Nama Pengguna', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'url', label: 'Link', alignRight: false },
  { id: 'method', label: 'Method', alignRight: false },
  { id: 'message', label: 'Response', alignRight: false },
  { id: 'context', label: 'Payload', alignRight: false },
  { id: 'created', label: 'Direkam', alignRight: false }
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
    return filter(
      array,
      (_b) => _b.facility?.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function DisplayBuyer({ placeHolder }) {
  const [goodsData, setGoodsData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    function isEmpty(array) {
      if (!Array.isArray(array)) return true;
      return !array.length;
    }

    let params = `?monthYear=${filterMonthYear}`;

    try {
      API.getLogs(params, (res) => {
        if (!res) return;
        if (isEmpty(res.data)) {
          setGoodsData([]);
        } else {
          setGoodsData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [filterMonthYear]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = goodsData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {};

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

  const handleDeleteData = (event, id) => {};

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - goodsData.length) : 0;

  const filteredData = applySortFilter(goodsData, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    console.log(value)
    setFilterMonthYear(value);
  };

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        monthYearActive={true}
        filterMonthYear={filterMonthYear}
        onFilterMonthYear={handleMonthYearChanges}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListHead
              active={false}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={goodsData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { id, level, url, method, message, context, user_name, created } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{user_name}</TableCell>
                      <TableCell align="left">{level}</TableCell>
                      <TableCell align="left">{url}</TableCell>
                      <TableCell align="left">{method}</TableCell>
                      <TableCell align="left">{message}</TableCell>
                      <TableCell align="left">{context}</TableCell>
                      <TableCell align="left">{moment(created).format('LLL')}</TableCell>
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
        count={goodsData.length ? goodsData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default DisplayBuyer;
