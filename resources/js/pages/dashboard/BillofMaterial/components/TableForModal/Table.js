import React, { useEffect, useState } from 'react';
import { filter, isArray } from 'lodash';
import {
  Box,
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
import Scrollbar from '../../../../../components/Scrollbar';
import SearchNotFound from '../../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../../components/Table';

import { fDate } from '../../../../../utils/formatTime';

// api
import API from '../../../../../helpers';
import { useLocation, useParams } from 'react-router-dom';
import { isEditCondition } from '../../../../../helpers/data';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'name', label: 'Style', alignRight: false },
    { id: 'category', label: 'Category', alignRight: false },
    { id: 'sub_category', label: 'Sub Category', alignRight: false },
    { id: 'size', label: 'Size', alignRight: false },
    { id: 'color', label: 'Color', alignRight: false },
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

function TableD({ list, placeHolder, selected, setSelected, update}) {

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
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
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
    name = {...name, product_feature_id: name.id, id: selected.length+1}
    const selectedIndex = selected.map(e => e.product_feature_id).indexOf(name.product_feature_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      if(isEditCondition(pathname.split('/'), id)) {
        try {      
          API.insertBOMItem([{...name, bom_id: id, qty: 0, unit_price: 0}], function(res){
            if(res.success) alert('success');
            else throw new Error('failed')
          })
          update();
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

  const handleFilterCategoryAndSub = (event) => {
    setFilterCategory(event.target.value)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), [filterName, filterCategory]);

  const isDataNotFound = filteredData.length === 0;  

  return (
    <div>
      <ListToolbar
        numSelected={0}
        filterName={filterName}
        onFilterName={handleFilterByName}
        categoryFilterActive={true}
        filterCategory={filterCategory}
        onFilterCategoryAndSub={handleFilterCategoryAndSub}
        placeHolder={placeHolder}
        onDeletedSelected={handleDeleteSelected}
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
                  const isItemSelected = selected.map(e => e.product_feature_id).indexOf(row.id) !== -1;
                  const disabled=(isItemSelected && isEditCondition(pathname.split('/'), paramsId))
                  const {
                    id,
                    name,
                    color,
                    size,
                    category,
                    sub_category,
                    value
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
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{category}</TableCell>
                      <TableCell align="left">{sub_category}</TableCell>
                      <TableCell align="left">{size}</TableCell>
                      <TableCell align="left">{color}</TableCell>
                      <TableCell align="left">{value}</TableCell>
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
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Box
      sx={{
        ...(selected.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
      >
        {selected.length > 0 ? (
          <Typography component="div" variant="subtitle1" py={"1em"} px={2}>
            {selected.length} selected
          </Typography>): null
        }
      </Box>

    </div>
  )
}

export default TableD;