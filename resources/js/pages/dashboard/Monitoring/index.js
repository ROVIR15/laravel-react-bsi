import React, { useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';
import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
//icons
import DataGrid from './components/DataGrid';

// components
import Layout from '../../../layouts/Layout';
import Chart from './charts/LineChart';
import BarChart from './charts/BarChart';
import { useSnackbar } from 'notistack'

// API
import API from '../../../helpers';
import moment from 'moment';
import { isArray } from 'lodash';
import { fPercent } from '../../../utils/formatNumber';

function getPathname(array){
  if(!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

const columns = [
  { field: 'id', width: 50, headerName: 'ID', editable: false},
  { field: 'line', width: 200, headerName: 'Line Name', editable: false},
  { field: 'date', headerName: 'Date', editable: false},
  { field: 'so_number', width: 250, headerName: 'Ref. Order', editable: false},
  { field: 'name', width: 200, headerName: 'Name', editable: false},
  { field: 'output', headerName: 'Output', editable: false },
  { field: 'target', headerName: 'Target', editable: false },
  { field: 'completion', width: 150, headerName: 'Completion (%)', editable: false }
];

function makeData(array) {
  console.log(isArray(array))
  if(!isArray(array)) return [];
  let a = array.map(function(x, index) {
    console.log(x)
    let _p = (parseFloat(x.total_output)/parseFloat(x.target?.target)) * 100
    return {
      id: index+1,
      line: x.target?.facility?.name,
      date: x.date,
      so_number: x?.sales_order?.po_number,
      name: x.product_feature?.product?.goods?.name,
      output: x.total_output,
      target: x.target?.target,
      completion: fPercent(_p)
    }
  })
  return a;
}

function Monitoring() {
  const [ data, setData ] = useState([]);
  let now =moment(new Date()).format('YYYY-MM-DD')
  const [filterDate, setFilterDate] = useState(now);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('Here I am', {
      variant: 'success'
    });
  };

  useEffect(() => {
    handleUpdateData();
  }, [])

  const handleUpdateData = () => {
    let params = `?date=${filterDate}`;
    try {
      API.getSewingLineDetail(params, function(res){
        if(!res) return undefined;
        let _data = makeData(res.data);
        setData(_data);
      })
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Monitoring
        </Typography>
      </Stack>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Chart />
        </Grid>
        <Grid item xs={6}>
          <BarChart 
            filterDate={filterDate} 
            setFilterDate={setFilterDate}
            update={handleUpdateData}
          />
        </Grid>

        <Grid item xs={12}>
          <Card>
            <DataGrid 
              rows={data} 
              columns={columns} 
            />
          </Card>
        </Grid>
      </Grid>
      <Outlet/>
    </Layout>
  )
}

export default Monitoring