import React, { useEffect, useState } from 'react';
import { filter, isArray, isEmpty, isNull, uniqBy } from 'lodash';
import { styled } from '@mui/material/styles';
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Chip,
} from '@mui/material';

//components
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, MoreMenu } from '../../../components/Table';
import ListToolbar from './components/ListToolbar';

// api
import API from '../../../helpers';

import useAuth from '../../../context';
import moment, { isMoment } from 'moment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'buyer', label: 'Buyer', alignRight: false },
  { id: 'date', label: 'Issue Date', alignRight: false },
  { id: 'name', label: 'BOM Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'qty', label: 'Quantity', alignRight: false },
  { id: 'remarks', label: 'Remarks', alignRight: false, width: 300 },
];

const ChipStyled = styled(Chip)(({theme}) => ({
  color: '#fff',
  fontWeight: 'bolder'
}))

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
  if (query[1] !== "All") {
    if(query[2] !== 0) {
      return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 
              && _b.status[0]?.status_type.toLowerCase().indexOf(query[1].toLowerCase()) !== -1
              && _b.party?.id === query[2]);
    } else {
      return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1 
              && !isEmpty(_b.status) && _b.status[0]?.status_type.toLowerCase().indexOf(query[1].toLowerCase()) !== -1);
    }
  } else {
    if(query[2] !== 0) return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1
                                && _b.party?.id === query[2]);
    else return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query[0]?.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

function DisplayBOM({ placeHolder }) {
  let now = new Date()
  
  const [bomData, setBomData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [optionsBuyer, setOptionsBuyer] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [filterBuyer, setFilterBuyer] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));

  const [rowsPerPage, setRowsPerPage] = useState(15);

  const { user } = useAuth();

  useEffect(() => {
    handleUpdateData();
  }, [filterMonthYear]);

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

  const handleFilterByStatus = (event) => {
    setFilterStatus(event.target.value);
  }

  const handleBuyerFilter = (event) => {
    setFilterBuyer(event.target.value);
  }

  const handleUpdateData = () => {
    const { role } = user;
    let params;

    setLoading(true);

    role.map((item) => {
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
      API.getBOM(params, (res) => {
        if(!res) return
        if(!res.data) {
          setBomData([]);
        } else {

          let buyer = res.data.filter(function(item, index, arr){
            return !isNull(item.party)
          }).map(function(obj){
            return obj.party;
          })

          let _buyer = uniqBy(buyer, 'id');
          
          console.log(_buyer)
          setOptionsBuyer(_buyer);
          
          setBomData(res.data);
        }
      });        
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  }

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  }

  const handleDeleteData = (event, id) => {
    event.preventDefault();

    try{
      API.deleteBOM(id, function(res){
        if(res.success) setBomData([]);
      })  
    } catch(error) {
      alert('error')
    }

    handleUpdateData();
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bomData.length) : 0;

  const filteredData = applySortFilter(bomData, getComparator(order, orderBy), [filterName, filterStatus, filterBuyer]);
  
  const isDataNotFound = filteredData.length === 0;  

  function ChipStatus(param, _id){
    switch (param) {
      case "Submit":
        return <ChipStyled label={param} color="primary"/>
        break;

      case "Dropped":
        return <ChipStyled label={param} color="error"/>
        break;
        
      case "Review":
        if(_id === 3){
          return <ChipStyled variant="filled"  label={param} sx={{backgroundColor: '#FF5F1F'}}/>
        } else {
          return <ChipStyled variant="filled"  label={param} color="warning"/>
        }
        break;

      case "Approve":
        return <ChipStyled label={param} color="success"/>
        break;
        
      default:
        return <Chip label="Created"/>
        break;
    }
  }
  return (
    <Card>
      <ListToolbar
        numSelected={selected.length}
        buyerFilterActive={true}
        filterBuyer={filterBuyer}
        onFilterBuyer={handleBuyerFilter}
        listOfBuyer={optionsBuyer}
        monthYearActive={true}
        filterMonthYear={filterMonthYear}
        onFilterMonthYear={handleMonthYearChanges}
        statusActive={true}
        filterName={filterName}
        filterStatus={filterStatus}
        onFilterName={handleFilterByName}
        onFilterStatus={handleFilterByStatus}
        onGo={handleUpdateData}
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
                  const { 
                    id,
                    party,
                    product_id,
                    product_feature_id,
                    status,
                    name, 
                    qty, 
                    company_name,
                    ...rest
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
                      <TableCell align="left">{party?.name}</TableCell>
                      <TableCell align="left">{moment(new Date(rest.created_at)).format("DD MMM YYYY")}</TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">
                        {ChipStatus(status[0]?.status_type, status[0]?.user_id)}
                      </TableCell>
                      <TableCell align="left">{qty}</TableCell>
                      <TableCell align="left">{`${status[0]?.user?.name} - ${status[0]?.description}`}</TableCell>
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
  )
}

export default DisplayBOM;