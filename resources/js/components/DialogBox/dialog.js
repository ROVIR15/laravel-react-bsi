import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} TransitionProps {...props} />;
});

export default function AlertDialogSlide({
  title,
  message,
  send,
  open,
  setOpen,
  comment,
  setComment,
  type
}) {
  const [content, setContent] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setComment(false);
  };

  const handleReject = () => {
    setComment(true);
  };

  const handleSendRejection = (type, content) => {
    send(`reject-${type}`, content);
    setComment(false);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  if (type === 'submit') {
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
          </DialogContent>
          <DialogContent sx={{width: 400}}>
            <TextField
              autoFocus
              multiline
              rows={6}
              margin="dense"
              id="name"
              label="Comment"
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="warning">
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log(type, content)
                send(type, content);
                setComment(false);
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
            <DialogContent sx={{width: 400}}>
              <TextField
                autoFocus
                multiline
                rows={6}
                margin="dense"
                id="name"
                label="Comment"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </DialogContent>
          </DialogContent>
          <DialogActions>
            {comment ? (
              <Button onClick={() => handleSendRejection(type, content)} color="error">
                Send Reject
              </Button>
            ) : (
              <Button onClick={handleReject} color="warning">
                Reject
              </Button>
            )}
            {comment ? null : (
              <Button
                onClick={() => {
                  send(type, content);
                  setComment(false);
                }}
              >
                Agree
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
