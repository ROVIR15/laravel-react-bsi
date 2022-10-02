import { Box, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

import API from '../../../helpers'
import { isArray } from 'lodash';
import {useParams} from 'react-router-dom';

const initialData = {
  user_id: null,
  pages_id: null,
  name: null,
  insert: false,
  edit: false,
  delete: false
}


function User({data}) {
  const { id } = useParams();
  const [payload, setPayload] = useState([]);
  const [user, setUser] = useState([]);
  const [pages, setPages] = useState([]);

  const handleAddRow = () => {
    API.insertPagesAccess({...initialData, user_id: id}, (res)=> {
      if(!res) return undefined;
      if(!res.success) return alert('error');
      update()
    });
  }

  const handleChangeCheckBox = (event, idx) => {
    const { name, checked } = event.target;
    let a = payload.map((x, index) => {
      if(index === idx) return {...x, [name]: checked}
      return x;
    })

    setPayload(a);

  }

  const handleChangeField = (event, idx) => {
    const { name, value } = event.target;
    let a = payload.map((x, index) => {
      if(index === idx) return {...x, [name]: value}
      return x;
    })

    setPayload(a);
  }

  const handleSubmit = (item) => {
    const { id, pages, user, ...rest} = item;

    API.updatePagesAccess(id, rest, (res) => {
      if(!res.success) alert('error');
      alert(JSON.stringify(res));
    });
  }

  const handleDelete = (id) => {
    API.deletePagesAccess(id, (res) => {
      if(!res.success) alert('error');
      alert(JSON.stringify(res));
      update()
    });
  }

  const update = () => {
    API.getAPagesAccess(`/${id}`, (res) => {
      if(!res) return undefined;
      setPayload(res);
    })
  }

  useEffect(() => {
    API.getUsers((res) =>  {
      if(!res) return undefined;
      setUser(res);
    })

    API.getPages((res) => {
      if(!res) return undefined;
      setPages(res);
    })

    if(!isArray(data)) {
      console.error('data not array or data is empty');
      return;
    } else {
      setPayload(data);
    }
  }, [data])

  return(
  <>
    {payload.map((item, index) => {
      return (
      <Box p={2}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}      
        >
  
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="user_id"
              value={item.user?.id}
              label="User Name"
              onChange={(e) => handleChangeField(e, index)}
            >
              {user.map(function({id, name}, index){
                return (
                  <MenuItem value={id}>{name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
  
  
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Nama Halaman</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="pages_id"
              value={item.pages_id}
              label="Nama Halaman"
              onChange={(e) => handleChangeField(e, index)}
            >
              {pages.map(function({id, name}, index){
                return (
                  <MenuItem value={id}>{name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
    
          <FormControlLabel
            name="insert"
            onChange={(e) => handleChangeCheckBox(e, index)}
            control={<Checkbox checked={item.insert}/>}
            label="Insert"
            labelPlacement="start"
          />
    
          <FormControlLabel
            name="edit"
            onChange={(e) => handleChangeCheckBox(e, index)}
            control={<Checkbox checked={item.edit}/>}
            label="Update"
            labelPlacement="start"
          />
    
          <FormControlLabel
            name="delete"
            onChange={(e) => handleChangeCheckBox(e, index)}
            control={<Checkbox checked={item.delete}/>}
            label="Delete"
            labelPlacement="start"
          />

          <Button variant="contained" onClick={() => handleSubmit(item)}> Send </Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}> Delete </Button>
        
        </Stack>
      </Box> 
      )
    })}
    <Box>
      <Button onClick={handleAddRow}>Add New Row</Button>
    </Box>
  </>
  )
}

export default User;