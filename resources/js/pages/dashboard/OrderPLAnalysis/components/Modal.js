import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Icon } from '@iconify/react';

// Components
import API from '../../../../helpers';

import Table from './Table';
import { _orderItem } from '../../../../helpers/data';
import { IconButton, Stack } from '@mui/material';
import closeCircle from '@iconify/icons-eva/close-outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({ open, type, handleClose, selected, setSelected }) {
  const [value, setValue] = React.useState([]);
  const loading = open && value.length === 0;

  React.useEffect(() => {
    if (!open) setValue([]);
    if (!open) return;

    if(type === 1){
      try {
        API.getPurchaseOrderList((res) => {
          if (!res) return;
          if (!res.data.length) {
            setValue([]);
          } else {
            let ras = res.data.map((item) => ({
              id: item.id,
              order_id: item.order_id,
              po_number: item.po_number,
              qty: item?.sum[0]?.total_qty,
              amount: item?.sum[0]?.total_money
            }));
            setValue(ras);
          }
        });
      } catch (error) {
        alert(error);
      }  
    } 

    if(type === 2){
      try {
        API.getSalesOrderList((res) => {
          if (!res) return;
          if (!res.data.length) {
            setValue([]);
          } else {
            let ras = res.data.map((item) => ({
              id: item.id,
              order_id: item.order_id,
              po_number: item.po_number,
              qty: item?.sum[0]?.total_qty,
              amount: item?.sum[0]?.total_money
            }));
            setValue(ras);
          }
        });
      } catch (error) {
        alert(error);
      }  
    }

    if(type === 3){
      try {
        API.getBOMList((res) => {
          if (!res) return;
          if (!res.data) {
            setValue([]);
          } else {
            const ras = res.data.map((item) => ({
              id: item.id,
              po_number: item.name,
              qty: item.qty,
              amount: item.final_price
            }));
            setValue(ras);
          }
        });
      } catch (error) {
        alert(error);
      }
    }

    else return;
  }, [open]);

  const getSelectedOrderData = () => {
    if(!type) return [];
    if(type === 1) return selected[0];
    if(type === 2) return selected[1];
    if(type === 3) return selected[2];
    else return [];
  }

  const getTitle = () => {
    if(!type) return [];
    if(type === 1) return 'Purchase Order';
    if(type === 2) return 'Sales Order';
    if(type === 3) return 'Costing';
    else return [];
  }

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
              Select {getTitle()}
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>

          <Table list={value} type={type} selected={getSelectedOrderData()} setSelected={setSelected} />
        </Card>
      </Modal>
    </div>
  );
}
