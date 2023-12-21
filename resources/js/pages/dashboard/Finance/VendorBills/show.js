import React, { Component, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  InputAdornment,
  MenuItem,
  Tab,
  Typography,
  Paper,
  Select,
  Stack,
  TextField,
  Table
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';
import { isEmpty, isUndefined } from 'lodash';
import { useSnackbar } from 'notistack';

import { useParams, useNavigate } from 'react-router-dom';

import DataGrid from './components/DataGrid';
import DialogBox from './components/DBBuyer';

import API from '../../../../helpers';

import { invoiceItemArrangedData, generateInvSerialNumber_alt } from '../utils';
import { _partyAddress, partyArrangedData } from '../../../../helpers/data';
import { fCurrency } from '../../../../utils/formatNumber';
import moment from 'moment';

moment.locale('id');

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
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = React.useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: 'PT. BSI Indonesia',
    address:
      'Jalan Albisindo Raya no 24, Kec. Kaliwungu, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 42133,
    phone_number: '(0291) 2381023'
  });

  const formik = useFormik({
    initialValues: {
      sales_order_id: '',
      sold_to: 0,
      invoice_date: ''
    },
    onSubmit: (values) => {
      let _data = { ...values, items };
      try {
        API.updateSalesInvoice(id, _data, (res) => {
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

  // Payment History
  const [paymentHistory, setPaymentHistory] = useState([]);

  // GET DATA from spesific id
  React.useEffect(() => {
    if (!id) return undefined;

    try {
      API.getASalesInvoice(id, '?invoice_type=2', (res) => {
        if (isUndefined(res)) return;
        if (!res.data) throw new Error('no data provided');
        else {
          setValues({
            invoice_id: res.data.id,
            po_number: generateInvSerialNumber_alt(res.data, 2),
            sold_to: res.data.sold_to.id,
            invoice_date: res.data.invoice_date,
            due_date: res.data.due_date,
            tax: res.data.tax,
            description: res.data.description
          });
          setPaymentHistory(res.data.payment_history);
          let _data = _partyAddress(res.data.party);
          setSelectedValueSO({
            name: _data.name,
            address: `${_data.street} ${_data.city} ${_data.province} ${_data.country}`,
            postal_code: _data.postal_code
          });
          setStatus(res.data?.status[0]?.invoice_status_type_id);
          setRowsInvoiceTerm(res.data?.terms);
          changeData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

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

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      API.getVendors(async (res) => {
        if (!res) return;
        else {
          let data = await partyArrangedData(res);
          setOptions(data);
        }
      });
    }

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

      setFieldValue(name, value.id);
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
      { field: 'total', type: 'number', headerName: 'Total', editable: false, flex: 1 }
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

  const changeData = (payload) => {
    const temp = invoiceItemArrangedData(payload.items);
    setItems(temp);
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

  /**
   * Handle Change Vendor Bills Status
   */

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmitCompletionStatus = () => {
    if (!status) {
      alert('Stop');
      return undefined;
    }
    try {
      API.insertInvoiceStatus(
        {
          invoice_id: id,
          invoice_status_type_id: status
        },
        function (res) {
          if (!res.success) throw new Error('Failed');
          alert('done');
        }
      );
    } catch (error) {
      alert(error);
    }
  };

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

  /**
   * Handling Data Grid for a InvoiceTerm BOM
   */

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const handleEditInvoiceTermRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;
        try {
          API.updateInvoiceTerm(editedIds, data, function (res) {
            if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
            else enqueueSnackbar('', { variant: 'failedAlert' });
          });
        } catch (error) {
          enqueueSnackbar('', { variant: 'failedAlert' });
        }
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleAddInvoiceTerm = () => {
    let a = {
      id: rowsInvoiceTerm.length + 1,
      invoice_id: id,
      invoice_item_id: null,
      term_description: 'contoh. Potongan',
      term_value: 0,
      value_type: 'Percentage'
    };
    try {
      API.insertInvoiceTerm(a, function (res) {
        if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
        else enqueueSnackbar('', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }

    handleUpdateInvoiceTerm();
  };

  const handleUpdateInvoiceTerm = () => {
    try {
      API.getInvoiceTermByInvoice(id, function (res) {
        if (!res) return;
        if (isEmpty(res.data)) throw new Error('failed to get data');
        else {
          console.log('here')
          setRowsInvoiceTerm(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Invoice Info" />

          <CardContent>
            <Grid container spacing={2} direction="row">
              <Grid item xs={6}>
                <TextField disabled fullWidth value={values.po_number} />
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
                    <Typography variant="h6"> Pembeli </Typography>
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
                <Divider orientation="vertical" variant="middle" flexItem />
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Penerima </Typography>
                    <Button disabled>Select</Button>
                  </SpaceBetweenBox>
                  <div>
                    <Typography variant="body1">{selectedValueSH.name}</Typography>
                    <Typography variant="body1">{selectedValueSH.address}</Typography>
                    <Typography variant="body1">{selectedValueSH.postal_code}</Typography>{' '}
                  </div>
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
            <Grid item xs={12}>
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
                      <Tab label="Vendor Bills Status" value="3" />
                      <Tab label="Terms" value="4" />
                      <Tab label="Payment History" value="5" />
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
                    <Stack direction="row" spacing={4} alignItems="center">
                      <FormControl fullWidth>
                        <InputLabel>Update Vendor Bills Status</InputLabel>
                        <Select value={status} label="Status" onChange={handleChangeStatus}>
                          <MenuItem value={4}>None</MenuItem>
                          <MenuItem value={1}>Paid</MenuItem>
                          <MenuItem value={2}>Unpaid</MenuItem>
                          <MenuItem value={3}>Partial</MenuItem>
                        </Select>
                      </FormControl>

                      <Button onClick={handleSubmitCompletionStatus}> Update </Button>
                    </Stack>
                  </TabPanel>

                  <TabPanel value="4">
                    <DataGrid
                      columns={columnsInvoiceTerm}
                      rows={rowsInvoiceTerm}
                      handleUpdateAllRows={handleUpdateInvoiceTerm}
                      handleAddRow={handleAddInvoiceTerm}
                      onEditRowsModelChange={handleEditInvoiceTermRowsModelChange}
                    />
                  </TabPanel>

                  <TabPanel value="5">
                    <Paper
                      style={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(17, 25, 39)',
                        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgb(242, 244, 247)',
                        backgroundImage: 'none',
                        overflow: 'hidden',
                        borderRadius: '20px'
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ padding: '12px 16px' }}
                      >
                        <Typography variant="h5">Tanggal</Typography>
                        <Typography variant="h5">Jumlah Uang</Typography>
                      </Stack>
                      <Divider />
                      {paymentHistory.map(function (item) {
                        return (
                          <>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              style={{ padding: '12px 16px', width: '100%' }}
                            >
                              <Typography variant="subtitle">
                                {moment(item.effective_date).format('LL')}
                              </Typography>
                              <Typography variant="subtitle">
                                {fCurrency(item.amount, 'idr')}
                              </Typography>
                            </Stack>
                          </>
                        );
                      })}
                    </Paper>
                  </TabPanel>
                </TabContext>
              </ColumnBox>
            </Grid>
          </CardContent>

          <CardContent>
            <Button
              fullWidth
              size="large"
              color="grey"
              variant="contained"
              onClick={() => navigate(`/dashboard/finance/vendor-bills/document/${id}`)}
              sx={{ m: 1 }}
            >
              Show Document
            </Button>
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
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}

export default Invoice;
