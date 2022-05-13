import {
  Box,
  Button,
  Container,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../../assets/images/google.svg';
import {
  getFirebaseAuth,
  signInWithGoogle,
} from '../../services/firebaseService';

const Login = () => {
  const [user, loading] = useAuthState(getFirebaseAuth());
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, navigate, loading]);
  return (
    <Container maxWidth="sm">
      <Stack spacing={10} mt={36} alignItems="center">
        <Box>
          <Typography
            variant="h1"
            color={(theme: Theme) => theme.palette.primary.main}
            fontFamily="Millenia"
            fontSize={48}
          >
            House Comps
          </Typography>
        </Box>
        <Box>
          <Button startIcon={<GoogleIcon />} onClick={() => signInWithGoogle()}>
            Sign In With Google
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
