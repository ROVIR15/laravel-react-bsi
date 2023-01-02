import React, { useCallback, useEffect, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { isArray } from 'lodash';

export default function Asynchronous({ label, loading, options, open, setOpen, choosen, changeData }) {
    const [value, setValue] = React.useState(null);

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
      getOptionLabel={({ account_name, account_number, id}) => (`${id} - ${account_name} ${account_number} - ${size}`)}
      options={options}
      loading={loading}
      value={choosen} 
      onInputChange={async (event, newInputValue) => {
        await changeData('financial_account_id', parseInt(newInputValue.split('-')[0]));
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