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

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal2';
import DialogBox from './components/DialogBox';

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

function Quotation() {
  const {id} = useParams();
  // Option Inquiry
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSO || openSH || openM) && options.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  //Data Grid
  const [items, setItems] = useState([])

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const QuotationSchema = Yup.object().shape({
    po_number: Yup.string().required('Inquiry References is required'),
    ship_to: Yup.number().required('Inquiry References is required'),
    sold_to: Yup.number().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
    valid_thru: Yup.date().required('Valid To is required'),
    delivery_date: Yup.date().required('Delivery Date is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
      ship_to: '',
      sold_to: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
    },
    validationSchema: QuotationSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        party_id: values.sold_to
      }
      API.updateQuote(id, _data, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getBuyers((res) => {
          if(!res) return
          else setOptions(res);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loading])

  // Dialog Box
  const handleClose = (name, value) => {
    if(name === 'sold_to') {
      setOpenSO(false)
      setSelectedValueSO(value);
    }
    if(name === 'ship_to') {
      setOpenSH(false)
      setSelectedValueSH(value);
    }
    setFieldValue(name, value.id);
    setOptions([]);
  };

  const deleteData = useCallback(
    (id) => () => {
      API.deleteQuoteItem(id, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })

      handleUpdateAllRows();
    }
  );

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;

        API.updateQuoteItem(editedIds, data, function(res){
          alert(JSON.stringify(res));
        })
      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = () => {
    API.getAQuote(id, function(res){
      if(!res) alert("Something went wrong!");
      var temp = res.data.quote_items;
      temp = res.data.quote_items.map(function(_d){
        return {
          id: _d.id,
          product_id: _d.product.product_id,
          product_feature_id: _d.product_feature_id,
          name: _d.product.name,
          size: _d.product.size,
          color: _d.product.color,
          qty: _d.qty,
          unit_price: _d.unit_price
        }
      })
      setItems(temp);
    })
  };

  const columns = useMemo(() => [
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', editable: true },
    { field: 'unit_price', headerName: 'Unit Price', editable: true },
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

  useEffect(() => {
    if(!id) return;
    API.getAQuote(id, function(res){
      if(!res.data) alert("Something went wrong!");

      const quoteItem = res.data.quote_items.map(function(key, index){
        return {
          'id': key.id,
          'product_id' : key.product.product_id,
          'product_feature_id' : key.product_feature_id,
          'name' : key.product.name,
          'size' : key.product.size,
          'color' : key.product.color,
          'qty' : key.qty,
          'unit_price' : key.unit_price
        }
      });
      
      setValues({
        id: res.data.id,
        po_number: res.data.po_number,
        sold_to: res.data.sold_to,
        ship_to: res.data.ship_to,
        issue_date: res.data.issue_date,
        delivery_date: res.data.delivery_date,
        valid_thru: res.data.valid_thru,
      })

      setSelectedValueSO(res.data.party)
      setSelectedValueSH(res.data.ship)

      setItems(quoteItem);
    });
  }, [id]);

  return (
    <Page>
      <Container>
      <Modal 
        payload={items}
        quote_id={id}
        open={openM}
        options={options}
        handleClose={handleCloseModal}
        updateQuoteItem={handleUpdateAllRows}
      />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Quotation Information"
            />
            <CardContent>
            <Paper>
              <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Pembeli </Typography>
                    <Button
                      onClick={() => setOpenSO(true)}
                    >
                      Select
                    </Button>
                  </SpaceBetweenBox>
                  <div>
                    <Typography variant="body1">
                      {selectedValueSO.name}
                    </Typography>
                  </div>
                  <DialogBox
                    options={options}
                    loading={loading}
                    error={Boolean(touched.sold_to && errors.sold_to)}
                    helperText={touched.sold_to && errors.sold_to}
                    selectedValue={selectedValueSO}
                    open={openSO}
                    onClose={(value) => handleClose('sold_to', value)}
                  />
                </ColumnBox>
                <Divider orientation="vertical" variant="middle" flexItem />
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Penerima </Typography>
                    <Button
                      onClick={() => setOpenSH(true)}
                    >
                      Select
                    </Button>
                  </SpaceBetweenBox>
                  <div>
                    <Typography variant="body1">
                      {selectedValueSH.name}
                    </Typography>
                  </div>
                  <DialogBox
                    options={options}
                    loading={loading}
                    error={Boolean(touched.ship_to && errors.ship_to)}
                    helperText={touched.ship_to && errors.ship_to}
                    selectedValue={selectedValueSH}
                    open={openSH}
                    onClose={(value) => handleClose('ship_to', value)}
                  />
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
              <Grid container spacing={3}>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    autoComplete="po_number"
                    type="text"
                    label="No PO"
                    {...getFieldProps('po_number')}
                    error={Boolean(touched.po_number && errors.po_number)}
                    helperText={touched.po_number && errors.po_number}
                  />    
                </Grid>
              </Grid>       
            </CardContent>
            <CardContent sx={{paddingTop: '0', paddingBottom: '0'}}>
              <div style={{display: 'flex'}}>
              <TextField
                fullWidth
                autoComplete="issue_date"
                type="date"
                placeholder='valid'
                label="PO Date"
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
            </CardContent>
            <CardContent>
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

export default Quotation