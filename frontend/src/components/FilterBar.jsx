import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Box,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

const FilterBar = ({ handleFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    sortBy: null,
    categories: [],
    priceRange: { min: '', max: '' },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApplyFilters = () => {
    handleFilter(selectedFilters);
    handleClose();
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Box pl={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFilters.sortBy === 'highLow'}
                  onChange={() => handleFilterChange('sortBy', 'highLow')}
                />
              }
              label="High to Low"
            />
          </Box>
        </MenuItem>
        <MenuItem>
          <Box pl={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFilters.sortBy === 'lowHigh'}
                  onChange={() => handleFilterChange('sortBy', 'lowHigh')}
                />
              }
              label="Low to High"
            />
          </Box>
        </MenuItem>

        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedFilters.categories.includes('Clothing')}
                onChange={() =>
                  handleFilterChange('categories', ['Clothing'])
                }
              />
            }
            label="Clothing"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedFilters.categories.includes('Electronics')}
                onChange={() =>
                  handleFilterChange('categories', ['Electronics'])
                }
              />
            }
            label="Electronics"
          />
        </MenuItem>

        <MenuItem>
          <Box pl={2} pr={2}>
            <TextField
              label="Min Price"
              type="number"
              value={selectedFilters.priceRange.min}
              onChange={(e) =>
                handleFilterChange('priceRange', {
                  ...selectedFilters.priceRange,
                  min: e.target.value,
                })
              }
            />
          </Box>
          <Box pl={2} pr={2}>
            <TextField
              label="Max Price"
              type="number"
              value={selectedFilters.priceRange.max}
              onChange={(e) =>
                handleFilterChange('priceRange', {
                  ...selectedFilters.priceRange,
                  max: e.target.value,
                })
              }
            />
          </Box>
        </MenuItem>

        <MenuItem>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterBar;
