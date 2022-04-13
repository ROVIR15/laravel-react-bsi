import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function SalesOrder() {

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
    rfq_id: Yup.string().required('Quote References is required'),
    vendor_id: Yup.string().required('city is required'),
    issue_date: Yup.date().required('province is required'),
    valid_thru: Yup.date().required('city is required')
  });

  const formik = useFormik({
    initialValues: {
      rfq_id: '',
      vendor_id: '',
      issue_date: '',
      valid_thru: ''
    },
    validationSchema: SalesOrderSchema,
    onSubmit: (values) => {
      const _data = {
        ...values, order_items: items
      }
      API.insertSalesOrder(_data, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  })

  useEffect(() => {
    let active = true;

    (async () => {

      API.getQuote((res) => {
          if(!res) return
		    if(!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      })

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

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

  function changeData(data){
    const orderItem = data.quote_items.map(function(key, index){
      return {
        'id': index,
        'RFQ_item_id' : key.id,
        'product_id' : key.product.id,
        'product_feature_id' : key.product_feature_id,
        'name' : key.product.name,
        'size' : key.product.size,
        'color' : key.product.color,
        'qty' : key.qty,
        'delivery_date': key.delivery_date,
        'unit_price' : key.unit_price
      }
    })
    setValues({
      rfq_id: data.rfq_id,
      vendor_id: data.vendor_id,
      issue_date: data.issue_date,
      valid_thru: data.valid_thru,
    })
    setItems(orderItem);
  }

  const deleteData = useCallback(
    (id) => () => {
      setItems((prevItems) => {
        const rowToDeleteIndex = id;
        return [
          ...items.slice(0, rowToDeleteIndex),
          ...items.slice(rowToDeleteIndex + 1),
        ];
      });
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
            if(index === parseInt(itemToUpdateIndex)){
              return {...row, [editedColumnName]: editRowData[editedColumnName].value}
            } else {
              return row
            }
          });
        });

      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = () => {
    API.getAQuote(values.quote_id, function(res){
      console.log(JSON.stringify(res));
      if(!res) alert("Something went wrong!");
      var temp = res.data.quote_items;
      temp = res.data.quote_items.map(function(_d){
        return {
          'id': index,
          'RFQ_item_id' : key.id,
          'product_id' : key.product.id,
          'product_feature_id' : key.product_feature_id,
          'name' : key.product.name,
          'size' : key.product.size,
          'color' : key.product.color,
          'qty' : key.qty,
          'unit_price' : key.unit_price,
          'delivery_date': key.delivery_date
        }
      })
      setItems(temp);
    })
  };

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', type: 'number', editable: true },
    { field: 'unit_price', type: 'number', headerName: 'Unit Price', editable: true },
    { field: 'delivery_date', type: 'date', headerName: 'Delivery Date', editable: true },
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
        open={openM}
        options={optionsP}
        handleClose={handleCloseModal}
        setComponent={setItems}
      />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Purchase Order Information"
            />
            <CardContent>
              <AutoComplete
                fullWidth
                autoComplete="rfq_id"
                type="text"
                label="No Quotation"
                error={Boolean(touched.rfq_id && errors.rfq_id)}
                helperText={touched.rfq_id && errors.rfq_id}
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
                    autoComplete="vendor_id"
                    type="text"
                    label="Vendor"
                    {...getFieldProps('vendor_id')}
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

export default SalesOrder