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
} from '@mui/material';
//components
import Scrollbar from '../../../../../components/Scrollbar';
import SearchNotFound from '../../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../../components/Table';

// api
import API from '../../../../../helpers';
import { useLocation, useParams } from 'react-router-dom';
import { isEditCondition } from '../../../../../helpers/data';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'item_name', label: 'Style', alignRight: false },
    { id: 'category', label: 'Kategori', alignRight: false },
    { id: 'current_stock', label: 'Stok Tersedia', alignRight: false },
    { id: 'unit_measurement', label: 'Satuan', alignRight: false },
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

  if (isArray(query) && query[1] > 0) {
    return filter(array, (_b) => {
      return (
        _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
        && _b.category_id === query[1]
      )
    });
  } else {
    return filter(array, (_b) => {
      return (
        _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
      )
    });
  }
}

function TableD({ list, order_id, update, placeHolder, selected, setSelected}) {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterCategory, setFilterCategory] = useState(0);

  const { pathname } = useLocation();
  const { id } = useParams();
  let paramsId = id;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredData.map((n, index) => ({...n, product_feature_id: n.id, id: index+1}));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.map(e => e.id).indexOf(name.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      if(isEditCondition(pathname.split('/'), id)) {
        try {
          const { id } = name;
          let payload = {
            product_feature_id: id,
            order_id,
            qty: 0,
            unit_price: 0,
            cm_price: 0,
            shipment_estimated: '2022-09-03'
          };
          // API.insertPurchaseOrderItem([payload], function (res) {
          //   if (res.success) alert('success');
          //   else throw new Error('failed to update order item')
          // });
          // update();
        } catch(e) {
          alert(e);
        }
      } else {
        newSelected = newSelected.concat(selected, name);
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

  const handleFilterCategoryAndSub = (event) => {
    setFilterCategory(event.target.value)
  }

  const handleDeleteData = (event, id) => {
    event.preventDefault();
    alert(id);
    API.deleteSalesOrder(id, function(res){
      if(res.success) setSalesOrderData([]);
    }).catch(function(error){
      alert('error')
    });
  }

  const handleDeleteSelected = () => {
    setSelected([])
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), [filterName, filterCategory]);

  const isDataNotFound = filteredData.length === 0;  

  return (
    <div>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        onDeletedSelected={handleDeleteSelected}
        filterCategory={filterCategory}
        onFilterCategoryAndSub={handleFilterCategoryAndSub}
        categoryFilterActive={true}
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
                  const isItemSelected = selected.map(e => e.sku_id).indexOf(row.sku_id) !== -1;
                  const disabled=(isItemSelected && isEditCondition(pathname.split('/'), paramsId))
                  const {
                    id,
                    sku_id,
                    category,
                    sub_category,
                    unit_measurement,
                    current_stock
                  } = row;
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
                          disabled={disabled}
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, row)}
                        />
                      </TableCell>
                      <TableCell align="left">{sku_id}</TableCell>
                      <TableCell align="left"> {row?.item_name}
                      </TableCell>
                      <TableCell align="left">{category}</TableCell>
                      <TableCell align="left">{current_stock}</TableCell>
                      <TableCell align="left">{unit_measurement}</TableCell>
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
        rowsPerPageOptions={[10]}
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