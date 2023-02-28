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
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, MoreMenu } from '../../../../components/Table';
import ListToolbar from '../components/ListToolbar';
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
  if (query[1] !== 0)
    if (query[2] === 0) {
      return filter(
        array,
        (_b) =>
          _b.sales_order?.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
          _b?.sales_order?.id === query[1]
      );
    } else {
      return filter(
        array,
        (_b) =>
          _b.sales_order?.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
          _b?.sales_order?.id === query[1] &&
          _b?.facility_id === query[2]
      );
    }
  else {
    if (query[2] === 0)
      return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1);
    else
      return filter(
        array,
        (_b) => _b.sales_order?.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
      );
  }

  // return stabilizedThis.map((el) => el[0]);
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

  //----------------filter by sales order----------------------//
  const [filterBySalesOrder, setFilterBySalesOrder] = useState(0);
  const [salesOrderList, setSalesOrderList] = useState([]);

  const handleSalesOrderFilter = (event) => {
    setFilterBySalesOrder(event.target.value);
  };
  //------------------------------------------------------------//

  //----------------filter by facility----------------------//
  const [filterByFacility, setFilterByFacility] = useState(0);
  const [facilityList, setFacilityList] = useState([]);

  const handleFacilityFilter = (event) => {
    setFilterByFacility(event.target.value);
  };
  //------------------------------------------------------------//

  useEffect(() => {
    handleUpdateData();
  }, []);

  useEffect(() => {
    //check first is that order_id was found on recent data list;
    let isFound = filteredData.filter((item) => item.facility_id === filterByFacility).length > 0;

    if (!isFound) setFilterByFacility(0);
    // if (isEqual(filterBySalesOrder, 0)) return;
    let _usedLine = filteredData
      .filter((item) => !isNull(item.facility_id))
      .map((obj) => ({ facility_id: obj.facility_id, line: obj.line }));
    let _uniqUsedLine = uniqBy(_usedLine, 'facility_id');

    setFacilityList(_uniqUsedLine);
  }, [filterBySalesOrder]);

  const handleUpdateData = () => {
    let params = `?fromDate=${filterDate.fromDate}&thruDate=${filterDate.thruDate}`;

    try {
      API.getMonitoringSewing(params, (res) => {
        if (!res.data) {
          setQuoteData([]);
        } else {
          let _filteredSalesOrder = res.data
            .filter((item) => !isNull(item.sales_order))
            .map((obj) => obj.sales_order);
          let _salesOrder = uniqBy(_filteredSalesOrder, 'id');

          let _filteredFacilityLine = res.data
            .filter((item) => !isNull(item.sales_order))
            .map((obj) => ({ facility_id: obj.facility_id, line: obj.line }));
          let _facility = uniqBy(_filteredFacilityLine, 'facility_id');

          setFacilityList(_facility);

          setSalesOrderList(_salesOrder);
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

  const filteredData = applySortFilter(quoteData, getComparator(order, orderBy), [
    filterName,
    filterBySalesOrder,
    filterByFacility
  ]);

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
        filterSalesOrderActive={true}
        onFilterSalesOrder={handleSalesOrderFilter}
        optionsSalesOrder={salesOrderList}
        selectedSalesOrder={filterBySalesOrder}
        filterFacilityActive={true}
        onFilterFacility={handleFacilityFilter}
        optionsFacility={facilityList}
        selectedFacility={filterByFacility}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
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
