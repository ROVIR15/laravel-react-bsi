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
import AutoComplete from '../../../components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Quotation() {
  const [options, setOptions] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([])

  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const QuotationSchema = Yup.object().shape({
    inquiry_id: Yup.number().required('Inquiry References is required'),
    po_date: Yup.date().required('PO Date is required'),
    valid_to: Yup.date().required('Valid To is required'),
    delivery_date: Yup.date().required('Delivery Date is required')
  });

  const formik = useFormik({
    initialValues: {
      inquiry_id: '',
      issue_date: '',
      valid_to: '',
      delivery_date: '',
      quote_item: []
    },
    validationSchema: QuotationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  })

  useEffect(() => {
    let active = true;

    (async () => {
    API.getInquiry((res) => {
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

  function changeData(data){
    const quoteItem = data.inquiry_item.map(function(key, index){
      return {
        'id': index,
        'inquiry_item_id' : key.id,
        'product_id' : key.product.id,
        'product_feature_id' : key.product_feature_id,
        'product_name' : key.product.name,
        'product_size' : key.product.size,
        'product_color' : key.product.color,
        'qty' : key.qty,
        'unit_price' : 0
      }
    })
    setValues({
      inquiry_id: data.id,
      issue_date: data.po_date,
      valid_to: data.valid_to,
      delivery_date: data.delivery_date,
    })
    setItems(quoteItem);
  }

  const { errors, touched, values, isSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

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
      'inquiry_item_id' : null,
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
    { field: 'inquiry_item_id', headerName: 'Inquiry Item ID', editable: false, visible: 'hide' },
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'product_name', headerName: 'Name', editable: false},
    { field: 'product_size', headerName: 'Size', editable: false },
    { field: 'product_color', headerName: 'Color', editable: false },
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

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Quotation Information"
            />
            <CardContent>
              <AutoComplete
                fullWidth
                autoComplete="inquiry_id"
                type="text"
                label="No Inquiry"
                error={Boolean(touched.inquiry_id && errors.inquiry_id)}
                helperText={touched.inquiry_id && errors.inquiry_id}
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
                label="PO Date"
                {...getFieldProps('issue_date')}
                error={Boolean(touched.issue_date && errors.issue_date)}
                helperText={touched.issue_date && errors.issue_date}
              />
              <TextField
                fullWidth
                autoComplete="valid_to"
                type="date"
                label="Valid to"
                placeholder='valid'
                {...getFieldProps('valid_to')}
                error={Boolean(touched.valid_to && errors.valid_to)}
                helperText={touched.valid_to && errors.valid_to}
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

export default Quotation