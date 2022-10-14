import React, {useState} from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, FormControl, Typography, Button, TextField, Grid, Stack } from '@mui/material';
//
import moment from 'moment';
import { BaseOptionChart } from '../../../../components/charts';
//
import API from '../../../../helpers'
// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Team A',
    type: 'line',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Team B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Team C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

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

export default function AppWebsiteVisits() {
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState([]);

  const [filterDate, setFilterDate] = useState({
    'thruDate': moment(new Date()).format('YYYY-MM-DD'),
    'fromDate': moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD')
  });

  
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 3, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: labels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} pcs`;
          }
          return y;
        }
      }
    }
  });

  React.useEffect(() => {
    handleUpdateData();
  }, [])

  const handleUpdateData = () => {
    let params = `?fromDate=${filterDate.fromDate}&thruDate=${filterDate.thruDate}`;
    try {
      API.getGraphData(params, res => {
        if(!res) return undefined;
        let hahaha = (lineData(res.data));
        setData(hahaha)
        setLabels(res.data.label);
      })  
    } catch (error) {
      alert('error');
    }
  }

  const handleDateChanges = (event) => {
    const { name, value} = event.target;
    setFilterDate((prevValue) => {
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

  return (
    <Grid
      container
      direction="row"
      spacing={2}
    >
      <Grid item xs={12}>
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <TextField
            type="date"
            label="Form Date"
            value={filterDate.fromDate}
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
            value={filterDate.thruDate}
            name="thruDate"
            onChange={handleDateChanges}
          />
        </FormControl> 

        <Button onClick={handleUpdateData}>Go</Button>   
      </Stack>      
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Sewing Performance"  />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart type="line" series={data} options={chartOptions} height={364} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
