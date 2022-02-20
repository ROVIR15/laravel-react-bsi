import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// Pages
import FirstPage from '../pages/auth/first.page.js';
import SecondPage from '../pages/auth/second.page.js';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

export default function TestRouter() {
  return useRoutes([
    {
      path: '/app',
      children: [
        { path: 'first-page', element: <FirstPage /> },
        { path: 'second-page', element: <SecondPage /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }

      ]
    }
  ]);
}