import React from 'react'
import Page from '../../../components/Page';
import {
  Button,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
//icons
import hardDriveFill from '@iconify/icons-eva/hard-drive-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

// components
import Layout from '../../../layouts/Layout';
import Chart from './charts/LineChart';
import BarChart from './charts/BarChart';
import { useSnackbar } from 'notistack'

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function Labor() {
  const { pathname } = useLocation();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('Here I am', {
      variant: 'success'
    });
  };

  return (
    <Layout>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Monitoring
        </Typography>
      </Stack>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Chart />
        </Grid>
        <Grid item xs={6}>
          <BarChart />
        </Grid>
      </Grid>
      <Outlet/>
    </Layout>
  )
}

export default Labor