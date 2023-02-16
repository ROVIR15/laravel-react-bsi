import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Icon } from '@iconify/react';
import { IconButton, Stack, styled } from '@mui/material';
import closeCircle from '@iconify/icons-eva/close-outline';

// Components
import API from '../../../../helpers';
import Table from './Table';

// Helpers
import { optionProductFeature } from '../../../../helpers/data';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

const StyledCard = styled(Card)(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
  [theme.breakpoints.down('md')]: {
    maxWidth: '320px'
  }
}))

export default function BasicModal({ payload, open, handleClose, update, items, setItems }) {
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    try {
      API.getProductFeature(async (res) => {
        if (!res) return;
        if (!res.data) {
          setOptions([]);
        } else {
          let data = await optionProductFeature(res.data);
          setOptions(data);
        }
      });        
    } catch (error) {
      alert(error)  
    }
    
    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledCard sx={style}>
          <Stack direction="row" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Product 
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle}/>
            </IconButton>
          </Stack>
          
          <Table list={options} selected={items} setSelected={setItems}/>
        </StyledCard>
      </Modal>
    </div>
  );
}
