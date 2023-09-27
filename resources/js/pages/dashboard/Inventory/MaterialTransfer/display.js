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
import PinStatus from '../../../../components/PinStatus';

import moment from 'moment';

// api
import API from '../../../../helpers';
import { display_material_transfer_resources } from '../utils';

import useAuth from '../../../../context/index';

// ----------------------------------------------------------------------

moment.locale('id');

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'user', label: 'Nama Petugas', alignRight: false },
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
  if (query[1] !== 0 && query[2] !== 0)
    return filter(
      array,
      (_b) =>
        _b.serial_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
        _b.to_facility_id === query[1] &&
        _b.status === query[2]
    );
  else if (query[1] !== 0 || query[2] !== 0)
    return filter(
      array,
      (_b) =>
        _b.serial_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
        _b.to_facility_id === query[1] ||
        _b.status === query[2]
    );
  else
    return filter(
      array,
      (_b) => _b.user?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
    );
  // return stabilizedThis.map((el) => el[0]);
}

function Invoice({ placeHolder }) {
  const [invoice, setInvoice] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // context
  const { user } = useAuth();

  const pages = !isEmpty(user) ? user?.pages : [];

  const disableSeeRequest = pages.some(function (item) {
    return (item.pages_id = 32);
  });

  //----------------filter by month and year------------------//
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));
  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };
  //----------------------------------------------------------//

  //----------------filter by buyer name----------------------//
  const [filterFacility, setFilterFacility] = useState(0);
  const [optionsFacility, setOptionsFacility] = useState([]);

  const handleBuyerFilter = (event) => {
    setFilterFacility(event.target.value);
  };
  //------------------------------------------------------------//

  //----------------filter by status----------------------//
  const [filterStatus, setFilterStatus] = useState(0);

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
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
          setInvoice(res.data);
        }
      });

      API.getFacility('', (res) => {
        if (!res) return;
        if (isEmpty(res.data)) {
          setOptionsFacility([]);
        } else {
          let a = res.data.map(function (item) {
            return {
              id: item.id,
              name: item.name,
              facility_type: item.type.name
            };
          });
          setOptionsFacility(a);
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
      API.deleteMaterialTransfer(id, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('error');
        else {
          alert(`data is deleted on id ${id}`);
        }
      });
    } catch (error) {
      alert(error);
    }

    handleUpdateData();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invoice.length) : 0;

  const filteredData = applySortFilter(invoice, getComparator(order, orderBy), [
    filterName,
    filterFacility,
    filterStatus
  ]);

  const isDataNotFound = filteredData.length === 0;

  return (
    <>
      <Card>
        <ListToolbar
          statusActive={true}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterStatus}
          //
          statusActiveRequester={true}
          optionsFacility={optionsFacility}
          onFilterFacility={handleBuyerFilter}
          filterFacility={filterFacility}
          //
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
                      user,
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

                    let status_item = {
                      status: '',
                      color: '',
                      backgroundColor: ''
                    };
                    if (status == 1) {
                      status_item = {
                        ...status_item,
                        status: 'Belum Diproses',
                        color: 'rgb(183, 29, 24)',
                        backgroundColor: 'rgba(255, 86, 48, 0.16)'
                      };
                    } else if (status == 2) {
                      status_item = {
                        ...status_item,
                        status: 'Selesai',
                        color: 'rgb(27, 128, 106)',
                        backgroundColor: 'rgba(54, 179, 126, 0.16)'
                      };
                    } else {
                      status_item = {
                        ...status_item,
                        status: 'Diproses Sistem',
                        color: 'rgb(183, 110, 0)',
                        backgroundColor: 'rgba(255, 171, 0, 0.16)'
                      };
                    }

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
                        <TableCell align="left">{user}</TableCell>
                        <TableCell align="left">
                          <PinStatus
                            status={status_item.status}
                            style={{
                              color: status_item.color,
                              backgroundColor: status_item.backgroundColor
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">{mt_id}</TableCell>
                        <TableCell align="left">{from_facility_name}</TableCell>
                        <TableCell align="left">{to_facility_name}</TableCell>
                        <TableCell align="left">{moment(date).format('LL')}</TableCell>
                        <TableCell align="left">{est_transfer_date}</TableCell>
                        <TableCell align="left">{`${fNumber(
                          req_transfer_qty
                        )} ${unit_measurement}`}</TableCell>
                        <TableCell align="left">{`${fNumber(
                          res_transfer_qty
                        )} ${unit_measurement}`}</TableCell>
                        <TableCell align="right">
                          <MoreMenu
                            id={id}
                            document={disableSeeRequest}
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
          rowsPerPageOptions={[15, 25, 50]}
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
