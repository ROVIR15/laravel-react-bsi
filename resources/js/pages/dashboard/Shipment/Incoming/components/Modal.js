import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

// Components
import API from '../../../../../helpers';

import Table from './Table';
import { _orderItem } from '../../../../../helpers/data';
import { IconButton, Stack } from '@mui/material';
import closeCircle from '@iconify/icons-eva/close-outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
};

export default function BasicModal({ order_id, so_id, payload, open, options, handleClose, selected, setSelected}) {
  const [value, setValue] = React.useState([])
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  React.useEffect(() => {
    function isEmpty(array){
      if(!Array.isArray(array)) return true;
      return !array.length;
    }

    if(order_id) {

      try {
        API.getAPurchaseOrderItem(order_id, (res) => {
          if(!res) return
          if(!res.data.length) {
              setValue([]);
          } else {
            let ras = _orderItem(res.data);
            setValue(ras)
          }
        });  
      } catch (error) {
        alert(error);
      }

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
              Select Order Item 
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