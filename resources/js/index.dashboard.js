import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// Router
import { BrowserRouter } from 'react-router-dom';
import DashboardRouter from './routes/dashboard.route';

// Notistack
import { SnackbarContent, SnackbarProvider } from 'notistack';

// Transition
import Slide from '@mui/material/Slide';
import { Alert, AlertTitle, styled } from '@mui/material';

import { AuthProvider } from './context';
import { CurrencyProvider } from './context/currency';
import { RealtimeProvider } from './context/testing-realtime';
import { NotificationProvider } from './context/notification';

const AlertSuccess = React.forwardRef((props, ref) => {
  return (
    <SnackbarContent ref={ref} role="alert">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Your data is inserted! <strong>check it out!</strong>
      </Alert>
    </SnackbarContent>
  );
});

const AlertUpdate = React.forwardRef((props, ref) => {
  return (
    <SnackbarContent ref={ref} role="alert">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        The data is updated! <strong>check it out!</strong>
      </Alert>
    </SnackbarContent>
  );
});

const AlertDelete = React.forwardRef((props, ref) => {
  return (
    <SnackbarContent ref={ref} role="alert">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        The data is deleted! <strong>check it out!</strong>
      </Alert>
    </SnackbarContent>
  );
});

const AlertFailed = React.forwardRef((props, ref) => {
  return (
    <SnackbarContent ref={ref} role="alert">
      <Alert severity="error">
        <AlertTitle>FAILED</AlertTitle>
        {`${props.message}`} Please try again!
      </Alert>
    </SnackbarContent>
  );
});

function MainApp() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <RealtimeProvider>
              <NotificationProvider>
                <ThemeConfig>
                  <ScrollToTop />
                  <GlobalStyles />
                  <SnackbarProvider
                    Components={{
                      successAlert: AlertSuccess,
                      deletedAlert: AlertDelete,
                      updateAlert: AlertUpdate,
                      failedAlert: AlertFailed
                    }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    TransitionComponent={Slide}
                  >
                    <DashboardRouter />
                  </SnackbarProvider>
                </ThemeConfig>
              </NotificationProvider>
            </RealtimeProvider>
          </CurrencyProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default MainApp;

if (document.getElementById('test-dashboard-app')) {
  ReactDOM.render(<MainApp />, document.getElementById('test-dashboard-app'));
}
