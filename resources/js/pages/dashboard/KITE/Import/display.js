import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { filter, isArray, isNull, uniqBy } from 'lodash';
import {
  Card,
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
import { ListHead, MoreMenu } from '../../../../components/Table';
import ListToolbar from './components/ListToolbar'
// api
import API from '../../../../helpers';
// 
import Test4 from '../../../../components/Test4'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'document_number', label: 'Nomor Dokumen PIB', alignRight: false },
  { id: 'date', label: 'Tanggal Rilis', alignRight: false },
  { id: 'type', label: 'Tipe Dokumen Pabean', alignRight: false },
  { id: 'purchase_order_id', label: 'ID Purchase Order', alignRight: false },
  { id: 'created_at', label: 'Dibuat', alignRight: false }
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_b) => _b.document_number?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function OutboundDelivery({ placeHolder }) {
  const [goodsReceipt, setGoodsReceipt] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    handleUpdateData();
  }, [filterMonthYear]);

  moment.locale('id');

  function handleUpdateData() {
    let params = `?monthYear=${filterMonthYear}`;

    try {
      API.getKiteImport(params, (res) => {
        if (!res) return;
        if (!res.data) {
          setGoodsReceipt([]);
        } else {
          setGoodsReceipt(res?.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = goodsReceipt.map((n) => n.name);
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
    // try {
    //   API.deleteShipment(id, function(res){
    //     if(!res) return undefined;
    //     if(!res.success) throw new Error('failed to delte data');
    //     else alert('success');
    //   })
    // } catch (error) {
    //   alert(error);
    // }
  };
  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - goodsReceipt.length) : 0;
  const filteredData = applySortFilter(goodsReceipt, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  return (
    <>
    <Card>
      <ListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        monthYearActive={true}
        filterMonthYear={filterMonthYear}
        onFilterMonthYear={handleMonthYearChanges}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table size="small">
            <ListHead
              active={false}
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={goodsReceipt.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, document_number, date, type, purchase_order_id, created_at } =
                    row;
                  const isItemSelected = selected.indexOf(name) !== -1;
                  let doc_type = '';

                  switch (type) {
                    case 1:
                      doc_type = 'BC 2.0';
                      break;
        
                    case 2:
                      doc_type = 'BC 2.4';
                      break;
        
                    case 3:
                      doc_type = 'BC 2.5';
                      break;
        
                    case 4:
                      doc_type = 'BC 2.8';
                      break;
                    
                    default:
                      doc_type = 'None';
                      break;
                  }
        
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
                      <TableCell align="left">{document_number}</TableCell>
                      <TableCell align="left">{moment(date).format('LL')}</TableCell>
                      <TableCell align="left">{doc_type}</TableCell>
                      <TableCell align="left"><a href={`../purchasing/purchase-order/${purchase_order_id}`}>{`PO-${purchase_order_id}`}</a></TableCell>
                      <TableCell align="left">{moment(created_at).format('LL')}</TableCell>
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
        rowsPerPageOptions={[15, 25, 50]}
        component="div"
        count={goodsReceipt.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
    </>
  );
}

export default OutboundDelivery;
