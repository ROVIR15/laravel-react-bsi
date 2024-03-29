import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Divider,
  Grid, 
  TextField, 
  Typography, 
  Paper, 
  Stack, 
  Button 
} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from '../../../components/DataGrid';
import AutoComplete from './components/AutoComplete';
import Modal from './components/Modal2';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

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

function SalesOrder() {
  const {id} = useParams();

  //Dialog Interaction
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  // Option for Quote
  const [options, setOptions] = useState([]);

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([])

  //AutoComplete
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  //Data Grid
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Sales Order Items storage variable on Data Grid
  const [items, setItems] = useState([])

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const SalesOrderSchema = Yup.object().shape({
    order_id: Yup.string().required('Order ID is required'),
    quote_id: Yup.string().required('Quote ID is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_to: Yup.string().required('Address is required'),
    po_number: Yup.string().required('city is required'),
    issue_date: Yup.date().required('province is required'),
    valid_thru: Yup.date().required('city is required'),
    delivery_date: Yup.date().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      order_id: '',
      sold_to: '',
      ship_to: '',
      po_number: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: ''
    },
    validationSchema: SalesOrderSchema,
    onSubmit: (values) => {
      API.updateSalesOrder(id, values, function(res){
        alert('success');
      });
      setSubmitting(false);
    }
  })

  useEffect(async () => {
    if(!id) return;
    const load = await axios.get('http://localhost:8000/api' + '/sales-order' + `/${id}`)
    .then(function({data: {data}}) {
      return(data);
    }).catch((error) => {
        console.log(error);
    })

    setValues({
      id: load.id,
      order_id: load.order_id,
      po_number: load.po_number,
      ship_to: load.ship_to,
      sold_to: load.sold_to,
      issue_date: load.issue_date,
      valid_thru: load.valid_thru,
      delivery_date: load.delivery_date,
    })
    
    setSelectedValueSO(load.party)
    setSelectedValueSH(load.ship)

    const load2 = await axios.get('http://localhost:8000/api' + '/order-item' + `/${load.order_id}`)
    .then(function({data: {data}}) {
      return(data);
    }).catch((error) => {
        console.log(error);
    })

    var c = load2.map((key)=>{
      const { product_feature } = key
      return {...product_feature, product_feature_id: product_feature.id, id: key.id, shipment_estimated: new Date(key.shipment_estimated), ...key}
    })
    setItems(c);

  }, [id]);

  useEffect(() => {
    let active = true;

    (async () => {

      API.getProductFeature((res) => {
        if(!res) return
        if(!res.data) {
          setOptionsP([]);
        } else {
          setOptionsP(res.data);
        }
      })

    })();

    return () => {
      active = false;
    };
  }, [loading])

  const { errors, touched, values, isSubmitting, handleSubmit, setValues, getFieldProps } = formik;

  const deleteData = useCallback(
    (id) => () => {
      setItems((prevItems) => {
        const rowToDeleteIndex = id;
        return [
          ...items.slice(0, rowToDeleteIndex),
          ...items.slice(rowToDeleteIndex + 1),
        ];
      });

      API.deleteSalesOrderItem(id, (res)=> {
        alert('success')
      });

      handleUpdateAllRows();
  })

  useEffect(() => {
    var orderItem;
  }, [items])
  

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();

        function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
      }

        switch (editedColumnName) {
          case 'shipment_estimated':
            let date = formatDate(editRowData[editedColumnName].value);
            data[editedColumnName] = date;
            break;
        
          default:
            data[editedColumnName] = editRowData[editedColumnName].value;
            break;
        }
        // update on firebase
        API.updateSalesOrderItem(editedIds, data, function(res){
          alert(JSON.stringify(res));
        });
      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = async() => {
    const load2 = await axios.get('http://localhost:8000/api' + '/order-item' + `/${values.order_id}`)
    .then(function({data: {data}}) {
      return(data);
    })

    var c = load2.map((key)=>{
      const { product_feature } = key
      return {...product_feature, product_feature_id: product_feature.id, id: key.id, shipment_estimated: new Date(key.shipment_estimated), ...key}
    })
    setItems(c);
  };

  const columns = useMemo(() => [
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', editable: true },
    { field: 'unit_price', headerName: 'Unit Price', editable: true },
    { field: 'shipment_estimated', headerName: 'Est. Estimated', type: 'date', editable: true },
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

  return (
    <Page>
      <Container>
      <Modal 
        payload={items}
        order_id={values.order_id}
        open={openM}
        options={optionsP}
        handleClose={handleCloseModal}
        updateOrderItem={handleUpdateAllRows}
      />        
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Sales Order Information"
            />
            <CardContent sx={{paddingBottom: '6px'}}>
              <Stack direction="row" spacing={1}>
                <TextField
                  fullWidth
                  autoComplete="id"
                  type="number"
                  label="Sales Order ID"
                  {...getFieldProps('id')}
                  error={Boolean(touched.id && errors.id)}
                  helperText={touched.id && errors.id}
                  disabled={true}
                />
                <TextField
                  fullWidth
                  autoComplete="po_number"
                  type="text"
                  label="Referenced Quote"
                  {...getFieldProps('po_number')}
                  error={Boolean(touched.po_number && errors.po_number)}
                  helperText={touched.po_number && errors.po_number}
                  disabled={true}
                />
              </Stack>
            </CardContent>
            <CardContent sx={{paddingTop: '6px'}}>
              <Paper>
                <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                  <ColumnBox>
                    <SpaceBetweenBox>
                      <Typography variant="h6"> Pembeli </Typography>
                      <Button
                        disabled
                      >
                        Select
                      </Button>
                    </SpaceBetweenBox>
                    <div>
                      <Typography variant="body1">
                        {selectedValueSO.name}
                      </Typography>
                    </div>
                  </ColumnBox>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <ColumnBox>
                    <SpaceBetweenBox>
                      <Typography variant="h6"> Penerima </Typography>
                      <Button
                        disabled
                      >
                        Select
                      </Button>
                    </SpaceBetweenBox>
                    <div>
                      <Typography variant="body1">
                        {selectedValueSH.name}
                      </Typography>
                    </div>
                  </ColumnBox>

                </Stack>
              </Paper>
            </CardContent>
          </Card>

          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Item Overview"
            />
            <CardContent>
              <div style={{display: 'flex'}}>
              <TextField
                fullWidth
                autoComplete="issue_date"
                type="date"
                placeholder='valid'
                label="Diterbitkan"
                {...getFieldProps('issue_date')}
                error={Boolean(touched.issue_date && errors.issue_date)}
                helperText={touched.issue_date && errors.issue_date}
              />
              <TextField
                fullWidth
                autoComplete="valid_thru"
                type="date"
                label="Valid to"
                placeholder='valid'
                {...getFieldProps('valid_thru')}
                error={Boolean(touched.valid_thru && errors.valid_thru)}
                helperText={touched.valid_thru && errors.valid_thru}
              />
              <TextField
                fullWidth
                autoComplete="delivery_date"
                type="date"
                label='Tanggal Pengiriman'
                {...getFieldProps('delivery_date')}
                error={Boolean(touched.delivery_date && errors.delivery_date)}
                helperText={touched.delivery_date && errors.delivery_date}
              />
              </div>
            <DataGrid 
              columns={columns} 
              rows={items}
              onEditRowsModelChange={handleEditRowsModelChange}
              handleUpdateAllRows={handleUpdateAllRows}
              handleAddRow={handleOpenModal}
            />
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
              type="submit"
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

export default SalesOrder;