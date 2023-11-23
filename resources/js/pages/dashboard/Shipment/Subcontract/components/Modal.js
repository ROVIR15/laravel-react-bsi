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
} from '@mui/material';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

// Components
import API from '../../../../../helpers';

import Table from './Table';
import { optionProductFeatureV3, _orderItem } from '../../../../../helpers/data';
import { IconButton, Stack } from '@mui/material';
import closeCircle from '@iconify/icons-eva/close-outline';
import { isEmpty } from 'lodash';

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
  setSelected,
  setFieldValue
}) {
  const [value, setValue] = React.useState([]);
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    try {
      API.getPurchaseOrderV2('', (res) => {
        if (!res) return;
        if (!res.data) {
          setCostingData([]);
        } else {
          setCostingData(res.data);
        }
      });
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
  };

  React.useEffect(() => {
    // console.log(selectedCosting)
    setLoadingData(true);
    try {
      if (selectedCosting !== 0) {
        API.getSalesOrderItemV2(selectedCosting, '', function (res) {
          if (!res) return;
          if (res.success) {
            let listed = res.data.map(function (item) {
              return { ...item, deliv_qty: 0 };
            });
            setValue(listed);
          }
        });

        setFieldValue('order_id', selectedCosting)
      } else {
        // API.getProductFeature((res) => {
        //   if (!res) return;
        //   if (!res.data) {
        //     setCostingData([]);
        //   } else {
        //     const dataAC = optionProductFeatureV3(res.data);
        //     setValue(listed);
        //   }
        // });
      }
    } catch (error) {
      alert(error);
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
              {!isEmpty(dataCosting)
                ? dataCosting?.map(function (item) {
                    return <MenuItem value={item?.order_id}>{item?.po_number}</MenuItem>;
                  })
                : null}
            </Select>
          </div>
          <Table list={value} selected={selected} setSelected={setSelected} />
        </StyledCard>
      </Modal>
    </div>
  );
}
