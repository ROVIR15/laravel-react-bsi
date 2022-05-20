import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import BuyerLayout from '../../../../layouts/Layout';

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function ProductionStudy() {
  const { pathname } = useLocation();

  console.log(getPathname(pathname.split('/')))
  return (
    <BuyerLayout>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
        Observation Result
      </Typography>
    </Stack>
    <Outlet/>
    </BuyerLayout>
  )
}

export default ProductionStudy;