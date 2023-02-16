import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import API from '../../../../../helpers';
import { isArray, isEmpty } from 'lodash';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({
  label,
  loading,
  order_id,
  options,
  open,
  setOpen,
  choosen,
  changeData
}) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    if (isEmpty(value)) return;
    let id = value.split('.')[1].split('/')[0]

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
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={({ name, id, order_id }) => `PO-NO.${id}/${order_id}/${name}`}
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
