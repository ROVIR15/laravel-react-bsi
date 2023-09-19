import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
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
import API from '../../../../helpers';
import Table from './Table';

// Helpers
import { optionProductFeature, productItemArrangedData } from '../../../../helpers/data';

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

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    try {
      API.getCostingV2((res) => {
        if (!res) return;
        if (!res.data) {
          setCostingData([]);
        } else {
          setCostingData(res.data);
        }
      });
    } catch (error) {
      alert('error');
    }

    return () => {
      active = false;
    };
  }, [loading]);

  // --------------------------------------------------------------- //
  const [selectedCosting, setSelectedCosting] = React.useState(0);
  const [dataCosting, setCostingData] = React.useState([]);

  const handleSelect = (e) => {
    setSelectedCosting(e.target.value);
  }

  React.useEffect(() => {
    // console.log(selectedCosting)
    if (selectedCosting !== 0) {
      try {
        API.getBOMItemV3(selectedCosting, (res) => {
          if (!res) return;
          if (!res.data) {
            setOptions([]);
          } else {
            // console.log(data);
            setOptions(res.data);
          }
        });
      } catch (error) {
        alert('error');
      }
    } else {
      try {
        API.getProductFeatureFinishedGoods((res)=>{
          if(!res) return;
          if(!res.data) setOptions([])
          else setOptions(res.data);
        })
      } catch {
        alert('error');
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

          <div>
            <InputLabel id="costing_name">Pilih Costing</InputLabel>
            <Select
              onChange={handleSelect}
              value={selectedCosting}
              input={<OutlinedInput label="Name" />}
              size="small"
              fullWidth
            >
              <MenuItem value={0}>None</MenuItem>;
              {dataCosting?.map(function (item) {
                return <MenuItem value={item.id}>{item.name}</MenuItem>;
              })}
            </Select>
          </div>

          <Table list={options} selected={items} setSelected={setItems} />
        </StyledCard>
      </Modal>
    </div>
  );
}
