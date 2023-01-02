import React, { useState } from 'react';
import { filter, isArray } from 'lodash';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Scrollbar from '../../../../../../components/Scrollbar';
import { isEditCondition } from '../../../../../../helpers/data';
import { Icon } from '@iconify/react';
import { Checkbox, FormControlLabel, FormGroup, IconButton, Stack } from '@mui/material';

import searchFill from '@iconify/icons-eva/search-fill';
import closeCircle from '@iconify/icons-eva/close-outline';
import { useLocation, useParams } from 'react-router-dom';
import { fCurrency } from '../../../../../../utils/formatNumber';

const _ListItemStyled = styled(FormControlLabel)(({ theme }) => ({
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  outline: '0px',
  border: '0px',
  margin: '0px',
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  color: 'inherit',
  display: 'flex',
  flexGrow: '1',
  position: 'relative',
  textDecoration: 'none',
  minWidth: '0px',
  boxSizing: 'border-box',
  textAlign: 'left',
  transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  padding: '12px',
  borderRadius: '8px',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  if (!isArray(array)) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_b) => {
      let datum = _b?.ref_num;
      return datum.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(33, 43, 54)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: '8px',
    backgroundImage: 'none',
    margin: '32px',
    position: 'relative',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100% - 64px)',
    maxWidth: '444px',
    boxShadow: 'rgb(0 0 0 / 24%) -40px 40px 80px -8px',
    width: '100%'
  }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  },
  margin: 10
}));

const DivStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '10px'
}));

function SimpleDialog(props) {
  const { pathname } = useLocation();
  const { id } = useParams();
  let paramsId = id;

  const { onClose, selected, open, options, setSelected } = props;
  const [filterName, setFilterName] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const opts = !options ? [] : options;

  console.log(options);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddPayments = (e, item) => {
    const selectedIndex = selected.map((e) => e.id).indexOf(item.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      if (isEditCondition(pathname.split('/'), id)) {
        try {
          let dateNow = new Date();
          console.log('here');
          // API.insertPurchaseOrderItem([item], function (res) {
          //   if (res.success) alert('success');
          //   else alert('failed');
          // });
          // update();
        } catch (e) {
          alert(e);
        }
      } else {
        console.log('added here');
        newSelected = newSelected.concat(selected, item);
      }
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const filteredData = applySortFilter(opts, getComparator(order, orderBy), filterName);

  return (
    <DialogStyled onClose={handleClose} open={open} fullWidth>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pt={'12px'}
        pl={'20px'}
        pr={'20px'}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Select Payment
        </Typography>
        <IconButton onClick={handleClose} color="error">
          <Icon icon={closeCircle} />
        </IconButton>
      </Stack>

      <DivStyled>
        <SearchStyle
          value={filterName}
          onChange={handleFilterByName}
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      </DivStyled>
      <List sx={{ pt: 0 }}>
        <Scrollbar
          sx={{
            padding: '0px 12px 12px',
            maxHeight: 640
          }}
        >
          {!opts
            ? 'loading'
            : filteredData.map((item) => {
                const _checked = selected.map((e, index) => e.id).indexOf(item.id) !== -1;
                return (
                  <_ListItemStyled
                    control={
                      <Checkbox
                        checked={_checked}
                        onChange={(event) => handleAddPayments(event, item)}
                      />
                    }
                    label={
                      <>
                        <Typography variant="subtitle2">
                          {item.effective_date} - {item.ref_num}
                        </Typography>
                        <Typography component="span" variant="body1">
                          Rp. {fCurrency(item.total_amount)}
                        </Typography>
                      </>
                    }
                  />
                );

                // <ListItemStyled
                //   button
                //   onClick={() => handleListItemClick(item)}
                //   selected={selectedValue === item.id}
                //   key={item.id}
                // >
                //   <Typography variant="subtitle2">{item.effective_date} - {item.ref_num}</Typography>
                //   <Typography component="span" variant="body1">Rp. {fCurrency(item.total_amount)}</Typography>
                // </ListItemStyled>
              })}
        </Scrollbar>
      </List>
    </DialogStyled>
  );
}

export default SimpleDialog;
