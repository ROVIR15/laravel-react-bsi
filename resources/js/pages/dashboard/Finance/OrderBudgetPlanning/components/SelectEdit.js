import React, { useState, useEffect} from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, TextField } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';

//API
import API from '../../../../helpers'
import { isArray, isString } from 'lodash';

export default function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const [options, setOptions] = useState([]);
  const apiRef = useGridApiContext();
  const loading = options.length === 0;

  const handleChange = async (event) => {
    // if(!isString(event)) apiRef.current.stopCellEditMode({ id, field });
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
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
        API.getFacility('?type=line-sewing', function(res){
          setOptions(res.data);
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
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      {
        (!isArray(options)? 'Loading...' : 
          options.map(function(x){
            return (
              <option value={x.id}>{`${x.name}`}</option>
            ) 
          })
        )
      }
    </Select>

    // <Autocomplete
    //   disablePortal
    //   id="combo-box-demo"
    //   onChange={handleChange}
    //   onInputChange={(event, newInputValue) => {
    //     handleChange(newInputValue);
    //   }}
    //   options={options}
    //   isOptionEqualToValue={(option, value) => option.id === value.id}
    //   getOptionLabel={(option) => `${option.id}-${option.name}`}
    //   sx={{width: '200px'}}
    //   renderInput={(params) => <TextField {...params} />}
    // />
  );
}