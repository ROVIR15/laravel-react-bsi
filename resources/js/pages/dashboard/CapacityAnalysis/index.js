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
import { fPercent } from '../../../utils/formatNumber';
import { isArray, isEmpty, isUndefined, result, uniqBy } from 'lodash';

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
      const { items, result_sewing } = next;

      let realisation = result_sewing.reduce(function (initial, next) {
        return initial + parseFloat(next.total_output);
      }, 0);

      let planned_output = items.reduce(function (initial, next) {
        return initial + parseFloat(next?.expected_output) * parseFloat(next?.work_days);
      }, 0);

      const percentage = realisation / planned_output;

      let _breakdown = result_sewing.map(function(order_placed_in_each_line, index){
        const matched = items.find(
          (item) => ((order_placed_in_each_line?.sales_order_id === item?.sales_order_id) && (order_placed_in_each_line?.facility_id === item?.facility_id))
        )

        if(isEmpty(matched)) {
          return {
            id: 0,
            name: order_placed_in_each_line?.sales_order?.po_number,
            start_date: order_placed_in_each_line?.start_date,
            end_date: order_placed_in_each_line?.end_date,
            planned_output: 0,
            realisation: order_placed_in_each_line?.total_output
          }
        } else {
          return {
            id: 0,
            name: order_placed_in_each_line?.sales_order?.po_number,
            start_date: order_placed_in_each_line?.start_date,
            end_date: order_placed_in_each_line?.end_date,
            planned_output: parseFloat(matched?.expected_output) * parseFloat(matched?.work_days),
            realisation: order_placed_in_each_line?.total_output
          }  
        }
      })

      return [
        ...initial,
        {
          id: next.id,
          name: next?.name,
          history: _breakdown,
          planned_output,
          realisation,
          percentage
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
        <TableCell align="right">{row.planned_output}</TableCell>
        <TableCell align="right">{row.realisation}</TableCell>
        <TableCell align="right">{fPercent(row.percentage * 100)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Sales Order</TableCell>
                    <TableCell align="right">Planned Qty</TableCell>
                    <TableCell align="right">Realisation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history?.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.start_date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.end_date}
                      </TableCell>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell align="right">{Math.round(historyRow.planned_output)}</TableCell>
                      <TableCell align="right">{Math.round(historyRow.realisation)}</TableCell>
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
    name: 'Line'
  },
  {
    name: 'Planned Qty'
  },
  {
    name: 'Realisation Qty'
  },
  {
    name: 'Percentage (%)'
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
      API.getAnalysisCapacity(`?monthYear=${monthYear}`, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('data cannot be retrieve');
        else {
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
