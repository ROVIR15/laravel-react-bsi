import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function AlertDialog(open, onClose, onDone) {
  const [status, setStatus] = React.useState(0);

  const handleClose = () => {
    onClose(false);
  };

  const handleSubmit = () => {
    onDone(order_id, {completion_status_id: status});
  }

  const handleChange = (event) => {
    setStatus(event.target.value);
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Change Status"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can change status of the sales order based on production status.
          </DialogContentText>

          <FormControl fullWidth>
            <InputLabel >Selet Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>Completed</MenuItem>
              <MenuItem value={2}>Running</MenuItem>
              <MenuItem value={3}>Waiting</MenuItem>
              <MenuItem value={4}>On Shipment</MenuItem>
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
