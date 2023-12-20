import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import API from '../../../../../helpers';
import { fCurrency } from '../../../../../utils/formatNumber';
import { initial, isArray, isEmpty, isUndefined, sum } from 'lodash';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment';
moment.locale('id');
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

export default function Report() {
  const [date, setDate] = useState([]);
  const [row, setRow] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [monthYear, setMonthYear] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [totalVal, setTotalVal] = useState({});

  useEffect(() => {
    try {
      API.getInvoicedParty(`?type=2&monthYear=${monthYear}`, (res) => {
        if (!res) return;
        if (isEmpty(res.data)) throw new Error('failed to load data');
        else {
          const _data = res.data.reduce(function (initial, next) {
            return [...initial, { id: next?.party?.id, name: next?.party?.name }];
          }, []);

          setBuyer(_data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [monthYear]);

  const handleGetReport = () => {
    try {
      if (isEmpty(monthYear) && isEmpty(selectedBuyer)) throw new Error('cannot be empty');
      API.getReport(`?type=2&monthYear=${monthYear}&party=${selectedBuyer}`, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('failed to load report');
        else {
          setDate(res.date);
          let pd = processing_data(res.data, res.date);
          let total_array = calculate_something(pd, res.date);
          setRow(pd);
          setTotalVal(total_array);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const processing_data = (data, date) => {
    let wkwkw = data.map(function (item) {
      let { id, sold_to, invoice_date, due_dates, sum, party } = item;
      let a = {
        invoice_id: id,
        sold_to,
        party_name: party?.name,
        purchase_order_id: item?.purchase_order?.id,
        po_number: item?.purchase_order?.purchase_order?.po_number
      };
      a = date.reduce(function (initial, next) {
        if (due_dates === next) return { ...initial, [next]: sum[0]?.total_amount };
        else return { ...initial, [next]: 0 };
      }, a);

      return a;
    });

    return wkwkw;
  };

  const calculate_something = (array, date) => {
    if (!isArray(array)) return;
    else {
      let res = date.reduce(function (initial, next) {
        let haha = array.reduce(function (initial_s, next_s) {
          if (isUndefined(next_s[next])) return initial_s;
          if (next_s[next] !== 0) return [...initial_s, parseInt(next_s[next])];
          else return initial_s;
        }, []);

        return { ...initial, [next]: haha };
      }, {});

      return res;
    }
  };

  const total_invoiced = (data) => {
    let totalSum = 0;

    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        // Get the values for each date and calculate the sum
        const values = data[date];
        const sum = values.reduce((acc, curr) => acc + curr, 0);
        totalSum += sum;
      }
    }

    return totalSum;
  };

  const handleSelectBuyer = (event) => {
    setSelectedBuyer(event.target.value);
  };

  const handleMonthYear = (event) => {
    setMonthYear(event.target.value);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Paper style={{ padding: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField type="month" label="Bulan" onChange={handleMonthYear} />
          <FormControl fullWidth>
            <InputLabel>Supplier</InputLabel>
            <Select onChange={handleSelectBuyer}>
              {isEmpty(buyer)
                ? null
                : buyer?.map(function (x) {
                    return (
                      <MenuItem
                        value={x.id}
                        // selected={x.id === values.id}
                      >{`${x.name}`}</MenuItem>
                    );
                  })}
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={handleGetReport}>
            Search
          </Button>
        </Stack>
      </Paper>
      <TableContainer component={Paper}>
        <Table
          className="wk_table wk_style1 wk_border"
          sx={{ minWidth: 650, margin: 2 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell
                className="wk_primary_color wk_gray_bg"
                align="center"
                colSpan={date?.length}
              >
                Month
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="wk_primary_color wk_gray_bg">Party ID</TableCell>
              <TableCell className="wk_primary_color wk_gray_bg" align="left">
                Invoice ID
              </TableCell>
              <TableCell className="wk_primary_color wk_gray_bg" align="left">
                Purchase Order ID
              </TableCell>
              {date.map((_d) => (
                <TableCell className="wk_primary_color wk_gray_bg" align="right">
                  {moment(_d).format('ll')}
                </TableCell>
              ))}
              <TableCell className="wk_primary_color wk_gray_bg" align="right">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((_row) => {
              let totalInv = date.reduce((initial, next) => initial + parseFloat(_row[next]), 0);

              return (
                <TableRow
                  key={row.sold_to}
                  sx={{
                    '& > *': { border: '1px solid rgba(241, 243, 244, 1)' }
                  }}
                >
                  <TableCell component="th" align="left">
                    {_row.party_name}
                  </TableCell>
                  <TableCell component="th" align="left">
                    INV-{_row?.invoice_id?.toString().padStart(4, '0')}
                  </TableCell>
                  <TableCell component="th" align="left">
                    PO-{_row.purchase_order_id?.toString().padStart(4, '0')}
                  </TableCell>
                  {date.map((_d) => (
                    <TableCell component="th" align="right">
                      {fCurrency(_row[_d])}
                    </TableCell>
                  ))}

                  <TableCell component="th" align="right">
                    {fCurrency(totalInv)}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell component="th" colSpan={3} align="right">
                Total
              </TableCell>
              {date.map((_row) => (
                <TableCell component="th" align="right">
                  {fCurrency(sum(totalVal[_row]))}
                </TableCell>
              ))}

              <TableCell component="th" align="right">
                {fCurrency(total_invoiced(totalVal))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
