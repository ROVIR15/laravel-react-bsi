import * as React from 'react';
import {
  Card,
  Select,
  MenuItem,
  Typography,
  Modal,
  OutlinedInput,
  InputLabel,
  styled
} from '@mui/material'

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
  p: 4
};

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4,
  [theme.breakpoints.down('md')]: {
    maxWidth: '320px'
  }
}));

export default function BasicModal({
  order_id,
  open,
  handleClose,
  selected,
  category = 3,
  setSelected
}) {
  const [value, setValue] = React.useState([]);
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    try {
      if (category === 3) {
        API.getSalesOrderV2('', (res) => {
          if (!res) return;
          if (!res.data) {
            setCostingData([]);
          } else {
            setCostingData(res.data);
          }
        });
      } else if (category === 4) {
        API.getPurchaseOrderV2('', (res) => {
          if (!res) return;
          if (!res.data) {
            setCostingData([]);
          } else {
            setCostingData(res.data);
          }
        });
      } else {
        alert('no option');
      }
    } catch (error) {
      alert(error);
    }

    return () => {
      active = false;
    };
  }, [category]);

  // --------------------------------------------------------------- //
  const [selectedCosting, setSelectedCosting] = React.useState(0);
  const [dataCosting, setCostingData] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(false);
  const handleSelect = (e) => {
    setSelectedCosting(e.target.value);
  }

  React.useEffect(() => {
    // console.log(selectedCosting)
    setLoadingData(true);
    if (selectedCosting !== 0) {
      try {
        API.getSalesOrderItemV2(selectedCosting, '', function (res) {
          if (!res) return;
          if (res.success) {
            let listed = res.data.map(function(item) {
              return {...item, deliv_qty: 0};
            })
            setValue(listed)
          }
        });
      } catch (error) {
        alert(error);
      }
    }

    setLoadingData(false);

  }, [selectedCosting]);
  // --------------------------------------------------------------- //

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
              Select Order Item
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>

            <div>
              <InputLabel id="costing_name">Pilih Order</InputLabel>
              <Select
                onChange={handleSelect}
                value={selectedCosting}
                input={<OutlinedInput label="Name" />}

                fullWidth
              >
                <MenuItem value={0}>None</MenuItem>;
                {dataCosting?.map(function (item) {
                  return <MenuItem value={item.id}>{item.po_number}</MenuItem>;
                })}
              </Select>
            </div>
          <Table list={value} selected={selected} setSelected={setSelected} />
        </StyledCard>
      </Modal>
    </div>
  );
}
