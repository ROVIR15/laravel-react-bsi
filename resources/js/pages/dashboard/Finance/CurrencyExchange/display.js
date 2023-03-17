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
  TablePagination
} from '@mui/material';
//components
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../components/Table';
import moment from 'moment'
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: '#', alignRight: false },
  { id: 'idr', label: 'Last Rate (IDR)', alignRight: false },
  { id: 'updated_at', label: 'Time', alignRight: false }
];

function CurrencyExchangeDisplay({ data }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredData = data

  const isDataNotFound = filteredData.length === 0;

  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              active={false}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={data.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    id,
                    idr,
                    updated_at
                  } = row;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                    >
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{`$1/${fCurrency(idr, 'idr')}`}</TableCell>
                      <TableCell align="left">{moment(updated_at).format('lll')}</TableCell>
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default CurrencyExchangeDisplay;