import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

const icon = <Icon icon={SquareOutline}/>;
const checkedIcon = <Icon icon={CheckSquareOutline} />;

// Components
import API from '../../../../../helpers';
import { CardActions } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

export default function BasicModal({ payload, open, handleClose, setComponent}) {
  const [value, setValue] = React.useState({})

  const [openX, setOpenX] = React.useState(false);
  const [openY, setOpenY] = React.useState(false);

  const [options, setOptions] = React.useState([]);

  const loadingX = openX && options.length === 0;
  const loadingY = openY && options.length === 0;

  const handleDoneFill = () => {
    if(!value) {
      handleClose();
      return
    }
    setComponent(value);
    handleClose();
  }

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loadingX) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getProcess((res) => {
          if(!res) return
          else setOptions(res.data);
        })
      }
    })();
    
    return () => {
      active = false;
    };
  }, [loadingX])

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loadingY) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getLabor((res) => {
          if(!res) return
          else setOptions(res);
        })
      }
    })();
    
    return () => {
      active = false;
    };
  }, [loadingY])

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Process and Labor
            </Typography>
            <Autocomplete
              onChange={(event, newValue) => {
                setValue({...value, process_id: newValue.id, process_name: newValue.name});
              }}
              open={openX}
              onOpen={() => {
                setOpenX(true);
              }}
              onClose={() => {
                setOptions([]);
                setOpenX(false);
              }}
              getOptionLabel={({ name, id}) => (`${id} - ${name}`)}
              options={options}
              loading={loadingX}
              renderInput={(params) => (
                <TextField {...params} label="Process" />
              )}
            />
            <Autocomplete
              onChange={(event, newValue) => {
                setValue({...value, labor_id: newValue.id, labor_name: newValue.name});
              }}
              open={openY}
              onOpen={() => {
                setOpenY(true);
              }}
              onClose={() => {
                setOptions([]);
                setOpenY(false);
              }}
              getOptionLabel={({ name, id}) => (`${id} - ${name}`)}
              options={options}
              loading={loadingY}
              renderInput={(params) => (
                <TextField {...params} label="Party" />
              )}
            />
          </Stack>
          <CardActions>
            <Button onClick={handleDoneFill}> Done </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}