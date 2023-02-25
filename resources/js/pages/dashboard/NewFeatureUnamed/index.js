import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { Icon } from '@iconify/react';
import ArrowRightIcon from '@iconify/icons-eva/arrow-right-outline';
import ArrowDownIcon from '@iconify/icons-eva/arrow-down-fill';
import moment from 'moment';
import API from '../../../helpers';
import { fPercent, fCurrency, fNumber } from '../../../utils/formatNumber';
import { isArray, isEmpty, uniqBy } from 'lodash';

moment.locale('id');

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  };
}

function processData(array) {
  if (isArray(array) && !isEmpty(array)) {
    // rebuild object structure using reduce
    return array.reduce(function (initial, next) {
      const { sales_order } = next;

      const detail_each_order = sales_order.map(function (next) {
        const { avg_price } = next;

        let total_money_2 = parseFloat(avg_price[0].cm_price_avg) * parseFloat(next?.sewing_output[0]?.output);

        return {
          id: next.id,
          ...avg_price[0],
          total_money: total_money_2,
          total_output_sewing: next?.sewing_output[0]?.output,
          po_number: next?.po_number,
          sales_order_id: next?.id,
          product_name: next?.order_item[0]?.product_feature?.product?.goods?.name,
          imageUrl: next?.order_item[0]?.product_feature?.product?.goods?.imageUrl
        };
      });

      const money = sales_order.reduce(
        function (initial, next) {
          return {
            total_qty_order: initial.total_qty_order + parseFloat(next?.avg_price[0]?.total_qty),
            total_output_sewing:
              initial.total_output_sewing + parseFloat(next?.sewing_output[0]?.output),
            amount_of_money: initial.amount_of_money + parseFloat(next?.sewing_output[0]?.output) * parseFloat(next?.avg_price[0]?.cm_price_avg),
            cm_price:
              initial.cm_price + parseFloat(next?.avg_price[0]?.cm_price_avg) / sales_order.length
          };
        },
        {
          total_qty_order: 0,
          total_output_sewing: 0,
          amount_of_money: 0,
          cm_price: 0
        }
      );

      //calculate planned output and realisation cuz data is breakdown by sales order id. And make it total
      return [
        ...initial,
        {
          id: next.id,
          name: next.name,
          total_order: next.sales_order.length,
          ...money,
          detail: detail_each_order
        }
      ];
    }, []);
  } else return [];
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            <Box
              component={Icon}
              icon={open ? ArrowDownIcon : ArrowRightIcon}
              sx={{ width: 16, height: 16, ml: 1 }}
            />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{fNumber(row.total_order)}</TableCell>
        <TableCell align="right">{fNumber(row.total_qty_order)}</TableCell>
        <TableCell align="right">{fNumber(row.total_output_sewing)}</TableCell>
        <TableCell align="right">{fCurrency(row.amount_of_money)}</TableCell>
        <TableCell align="right">{fCurrency(row.cm_price)}</TableCell>
      </TableRow>
      <TableRow sx={{background: '#f9f9f9'}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order List
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {/* Head Column Name */}
                  <TableRow>
                    <TableCell>Gambar Product</TableCell>
                    <TableCell>PO Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Total Qty Order</TableCell>
                    <TableCell align="right">Total Pengerjaan *sewing (pcs)</TableCell>
                    <TableCell align="right">Total Uang</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.detail?.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell align="center">
                        <img
                          src={historyRow.imageUrl}
                          alt={historyRow.product_name}
                          sx={{ height: '15ch', maxWidth: '12ch', margin: 'auto' }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.po_number}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.product_name}
                      </TableCell>
                      <TableCell>{fNumber(historyRow.total_qty)}</TableCell>
                      <TableCell align="right">{fNumber(historyRow.total_output_sewing)}</TableCell>
                      <TableCell align="right">
                        {fCurrency(Math.round(historyRow.total_money))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    planned_output: PropTypes.number.isRequired,
    realisation: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

const rowsD = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
];

//Define column head name
const columns = [
  {
    name: 'Buyer'
  },
  {
    name: 'Banyaknya Order'
  },
  {
    name: 'Total Qty Buyer'
  },
  {
    name: 'Total Output Pengerjaan (sewing)'
  },
  {
    name: 'Jumlah Uang'
  },
  {
    name: 'Rerata Harga'
  }
];

function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col) => (
              <TableCell>{col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* parent data */}
        <TableBody>
          {rows?.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const _recentMonthYear = moment().format('YYYY-MM');

export default function CapacityAnalysis() {
  const [monthYear, setMonthYear] = useState(_recentMonthYear);
  const [data, setData] = useState([]);

  //handle change of the month
  const handleChangeMonth = (event) => {
    setMonthYear(event.target.value);
  };

  //fetch data
  useEffect(() => {
    try {
      API.getNewAPIOfNewFeature(`?monthYear=${monthYear}`, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('data cannot be retrieve');
        else {
          // console.log(res.data);
          let data = processData(res.data);
          setData(data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [monthYear]);

  return (
    <Stack direction="column" spacing={2} m={2}>
      <Box component={Paper}>
        <TextField
          InputProps={{ inputProps: { max: moment().format('YYYY-MM') } }}
          fullWidth
          type="month"
          onChange={handleChangeMonth}
          value={monthYear}
        />
      </Box>

      <CollapsibleTable rows={data} />
    </Stack>
  );
}
