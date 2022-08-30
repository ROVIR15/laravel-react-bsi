import React from 'react'
import Page from '../../../../components/Page';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
//icons
import hardDriveFill from '@iconify/icons-eva/hard-drive-fill';
import tableSimple16 from '@iconify/icons-fluent/table-simple-16-regular';
import scissorsCut from '@iconify/icons-eva/scissors-fill';
import number123 from '@iconify/icons-fluent/number-row-20-regular';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

// components
import Layout from '../../../../layouts/Layout';

import { useSnackbar } from 'notistack'

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

const BoxStyled = styled(Box)(({ theme }) => ({
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "start", 
    width: "100%", 
    cursor: "pointer"
}));

const RouterLinkN = styled(RouterLink)(({ theme }) => ({
    textDecoration: 'none',
    display: 'block'
}));

function Labor() {
  const { pathname } = useLocation();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('Here I am', {
      variant: 'success'
    });
  };

  if(pathname.split('/').length > 4) return (<Outlet/>);
  else return (
    <Layout>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Monitoring Dept Cutting
        </Typography>
      </Stack> 
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper 
            variant='outlined' 
            to={getPathname(pathname.split('/')) + '/spreading'}
          >
            <BoxStyled m={2}>
              <Icon icon={tableSimple16} fontSize='2.1em'/>
              <Typography variant="h4" ml={1}>Spreading</Typography>
            </BoxStyled>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper 
            variant='outlined' 
            component={RouterLinkN}
            to={getPathname(pathname.split('/')) + '/cutting'}
          >
            <BoxStyled m={2}>
              <Icon icon={scissorsCut} fontSize='2.1em'/>
              <Typography variant="h4" ml={1}>Cutting</Typography>
            </BoxStyled>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper 
            variant='outlined' 
            component={RouterLinkN}
            to={getPathname(pathname.split('/')) + '/numbering'}
          >
            <BoxStyled m={2}>
              <Icon icon={number123} fontSize='2.1em'/>
              <Typography variant="h4" ml={1}>Numbering</Typography>
            </BoxStyled>
          </Paper>
        </Grid>
      </Grid>
      <Outlet/>
    </Layout>
  )
}

export default Labor