import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';
import closeCircle from '@iconify/icons-eva/close-outline';

const icon = <Icon icon={SquareOutline} />;
const checkedIcon = <Icon icon={CheckSquareOutline} />;
// Components
import API from '../../../../helpers';

import Table from '../components/Table';
import { optionSewing, _miniFuncQC } from '../../../../helpers/data';
import { IconButton, Stack } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({
  order_id,
  so_id,
  payload,
  open,
  options,
  handleClose,
  selected,
  setSelected
}) {
  const [value, setValue] = React.useState([]);
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  React.useEffect(() => {
    function isEmpty(array) {
      if (!Array.isArray(array)) return true;
      return !array.length;
    }
    if (order_id) {
      try {
        API.getMonitoringSewing(`?sales-order=${order_id}`, (res) => {
          if (!res) return;
          if (!res.data) {
            setValue([]);
          } else {
            let ras = optionSewing(res.data);
            ras = ras.filter(item => item.qty_loading > 0);
            setValue(ras);
          }
        });
      } catch (error) {
        alert(error)
      }
      // API.getASalesOrderItem(order_id, (res) => {
      //   if(!res) return
      //   if(!res.data.length) {
      //     setValue([]);
      //   } else {
      //     let ras = _miniFuncQC(res.data, so_id);
      //     setValue(ras)
      //   }
      // });
    }

    // if(isEmpty(value) && order_id) {
    // API.getMonitoringSewing(`?sales-order=${order_id}`, (res) => {
    // if(!res) return
    // if(!res.data) {
    // setValue(BUYERLIST);
    // } else {
    // let ras = optionQC(res.data)
    // setValue(ras);
    // }
    // });
    // }
  }, [order_id]);

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
              Select Product
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>

          <Table list={value} selected={selected} setSelected={setSelected} />
        </Card>
      </Modal>
    </div>
  );
}
