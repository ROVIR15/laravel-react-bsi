import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router-dom';

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default function DashboardLayout({ children }){
  return (
    <div>
      <Typography variant="h1" color="initial"> Dashboard Layout </Typography>
      <Outlet/>
    </div>
  )
}