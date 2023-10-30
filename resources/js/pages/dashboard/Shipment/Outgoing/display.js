import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { filter, isArray, isNull, uniqBy } from 'lodash';
import {
  Card,
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
import { ListHead, MoreMenu } from '../../../../components/Table';
import ListToolbar from './components/ListToolbar';
import PinStatus from '../../../../components/PinStatus';

moment.locale('id');

// api
import API from '../../../../helpers';

//
import Test4 from '../../../../components/Test4';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'serial_number', label: 'Serial Number', alignRight: false },
  { id: 'po_number', label: 'PO Number', alignRight: false },
  { id: 'name', label: 'Buyer', alignRight: false },
  { id: 'delivery_qty', label: 'Shipped Qty', alignRight: false },
  { id: 'delivery_date', label: 'Arrival Date', alignRight: false },
  { id: 'est_delivery_date', label: 'Estimated Arrival Date', alignRight: false },
  { id: 'remarks', label: 'Keterangan', alignRight: false }
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

  console.log(query);
  if (query[1] !== 0)
    return filter(
      array,
      (_b) =>
        _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
        _b.order?.sales_order?.party?.id === query[1]
    );
  else return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1);
}

function OutboundDelivery({ placeHolder }) {
  const [goodsReceipt, setGoodsReceipt] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));

  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    handleUpdateData();
  }, [filterMonthYear]);

  const handleUpdateData = () => {
    let params = '?shipment_type=2';
    params = params + `&monthYear=${filterMonthYear}`;

    try {
      API.getShipment(params, (res) => {
        if (!res) return;
        if (!res.data) {
          setGoodsReceipt([]);
        } else {
          let buyer = res?.data
            .filter(function (item, index, arr) {
              return !isNull(item?.order?.sales_order?.party);
            })
            .map(function (obj) {
              return obj.order?.sales_order?.party;
            });

          let _buyer = uniqBy(buyer, 'id');
          setOptionsBuyer(_buyer);

          setGoodsReceipt(res.data);
        }
      });
    } catch (error) {
      alert(`error occured ${error}`);
    }
  };

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = goodsReceipt.map((n) => n.name);
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

    // try {
    //   API.deleteShipment(id, function(res){
    //     if(!res) return undefined;
    //     if(!res.success) throw new Error('failed to delte data');
    //     else alert('success');
    //   })
    // } catch (error) {
    //   alert(error);
    // }

    handleUpdateData();
  };

  //----------------filter by buyer name----------------------//
  const [filterBuyer, setFilterBuyer] = useState(0);
  const [optionsBuyer, setOptionsBuyer] = useState([]);

  const handleBuyerFilter = (event) => {
    setFilterBuyer(event.target.value);
  };
  //------------------------------------------------------------//

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - goodsReceipt.length) : 0;

  const filteredData = applySortFilter(goodsReceipt, getComparator(order, orderBy), [
    filterName,
    filterBuyer
  ]);

  const isDataNotFound = filteredData.length === 0;

  function dateDiff(delivDate, estDelivDate) {
    let a = new Date(delivDate);
    let b = new Date(estDelivDate);

    if (a < b) return 'On time';
    if (a > b) {
      let dateDiff = Math.round((a - b) / (1000 * 60 * 60 * 24));
      return `Late delivery -${dateDiff} days`;
    } else return 'On time';
  }

  return (
    <>
      <Test4 data={filteredData} />
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
            <Table size="small">
              <ListHead
                active={false}
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={goodsReceipt.length}
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
                      serial_number,
                      delivery_date,
                      est_delivery_date,
                      sum,
                      order,
                      status
                    } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;
                    let status_item = {
                      status: '',
                      color: '',
                      backgroundColor: ''
                    };
                    if (status[0]?.shipment_type_status_id == 4) {
                      status_item = {
                        ...status_item,
                        status: 'Cancelled',
                        color: 'rgb(183, 29, 24)',
                        backgroundColor: 'rgba(255, 86, 48, 0.16)'
                      };
                    } else if (status[0]?.shipment_type_status_id == 5) {
                      status_item = {
                        ...status_item,
                        status: 'Completed',
                        color: 'rgb(27, 128, 106)',
                        backgroundColor: 'rgba(54, 179, 126, 0.16)'
                      };
                    } else if (status[0]?.shipment_type_status_id == 3) {
                      status_item = {
                        ...status_item,
                        status: 'In Delivery',
                        color: 'rgb(183, 110, 0)',
                        backgroundColor: 'rgba(255, 171, 0, 0.16)'
                      };
                    } else {
                      status_item = {
                        ...status_item,
                        status: 'Scheduled',
                        color: 'rgb(54, 47, 217)',
                        backgroundColor: 'rgba(255, 171, 0, 0.16)'
                      };
                    }
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
                            status={status_item.status}
                            style={{
                              color: status_item.color,
                              backgroundColor: status_item.backgroundColor
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">{serial_number}</TableCell>
                        <TableCell align="left">{order?.sales_order?.po_number}</TableCell>
                        <TableCell align="left">{order?.sales_order?.ship?.name}</TableCell>
                        <TableCell align="left">{sum[0]?.total_qty}</TableCell>
                        <TableCell align="left">{moment(delivery_date).format('ll')}</TableCell>
                        <TableCell align="left">
                          {moment(order?.sales_order?.delivery_date).format('ll')}
                        </TableCell>
                        <TableCell align="left">
                          {dateDiff(delivery_date, order?.sales_order?.delivery_date)}
                        </TableCell>
                        <TableCell align="right">
                          <MoreMenu
                            id={id}
                            handleDelete={(event) => handleDeleteData(event, id)}
                            document={true}
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
          rowsPerPageOptions={[15, 20, 25]}
          component="div"
          count={goodsReceipt.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default OutboundDelivery;
