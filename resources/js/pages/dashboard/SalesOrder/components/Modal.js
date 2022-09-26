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

// Helpers
import { optionProductFeature, productItemArrangedData } from '../../../../helpers/data'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
};

export default function BasicModal({ payload, order_id, update, open, handleClose, items, setItems}) {
  const [value, setValue] = React.useState([])
  
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0;

  React.useEffect(() => {
    console.log(items)
    let active = true;

    if(!loading) {
      return undefined
    }

      API.getProductFeature((res) => {
        if(!res) return
        if(!res.data) {
          setOptions([]);
        } else {
          let data = optionProductFeature(res.data);
          setOptions(data);
        }
      })
    return () => {
      active = false;
    };
  }, [loading])

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
          <Table list={options} order_id={order_id} update={update} selected={items} setSelected={setItems}/>
        </Card>
      </Modal>
    </div>
  );
}