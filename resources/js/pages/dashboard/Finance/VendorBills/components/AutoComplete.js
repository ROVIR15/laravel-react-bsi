import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import API from '../../../../../helpers';
import { isArray, isNull } from 'lodash';
import { strPadLeft } from '../../../../../utils/formatProduct';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({
  label,
  loading,
  options,
  open,
  setOpen,
  choosen,
  changeData
}) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (!value) return;
    let match = value.match(/PO-(\d+)/);
    let id=null;
    if (match) {
        let extractedNumber = match[1];
        // Remove leading zeros
        id = extractedNumber.replace(/^0+/, '');
        console.log(id);
    } else {
        console.log("Pattern not found.");
    }

    if(isNull(id)) return;

    try {
      API.getAPurchaseOrder(id, (res) => {
        if (!res) return;
        if (!res.data) {
          throw new Error('no Data');
        } else {
          changeData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [value]);


  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.purchase_order_id === value.purchase_order_id}
      getOptionLabel={({ purchase_order_id,
        po_number }) => `PO-${strPadLeft(purchase_order_id, 4, '0')} (${po_number})`}
      options={options}
      loading={loading}
      value={choosen}
      onInputChange={async (event, newInputValue) => {
        await setValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
