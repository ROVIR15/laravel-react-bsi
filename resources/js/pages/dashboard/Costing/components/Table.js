import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';

import { fCurrency, fNumber } from '../../../../utils/formatNumber';
import useCurrencyExchange from '../../../../context/currency';
import { sum } from 'lodash';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 6
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(name, details, total_cost) {
  return { name, details, total_cost };
}

export default function BasicTable({
  initialCurrency,
  switchCurrency,
  payload,
  status,
  approval,
  review,
  margin,
  setMargin,
  startingPrice,
  finalPrice,
  setFinalPrice,
  tax
}) {
  const { exchanger } = useCurrencyExchange();

  const [price, setPrice] = React.useState(0);
  const {
    total_labors,
    total_work_days,
    qty_to_produce,
    components_numbers,
    cm_cost,
    average_of_product_cost,
    total_cost_of_wc,
    total_overhead_cost,
    total_cost_of_items,
    additionalCost,
    average_add_cost,
    list_of_service
  } = payload;

  const rows = [
    createData(
      'Work Days',
      `Spent ${total_work_days} days for working on the projects`,
      exchanger(total_cost_of_wc, initialCurrency, switchCurrency)
    ),
    createData(
      'Material',
      `${components_numbers} Types of material to be consumpted`,
      exchanger(total_cost_of_items, initialCurrency, switchCurrency)
    ),
    createData(
      'Overhead',
      `Additional cost to execute the project`,
      exchanger(total_overhead_cost, initialCurrency, switchCurrency)
    ),
    createData(
      'Additional Fee',
      `Cost occured when an order is placed such as ${list_of_service}`,
      exchanger(additionalCost, initialCurrency, switchCurrency)
    )
  ];

  function OfferingPrice(price) {
    if (margin < 0) return price;
    return price * (1 + margin / 100);
  }

  function OfferingPriceAndTax(price, tax) {
    return price * (1 + tax / 100);
  }

  return (
    <TableContainer component={Paper} sx={{ marginLeft: 'auto' }}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell>Cost Breakdown</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="right">Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.details}</TableCell>
              <TableCell align="right">{fCurrency(row.total_cost, switchCurrency)}</TableCell>
            </TableRow>
          ))}
          <TableRow key="total-cost" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Grand Total Biaya Produksi </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {' '}
                {fCurrency(
                  exchanger(
                    sum([
                      total_cost_of_wc,
                      total_overhead_cost,
                      total_cost_of_items,
                      additionalCost
                    ]),
                    initialCurrency,
                    switchCurrency
                  ),

                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow key="unit_produced" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Qty Produksi </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1"> {fNumber(qty_to_produce)} pcs </Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow
            key="cost_of_material"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography value={margin} variant="inherit">
                {' '}
                Biaya Material (per pcs){' '}
              </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {fCurrency(
                  exchanger(average_of_product_cost, initialCurrency, switchCurrency),
                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>

          <TableRow key="cm_cost" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Biaya Tambahan (per pcs) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {' '}
                {fCurrency(
                  exchanger(average_add_cost, initialCurrency, switchCurrency),
                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>

          <TableRow key="cm_cost" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Biaya CM (per pcs) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {fCurrency(exchanger(cm_cost, initialCurrency, switchCurrency), switchCurrency)}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>

          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> HPP (per pcs) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {fCurrency(
                  exchanger(
                    sum([cm_cost, average_of_product_cost, average_add_cost]),
                    initialCurrency,
                    switchCurrency
                  ),
                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>

          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Harga Awal (per pcs) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {fCurrency(
                  exchanger(startingPrice, initialCurrency, switchCurrency),
                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>

          <TableRow key="margin" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Margin (Harga Awal) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <Input
                  id="filled-adornment-amount"
                  disabled={true}
                  inputProps={{ style: { textAlign: 'end' } }}
                  value={parseFloat(
                    ((startingPrice - sum([cm_cost, average_of_product_cost, average_add_cost])) /
                      sum([cm_cost, average_of_product_cost, average_add_cost])) *
                      100
                  ).toFixed(2)}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>
            </NoBorderCell>
          </TableRow>

          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> HPP </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {' '}
                {fCurrency(
                  exchanger(
                    sum([cm_cost, average_of_product_cost, average_add_cost]),
                    initialCurrency,
                    switchCurrency
                  ),
                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>

          <TableRow key="margin" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Final Price (per pcs) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <Input
                  id="filled-adornment-amount"
                  disabled={!(!review ^ !approval) ^ !(status || !approval)}
                  value={exchanger(finalPrice, initialCurrency, switchCurrency)}
                  inputProps={{ style: { textAlign: 'end' } }}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      {switchCurrency === 'idr' ? 'Rp.' : '$'}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </NoBorderCell>
          </TableRow>

          <TableRow key="margin" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Margin (Harga Terakhir) </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <Input
                  id="filled-adornment-amount"
                  disabled={!approval || finalPrice > 0}
                  value={parseFloat(margin).toFixed(2)}
                  inputProps={{ style: { textAlign: 'end' } }}
                  onChange={(e) => setMargin(e.target.value)}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
                />
              </FormControl>
            </NoBorderCell>
          </TableRow>

          <TableRow key="Total" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <NoBorderCell align="right" colSpan={3}>
              <BoxStyle />
              <Typography variant="inherit"> Offering Price + Tax {tax} % </Typography>
            </NoBorderCell>
            <NoBorderCell align="right">
              <BoxStyle />
              <Typography variant="body1">
                {fCurrency(
                  exchanger(
                    OfferingPriceAndTax(
                      OfferingPrice(sum([cm_cost, average_of_product_cost, average_add_cost])),
                      tax
                    ),
                    initialCurrency,
                    switchCurrency
                  ),
                  switchCurrency
                )}{' '}
              </Typography>
            </NoBorderCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
