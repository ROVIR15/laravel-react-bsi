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

function arrangedData(data){

  let b = data.map((item) => {
    return { 
      x: item.facility?.name,
      y: item.monitoring_sewing[0]?.total_output,
      goals: [
        {
          name: 'Expected',
          value: item?.target,
          strokeWidth: 2,
          strokeHeight: 10,
          strokeColor: '#775DD0'
        }
      ]
    }
  });

  console.log(b)

  return b;

}

export default function AppWebsiteVisits( {filterDate, setFilterDate, update }) {
  const [labels, setLabels] = React.useState([]);
  const [data, setData] = React.useState(
    [
      {
        name: 'Actual',
        data: []
      }
    ]
  );

  
  const chartOptions = {
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    colors: ['#00E396'],
    dataLabels: {
      formatter: function(val, opt) {
        const goals =
          opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
            .goals
    
        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`
        }
        return val
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0']
      }
    }
  }

  React.useEffect(() => {
    handleUpdateData();
  }, [])

  const handleUpdateData = () => {
    let params = `?date=${filterDate}`;
    try {
      API.getFacilityTarget(params, res => {
        if(!res) return undefined;
        let hahaha = (arrangedData(res.data));
        console.log(hahaha)
        setData([
          {
            name: 'Actual',
            data: hahaha
          }
        ])
      })  
    } catch (error) {
      alert('error');
    }
    update();
  }

  const handleDateChanges = (event) => {
    const { name, value} = event.target;

    setFilterDate(value);
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
            label="From Date"
            value={filterDate}
            name="fromDate"
            onChange={handleDateChanges}
          />
        </FormControl>

        <Button onClick={handleUpdateData}>Go</Button>   
      </Stack>      
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Sewing Actual vs Expected" />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart type="bar" series={data} options={chartOptions} height={364} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
