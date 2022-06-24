import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import { Outlet, useNavigate } from 'react-router-dom';

import Page from '../components/Page';

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default function DashboardLayout({ children }){
  const userStorage = JSON.parse(localStorage.getItem('user'));
   
  const navigate = useNavigate();

  if(!userStorage) navigate('/login');

  document.title="Dashboard | BSI Information System"
  return (
    <Page title="Dashboard | BSI Information System">
      <Typography variant="h1" color="initial"> Dashboard Layout </Typography>
      <Outlet/>
    </Page>
  )
}