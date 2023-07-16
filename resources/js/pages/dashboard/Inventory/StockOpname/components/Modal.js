import * as React from 'react';
import Card from '@mui/material/Card';
import { FormControl, InputLabel, IconButton, MenuItem, Select, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';

// Components
import API from '../../../../../helpers';
import Table from './Table';
import { bomitem_data_alt } from '../../utils';

// Helpers
import { inventoryItemWithStock } from '../../../../../helpers/data';
import { isEmpty } from 'lodash';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({
  payload,
  order_id,
  update,
  open,
  handleClose,
  items,
  setItems
}) {
  const [value, setValue] = React.useState([]);

  // handle storing options for material item
  const [options, setOptions] = React.useState([]);

  // store selection options
  const [selectionOptions, setSelectionOptions] = React.useState([]);

  // loading
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // get productFeature
    API.getCheckInventoryItem((res) => {
      if (!res) return;
      if (!res.data) {
        setOptions([]);
      } else {
        let data = inventoryItemWithStock(res.data);
        setOptions(data);
      }
    });

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    // get bom
  }, []);

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
              Select Items
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>

          <Table list={options} update={update} selected={items} setSelected={setItems} />
        </Card>
      </Modal>
    </div>
  );
}
