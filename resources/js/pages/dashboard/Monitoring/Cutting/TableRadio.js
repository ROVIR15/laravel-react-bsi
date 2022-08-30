import React, { useEffect, useState } from 'react';
import { filter, isArray } from 'lodash';
import {
  Card,
  Radio,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
//components
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListRadioHead, ListToolbar, MoreMenu } from '../../../../components/Table';

// api
import API from '../../../../helpers';

import { calculateLayer, calculateRestan } from '../../../../helpers/data';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'date', label: 'date', alignRight: false },
  { id: 'so_number', label: 'Sales PO Number', alignRight: false },
  { id: 'po_number', label: 'PO Number', alignRight: false },
  { id: 'goods_name', label: 'Nama Barang', alignRight: false },
  { id: 'color', label: 'Warna', alignRight: false },
  { id: 'ratio', label: 'Ratio', alignRight: false },
  { id: 'marker_length', label: 'Panjang Marker', alignRight: false },
  { id: 'fabric_length', label: 'Panjang Kain', alignRight: false },
  { id: 'fabric_width', label: 'Lebar Kain', alignRight: false },
  { id: 'actual_spread_length', label: 'Panjang Actual', alignRight: false },
  { id: 'lot', label: 'Lot', alignRight: false },
  { id: 'layer', label: 'Layer', alignRight: false },
  { id: 'sisa', label: 'Restan', alignRight: false }
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
    return filter(array, (_b) => _b.po_number.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function TableD({ list, placeHolder, selected, setSelected}) {

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
    let newSelected = name;
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
    API.deleteSalesOrder(id, function(res){
      if(res.success) setSalesOrderData([]);
    }).catch(function(error){
      alert('error')
    });
  }

  const handleDeleteSelected = () => {
    setSelected()
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;  

  return (
    <div>
      <ListToolbar
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        onDeletedSelected={handleDeleteSelected}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListRadioHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = selected.id === row.id;
                  const {
                    id,
                    date,
                    po_number,
                    ratio,
                    marker_length,
                    fabric_length,
                    fabric_width,
                    actual_spread_length,
                    lot,
                    product_feature: { size, color, product: { goods } },
                    sales_order
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
                      <TableCell align="left">{date}</TableCell>
                      <TableCell align="left">{sales_order.po_number}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{goods.name}</TableCell>
                      <TableCell align="left">{color}</TableCell>
                      <TableCell align="left">{ratio}</TableCell>
                      <TableCell align="left">{marker_length}</TableCell>
                      <TableCell align="left">{fabric_length}</TableCell>
                      <TableCell align="left">{fabric_width}</TableCell>
                      <TableCell align="left">{actual_spread_length}</TableCell>
                      <TableCell align="left">{lot}</TableCell>
                      <TableCell align="left">{calculateLayer(fabric_length, actual_spread_length)}</TableCell>
                      <TableCell align="left">{calculateRestan(fabric_length, actual_spread_length).toFixed(2)}</TableCell>
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