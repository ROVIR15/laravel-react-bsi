import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  styled
} from '@mui/material';

import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';

// Components
import API from '../../../../../helpers';
import Table from './Table';

// Helpers
// import { optionProductFeature, productItemArrangedData } from '../../../../../helpers/data';

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

export default function BasicModal({ payload, open, handleClose, items, setItems, update }) {
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [type, setType] = React.useState(0);

  const handleSelectType = (e) => {
    setSelectedCosting(0);
    setOptions([])
    setType(e.target.value);
  };

  React.useEffect(() => {
    let active = true;

    try {
      switch (type) {
        case "1":
          API.getCostingV2((res) => {
            if (!res) return;
            if (!res.data) {
              setCostingData([]);
            } else {
              setCostingData(res.data);
            }
          });
          break;

        case "2":
          API.getSalesOrderV2('', (res) => {
            if (!res) return;
            if (!res.data) {
              setCostingData([]);
            } else {
              setCostingData(res.data);
            }
          });
          break;

        default:
          setCostingData([]);
          break;
      }
    } catch (error) {
      alert('error');
    }

    return () => {
      active = false;
    };
  }, [type]);

  // --------------------------------------------------------------- //
  const [selectedCosting, setSelectedCosting] = React.useState(0);
  const [dataCosting, setCostingData] = React.useState([]);

  const handleSelect = (e) => {
    setSelectedCosting(e.target.value);
  };

  React.useEffect(() => {
    // console.log(selectedCosting)
    setOptions([]);
    if (selectedCosting !== 0) {
      try {
        switch (type) {
          case "1":
            API.getBOMItemV3(selectedCosting, (res) => {
              if (!res) return;
              if (!res.data) {
                setOptions([]);
              } else {
                // console.log(data);
                setOptions(res.data);
              }
            });
            break;

          case "2":
            API.getSalesOrderItemV2(selectedCosting, '', function (res) {
              if (!res) return;
              if (res.success) {
                setOptions(res.data);
              }
            });
            break;

          default:
            setOptions([])
            break;
        }
      } catch (error) {
        alert(error);
      }
    }
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
              Select Product
            </Typography>
            <IconButton onClick={handleClose} color="error">
              <Icon icon={closeCircle} />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Select
              onChange={handleSelectType}
              value={type}
              input={<OutlinedInput label="Name" />}
              size="small"
              fullWidth
            >
              <MenuItem value="1">CBD</MenuItem>
              <MenuItem value="2">Sales Order</MenuItem>
            </Select>
            <FormControl fullWidth>
              <InputLabel id="costing_name">Pilih Sales Order</InputLabel>
              <Select
                onChange={handleSelect}
                value={selectedCosting}
                input={<OutlinedInput label="Name" />}
                size="small"
                fullWidth
              >
                <MenuItem value={0}>None</MenuItem>;
                {dataCosting?.map(function (item) {
                  return <MenuItem value={item.order_id}>{item.po_number}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Stack>

          <Table list={options} selected={items} setSelected={setItems} />
        </StyledCard>
      </Modal>
    </div>
  );
}
