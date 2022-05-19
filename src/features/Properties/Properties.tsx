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
import React from 'react';
import { DataSnapshot, ref } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { getFirebaseDatabase } from '../../services/firebaseService';

const Properties = () => {
  // const [color, setColor] = useState('rgba(0, 0, 0, 0.54)');
  const [snapshots, loading] = useList(
    ref(getFirebaseDatabase(), 'properties'),
  );

  if (loading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Box mx={2} my={3}>
      <Stack spacing={3}>
        {snapshots?.map((property: DataSnapshot) => {
          return (
            <Card sx={{ minWidth: 275 }} key={property.key}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  textTransform={'capitalize'}
                >
                  {property.val().address}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  // onClick={() => {
                  //   if (color === '#fe304f') {
                  //     setColor('rgba(0, 0, 0, 0.54)');
                  //   } else {
                  //     setColor('#fe304f');
                  //   }
                  // }}
                >
                  <Favorite
                    htmlColor={
                      property.val().favorite
                        ? '#fe304f'
                        : 'rgba(0, 0, 0, 0.54)'
                    }
                  />
                </IconButton>
                <Button
                  variant="text"
                  sx={{ marginLeft: 'auto' }}
                  href={property.val().url}
                  target={'_blank'}
                >
                  View Property
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Properties;
