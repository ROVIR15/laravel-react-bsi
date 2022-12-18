import React from 'react'
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

// components
import Display from './display'
import Layout from '../../../../layouts/Layout';

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function FinanceAccount() {
  const { pathname } = useLocation();

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

  return (
    <Layout>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Finance Account
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} >
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
      {isBeginning()}
    </Layout>
  )
}

export default FinanceAccount