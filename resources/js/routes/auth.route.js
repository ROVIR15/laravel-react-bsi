import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// Pages
import FirstPage from '../pages/auth/first.page.js';
import RFQTest from '../pages/auth/rfq-test.js';
import GRTest from '../pages/auth/gr-test.js';
import Test from '../pages/auth/dialog-test';
import SecondPage from '../pages/auth/second.page.js';
import TimeCounter from '../pages/auth/time-counter';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export default function TestRouter() {
  return useRoutes([
    {
      path: '/app',
      children: [
        { path: 'document-test', element: <FirstPage /> },
        { path: 'gr-test', element: <GRTest /> },
        { path: 'rfq-test', element: <RFQTest /> },
        { path: 'dialog-test', element: <Test /> },
        { path: 'second-page', element: <SecondPage /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'timer', element: <TimeCounter/>}
      ]
    }
  ]);
}