import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import { Outlet, useNavigate } from 'react-router-dom';

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default function DashboardLayout({ children }){
  const userStorage = JSON.parse(localStorage.getItem('user'));
   
  const navigate = useNavigate();

  if(!userStorage) navigate('/auth/login');
  return (
    <div>
      <Typography variant="h1" color="initial"> Dashboard Layout </Typography>
      <Outlet/>
    </div>
  )
}