import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

import { Icon } from '@iconify/react';
import CloseCircle from '@iconify/icons-eva/close-circle-fill';

import useAuth from '../../context';

import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function SimpleSnackbar() {
  const { user } = useAuth();

  // if (!user) return <Navigate replace to="/auth/login" />;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Icon icon={CloseCircle}/>
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />

      <Dashboard/>
    </div>
  );
}
