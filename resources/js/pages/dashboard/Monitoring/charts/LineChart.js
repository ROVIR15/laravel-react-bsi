import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
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
    API.getGraphData(res => {
      if(!res) return undefined;
      let hahaha = (lineData(res.data));
      setData(hahaha)
      setLabels(res.data.label);
    })
    console.log(labels, data)
  }, [])

  return (
    <Card>
      <CardHeader title="Performance" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={data} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
