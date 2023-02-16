import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { styled } from '@mui/material/styles';
import Scrollbar from '../../../../components/Scrollbar';

//
import API from '../../../../helpers';

//
import Table from './TableRadio';

const content = [
  {
    one: "Party",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party2",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party3",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party4",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party5",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party6",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party7",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party6",
    two: "This party is employee",
    three: "What the heel is this"
  },
  {
    one: "Party7",
    two: "This party is employee",
    three: "What the heel is this"
  },
];

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
    maxWidth: "1200px", 
    boxShadow: "rgb(0 0 0 / 24%) -40px 40px 80px -8px", 
    width: "100%"
  }
}));

function SimpleDialog(props) {

  const { onClose, selected, setSelected, open, options } = props;

  const opts = !options ? [] : options; 
  const handleClose = () => {
    onClose(selected);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <DialogStyled onClose={handleClose} open={open} >
      <DialogTitle>Choose Sales Order</DialogTitle>
        <Scrollbar sx={{
            padding: '0px 12px 12px',
            maxHeight: 640,
        }}>
        { 
          !opts ? "loading" : ( 
            <Table list={opts} selected={selected} setSelected={setSelected}/>
          )
        }
        </Scrollbar>
    </DialogStyled>
  );
}

export default SimpleDialog;