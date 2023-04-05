import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import { fCurrency } from '../../../../utils/formatNumber';

import API from '../../../../helpers';
import { isNull, isUndefined } from 'lodash';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 12
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(
  name,
  qty,
  unit_price
) {
  return { name, qty, unit_price};
}

const rows = [
  createData('Product A', 200, 20000),
  createData('Product B', 200, 20000),
  createData('Product C', 200, 20000),
  createData('Product D', 200, 20000)
];

export default function BasicTable({ payload, qty, tax }) {

  // const [description, setDescription] = React.useState(null);

  // const handleAddRemarks = (obj) => {
  //   try {
  //     if(isUndefined(obj.id)) throw new Error('on ID')
  //     if(isNull(description)) throw new Error('error description');
  //     API.updateBOMStatus(obj.id, {description}, function(res){
  //       if(isUndefined(res)) throw new Error('an error occured. check ur code');
  //       if(!res.success) throw new Error('failed to store');
  //       else alert('succesfully update the status');
  //     })
  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  return (
    <TableContainer component={Paper} sx={{marginLeft: 'auto', margin: '2em 0'}}>
      <Table sx={{ minWidth: 120 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            {/* <TableCell align="left">id</TableCell> */}
            <TableCell>Person</TableCell>
            <TableCell align="right">Final Price</TableCell>
            <TableCell width={300} align="left">Remarks</TableCell>
            <TableCell align="left">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payload.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{index+1}</TableCell>
              {/* <TableCell align="left">{row?.id}</TableCell> */}
              <TableCell align="left">{row?.user?.name}</TableCell>
              <TableCell align="left">{row?.final_price}</TableCell>
              <TableCell align="left">
                {row?.description}
                {/* <TextField multiline rows={6} onChange={(event) => setDescription(event.target.value)} sx={{ width: 400, '& .MuiInputBase-root': { padding: '0.5em', fontSize: '12px'}}}/> */}
              </TableCell>
              <TableCell align="left">{row?.created_at}</TableCell>
              {/* <TableCell align="left">
                <Button variant="outlined" id={row?.id}
                  onClick={(event) => handleAddRemarks(row)
                }> SAVE </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}