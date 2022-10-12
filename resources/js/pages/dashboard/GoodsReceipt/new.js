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
import DialogBox from './components/DialogBox';
import DialogBoxF from './components/DBFacility';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

// Helper
import {productItemArrangedData, partyArrangedData} from '../../../helpers/data';

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
  // Option Inquiry
  const [options, setOptions] = useState([]);
  
  //AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([])
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [openSO, setOpenSO] = useState(false);
  const loading2 = (openSO) && optionsP?.length === 0;

  const [options2, setOptions2] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && options2.length === 0;
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    type: {
      name: ''
    }
  });


  //Data Grid
  const [items, setItems] = useState([])

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  React.useEffect(() => {
    let active = true;

    if (!loadingSH) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getFacility((res) => {
          if(!res) return
          else setOptions2(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSH])   

  useEffect(() => {
    let active = true;

    (async () => {

      API.getPurchaseOrder('', (res) => {
        if(!res) return
      if(!res.data) {
        setOptions([]);
      } else {
        ;
        setOptions(res.data);
      }

      API.getParty((res) => {
        if(!res) return
        else {
          console.log(res)
          // let data = partyArrangedData(res);
          // console.log(data)
          setOptionsP(res);
        }
      })  
    })

    })();
    
    return () => {
      active = false;
    };
  }, [loading]);

  const GoodsReceiptSchema = Yup.object().shape({
    supplier: Yup.number().required('Inquiry References is required'),
    facility_id: Yup.number().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
  });

  const formik = useFormik({
    initialValues: {
      purchase_order_id: '',
      issue_date: '',
      facility_id: '',
      supplier: ''
    },
    validationSchema: GoodsReceiptSchema,
    onSubmit: (values) => {
      const _data = {
        ...values, GR_items: items
      }
      API.insertGoodsReceipt(_data, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setValues, setFieldValue, getFieldProps } = formik;


  function changeData(data){
    const quoteItem = data.order_item.map(function(key, index){
      const {id, product_id, name, size, color} = productItemArrangedData(key.product_feature)
      return {
        'id': index,
        'po_item_id' : key.id,
        'product_id' : product_id,
        'product_feature_id' : id,
        'name' : name,
        'size' : size,
        'color' : color,
        'qty_received' : key.qty_received || 0,
        'qty_receipt' : key.qty_receipt || 0,
        'qty_order' : key.qty || 0
      }
    })
    setValues({
      purchase_order_id: data.id,
      issue_date: data.issue_date,
      facility_id: values.facility_id
    })

    setSelectedValueSO(data.party)

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
          
          return prevItems.map((row, index) => {
            if(row.id === parseInt(itemToUpdateIndex)){
              return {...row, [editedColumnName]: editRowData[editedColumnName].value}
            } else {
              return row
            }
          });
        });

        console.log(items);

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
    { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
    { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty_received', headerName: 'Qty Receive', editable: true },
    { field: 'qty_on_receipt', headerName: 'Qty On Receipt', editable: true },
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

  // const handleClose = (name, value) => {
  //   setOpenSH(false);
  //   setOptions2([]);
  //   if(value) {
  //     setSelectedValueSH(value);
  //     setFieldValue('facility_id', value.id);
  //   }
  // };

    // Dialog Box
    const handleClose = (name, value) => {
      if(name === 'facility_id') {
        setOpenSO(false)
        setSelectedValueSH(value);
      }
      if(name === 'supplier') {
        setOpenSH(false)
        setSelectedValueSO(value);
      }
      console.log(selectedValueSH)
      console.log(selectedValueSO)

      setOpenSO(false)
      setOpenSH(false)
      setFieldValue(name, value.id);
      setOptions([]);
    };


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
          <Grid container spacing={1} direction="row">
            <Grid item xs={4}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardContent>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Facility </Typography>
                        <Button
                          onClick={() => setOpenSH(true)}
                        >
                          Select
                        </Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">
                          {selectedValueSH?.name}
                        </Typography>
                        <Typography variant="caption">
                          {selectedValueSH?.type?.name}
                        </Typography>
                      </div>
                      <DialogBoxF
                        options={options2}
                        loading={loadingSH}
                        error={Boolean(touched.facility_id && errors.facility_id)}
                        helperText={touched.facility_id && errors.facility_id}
                        selectedValue={values.facility_id}
                        open={openSH}
                        onClose={(value) => handleClose('facility_id', value)}
                      />
                    </ColumnBox>
                </CardContent>
              </Card>              
            </Grid>
            <Grid item xs={8}>
              <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    {/* <Grid item xs={4} sx={{padding: 'unset'}}>
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
                    </Grid>
                    <Grid item xs={1}>
                      <Divider orientation="vertical"/>
                    </Grid> */}
                    <Divider/>
                    <Grid item xs={12}>
                      <ColumnBox>
                        <SpaceBetweenBox>
                          <Typography variant="h6"> Pengirim </Typography>
                          <Button
                            onClick={() => setOpenSO(true)}
                          >
                            Select
                          </Button>
                        </SpaceBetweenBox>
                        <div>
                          <Typography variant="subtitle1">{selectedValueSO?.party?.name}</Typography>
                          <Typography component="span" variant="caption">{selectedValueSO?.party?.address?.street}</Typography>
                          <Typography variant="body2">{`${selectedValueSO?.party?.city}, ${selectedValueSO?.party?.address?.province}, ${selectedValueSO?.party?.address?.country}`}</Typography>
                        </div>
                        <DialogBox
                          options={optionsP}
                          loading={loading2}
                          error={Boolean(touched.supplier && errors.supplier)}
                          helperText={touched.supplier && errors.supplier}
                          selectedValue={selectedValueSO}
                          open={openSO}
                          onClose={(value) => handleClose('supplier', value)}
                        />
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

export default GoodsReceipt;