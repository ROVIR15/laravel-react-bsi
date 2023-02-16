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

// api
import API from '../../../../../helpers';
import { useLocation, useParams } from 'react-router-dom';
import { isEditCondition } from '../../../../../helpers/data';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'name', label: 'Nama', alignRight: false },
    { id: 'prod_capacity', label: 'Kecepatan per Hari', alignRight: false },
    { id: 'labor_alloc', label: 'Manpower', alignRight: false },
    { id: 'cost_per_hour', label: 'Biaya Line', width: 200, alignRight: false },
    { id: 'overhead_cost', label: 'Biaya Tambahan', width: 200, alignRight: false },
    // { id: 'sub_category', label: 'Sub Category', alignRight: false },
    // { id: 'value', label: 'Value', alignRight: false },
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
    return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function TableD({ list, placeHolder, update, selected, setSelected}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
//   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      const newSelecteds = list.map((n, index) => ({...n, product_feature_id: n.id, id: index+1}));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.map(e => e.work_center_id).indexOf(name.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      let payload = {...name, seq: selected.length+1, id: selected.length+1, work_center_id: name.id}
      if(isEditCondition(pathname.split('/'), id)) {
        payload = {...payload, bom_id: id}
        try {
          API.insertOperation([payload], function(res){
            if(res.success) alert('success');
            else alert('failed')
          })
          update();
        } catch(e) {
          alert(e);
        }
      } else {
        newSelected = newSelected.concat(selected, payload);
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
    setSelected((prevSelected) => (prevSelected.filter((item) => (item.id !== id))));
  }

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
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
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
                  const isItemSelected = selected.map(e => e.work_center_id).indexOf(row.id) !== -1;
                  const disabled=(isItemSelected && isEditCondition(pathname.split('/'), paramsId))
                  const {
                    id,
                    name,
                    prod_capacity,
                    labor_alloc,
                    cost_per_hour,
                    overhead_cost
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
                      <TableCell align="left">{prod_capacity}</TableCell>
                      <TableCell align="left">{labor_alloc}</TableCell>
                      <TableCell align="left">{cost_per_hour}</TableCell>
                      <TableCell align="left">{overhead_cost}</TableCell>
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

      <Box
      sx={{
        ...(selected?.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
      >
        {selected?.length > 0 ? (
          <Typography component="div" variant="subtitle1" py={"1em"} px={2}>
            {selected.length} selected
          </Typography>): null
        }
      </Box>
    </div>
  )
}

export default TableD;