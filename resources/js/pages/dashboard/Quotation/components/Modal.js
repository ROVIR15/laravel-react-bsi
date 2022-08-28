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

// Helpers
import { productFeatureArrangedData, productItemArrangedData } from '../../../../helpers/data'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

export default function BasicModal({ payload, open, handleClose, setComponent}) {
  const [value, setValue] = React.useState([])
  
  const [options, setOptions] = React.useState([])
  const [openX, setOpenX] = React.useState(false);
  const loading = openX && options.length === 0;

  const handleDoneFill = () => {
    if(!value.length) {
      handleClose();
      return
    }
    const _value = value.map(function(x, index){
      const hha = productItemArrangedData(x);
      return {...hha, product_feature_id: hha.id, id: payload.length+index, inquiry_item_id: null, qty: 0, unit_price: 0}
    })
    var _p = payload.concat(_value);

    _p = _p.map(function(x, index){
      return {...x, id: index}
    });

    setComponent(_p);

    handleClose();
  }

  React.useEffect(() => {
    let active = true;

    (async () => {

      await API.getProductFeature((res) => {
        if(!res) return
        if(!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      })

    })();

    return () => {
      active = false;
    };
  }, [loading])

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Product to Inquiry Item
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
            getOptionLabel={({ brand, product: {goods: {name}}, color, size, id}) => (`${id} - ${name} ${color} - ${size}`)}
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
                 {`${option.id} - ${option.product.goods.name} ${option.color} - ${option.size}`}
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