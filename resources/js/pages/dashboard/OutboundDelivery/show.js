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

import { useFormik, Form, FormikProvider, insert } from 'formik';
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

function OutboundDelivery() {
  const {id} = useParams();

  // Status Item Issuance
  const [postGoodsIssue, setPostGoodsIssue] = useState(false);

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

  const OutboundDeliverySchema = Yup.object().shape({
    order_id: Yup.number().required('Inquiry References is required'),
    delivery_date: Yup.date().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      order_id: '',
      po_number: '',
      delivery_date: '',
      issue_date: ''
    },
    validationSchema: OutboundDeliverySchema,
    onSubmit: (values) => {
      API.insertItemIssuance(items, (res) => {
        if(!res) return undefined;
        if(!res.success) alert('Failed');
        else alert('Success');
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setValues, getFieldProps } = formik;

  useEffect(() => {
    API.getAShipment(id, function(res){
      if(!res) return;
      else {
        changeData(res.data);
      }
    })
  }, [id])

  function changeData(data){

    function qtyLeft(order, ship) {
      return order - ship;
    }

    function isDone(param){
      return param > 0;
    }

    const items = data.items.data.map(function(key, index){
      let left = qtyLeft(key.order_item.qty, key.qty_shipped)
      return {
        'id': key.id,
        'shipment_id': key.shipment_id,
        'product_feature_id': key.order_item.product_feature.id,
        'name' : key.order_item.product_feature.name,
        'size' : key.order_item.product_feature.size,
        'color' : key.order_item.product_feature.color,
        'qty_order': key.order_item.qty,
        'qty_ship': key.qty_shipped,
        'qty_left': left
      }
    })

    setValues({
      order_id: data.sales.order_id,
      po_number: data.sales.po_number,
      issue_date: data.sales.issue_date,
      delivery_date: data.sales.delivery_date
    })

    setSelectedValueSH(data.party)
    setSelectedValueSO(data.ship)

    if(isDone(data.issued_goods)){
      setPostGoodsIssue(true);
    } else {
      setPostGoodsIssue(false);
    }

    setItems(items);
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

  /**
   * Post Goods Issue
   */

  const handleItemsIssuance = (event) => {
    event.preventDefault();

    API.insertItemIssuance(items, (res) => {
      if(!res) return undefined;
      if(!res.success) alert('Error');
      else alert('Success');
    });


  }


  /**
   * Columns Table of Component
   */

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false},
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty_order', headerName: 'Qty Order', editable: false },
    { field: 'qty_ship', headerName: 'Qty On Ship', editable: true },
    { field: 'qty_left', headerName: 'Qty Left', editable: true },
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
                  <TextField
                    fullWidth
                    autoComplete="delivery_date"
                    type="date"
                    disabled
                    placeholder='valid'
                    {...getFieldProps('delivery_date')}
                    error={Boolean(touched.delivery_date && errors.delivery_date)}
                    helperText={touched.delivery_date && errors.delivery_date}
                  />
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
                      <TextField
                        fullWidth
                        autoComplete="po_number"
                        disabled
                        type="text"
                        label="Sales Order ID"
                        error={Boolean(touched.po_number && errors.po_number)}
                        helperText={touched.po_number && errors.po_number}
                        value={values.po_number}
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
            <Button
              size="large"
              color="secondary"
              variant="contained"
              disabled={postGoodsIssue}
              onClick={handleItemsIssuance}
              sx={{ m: 1 }}
            >
              Post Goods Issued
            </Button>
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

export default OutboundDelivery