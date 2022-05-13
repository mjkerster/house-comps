import React from 'react';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzeCm2IiWG0BdbYxUkkEMcDjf--TkNdwc',
  authDomain: 'housecomps-eb2a0.firebaseapp.com',
  projectId: 'housecomps-eb2a0',
  storageBucket: 'housecomps-eb2a0.appspot.com',
  messagingSenderId: '981811225091',
  appId: '1:981811225091:web:f04f461417e2a763e7a436',
};

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Typography variant="h1">Welcome!</Typography>}
        />
      </Routes>
    </div>
  );
}

export default App;
