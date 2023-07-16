import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, ListToolbar } from '../../../components/Table';
import MoreMenu from './components/MoreMenu';
import ScrapModal from './components/ScrapCard';
import API from '../../../helpers'; // Assume API methods are defined in helpers/api.js

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'item_name', label: 'Item Name', alignRight: false },
  { id: 'stock_in', label: 'Stock In', alignRight: false },
  { id: 'stock_out', label: 'Stock Out', alignRight: false },
  { id: 'current_stock', label: 'Current Stock', alignRight: false }
];

function descendingComparator(a, b, orderBy) {
  return b[orderBy] - a[orderBy];
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const filteredArray = array.filter((item) => {
    const itemName = item.item_name && item.item_name.toString().toLowerCase();
    return itemName && itemName.indexOf(query.toLowerCase()) !== -1;
  });
  filteredArray.sort(comparator);
  return filteredArray;
}

function DisplayInventory({ placeHolder }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [orderBy, setOrderBy] = useState('item_name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [modalManageScrap, setModalManageScrap] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        API.getInventoryStock_alt((res) => {
          if(!res) return
          if(!res.data) throw new Error('failed')
          else setData(res.data)
        })
      } catch (error) {
        alert('Error fetching inventory data:', error);
        console.error('Error fetching inventory data:', error);
        // Handle error
      }
    };

    if (data.length === 0) {
      fetchData();
    }
  }, [data]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((item) => item.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)];
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
    setPage(0);
  };

  const handleOpenModal = (id) => {
    console.log(id)
    setSelectedData(id);
    setModalManageScrap(true);
  };

  const handleCloseModal = () => {
    setSelectedData(null);
    setModalManageScrap(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredData = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  return (
    <Card>
      <ScrapModal id={selectedData} modalOpen={modalManageScrap} onCloseModal={handleCloseModal} />
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
              rowCount={data.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, item_name, stock_in, stock_out, current_stock } = row;

                  const isItemSelected = selected.includes(id);

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      onClick={(event) => handleClick(event, id)}
                    >
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{item_name}</TableCell>
                      <TableCell align="left">{stock_in}</TableCell>
                      <TableCell align="left">{stock_out}</TableCell>
                      <TableCell align="left">{current_stock}</TableCell>
                      <TableCell align="right">
                        <MoreMenu scrapActive={true} handleOpenModalForScrap={() => handleOpenModal(id)} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {isDataNotFound && (
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default DisplayInventory;
