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
import { SnackbarProvider } from 'notistack';

// Transition
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material';

import { AuthProvider } from './context';
import { CurrencyProvider } from './context/currency';
import { RealtimeProvider } from './context/testing-realtime';

const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot,
  &.SnackbarItem-variantSuccess {
    background-color: white;
    color: black;
  }
`;

function MainApp() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <RealtimeProvider>
              <ThemeConfig>
                <ScrollToTop />
                <GlobalStyles />
                <StyledSnackbarProvider
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  TransitionComponent={Slide}
                >
                  <DashboardRouter />
                </StyledSnackbarProvider>
              </ThemeConfig>
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
