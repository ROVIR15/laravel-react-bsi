import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

// Components
import API from '../../../../helpers';

import Table from './Table';
import { _miniFunc, optionSupermarket } from '../../../../helpers/data';
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

    try {
      API.getMonitoringCutting(`?sales-order=${order_id}`, (res) => {
        if (!res) return;
        if (!res.data) {
          setValue([]);
        } else {
          let ras = optionSupermarket(res.data);
          ras = ras.filter((item) => item.qty_loading > 0);
          setValue(ras);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [order_id]);

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
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>

          <Table list={value} selected={selected} setSelected={setSelected} />
        </StyledCard>
      </Modal>
    </div>
  );
}
