import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function TemporaryDrawer() {
  
  const [state, setState] = React.useState(true)

  const toggleDrawer =
    (open) => {
      setState(open);
    };

  return (
    <div>
          <Button onClick={toggleDrawer(true)}>{'right'}</Button>
          <Drawer
            anchor={'right'}
            open={state}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 'right' === 'top' || 'right' === 'bottom' ? 'auto' : 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
            >
              <div>HAHAHA</div>
            </Box>
          </Drawer>
    </div>
  );
}
