import React, { useEffect, useState } from 'react';
import { filter, isArray, isEmpty, isNull, uniqBy } from 'lodash';
import { styled } from '@mui/material/styles';
import {
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Chip
} from '@mui/material';

//components
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, MoreMenu } from '../../../components/Table';
import ListToolbar from './components/ListToolbar';
import Test2 from '../../../components/Test2';

// api
import API from '../../../helpers';
import { itemNameV1 } from '../../../helpers/data';

import useAuth from '../../../context';
import moment, { isMoment } from 'moment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'BOM Name', alignRight: false }
];

const ChipStyled = styled(Chip)(({ theme }) => ({
  color: '#fff',
  fontWeight: 'bolder'
}));

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
  if (!isEmpty(query[0])) {
    return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function DisplayBOM({ placeHolder }) {
  let now = new Date();

  const [bomData, setBomData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [optionsBuyer, setOptionsBuyer] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { user } = useAuth();

  useEffect(() => {
    handleUpdateData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bomData.map((n) => n.name);
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

  const handleUpdateData = () => {
    try {
      API.getBOM_alt('', (res) => {
        if (!res) return;
        if (!res.data) {
          setBomData([]);
        } else {
          let _data = res.data.map(function (item) {
            let item_name = `${item?.product_feature?.product?.goods?.name} - ${item?.product_feature?.color}`;
            return { id: item.id, product_feature_id: item.product_feature_id, item_name };
          });

          setBomData(_data);
        }
      });
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  };

  const handleDeleteData = (event, id) => {
    event.preventDefault();

    try {
      API.deleteBOM_alt(id);
    } catch (error) {
      alert('error');
    }

    handleUpdateData();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bomData.length) : 0;

  const filteredData = applySortFilter(bomData, getComparator(order, orderBy), [filterName]);

  const isDataNotFound = filteredData.length === 0;

  return (
    <>
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
                rowCount={bomData.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    console.log(row);
                    const { id, product_feature_id } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{`BOM - ${row?.item_name}`}</TableCell>
                        <TableCell align="right">
                          <MoreMenu
                            id={id}
                            document={true}
                            handleDelete={(event) => handleDeleteData(event, id)}
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
          count={bomData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export default DisplayBOM;
