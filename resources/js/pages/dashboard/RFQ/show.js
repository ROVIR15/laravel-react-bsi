import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button } from '@mui/material'
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
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function RFQ() {
  const {id} = useParams();

  // Option Product Items
  const [options, setOptions] = useState([]);

  //AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  //Data Grid
  const [items, setItems] = useState([])

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const RFQSchema = Yup.object().shape({
    id: Yup.number().required('Inquiry References is required'),
    purchase_req_id: Yup.number().required('Inquiry References is required'),
    vendor_id: Yup.number().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
    valid_thru: Yup.date().required('Valid To is required'),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      purchase_req_id: '',
      vendor_id: '',
      issue_date: '',
      valid_thru: ''
    },
    validationSchema: QuotationSchema,
    onSubmit: (values) => {
      const _data = {
        ...values
      }
      API.updateQuote(id, _data, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

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
          'inquiry_item_id' : key.inquiry_item_id,
          'product_id' : key.product.product_id,
          'product_feature_id' : key.product_feature_id,
          'name' : key.product.name,
          'size' : key.product.size,
          'color' : key.product.color,
          'qty' : key.qty,
          'unit_price' : key.unit_price
        }
      })
      setValues({
        id: data.id,
        purchase_req_id: data.purchase_req_id,
        vendor_id: data.vendor_id,
        issue_date: data.issue_date,
        valid_thru: data.valid_to  
      })
      setItems(quoteItem);
    });
  }, [id]);

  useEffect(() => {
    let active = true;

    (async () => {

      API.getProductFeature((res) => {
        if(!res) return
        if(!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      })

    })();

    return () => {
      active = false;
    };
  }, [loading])

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
              title="RFQ Information"
            />
            <CardContent>
              <AutoComplete
                fullWidth
                autoComplete="purchase_req_id"
                type="text"
                label="Purchase Requisition ID"
                error={Boolean(touched.purchase_req_id && errors.purchase_req_id)}
                helperText={touched.purchase_req_id && errors.purchase_req_id}
                options={options}
                setOpen={setOpen}
                loading={loading}
                changeData={changeData}
              />
            </CardContent>
          </Card>
          <Card sx={{ m: 2}}>
            <CardHeader
              title="Information"
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="vendor_id"
                    type="text"
                    label="Supplier"
                    {...getFieldProps('vendor_id')}
                    disabled
                    error={Boolean(touched.vendor_id && errors.vendor_id)}
                    helperText={touched.vendor_id && errors.vendor_id}
                  />
                </Grid>
              </Grid>       
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

export default RFQ