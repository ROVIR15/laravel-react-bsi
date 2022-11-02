import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

import TableHistoryPrice from '../TablePriceHistory';

import API from '../../../../../helpers';
import { isEmpty } from 'lodash';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}


export default function DraggableDialog({ open, handleClose, bom_id}) {

  const [payload, setPayload] = useState([]);

  useEffect(() => {

    if(!open) setPayload([]);
    else {
      try {
        API.getABOMStatus(bom_id, (res) => {
          if(isEmpty(res)) return;
          else {
            setPayload(res);
          }
        })      
      } catch (error) {
        alert('error')
      }  
    }

  }, [open])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          History Price
        </DialogTitle>
        <DialogContent>
          <TableHistoryPrice 
            payload={payload}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}