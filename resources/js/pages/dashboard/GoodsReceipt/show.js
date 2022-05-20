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
import { useParams } from 'react-router-dom';
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

function GoodsReceipt() {
  const {id} = useParams();

  // Option Inquiry
  const [options, setOptions] = useState([]);
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    type: {
      name: ''
    }
  });
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
      po_number: ''
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
    API.getAGoodsReceipt(id, function(res){
      if(!res) return;
      else {
        changeData(res.data);
      }
    })
  }, [id])

  function changeData(data){
    const GRItems = data.GR_Items.map(function(key, index){
      return {
        'id': key.id,
        'product_id': key.product.id,
        'name' : key.product.name,
        'size' : key.product.size,
        'color' : key.product.color,
        'qty_order' : key.qty_order,
        'qty_on_receipt' : key.qty_on_receipt,
        'qty_received' : key.qty_received,
      }
    })
    setValues({
      purchase_order_id: data.po_number,
      issue_date: data.issue_date,
      facility_id: data.facility_id
    })

    setSelectedValueSH(data.facility)
    setSelectedValueSO(data.bought_from)
    setItems(GRItems);
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
        
        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;

        //Update fire through API
        API.updateGoodsReceiptItem(editedIds, data, function(res){
          alert(JSON.stringify(res));
        });

        //update items state
        // setItems((prevItems) => {
        //   const itemToUpdateIndex = parseInt(editedIds[0]);
        //   console.log(itemToUpdateIndex)
    
        //   return prevItems.map((row, index) => {
        //     if(index === parseInt(itemToUpdateIndex)){
        //       return {...row, [editedColumnName]: editRowData[editedColumnName].value}
        //     } else {
        //       return row
        //     }
        //   });
        // });

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
    { field: 'id', headerName: 'ID', editable: false},
    { field: 'product_id', headerName: 'Product ID', editable: false},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty_order', headerName: 'Qty Order', editable: false },
    { field: 'qty_on_receipt', headerName: 'Qty On Receive', editable: true },
    { field: 'qty_received', headerName: 'Qty Received', editable: true },
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
                  title="Warehouse"
                />
                <CardContent>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Facility </Typography>
                        <Button
                          disabled
                        >
                          Select
                        </Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">
                          {selectedValueSH.name}
                        </Typography>
                        <Typography variant="caption">
                          {selectedValueSH.type.name}
                        </Typography>
                      </div>
                    </ColumnBox>
                </CardContent>
              </Card>              
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardHeader
                  title="Goods Receipt Information"
                />
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={4} sx={{padding: 'unset'}}>
                      <TextField
                        fullWidth
                        autoComplete="purchase_order_id"
                        disabled
                        type="text"
                        label="Purchase Order ID"
                        error={Boolean(touched.purchase_order_id && errors.purchase_order_id)}
                        helperText={touched.purchase_order_id && errors.purchase_order_id}
                        value={values.purchase_order_id}
                        loading={loading}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Divider/>
                    <Grid item xs={6}>
                      <ColumnBox>
                        <SpaceBetweenBox>
                          <Typography variant="h6"> Supplier </Typography>
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

export default GoodsReceipt