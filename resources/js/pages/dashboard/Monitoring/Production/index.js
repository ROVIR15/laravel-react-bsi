import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Tab,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/styles';
import { isArray, isEmpty, isUndefined, isNull, isEqual } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Layout from '../../../../layouts/Layout';

// Components
import Modal from './components/ModalLog';
import TableOrder from './components/TableOrder';
import TableProblemLog from './components/TableProblemLog';
import TableWorkDetail from './components/TableWorkDetail';
import API from '../../../../helpers';
import { fPercent } from '../../../../utils/formatNumber';
import { countWorkingDays } from '../../ManufacturePlanning/utils';
import Scrollbar from '../../../../components/Scrollbar';

const CHART_DATA = [
  {
    name: 'Output',
    type: 'line',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  {
    name: 'Target',
    type: 'line',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
  const [log, setLog] = useState([]);
  const [target, setTarget] = useState(0);

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
    const {
      id,
      sales_order_img,
      line_start_date,
      line_end_date,
      anticipated_pcs_per_line_output,
      work_days,
      expected_output,
      ckckck
    } = data;

    let avg_output = 0;
    let imageUrl = '';
    if (!isEmpty(ckckck)) {
      avg_output =
        expected_output / countWorkingDays(ckckck[0]?.real_start_date, ckckck[0]?.real_end_date);
      imageUrl =
        sales_order_img?.order_info?.order_item_img?.product_feature?.product?.goods?.imageUrl;
    }

    return {
      id,
      imageUrl: imageUrl,
      sales_order_id: sales_order_img.id,
      po_number: sales_order_img.po_number,
      buyer_name: sales_order_img?.party?.name,
      target_in_total: expected_output,
      output: ckckck[0]?.total_output,
      avg_output: avg_output,
      target_output: anticipated_pcs_per_line_output,
      line_start_date,
      line_end_date,
      real_start_date: ckckck[0]?.real_start_date,
      real_end_date: ckckck[0]?.real_end_date
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
    const { sewing, bom, anticipated_pcs_per_line_output, line_start_date, line_end_date } = data;
    if (isArray(sewing)) {
      let output = sewing.map(function (item) {
        return parseInt(item.total_output);
      });

      let date = sewing.map(function (item) {
        return item.date;
      });

      let data_of_target = sewing.map(function () {
        return anticipated_pcs_per_line_output;
      });

      setDate(date);
      setTarget(anticipated_pcs_per_line_output);

      let a = { ...graphData[0], data: output };
      let b = { ...graphData[1], data: data_of_target };
      setGraphData([a, b]);

      return;
    }
  }

  const [DPData, setDPData] = useState([]);
  const [dailyProdSum, setDailyProdSum] = useState({
    total_qty: 0,
    total_current_sewing: 0,
    total_current_qc: 0,
    total_current_fg: 0,
    sum_of_total_sewing: 0,
    sum_of_total_qc: 0,
    sum_of_total_fg: 0,
    sum_of_balance_cutting: 0,
    sum_of_balance_sewing: 0,
    sum_of_balance_qc: 0,
    sum_of_balance_fg: 0
  });

  useEffect(() => {
    try {
      const { sales_order_id, ...item } = selectedGraph;

      if (item.id === 0 || sales_order_id === 0) return;
      const params = `?monthYear=${filterMonthYear}&facility=${lineSelected.id}&sales_order_id=${sales_order_id}`;

      API.getDailyProduction(sales_order_id, `?date=${dateDailyProduction}`, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('Error get data');
        else {
          setDPData(res.data);
          setDailyProdSum(res.total);
        }
      });

      API.getPerRecordOrderGraph(item.id, params, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('Error bos');
        else {
          _ewjrbjwe19(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [selectedGraph]);

  useEffect(() => {
    try {
      if (isNull(lineSelected)) return;
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

      API.getProductionLog(params, function (res) {
        if (isUndefined(res)) return;
        else {
          setLog(res.data);
        }
      });
    } catch (error) {
      alert(error);
      // return;
    }
  }, [lineSelected, filterMonthYear]);

  useEffect(() => {
    tapGetData();

    try {
      API.getFacility('?type=line-sewing', function (res) {
        if (isUndefined(res)) return;
        setData(res.data);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleUpdateProductionLog = () => {
    try {
      if (isNull(lineSelected)) return;
      const params = `?monthYear=${filterMonthYear}&facility=${lineSelected.id}`;

      API.getProductionLog(params, function (res) {
        if (isUndefined(res)) throw new Error('something goes wrong!');
        else {
          setLog(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

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

  /**
   * Modal
   */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  const average = graphData[0]?.data?.reduce(
    (initial, next) => initial + next / graphData[0]?.data?.length,
    0
  );
  const _p = (average / target).toFixed(3) * 100;
  const average_ystrdy = graphData[0]?.data
    ?.slice(0, graphData[0]?.data.length - 1)
    .reduce(
      (initial, next) =>
        initial + next / graphData[0]?.data?.slice(0, graphData[0]?.data.length - 1).length,
      0
    );
  const _p2 = ((average - average_ystrdy) / average_ystrdy) * 100;

  // Set Current Date
  let dateNow = moment(new Date()).format('YYYY-MM-DD');

  const [dateDailyProduction, setDateDailyProduction] = useState(dateNow);
  const [DPDataAllLines, setDPDataAllLines] = useState([]);
  const [totalData, setTotalData] = useState({
    average_work_hours: 0,
    total_output_sewing: 0,
    total_checked: 0,
    total_reject: 0
  });

  function handleDateChangeNew(e) {
    setDateDailyProduction(e.target.value);
  }

  function tapGetData() {
    try {
      const params = `?date=${dateDailyProduction}`;

      API.getDailyProduction2(params, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('Error get data');
        else {
          setDPDataAllLines(res.data);

          var lengthData = res.data.length;

          const total = res.data.reduce(
            (initial, next) => {
              return {
                average_work_hours: initial.average_work_hours + (parseFloat(next.avg_work_hours) / lengthData),
                total_output_sewing:
                  initial.total_output_sewing + parseInt(next.total_output_sewing),
                total_garment_checked: initial.total_good_garment + parseInt(next.total_checked) + parseInt(next.total_reject),
                total_good_garment: initial.total_good_garment + parseInt(next.total_checked),
                total_reject: initial.total_reject + parseInt(next.total_reject)
              };
            },
            {
              average_work_hours: 0,
              total_output_sewing: 0,
              total_garment_checked: 0,
              total_good_garment: 0,
              total_reject: 0
            }
          );

          setTotalData(total);
        }
      });
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    const { sales_order_id, ...item } = selectedGraph;

    if (!sales_order_id) {
      return;
    }

    try {
      API.getDailyProduction(sales_order_id, `?date=${dateDailyProduction}`, function (res) {
        if (isUndefined(res)) return;
        if (!res.success) throw new Error('Error get data');
        else {
          setDPData(res.data);
          setDailyProdSum(res.total);
        }
      });
    } catch (error) {
      alert('error');
    }
  }, [dateDailyProduction]);

  return (
    <Layout>
      <Modal open={isModalOpen} handleClose={handleClose} facility_id={lineSelected?.id} />
      <Card>
        <CardHeader title="Realtime Output - OSR PPIC Line" />
        <CardContent>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={10}>
              <TextField
                onChange={handleDateChangeNew}
                value={dateDailyProduction}
                fullWidth
                type="date"
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={tapGetData} size="large" variant="contained" fullWidth>
                Go
              </Button>
            </Grid>
            <Grid item xs={12}>
              <table>
                <thead>
                  <tr>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center wk_text_center">
                      No
                    </th>
                    <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                      Style / Nama Item
                    </th>
                    <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_left">
                      Jam Bekerja
                    </th>
                    <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_left">
                      Hasil Sewing (pcs)
                    </th>
                    <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                      Hasil End-Line QC (pcs)
                    </th>
                    <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                      Hasil Garment Reject (pcs)
                    </th>
                    <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                      Jumlah Garment Baik (pcs)
                    </th>
                    {/* <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                      Actual Report (pcs)
                    </th> */}
                  </tr>
                </thead>

                <tbody>
                  {isEmpty(DPDataAllLines) ? (
                    <tr>
                      <Typography>Tidak ada Data!</Typography>
                    </tr>
                  ) : (
                    DPDataAllLines.map(function (row, index) {
                      return (
                        <tr>
                          <td className="wk_width_1 wk_text_center">{index + 1}</td>
                          <td className="wk_width_1 wk_text_left">{row.label_name}</td>
                          <td className="wk_width_1 wk_text_center">{parseFloat(row.avg_work_hours).toFixed(1)}</td>
                          <td className="wk_width_1 wk_text_center">{row.total_output_sewing}</td>
                          <td className="wk_width_1 wk_text_center">
                            {parseInt(row.total_checked)}
                          </td>
                          <td className="wk_width_1 wk_text_center">{row.total_reject}</td>
                          <td className="wk_width_1 wk_text_center">{parseInt(row.total_checked) + parseInt(row.total_reject)}</td>
                        </tr>
                      );
                    })
                  )}
                  {/* <tr>
                    <td className="wk_width_1">{index + 1}</td>
                    <td className="wk_width_3">{row.item_name}</td>
                  </tr>
                  */}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center" colSpan={2}>Total</th>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">{totalData.average_work_hours}</th>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">{totalData.total_output_sewing}</th>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">{totalData.total_garment_checked}</th>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">{totalData.total_good_garment}</th>
                    <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">{totalData.total_reject}</th>
                  </tr>
                </tfoot>
              </table>
            </Grid>
          </Grid>
        </CardContent>

        <CardHeader title="Realtime Output - OSR PPIC Line" />
        <CardContent>
          <Grid container direction="row" spacing={2}>
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

            <Grid item xs={12}>
              <Typography variant="body2">{`Rata-rata            = ${average}`}</Typography>
              <Typography variant="body2">{`Rata-rate (%) = ${fPercent(_p)}`}</Typography>
              <Typography variant="body2">{`Kenaikan dari hari sebelumnya = ${
                average - average_ystrdy
              }`}</Typography>
              <Typography variant="body2">{`Kenaikan (%) = ${fPercent(_p2)}`}</Typography>
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
                  <TableOrder
                    list={orderData}
                    selected={selectedGraph}
                    setSelected={setSelectedGraph}
                  />
                </TabPanel>

                <TabPanel value="2">
                  <TableWorkDetail list={workDetail} />
                </TabPanel>

                <TabPanel value="3">
                  <Stack direction="column" spacing={2}>
                    <div>
                      <Button onClick={handleUpdateProductionLog} size="small">
                        Update
                      </Button>
                      <Button onClick={handleOpen} size="small">
                        Add Data
                      </Button>
                    </div>

                    <TableProblemLog list={log} />
                  </Stack>
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <Scrollbar>
            <Grid container>
              <Grid item xs={12}>
                <table>
                  <thead>
                    <tr>
                      {/* Cutting */}
                      <th
                        className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                        colSpan={4}
                      >
                        {`Tanggal ${moment(dateDailyProduction).format('LL')}`}
                      </th>
                      <th
                        className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                        colSpan={3}
                      >
                        Cutting
                      </th>
                      {/* Sewing */}
                      <th
                        className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                        colSpan={3}
                      >
                        Sewing
                      </th>
                      {/* QC */}
                      <th
                        className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                        colSpan={3}
                      >
                        QC
                      </th>
                      {/* Finished Goods */}
                      <th
                        className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center"
                        colSpan={5}
                      >
                        Finished Goods
                      </th>
                    </tr>
                    <tr>
                      <th className="wk_semi_bold wk_primary_color wk_gray_bg wk_text_center wk_text_center">
                        No
                      </th>
                      <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Style / Nama Item
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Qty Order
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        UoM
                      </th>
                      {/* Cutting Tab */}
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Output Hari Ini
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Total Output
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Balance
                      </th>
                      {/* Sewing Tab */}
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Output Hari Ini
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Total Output
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Balance
                      </th>
                      {/* QC Tab */}
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Output Hari Ini
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Total Output
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Balance
                      </th>
                      {/* Finished Goods Tab */}
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Output Hari Ini
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Total Output
                      </th>
                      <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg wk_text_center">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isEmpty(DPData) ? (
                      <tr>
                        <Typography>Tidak ada Data!</Typography>
                      </tr>
                    ) : (
                      DPData.map(function (row, index) {
                        return (
                          <tr>
                            <td className="wk_width_1">{index + 1}</td>
                            <td className="wk_width_3">{row.item_name}</td>
                            <td className="wk_width_1 wk_text_center">{row.qty}</td>
                            <td className="wk_width_1 wk_text_center">PCS</td>
                            <td className="wk_width_1 wk_text_center">{row.current_cutting}</td>
                            <td className="wk_width_1 wk_text_center">{row.total_cutting}</td>
                            <td className="wk_width_1 wk_text_center">{row.balance_cutting}</td>
                            <td className="wk_width_1 wk_text_center">{row.current_sewing}</td>
                            <td className="wk_width_1 wk_text_center">{row.total_sewing}</td>
                            <td className="wk_width_1 wk_text_center">{row.balance_sewing}</td>
                            <td className="wk_width_1 wk_text_center">{row.current_qc}</td>
                            <td className="wk_width_1 wk_text_center">{row.total_qc}</td>
                            <td className="wk_width_1 wk_text_center">{row.balance_qc}</td>
                            <td className="wk_width_1 wk_text_center">{row.current_fg}</td>
                            <td className="wk_width_1 wk_text_center">{row.total_fg}</td>
                            <td className="wk_width_1 wk_text_center">{row.balance_fg}</td>
                          </tr>
                        );
                      })
                    )}
                    <tr>
                      <td className="wk_width_1 wk_text_center" colSpan={2}>
                        Total
                      </td>
                      <td className="wk_width_1 wk_text_center">{dailyProdSum.total_qty}</td>
                      <td className="wk_width_1 wk_text_center"></td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.total_current_cutting}
                      </td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.sum_of_total_cutting}
                      </td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.sum_of_balance_cutting}
                      </td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.total_current_sewing}
                      </td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.sum_of_total_sewing}
                      </td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.sum_of_balance_sewing}
                      </td>
                      <td className="wk_width_1 wk_text_center">{dailyProdSum.total_current_qc}</td>
                      <td className="wk_width_1 wk_text_center">{dailyProdSum.sum_of_total_qc}</td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.sum_of_balance_qc}
                      </td>
                      <td className="wk_width_1 wk_text_center">{dailyProdSum.total_current_fg}</td>
                      <td className="wk_width_1 wk_text_center">{dailyProdSum.sum_of_total_fg}</td>
                      <td className="wk_width_1 wk_text_center">
                        {dailyProdSum.sum_of_balance_fg}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Scrollbar>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Dashboard;
