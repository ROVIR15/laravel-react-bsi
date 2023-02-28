import React, { useEffect, useState } from 'react';
import { filter, initial, isArray } from 'lodash';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
//components
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../components/Table';
//
import BUYERLIST from '../../../_mocks_/buyer';
// api
import API from '../../../helpers';
import { serviceList2 } from '../../../helpers/data';
import moment from 'moment';
import { fNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'month', label: 'month', alignRight: false },
  { id: 'year', label: 'year', alignRight: false },
  { id: 'total_expected_output', label: 'Planned Output', alignRight: true },
  { id: 'total_amount_of_money', label: 'Planned Output Valuation', alignRight: true },
  // { id: 'total_sewing_output', label: 'Output Realisation', alignRight: true },
  // { id: 'total_sewing_output_valuation', label: 'Output Realisation Valuation', alignRight: true }
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
  if(!isArray(array)) return []
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_b) => _b.facility?.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function DisplayBuyer({ placeHolder }) {

  const [goodsData, setGoodsData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    function isEmpty(array){
      if(!Array.isArray(array)) return true;
      return !array.length;
    }

    if(isEmpty(goodsData)) {
      API.getManufacturePlanning((res) => {
		    if(!res){
          setGoodsData([]);
        } else {
          // let data = serviceList2(res.data);
          let data = res.map(function(payloadPerMonth){
            let info = payloadPerMonth.items_with_price.reduce(function(initial, payloadEachOrder) {
              // calculate expected pieces of good garment produced
              let total_expected_output = (parseFloat(payloadEachOrder?.expected_output) * parseFloat(payloadEachOrder?.work_days));

              // calculate expected pieces of good garment valuation
              let total_expected_valuation = total_expected_output * parseFloat(payloadEachOrder?.info?.avg_price[0]?.cm_price_avg);

              // store total_sewing_output
              // let sewing_output = parseFloat(payloadEachOrder?.ckck[0]?.total_output);

              // calculate valuation of garment sewing output
              // let val_sewing_output = sewing_output * parseFloat(payloadEachOrder?.info?.avg_price[0]?.cm_price_avg);

              return {
                total_amount_of_money: initial.total_amount_of_money + total_expected_valuation,
                total_expected_output: initial.total_expected_output + total_expected_output,
                // total_sewing_output: initial.total_sewing_output + sewing_output,
                // total_sewing_output_valuation: initial.total_sewing_output + val_sewing_output
              }
            }, { total_expected_output: 0, total_amount_of_money: 0, total_sewing_output: 0});

            return {...info, month: payloadPerMonth?.month, year: payloadPerMonth?.year}
          })

          setGoodsData(data);
        }
        });
      }
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = goodsData.map((n) => n.name);
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
    API.deleteService(id, function(res){
      if(res.success) setGoodsData([]);
    }).catch(function(error){
      alert('error')
    });
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - goodsData.length) : 0;

  const filteredData = applySortFilter(goodsData, getComparator(order, orderBy), filterName);

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
              rowCount={goodsData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { id, month, year, total_amount_of_money, total_expected_output, total_sewing_output, total_sewing_output_valuation
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
                      <TableCell align="left">{index}</TableCell>
                      <TableCell align="left">{`Planning - ${moment(new Date(`${year}-${month}`)).format("MMMM")}`}</TableCell>
                      <TableCell align="left">{year}</TableCell>
                      <TableCell align="right">{fNumber(total_expected_output)}</TableCell>
                      <TableCell align="right">{fNumber(total_amount_of_money)}</TableCell>
                      {/* <TableCell align="right">{fNumber(total_sewing_output)}</TableCell> */}
                      {/* <TableCell align="right">{fNumber(total_sewing_output_valuation)}</TableCell> */}
                      <TableCell align="right">
                        <MoreMenu id={id} deleteActive={false}/>
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
        count={goodsData.length ? goodsData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default DisplayBuyer