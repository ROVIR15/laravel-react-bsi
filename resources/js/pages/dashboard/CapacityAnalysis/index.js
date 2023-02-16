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
      //calculate planned output and realisation cuz data is breakdown by sales order id. And make it total
      const { planned_output, realisation } = next?.plans.reduce(
        (initial2, next2) => ({
          ...initial2,
          planned_output: initial2?.planned_output + Math.round(next2?.total_expected_output),
          realisation:
            initial2.realisation + parseFloat(next2?.find_realisation_of_sewing?.total_output || 0)
        }),
        { planned_output: 0, realisation: 0 }
      );
      //detail of order
      const _breakdown = next?.plans?.map((item, index) => ({
        id: index,
        name: item?.find_realisation_of_sewing?.sales_order?.po_number,
        start_date: moment(item?.find_realisation_of_sewing?.start_date).format('ll'),
        end_date: moment(item?.find_realisation_of_sewing?.end_date).format('ll'),
        planned_qty: item?.total_expected_output,
        realisation: parseFloat(item?.find_realisation_of_sewing?.total_output)
      }));
      //calculate percentage of realisation and planned output
      const percentage = realisation / planned_output;
      return [
        ...initial,
        {
          id: next.id,
          name: next?.name,
          planned_output,
          realisation,
          // planned_output: Math.round(next?.plans[0]?.total_expected_output),
          // realisation: next?.plans[0]?.find_realisation_of_sewing[0]?.total_output,
          percentage,
          history: _breakdown
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
                    <TableCell>End Date</TableCell>
                    <TableCell>Buyer</TableCell>
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
                      <TableCell align="right">{Math.round(historyRow.planned_qty)}</TableCell>
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
          alert('gotcha!');
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
