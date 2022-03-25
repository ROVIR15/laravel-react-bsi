import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from '../../../components/DataGrid';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function SalesOrder() {
  const [options, setOptions] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([])

  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const SalesOrderSchema = Yup.object().shape({
    quote_id: Yup.string().required('Quote References is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_tp: Yup.string().required('Address is required'),
    po_number: Yup.string().required('city is required'),
    issue_date: Yup.date().required('province is required'),
    valid_thru: Yup.date().required('city is required'),
    delivery_date: Yup.date().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      quote_id: '',
      sold_to: '',
      ship_tp: '',
      po_number: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: ''
    },
    validationSchema: SalesOrderSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
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
    })();

    return () => {
      active = false;
    };
  }, [loading])

  const { errors, touched, values, isSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

  function changeData(data){
    const orderItem = data.quote_items.map(function(key, index){
      return {
        'id': index,
        'quote_item_id' : key.id,
        'product_id' : key.product.id,
        'product_feature_id' : key.product_feature_id,
        'product_name' : key.product.name,
        'product_size' : key.product.size,
        'product_color' : key.product.color,
        'qty' : key.qty,
        'shipment_estimated': null,
        'unit_price' : key.unit_price
      }
    })
    setValues({
      quote_id: data.id,
      po_number: data.po_number,
      issue_date: data.issue_date,
      valid_thru: data.valid_thru,
      delivery_date: data.delivery_date,
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

        // update on firebase
        setFieldValue('quote_item', items);
        // API.updateRequestItem(editedIds, data, function(res){
        //   alert(JSON.stringify(res));
        // })
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
          'quote_item_id' : key.id,
          'product_id' : key.product.id,
          'product_feature_id' : key.product_feature_id,
          'product_name' : key.product.name,
          'product_size' : key.product.size,
          'product_color' : key.product.color,
          'qty' : key.qty,
          'shipment_estimated': null,
          'unit_price' : key.unit_price
        }
      })
      setItems(temp);
    })
  };

  const handleAddRow = () => {
    const _new = {
      'quote_item_id' : null,
      'product_id' : null,
      'product_feature_id' : null,
      'product_name' : null,
      'product_size' : null,
      'product_color' : null,
      'qty' : 0,
      'unit_price' : 0
    }

    setItems((prevItems) => [...prevItems, {..._new, id: items.length}]);

    // API.insertRequestItem(_new, function(res){
    //   const {success, data} = res;
    //   if(!success) alert('error');
    //   setItems((prevItems) => [...prevItems, _new]);
    // }).catch(function(err){
    //   alert('error');
    // });
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
    { field: 'shipment_estimated', type: 'date', headerName: 'Shipment Estimated', editable: true },
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
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Sales Order Information"
            />
            <CardContent>
              <AutoComplete
                fullWidth
                autoComplete="quote_id"
                type="text"
                label="No Inquiry"
                error={Boolean(touched.quote_id && errors.quote_id)}
                helperText={touched.quote_id && errors.quote_id}
                options={options}
                setOpen={setOpen}
                loading={loading}
                changeData={changeData}
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

export default SalesOrder