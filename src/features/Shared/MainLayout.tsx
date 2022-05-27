import { Add } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { getFirebaseAuth } from '../../services/firebaseService';

const MainLayout = () => {
  const trigger = useScrollTrigger();
  const navigate = useNavigate();
  const [user] = useAuthState(getFirebaseAuth());
  return (
    <Box height={'inherit'}>
      <AppBar position="static">
        <Container maxWidth={'sm'}>
          <Toolbar disableGutters>
            <Typography fontFamily={'Millenia'} variant="h2">
              HC
            </Typography>
            <Avatar
              src={user?.photoURL ? user?.photoURL : undefined}
              sx={{ marginLeft: 'auto' }}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Box mt={3} px={2} overflow={'scroll'}>
        <Outlet />
        <Button
          sx={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            minWidth: '0px',
            transition: 'width ease .5s',
            width: !trigger ? '90px' : '56px',
          }}
          color="secondary"
          onClick={() => navigate('add')}
        >
          <Add />
          {!trigger ? 'Add' : ''}
        </Button>
      </Box>
    </Box>
  );
};

export default MainLayout;
