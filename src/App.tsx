import React from 'react';
import { Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './features/Auth/RequireAuth';
import Login from './features/Auth/Login';
import MainLayout from './features/Shared/MainLayout';
import Properties from './features/Properties/Properties';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        {' '}
        <Route index element={<Properties />} />
      </Route>
    </Routes>
  );
}

export default App;
