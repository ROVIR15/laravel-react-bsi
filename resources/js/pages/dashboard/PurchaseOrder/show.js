import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  MenuItem,
  Table,
  TableRow,
  TableCell,
  Tab,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Button,
  Grid
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

import useAuth from '../../../context';
import moment from 'moment';

// api
import API from '../../../helpers';

//Component
import DataGrid from '../../../components/DataGrid';
import Modal from './components/Modal';
import ModalGenerateVendorBills from './components/ModalGenerateVendorBills';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { PurchaseOrderSchema } from '../../../helpers/FormerSchema';
import { _partyAddress } from '../../../helpers/data';
import { isArray, isEmpty } from 'lodash';
import { generateInvSerialNumber_alt } from '../../dashboard/Finance/utils';
import { fCurrency } from '../../../utils/formatNumber';
import LoadingPage from '../../../components/LoadingPage';

// Snackbar
import { enqueueSnackbar } from 'notistack';

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

function SalesOrder() {
  const { id } = useParams();
  const { user } = useAuth();

  // Option for Quote
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([]);

  //AutoComplete
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  //Data Grid
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // invoice
  const [generatedInvoice, setGeneratedInvoice] = useState([]);

  // Sales Order Items storage variable on Data Grid
  const [items, setItems] = useState([]);

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      order_id: '',
      bought_from: '',
      ship_to: '',
      po_number: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
      document_number: 0,
      customs_document_date: '',
      customs_document_type: 0
    },
    validationSchema: PurchaseOrderSchema,
    onSubmit: (values) => {
      try {
        API.updatePurchaseOrder(id, values, function (res) {
          if (!res) return undefined;
          if (!res.success) throw new Error('failed');
          else alert('update success');
        });
      } catch (error) {
        alert(error);
      }
      setSubmitting(false);
    }
  });

  useEffect(async () => {
    if (!id) return;
    const load = await axios
      .get(process.env.MIX_API_URL + '/purchase-order' + `/${id}`)
      .then(function ({ data: { data } }) {
        return data;
      })
      .catch((error) => {
        alert(error);
      });

    setValues({
      id: load.id,
      quote_id: load?.order?.quote_id,
      order_id: load.order_id,
      po_number: load.po_number,
      bought_from: load.bought_from.id,
      ship_to: load.ship_to.id,
      issue_date: load.issue_date,
      valid_thru: load.valid_thru,
      delivery_date: load.delivery_date,
      import_flag: Boolean(load?.import_flag),
      currency_id: load.order.currency_id,
      import_flag: load?.import_flag
    });

    setIsImport(Boolean(load?.import_flag));
    setDescription(load.order.description);
    setTax(load.order.tax);

    let ras;
    if (load.order?.currency_id === 1) ras = 'usd';
    else ras = 'idr';

    setCurrency(ras);
    let _bought_from = _partyAddress(load.bought_from);
    let _ship_to = _partyAddress(load.ship_to);
    setSelectedValueSO(_bought_from);
    setSelectedValueSH(_ship_to);

    var c = load.order_item.map((key) => {
      const { product_feature } = key;
      return {
        ...product_feature,
        costing_item_id: key.costing_item_id,
        product_id: product_feature.product_id,
        product_feature_id: product_feature.id,
        id: key.id,
        name: product_feature?.product?.goods
          ? product_feature?.product?.goods?.name
          : product_feature?.product?.service?.name,
        item_name: `${
          product_feature?.product?.goods
            ? product_feature?.product?.goods?.name
            : product_feature?.product?.service?.name
        } ${product_feature?.size} - ${product_feature?.color}`,
        shipment_estimated: new Date(key.shipment_estimated),
        total_shipped: key.shipment_item[0]?.total_qty_received,
        description: key.description,
        hs_code: key?.import_info?.hs_code,
        item_serial_number: key?.import_info?.item_serial_number,
        ...key
      };
    });
    // store data transfromation of order item into items state
    setItems(c);

    // simplify the data into desired Array Object
    const _inv = load.invoice?.map(function (item) {
      let payment_history = {};
      if (isEmpty(item.payment_history)) payment_history = { paid_amount: 0, payment_number: 0 };
      payment_history = item.payment_history?.reduce(
        function (initial, next) {
          return {
            paid_amount: initial.paid_amount + parseFloat(next.amount),
            payment_number: initial.payment_number++
          };
        },
        { paid_amount: 0, payment_number: 0 }
      );

      let status_of_inv =
        payment_history.paid_amount >= item?.sum[0]?.total_amount ? 'Paid' : 'Unpaid';

      return {
        id: item.id, // invoice_id
        effective_date: item?.effective_date,
        serial_number: generateInvSerialNumber_alt(item, 2),
        qty: item?.sum[0]?.total_qty,
        total_amount: item?.sum[0]?.total_amount,
        payment_history,
        status_of_inv
      };
    });

    setGeneratedInvoice(_inv);
  }, [id]);

  useEffect(() => {
    let active = true;

    try {
      API.getProductFeature((res) => {
        if (!res) return;
        if (!res.data) {
          setOptionsP([]);
        } else {
          setOptionsP(res.data);
        }
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }

    return () => {
      active = false;
    };
  }, [loading]);

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    setValues,
    getFieldProps,
    setFieldValue
  } = formik;

  const deleteData = useCallback((id) => () => {
    setItems((prevItems) => {
      const rowToDeleteIndex = id;
      return filter.map((x) => x.id !== id);
    });

    try {
      API.deleteSalesOrderItem(id, (res) => {
        if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
        else enqueueSnackbar('', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }

    handleUpdateAllRows();
  });

  const postIncomingGoods = (order_id) => {
    try {
      API.postIncomingGoods({ id: order_id, user_id: user?.id }, function (res) {
        if (res.success) enqueueSnackbar('Successfully created incoming shipment!', { variant: 'successAlert' });
        else enqueueSnackbar('WTF', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();

        function formatDate(date) {
          var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
        }

        switch (editedColumnName) {
          case 'shipment_estimated':
            let date = formatDate(editRowData[editedColumnName].value);
            data[editedColumnName] = date;
            break;

          default:
            data[editedColumnName] = editRowData[editedColumnName].value;
            break;
        }
        // update on firebase
        API.updatePurchaseOrderItem(editedIds, data, function (res) {
          alert(JSON.stringify(res));
        });
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = async () => {
    const load2 = await axios
      .get(process.env.MIX_API_URL + '/order-item' + `/${values.order_id}`)
      .then(function ({ data: { data } }) {
        return data;
      });

    var c = load2.map((key) => {
      const { product_feature } = key;
      return {
        ...product_feature,
        product_feature_id: product_feature.id,
        costing_item_id: key?.costing_item_id,
        id: key.id,
        name: product_feature?.product?.goods
          ? product_feature?.product?.goods?.name
          : product_feature?.product?.service?.name,
        item_name: `${
          product_feature?.product?.goods
            ? product_feature?.product?.goods?.name
            : product_feature?.product?.service?.name
        } ${product_feature?.size} - ${product_feature?.color}`,
        shipment_estimated: new Date(key.shipment_estimated),
        total_shipped: key.shipment_item[0]?.total_qty_received,
        description: key.description,
        ...key
      };
    });
    setItems(c);
  };

  const editableUser = user.id !== 2 ? true : false;
  const roles = !isEmpty(user) ? user?.role : [];
  const editableCondition = isArray(roles) ? (roles.some(function (item) {
    return (item.name === 'purchase-order' && item.review);
  })) : false;

  const columns = useMemo(
    () => [
      { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
      { field: 'product_feature_id', headerName: 'Variant ID', editable: true },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
      { field: 'unit_price', headerName: 'Unit Price', editable: editableUser || editableCondition },
      { field: 'shipment_estimated', headerName: 'Est. Estimated', type: 'date', editable: true },
      { field: 'description', headerName: 'Description', type: 'text', width: 400, editable: true },
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

  const columnShipment = useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'item_name', headerName: 'Name', width: 350, editable: false },
    { field: 'qty', headerName: 'Quantity', editable: true },
    { field: 'total_shipped', headerName: 'Qty Terkirim', editable: true }
  ]);

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  /**
   * Populate State
   */

  const [populateState, setPopulateState] = useState({ y: '', z: 0, aa: 0 });
  const handlePopulate = () => {
    const { y, z, aa } = populateState;
    if (y === '' && z === 0) return;
    const res = items.map(function (x) {
      if (y !== '') x = { ...x, shipment_estimated: y };
      if (z !== 0) x = { ...x, qty: z };
      if (aa !== 0) x = { ...x, unit_price: aa };
      return x;
    });
    setItems(res);
  };

  const handleChangePopulate = (e) => {
    const { name, value } = e.target;
    if (name === 'z') setPopulateState({ ...populateState, z: value });
    if (name === 'y') setPopulateState({ ...populateState, y: value });
    if (name === 'aa') setPopulateState({ ...populateState, aa: value });
    else return;
  };

  /**
   * description
   */
  const [description, setDescription] = useState('');

  const handleUpdateDesc = () => {
    try {
      if (isEmpty(description)) throw new Error('description is zero');
      API.updateOrder(values.order_id, { description }, function (res) {
        if (!res) return;
        if (res.success) alert('success');
        else throw new Error('error occured failed store data');
      });
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Tax
   */
  const [tax, setTax] = useState('');
  const [currency, setCurrency] = useState('');

  const handleUpdateTax = () => {
    try {
      API.updateOrder(values.order_id, { tax, currency_id: values.currency_id }, function (res) {
        if (!res) return;
        if (res.success) alert('success');
        else throw new Error('error occured failed store data');
      });
    } catch (error) {
      alert(error);
    }
  };

  // Radio
  //-------------------------------------------------------//
  const handleRadioChange = (event) => {
    if (event.target.value === 1) setCurrency('usd');
    else setCurrency('idr');
    setFieldValue('currency_id', event.target.value);
  };
  //-------------------------------------------------------//

  // Radio Import Activity
  //-------------------------------------------------------//
  const [isImport, setIsImport] = useState(false);

  const handleRadioImportCheck = (e) => {
    if (e.target.value === 'true') {
      setIsImport(true);
    } else {
      setIsImport(false);
      if (valueTab === '6') setValueTab('1');
    }
  };
  //-------------------------------------------------------//

  //-------------------------------------------------------//
  const [orderId, setOrderId] = useState(0);
  const [openGenerateVendorBillsModal, setOpenGenerateVendorBillsModal] = useState(false);
  //-------------------------------------------------------//

  return (
    <Page>
      <Container>
        <Modal
          payload={items}
          open={openM}
          handleClose={handleCloseModal}
          items={items}
          setItems={setItems}
          order_id={values.order_id}
          update={handleUpdateAllRows}
        />
        <ModalGenerateVendorBills
          order_id={orderId}
          open={openGenerateVendorBillsModal}
          handleClose={() => setOpenGenerateVendorBillsModal(false)}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {
              isSubmitting ? (<LoadingPage/>) : (
                <Grid container column spacing={1}>
                {/* New */}
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="Purchase Order" />
                    <CardContent>
                      {/* Quotation List and "Pembeli and Penerima Selection" */}
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={4}>
                          {/* Quotation */}
                          <TextField
                            fullWidth
                            autoComplete="po_number"
                            type="text"
                            label="Referenced Quote"
                            {...getFieldProps('po_number')}
                            error={Boolean(touched.po_number && errors.po_number)}
                            helperText={touched.po_number && errors.po_number}
                            disabled={false}
                          />
                        </Grid>
  
                        {/* Pembeli dan Penerima */}
                        <Grid item xs={8}>
                          <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                            <ColumnBox>
                              <SpaceBetweenBox>
                                <Typography variant="h6"> Supplier </Typography>
                                <Button disabled>Select</Button>
                              </SpaceBetweenBox>
                              {selectedValueSO?.name ? (
                                <div>
                                  <Typography variant="subtitle1">{selectedValueSO?.name}</Typography>
                                  <Typography component="span" variant="caption">
                                    {selectedValueSO?.street}
                                  </Typography>
                                  <Typography variant="body2">{`${selectedValueSO?.city}, ${selectedValueSO?.province}, ${selectedValueSO.country}`}</Typography>
                                </div>
                              ) : null}
                            </ColumnBox>
                            <Divider orientation="vertical" variant="middle" flexItem />
                            <ColumnBox>
                              <SpaceBetweenBox>
                                <Typography variant="h6"> Penerima </Typography>
                                <Button disabled>Select</Button>
                              </SpaceBetweenBox>
                              {selectedValueSH?.name ? (
                                <div>
                                  <Typography variant="subtitle1">{selectedValueSH?.name}</Typography>
                                  <Typography component="span" variant="caption">
                                    {selectedValueSH?.street}
                                  </Typography>
                                  <Typography variant="body2">{`${selectedValueSH?.city}, ${selectedValueSH?.province}, ${selectedValueSH.country}`}</Typography>
                                </div>
                              ) : null}
                            </ColumnBox>
                          </Stack>
                        </Grid>
                        {/* End of Quotation and "Pembeli and Penerima" Section */}
                        <Divider variant="middle" style={{ width: 'inherit', margin: 0 }} />
  
                        <Grid item xs={10}>
                          {/* Issue Date, Valid Thru and Delivery Date */}
                          <ColumnBox
                            style={{
                              padding: '1em 0.75em',
                              border: '1px dashed #b8b8b8',
                              borderRadius: '8px',
                              background: '#b6b6b62b'
                            }}
                          >
                            <Stack direction="row" spacing={2}>
                              <TextField
                                fullWidth
                                autoComplete="issue_date"
                                type="date"
                                placeholder="valid"
                                label="Diterbitkan"
                                {...getFieldProps('issue_date')}
                                error={Boolean(touched.issue_date && errors.issue_date)}
                                helperText={touched.issue_date && errors.issue_date}
                              />
                              <TextField
                                fullWidth
                                autoComplete="valid_thru"
                                type="date"
                                label="Valid to"
                                placeholder="valid"
                                {...getFieldProps('valid_thru')}
                                error={Boolean(touched.valid_thru && errors.valid_thru)}
                                helperText={touched.valid_thru && errors.valid_thru}
                              />
                              <TextField
                                fullWidth
                                autoComplete="delivery_date"
                                type="date"
                                label="Tanggal Pengiriman"
                                {...getFieldProps('delivery_date')}
                                error={Boolean(touched.delivery_date && errors.delivery_date)}
                                helperText={touched.delivery_date && errors.delivery_date}
                              />
                            </Stack>
                          </ColumnBox>
                        </Grid>
  
                        <Grid item xs={2}>
                          <FormControl>
                            <FormLabel id="Improt">Import</FormLabel>
                            <RadioGroup
                              row
                              value={isImport}
                              name="import-activity-check"
                              onChange={handleRadioImportCheck}
                            >
                              <FormControlLabel value={'true'} control={<Radio />} label="Ya" />
                              <FormControlLabel value={'false'} control={<Radio />} label="Tidak" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
  
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
                                  <Tab label="Overview" value="1" />
                                  <Tab label="Description" value="2" />
                                  <Tab label="Shipment Tracking" value="3" />
                                  <Tab label="Finance" value="4" />
                                  <Tab label="Invoice List" value="5" />
                                </TabList>
                              </Box>
  
                              <TabPanel value="1">
                                <Stack direction="column" spacing={2}>
                                  <Stack direction="row">
                                    <TextField
                                      type="number"
                                      label="Qty"
                                      name="z"
                                      value={populateState.z}
                                      onChange={handleChangePopulate}
                                    />
                                    <TextField
                                      type="number"
                                      label="Harga Barang"
                                      name="aa"
                                      value={populateState.aa}
                                      onChange={handleChangePopulate}
                                    />
                                    <TextField
                                      type="date"
                                      label="Tanggal Kirim"
                                      name="y"
                                      value={populateState.y}
                                      onChange={handleChangePopulate}
                                    />
                                    <Button onClick={handlePopulate}>Populate</Button>
                                  </Stack>
                                </Stack>
  
                                <DataGrid
                                  columns={columns}
                                  rows={items}
                                  onEditRowsModelChange={handleEditRowsModelChange}
                                  handleUpdateAllRows={handleUpdateAllRows}
                                  handleAddRow={handleOpenModal}
                                />
                              </TabPanel>
  
                              <TabPanel value="2">
                                <Stack direction="row" alignItems="center">
                                  <TextField
                                    fullWidth
                                    multiline
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    rows={6}
                                    type="text"
                                  />
                                </Stack>
                                <Button onClick={handleUpdateDesc} variant="outlined">
                                  Save
                                </Button>
                              </TabPanel>
  
                              <TabPanel value="3">
                                <DataGrid columns={columnShipment} rows={items} />
                              </TabPanel>
  
                              <TabPanel value="4">
                                <Stack direction="column" spacing={2}>
                                  <Stack direction="row" spacing={4} alignItems="center">
                                    <Typography variant="body1">Tax</Typography>
                                    <TextField
                                      autoComplete="tax"
                                      type="number"
                                      value={tax}
                                      onChange={(event) => setTax(event.target.value)}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">%</InputAdornment>
                                        )
                                      }}
                                    />
                                  </Stack>
  
                                  <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                      Select Currency
                                    </FormLabel>
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                      onChange={handleRadioChange}
                                      value={values.currency_id}
                                    >
                                      <FormControlLabel value={1} control={<Radio />} label="USD" />
                                      <FormControlLabel
                                        value={2}
                                        control={<Radio />}
                                        label="Rupiah"
                                      />
                                    </RadioGroup>
                                  </FormControl>
  
                                  <Button
                                    onClick={handleUpdateTax}
                                    variant="outlined"
                                    sx={{ width: '25ch' }}
                                  >
                                    Save
                                  </Button>
                                </Stack>
                              </TabPanel>
  
                              <TabPanel value="5">
                                <Table>
                                  <TableRow>
                                    <TableCell>
                                      <Typography variant="h6">Tanggal</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nomor Invoice</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Qty</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Jumlah Uang</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Jumlah Bayar</Typography>
                                    </TableCell>
                                  </TableRow>
                                  {generatedInvoice.map(function (item) {
                                    return (
                                      <TableRow>
                                        <TableCell variant="subtitle">
                                          {moment(item.effective_date).format('LL')}
                                        </TableCell>
                                        <TableCell
                                          variant="subtitle"
                                          component={RouterLink}
                                          to={`/dashboard/finance/vendor-bills/${item.id}`}
                                        >
                                          {item.serial_number}
                                        </TableCell>
                                        <TableCell variant="subtitle">{item.qty}</TableCell>
                                        <TableCell variant="subtitle">
                                          {fCurrency(item.total_amount * 1.11, 'idr')}
                                        </TableCell>
                                        <TableCell>
                                          {fCurrency(item.payment_history?.paid_amount)}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                                </Table>
                              </TabPanel>
                            </TabContext>
                          </ColumnBox>
                        </Grid>
                        {/* END Tab */}
  
                        {/* Button */}
                        <Grid item xs={12}>
                          <Box sx={{ paddingTop: 2, px: 0, display: 'flex', justifyContent: 'end' }}>
                            <Button
                              size="large"
                              color="grey"
                              variant="contained"
                              sx={{ m: 1 }}
                              onClick={() => {
                                setOrderId(values?.order_id);
                                setOpenGenerateVendorBillsModal(true);
                              }}
                            >
                              Post Vendor Bills
                            </Button>
                            <Button
                              size="large"
                              color="grey"
                              variant="contained"
                              sx={{ m: 1 }}
                              onClick={() => postIncomingGoods(values?.order_id)}
                            >
                              Post Incoming Goods
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
                            <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>  
              )
            }
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default SalesOrder;
