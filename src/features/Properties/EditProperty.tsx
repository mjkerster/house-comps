import { Close, Delete, Favorite, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { deleteProperty, updateProperty } from '../../services/firebaseService';
import HcDollarInput from '../Shared/HcDollarInput';
import { EditPropertySelector, PropertyActions } from './PropertySlice';

const EditProperty = () => {
  const navigate = useNavigate();
  const editProperty = EditPropertySelector();
  const appDispatch = useAppDispatch();
  const [color, setColor] = useState(
    editProperty.favorite ? '#fe304f' : 'rgba(0, 0, 0, 0.54)',
  );
  const [url, setUrl] = useState(editProperty.url);
  const [listPrice, setListPrice] = useState(editProperty.listPrice?.slice(1));
  const [formatListPrice, setFormatListPrice] = useState('');
  const [salePrice, setSalePrice] = useState(editProperty.salePrice?.slice(1));
  const [formatSalePrice, setFormatSalePrice] = useState('');
  const [favorite, setFavorite] = useState(editProperty.favorite);

  const editPropertyClick = () => {
    updateProperty({
      key: editProperty.key,
      url,
      listPrice: formatListPrice,
      salePrice: formatSalePrice,
      favorite,
      address: url.split('/')[4].replaceAll('-', ' '),
      entryDateTime: new Date().toISOString(),
    });
    navigate(-1);
    appDispatch(PropertyActions.clearEditProperty());
  };

  const deletePropertyClick = () => {
    deleteProperty(editProperty.key);
    navigate(-1);
    appDispatch(PropertyActions.clearEditProperty());
  };

  useEffect(() => {
    if (!editProperty.key) {
      navigate('/');
    }
  }, [editProperty.key, navigate]);

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
        <Box display={'flex'} justifyContent="center" paddingX={10}>
          <Button fullWidth startIcon={<Save />} onClick={editPropertyClick}>
            Edit Property
          </Button>
        </Box>
        <Box
          display={'flex'}
          justifyContent="center"
          paddingX={10}
          paddingTop={4}
        >
          <Button
            fullWidth
            color="error"
            startIcon={<Delete />}
            onClick={deletePropertyClick}
          >
            Delete
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditProperty;
