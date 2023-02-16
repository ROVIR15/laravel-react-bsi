import React, { useEffect, useState } from 'react';
import { filter, isArray, isEmpty } from 'lodash';
import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  styled,
  IconButton
} from '@mui/material';
//Icons
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import { Icon } from '@iconify/react';

//components
import Scrollbar from '../../../../../components/Scrollbar';
import SearchNotFound from '../../../../../components/SearchNotFound';
import { ListHead, ListRadioHead, ListToolbar, MoreMenu } from '../../../../../components/Table';

import API from '../../../../../helpers';
import { useParams } from 'react-router-dom';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Costing Name', alignRight: false },
  { id: 'qty', label: 'Qty', alignRight: false },
  { id: 'final_price', label: 'Final Price', alignRight: false }
];

// ----------------------------------------------------------------------

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

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
    return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function TableCosting({
  initialRowsPerPage = 20,
  unsetPaper = false,
  list,
  disableChecklist = false,
  handleOpenModal,
  placeHolder,
  selected,
  setSelected,
  update
}) {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  //   const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.map((e) => e.id).indexOf(name.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      if (!isEmpty(id)) {
        try {
          API.insertNewFinancialBudgetOrderItem(
            { financial_order_budget_id: id, costing_id: name.id },
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
        update();
      }
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // let _new = selected.filter((_item) => (_item.id === name.id));
      // try {
      //   API.deleteFinancialBudgetOrderItem(_new.item_id, function(res){
      //     if(!res) return;
      //     if(!res.success) throw new Error('failed to delete row');
      //     else {
      //       alert('success')
      //     }
      //   })          
      // } catch (error) {
      //   alert(error);
      // }

      newSelected = newSelected.concat(selected.slice(0, -1));
      // update()
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

    try {
      API.deleteFinancialBudgetOrderItem(id, function (res) {
        if (res.success) alert('success');
        else throw new Error('failed to delete data');
      });
    } catch (error) {
      alert(error);
    }

    setInvoice([]);
    handleUpdateData();
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list?.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData?.length === 0;

  return (
    <Card sx={unsetPaper ? { boxShadow: 'unset', padding: 'unset' } : null}>
      {!disableChecklist ? (
        <ListToolbar
          numSelected={selected?.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeHolder={placeHolder}
          sizeSearchBox="small"
        />
      ) : (
        <CardContent>
          <GridData>
            <Typography variant="h6">Items</Typography>
            <IconButton
              onClick={handleOpenModal}
              sx={{
                height: '36px',
                width: '36px',
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(54, 179, 126)'
              }}
            >
              <Icon icon={plusSquare} />
            </IconButton>
          </GridData>
        </CardContent>
      )}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListHead
              active={!disableChecklist}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={list?.length}
              numSelected={selected?.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {isEmpty(list)
                ? null
                : filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, qty, final_price } = row;
                      if (disableChecklist)
                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checklist">
                            <TableCell align="left">{id}</TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{qty}</TableCell>
                            <TableCell align="left">{final_price}</TableCell>
                          </TableRow>
                        );
                      else {
                        const isItemSelected = selected.map((e) => e.id).indexOf(row.id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="radio"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                disabled={isItemSelected}
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, row)}
                              />
                            </TableCell>
                            <TableCell align="left">{id}</TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{qty}</TableCell>
                            <TableCell align="left">{final_price}</TableCell>
                            <MoreMenu id={id} deleteActive={true} handleDelete={(event) => handleDeleteData(event, id)}/>
                          </TableRow>
                        );
                      }
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
        count={list?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default TableCosting;
