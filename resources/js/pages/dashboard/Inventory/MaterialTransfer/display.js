import React, { useEffect, useState } from 'react';
import { filter, isArray, isEmpty, isUndefined, isNull, uniqBy } from 'lodash';
import {
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
import { checkStatusPayment } from '../../../../utils/math';
//components
import Test from '../../../../components/Test';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../components/Table';

import moment from 'moment';

// api
import API from '../../../../helpers';
import { display_material_transfer_resources } from '../utils';

// ----------------------------------------------------------------------

moment.locale('id');

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'mt_id', label: 'Nomor Permintaan MT', alignRight: false },
  { id: 'from_facility_name', label: 'Dari', alignRight: false },
  { id: 'to_facility_name', label: 'Ke', alignRight: false },
  { id: 'date', label: 'Tanggal Buat', alignRight: false },
  { id: 'est_transfer_date', label: 'Tanggal Terproses', alignRight: false },
  { id: 'req_transfer_qty', label: 'Qty Minta', alignRight: false },
  { id: 'res_transfer_qty', label: 'Terkirim', alignRight: false }
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
  if (query[1] !== 0)
    return filter(
      array,
      (_b) =>
        _b.serial_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
        _b.party_id === query[1]
    );
  else
    return filter(
      array,
      (_b) => _b.serial_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
    );
  // return stabilizedThis.map((el) => el[0]);
}

function Invoice({ placeHolder }) {
  const [invoice, setInvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //----------------filter by month and year------------------//
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));
  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };
  //----------------------------------------------------------//

  //----------------filter by buyer name----------------------//
  const [filterBuyer, setFilterBuyer] = useState(0);
  const [optionsBuyer, setOptionsBuyer] = useState([]);

  const handleBuyerFilter = (event) => {
    setFilterBuyer(event.target.value);
  };
  //------------------------------------------------------------//

  useEffect(() => {
    handleUpdateData();
  }, [filterMonthYear]);

  const handleUpdateData = () => {
    try {
      API.getMaterialTransfer(``, (res) => {
        if (!res) return;
        if (!res.data) {
          setInvoice([]);
        } else {
          setInvoice(res.data)
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = invoice.map((n) => n.name);
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

    try {
      API.deleteMaterialTransfer(id, function(res){
        if(!res) return;
        if(!res.success) throw new Error('error');
        else {
          alert(`data is deleted on id ${id}`)
        }
      })
    } catch (error) {
      alert(error);
    }

    handleUpdateData();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invoice.length) : 0;

  const filteredData = applySortFilter(invoice, getComparator(order, orderBy), [
    filterName,
    filterBuyer
  ]);

  const isDataNotFound = filteredData.length === 0;

  return (
    <>
      <Card>
        <ListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          monthYearActive={true}
          filterMonthYear={filterMonthYear}
          onFilterMonthYear={handleMonthYearChanges}
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
                rowCount={invoice.length}
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
                      status,
                      mt_id,
                      date,
                      est_transfer_date,
                      from_facility_name,
                      to_facility_name,
                      req_transfer_qty,
                      res_transfer_qty,
                      unit_measurement
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
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">
                          {status}
                          {/* <PinStatus
                            status={status.status}
                            style={{ color: status.color, backgroundColor: status.backgroundColor }}
                          /> */}
                        </TableCell>
                        <TableCell align="left">{mt_id}</TableCell>
                        <TableCell align="left">{from_facility_name}</TableCell>
                        <TableCell align="left">{to_facility_name}</TableCell>
                        <TableCell align="left">{moment(date).format('LL')}</TableCell>
                        <TableCell align="left">{moment(est_transfer_date).format('LL')}</TableCell>
                        <TableCell align="left">{`${fNumber(req_transfer_qty)} ${unit_measurement}`}</TableCell>
                        <TableCell align="left">{`${fNumber(res_transfer_qty)} ${unit_measurement}`}</TableCell>
                        <TableCell align="right">
                          <MoreMenu
                            id={id}
                            document={true}
                            document_label_name="View Request"
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
          count={invoice?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default Invoice;
