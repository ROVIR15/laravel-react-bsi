import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import API from '../../../../helpers';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({ loading, options, label, open, setOpen, changeData }) {
    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
      if(!value) return
      let id = value.split(',')[0]
      API.getARFQ(id, (res) => {
        if(!res) return
        if(!res.data) {
          changeData([]);
        } else {
          changeData(res.data);
        }
      })
    }, [value])

    return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.po_number === value.po_number}
      getOptionLabel={(option) => (option.id + ', ' + option.po_number)}
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }
      }
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          autoComplete="inquiry_id"
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}