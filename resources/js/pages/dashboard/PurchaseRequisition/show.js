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
import Modal from './components/Modal';

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
    po_number: Yup.string().required('PO Reference is required'),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
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
    API.getAPurchaseRequisiton(id, function(res){
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
    { field: 'id', headerName: 'Inquiry Item ID', editable: false, visible: 'hide' },
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', editable: true },
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
    API.getAPurchaseRequisiton(id, function(res){
      
      if(!res) alert("Something went wrong!");
      setValues({
        ...values,
        id: res.data.id,
        po_number: res.data.po_number
      });
      var temp = res.data.inquiry_item;
      temp = res.data.request_item.map(function(_d){
        return {
          id: _d.id,
          product_id: _d.product_feature.product_id,
          product_feature_id: _d.product_feature.id,
          name: _d.product_feature.product.name,
          size: _d.product_feature.size,
          color: _d.product_feature.color,
          qty: _d.qty,
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
        open={openM}
        handleClose={handleCloseModal}
        items={items}
        setItems={setItems}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Inquiry Information"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    autoComplete="id"
                    type="text"
                    label="No Inquiry"
                    disabled
                    {...getFieldProps('id')}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                  />
                </Grid>
                <Grid item xs={8}>
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
          </Card>
        </Grid>
        <Grid item xs={12}>
          <DataGrid 
            columns={columns} 
            rows={items}
            onEditRowsModelChange={handleEditRowsModelChange}
            handleUpdateAllRows={handleUpdateAllRows}
            handleAddRow={handleOpenModal}
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