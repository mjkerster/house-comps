import { Close, Favorite, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postProperty } from '../../services/firebaseService';

const AddProperty = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState('rgba(0, 0, 0, 0.54)');
  const [url, setUrl] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [favorite, setFavorite] = useState(false);

  const submitProperty = () => {
    postProperty({
      url,
      listPrice,
      salePrice,
      favorite,
      entryDateTime: new Date().toISOString(),
    });
    navigate(-1);
  };
  return (
    <Box>
      <Box display={'flex'} justifyContent="flex-end">
        <IconButton onClick={() => navigate(-1)} size="large">
          <Close sx={{ height: '30px', width: '30px' }} />
        </IconButton>
      </Box>
      <Stack spacing={4} padding={4}>
        <TextField
          required
          label="Property URL"
          value={url}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setUrl(evt.target.value)
          }
        />
        <TextField
          label="List Price (Optional)"
          value={listPrice}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setListPrice(evt.target.value)
          }
        />
        <TextField
          label="Sale Price (Optional)"
          value={salePrice}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setSalePrice(evt.target.value)
          }
        />
        <Box display={'flex'} flexDirection="row" alignItems={'center'}>
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (color === '#fe304f') {
                setColor('rgba(0, 0, 0, 0.54)');
              } else {
                setColor('#fe304f');
              }
              setFavorite(!favorite);
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
