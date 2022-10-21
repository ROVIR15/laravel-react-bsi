import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack } from '@mui/material';
import closeCircle from '@iconify/icons-eva/close-outline';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

// Components
import API from '../../../../helpers';

import Table from './Table';
import { optionProductFeature } from '../../../../helpers/data';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
};

export default function BasicModal({ order_id, payload, open, options, handleClose, selected, setSelected}) {
  const [value, setValue] = React.useState([])
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  React.useEffect(() => {
    function isEmpty(array){
      if(!Array.isArray(array)) return true;
      return !array.length;
    }

    if(isEmpty(value)) {
      API.getFabric((res) => {
		  if(!res) return
		  if(!res.data) {
          setValue(BUYERLIST);
        } else {
          const ras = optionProductFeature(res.data, 'fabric');
          setValue(ras);
        }
      });
    }
  }, [order_id])

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
        <Stack direction="row" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Fabric 
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle}/>
            </IconButton>
          </Stack>


          <Table list={value} selected={selected} setSelected={setSelected}/>
        </Card>
      </Modal>
    </div>
  );
}