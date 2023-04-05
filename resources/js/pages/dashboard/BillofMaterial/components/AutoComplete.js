import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

import API from '../../../../helpers';
import { isEmpty, isString } from 'lodash';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#f3f3f3'
  }
}));

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
  return (
    <StyledAutoComplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => {
        if(isEmpty(value)) return;
        return(option.id === parseInt(choosen?.split(',')[0]))
      }}
      getOptionLabel={({ item_name, id }) => `${id}, ${item_name}`}
      options={options}
      value={choosen}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        if(isString(newInputValue)) changeData(parseInt(newInputValue?.split(',')[0]), newInputValue);
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
