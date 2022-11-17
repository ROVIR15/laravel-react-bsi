import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../../components/Page';
import { 
  Box,
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Grid, 
  Tab,
  TextField, 
  Typography, 
  Button, 
  FormControl,
  InputLabel,
  Stack,
  Select,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles';
import {TabContext, TabList, TabPanel} from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../../helpers';
import { _partyAddress } from '../../../../helpers/data'

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import useAuth from '../../../../context';

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

const SpaceBetweenBox = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  justifyContent: "space-between", 
  marginBottom: "8px"
}))

function OutboundDelivery() {
  const {user} = useAuth();

  // Option Inquiry
  const [options, setOptions] = useState([]);
  
  //AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([])
  const [selectedValueSO, setSelectedValueSO] = React.useState({});

  const [options2, setOptions2] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && options2.length === 0;


  //Data Grid
  const [items, setItems] = useState([]);
  const handleAddItems = (values) => {
    setItems(values);
  }

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };


  useEffect(() => {
    let active = true;

    (async () => {

      API.getPurchaseOrder('', (res) => {
        if(!res) return
      if(!res.data) {
        setOptions([]);
      } else {
        ;
        setOptions(res.data);
      }
    })

    })();
    
    return () => {
      active = false;
    };
  }, [loading]);

  const OutboundDeliverySchema = Yup.object().shape({
    order_id: Yup.number().required('Purchase Order is required'),
    delivery_date: Yup.date().required('Delivery Date is required'),
    est_delivery_date: Yup.date().required('Estimated Delivery Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      order_id: '',
      serial_number: '',
      delivery_date: moment(new Date()).format("YYYY-MM-DD"),
      est_delivery_date: moment(new Date()).format("YYYY-MM-DD"),
      comment: 'nothing'
    },
    validationSchema: OutboundDeliverySchema,
    onSubmit: (values) => {
      const _data = {
        ...values, shipment_type_id: 1, user_id: user.id, OD_items: items
      }
      API.insertShipment(_data, (res)=>{
        if(!res) return undefined;
        if(!res.success) alert('failed');
        else alert('success');
      })
      setSubmitting(false);
      handleReset();
      setSelectedValueSO({});
      setItems([])
    }
  })

  const { 
    errors, 
    touched, 
    values, 
    isSubmitting, 
    setSubmitting, 
    handleSubmit, 
    setValues, 
    setFieldValue,
    handleReset, 
    getFieldProps 
  } = formik;


  function changeData(data){
    setValues({
      order_id: data.order_id,
      delivery_date: values.delivery_date
    })

    let _bought_from = _partyAddress(data.bought_from)
    setSelectedValueSO(_bought_from)
  }

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Item ID', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', width: 350, editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'satuan', headerName: 'Satuan', editable: false },
    { field: 'qty_order', headerName: 'Qty Order', editable: false },
    { field: 'deliv_qty', headerName: 'Delivery Qty', editable: true },
    { field: 'actions', type: 'actions', width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={trash2Outline} width={24} height={24} />}
          label="Delete"
          onClick={deleteData(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteData]);

  const deleteData = useCallback(
    (id) => () => {
      const rowToDeleteIndex = id;
      let a = [
        ...items.slice(0, rowToDeleteIndex),
        ...items.slice(rowToDeleteIndex + 1),
      ];

      a = a.map(function(x, index){
        return {...x, id: index}
      });

      setItems(a);
    })

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setItems((prevItems) => {
          const itemToUpdateIndex = parseInt(editedIds[0]);
    
          return prevItems.map((row, index) => {
            if(row.id === parseInt(itemToUpdateIndex)){
              return {...row, [editedColumnName]: editRowData[editedColumnName].value}
            } else {
              return row
            }
          });
        });

        // update on field value
      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleResetRows = () => {
    setItems([]);
  }

  /**
   * Completion Status
   */

  const [status, setStatus] = React.useState(0);

  const handleSubmitCompletionStatus = () => {
    if(!status) { alert('Stop'); return undefined}
    try {
      API.insertOrderCompletionStatus({
        user_id: user.id,
        order_id: values.order_id,
        completion_status_id: status}, function(res){
        if(!res.success) alert('Failed');
        alert('done')
      })
    } catch (error) {
        alert(error)
    }
  }
 
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  }  

  return (
    <Page>
      <Container>
      <Modal 
        open={openM}
        onAddItems={handleAddItems}
        order_id={values.order_id}
        handleClose={handleCloseModal}
        selected={items}
        setSelected={setItems}
      />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1} direction="row">
            <Grid item xs={4}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardHeader
                  title="Delivery Date"
                />
                <CardContent>
                  <TextField
                    fullWidth
                    autoComplete="delivery_date"
                    type="date"
                    label="Delivery Date"
                    {...getFieldProps('delivery_date')}
                    error={Boolean(touched.delivery_date && errors.delivery_date)}
                    helperText={touched.delivery_date && errors.delivery_date}
                  />
                  <TextField
                    fullWidth
                    autoComplete="est_delivery_date"
                    type="date"
                    label="Estimated Delivery Date"
                    {...getFieldProps('est_delivery_date')}
                    error={Boolean(touched.est_delivery_date && errors.est_delivery_date)}
                    helperText={touched.est_delivery_date && errors.est_delivery_date}
                  />
                </CardContent>
              </Card>              
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardHeader
                  title="Delivery Information"
                />
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={6} sx={{padding: 'unset'}}>
                      <AutoComplete
                        fullWidth
                        autoComplete="sales_order_id"
                        type="text"
                        label="Purchase Order ID"
                        error={Boolean(touched.sales_order_id && errors.sales_order_id)}
                        helperText={touched.sales_order_id && errors.sales_order_id}
                        options={options}
                        setOpen={setOpen}
                        loading={loading}
                        changeData={changeData}
                      />
                    </Grid>

                    <Grid item xs={6} sx={{padding: 'unset'}}>
                      <TextField
                        variant='outlined'
                        type='text'
                        fullWidth
                        autoComplete="serial_number"
                        placeholder='Delivery Serial Number'
                        {...getFieldProps('serial_number')}
                        error={Boolean(touched.serial_number && errors.serial_number)}
                        helperText={touched.serial_number && errors.serial_number}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ColumnBox>
                        <SpaceBetweenBox>
                          <Typography variant="h6"> Buyer </Typography>
                          <Button
                            disabled
                          >
                            Select
                          </Button>
                        </SpaceBetweenBox>
                        { selectedValueSO.name ? (
                          <div>
                            <Typography variant="subtitle1">{selectedValueSO.name}</Typography>
                            <Typography component="span" variant="caption">{selectedValueSO.street}</Typography>
                            <Typography variant="body2">{`${selectedValueSO.city}, ${selectedValueSO.province}, ${selectedValueSO.country}`}</Typography>
                          </div>
                        ) : null}
                      </ColumnBox>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardContent>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={valueTab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      <Tab label="Item Overview" value="1" />
                      <Tab label="Status" value="2" />
                      <Tab label="Comments" value="3" />
                    </TabList>
                  </Box>
                  {/* Item Overview */}
                  <TabPanel value="1" sx={{padding: '10px 0'}}>
                    <DataGrid 
                      columns={columns} 
                      rows={items}
                      onEditRowsModelChange={handleEditRowsModelChange}
                      handleAddRow={handleOpenModal}
                      handleReset={handleResetRows}
                      handleUpdateAllRows={false}
                    />
                  </TabPanel>
                  {/* Status of Shipment */}
                  <TabPanel value="2" >
                    <Stack direction="row" spacing={4} alignItems="center">
                      <FormControl fullWidth>
                        <InputLabel >Selet Status</InputLabel>
                        <Select
                          value={status}
                          label="Status"
                          onChange={handleChangeStatus}
                        >
                          <MenuItem value={5}>Scheduled</MenuItem>
                          <MenuItem value={1}>Shipped</MenuItem>
                          <MenuItem value={2}>On Going</MenuItem>
                          <MenuItem value={3}>Cancelled</MenuItem>
                          <MenuItem value={4}>Delivered</MenuItem>
                        </Select>
                      </FormControl>  

                      <Button onClick={handleSubmitCompletionStatus}> Update </Button>     
                    </Stack>           
                  </TabPanel>
                  {/* Comments */}
                  <TabPanel value="3">
                    <TextField 
                      variant='outlined'
                      type='text'
                      multiline
                      rows={3}
                      fullWidth
                      autoComplete="comment"
                      {...getFieldProps('comment')}
                      error={Boolean(touched.comment && errors.comment)}
                      helperText={touched.comment && errors.comment}
                    >

                    </TextField>
                  </TabPanel>
                </TabContext>
              </Box>
            </CardContent>
          </Card>
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
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
}

export default OutboundDelivery;