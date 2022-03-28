import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import API from '../../../../helpers';
import { isArray } from 'lodash';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({ label, loading, options, open, setOpen, choosen, changeData }) {
    const [value, setValue] = React.useState(null);

    React.useEffect(() => {
      console.log(value)
      if(!value) return
      let id = value.split(',')[0]
      API.getAInquiry(id, (res) => {
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
      sx={{ width: 300 }}
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
      value={choosen} 
      onInputChange={(event, newInputValue) => {
          setValue(newInputValue);
        }
      }
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
            ),
          }}
        />
      )}
    />
  );
}