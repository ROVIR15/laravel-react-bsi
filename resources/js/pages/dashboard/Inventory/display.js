import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  Card,
  FormControl,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  CardContent,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField
} from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead } from '../../../components/Table';
import ListToolbar from './components/ListToolbar';
import MoreMenu from './components/MoreMenu';
import ScrapModal from './components/ScrapCard';
import API from '../../../helpers'; // Assume API methods are defined in helpers/api.js
import { filter, isArray, isEmpty, isEqual } from 'lodash';

import downloadIcon from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

import jsonexport from 'jsonexport';
import { fCurrency } from '../../../utils/formatNumber';

const TABLE_HEAD = [
  // { id: 'id', label: 'ID', alignRight: false },
  { id: 'sku_id', label: 'SKU ID', alignRight: false },
  { id: 'item_name', label: 'Nama Item', alignRight: false },
  { id: 'facility_name', label: 'Fasilitas Name', alignRight: false },
  { id: 'category_name', label: 'Kategori Barang', alignRight: false },
  { id: 'current_stock', label: 'Qty', alignRight: false }
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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_b) => _b.item_name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function DisplayInventory({ placeHolder }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [orderBy, setOrderBy] = useState('item_name');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [modalManageScrap, setModalManageScrap] = useState(false);

  const fetchData = () => {
    // if(isEqual(filterCosting, 0) && isEqualfilterFacility,0) alert('Please select cbd/sales-order and facility');
    // else {
    let param = `?costing=${filterCosting}&facility=${filterFacility}`;
    try {
      API.getInventoryStock_alt(param, (res) => {
        if (!res) return;
        if (!res.data) throw new Error('failed');
        else setData(res.data);
      });
    } catch (error) {
      setData([]);
      alert('Error fetching inventory data:', error);
      // Handle error
    }
    // }
  };
  const [optionsFilter, setOptionsFilter] = useState([]);
  const [optionsCosting, setCostingOptions] = useState([]);

  useEffect(() => {
    //get facility

    try {
      API.getFacility('', (res) => {
        if (!res) return;
        if (isEmpty(res.data)) {
          setOptionsFilter([]);
        } else {
          let a = res.data.map(function (item) {
            return {
              id: item.id,
              name: item.name,
              facility_type: item.type.name
            };
          });
          setOptionsFilter(a);
        }
      });

      API.getCostingV2((res) => {
        if (!res) return;
        if (!res.data) {
          setCostingOptions([]);
        } else {
          setCostingOptions(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, []);

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

  const handleDownload = () => {
    // Convert JSON to CSV
    jsonexport(data, function (err, csv) {
      if (err) return console.error(err);

      // Create a Blob containing the CSV data
      const blob = new Blob([csv], { type: 'text/csv' });

      // Create a link to download the file
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'master_data_barang.csv';

      // Trigger the download
      link.click();
    });
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

  const [filterName, setFilterName] = useState('');
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const [filterFacility, setFilterFacility] = useState(0);
  const handleFilterFacility = (event) => {
    setFilterFacility(event.target.value);
    setPage(0);
  };

  const [filterCategory, setFilterCategory] = useState(0);
  const handleFilterCategory = (event) => {
    setFilterCategory(event.target.value);
    setPage(0);
  };

  const [filterCosting, setFilterCosting] = useState(0);
  const handleFilterCosting = (event) => {
    setFilterCosting(event.target.value);
    setPage(0);
  };

  const handleOpenModal = (id) => {
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
    <Stack direction="column" spacing={2}>
      <ScrapModal id={selectedData} modalOpen={modalManageScrap} onCloseModal={handleCloseModal} />
      <Paper style={{ padding: '1em 0.5em' }}>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              disablePortal
              onInputChange={(event, newInputValue) => {
                let newValue = newInputValue.split('-')[0];
                let _event = { target: { value: parseInt(newValue) } };  
                handleFilterCosting(_event);
              }}
              options={optionsCosting}
              isOptionEqualToValue={(option, value) => {
                if (option.id === value) return option;
              }}
              getOptionLabel={(option) => {
                return `${option.id}-${option.name}`;
              }}
              renderInput={(params) => <TextField fullWidth {...params} label="CBD/Sales Order"/>}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Facility</InputLabel>
            <Select value={filterFacility} label="Buyer" onChange={handleFilterFacility}>
              <MenuItem value={0}>All</MenuItem>
              {isArray(optionsFilter)
                ? optionsFilter?.map(function (item) {
                    return <MenuItem value={item.id}>{item.name}</MenuItem>;
                  })
                : null}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={fetchData}>
            Go
          </Button>
        </Stack>
      </Paper>
      <Card>
        <ListToolbar
          // filter costing
          filterCosting={filterCosting}
          costingFilterActive={false}
          onFilterCosting={handleFilterCosting}
          costingList={optionsCosting}
          // filter cateogry
          categoryFilterActive={true}
          filterCategory={filterCategory}
          onFilterCategoryAndSub={handleFilterCategory}
          // filter facility
          facilityFilterActive={false}
          filterFacility={filterFacility}
          filterList={optionsFilter}
          onFilterFacility={handleFilterFacility}
          // name
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeHolder={placeHolder}
          onGo={fetchData}
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
                    const {
                      id,
                      item_name,
                      sku_id,
                      unit_measurement,
                      facility_name,
                      category,
                      current_stock
                    } = row;

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
                        <TableCell align="left">{sku_id}</TableCell>
                        <TableCell align="left">{item_name}</TableCell>
                        <TableCell align="left">{facility_name}</TableCell>
                        <TableCell align="left">{category}</TableCell>
                        <TableCell align="left">{`${current_stock} ${unit_measurement}`}</TableCell>
                        <TableCell align="right">
                          <MoreMenu
                            scrapActive={true}
                            handleOpenModalForScrap={() => handleOpenModal(id)}
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

      <Button
        fullWidth
        variant="contained"
        startIcon={<Icon icon={downloadIcon} />}
        onClick={handleDownload}
      >
        Download
      </Button>
    </Stack>
  );
}

export default DisplayInventory;
