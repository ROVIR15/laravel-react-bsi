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
  Button 
} from '@mui/material'
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
import DialogBoxF from './components/DBFacility';

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

function OutboundDelivery() {
  // Option Inquiry
  const [options, setOptions] = useState([]);
  
  //AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([])
  const [selectedValueSO, setSelectedValueSO] = React.useState({});

  const [options2, setOptions2] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && options2.length === 0;


  //Data Grid
  const [items, setItems] = useState([])

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  useEffect(() => {
    let active = true;

    (async () => {

      API.getSalesOrder((res) => {
        if(!res) return
      if(!res.data) {
        setOptions([]);
      } else {
        console.log(res.data);
        setOptions(res.data);
      }
    })

    })();
    
    return () => {
      active = false;
    };
  }, [loading]);

  const OutboundDeliverySchema = Yup.object().shape({
    order_id: Yup.number().required('Inquiry References is required'),
    delivery_date: Yup.date().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      order_id: '',
      delivery_date: '',
      issue_date: ''
    },
    validationSchema: OutboundDeliverySchema,
    onSubmit: (values) => {
      const _data = {
        ...values, OD_items: items
      }
      API.insertShipment(_data, (res)=>{
        if(!res) return undefined;
        if(!res.success) alert('failed');
        else alert('success');
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setValues, setFieldValue, getFieldProps } = formik;


  function changeData(data){
    const listItem = data.order_item.map(function(key, index){
      return {
        'id': index,
        'po_item_id' : key.id,
        'product_id' : key.product_feature.product_id,
        'product_feature_id' : key.product_feature.id,
        'name' : key.product_feature.name,
        'size' : key.product_feature.size,
        'color' : key.product_feature.color,
        'qty_order' : key.qty,
        'deliv_qty' : 0
      }
    })
    setValues({
      order_id: data.order_id,
      issue_date: data.issue_date,
      delivery_date: values.delivery_date
    })

    setSelectedValueSO(data.party)

    setItems(listItem);
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
    { field: 'qty_order', headerName: 'Qty Order', editable: false },
    { field: 'deliv_qty', headerName: 'Delivery Qty', editable: true },
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
          <Grid container spacing={1} direction="row">
            <Grid item xs={4}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardHeader
                  title="Delivery Date"
                />
                <CardContent>
                    <ColumnBox>
                      <TextField
                        fullWidth
                        autoComplete="delivery_date"
                        type="date"
                        placeholder='valid'
                        label="Delivery Date"
                        {...getFieldProps('delivery_date')}
                        error={Boolean(touched.delivery_date && errors.delivery_date)}
                        helperText={touched.delivery_date && errors.delivery_date}
                      />
                    </ColumnBox>
                </CardContent>
              </Card>              
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardHeader
                  title="Delivery Information"
                />
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={4} sx={{padding: 'unset'}}>
                      <AutoComplete
                        fullWidth
                        autoComplete="sales_order_id"
                        type="text"
                        label="Sales Order ID"
                        error={Boolean(touched.sales_order_id && errors.sales_order_id)}
                        helperText={touched.sales_order_id && errors.sales_order_id}
                        options={options}
                        setOpen={setOpen}
                        loading={loading}
                        changeData={changeData}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Divider/>
                    <Grid item xs={6}>
                      <ColumnBox>
                        <SpaceBetweenBox>
                          <Typography variant="h6"> Buyer </Typography>
                          <Button
                            disabled
                          >
                            Select
                          </Button>
                        </SpaceBetweenBox>
                        <div>
                          <Typography variant="body1">
                            {selectedValueSO.name}
                          </Typography>
                        </div>
                      </ColumnBox>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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

export default OutboundDelivery;