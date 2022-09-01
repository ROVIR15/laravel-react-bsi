import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

const icon = <Icon icon={SquareOutline}/>;
const checkedIcon = <Icon icon={CheckSquareOutline} />;

// Components
import API from '../../../../helpers';

import Table from './Table';
import { optionNumbering, optionSupermarket, orderItemArrangedData } from '../../../../helpers/data';

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

    if(isEmpty(value) && order_id) {
      API.getMonitoringSupermarket(`?sales-order=${order_id}`, (res) => {
		  if(!res) return
		  if(!res.data) {
          setValue(BUYERLIST);
        } else {
          let ras = optionSupermarket(res.data);
          console.log(ras)
          setValue(ras)
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
          <Typography onClick={handleClose} id="modal-modal-title" variant="h6" component="h2">
            Select Product to Inquiry Item
          </Typography>

          <Table list={value} selected={selected} setSelected={setSelected}/>
        </Card>
      </Modal>
    </div>
  );
}