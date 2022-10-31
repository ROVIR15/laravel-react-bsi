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
  Paper, 
  Stack, 
  Button 
} from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';
import { fCurrency } from '../../../utils/formatNumber';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//helpers
import {partyArrangedData, productItemArrangedData} from '../../../helpers/data'
import { QuotationSchema } from '../../../helpers/FormerSchema';
import { isArray, isEmpty } from 'lodash';
import { findTotalAmountOfQuotation, findTotalQty } from '../../../helpers/data/calculation';

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

function Quotation() {
  const {id} = useParams();
  // Option Inquiry
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSO || openSH || openM) && options.length === 0;
  const loading2 = (openSH) && options2.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  //Data Grid
  const [items, setItems] = useState([])

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
      ship_to: '',
      sold_to: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
    },
    validationSchema: QuotationSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        party_id: values.sold_to
      }
      API.updateQuote(id, _data, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;

  // Preapre data from vendor
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    setOptions([]);

    if (active) {
      try {
        API.getVendors(async (res) => {
          if(!res) return
          else {
            let data = await partyArrangedData(res);
            setOptions(data);
          }
        }) 
      } catch (e) {
        alert('error')
      }
    }

    return () => {
      active = false;
    };
  }, [loading])


  // Preapre data from buyer
  React.useEffect(() => {
    let active = true;

    if (!loading2) {
      return undefined;
    }

    setOptions2([]);

    if (active) {
      try {
        API.getBuyers((res) => {
          if(!res) return
          else {
            let data = partyArrangedData(res);
            setOptions2(data);
          }
        }) 
      } catch (e) {
        alert('error')
      }
    }
    return () => {
      active = false;
    };
  }, [loading2])


  // Dialog Box
  const handleClose = (name, value) => {
    if(name === 'sold_to') {
      setOpenSO(false)
      setSelectedValueSO(value);
    }
    if(name === 'ship_to') {
      setOpenSH(false)
      setSelectedValueSH(value);
    }
    setFieldValue(name, value.id);
    setOptions([]);
  };

  const deleteData = useCallback(
    (id) => () => {
      API.deleteQuoteItem(id, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })

      handleUpdateAllRows();
    }
  );

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;

        API.updateQuoteItem(editedIds, data, function(res){
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
    API.getAQuote(id, function(res){
      if(!res) alert("Something went wrong!");
      var temp = res.data.quote_items;
      temp = res.data.quote_items.map(function(key){
        const {id, product_id, name, size, color} = productItemArrangedData(key.product)
        return {
          'id': key.id,
          'product_id' : product_id,
          'product_feature_id' : key.product_feature_id,
          'name' : name,
          'size' : size,
          'color' : color,
          'qty' : key.qty,
          'unit_price' : key.unit_price
        }
      })
      setItems(temp);
    })
  };

  const columns = useMemo(() => [
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'product_feature_id', headerName: 'Variant ID', editable: true},
    { field: 'name', width: 350, headerName: 'Name', editable: false},
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

  useEffect(() => {
    if(!id) return;
    API.getAQuote(id, function(res){
      if(!res.data) alert("Something went wrong!");
      const quoteItem = res.data.quote_items.map(function(key, index){
        const {id, product_id, name, size, color} = productItemArrangedData(key.product)
        return {
          'id': key.id,
          'product_id' : product_id,
          'product_feature_id' : key.product_feature_id,
          'name' : name,
          'size' : size,
          'color' : color,
          'qty' : key.qty,
          'unit_price' : key.unit_price
        }
      });
      
      setValues({
        id: res.data.id,
        po_number: res.data.po_number,
        sold_to: res.data.sold_to,
        ship_to: res.data.ship_to,
        issue_date: res.data.issue_date,
        delivery_date: res.data.delivery_date,
        valid_thru: res.data.valid_thru,
      })

      setSelectedValueSO(res.data.party)
      setSelectedValueSH(res.data.ship)

      setItems(quoteItem);
    });
  }, [id]);

  // Populate

  const [populateState, setPopulateState] = useState({})
  const handlePopulate = () => {
    let payload = {items : populateState, quote_id: parseInt(id)}
    try {
      API.updateQuoteItem(0, payload, (res) => {
        if(!res.success) alert('failed');
        alert('success')
        handleUpdateAllRows();
      })
    } catch (e) {
      alert(e)
    }
  }

  const handleChangePopulate = (e) => {
    const { name, value } = e.target;
    if(name === 'qty' && value !== 0) setPopulateState({...populateState, qty: value});
    if(name === 'unit_price' && value !== 0) setPopulateState({...populateState, unit_price: value});
    else return;
  }

  return (
    <Page>
      <Container>
      <Modal 
        payload={items}
        open={openM}
        handleClose={handleCloseModal}
        items={items}
        setItems={setItems}
        update={handleUpdateAllRows}
      />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Quotation Information"
            />
            <CardContent>
            <Paper>
              <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Pembeli </Typography>
                    <Button
                      onClick={() => setOpenSO(true)}
                    >
                      Select
                    </Button>
                  </SpaceBetweenBox>
                  <div>

                    <Typography variant="subtitle1">{selectedValueSO.name}</Typography>
                    <Typography component="span" variant="caption">{selectedValueSO.address?.street}</Typography>
                    <Typography variant="body2">{`${selectedValueSO.address?.city}, ${selectedValueSO.address?.province}, ${selectedValueSO.address?.country}`}</Typography>

                  </div>
                  <DialogBox
                    options={options}
                    loading={loading}
                    error={Boolean(touched.sold_to && errors.sold_to)}
                    helperText={touched.sold_to && errors.sold_to}
                    selectedValue={selectedValueSO}
                    open={openSO}
                    onClose={(value) => handleClose('sold_to', value)}
                  />
                </ColumnBox>
                <Divider orientation="vertical" variant="middle" flexItem />
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Penerima </Typography>
                    <Button
                      onClick={() => setOpenSH(true)}
                    >
                      Select
                    </Button>
                  </SpaceBetweenBox>
                  <div>
                    <Typography variant="subtitle1">{selectedValueSH.name}</Typography>
                    <Typography component="span" variant="caption">{selectedValueSH.address?.street}</Typography>
                    <Typography variant="body2">{`${selectedValueSH.address?.city}, ${selectedValueSH.address?.province}, ${selectedValueSH.address?.country}`}</Typography>
                  </div>
                  <DialogBox
                    options={options2}
                    loading={loading2}
                    error={Boolean(touched.ship_to && errors.ship_to)}
                    helperText={touched.ship_to && errors.ship_to}
                    selectedValue={selectedValueSH}
                    open={openSH}
                    onClose={(value) => handleClose('ship_to', value)}
                  />
                </ColumnBox>

              </Stack>
            </Paper>
            </CardContent>
          </Card>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
            <CardHeader
              title="Item Overview"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={7}>
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
            <CardContent sx={{paddingTop: '0', paddingBottom: '0'}}>
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
            </CardContent>

            <CardContent sx={{paddingTop: '0', paddingBottom: '0'}}>
              <Stack direction="row">
                <TextField
                  type="number"
                  label="Qty"
                  name="qty"
                  value={populateState.qty}
                  onChange={handleChangePopulate}
                />
                <TextField
                  type="number"
                  label="Harga Barang"
                  name="unit_price"
                  value={populateState.unit_price}
                  onChange={handleChangePopulate}
                />
                <Button onClick={handlePopulate}>Populate</Button>
              </Stack>
            </CardContent>
            
            <CardContent>
            <DataGrid 
              columns={columns} 
              rows={items}
              onEditRowsModelChange={handleEditRowsModelChange}
              handleUpdateAllRows={handleUpdateAllRows}
              handleAddRow={handleOpenModal}
            />
            </CardContent>
          </Card>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <Typography
              variant='h5'
              sx={{flex: 1}}
            >
              Total Qty {findTotalQty(items)} and Rp. {fCurrency(findTotalAmountOfQuotation(items))}
            </Typography>
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

export default Quotation