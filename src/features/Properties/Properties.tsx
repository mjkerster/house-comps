import { Edit, Favorite, OpenInNew } from '@mui/icons-material';
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
import React, { useState } from 'react';
import { DataSnapshot, orderByChild, query, ref } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { getFirebaseDatabase, Property } from '../../services/firebaseService';
import { useNavigate } from 'react-router-dom';
import { PropertyActions } from './PropertySlice';
import { useAppDispatch } from '../../app/hooks';
import HcListFilter, { FilterItemType } from '../Shared/HcListFilter';
import { Utils } from '../../services/utils';

const Properties = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterItemType>('none');
  const ordered = query(
    ref(getFirebaseDatabase(), 'properties'),
    orderByChild('entryDateTime'),
  );
  const [snapshots, loading] = useList(ordered);

  const handleFilterChange = (filterType: FilterItemType) => {
    setFilter(filterType);
  };
  if (loading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Box mx={2} my={3}>
      <Box display={'flex'} flexDirection="row-reverse">
        <HcListFilter onFilterChange={handleFilterChange} />
      </Box>

      <Stack spacing={3} marginBottom={20}>
        {snapshots
          ?.reverse()
          .filter((property) => {
            const propertyVal: Property = property.val();
            if (filter === 'sale') {
              return (
                propertyVal.salePrice !== '' && propertyVal.listPrice === ''
              );
            }
            if (filter === 'list') {
              return (
                propertyVal.salePrice === '' && propertyVal.listPrice !== ''
              );
            }
            if (filter === 'both') {
              return (
                propertyVal.salePrice !== '' && propertyVal.listPrice !== ''
              );
            }
            if (filter === 'fave') {
              return propertyVal.favorite;
            }
            if (filter === 'none') {
              return true;
            }
          })
          .map((property: DataSnapshot) => {
            const propertyVal: Property = property.val();

            return (
              <Card sx={{ minWidth: 275 }} key={property.key}>
                <CardContent>
                  <Box display="flex" flexDirection={'row-reverse'}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      textTransform={'capitalize'}
                      textAlign="right"
                      color={(theme: Theme) => theme.palette.text.secondary}
                    >
                      {Utils.getShortFormDateUtc(propertyVal.entryDateTime)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      gutterBottom
                      variant="body1"
                      textTransform={'capitalize'}
                    >
                      {propertyVal.address}
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
                        {propertyVal.listPrice ? propertyVal.listPrice : 'NA'}
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
                        {propertyVal.salePrice ? propertyVal.salePrice : 'NA'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        color={(theme: Theme) => theme.palette.text.secondary}
                      >
                        Since Entry
                      </Typography>
                      <Typography variant="body2">
                        {`${Math.abs(
                          Utils.numberofDaysFromToday(
                            propertyVal.entryDateTime,
                          ),
                        )} days`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite
                      htmlColor={
                        propertyVal.favorite ? '#fe304f' : 'rgba(0, 0, 0, 0.54)'
                      }
                    />
                  </IconButton>
                  <IconButton
                    aria-label="edit property"
                    onClick={() => {
                      appDispatch(
                        PropertyActions.setEditProperty({
                          key: property.key,
                          ...propertyVal,
                        }),
                      );
                      navigate('edit');
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <Button
                    variant="text"
                    sx={{ marginLeft: 'auto' }}
                    href={propertyVal.url}
                    target={'_blank'}
                    startIcon={<OpenInNew />}
                  >
                    View
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
