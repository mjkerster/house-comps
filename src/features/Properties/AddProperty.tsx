import { Close, Favorite, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataSnapshot, get } from 'firebase/database';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  findPropertyByAddressQuery,
  postProperty,
} from '../../services/firebaseService';
import HcDollarInput from '../Shared/HcDollarInput';

const AddProperty = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState('rgba(0, 0, 0, 0.54)');
  const [url, setUrl] = useState('');
  const [listPrice, setListPrice] = useState('');
  const [formatListPrice, setFormatListPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [formatSalePrice, setFormatSalePrice] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const blurValidation = async () => {
    if (url !== '') {
      const snap: DataSnapshot = await get(
        findPropertyByAddressQuery(url.split('/')[4].replaceAll('-', ' ')),
      );

      if (snap.exists()) {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    }
  };
  const submitProperty = () => {
    postProperty({
      url,
      listPrice: formatListPrice,
      salePrice: formatSalePrice,
      favorite,
      address: url.split('/')[4].replaceAll('-', ' '),
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
          onBlur={() => {
            blurValidation();
          }}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setUrl(evt.target.value)
          }
          error={isDuplicate}
          helperText={isDuplicate ? 'This is a duplicate entry' : undefined}
        />
        <HcDollarInput
          label="List Price (Optional)"
          value={listPrice}
          onChange={(evt: any) => {
            setListPrice(evt.target.value);
            setFormatListPrice(evt.target.format);
          }}
        />
        <HcDollarInput
          label="Sale Price (Optional)"
          value={salePrice}
          onChange={(evt: any) => {
            setSalePrice(evt.target.value);
            setFormatSalePrice(evt.target.format);
          }}
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
          <Button
            startIcon={<Save />}
            onClick={submitProperty}
            disabled={isDuplicate || url === ''}
          >
            Submit Property
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddProperty;
