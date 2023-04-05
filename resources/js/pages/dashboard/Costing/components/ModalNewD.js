import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack } from '@mui/material';

import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';

import Table from './TableForModal/TableBOM';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({
  payload,
  open,
  updateIt,
  options,
  handleClose,
  items,
  setItems
}) {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-tile"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Stack direction="row" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select material component for BOM
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>
          <Table list={options} selected={items} setSelected={setItems} />
        </Card>
      </Modal>
    </div>
  );
}
