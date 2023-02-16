import React from 'react'
import Page from '../../../components/Page';
import {
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
//icons
import hardDriveFill from '@iconify/icons-eva/hard-drive-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

import Display from './display';
// components
import DisplayBuyer from '../../../components/_dashboard/sales/buyer/display/DisplayBuyer';
import Layout from '../../../layouts/Layout';

import { useSnackbar } from 'notistack';
import useAPIRoles from '../../../context/checkRoles';

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function BuyerList() {
  const { pathname } = useLocation();
  const { data, check, isNotReady, isAllowedToInsert } = useAPIRoles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('Here I am', {
      variant: 'success'
    });
  };

  const isBeginning = () => {
    if(pathname.split('/').length === 4){
      return (
        <Display />
      )
    } else {
      return (
        <Outlet/>
      )
    }
  }

  console.log('check data roles is ready?', isNotReady);

  return (
    <Layout>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Buyer
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} >
          <Button
            variant="contained"
            component={RouterLink}
            to={getPathname(pathname.split('/')) + '/add'}
            startIcon={<Icon icon={plusFill} />}
          >
            New Buyer
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to={getPathname(pathname.split('/')) + '/display'}
            startIcon={<Icon icon={hardDriveFill} />}
          >
            Display
          </Button>
          <Button
            variant="contained"
            onClick={check}
          > Check Roles</Button>
          {/* <Button
            variant="contained"
            component='div'
            onClick={handleClick}
            startIcon={<Icon icon={hardDriveFill} />}
          >
            Show Snackbar
          </Button> */}
        </Stack>
      </Stack>
      {isBeginning()}
    </Layout>
  )
}

export default BuyerList