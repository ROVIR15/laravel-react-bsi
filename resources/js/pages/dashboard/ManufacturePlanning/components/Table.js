import React, { useEffect, useState } from 'react';
import { filter, isArray } from 'lodash';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Radio,
} from '@mui/material';
//components
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListRadioHead, ListToolbar, MoreMenu } from '../../../../components/Table';

import { isUndefined } from 'lodash'

// api
import API from '../../../../helpers';
import { useLocation, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'order_id', label: 'Order ID', alignRight: false },
    { id: 'po_number', label: 'SO Number', alignRight: false },
    { id: 'sold_to', label: 'Buyer', alignRight: false },
    { id: 'total_qty', label: 'Total Qty', alignRight: false },
    { id: 'total_money', label: 'Amount of Money', alignRight: false },
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
    return filter(array, (_b) => _b.po_number?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function TableD({ list, placeHolder, update, selected, setSelected}) {
  const {id} = useParams();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    let payload = {}
    if(isUndefined(id)){
      payload = {
        id: name.id,
        po_number: name.po_number,
        total_qty: name.total_qty,
        manufacture_planning_item_id: name.id,
        sales_order_id: name.id,
        expected_output: 0,
        work_days: 0
      }
    } else {
      payload = {
        id: name.id,
        manufacture_planning_item_id: name.id,
        manufacture_planning_id: id,
        sales_order_id: name.id,
        expected_output: 0,
        work_days: 0
      }  
    }
    setSelected(payload);
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

  // const handleDeleteData = (event, id) => {
  //   event.preventDefault();
  //   API.deleteSalesOrder(id, function(res){
  //     if(res.success) setSalesOrderData([]);
  //   }).catch(function(error){
  //     alert('error')
  //   });
  // }

  const handleDeleteSelected = () => {
    setSelected([])
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;  

  return (
    <div>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        onDeletedSelected={handleDeleteSelected}
        sizeSearchBox="small"
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table
            size="small"
          >
            <ListRadioHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={list.length}
              numSelected={selected}
              onRequestSort={handleRequestSort}
              // onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  let isItemSelected = false;
                  if(selected?.sales_order_id) isItemSelected = selected.sales_order_id === row.id;
                  const {
                    id,
                    order_id,
                    po_number,
                    sold_to,
                    total_qty,
                    total_money
                  } = row;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="radio"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="radio">
                        <Radio
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, row)}
                        />
                      </TableCell>
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{order_id}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{sold_to}</TableCell>
                      <TableCell align="left">{total_qty}</TableCell>
                      <TableCell align="left">{total_money}</TableCell>
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
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default TableD;