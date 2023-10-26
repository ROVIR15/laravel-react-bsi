import React, { useEffect, useState } from 'react';
import { filter, isArray, isEqual, isNull, uniqBy, merge } from 'lodash';
import {
  Box,
  Card,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  Stack,
  styled
} from '@mui/material';
//components
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, MoreMenu } from '../../../components/Table';
import ListToolbar from './components/ListToolbar';
import ReactApexChart from 'react-apexcharts';

//
import moment from 'moment';
// api
import API from '../../../helpers';
import { fPercent } from '../../../utils/formatNumber';

import { BaseOptionChart } from '../../../components/charts';
import { fNumber } from '../../../utils/formatNumber';

moment.locale('id');
// ----------------------------------------------------------------------
const DataQuantity = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '24px',
  fontColor: '#fff',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  width: '-webkit-fill-available',
  color: 'rgb(255, 255, 255)',
  backgroundColor: 'rgb(54, 47, 217)'
}));

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'date', label: 'Tanggal Pengirima', alignRight: false },
  { id: 'party_id', label: 'Pembeli', alignRight: false },
  { id: 'po_number', label: 'PO Number', alignRight: false },
  { id: 'qty', label: 'Qty Order', alignRight: false },
  { id: 'output_cutting', label: 'Hasil Cutting', alignRight: false },
  { id: 'output_sw', label: 'Hasil Sewing', alignRight: false },
  { id: 'output_qc', label: 'Hasil Finished Goods (QC)', alignRight: false },
  { id: 'output_fg', label: 'Hasil Garment Terpacking', alignRight: false },
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

  if (query[1] !== 0)
    if (isEqual(query[2], 0)) {
      return filter(
        array,
        (_b) =>
          _b.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
          _b.party?.id === query[1]
      );
    } else {
      return filter(
        array,
        (_b) =>
          _b.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 &&
          _b.party?.id === query[1] &&
          _b.order_id === query[2]
      );
    }
  else {
    return filter(
      array,
      (_b) => _b.po_number?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
    );
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

  const [data, setData] = useState({
    cutting: 0,
    sewing: 0,
    qc: 0,
    finished_goods: 0,
    percentage_c: 0,
    percentage_s: 0,
    percentage_qc: 0,
    percentage_fg: 0,
    total_order: 0
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
    //check first is that order_id was found on recent data list;
    let isFound = filteredData.filter((item) => item.order_id === filterByOrder).length > 0;
    if (!isFound) setFilterByOrder(0);
    let _orderList = filteredData
      .filter((item) => !isNull(item?.po_number))
      .map((obj) => ({ order_id: obj.order_id, po_number: obj.po_number }));
    let _uniqOrderList = uniqBy(_orderList, 'order_id');
    setOrderList(_uniqOrderList);
  }, [filterBuyer]);

  const handleUpdateData = () => {
    // let params = `?fromDate=${filterDate.fromDate}&thruDate=${filterDate.thruDate}`;

    try {
      let params = filterMonthYear ? `?monthYear=${filterMonthYear}` : '';
      API.getOrder(params, (res) => {
        if (!res?.data) {
          setQuoteData([]);
        } else {
          let _buyerList = res.data.filter((item) => !isNull(item?.party)).map((obj) => obj?.party);
          let _uniqBuyerList = uniqBy(_buyerList, 'id');

          let additi = res.data.reduce(
            function (init, next) {
              let sum_of_cutting = next.monitoring_cutting[0].output
                ? next.monitoring_cutting[0].output
                : 0;
              let sum_of_sewing = next.monitoring_sewing[0].output
                ? next.monitoring_sewing[0].output
                : 0;
              let sum_of_qc = next.monitoring_qc[0].output ? next.monitoring_qc[0].output : 0;
              let sum_of_fg = next.monitoring_fg[0].output ? next.monitoring_fg[0].output : 0;
              let total_order = next.sum[0].total_qty ? next.sum[0].total_qty : 0;

              return {
                ...init,
                cutting: init.cutting + parseInt(sum_of_cutting),
                sewing: init.sewing + parseInt(sum_of_sewing),
                qc: init.qc + parseInt(sum_of_qc),
                finished_goods: init.finished_goods + parseInt(sum_of_fg),
                total_order: init.total_order + parseInt(total_order)
              };
            },
            {
              cutting: 0,
              sewing: 0,
              qc: 0,
              finished_goods: 0,
              total_order: 0
            }
          );

          additi = {
            ...additi,
            percentage_c: additi.total_order > 0 ? (additi.cutting / additi.total_order) * 100 : 0,
            percentage_s: additi.total_order > 0 ? (additi.sewing / additi.total_order) * 100 : 0,
            percentage_qc: additi.total_order > 0 ? (additi.qc / additi.total_order) * 100 : 0,
            percentage_fg:
              additi.total_order > 0 ? (additi.finished_goods / additi.total_order) * 100 : 0
          };

          setData(additi);
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

  //----------------filter by month and year------------------//
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));
  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };
  //----------------------------------------------------------//

  useEffect(() => {
    handleUpdateData();
  }, [filterMonthYear]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quoteData.length) : 0;

  const filteredData = applySortFilter(quoteData, getComparator(order, orderBy), [
    filterName,
    filterBuyer,
    filterByOrder
  ]);

  const isDataNotFound = filteredData.length === 0;

  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '55%'
        },
        colors: ['#fff'],
        dataLabels: {
          show: true,
          label: {
            show: false
          },
          value: {
            color: '#fff',
            fontSize: '20px',
            offsetY: '-10',
            show: true
          },
          total: {
            show: false,
            formatter: function (w) {
              return w.globals.seriesTotals[0] + '%';
            }
          }
        }
      }
    },
    fill: {
      type: 'solid',
      colors: ['#fff']
    },
    stroke: {
      lineCap: 'round'
    },
    legend: {
      show: false
    },
    labels: ['']
  });

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2}>
        <DataQuantity>
          <div>
            <ReactApexChart
              type="radialBar"
              series={[data.percentage_c]}
              options={chartOptions}
              height={150}
              width={100}
            />
          </div>
          <Box sx={{ marginLeft: '24px' }}>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.cutting)} pcs</Typography>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.total_order)} pcs</Typography>
            <Typography variant="body2" component="p">
              Persentase Penyelesaiaan Cutting
            </Typography>
          </Box>
        </DataQuantity>

        <DataQuantity>
          <div>
            <ReactApexChart
              type="radialBar"
              series={[data.percentage_s]}
              options={chartOptions}
              height={150}
              width={100}
            />
          </div>
          <Box sx={{ marginLeft: '24px' }}>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.sewing)} pcs</Typography>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.total_order)} pcs</Typography>
            <Typography variant="body2" component="p">
              Persentase Penyelesaiaan Sewing
            </Typography>
          </Box>
        </DataQuantity>

        <DataQuantity>
          <div>
            <ReactApexChart
              type="radialBar"
              series={[data.percentage_qc]}
              options={chartOptions}
              height={150}
              width={100}
            />
          </div>
          <Box sx={{ marginLeft: '24px' }}>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.qc)} pcs</Typography>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.total_order)} pcs</Typography>
            <Typography variant="body2" component="p">
              Persentase Penyelesaiaan QC
            </Typography>
          </Box>
        </DataQuantity>

        <DataQuantity>
          <div>
            <ReactApexChart
              type="radialBar"
              series={[data.percentage_fg]}
              options={chartOptions}
              height={150}
              width={100}
            />
          </div>
          <Box sx={{ marginLeft: '24px' }}>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.finished_goods)} pcs</Typography>
            <Typography variant="h5" style={{color: 'white'}}>{fNumber(data.total_order)} pcs</Typography>
            <Typography variant="body2" component="p">
              Persentase Penyelesaiaan Finished Goods
            </Typography>
          </Box>
        </DataQuantity>
      </Stack>

      <Card>
        <ListToolbar
          monthYearActive={true}
          filterMonthYear={filterMonthYear}
          onFilterMonthYear={handleMonthYearChanges}
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
                        <TableCell align="left">
                          {moment(delivery_date).format('DD MMMM YYYY')}
                        </TableCell>
                        <TableCell align="left">{party?.name}</TableCell>
                        <TableCell align="left">{po_number}</TableCell>
                        <TableCell align="left">{sum[0]?.total_qty}</TableCell>
                        <TableCell align="left">{monitoring_cutting[0]?.output}</TableCell>
                        <TableCell
                          align="left"
                          style={
                            monitoring_sewing[0]?.output > monitoring_cutting[0]?.output
                              ? { color: 'red' }
                              : null
                          }
                        >
                          {monitoring_sewing[0]?.output}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={
                            monitoring_qc[0]?.output > monitoring_sewing[0]?.output
                              ? { color: 'red' }
                              : null
                          }
                        >
                          {monitoring_qc[0]?.output}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={
                            monitoring_fg[0]?.output > monitoring_qc[0]?.output
                              ? { color: 'red' }
                              : null
                          }
                        >
                          {monitoring_fg[0]?.output}
                        </TableCell>
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
    </Stack>
  );
}

export default Display;
