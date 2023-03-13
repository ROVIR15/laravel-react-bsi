import React, { useEffect, useImperativeHandle, useState } from 'react';
import { filter, isArray } from 'lodash';
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
import { ListHead, ListToolbar, MoreMenu } from '../../../../components/Table';

// api
import API from '../../../../helpers';

import { useParams } from 'react-router-dom';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'po_number', label: 'Style', alignRight: false },
  { id: 'qty', label: 'Size', alignRight: false },
  { id: 'amount', label: 'Color', alignRight: false }
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
  if (query) {
    return filter(array, (_b) => _b.po_number?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function TableD({ list, type, placeHolder, selected, setSelected }) {
  const { id } = useParams();
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.map((e) => e.id).indexOf(name.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);

      if (id) {
        if (type === 1) {
          try {
            API.insertReconcilePurchaseOrder(
              [{ reconcile_id: id, order_id: name.order_id, purchase_order_id: name.id }],
              function (res) {
                if (!res) return;
                if (!res.success) throw new Error('failed to store');
                else {
                  alert('done');
                }
              }
            );
          } catch (error) {
            alert(error);
          }
        }

        if (type === 2) {
          try {
            API.insertReconcileSalesOrder(
              [{ reconcile_id: id, order_id: name.order_id, sales_order_id: name.id }],
              function (res) {
                if (!res) return;
                if (!res.success) throw new Error('failed to store');
                else {
                  alert('done');
                }
              }
            );
          } catch (error) {
            alert(error);
          }
        }

        if (type === 3) {
          try {
            API.insertReconcileCosting([{ reconcile_id: id, costing_id: name.id }], function (res) {
              if (!res) return;
              if (!res.success) throw new Error('failed to store');
              else {
                alert('done');
              }
            });
          } catch (error) {
            alert(error);
          }
        }
      }
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
    setSelected(newSelected, type);
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
    // API.deleteSalesOrder(id, function(res){
    //   if(res.success) setSalesOrderData([]);
    // }).catch(function(error){
    //   alert('error')
    // });
  };

  const handleDeleteSelected = () => {
    setSelected([]);
  };

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
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={list.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = selected.map((e) => e.id).indexOf(row.id) !== -1;
                  const { id, po_number, qty, amount } = row;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, row)}
                        />
                      </TableCell>
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{qty}</TableCell>
                      <TableCell align="left">{amount}</TableCell>
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
  );
}

export default TableD;
