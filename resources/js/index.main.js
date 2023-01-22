import React from 'react';
import ReactDOM from 'react-dom';
import ThemeConfig from './theme';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from './theme/globalStyles';

// Router
import { BrowserRouter } from 'react-router-dom';
import TestRouter from './routes/auth.route';
import ScrollToTop from './components/ScrollToTop';

//Auth
import { AuthProvider } from './context'

// Notistack
import { SnackbarProvider } from 'notistack'
import moment from 'moment';

import './styles.css'

function MainApp(){

  moment.locale("id");

  return (
    <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <ThemeConfig>
              <ScrollToTop/>
                <GlobalStyles/>
              <TestRouter />
            </ThemeConfig>
          </AuthProvider>
        </BrowserRouter>
    </HelmetProvider>
  )
}

export default MainApp;

if (document.getElementById('test-main-app')){
  ReactDOM.render(<MainApp/>, document.getElementById('test-main-app'));
}