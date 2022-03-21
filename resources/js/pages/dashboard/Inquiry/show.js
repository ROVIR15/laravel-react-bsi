import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'
import { Link as RouterLink, useLocation, } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';

// Components
import DataGrid from '../../../components/DataGrid';

//API
import API from '../../../helpers'

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Inquiry() {
  const {id} = useParams();

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([])

  const InquirySchema = Yup.object().shape({
    inquiry_id: Yup.string().required('Inquiry References is required'),
    id: Yup.string().email('Email must be a valid email address').required('Email is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_tp: Yup.string().required('Address is required'),
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
      console.log(values);
      alert(JSON.stringify(values));
    }
  })

  const deleteData = useCallback(
    (id) => () => {
      API.deleteRequestItem(id, function(res){
        console.log(res)
      }).catch(function(error){
        alert('Fail');
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
          product_name: _d.product.name,
          product_size: _d.product.size,
          product_color: _d.product.color,
          qty: _d.qty,
          actions: _d.actions
        }
      })
      setItems(temp);
    })
  };

  const handleAddRow = () => {
    const _new = {
      request_id: id,
      product_feature_id: 1,
      qty: 1000,
      product_id: '0',
      product_name: '',
      product_size: '',
      product_color: ''
    }
    API.insertRequestItem(_new, function(res){
      const {success, data} = res;
      if(!success) alert('error');
      setItems((prevItems) => [...prevItems, _new]);
    }).catch(function(err){
      alert('error');
    });
  };

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Inquiry Item ID', editable: false, visible: 'hide' },
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'product_name', headerName: 'Name', editable: false},
    { field: 'product_size', headerName: 'Size', editable: false },
    { field: 'product_color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', editable: false },
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
          product_name: _d.product.name,
          product_size: _d.product.size,
          product_color: _d.product.color,
          qty: _d.qty,
          actions: _d.actions
        }
      })
      setItems(temp);
    });
  }, [id]);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Inquiry Information"
          />
          <CardContent>
            <TextField
              fullWidth
              autoComplete="id"
              type="text"
              label="No Inquiry"
              {...getFieldProps('id')}
              error={Boolean(touched.id && errors.id)}
              helperText={touched.id && errors.id}
            />
            <TextField
              fullWidth
              autoComplete="sold_to"
              type="text"
              label="Pembeli"
              {...getFieldProps('sold_to')}
              error={Boolean(touched.sold_to && errors.sold_to)}
              helperText={touched.sold_to && errors.sold_to}
            />
            <TextField
              fullWidth
              autoComplete="ship_to"
              type="text"
              label="Penerima"
              {...getFieldProps('ship_to')}
              error={Boolean(touched.ship_to && errors.ship_to)}
              helperText={touched.ship_to && errors.ship_to}
            />
            <TextField
              fullWidth
              autoComplete="po_number"
              type="text"
              label="No PO"
              {...getFieldProps('po_number')}
              error={Boolean(touched.po_number && errors.po_number)}
              helperText={touched.po_number && errors.po_number}
            />    
            <TextField
              fullWidth
              autoComplete="delivery_date"
              type="date"
              label="Estimasi Pengiriman"
              {...getFieldProps('delivery_date')}
              error={Boolean(touched.delivery_date && errors.delivery_date)}
              helperText={touched.delivery_date && errors.delivery_date}
            />            
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
              autoComplete="po_date"
              type="date"
              placeholder='valid'
              {...getFieldProps('po_date')}
              error={Boolean(touched.po_date && errors.po_date)}
              helperText={touched.po_date && errors.po_date}
            />
            <TextField
              fullWidth
              autoComplete="valid_to"
              type="date"
              placeholder='valid'
              {...getFieldProps('valid_to')}
              error={Boolean(touched.valid_to && errors.valid_to)}
              helperText={touched.valid_to && errors.valid_to}
            /> 
            </div>
            <DataGrid 
              columns={columns} 
              rows={items}
              onEditRowsModelChange={handleEditRowsModelChange}
              handleUpdateAllRows={handleUpdateAllRows}
              handleAddRow={handleAddRow}
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

export default Inquiry