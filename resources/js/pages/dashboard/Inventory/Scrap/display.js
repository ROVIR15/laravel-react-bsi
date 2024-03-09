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
  TablePagination
} from '@mui/material';
//components
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../components/Table';

// api
import API from '../../../../helpers';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'document_number', label: 'Document Number', alignRight: false },
  { id: 'date', label: 'Tanggal', alignRight: false },
  { id: 'role_type', label: 'Banyaknya Barang', alignRight: false },
  { id: 'phone_number', label: 'Total Qty Barang', alignRight: false }
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
      (_b) => _b.document_number?.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function Labor({ placeHolder }) {
  const [laborData, setLaborData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    try {
      if (!isEmpty(laborData)) return;
      API.getScrapV2('', (res) => {
        if (!res) {
          return undefined;
        } else {
          setLaborData(res.data);
        }
      });
    } catch (e) {
      alert(e);
    }
  }, [laborData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = laborData.map((n) => n.document_number);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, document_number) => {
    const selectedIndex = selected.indexOf(document_number);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, document_number);
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
    try {
      API.deleteScrapV2(id, function (res) {
        if (!res) return;
        if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
        else enqueueSnackbar('', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - laborData.length) : 0;

  const filteredData = applySortFilter(laborData, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListHead
              active={false}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={laborData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {isEmpty(laborData)
                ? null
                : filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, document_number, date, jumlah_barang, banyaknya } = row;
                      // const isItemSelected = selected.indexOf(document_number) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          // selected={isItemSelected}
                          // aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{document_number}</TableCell>
                          <TableCell align="left">{moment(row?.date).format('LL')}</TableCell>
                          <TableCell align="left">{banyaknya}</TableCell>
                          <TableCell align="left">{jumlah_barang}</TableCell>
                          <TableCell align="right">
                            <MoreMenu
                              id={id}
                              handleDelete={(event) => handleDeleteData(event, id)}
                            />
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={laborData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default Labor;
