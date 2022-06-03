import React, { Component } from 'react';

import { 
  Button,
  Card, 
  CardHeader, 
  CardContent, 
  Divider,
  Grid,
  Typography, 
  Paper, 
  Stack,  
  TextField
} from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { FormikProvider, Form, useFormik } from 'formik';

import { useParams, useNavigate } from 'react-router-dom'

import DataGrid from './components/DataGrid';
import DialogBox from './components/DBBuyer';

import AutoComplete from './components/AutoComplete';
import Page from '../../../../components/Page';
import API from '../../../../helpers';

//Icons
import { Icon } from '@iconify/react';
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

function Invoice(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: 'PT. BSI Indonesia',
    address: 'Jalan Albisindo Raya no 24, Kec. Kaliwungu, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 42133,
    phone_number: '(0291) 2381023'
  })

  const formik = useFormik({
    initialValues: {
        sales_order_id: '',
        sold_to: 0,
        invoice_date: ''
      },
      onSubmit: (values) => {
        let _data = {...values, items};
        alert(JSON.stringify(_data));
        API.insertSalesInvoice(_data, (res) => {
          if(!res) return undefined;
          if(!res.success) alert('failed');
          else alert('success');
        })
        setSubmitting(false);
      }
  })

  // GET DATA from spesific id
  React.useEffect(() => {
    if(!id) return undefined;
    API.getASalesInvoice(id, (res) => {
      if(!res) return undefined;
      if(!res.data) alert('Error');
      else {
        
        changeData(res.data);

        setValues({
          invoice_id: res.data.id,
          po_number: res.data.po_number,
          sold_to: res.data.sold_to.id,
        });

      }
    })
  }, [id])

  // Dialog Box Option
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedValueSO, setSelectedValueSO] = React.useState({
    name: '',
    address: '',
    postal_code: 0
  })
  const loading = openDialogBox && options.length === 0

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getBuyers((res) => {
          if(!res) return
          else setOptions(res);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loading])   

  const handleClose = (name, value) => {
    setOpenDialogBox(false);
    setOptions([]);
    if(value) {
      setSelectedValueSO({
        name: value.name,
        address: `${value.street} ${value.city} ${value.province} ${value.country}`,
        postal_code: value.postal_code
      });

      setFieldValue(name, value.id);
    }
  };

//   END

  /**
   * Data Grid for Invoice Item
   */

  const [items, setItems] = React.useState([]);

   const columns = React.useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', type: 'number', editable: false, flex: 1},
    { field: 'amount', type: 'number', headerName: 'Unit Price', editable: false, flex: 1},
    { field: 'total', type: 'number', headerName: 'Total', editable: false, flex: 1},
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

  const deleteData = React.useCallback(
    (id) => () => {
      setItems((prevItems) => {
        const rowToDeleteIndex = id;
        return [
          ...items.slice(0, rowToDeleteIndex),
          ...items.slice(rowToDeleteIndex + 1),
        ];
      });
  })

  // AutoComplete

  const [optionsAutoComplete, setOptionsAutoComplete] = React.useState([]);
  const [selectedShipment, setSelectedShipment] = React.useState({
    id: '',
    po_number: ''
  });
  const [openAutoComplete, setOpenAutoComplete] = React.useState(false);
  const loadingAutoComplete = openAutoComplete && optionsAutoComplete.length === 0;

  React.useEffect(() => {
    let active = true;

    (async () => {
      API.getShipment((res) => {
          if(!res) return;
          if(!res.data) {
            setOptionsAutoComplete([]);
          } else {
            setOptionsAutoComplete(res.data);
          }
      })
    })();
    
    return () => {
      active = false;
    }

  }, [loadingAutoComplete])

  const changeData = (payload) => {

    function total(qty, price) {
        return qty * price;
    }

    const temp = payload.items.map((item, index) => {
      return {
        'id': index,
        'order_item_id': item.id,
        'name' : item.product_feature_id.name,
        'size' : item.product_feature_id.size,
        'color' : item.product_feature_id.color,
        'qty': item.qty,
        'amount': item.amount,
        'total': total(item.qty, item.amount)  
      }
    })

    setSelectedValueSO({
      name: payload.sold_to.name,
      address: `${payload.sold_to.address.street} ${payload.sold_to.address.city} ${payload.sold_to.address.province} ${payload.sold_to.address.country}`,
      postal_code: payload.sold_to.address.postal_code
    });

    setItems(temp);
  }

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setFieldValue, setValues, getFieldProps } = formik;  

  return (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={6}>
                <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                  <CardHeader
                    title="Invoice Info"
                  />
  
                  <CardContent>

                    <TextField
                      disabled
                      fullWidth
                      value={`INV-${values.invoice_id} - ${values.po_number}`}
                    />

                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                  <CardHeader
                    title="Invoice Date"
                  />
                  <CardContent>
                    <TextField
                      fullWidth
                      autoComplete="invoice_date"
                      type="date"
                      placeholder="invoice_date"
                      {...getFieldProps('invoice_date')}
                      error={Boolean(touched.invoice_date && errors.invoice_date)}
                      helperText={touched.invoice_date && errors.invoice_date}
                    />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                  <CardHeader
                    title="Invoice Information"
                  />
                  <CardContent>
                    <Paper>
                      <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Pembeli </Typography>
                            <Button
                              onClick={() => setOpenDialogBox(true)}
                            >
                              Select
                            </Button>
                          </SpaceBetweenBox>
                          <div>
                            <Typography variant="body1">
                              {selectedValueSO.name}
                            </Typography>
                            <Typography variant="body1">
                              {selectedValueSO.address}
                            </Typography>
                            <Typography variant="body1">
                              {selectedValueSO.postal_code}
                            </Typography>
                          </div>
                          <DialogBox
                            options={options}
                            loading={loading}
                            error={Boolean(touched.sold_to && errors.sold_to)}
                            helperText={touched.sold_to && errors.sold_to}
                            selectedValue={values.sold_to}
                            open={openDialogBox}
                            onClose={(value) => handleClose('sold_to', value)}
                          />

                        </ColumnBox>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Penerima </Typography>
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
                            <Typography variant="body1">
                              {selectedValueSH.address}
                            </Typography>
                            <Typography variant="body1">
                              {selectedValueSH.postal_code}
                            </Typography>                          </div>
                        </ColumnBox>
        
                      </Stack>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Data Grid for Invoice Item */}
            <Grid item xs={12}>
              <Card>
                <DataGrid rows={items} columns={columns}/> 
              </Card>
            </Grid>

            <Card sx={{ p:2, display: 'flex', justifyContent: 'end' }}>
              <Button
                size="large"
                color="grey"
                variant="contained"
                onClick={() => navigate(`/dashboard/finance/invoice/document/${id}`)}
                sx={{ m: 1 }}
              >
                Show Document
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
  )
}

export default Invoice;