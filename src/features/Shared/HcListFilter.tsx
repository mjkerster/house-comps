import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Check, Clear, FilterList } from '@mui/icons-material';
import { IconButton, ListItemIcon, useTheme } from '@mui/material';
import { useState } from 'react';

export type FilterItemType = 'list' | 'sale' | 'both' | 'fave' | 'none';
export interface HcListFilterProps {
  onFilterChange: (fitlerItem: FilterItemType) => void;
}
export default function HcListFilter(props: HcListFilterProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState(-1);
  const theme = useTheme();
  const [color, setColor] = useState('rgba(0, 0, 0, 0.54)');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  type FilterType = {
    key: number;
    label: string;
    type: FilterItemType;
  };
  const filterMap: FilterType[] = [
    {
      key: 0,
      label: 'Has List Price',
      type: 'list',
    },
    {
      key: 1,
      label: 'Has Sale Price',
      type: 'sale',
    },
    {
      key: 2,
      label: 'Has Both',
      type: 'both',
    },
    {
      key: 3,
      label: 'Is Favorite',
      type: 'fave',
    },
    {
      key: 4,
      label: 'Clear',
      type: 'none',
    },
  ];
  const selectedRowClick = (row: number) => {
    props.onFilterChange(filterMap[row].type);
    setSelectedRow(row);
    setColor(theme.palette.primary.main);
    handleClose();
  };
  const clearClick = () => {
    props.onFilterChange(filterMap[4].type);
    setSelectedRow(-1);
    setColor('rgba(0, 0, 0, 0.54)');
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showCheck = (position: number) => {
    return position === selectedRow ? (
      <Check htmlColor={theme.palette.success.main} />
    ) : (
      ''
    );
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterList htmlColor={color} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {filterMap.map((filter, index) => {
          if (filter.key === 4) {
            return (
              <MenuItem onClick={clearClick} key={`filter-${index}`}>
                <ListItemIcon>
                  <Clear />
                </ListItemIcon>
                Clear
              </MenuItem>
            );
          } else {
            return (
              <MenuItem
                onClick={() => selectedRowClick(filter.key)}
                key={`filter-${index}`}
              >
                <ListItemIcon>{showCheck(filter.key)}</ListItemIcon>
                {filter.label}
              </MenuItem>
            );
          }
        })}
      </Menu>
    </div>
  );
}
