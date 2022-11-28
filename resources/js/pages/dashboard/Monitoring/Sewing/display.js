import React, { useEffect, useState } from 'react';
import { filter, isArray } from 'lodash';
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
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../components/Table';
//
import moment from 'moment';
// api
import API from '../../../../helpers';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'date', label: 'date', alignRight: false },
  { id: 'so_number', label: 'Sales PO Number', alignRight: false },
  { id: 'po_number', label: 'PO Number', alignRight: false },
  { id: 'goods_name', label: 'Nama Barang', alignRight: false },
  { id: 'size', label: 'Size', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'line', label: 'Line', alignRight: false },
  { id: 'qty_loading', label: 'Qty Loading', alignRight: false },
  { id: 'output', label: 'Output', alignRight: false }
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
      (_b) => _b.sales_order?.po_number.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function DisplayQuote({ placeHolder }) {
  const [quoteData, setQuoteData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterDate, setFilterDate] = useState({
    thruDate: moment(new Date()).format('YYYY-MM-DD'),
    fromDate: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD')
  });

  useEffect(() => {
    handleUpdateData();
  }, []);

  const handleUpdateData = () => {
    let params = `?fromDate=${filterDate.fromDate}&thruDate=${filterDate.thruDate}`;

    try {
      API.getMonitoringSewing(params, (res) => {
        if (!res.data) {
          setQuoteData([]);
        } else {
          setQuoteData(res.data);
        }
      });
    } catch (error) {
      alert('error');
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = quoteData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const handleDeleteData = (event, id) => {
    event.preventDefault();
    alert(id);
  };

  const handleDateChanges = (event) => {
    const { name, value } = event.target;
    setFilterDate((prevValue) => {
      if (name === 'fromDate') {
        if (value > prevValue.thruDate) {
          alert('from date cannot be more than to date');
          return prevValue;
        } else {
          return { ...prevValue, [name]: value };
        }
      } else if (name === 'thruDate') {
        if (value < prevValue.fromDate) {
          alert('to date cannot be less than fron date');
          return prevValue;
        } else {
          return { ...prevValue, [name]: value };
        }
      } else {
        return { ...prevValue, [name]: value };
      }
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quoteData.length) : 0;

  const filteredData = applySortFilter(quoteData, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        dateActive={true}
        filterName={filterName}
        filterDate={filterDate}
        onFilterDate={handleDateChanges}
        onGo={handleUpdateData}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={quoteData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    date,
                    sales_order,
                    po_number,
                    line,
                    qty_loading,
                    output,
                    product_feature
                  } = row;
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{date}</TableCell>
                      <TableCell align="left">{sales_order?.po_number}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{product_feature?.product?.goods?.name}</TableCell>
                      <TableCell align="left">{product_feature?.size}</TableCell>
                      <TableCell align="left">{product_feature?.color}</TableCell>
                      <TableCell align="left">{line}</TableCell>
                      <TableCell align="left">{qty_loading}</TableCell>
                      <TableCell align="left">{output}</TableCell>
                      <TableCell align="right">
                        <MoreMenu id={id} handleDelete={(event) => handleDeleteData(event, id)} />
                      </TableCell>
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
        rowsPerPageOptions={[25, 50, 75]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default DisplayQuote;
