import React, { Component } from 'react';

import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Typography,
  Paper,
  Stack,
  TextField
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

import DataGrid from './components/DataGrid';
import DialogBox from './components/DBBuyer';

import AutoComplete from './components/AutoComplete';
import Page from '../../../../components/Page';
import API from '../../../../helpers';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { partyArrangedData } from '../../../../helpers/data';

import { orderItemToInvoiceItem } from '../utils';

const ColumnBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
}));

const SpaceBetweenBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px'
}));

function Invoice() {
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: 'PT. BSI Indonesia',
    address:
      'Jalan Albisindo Raya no 24, Kec. Kaliwungu, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 42133,
    phone_number: '(0291) 2381023'
  });

  const formik = useFormik({
    initialValues: {
      order_id: 0,
      purchase_order_id: 0,
      sold_to: 0,
      invoice_date: '',
      description: '',
      tax: 0
    },
    onSubmit: (values) => {
      let _data = { ...values, items, type: 2, tax: 11, description: '' };
      try {
        API.insertSalesInvoice(_data, (res) => {
          if (!res) return undefined;
          if (!res.success) throw new Error('failed to store data');
          else alert('success');
        });
      } catch (error) {
        alert(error);
      }
      setSubmitting(false);
    }
  });

  // Dialog Box Option
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedValueSO, setSelectedValueSO] = React.useState({
    name: '',
    address: '',
    postal_code: 0
  });
  const loading = openDialogBox && options.length === 0;

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  // Preapre data from buyer
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getBuyers((res) => {
          if (!res) return;
          else {
            let data = partyArrangedData(res);
            setOptions(data);
          }
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  const handleClose = (name, value) => {
    setOpenDialogBox(false);
    setOptions([]);
    if (value) {
      setSelectedValueSO({
        name: value.name,
        address: `${value.street} ${value.city} ${value.province} ${value.country}`,
        postal_code: value.postal_code
      });
      setFieldValue('sold_to', value.id);
    }
  };

  //   END

  /**
   * Data Grid for Invoice Item
   */

  const [items, setItems] = React.useState([]);

  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'name', headerName: 'Name', editable: false },
      { field: 'size', headerName: 'Size', editable: false },
      { field: 'color', headerName: 'Color', editable: false },
      { field: 'qty', headerName: 'Quantity', type: 'number', editable: false, flex: 1 },
      { field: 'amount', type: 'number', headerName: 'Unit Price', editable: false, flex: 1 },
      { field: 'total', type: 'number', headerName: 'Total', editable: false, flex: 1 },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteData(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteData]
  );

  const deleteData = React.useCallback((id) => () => {
    setItems((prevItems) => {
      const rowToDeleteIndex = id;
      return [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];
    });
  });

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
      API.getShipment(`?shipment_type=1`, (res) => {
        if (!res) return;
        if (!res.data) {
          setOptionsAutoComplete([]);
        } else {
          let _done = res.data.map(function (item) {
            return {
              id: item.id,
              name: item.order?.purchase_order?.po_number,
              date: item.delivery_date
            };
          });
          setOptionsAutoComplete(_done);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loadingAutoComplete]);

  const changeData = (payload) => {
    let invoiceItems = orderItemToInvoiceItem(payload.items);
    setFieldValue('purchase_order_id', payload.order.purchase_order.id);
    setFieldValue('order_id', payload.order.id);
    setItems(invoiceItems);
  };

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setFieldValue,
    setValues,
    getFieldProps
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={6}>
            <Card sx={{ '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader title="Invoice Info" />

              <CardContent>
                <AutoComplete
                  fullWidth
                  autoComplete="shipment_id"
                  type="text"
                  label="Shipment ID"
                  error={Boolean(touched.shipment_id && errors.shipment_id)}
                  helperText={touched.shipment_id && errors.shipment_id}
                  options={optionsAutoComplete}
                  setOpen={setOpenAutoComplete}
                  loading={loadingAutoComplete}
                  changeData={changeData}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader title="Invoice Date" />
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
            <Card sx={{ '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader title="Invoice Information" />
              <CardContent>
                <Paper>
                  <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Penagih </Typography>
                        <Button disabled>Select</Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">{selectedValueSH.name}</Typography>
                        <Typography variant="body1">{selectedValueSH.address}</Typography>
                        <Typography variant="body1">{selectedValueSH.postal_code}</Typography>{' '}
                      </div>
                    </ColumnBox>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Penagihan ke </Typography>
                        <Button onClick={() => setOpenDialogBox(true)}>Select</Button>
                      </SpaceBetweenBox>
                      {selectedValueSO?.name ? (
                        <div>
                          <Typography variant="subtitle1">{selectedValueSO?.name}</Typography>
                          <Typography component="span" variant="caption">
                            {selectedValueSO?.address}
                          </Typography>
                          <Typography variant="body2">{`${selectedValueSO?.postal_code}`}</Typography>
                        </div>
                      ) : null}
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
                  </Stack>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Grid for Invoice Item */}
          <Grid item xs={12}>
            <Card>
              <DataGrid rows={items} columns={columns} />
            </Card>
          </Grid>

          {/* Tab Panel */}

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TabContext value={valueTab}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                      <Tab label="Description" value="1" />
                      <Tab label="Finance" value="2" />
                    </TabList>
                  </Box>

                  <TabPanel value="1">
                    <Stack direction="row" alignItems="center">
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        type="text"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                      />
                    </Stack>
                  </TabPanel>

                  <TabPanel value="2">
                    <Stack direction="row" spacing={4} alignItems="center">
                      <Typography variant="body1">Tax</Typography>
                      <TextField
                        autoComplete="tax"
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }}
                        {...getFieldProps('tax')}
                        error={Boolean(touched.tax && errors.tax)}
                        helperText={touched.tax && errors.tax}
                      />
                    </Stack>
                  </TabPanel>
                </TabContext>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ display: 'flex', justifyContent: 'end' }}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ m: 1 }}
              >
                Save
              </LoadingButton>
              <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                Cancel
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

export default Invoice;