import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// Router
import { BrowserRouter } from 'react-router-dom';
import DashboardRouter from './routes/dashboard.route';

function MainApp(){
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeConfig>
        <ScrollToTop/>
        <GlobalStyles/>
        <DashboardRouter />
        </ThemeConfig>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default MainApp;

if (document.getElementById('test-dashboard-app')){
  ReactDOM.render(<MainApp/>, document.getElementById('test-dashboard-app'));
}