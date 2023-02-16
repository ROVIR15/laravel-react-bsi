import React, { useState, useEffect} from 'react';
import { useGridApiContext } from '@mui/x-data-grid';
//API
import API from '../../../../helpers'
import { isArray, isString } from 'lodash';
import { Autocomplete, TextField } from '@mui/material';

export default function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const [options, setOptions] = useState([]);
  const apiRef = useGridApiContext();
  const loading = options.length === 0;

  const handleChange = async (event) => {
    if(isString(event)) {
      await apiRef.current.setEditCellValue({ id, field, value: event.split('-')[0] });      
    }
    apiRef.current.stopCellEditMode({ id, field });
  };

  useEffect(() => {
    let active = true;

    if(!loading){
      return undefined
    }

    if(options.length > 0 || options.length != 0) return
    else {
      try {
        API.getCostingList(function(res){
          if(!res.length) return;
          else {
            let _data = res.map(function(item){
              return {
                id: item?.id,
                name: item?.name
              }
            })
            setOptions(_data);  
          }
        })          
      } catch (error) {
        alert('error') 
      }
    }

    return () => {
      active= false
    }
  }, [loading])

  return (
    <Autocomplete
      disablePortal
      onInputChange={(event, newInputValue) => {
        handleChange(newInputValue);
      }}
      onChange={handleChange}
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.id}-${option.name}`}
      sx={{width: '300px'}}
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  );
}