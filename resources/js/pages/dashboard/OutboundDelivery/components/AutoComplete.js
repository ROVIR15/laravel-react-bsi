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
      if(!value) return
      let id = value.split('-')[0]
      API.getASalesOrder(id, (res) => {
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
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={({ po_number, id}) => (`${id} - ${po_number}`)}
      options={options}
      loading={loading}
      value={choosen} 
      onInputChange={async (event, newInputValue) => {
          await setValue(newInputValue);
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