import { TabPanel, TabContext, TabList } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom';

import Form from './components/Form';
import ResetPassword from './components/ResetPassword';
import Submission from './role';
import Pages from './pages';

import API from '../../../helpers';

function Test() {
  const { id } = useParams();
  const [user, setUser] = React.useState({name: "", email: "", id: 0});
  const [roles, setRoles] = React.useState([]);
  const [pages, setPages] = React.useState([]);
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    try {
      API.getUser(id, (res) => {
        if(!res) return undefined;
        setUser(res);
      });

      API.getASubmission(`/${id}`, (res) => {
        if(!res) return undefined;
        setRoles(res);
      });

      API.getAPagesAccess(`/${id}`, (res) => {
        if(!res) return undefined;
        setPages(res);
      });
    } catch (error) {
      alert('error')
    }
  }, [])

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="General" value="1" />
          <Tab label="Submission Access" value="2" />
          <Tab label="Pages Access" value="3" />
          <Tab label="Reset Password" value="4" />
        </TabList>
      </Box>
      <TabPanel value="1"><Form data={user}/></TabPanel>
      <TabPanel value="2"><Submission data={roles}/></TabPanel>
      <TabPanel value="3"><Pages data={pages}/></TabPanel>
      <TabPanel value="4"><ResetPassword id={id}/></TabPanel>
    </TabContext>
  )
}

export default Test;