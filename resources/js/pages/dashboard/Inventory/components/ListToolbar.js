import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  TextField,
  Button,
  ListSubheader
} from '@mui/material';
import { Stack } from '@mui/system';
import { isArray, isEmpty } from 'lodash';
import { array } from 'yup';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  // height: 96,
  display: 'flex',
  justifyContent: 'space-between'
  // padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

const SearchStyleT = styled(OutlinedInput)(({ theme }) => ({
  width: 100,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 420, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

ListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder: PropTypes.string
};

export default function ListToolbar({
  numSelected,
  filterFacility,
  filterName,
  filterCosting,
  filterDate,
  filterMonthYear,
  filterCategory,
  filterList,
  costingList,
  facilityFilterActive = false,
  costingFilterActive = false,
  dateActive = false,
  monthYearActive = false,
  categoryFilterActive = false,
  onFilterFacility,
  onFilterName,
  onFilterCosting,
  onFilterDate,
  onFilterMonthYear,
  onFilterCategoryAndSub,
  onGo,
  onDeletedSelected,
  placeHolder
}) {
  function listCosting() {
    if (costingFilterActive)
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">CBD/Sales Order</InputLabel>
          <Select value={filterCosting} label="Buyer" onChange={onFilterCosting}>
            <MenuItem value={0}>All</MenuItem>
            {isArray(costingList)
              ? costingList?.map(function (item) {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })
              : null}
          </Select>
        </FormControl>
      );
  }

  function listFacility() {
    if (facilityFilterActive)
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Facility</InputLabel>
          <Select value={filterFacility} label="Buyer" onChange={onFilterFacility}>
            <MenuItem value={0}>All</MenuItem>
            {isArray(filterList)
              ? filterList?.map(function (item) {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })
              : null}
          </Select>
        </FormControl>
      );
  }

  function categoryAndSubCategory() {
    if (categoryFilterActive)
      return (
        <FormControl fullWidth>
          <InputLabel htmlFor="grouped-select">Category</InputLabel>
          <Select value={filterCategory} label="Category and Sub" onChange={onFilterCategoryAndSub}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Finished Goods</MenuItem>
            <MenuItem value={6}>Assembly Goods</MenuItem>
            <ListSubheader>Raw Material</ListSubheader>
            <MenuItem value={2}>Thread</MenuItem>
            <MenuItem value={3}>Accessoris</MenuItem>
            <MenuItem value={4}>Fabric</MenuItem>
            <MenuItem value={5}>Packing</MenuItem>
          </Select>
        </FormControl>
      );
  }

  return (
    <RootStyle>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        {categoryAndSubCategory()}

        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={placeHolder}
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      </Stack>
    </RootStyle>
  );
}
