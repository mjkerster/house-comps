import { Add } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const trigger = useScrollTrigger();
  return (
    <Box height={'inherit'}>
      <AppBar position="static">
        <Container maxWidth={'sm'}>
          <Toolbar variant="dense" disableGutters>
            <Typography fontFamily={'Millenia'} variant="h2">
              HC
            </Typography>
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
          }}
          color="secondary"
        >
          <Add />
          {!trigger ? 'Add' : ''}
        </Button>
      </Box>
    </Box>
  );
};

export default MainLayout;
