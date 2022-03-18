import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import hardDriveFill from '@iconify/icons-eva/hard-drive-fill';
import { Icon } from '@iconify/react';
import Layout from '../../../layouts/Layout';

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function RoutingLayout() {
  const { pathname } = useLocation();

  return (
    <Layout>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
        Routing
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
        <Button
          variant="contained"
          component={RouterLink}
          to={getPathname(pathname.split('/')) + '/add'}
          startIcon={<Icon icon={plusFill} />}
        >
          New
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to={getPathname(pathname.split('/')) + '/display'}
          startIcon={<Icon icon={hardDriveFill} />}
        >
          Display
        </Button>
      </Stack>
    </Stack>
    <Outlet/>
    </Layout>
  )
}

export default RoutingLayout;