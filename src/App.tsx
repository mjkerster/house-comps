import React from 'react';
import { Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './features/Auth/RequireAuth';
import Login from './features/Auth/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Typography variant="h1">Welcome!</Typography>
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
