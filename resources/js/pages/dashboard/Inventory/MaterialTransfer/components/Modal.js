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
import { bomitem_data_alt } from '../../utils'

// Helpers
import { optionProductFeature, productItemArrangedData } from '../../../../../helpers/data';
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

  // handle storing data for bom selection
  // gonna be used to get material item based on bom
  const [optionBom, setOptionBOm] = React.useState([]);

  const handleBOMFilter = (event) => {
    if(event.target.value === 0 && !isEmpty(options)) {
      console.log(options.length)
      setSelectionOptions(options)
    } else {
      // console.log(event.target.value)
      const selected = optionBom.find((x) => x.id === event.target.value);
      if(isEmpty(selected)) return;
      if(isEmpty(selected?.items)) setSelectionOptions([]);
      else {
        const _items_converted = bomitem_data_alt(selected?.items);
        setSelectionOptions(_items_converted);
      }
  }
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    // get productFeature
    API.getProductFeature(async (res) => {
      if (!res) return;
      if (!res.data) {
        setOptions([]);
      } else {
        let data = await optionProductFeature(res.data);
        setOptions(data);
      }
    });

    // get bom_alt
    API.getBOM_alt('', (res) => {
      if (!res) return;
      if (!res.data) {
        setOptionBOm([]);
      } else {
        setOptionBOm(res.data);
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

          <FormControl fullWidth>
            <InputLabel>Select BOM</InputLabel>
            <Select onChange={handleBOMFilter}>
              <MenuItem value={0}>{'Semua Item'}</MenuItem>
              {optionBom?.map((item) => {
                const item_name = `${item.product_feature?.product?.goods?.name} ${item.product_feature?.color} - ${item.product_feature?.size}`
                return (<MenuItem value={item.id}>{item_name}</MenuItem>);
              })}
            </Select>
          </FormControl>

          <Table list={selectionOptions} update={update} selected={items} setSelected={setItems} />
        </Card>
      </Modal>
    </div>
  );
}
