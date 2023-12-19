import React, { useEffect, useState } from 'react';
import { filter, isArray, isEmpty, isNull, uniqBy } from 'lodash';
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
import PinStatus from '../../../../components/PinStatus';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, MoreMenu } from '../../../../components/Table';
import ListToolbar from '../components/ListToolbar';
//
import BUYERLIST from '../../../../_mocks_/buyer';
// api
import API from '../../../../helpers';
import moment from 'moment';

moment.locale('id');
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'invoice_date', label: 'Issued Date', alignRight: false },
  { id: 'serial_number', label: 'No. Invoice', alignRight: false },
  { id: 'billed_to', label: 'Billed To', alignRight: false },
  { id: 'total_qty', label: 'Total Qty', alignRight: false },
  { id: 'total_amount', label: 'Total Amount Billed', alignRight: false }
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
  const [rowsPerPage, setRowsPerPage] = useState(15);

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
      API.getSalesInvoice(`?invoice_type=1&monthYear=${filterMonthYear}`, (res) => {
        if (!res) return;
        if (!res.data) {
          setInvoice([]);
        } else {
          const _data = res.data.map(function (item) {
            const { sales_invoice, payment_history, terms } = item;

            let additionalCost;
            if (isEmpty(terms)) additionalCost = sales_invoice?.sum[0]?.total_amount;
            else {
              additionalCost = terms.reduce(function (initial, next) {
                let type = next.value_type.toLowerCase();
                if (type === 'percentage') return initial * (1 + next.term_value / 100);
                if (type === 'number') return initial + next.term_value;
                else return number;
              }, parseFloat(sales_invoice?.sum[0]?.total_amount));

              if (sales_invoice?.tax > 0)
                additionalCost = additionalCost * (sales_invoice?.tax / 100 + 1);
            }

            let total_amount_payment = 0;
            if (isEmpty(payment_history)) total_amount_payment = 0;
            else {
              total_amount_payment = payment_history?.reduce(
                (initial, next) => initial + next?.amount,
                0
              );
            }

            let status_payment = checkStatusPayment(
              parseFloat(total_amount_payment),
              parseFloat(additionalCost)
            );

            return {
              id: sales_invoice?.id,
              invoice_date: sales_invoice?.invoice_date,
              tax: sales_invoice?.tax,
              party_id: sales_invoice?.party?.id,
              billed_to: sales_invoice?.party?.name,
              serial_number: `INV. No ${sales_invoice.id}/${sales_invoice?.sales_order?.id}-${sales_invoice?.sales_order?.sales_order?.id}/${sales_invoice.invoice_date}/${sales_invoice?.sales_order?.sales_order?.po_number}`,
              total_qty: sales_invoice?.sum[0]?.total_qty,
              total_amount: sales_invoice?.sum[0]?.total_amount,
              additionalCost,
              status: status_payment
            };
          });

          let buyer = res?.data
            .filter(function (item, index, arr) {
              return !isNull(item.sales_invoice?.party);
            })
            .map(function (obj) {
              return obj.sales_invoice?.party;
            });

          let _buyer = uniqBy(buyer, 'id');

          setOptionsBuyer(_buyer);

          setInvoice(_data);
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
      API.deleteSalesInvoice(id, function (res) {
        if (res.success) alert('success');
        else throw new Error('failed to delete data');
      });
    } catch (error) {
      alert(error);
    }

    setInvoice([]);
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
      <Test data={filteredData} />
      <Card>
        <ListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          monthYearActive={true}
          filterMonthYear={filterMonthYear}
          onFilterMonthYear={handleMonthYearChanges}
          placeHolder={placeHolder}
          buyerFilterActive={true}
          filterBuyer={filterBuyer}
          onFilterBuyer={handleBuyerFilter}
          listOfBuyer={optionsBuyer}
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
                      invoice_date,
                      serial_number,
                      billed_to,
                      total_qty,
                      additionalCost
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
                          <PinStatus
                            status={status.status}
                            style={{ color: status.color, backgroundColor: status.backgroundColor }}
                          />
                        </TableCell>
                        <TableCell align="left">{moment(invoice_date).format('ll')}</TableCell>
                        <TableCell align="left">{serial_number}</TableCell>
                        <TableCell align="left">{billed_to}</TableCell>
                        <TableCell align="left">{`${fNumber(total_qty)} pcs`}</TableCell>
                        <TableCell align="left">{fCurrency(additionalCost)}</TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={invoice.length}
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
