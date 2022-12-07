import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Chip, Grid, Tab, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { isArray, isEmpty, isUndefined, isNull, isEqual } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from '../../components/charts';

import TableOrder from './components/TableOrder';
import TableProblemLog from './components/TableProblemLog';
import TableWorkDetail from './components/TableWorkDetail';
import API from '../../helpers';

const LineItems = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

// const data = [
//   {
//     id: 1,
//     name: 'Sewing Line 1'
//   },
//   {
//     id: 2,
//     name: 'Sewing Line 2'
//   },
//   {
//     id: 3,
//     name: 'Sewing Line 3'
//   },
//   {
//     id: 4,
//     name: 'Sewing Line 4'
//   },
//   {
//     id: 5,
//     name: 'Sewing Line 5'
//   },
//   {
//     id: 6,
//     name: 'Sewing Line 6'
//   },
//   {
//     id: 7,
//     name: 'Sewing Line 7'
//   },
// ]

const CHART_DATA = [
  {
    name: 'Output',
    type: 'line',
    data: [
      247, 250, 212, 263, 374, 254, 57, 192, 275, 108, 143, 57, 167, 207, 298, 144, 162, 73, 310,
      350, 62, 251, 377, 264, 125, 278, 288, 281, 34, 100
    ]
  },
  {
    name: 'Target',
    type: 'line',
    data: [
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
      200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200
    ]
  }
];

function Dashboard() {
  // Chip
  const [chipSelected, setChipSelected] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState({
    id: 0,
    facility_id: 0,
    sales_order_id: 0
  });

  const [lineSelected, setLineSelected] = useState(null);
  const [data, setData] = useState([]);

  const [workDetail, setWorkDetail] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const [graphData, setGraphData] = useState(CHART_DATA);
  const [date, setDate] = useState([
    '2021-10-02',
    '2021-10-03',
    '2021-10-04',
    '2021-10-05',
    '2021-10-06',
    '2021-10-07',
    '2021-10-08',
    '2021-10-09',
    '2021-10-10',
    '2021-10-11',
    '2021-10-12',
    '2021-10-13',
    '2021-10-14',
    '2021-10-15',
    '2021-10-16',
    '2021-10-17',
    '2021-10-18',
    '2021-10-19',
    '2021-10-20',
    '2021-10-21',
    '2021-10-22',
    '2021-10-23',
    '2021-10-24',
    '2021-10-25',
    '2021-10-26',
    '2021-10-27',
    '2021-10-28',
    '2021-10-29',
    '2021-10-30',
    '2021-10-31'
  ]);

  // Month Year
  const [filterMonthYear, setFilterMonthYear] = useState(moment(new Date()).format('YYYY-MM'));

  const handleMonthYearChanges = (event) => {
    const { value } = event.target;
    setFilterMonthYear(value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    let a = parseInt(event.target.id);
    const selected = data.filter((item) => {
      return item.id === a;
    });
    if (!isArray(selected)) return;
    setLineSelected(selected[0]);
  };

  function _sljeir8(data) {
    const { id, sales_order, expected_output, work_days, ckckck } = data;
    return {
      id,
      sales_order_id: sales_order.id,
      po_number: sales_order.po_number,
      buyer_name: sales_order?.party?.name,
      target: expected_output * work_days,
      output: ckckck[0]?.total_output
    };
  }

  function _ljskfwe9(data) {
    const { id, sales_order, order_item, output } = data;
    return {
      id,
      po_number: sales_order?.po_number,
      product_name: order_item?.product_feature?.product?.goods?.name,
      size: order_item?.product_feature?.size,
      color: order_item?.product_feature?.color,
      output: output
    };
  }

  function _ewjrbjwe19(data) {
    const { sewing, bom } = data;
    if (isArray(sewing)) {
      let output = sewing.map(function (item) {
        return parseInt(item.total_output);
      });

      let date = sewing.map(function (item) {
        return item.date;
      });

      let data_of_target = sewing.map(function () {
        return bom.get_target_output.work_center.prod_capacity;
      });

      setDate(date);
      let a = { ...graphData[0], data: output };
      let b = { ...graphData[1], data: data_of_target };
      setGraphData([a, b]);

      return;
    }
  }

  useEffect(() => {
    try {
      const { sales_order_id, ...item } = selectedGraph;

      if (item.id === 0 || sales_order_id === 0) return;
      const params = `?monthYear=${filterMonthYear}&facility=${lineSelected.id}&sales_order_id=${sales_order_id}`;

      API.getPerRecordOrderGraph(item.id, params, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('Error bos');
        else {
          if (!isArray(res.data)) throw new _ewjrbjwe19(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [selectedGraph]);

  useEffect(() => {
    try {
      if (isNull(lineSelected)) throw new Error('State is empty');
      const params = `?monthYear=${filterMonthYear}&facility=${lineSelected.id}`;
      API.getPerOrder(params, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('error 1 get data');
        else {
          const _data = res.data[0]?.test_sum_based_on_mpi.map(function (res) {
            return _sljeir8(res);
          });
          setOrderData(_data);
        }
      });

      API.getWorkDetail(params, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('error 2 get data');
        if (isEmpty(res.data)) throw new Error('empty array');
        else {
          const _data = res.data.map(function (item) {
            return _ljskfwe9(item);
          });
          setWorkDetail(_data);
        }
      });
    } catch (error) {
      alert(error);
      // return;
    }
  }, [lineSelected]);

  useEffect(() => {
    try {
      API.getFacility('?type=line-sewing', function (res) {
        if (isUndefined(res)) return;
        setData(res.data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const chartOptions = {
    stroke: { width: [3, 3] },
    colors: ['#2FA4FF', '#DC3535'],
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid'] },
    labels: date,
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
  };

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={12}>
          <TextField
            autoComplete="monthYear"
            type="month"
            label="Month and Year"
            value={filterMonthYear}
            onChange={handleMonthYearChanges}
          />
        </Grid>

        {/* Title */}
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3">{lineSelected?.name}</Typography>
        </Grid>

        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5
            }}
          >
            {isEmpty(data)
              ? null
              : data.map((item) => (
                  <Button
                    variant="outlined"
                    name={item.id}
                    id={item.id}
                    disabled={item.id === lineSelected?.id}
                    onClick={(event, item) => handleClick(event, item)}
                    sx={{ margin: '0.25em' }}
                  >
                    {item.name}
                  </Button>
                ))}
          </Box>
        </Grid>

        {/* Graph */}
        <Grid item xs={12}>
          <ReactApexChart type="line" series={graphData} options={chartOptions} height={400} />
        </Grid>

        {/* Tab Panel */}
        <Grid item xs={12}>
          <TabContext value={valueTab}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Per Order" value="1" />
              <Tab label="Work Detail" value="2" />
              <Tab label="Log" value="3" />
            </TabList>

            <TabPanel value="1">
              Per Order detail with Table on it
              <TableOrder
                list={orderData}
                selected={selectedGraph}
                setSelected={setSelectedGraph}
              />
            </TabPanel>

            <TabPanel value="2">
              Work Detail
              <TableWorkDetail list={workDetail} />
            </TabPanel>

            <TabPanel value="3">
              Production Log, contains list of issue occured on this line between range of date
              <TableProblemLog list={[]} />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;