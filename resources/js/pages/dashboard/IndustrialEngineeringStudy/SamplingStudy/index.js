import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import BuyerLayout from '../../../../layouts/Layout';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function isBeginning(pathname){
  const a = pathname.split('/').filter(a => a!=='');
  if(a.length > 3) return false;
  else return true;
}

function ProductionStudy() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(isBeginning(pathname)) navigate(`${getPathname(pathname.split('/'))}/display`);
  }, [pathname])

  return (
    <BuyerLayout>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
        Sampling Study
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Button
          variant="contained"
          component={RouterLink}
          to={getPathname(pathname.split('/')) + '/add'}
          startIcon={<Icon icon={plusFill} />}
        >
          New 
        </Button>
      </Stack>
    </Stack>
    <Outlet/>
    </BuyerLayout>
  )
}

export default ProductionStudy;