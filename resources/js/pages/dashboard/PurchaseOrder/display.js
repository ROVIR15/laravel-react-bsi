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
import ChipStatusProduction from '../../../components/ChipStatusProduction';
import ChipStatus from '../../../components/ChipStatus';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../components/Table';

import {useLocation} from 'react-router-dom';

//
import BUYERLIST from '../../../_mocks_/buyer';
// api
import API from '../../../helpers';

import { fCurrency } from '../../../utils/formatNumber';
import useAuth from '../../../context';
import moment from 'moment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'po_number', label: 'Ref. Quote', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'completion_status', label: 'Progress', alignRight: false },
    { id: 'bought_from', label: 'Supplier', alignRight: false },
    { id: 'total_qty', label: 'Qty', alignRight: false },
    { id: 'total_money', label: 'Total', alignRight: false },
    { id: 'issue_date', label: 'Issue Date', alignRight: false },
    { id: 'valid_thru', label: 'Valid Thru', alignRight: false },
    { id: 'delivery_date', label: 'Delivery Date', alignRight: false }
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

function PurchaseOrder({ placeHolder }) {

  const [purchaseOrderData, setpurchaseOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const { user } = useAuth();

  useEffect(() => {

  }, [])

  useEffect(() => {
    handleUpdateData()
  }, [filterMonthYear])

  const handleUpdateData = () => {
    const { role } = user;
    let params;

    setLoading(true);

    role.map((item) => {
      if(item.approve && item.submit && item.review) {
        params=null
        return
      }
      if(item.approve) {
        params='?level=approve'
        return
      } 
      if (item.submit) {
        params='?level=submit'
        return
      }
      if (item.review) {
        params='?level=review'
        return
      }
    });

    params = params + `&monthYear=${filterMonthYear}`;

    try {
      API.getPurchaseOrder(params,(res) => {
		  if(!res) return
		  if(!res.data) {
          setpurchaseOrderData([]);
        } else {
          setpurchaseOrderData(res.data);
        }
      });      
    } catch (error) {
      alert('error')
    }

    setLoading(false);

  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = purchaseOrderData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  }

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

  const handleDateChanges = (event) => {
    const { name, value} = event.target;
    setFilterDate((prevValue) => {
      if(name === 'fromDate') {
        if(value > prevValue.thruDate) {
          alert('from date cannot be more than to date');
          return prevValue;
        } else {
          return ({...prevValue, [name]: value});
        }
      } 
      else if(name === 'thruDate') {
        if(value < prevValue.fromDate) {
          alert('to date cannot be less than fron date');
          return prevValue;
        } else {
          return ({...prevValue, [name]: value});
        }
      }
      else {
        return ({...prevValue, [name]: value});
      }
    })
  }


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

    API.deletePurchaseOrder(id, function(res){
      if(res.success) setpurchaseOrderData([]);
    }).catch(function(error){
      alert(error)
    });

    handleUpdateData();
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - purchaseOrderData.length) : 0;

  const filteredData = applySortFilter(purchaseOrderData, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;  

  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        monthYearActive={true}
        filterMonthYear={filterMonthYear}
        onFilterMonthYear={handleMonthYearChanges}
        filterName={filterName}
        onFilterName={handleFilterByName}
        placeHolder={placeHolder}
        onGo={handleUpdateData}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              active={false}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={purchaseOrderData.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const {
                    id,
                    order_id,
                    po_number,
                    bought_from,
                    issue_date,
                    valid_thru,
                    delivery_date,
                    sum,
                    completion_status,
                    status
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
                      <TableCell align="left">{index+1}</TableCell>
                      <TableCell align="left">{po_number}</TableCell>
                      <TableCell align="left">{ChipStatus(status[0]?.status_type)}</TableCell>
                      <TableCell align="left">{ChipStatusProduction(completion_status[0]?.status?.name)}</TableCell>
                      <TableCell align="left">{bought_from}</TableCell>
                      <TableCell align="left">{sum?.length ? sum[0].total_qty : null}</TableCell>
                      <TableCell align="left">Rp. {sum?.length ? fCurrency(sum[0].total_money) : null}</TableCell>
                      <TableCell align="left">{issue_date}</TableCell>
                      <TableCell align="left">{valid_thru}</TableCell>
                      <TableCell align="left">{delivery_date}</TableCell>
                      <TableCell align="right">
                        <MoreMenu id={id} document={true} handleDelete={(event) => handleDeleteData(event, id)} />
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
                    {loading ? 
                      (<Typography variant="body2" align="center">Please Wait</Typography>):
                      (<SearchNotFound searchQuery={filterName} />)
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[15, 25, 50]}
        component="div"
        count={purchaseOrderData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default PurchaseOrder;