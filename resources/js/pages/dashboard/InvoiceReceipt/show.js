import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button } from '@mui/material'
import { Link as RouterLink, useLocation, } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';

// Components
import DataGrid from '../../../components/DataGrid';
import Modal from './components/Modal2';

//API
import API from '../../../helpers'

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Inquiry() {
  const {id} = useParams();

  //AutoComplete props
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([])

  const InquirySchema = Yup.object().shape({
    id: Yup.string().required('Email is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_to: Yup.string().required('Address is required'),
    po_number: Yup.string().required('city is required'),
    po_date: Yup.string().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      sold_to: '',
      ship_to: '',
      po_number: '',
      po_date: '',
      delivery_date: '',
      valid_to: ''
    },
    validationSchema: InquirySchema,
    onSubmit: (values) => {
      API.updateProductFeature(id, values, function(res){
        alert('success');
      });
      setSubmitting(false);
    }
  })

  const deleteData = useCallback(
    (id) => () => {
      API.deleteRequestItem(id, function(res){
        console.log(res)
      });
    }, []
  )

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;
        // update on firebase
        API.updateRequestItem(editedIds, data, function(res){
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
    API.getAInquiry(id, function(res){
      if(!res) alert("Something went wrong!");
      var temp = res.data.inquiry_item;
      temp = res.data.inquiry_item.map(function(_d){
        return {
          id: _d.id,
          product_id: _d.product.id,
          product_feature_id: _d.product_feature_id,
          name: _d.product.name,
          size: _d.product.size,
          color: _d.product.color,
          qty: _d.qty,
        }
      })
      setItems(temp);
    })
  };

  // Preapre data from product features
  React.useEffect(() => {
    let active = true;

      API.getProductFeature((res) => {
        if(!res) return
		    if(!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      })

    return () => {
      active = false;
    };
  }, [loading])

  const addRow = (newItems) => {
    const _items = newItems.map(function(item){
      return { id: Math.floor(Math.random() * 23810), product_feature_id: item.id, qty: 0, request_id: id}
    });
    API.insertRequestItem(_items, function(res){
      const {success, data} = res;
      if(!success) alert('error');
    })
    handleUpdateAllRows();
  };
  
  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false },
    { field: 'size', headerName: 'Size', editable: true},
    { field: 'color', headerName: 'Color', editable: true },
    { field: 'amount', headerName: 'Amount', editable: false },
    { field: 'qty', headerName: 'Quantity', editable: true },
    { field: 'purchase_order_id', headerName: 'PO Number', editable: true },
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
    API.getAInquiry(id, function(res){
      console.log(res)
      if(!res) alert("Something went wrong!");
      setValues({
        ...values,
        id: res.data.id,
        sold_to: res.data.sold_to,
        ship_to: res.data.ship_to,
        po_number: res.data.po_number,
        po_date : res.data.po_date,
        delivery_date: res.data.delivery_date,
        valid_to: res.data.valid_to,
      });
      var temp = res.data.inquiry_item;
      temp = res.data.inquiry_item.map(function(_d){
        return {
          id: _d.id,
          product_id: _d.product.id,
          product_feature_id: _d.product_feature_id,
          name: _d.product.name,
          size: _d.product.size,
          color: _d.product.color,
          qty: _d.qty,
          amount: _d.amount,
          purchase_order_id: _d.qty,
        }
      })
      setItems(temp);
    });
  }, [id]);

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  return (
    <Page>
      <Container>
      <Modal 
        payload={[]}
        open={openM}
        options={options}
        handleClose={handleCloseModal}
        setComponent={setItems}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Invoice Receipt Information"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    autoComplete="no_invoices"
                    type="text"
                    label="No Invoices"
                    {...getFieldProps('no_invoices')}
                    error={Boolean(touched.no_invoices && errors.no_invoices)}
                    helperText={touched.no_invoices && errors.no_invoices}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    autoComplete="amount"
                    type="text"
                    label="Amount"
                    {...getFieldProps('amount')}
                    error={Boolean(touched.amount && errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />    
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    autoComplete="tax_amount"
                    type="text"
                    label="Amount"
                    {...getFieldProps('tax_amount')}
                    error={Boolean(touched.tax_amount && errors.tax_amount)}
                    helperText={touched.tax_amount && errors.tax_amount}
                  />    
                </Grid>
              </Grid>       
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Item Overview"
            />
            <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoComplete="invoice_date"
                  type="date"
                  placeholder='invoice_date'
                  label="Invoice Date"
                  {...getFieldProps('invoice_date')}
                  error={Boolean(touched.invoice_date && errors.invoice_date)}
                  helperText={touched.invoice_date && errors.invoice_date}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoComplete="posting_date"
                  type="date"
                  label="Posting Date"
                  {...getFieldProps('posting_date')}
                  error={Boolean(touched.posting_date && errors.posting_date)}
                  helperText={touched.posting_date && errors.posting_date}
                />
              </Grid>
            </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <DataGrid 
            columns={columns}
            rows={items}
            handleAddRow={handleOpenModal}
            onEditRowsModelChange={handleEditRowsModelChange}
            handleResetRows={handleResetRows}
          />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'end', marginTop: '1.5em' }}>
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

export default Inquiry