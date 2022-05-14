import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './features/Auth/RequireAuth';
import Login from './features/Auth/Login';
import MainLayout from './features/Shared/MainLayout';
import Properties from './features/Properties/Properties';
import AddProperty from './features/Properties/AddProperty';

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
      <Route
        path="/add"
        element={
          <RequireAuth>
            <AddProperty />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
