import React, { useEffect, useState } from 'react';
import { filter, isArray, isEqual, isNull, uniqBy } from 'lodash';
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
import { ListHead, MoreMenu } from '../../../components/Table';
import ListToolbar from './components/ListToolbar';

//
import moment from 'moment';
// api
import API from '../../../helpers';
import { fPercent } from '../../../utils/formatNumber';

moment.locale('id')
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'date', label: 'Tanggal Pengirima', alignRight: false },
  { id: 'party_id', label: 'Pembeli', alignRight: false },
  { id: 'po_number', label: 'PO Number', alignRight: false },
  { id: 'qty', label: 'Qty Order', alignRight: false },
  { id: 'output_cutting', label: 'Output Cutting', alignRight: false },
  { id: 'output_sw', label: 'Output Sewing', alignRight: false },
  { id: 'output_qc', label: 'Output QC', alignRight: false },
  { id: 'output_fg', label: 'Output Finished Goods', alignRight: false },
  { id: 'percentage', label: 'Persentase Penyelesaian', alignRight: false },
  { id: 'difference', label: 'Kekurangan', alignRight: false }
];

// ----------------------------------------------------------------------

function completionOfOrder(order_qty, final_garment) {
  final_garment = final_garment ? parseInt(final_garment) : 0;
  order_qty = order_qty ? parseInt(order_qty) : 0;

  if (final_garment === 0) {
    return {
      percentage: 0,
      difference: final_garment - order_qty
    };
  } else {
    return {
      percentage: parseFloat(final_garment / order_qty) * 100,
      difference: final_garment - order_qty
    };
  }
}

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
    if(isEqual(query[2], 0)){
      return filter(
        array,
        (_b) =>
          _b.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 && _b.party?.id === query[1]
      );  
    } else {
      return filter(
        array,
        (_b) =>
          _b.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 && _b.party?.id === query[1] && _b.order_id === query[2]
      );  
    }
  else {
    return filter(array, (_b) => _b.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1);
  } 

  return stabilizedThis.map((el) => el[0]);
}

function Display({ placeHolder }) {
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

  //----------------filter by buyer name----------------------//
  const [filterBuyer, setFilterBuyer] = useState(0);
  const [optionsBuyer, setOptionsBuyer] = useState([]);

  const handleBuyerFilter = (event) => {
    setFilterBuyer(event.target.value);
  };
  //------------------------------------------------------------//

  //----------------filter by sales order----------------------//
  const [filterByOrder, setFilterByOrder] = useState(0);
  const [orderList, setOrderList] = useState([]);

  const handleOrderFilter = (event) => {
    setFilterByOrder(event.target.value);
  };
  //------------------------------------------------------------//

  useEffect(() => {
    handleUpdateData();
  }, []);

  useEffect(() => {
    //check first is that order_id was found on recent data list;
    let isFound = filteredData.filter((item) => (item.order_id === filterByOrder)).length > 0;
    if(!isFound) setFilterByOrder(0);
    let _orderList = filteredData.filter((item) => !isNull(item?.po_number)).map((obj) => ({order_id: obj.order_id, po_number: obj.po_number}));
    let _uniqOrderList = uniqBy(_orderList, 'order_id');
    setOrderList(_uniqOrderList)

  }, [filterBuyer])

  const handleUpdateData = () => {
    // let params = `?fromDate=${filterDate.fromDate}&thruDate=${filterDate.thruDate}`;

    try {
      API.getOrder((res) => {
        if (!res?.data) {
          setQuoteData([]);
        } else {
          let _buyerList = res.data.filter((item) => !isNull(item?.party)).map((obj) => obj?.party);
          let _uniqBuyerList = uniqBy(_buyerList, 'id');

          setOptionsBuyer(_uniqBuyerList);
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

  const filteredData = applySortFilter(quoteData, getComparator(order, orderBy), [filterName, filterBuyer, filterByOrder]);

  const isDataNotFound = filteredData.length === 0;

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        filterDate={filterDate}
        onFilterDate={handleDateChanges}
        onGo={handleUpdateData}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        buyerFilterActive={true}
        filterBuyer={filterBuyer}
        onFilterBuyer={handleBuyerFilter}
        listOfBuyer={optionsBuyer}
        filterOrderActive={true}
        selectedOrder={filterByOrder}
        onFilterOrder={handleOrderFilter}
        optionsOrder={orderList}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListHead
              order={order}
              active={false}
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
                    party,
                    order_id,
                    delivery_date,
                    sum,
                    po_number,
                    monitoring_cutting,
                    monitoring_sewing,
                    monitoring_qc,
                    monitoring_fg
                  } = row;
                  let { percentage, difference } = completionOfOrder(
                    sum[0]?.total_qty,
                    monitoring_fg[0]?.output
                  );

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      // selected={isItemSelected}
                      // aria-checked={isItemSelected}
                    >
                      <TableCell align="left">{`SO-${id}`}</TableCell>
                      <TableCell align="left">{moment(delivery_date).format('DD MMMM YYYY')}</TableCell>
                      <TableCell align="left">{party?.name}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{sum[0]?.total_qty}</TableCell>
                      <TableCell align="left">{monitoring_cutting[0]?.output}</TableCell>
                      <TableCell align="left" style={(monitoring_sewing[0]?.output > monitoring_cutting[0]?.output ? { color: 'red'} : null)}>{monitoring_sewing[0]?.output}</TableCell>
                      <TableCell align="left" style={(monitoring_qc[0]?.output > monitoring_sewing[0]?.output ? { color: 'red'} : null)}>{monitoring_qc[0]?.output}</TableCell>
                      <TableCell align="left" style={(monitoring_fg[0]?.output > monitoring_qc[0]?.output ? { color: 'red'} : null)}>{monitoring_fg[0]?.output}</TableCell>
                      <TableCell align="left">{fPercent(percentage)}</TableCell>
                      <TableCell align="left">{difference}</TableCell>
                      <TableCell align="right">
                        <MoreMenu
                          id={order_id}
                          deleteActive={false}
                          name="Show"
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
        rowsPerPageOptions={[25, 50, 75]}
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

export default Display;
