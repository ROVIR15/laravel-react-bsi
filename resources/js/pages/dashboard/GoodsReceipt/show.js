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
import Modal from './components/Modal2';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function GoodsReceipt() {
  // Option Inquiry
  const [options, setOptions] = useState([]);

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([])

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

  const GoodsReceiptSchema = Yup.object().shape({
    purchase_order_id: Yup.number().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      purchase_order_id: '',
      issue_date: '',
    },
    validationSchema: GoodsReceiptSchema,
    onSubmit: (values) => {
      const _data = {
        ...values, quote_items: items
      }
      API.insertQuote(_data, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setValues, getFieldProps } = formik;

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

  function changeData(data){
    const quoteItem = data.inquiry_item.map(function(key, index){
      return {
        'id': index,
        'po_item_id' : key.id,
        'product_id' : key.product.product_id,
        'product_feature_id' : key.product_feature_id,
        'name' : key.product.name,
        'size' : key.product.size,
        'color' : key.product.color,
        'qty_received' : key.qty_received,
        'qty_receipt' : key.qty_receipt,
        'qty_order' : key.qty_order
      }
    })
    setValues({
      purchase_order_id: data.id,
      issue_date: data.po_date,
    })
    setItems(quoteItem);
  }

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
          console.log(itemToUpdateIndex)
    
          return prevItems.map((row, index) => {
            if(index === parseInt(itemToUpdateIndex)){
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

  const columns = useMemo(() => [
    { field: 'po_item_id', headerName: 'PO Item ID', editable: false, visible: 'hide' },
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty_received', headerName: 'Quantity Receive', editable: true },
    { field: 'qty_receipt', headerName: 'Quantity Receive', editable: true },
    { field: 'qty_order', headerName: 'Quantity Receive', editable: true },
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
              title="Goods Receipt Information"
            />
            <CardContent>
              <AutoComplete
                fullWidth
                autoComplete="purchase_order_id"
                type="text"
                label="Purchase Order ID"
                error={Boolean(touched.purchase_order_id && errors.purchase_order_id)}
                helperText={touched.purchase_order_id && errors.purchase_order_id}
                options={options}
                setOpen={setOpen}
                loading={loading}
                changeData={changeData}
              />
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoComplete="vendor_id"
                  type="text"
                  label="Vendor"
                  {...getFieldProps('vendor_id')}
                  disabled
                  error={Boolean(touched.vendor_id && errors.vendor_id)}
                  helperText={touched.vendor_id && errors.vendor_id}
                />
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
              </div>
              <DataGrid 
                columns={columns} 
                rows={items}
                onEditRowsModelChange={handleEditRowsModelChange}
                handleAddRow={handleOpenModal}
                handleReset={handleResetRows}
                handleUpdateAllRows={false}
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

export default GoodsReceipt