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
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Quotation() {
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

  const QuotationSchema = Yup.object().shape({
    inquiry_id: Yup.number().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
    valid_thru: Yup.date().required('Valid To is required'),
    delivery_date: Yup.date().required('Delivery Date is required')
  });

  const formik = useFormik({
    initialValues: {
      inquiry_id: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
    },
    validationSchema: QuotationSchema,
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
        'inquiry_item_id' : key.id,
        'product_id' : key.product.product_id,
        'product_feature_id' : key.product_feature_id,
        'name' : key.product.name,
        'size' : key.product.size,
        'color' : key.product.color,
        'qty' : key.qty,
        'unit_price' : 0
      }
    })
    setValues({
      inquiry_id: data.id,
      po_number: data.po_number,
      issue_date: data.po_date,
      valid_thru: data.valid_to,
      delivery_date: data.delivery_date,
    })
    setItems(quoteItem);
  }

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

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
    { field: 'inquiry_item_id', headerName: 'Inquiry Item ID', editable: false, visible: 'hide' },
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