import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getFirebaseAuth } from '../../services/firebaseService';
import { useAuthState } from 'react-firebase-hooks/auth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(getFirebaseAuth());
  const location = useLocation();
  console.log(user);
  if (!loading && user === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
