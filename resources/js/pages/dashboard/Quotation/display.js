import React, { useEffect, useState } from 'react';
import { filter, isArray, isNull, uniqBy } from 'lodash';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';
//components
import ChipStatus from '../../../components/ChipStatus';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, MoreMenu } from '../../../components/Table';
// api
import API from '../../../helpers';
import { fCurrency } from '../../../utils/formatNumber';

import useAuth from '../../../context';
import ListToolbar from './components/ListToolbar';
import moment from 'moment';
moment.locale('id')
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'po_number', label: 'PO Number', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'name', label: 'Buyer', alignRight: false },
  { id: 'total_qty', label: 'Qty', alignRight: false },
  { id: 'total_money', label: 'Total', alignRight: false },
  { id: 'issue_date', label: 'Issue Date', alignRight: false },
  { id: 'valid_thru', label: 'Valid Thru', alignRight: false },
  { id: 'delivery_date', label: 'Delivery Date', alignRight: false }
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
        _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 && _b.party?.id === query[1]
    );
  else return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1);
  // return stabilizedThis.map((el) => el[0]);
}

function DisplayQuote({ placeHolder }) {
  const [quoteData, setQuoteData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  // const [filterDate, setFilterDate] = useState({
  //   'thruDate': moment(new Date()).format('YYYY-MM-DD'),
  //   'fromDate': moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD')
  // });
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));

  const [rowsPerPage, setRowsPerPage] = useState(15);

  const { user } = useAuth();

  useEffect(() => {
    handleUpdateData();
  }, [filterMonthYear]);

  const handleUpdateData = () => {
    const { role } = user;
    let params;

    setLoading(true);

    role.map((item) => {
      if (item.approve) {
        params = 'level=approve';
        return;
      }
      if (item.submit) {
        params = 'level=submit';
        return;
      }
      if (item.review) {
        params = 'level=review';
        return;
      }
    });

    params = params + `&monthYear=${filterMonthYear}`;

    try {
      API.getQuoteBySO(params, (res) => {
        if (!res) return;
        if (!res.data) {
          setQuoteData([]);
        } else {
          let buyer = res?.data
            .filter(function (item, index, arr) {
              return !isNull(item.party);
            })
            .map(function (obj) {
              return obj.party;
            });

          let _buyer = uniqBy(buyer, 'id');
          setOptionsBuyer(_buyer);

          setQuoteData(res.data);
        }
      });
    } catch (error) {
      alert('error');
    }

    setLoading(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleDateChanges = (event) => {
  //   const { name, value} = event.target;
  //   setFilterDate((prevValue) => {
  //     if(name === 'fromDate') {
  //       if(value > prevValue.thruDate) {
  //         alert('from date cannot be more than to date');
  //         return prevValue;
  //       } else {
  //         return ({...prevValue, [name]: value});
  //       }
  //     }
  //     else if(name === 'thruDate') {
  //       if(value < prevValue.fromDate) {
  //         alert('to date cannot be less than fron date');
  //         return prevValue;
  //       } else {
  //         return ({...prevValue, [name]: value});
  //       }
  //     }
  //     else {
  //       return ({...prevValue, [name]: value});
  //     }
  //   })
  // }

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = quoteData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
      API.deleteQuote(id, function (res) {
        if (res.success) setQuoteData([]);
        handleUpdateData();
      });
    } catch {
      alert('error');
    }
  };

  //----------------filter by buyer name----------------------//
  const [filterBuyer, setFilterBuyer] = useState(0);
  const [optionsBuyer, setOptionsBuyer] = useState([]);

  const handleBuyerFilter = (event) => {
    setFilterBuyer(event.target.value);
  };
  //------------------------------------------------------------//

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quoteData.length) : 0;

  const filteredData = applySortFilter(quoteData, getComparator(order, orderBy), [
    filterName,
    filterBuyer
  ]);

  const isDataNotFound = filteredData.length === 0;

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        monthYearActive={true}
        filterMonthYear={filterMonthYear}
        onFilterMonthYear={handleMonthYearChanges}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        buyerFilterActive={true}
        filterBuyer={filterBuyer}
        onFilterBuyer={handleBuyerFilter}
        listOfBuyer={optionsBuyer}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              active={false}
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
                .map((row, index) => {
                  const {
                    id,
                    po_number,
                    party,
                    issue_date,
                    valid_thru,
                    delivery_date,
                    sum,
                    status,
                    currency_id
                  } = row;

                  let currency;
                  if(currency_id === 2) currency = "idr";
                  else currency = "usd";
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
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{ChipStatus(status[0]?.status_type)}</TableCell>
                      <TableCell align="left">{party?.name}</TableCell>
                      <TableCell align="left">{sum?.length ? sum[0].total_qty : null}</TableCell>
                      <TableCell align="left">
                        {sum?.length ? fCurrency(sum[0].total_money, currency) : null}
                      </TableCell>
                      <TableCell align="left">{moment(issue_date).format('ll')}</TableCell>
                      <TableCell align="left">{moment(delivery_date).format('ll')}</TableCell>
                      <TableCell align="left">{moment(valid_thru).format('ll')}</TableCell>
                      <TableCell align="right">
                        <MoreMenu
                          id={id}
                          document={true}
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
                    {loading ? (
                      <Typography variant="body2" align="center">
                        Please Wait
                      </Typography>
                    ) : (
                      <SearchNotFound searchQuery={filterName} />
                    )}
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
        count={quoteData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default DisplayQuote;
