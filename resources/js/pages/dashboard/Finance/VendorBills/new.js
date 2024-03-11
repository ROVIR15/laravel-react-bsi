import React, { Component } from 'react';
import * as Yup from 'yup';

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
import {UploadPaper} from './components/UploadPaper';

import AutoComplete from './components/AutoComplete';
import Page from '../../../../components/Page';
import API from '../../../../helpers';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { partyArrangedData } from '../../../../helpers/data';

import { orderItemToVendorBillItems } from '../utils';
import {isNull} from 'lodash';

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
      'Jalan Raya Albisindo Desa Gondosari RT 01 RW 05, Kec. Gebog, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 42133,
    phone_number: '(0291) 2381023'
  });

  const ValidationSchema = Yup.object().shape({
    reff_number: Yup.string().required('Nomor Invoice diperlukan'),
    invoice_date: Yup.date().required('Tanggal Penerbitan Invoice'),
    due_date: Yup.number().required('Tenggat Waktu Pembayaran')
  });

  const formik = useFormik({
    initialValues: {
      reff_number: '',
      order_id: 0,
      purchase_order_id: 0,
      sold_to: 0,
      invoice_date: '',
      description: '',
      tax: 0
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      if(isNull(_link)){
        alert('Lampirkan Dokumen Tagihan dari Supplier!');
        setSubmitting(false);
        setValueTab("4");
        return
      }
      let _data = {
        ...values,
        items,
        type: 2,
        tax: 11,
        description: '',
        url: _link,
        shipment_id: null,
        terms: rowsInvoiceTerm
      };
      try {
        API.insertVendorBills(_data, (res) => {
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

  const [file, setFile] = React.useState(null);
  const [_link, _setLink] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = [...e.dataTransfer.files];
    const event = { target: { files } };

    // Handle file upload
    handleOnFileChange(event);
  };
  
  const handleOnFileChange = (event) => {
    setFile(event.target.files[0]);

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('file', event.target.files[0], event.target.files[0].name);
    try {
      API.uploadVendorBills(formData, function (res) {
        if (res.success) {
          _setLink(res.path);
          enqueueSnackbar('', { variant: 'successAlert' });
        } else {
          enqueueSnackbar('', { variant: 'failedAlert' });
        }
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };

  function ShowImageWhenItsUploaded() {
    if (file) {
      return (
        <Paper sx={{ height: '100%' }}>
          <Stack direction="column">
            <Typography
              variant="body1"
              component="a"
              href={_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {_link}
            </Typography>

            <Button component="label" htmlFor="upload-file">
              <input
                accept="pdf/*"
                multiple
                id="upload-file"
                type="file"
                onChange={handleOnFileChange}
                hidden
              />
              <Typography variant="h5">Change File</Typography>
            </Button>
          </Stack>
        </Paper>
      );
    } else {
      return (
        <Paper sx={{ height: '100%' }}>
          <label htmlFor="upload-file">
            <input
              accept="pdf/*"
              multiple
              id="upload-file"
              type="file"
              onChange={handleOnFileChange}
              style={{ display: 'none' }}
            />
            <UploadPaper
              onChange={handleOnFileChange}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              component="span"
              fullWidth
            >
              <Typography variant="h5">Drop or Select File</Typography>
            </UploadPaper>
          </label>
        </Paper>
      );
    }
  }

  /**
   * Data Grid for Invoice Item
   */

  const [items, setItems] = React.useState([]);

  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 300, editable: false },
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

  /**
   * Handle Invoice Term
   */
  const [rowsInvoiceTerm, setRowsInvoiceTerm] = React.useState([]);
  const columnsInvoiceTerm = React.useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'term_description', headerName: 'Term Description', editable: true, width: 350 },
    { field: 'term_value', headerName: 'Value', editable: true, type: 'number' },
    {
      field: 'value_type',
      headerName: 'Type',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Percentage', 'Number']
    }
  ]);

  const handleAddInvoiceTerm = () => {
    setRowsInvoiceTerm([
      ...rowsInvoiceTerm,
      {
        id: rowsInvoiceTerm.length + 1,
        invoice_id: null,
        invoice_item_id: null,
        term_description: 'contoh. Potongan',
        term_value: 0
      }
    ]);
  };

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setRowsInvoiceTerm((prevItems) => {
          const itemToUpdateIndex = parseInt(editedIds[0]);

          return prevItems.map((row, index) => {
            if (row.id === parseInt(itemToUpdateIndex)) {
              return { ...row, [editedColumnName]: editRowData[editedColumnName].value };
            } else {
              return row;
            }
          });
        });
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

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
      API.getUninvoicedPurchaseOrder(``, (res) => {
        if (!res) return;
        if (!res.data) {
          setOptionsAutoComplete([]);
        } else {
          setOptionsAutoComplete(res.data);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loadingAutoComplete]);

  const changeData = (payload) => {
    console.log(payload.bought_from);
    let invoiceItems = orderItemToVendorBillItems(payload.order_item);
    setFieldValue('purchase_order_id', payload.id);
    setFieldValue('order_id', payload.order_id);
    setFieldValue('sold_to', payload.bought_from.id);
    setSelectedValueSO({
      name: payload.bought_from.name,
      address: `${payload.bought_from.address.street} ${payload.bought_from.address.city} ${payload.bought_from.address.province} ${payload.bought_from.address.country}`,
      postal_code: payload.bought_from.address.postal_code
    });
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
        <Card>
          <CardHeader title="Invoice Info" />
          <CardContent>
            <Grid container spacing={3} direction="row">
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoComplete="reff_number"
                  type="text"
                  placeholder="Reff Number"
                  {...getFieldProps('reff_number')}
                  error={Boolean(touched.reff_number && errors.reff_number)}
                  helperText={touched.reff_number && errors.reff_number}
                />
              </Grid>

              <Grid item xs={6}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    autoComplete="invoice_date"
                    type="date"
                    placeholder="invoice_date"
                    {...getFieldProps('invoice_date')}
                    error={Boolean(touched.invoice_date && errors.invoice_date)}
                    helperText={touched.invoice_date && errors.invoice_date}
                  />
                  <TextField
                    fullWidth
                    autoComplete="due_date"
                    type="number"
                    placeholder="due_date"
                    {...getFieldProps('due_date')}
                    error={Boolean(touched.due_date && errors.due_date)}
                    helperText={touched.due_date && errors.due_date}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">Hari</InputAdornment>
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <ColumnBox
              style={{
                padding: '1em 0.75em',
                border: '1px dashed #b8b8b8',
                borderRadius: '8px'
              }}
            >
              <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Penagihan ke </Typography>
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
                    <Typography variant="h6"> Penagih </Typography>
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
            </ColumnBox>
          </CardContent>

          {/* Data Grid for Invoice Item */}
          <CardContent>
            <DataGrid rows={items} columns={columns} />
          </CardContent>
          {/* Tab Panel */}
          <CardContent>
            <ColumnBox
              style={{
                padding: '1em 0.75em',
                border: '1px dashed #b8b8b8',
                borderRadius: '8px'
              }}
            >
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                    <Tab label="Description" value="1" />
                    <Tab label="Finance" value="2" />
                    <Tab label="Attachment" value="4" />
                    <Tab label="Terms" value="3" />
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

                <TabPanel value="3">
                  <DataGrid
                    columns={columnsInvoiceTerm}
                    rows={rowsInvoiceTerm}
                    handleAddRow={handleAddInvoiceTerm}
                    onEditRowsModelChange={handleEditRowsModelChange}
                  />
                </TabPanel>

                <TabPanel value="4">
                  <Grid item xs={12}>
                    <ShowImageWhenItsUploaded />
                  </Grid>
                </TabPanel>
              </TabContext>
            </ColumnBox>
          </CardContent>

          <CardContent>
            <Stack direction="row">
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ m: 1 }}
              >
                Save
              </LoadingButton>
              <Button fullWidth size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}

export default Invoice;
