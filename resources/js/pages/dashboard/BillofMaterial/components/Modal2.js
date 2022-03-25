import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

const icon = <Icon icon={SquareOutline}/>;
const checkedIcon = <Icon icon={CheckSquareOutline} />;

// Components
import API from '../../../../helpers';
import AutoComplete from './AutoComplete';
import { random } from 'lodash';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

export default function BasicModal({ payload, open, options, handleClose, setComponent}) {
  const [value, setValue] = React.useState([])
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  const handleDoneFill = () => {
    const xValue = value.map((key, index)=> {
      return {id: Math.random(), name: '', work_center_id: key.id, seq: index}
    });
    setComponent((prevComponent) => prevComponent.concat(xValue))
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select material component for BOM
          </Typography>
          <Autocomplete
            multiple
            limitTags={3}
            id="checkboxes-tags-demo"
            onChange={(event, newValue) => {
              const x = newValue.filter((option) => payload.indexOf(option) === -1)
              setValue(x);
            }}
            open={openX}
            onOpen={() => {
              setOpenX(true);
            }}
            onClose={() => {
              setOpenX(false);
            }}
            getOptionLabel={({ brand, name, color, size, id}) => (`${id} - ${name} ${color} - ${size}`)}
            options={options}
            loading={loading}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) =>
              (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                 {`${option.id} - ${option.name} ${option.color} - ${option.size}`}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Component" />
            )}
          />
          <Button onClick={handleDoneFill}> Done </Button>
        </Card>
      </Modal>
    </div>
  );
}