import { Edit, Favorite } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Stack,
  Theme,
} from '@mui/material';
import React from 'react';
import { DataSnapshot, orderByChild, query, ref } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { getFirebaseDatabase } from '../../services/firebaseService';

const Properties = () => {
  const ordered = query(
    ref(getFirebaseDatabase(), 'properties'),
    orderByChild('entryDateTime'),
  );
  const [snapshots, loading] = useList(ordered);

  if (loading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Box mx={2} my={3}>
      <Stack spacing={3}>
        {snapshots?.reverse().map((property: DataSnapshot) => {
          return (
            <Card sx={{ minWidth: 275 }} key={property.key}>
              <CardContent>
                <Box>
                  <Typography
                    gutterBottom
                    variant="body1"
                    textTransform={'capitalize'}
                  >
                    {property.val().address}
                  </Typography>
                </Box>
                <Box marginTop={2} display="flex" flexDirection="row">
                  <Box marginX={1}>
                    <Typography
                      variant="caption"
                      color={(theme: Theme) => theme.palette.text.secondary}
                    >
                      List Price
                    </Typography>
                    <Typography variant="body2">
                      {property.val().listPrice
                        ? property.val().listPrice
                        : 'NA'}
                    </Typography>
                  </Box>
                  <Box marginX={5}>
                    <Typography
                      variant="caption"
                      color={(theme: Theme) => theme.palette.text.secondary}
                    >
                      Sale Price
                    </Typography>
                    <Typography variant="body2">
                      {property.val().salePrice
                        ? property.val().salePrice
                        : 'NA'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <Favorite
                    htmlColor={
                      property.val().favorite
                        ? '#fe304f'
                        : 'rgba(0, 0, 0, 0.54)'
                    }
                  />
                </IconButton>
                <IconButton
                  aria-label="edit property"
                  onClick={() => alert('Coming Soon')}
                >
                  <Edit />
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
