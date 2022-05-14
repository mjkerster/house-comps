import { Close, Favorite, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState('rgba(0, 0, 0, 0.54)');

  const submitProperty = () => navigate(-1);
  return (
    <Box>
      <Box display={'flex'} justifyContent="flex-end">
        <IconButton onClick={() => navigate(-1)} size="large">
          <Close sx={{ height: '30px', width: '30px' }} />
        </IconButton>
      </Box>
      <Stack spacing={4} padding={4}>
        <TextField required label="Property URL" />
        <TextField label="List Price (Optional)" />
        <TextField label="Sale Price (Optional)" />
        <Box display={'flex'} flexDirection="row" alignItems={'center'}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (color === '#fe304f') {
                setColor('rgba(0, 0, 0, 0.54)');
              } else {
                setColor('#fe304f');
              }
            }}
            size="large"
          >
            <Favorite htmlColor={color} />
          </IconButton>
          <Typography> Favorite?</Typography>
        </Box>
        <Box display={'flex'} justifyContent="center">
          <Button startIcon={<Save />} onClick={submitProperty}>
            Submit Property
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddProperty;
