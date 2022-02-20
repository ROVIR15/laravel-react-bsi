import React from 'react';
import { Navigate, useRoutes, Routes, Route } from 'react-router-dom';
// Layout
import DashboardLayout from '../layouts/dashboard';
// Pages
import FirstPage from '../pages/auth/first.page.js';
import SecondPage from '../pages/auth/second.page.js';

export default function TestRouter() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'first-page', element: <FirstPage /> },
        { path: 'second-page', element: <SecondPage /> }
      ]
    }
  ]);
}