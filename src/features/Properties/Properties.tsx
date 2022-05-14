import { Favorite } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';

const Properties = () => {
  const [color, setColor] = useState('rgba(0, 0, 0, 0.54)');
  return (
    <Box mx={2} my={3}>
      <Stack spacing={2}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography gutterBottom>
              Some identifying information of the house or Zillow link
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                if (color === '#fe304f') {
                  setColor('rgba(0, 0, 0, 0.54)');
                } else {
                  setColor('#fe304f');
                }
              }}
            >
              <Favorite htmlColor={color} />
            </IconButton>
            <Button variant="text" sx={{ marginLeft: 'auto' }}>
              View Property
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
};

export default Properties;
