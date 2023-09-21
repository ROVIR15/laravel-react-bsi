import React, { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// material
import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import useAuth from '../../context';
import Welcoming from './Welcoming';
import useRealtime from '../../context/testing-realtime';
import { parseJSON } from 'date-fns';
import { useSnackbar } from 'notistack';
import { isEmpty } from 'lodash';
import OSRPPIC from './OSRPPIC.general';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { loadingInitial } = useAuth();
  const { pathname } = useLocation();

  const { payload, isConnected, mqttSubscribe } = useRealtime();
  const { enqueueSnackbar } = useSnackbar();

  mqttSubscribe('general');

  useEffect(() => {
    if (isEmpty(payload)) return;
    enqueueSnackbar(payload?.message);
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(payload?.message);
    });
  }, [payload]);

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
    } else {
      Notification.requestPermission();
    }
  }, []);

  function isWelcoming() {
    if (pathname.split('/').length === 2) {
      return (
        <Stack direction="column" spacing={2}>
          <Welcoming />
          <OSRPPIC />
        </Stack>
      );
    } else {
      return <Outlet />;
    }
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>{loadingInitial ? null : isWelcoming()}</MainStyle>
    </RootStyle>
  );
}
