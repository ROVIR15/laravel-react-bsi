import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Scrollbar from '../../../../components/Scrollbar';

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  WebkitTapHighlightColor: "transparent", 
  backgroundColor: "transparent", 
  outline: "0px", 
  border: "0px", 
  margin: "0px", 
  cursor: "pointer", 
  userSelect: "none", 
  verticalAlign: "middle", 
  appearance: "none", 
  color: "inherit", 
  display: "flex", 
  flexGrow: "1", 
  justifyContent: "flex-start", 
  position: "relative", 
  textDecoration: "none", 
  minWidth: "0px", 
  boxSizing: "border-box", 
  textAlign: "left", 
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
  padding: "12px", 
  borderRadius: "8px", 
  flexDirection: "column", 
  alignItems: "flex-start"
}))

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root' : {
    backgroundColor: "rgb(255, 255, 255)", 
    color: "rgb(33, 43, 54)", 
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
    borderRadius: "8px", 
    backgroundImage: "none", 
    margin: "32px", 
    position: "relative", 
    overflowY: "auto", 
    display: "flex", 
    flexDirection: "column", 
    maxHeight: "calc(100% - 64px)", 
    maxWidth: "444px", 
    boxShadow: "rgb(0 0 0 / 24%) -40px 40px 80px -8px", 
    width: "100%"
  }
}));

function SimpleDialog(props) {

  const { onClose, selectedValue, open, options } = props;

  const opts = !options ? [] : options; 
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <DialogStyled onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Choose Product</DialogTitle>
      <List sx={{ pt: 0 }}>
        <Scrollbar sx={{
            padding: '0px 12px 12px',
            maxHeight: 640,
        }}>
        { 
          !opts ? "loading" : ( 
          opts.map((item) => (
            <ListItemStyled 
              button 
              onClick={() => handleListItemClick(item)}
              selected={selectedValue === item.id}
              key={item.id}
            >
              <Typography variant="subtitle2">{item.name}</Typography>
              <Typography component="span" variant="caption">{item.category}</Typography>
              <Typography variant="body2">{item.brand}</Typography>
            </ListItemStyled>
          )))
        }
        </Scrollbar>
      </List>
    </DialogStyled>
  );
}

export default SimpleDialog;