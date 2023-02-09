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
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
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
  filterBuyer, 
  filterName, 
  filterStatus, 
  filterDate,
  filterMonthYear,
  filterCategory,
  listOfBuyer,
  filterOrderActive = false,
  buyerFilterActive=false,
  statusActive=false,
  dateActive=false,
  monthYearActive=false,
  categoryFilterActive=false,
  onFilterBuyer,
  onFilterName, 
  onFilterStatus,
  onFilterDate,
  onFilterMonthYear,
  onFilterCategoryAndSub,
  onFilterOrder,
  onGo,
  onDeletedSelected, 
  placeHolder,
  onFilterSalesOrder,
  optionsOrder,
  selectedOrder
}) {
  
  function dateForm(){

    const handleClick = () => {
      onGo();
    }

    if(dateActive)  return (
      <>
        <Stack direction="row" spacing={2}>
          
        <FormControl fullWidth>
          <TextField
            type="date"
            label="Form Date"
            value={filterDate.fromDate}
            name="fromDate"
            onChange={onFilterDate}
          />
        </FormControl>

        <Typography variant="h3">
          -
        </Typography>

        <FormControl fullWidth>
          <TextField
            type="date"
            label="To Date"
            value={filterDate.thruDate}
            name="thruDate"
            onChange={onFilterDate}
          />
        </FormControl> 

        <Button onClick={handleClick}>Go</Button> 
        </Stack>    
      </>
    )
  }

  function monthYearForm(){

    if(monthYearActive)  return (
      <>
        <Stack direction="row" spacing={2}>

        <FormControl fullWidth>
          <TextField
            type="month"
            label="Month"
            value={filterMonthYear}
            onChange={onFilterMonthYear}
            name="month-year"
          />
        </FormControl>

        </Stack>    
      </>
    )
  }

  function statusFilter() {
    if(statusActive) return (
        <FormControl fullWidth sx={{ maxWidth: '150px'}}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            value={filterStatus}
            label="status"
            onChange={onFilterStatus}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Approve">Approve</MenuItem>
            <MenuItem value="Dropped">Dropped</MenuItem>
            <MenuItem value="Review">Review</MenuItem>
            <MenuItem value="Submit">Submit</MenuItem>
          </Select>
        </FormControl>
    )
  }

  function buyerList() {
    if(buyerFilterActive) return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Buyer</InputLabel>
          <Select
            value={filterBuyer}
            label="Buyer"
            onChange={onFilterBuyer}
          >
            <MenuItem value={0}>All</MenuItem>
            { listOfBuyer?.map(function(item){
                return ( <MenuItem value={item.id}>{item.name}</MenuItem>)
              })
            }
          </Select>
        </FormControl>      
    )
  }

  function filterByOrder() {
    if (filterOrderActive)
      return (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Order</InputLabel>
          <Select value={selectedOrder} label="status" onChange={onFilterOrder}>
            <MenuItem value="0">All</MenuItem>
            {optionsOrder?.map((item) => (
              <MenuItem value={item?.order_id}>{item?.po_number}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
  }

  function categoryAndSubCategory() {
    if(categoryFilterActive) return (
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <InputLabel htmlFor="grouped-select">Category</InputLabel>
          <Select 
            value={filterCategory}
            label="Category and Sub" 
            onChange={onFilterCategoryAndSub}>
            <MenuItem value={0}>
              All
            </MenuItem>
            <MenuItem value={1}>
              Finished Goods
            </MenuItem>
            <MenuItem value={6}>
              Assembly Goods
            </MenuItem>
            <ListSubheader>Raw Material</ListSubheader>
            <MenuItem value={2}>Thread</MenuItem>
            <MenuItem value={3}>Accessoris</MenuItem>
            <MenuItem value={4}>Fabric</MenuItem>
            <MenuItem value={5}>Packing</MenuItem>
          </Select>
        </FormControl>
      </Stack>      
    )
  }
  
  return (
    <RootStyle>

        <Stack direction="row" spacing={2} sx={{width: '100%'}}>

        {monthYearForm()}

        {buyerList()}

        {filterByOrder()}

        {statusFilter()}

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