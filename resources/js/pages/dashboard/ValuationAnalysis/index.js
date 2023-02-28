import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  Paper,
  Typography,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../components/Table';
import { isArray, isEmpty, isNull } from 'lodash';
import API from '../../../helpers';
import { fCurrency, fNumber } from '../../../utils/formatNumber';
import moment from 'moment';

// ----------------------------------------------------------------------
let initiate_date = moment().format('Y-MM');
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: '#', alignRight: false },
  { id: 'imageUrl', label: 'Image', alignRight: false },
  { id: 'order_id', label: 'Product Order Code', alignRight: false },
  { id: 'product_feature_id', label: 'Product Code', alignRight: false },
  { id: 'product_name', label: 'Product Name', alignRight: false },
  { id: 'qty', label: 'Available Qty', alignRight: true },
  { id: 'unit_price', label: 'Unit Price', alignRight: true },
  { id: 'valuation', label: 'Monetary Goods Valuation', alignRight: false }
];

//----------------------------------------------------------------------

const StyledPaper = styled(Paper)(({ theme }) => ({
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: '0',
  padding: '24px',
  boxShadow: 'none',
  // color: 'rgb(122, 9, 48)',
  border: '0px solid rgba(0, 0, 0, 0.125)',
  boxShadow:
    'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: '16px',
  opacity: '1',
  background: 'transparent',
  color: 'rgb(52, 71, 103)',
  boxShadow: 'none'
}));

const ComponentOne = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '16px'
}));

const ComponentTwo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: '4.8px'
}));

const TextOne = styled(Typography)(({ theme }) => ({
  margin: '0px 0px 8px',
  fontWeight: '600',
  lineHeight: '1.57143',
  fontSize: '1.2rem'
}));

const TextTwo = styled(Typography)(({ theme }) => ({
  margin: '0px',
  fontWeight: '700',
  lineHeight: '1.5',
  fontSize: '1.6rem'
}));

const TextThree = styled(Typography)(({ theme }) => ({
  margin: '0px',
  lineHeight: '1.57143',
  fontSize: '0.675rem',
  fontWeight: '400',
  opacity: '0.72'
}));

//----------------------------------------------------------------------

function PaperBox({ title, value }) {
  console.log(isEmpty(value));
  return (
    <StyledPaper>
      <ComponentOne>
        <div>
          <TextOne component="p">{title}</TextOne>

          <TextTwo component="p" sx={{ minSize: '1rem' }}>
            {isNull(value) ? 0.0 : value}
          </TextTwo>
        </div>
        {/* <div>
          <ComponentTwo>
            // <Icon icon={TrendUp} />
            <Typography
              component="span"
              sx={{
                margin: '0px 0px 0px 4px',
                fontWeight: '600',
                lineHeight: '1.57143',
                fontSize: '0.875rem'
              }}
            >
              0 %
            </Typography>
          </ComponentTwo>
          <TextThree component="span" variant="subtitle2">
            than last month
          </TextThree>
        </div> */}
      </ComponentOne>
    </StyledPaper>
  );
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

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
  if (query) {
    return filter(array, (_b) => _b.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
// ----------------------------------------------------------------------

function ValuationTable({ placeHolder }) {
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listData.map((n) => n.name);
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
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listData.length) : 0;

  const filteredData = applySortFilter(listData, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

  /**
   * Request data based on month year
   *
   * @param monthYear - describe what month year
   * @return Object
   */

  //summary calculation
  const [obj, setObj] = useState({});

  //define variable for monthYear;
  const [monthYear, setMonthYear] = useState(initiate_date);

  const handleMonthYearChange = (event) => {
    setMonthYear(event.target.value);
  };

  useEffect(() => {
    if (isEmpty(monthYear)) return;
    try {
      API.getReadyMadeGarmentValuation(`?monthYear=${monthYear}`, function (res) {
        if (!res) return;
        if (isEmpty(res.data)) throw new Error('failed to load data');
        else {
          let _arrangedData = res.data.map(function (item, index) {
            let item_name = `${item?.order_item?.product_feature?.product?.goods?.name} ${item?.order_item?.product_feature?.size} - ${item?.order_item?.product_feature?.color}`;

            return {
              id: index + 1,
              imageUrl: item?.order_item?.product_feature?.product?.goods?.imageUrl,
              order_id: item?.order_id,
              order_item_id: item?.order_item_id,
              qty: item?.total_output,
              shipped: item?.check_shipment[0]?.total_shipped_goods,
              product_feature_id: item?.product_feature_id,
              product_name: item_name,
              unit_price: item?.order_item?.unit_price,
              valuation: item?.total_output * item?.order_item?.unit_price
            };
          });

          setListData(_arrangedData);

          let _obj = _arrangedData.reduce(
            function (initial, next) {
              return {
                total_produced: initial.total_produced + parseInt(next?.qty),
                total_shipped: initial.total_shipped + parseInt(next?.shipped),
                m_total_produced:
                  initial.m_total_produced + parseInt(next?.qty) * parseFloat(next?.unit_price),
                m_total_available:
                  initial.m_total_available +
                  (parseInt(next?.qty) - parseInt(next?.shipped)) * parseFloat(next?.unit_price),
                m_total_shipped:
                  initial.m_total_shipped + parseInt(next?.shipped) * parseFloat(next?.unit_price)
              };
            },
            {
              total_produced: 0,
              total_shipped: 0,
              m_total_produced: 0,
              m_total_available: 0,
              m_total_shipped: 0
            }
          );

          setObj(_obj);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [monthYear]);

  return (
    <Stack direction="column" spacing={2} m={'2ch'}>
      <TextField
        component={Paper}
        type="month"
        value={monthYear}
        onChange={handleMonthYearChange}
      />

      <Grid container direction="row" justifyContent="space-evenly" spacing={1}>
        <Grid item xs={3}>
          <PaperBox title="Total Ready-Made Garments" value={obj?.total_produced} />
        </Grid>

        <Grid item xs={3}>
          <PaperBox title="Shipped Garments" value={obj?.total_shipped} />
        </Grid>

        <Grid item xs={3}>
          <PaperBox
            title="Valuation Produced Garments"
            value={fCurrency(obj?.m_total_produced, 'idr')}
          />
        </Grid>

        <Grid item xs={3}>
          <PaperBox
            title="Valuation Shipped Garments"
            value={fCurrency(obj?.m_total_shipped, 'idr')}
          />
        </Grid>
      </Grid>

      {/* <Button onClick={handleGo}> Go </Button> */}
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
                rowCount={listData.length}
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
                      order_id,
                      imageUrl,
                      product_feature_id,
                      product_name,
                      qty,
                      unit_price,
                      valuation
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
                        <TableCell align="center">
                          <img
                            src={imageUrl}
                            alt={product_name}
                            sx={{ maxHeight: '27ch', maxWidth: '24ch', margin: 'auto' }}
                          />
                        </TableCell>
                        <TableCell align="left">{order_id}</TableCell>
                        <TableCell align="left">{product_feature_id}</TableCell>
                        <TableCell align="left">{product_name}</TableCell>
                        <TableCell align="right">{fNumber(qty)}</TableCell>
                        <TableCell align="right">{fCurrency(unit_price)}</TableCell>
                        <TableCell align="right">{fCurrency(valuation)}</TableCell>
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
          count={listData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Stack>
  );
}

export default ValuationTable;
