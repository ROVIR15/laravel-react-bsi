import React, { useMemo, useState } from 'react';
import Page from '../../../components/Page';
import { 
  Box,
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Divider,
  Grid,
  Tab,
  TextField, 
  Typography, 
  Button 
} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { LoadingButton } from '@mui/lab';

//api
import API from '../../../helpers';

//component
import DataGrid from './components/DGWork';
import DataGridC from './components/DGComponent';

import DialogBox from './components/DBBOMOpt';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import ArrowRightFill from '@iconify/icons-eva/arrow-right-fill';

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

function Labor() {

  // HIstory
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Option State
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSH) && options.length === 0;
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    qty: 0,
    company_name: '',
    operations: [],
    bom_items: [],
    start_date: '',
    end_date: '',
    product_info: {
      name: '',
      color: '',
      size: ''
    },
    type: {
      name: ''
    }
  });

    // Dialog Box
  const handleClose = (name, value) => {
    setOpenSH(false)
    changeData(value);
    setFieldValue(name, value.id);
    setOptions([]);
  };

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getBOM((res) => {
          if(!res) return
          else setOptions(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loading])

  const MOSchema = Yup.object().shape({
    bom_id: Yup.number().required('Name is required'),
  });

  const componentColumns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false },
    { field: 'size', headerName: 'Size', editable: false},
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'brand', headerName: 'Brand', editable: false },
    { field: 'qty_to_be_consumed', headerName: 'Quantity', editable: false },
  ], []);
  
  const operationColumns = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false, hideable: true, width: 30},
    { field: 'seq', headerName: 'seq', editable: true, width: 30},
    { field: 'work_center_id', headerName: 'Work Center ID', editable: false, width: 30 },
    { field: 'name', headerName: 'Operation Name', editable: false, width: 250 },
    { field: 'work_hours', headerName: 'Working Hours', editable: false, width: 100, align: 'left' },
    { field: 'cost_per_hour', headerName: 'Cost per Hours', editable: false, width: 100, align: 'left' },
    { field: 'labor_alloc', headerName: 'Labor Allocation', editable: false, width: 100, align: 'left' },
    { field: 'overhead_cost', headerName: 'CM Cost', editable: false, width: 100, align: 'left' },
    { field: 'actions', type: 'actions', width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={ArrowRightFill} width={24} height={24} />}
          label="Play"
          onClick={handlePlay(params.id)}
        />
      ]
    }
  ], [handlePlay]);
  
  const deleteDataComponent = React.useCallback(
    (id) => () => {
      setComponent((prevComponent) => {
        return prevComponent.filter((x) => (x.id !== id))
      });
  });

  const deleteDataOperation = React.useCallback(
    (id) => () => {
      setOperation((prevOperation) => {
        return prevOperation.filter((x) => (x.id !== id))
      });
  });

  const handlePlay = React.useCallback(
    (id) => () => {
      let path = pathname + `/operation/${id}`
      navigate(path, { replace: true });
    }
  )
  
  const changeData = (payload) => {

    if(!payload) return;
    const operations = payload.operations.map(function(item){
      return {
        ...item,
        work_hours: item.work_center_info.work_hours,
        cost_per_hour: item.work_center_info.cost_per_hour,
        labor_alloc: item.work_center_info.labor_alloc,
        overhead_cost: item.work_center_info.overhead_cost
      }
    })

    const component = payload.bom_items.map(function(item){
      return {
        ...item,
        name: item.product_feature.name,
        value: item.product_feature.value,
        color: item.product_feature.color,
        size: item.product_feature.size,
        brand: item.product_feature.brand
      }
    });

    let product_info = {
      name: '',
      size: '',
      color: ''
    };

    if (!payload.product_feature_id) {
      product_info = {...product_info, name: payload.bom_items[0].product_feature.name};
    } else {
      product_info = payload.product_info;
    }

    setSelectedValueSH({...payload, operations, bom_items: component, product_info }); 
  }

  const formik = useFormik({
    initialValues: {
      bom_id: ''
    },
    validationSchema: MOSchema,
    onSubmit: ({ bom_id }) => {
      const { qty, start_date, end_date, operations, bom_items } = selectedValueSH;
      
      let components = bom_items.map(function({product_feature_id, qty}){
        return {
          product_feature_id, qty_to_be_consumed: qty
        }
      });

      const data = {
        bom_id,
        qty,
        start_date,
        end_date,
        operations,
        components
      }

      alert(JSON.stringify(data));

      API.insertManufactureOrder(data, function(res){
        if(res.success) alert('Success');
        else alert('Failed');
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue } = formik;

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const date = moment(selectedValueSH.start_date);
  const date2 = moment(selectedValueSH.end_date);
  const duration = date2.diff(date, 'days');

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Card >
            <CardHeader
              title="BOM"
              action={
                <Button
                  onClick={() => setOpenSH(true)}
                >
                  Select
                </Button>                
              }
            />
            <CardContent>
              <Typography variant="body1">
                {selectedValueSH.name}
              </Typography>
              <Typography variant="body1">
                {selectedValueSH.qty === 0 ? '' : selectedValueSH.qty}
              </Typography>
              <Typography variant="body1">
                {selectedValueSH.company_name}
              </Typography>
            </CardContent>

            <DialogBox
              options={options}
              loading={loading}
              error={Boolean(touched.bom_id && errors.bom_id)}
              helperText={touched.bom_id && errors.bom_id}
              selectedValue={selectedValueSH}
              open={openSH}
              onClose={(value) => handleClose('bom_id', value)}
            />

          </Card>
          </Grid>
          <Grid item xs={8}>
          <Card >
            <CardHeader
              title="Manufacture Order Information"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <ColumnBox>
                    <Typography variant="h6">
                      {'Product Name'}
                    </Typography>
                    <Typography variant="body1">
                      {`${selectedValueSH.product_info.name} ${selectedValueSH.product_info.color} - ${selectedValueSH.product_info.size}`}
                    </Typography>
                  </ColumnBox>
                </Grid>
                <Grid item xs={6}>
                  <ColumnBox>
                    <Typography variant="h6">
                      {'Quantity to be Produce'}
                    </Typography>
                    <Typography variant="body1">
                      {`${selectedValueSH.qty}`}
                    </Typography>
                  </ColumnBox>
                </Grid>
                <Grid item xs={6}>
                  <ColumnBox>
                    <Typography variant="h6">
                      {'Scheduled Date'}
                    </Typography>
                    <Typography variant="body1">
                      {moment(selectedValueSH.start_date).format("DD MMMM YYYY")}
                    </Typography>
                  </ColumnBox>
                </Grid>
                <Grid item xs={6}>
                  <ColumnBox>
                    <Typography variant="h6">
                      {'Duration'}
                    </Typography>
                    <Typography variant="body1">
                      { duration ? `${duration} Days` : '0 Days'}
                    </Typography>
                  </ColumnBox>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={valueTab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      <Tab label="Work" value="1" />
                      <Tab label="Component" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <DataGrid
                      columns={operationColumns}
                      rows={selectedValueSH.operations}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <DataGridC
                      columns={componentColumns}
                      rows={selectedValueSH.bom_items}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12}>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'end' }}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ m: 1 }}
            >
              Save
            </LoadingButton>
            <Button
              size="large"
              color="grey"
              variant="contained"
              sx={{ m: 1 }}
            >
              Cancel
            </Button>
          </Card>
        </Grid>
      </Grid>
        </Form>
      </FormikProvider>
      </Container>
    </Page>
  )
}

export default Labor