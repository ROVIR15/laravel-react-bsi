import React, { useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';
import {
  Button,
  Card,
  Container,
  Grid,
  FormControl,
  TextField,
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
import PaperStatus from './charts/Paper.card';
import { useSnackbar } from 'notistack'

// API
import API from '../../../helpers';
import moment from 'moment';
import { isArray, isEmpty } from 'lodash';
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
  { field: 'money', headerName: 'Amount', editable: false },
  { field: 'completion', width: 150, headerName: 'Completion (%)', editable: false }
];

function makeData(array) {
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
      money: x.order_item?.unit_price,
      completion: fPercent(_p)
    }
  })
  return a;
}

function arrangedData(label, chart){
  //filter based on label
  let b = chart.map((y) => {
    return(y.date)
  })


  let filterDateEmpty = label.filter(item => !b.includes(item));

  let c = []
  label.map((x) =>
      chart.map((y) => {
          if(y.date === x) {c.push({date: y.date, output: y.output})}
      })
  )

  filterDateEmpty.map(item => c.push({date: item, output: 0}));
  
  let sorted = c.sort((a,b) => a.date.localeCompare(b.date));

  return sorted.map(item => item.output);
}

function lineData(data){
  return data.lines.map((item) => {
    let a = data.chart.filter((item2) => (item2.line === item));
    return {name: 'line ' + item, data: arrangedData(data.label, a), type: 'line'}
  })
}

function Monitoring() {
  const [ amount, setAmount ] = useState(null);
  const [ qty, setQty ] = useState(null);
  const [ data, setData ] = useState([]);
  const [labels, setLabels] = React.useState([]);
  const [lineChartData, setLineChartData] = React.useState([]);

  let now =moment(new Date()).format('YYYY-MM-DD');

  const [filterDate, setFilterDate] = useState(now);
  const [filterRangeDate, setFilterRangeDate] = useState({
    'thruDate': moment(new Date()).format('YYYY-MM-DD'),
    'fromDate': moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD')
  });

  const handleDateChanges = (event) => {
    const { name, value} = event.target;
    setFilterRangeDate((prevValue) => {
      if(name === 'fromDate') {
        if(value > prevValue.thruDate) {
          alert('from date cannot be more than to date');
          return prevValue;
        } else {
          return ({...prevValue, [name]: value});
        }
      } 
      else if(name === 'thruDate') {
        if(value < prevValue.fromDate) {
          alert('to date cannot be less than fron date');
          return prevValue;
        } else {
          return ({...prevValue, [name]: value});
        }
      }
      else {
        return ({...prevValue, [name]: value});
      }
    })
  }

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

  const handleUpdateData2 = () => {
    let params = `?fromDate=${filterRangeDate.fromDate}&thruDate=${filterRangeDate.thruDate}`;
    try {
      API.getAmountMoneySewing(params, res => {
        if(!res) return undefined;
        if(!res.success) return undefined;
        else {
          let test = res.data?.reduce(function(initial, next){
            if(!next.total_output || !next.order_item?.unit_price) return initial;
            return {
              total_income : initial.total_income + Math.floor(next.total_output * next.order_item?.unit_price),
              total_qty : initial.total_qty + Math.floor(next.total_output)
            }
          }, {total_income: 0, total_qty: 0})
          
          setAmount(test.total_income);
          setQty(test.total_qty);
        }
      }) 
      
      API.getGraphData(params, res => {
        if(!res) return undefined;
        let hahaha = (lineData(res.data));
        setLineChartData(hahaha)
        setLabels(res.data.label);
      }) 
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    handleUpdateData2();
  }, [])

  return (
    <Layout>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Monitoring
        </Typography>
      </Stack>

      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-evenly" spacing={3}>
          <FormControl fullWidth>
            <TextField
              type="date"
              label="Form Date"
              value={filterRangeDate.fromDate}
              name="fromDate"
              onChange={handleDateChanges}
            />
          </FormControl>

          <Typography variant="h3">
            -
          </Typography>

          <FormControl fullWidth>
            <TextField
              type="date"
              label="To Date"
              value={filterRangeDate.thruDate}
              name="thruDate"
              onChange={handleDateChanges}
            />
          </FormControl> 

          <Button onClick={handleUpdateData2}>Go</Button>   
        </Stack> 
        </Grid>
        <Grid item xs={12}>
          <PaperStatus value={amount} qty={qty}/>
        </Grid> 
        <Grid item xs={6}>
          <Chart 
            data={lineChartData}
            labels={labels}
            filterDate={filterRangeDate}
          />
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