import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import API from '../../../../../helpers';
import { isArray } from 'lodash';

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
    let id = value?.split('.')[1];
    id = id?.split('/')[0];
    id = id?.split('-')[0];

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
        order_id,
        issue_date,
        po_number }) => `PO-No.${purchase_order_id}-${order_id}/${issue_date}/${po_number}`}
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
