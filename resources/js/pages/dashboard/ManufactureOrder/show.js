import React, { useMemo, useState } from 'react';
import Page from '../../../components/Page';
import { 
  Box,
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Grid,
  Tab,
  Typography, 
  Stack,
  Button
} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import { useNavigate, useLocation, useParams } from "react-router-dom";

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
import ConsumeIcon from '@iconify/icons-ic/baseline-takeout-dining'

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}));

function statusOfComponent(qty_keep, qty_to_be_consumed){
  if(qty_keep > qty_to_be_consumed) return "Invalid"
  if(qty_keep === qty_to_be_consumed) return "Ready"
  else return "Insufficient"
}

function calculate_stock_left(qty_available, current_keep, qty_to_be_consumed){

  const _currentless = (current_keep - qty_to_be_consumed)*-1
  const _available = qty_available - _currentless

  console.log(_currentless,
    _available,
    qty_to_be_consumed)

  let _keep, _less;

  if (qty_available <= 0) return { qty_keep: 0, qty_less: _currentless*-1, qty_consumed: 0, status: statusOfComponent(current_keep, qty_to_be_consumed)}

  if (_currentless === qty_to_be_consumed ) {
    _keep = parseInt(current_keep) + parseInt(qty_available);
    _less = _keep - qty_to_be_consumed
    console.log(`current_less: ${_currentless} \n new qty_keep: ${_keep} \n new qty_less: ${_less}`)
    return { qty_keep: _keep, qty_less: _less, qty_consumed: parseInt(qty_available), status: statusOfComponent(_keep, qty_to_be_consumed)}
  }

  if (_available > 0 && qty_available > _currentless) {
    _keep = parseInt(current_keep) + parseInt(_currentless);
    console.log(`current_less: ${_currentless} \n new qty_keep: ${_keep} \n new qty_less: ${0}`)
    return { qty_keep: _keep, qty_less: 0, qty_consumed: parseInt(_currentless), status: statusOfComponent(_keep, qty_to_be_consumed)}
  }

  if (_availabe > 0 && qty_available < _currentless) {
    _keep = parseInt(current_keep) + parseInt(_available);
    _less = parseInt(current_keep) - parseInt(qty_to_be_consumed);
    console.log(`current_less: ${_currentless} \n new qty_keep: ${_keep} \n new qty_less: ${_less}`)
    return { qty_keep: _keep, qty_consumed: parseInt(_currentless), qty_less: _less, status: statusOfComponent(_keep, qty_to_be_consumed)}
  }

  
}


function Labor() {

  const { id } = useParams();

  // HIstory
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Option State
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    qty: 0,
    company_name: '',
    operations: [],
    components: [],
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

    API.getAManufactureOrder(id, (res) => {
      if(!res.data) return
      else changeData(res.data);
    })  

  }, [id])

  const MOSchema = Yup.object().shape({
    bom_id: Yup.number().required('Name is required'),
  });

  const componentColumns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false },
    { field: 'size', headerName: 'Size', editable: true},
    { field: 'color', headerName: 'Color', editable: true },
    { field: 'brand', headerName: 'Brand', editable: false },
    { field: 'qty_to_be_consumed', headerName: 'Qty Consume', editable: true },
    { field: 'qty_keep', headerName: 'Qty Keep', editable: false },
    { field: 'qty_less', headerName: 'Qty Less', editable: false },
    { field: 'status', headerName: 'Status', editable: false },
    { field: 'actions', type: 'actions', width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={ConsumeIcon} width={24} height={24} />}
          onClick={() => handleCheckStock(params)}
          disabled={params.row.qty_less === 0}
          label="Consume"
        />,
      ]
    }
  ], [handleCheckStock]);

  // Consume

  function handleCheckStock(params){
    API.getAStock(params.id, function(res){
      if(!res) return undefined;
      if(!res.data) return undefined;
      else {
        const { qty_on_hand } = res.data;
        checkQuantity(params.id, qty_on_hand);
      }
    });
  }
  
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
  
  const handlePlay = React.useCallback(
    (id) => () => {
      let path = pathname + `/operation/${id}`
      navigate(path, { replace: true });
    }
  )
  
  const changeData = ({bom, operations, components }) => {

    const operation = operations.map(function({id, operation }){
      return {
        ...operation,
        id,
        work_hours: operation.work_center.work_hours,
        cost_per_hour: operation.work_center.cost_per_hour,
        labor_alloc: operation.work_center.labor_alloc,
        overhead_cost: operation.work_center.overhead_cost
      }
    })

    const component = components.map(function({ id, product_feature, qty_keep, qty_to_be_consumed }){
      const lessqty = qty_keep - qty_to_be_consumed
      return {
        ...product_feature,
        manufacture_component_id: id,
        qty_to_be_consumed,
        qty_keep,
        qty_less: lessqty,
        status: statusOfComponent(qty_keep, qty_to_be_consumed)
      }
    });

    let product_info = {
      name: '',
      size: '',
      color: ''
    };

    if (!bom.product_feature_id) {
      product_info = {...product_info, name: bom.bom_items[0].product_feature.name};
    } else {
      product_info = bom.product_info;
    }

    setSelectedValueSH({...bom, operations: operation, components: component, product_info }); 
    setFieldValue('bom_id', bom.id);
  }

  const checkQuantity = (id, qty_stock) => {
    const { components } = selectedValueSH;

    const temp_components = components.map(function(component){
      if(component.id === id ) {
        const _temp = calculate_stock_left(qty_stock, component.qty_keep, component.qty_to_be_consumed);
        return {...component, ..._temp}
      }
      else return component;
    });
    
    setSelectedValueSH({...selectedValueSH, components: temp_components});
  }

  const checkQuantityOfInventoryItem = (array) => {
    const { components } = selectedValueSH;

    var _temp = [];

    components.map(function(component){
      array.map(function(item){
        const result = calculate_stock_left(item.qty_on_hand, component.qty_keep, component.qty_to_be_consumed);
        if(component.id === item.product_feature_id) _temp.push({...component, ...result});
      });
    });

    setSelectedValueSH({...selectedValueSH, components: _temp})
  }

  const checkStock = () => {
    const { components } = selectedValueSH;

    const _data = components.map(function(component){
      const { id } = component;
      return { product_feature_id: id }
    });

    API.getStock(_data, (res) => {
      if(!res) return undefined;
      if(!res.data) return undefined;
      else {
        checkQuantityOfInventoryItem(res.data);
      }
    })
  }

  const lockInventoryStock = () => {
    const { components } = selectedValueSH;

    const _data = components.map(function(component){
      const { manufacture_component_id, qty_keep, qty_consumed, facility_id, id } = component;
      return { id: manufacture_component_id, qty_keep, qty_consumed, facility_id, product_feature_id: id};
    });

    API.insertManufactureComponent(_data, (res) => {
      if(!res) return undefined;
      if(!res.data) return undefined;
      else {
        console.log(res.data);
      }
    })
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
      <Stack sx={{marginBottom: '20px'}} direction="row" justifyContent="space-between">
        <div>
        <Button
          onClick={checkStock}
        >
          Check Stock
        </Button>
        <Button
          onClick={lockInventoryStock}
        >
          Lock Stock
        </Button>
        </div>
        <Button
          size='medium'
          variant='outlined'
        >
          Mark as Done
        </Button>
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Card >
            <CardHeader
              title="BOM"
              action={
                <Button
                  disabled
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
                      rows={selectedValueSH.components}
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