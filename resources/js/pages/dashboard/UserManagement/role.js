import { Box, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

import API from '../../../helpers'
import { isArray } from 'lodash';
import { useParams } from 'react-router-dom';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const pages = [
  'quotation',
  'request-for-quotation',
  'sales-order',
  'purchase-order',
  'costing',
  'invoice'
];

const initialData = {
  name: '',
  submit: false,
  review: false,
  approve: false
}


function User({data}) {
  const {id} = useParams()
  const [payload, setPayload] = useState([]);
  const [user, setUser] = useState([]);

  const handleAddRow = () => {
    try {
      API.insertSubmission({...initialData, user_id: id}, (res)=> {
        if(!res) return undefined;
        if(!res.success) return alert('error');
        update()
      });
    } catch (error) {
      alert('error');
    }
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
    const { id, ...rest} = item;
    API.updateSubmission(id, rest, (res) => {
      if(!res.success) alert('error');
      alert(JSON.stringify(res));
    });
  }

  const handleDelete = (id) => {
    API.deleteSubmission(id, (res) => {
      if(!res.success) alert('error');
      alert(JSON.stringify(res));
      update()
    });
  }

  const update = () => {
    API.getASubmission(`/${id}`, (res) => {
      if(!res) return undefined;
      setPayload(res);
    })
  }

  useEffect(() => {
    API.getUsers((res) =>  {
      if(!res) return undefined;
      setUser(res);
    })

    // API.getASubmission((res) => {
    //   if(!res) return undefined;
    //   setPayload(res);
    // })

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
            <InputLabel id="demo-simple-select-label">Nama Hak</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="name"
              value={item.name}
              label="Nama Hak"
              onChange={(e) => handleChangeField(e, index)}
            >
              {pages.map(function(name, index){
                return (
                  <MenuItem value={name}>{name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
    
          <FormControlLabel
            name="submit"
            onChange={(e) => handleChangeCheckBox(e, index)}
            control={<Checkbox checked={item.submit}/>}
            label="Submit"
            labelPlacement="start"
          />
    
          <FormControlLabel
            name="review"
            onChange={(e) => handleChangeCheckBox(e, index)}
            control={<Checkbox checked={item.review}/>}
            label="Review"
            labelPlacement="start"
          />
    
          <FormControlLabel
            name="approve"
            onChange={(e) => handleChangeCheckBox(e, index)}
            control={<Checkbox checked={item.approve}/>}
            label="Approve"
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