import React from 'react';
import ReactDOM from 'react-dom';
import ThemeConfig from './theme';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from './theme/globalStyles';

// Router
import { BrowserRouter } from 'react-router-dom';
import TestRouter from './routes/auth.route';
import ScrollToTop from './components/ScrollToTop';

// Notistack
import { SnackbarProvider } from 'notistack'

function MainApp(){
  return (
    <HelmetProvider>
      <SnackbarProvider
        anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
        }}
        TransitionComponent={Slide}      
        >
        <BrowserRouter>
          <ThemeConfig>
            <ScrollToTop/>
            <GlobalStyles/>
            <TestRouter />
          </ThemeConfig>
        </BrowserRouter>
      </SnackbarProvider>
    </HelmetProvider>
  )
}

export default MainApp;

if (document.getElementById('test-main-app')){
  ReactDOM.render(<MainApp/>, document.getElementById('test-main-app'));
}