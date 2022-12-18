import React, { useEffect, useState } from 'react';
import { filter, isArray, isUndefined } from 'lodash';
import {
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { fCurrency } from '../../../../utils/formatNumber'
//components
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../../components/Table';
//
import BUYERLIST from '../../../../_mocks_/buyer';
// api
import API from '../../../../helpers';
// 
import moment from 'moment'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'payment_method_type_id', label: 'Tipe Payment', alignRight: false },
  { id: 'invoice_id', label: 'Invoice ID', alignRight: false },
  { id: 'ref_num', label: 'Referensi Number', alignRight: false },
  { id: 'effective_date', label: 'Payment Date', alignRight: false },
  { id: 'amount', label: 'Total Payment', alignRight: false }
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
    return filter(array, (_b) => _b.id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function FinanceAccountDisplay({ placeHolder }) {
  moment.locale("id")
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    handleUpdateData();
  }, [])

  const handleUpdateData = () => {
      try {
        API.getPayment('', (res) => {
          if(!res) return
          if(!res.data) {
            setList([]);
          } else {
            const _data = res.data.map(function(item){
              const { sales_invoice } = item;
              return {
                id: item?.id,
                payment_method_type_id: item?.type?.name,
                invoice_id: `INV. No ${sales_invoice.id}/${sales_invoice?.sales_order?.id}-${sales_invoice?.sales_order?.sales_order?.id}/${sales_invoice.invoice_date}/${sales_invoice?.sales_order?.sales_order?.po_number}`,
                ref_num: item?.ref_num,
                effective_date: item?.effective_date,
                amount: item?.amount,
                comment: item?.comment
              }
            });
            setList(_data);
          }
        });          
      } catch (error) {
        alert(error)
      }
  }

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

  const handleDeleteData = (event, id) => {
    event.preventDefault();

    try {
      // API.deletePayment(id, function(res){
      //   if(res.success) alert('success');
      //   else throw new Error('failed to delete data')
      // });  
    } catch(error) {
      alert(error)
    }

    setInvoice([])
    handleUpdateData();

  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredData = applySortFilter(list, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;  

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              active={false}
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
                  const {
                    id,
                    payment_method_type_id,
                    invoice_id,
                    ref_num,
                    effective_date,
                    amount
                  } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">{payment_method_type_id}</TableCell>
                      <TableCell align="left">{invoice_id}</TableCell>
                      <TableCell align="left">{ref_num}</TableCell>
                      <TableCell align="left">{moment(effective_date).format('LL')}</TableCell>
                      <TableCell align="left">Rp. {fCurrency(amount)}</TableCell>
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
    </Card>
  )
}

export default FinanceAccountDisplay;