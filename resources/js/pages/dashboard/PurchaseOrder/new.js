import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputAdornment,
  Tab,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Grid,
  Select,
  MenuItem
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

import LoadingPage from '../../../components/LoadingPage';

// api
import API from '../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//Helpers
import {
  productFeatureArrangedData,
  productItemArrangedData,
  _partyAddress
} from '../../../helpers/data';

// Customs - Kepabean
// import { columnsBC } from './Kepabean/column';

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

  // Sales Order Items storage variable on Data Grid
  const [items, setItems] = useState([]);

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  // Enqueque

  const PurchaseOrderSchema = Yup.object().shape({
    quote_id: Yup.string().required('Quote References is required'),
    po_number: Yup.string().required('city is required'),
    issue_date: Yup.date().required('province is required'),
    valid_thru: Yup.date().required('city is required'),
    delivery_date: Yup.date().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      bought_from: '',
      ship_to: '',
      quote_id: '',
      po_number: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
      description: '',
      import_flag: false,
      tax: 0,
      currency_id: 2,
      document_number: 0,
      customs_document_date: ''
    },
    validationSchema: PurchaseOrderSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        order_items: items
      };

      try {
        API.insertPurchaseOrder(_data, function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }
      setSubmitting(false);
    }
  });

  useEffect(() => {
    let active = true;

    try {
      API.getQuoteByPO((res) => {
        if (!res) return;
        if (!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      });

      API.getProductFeature((res) => {
        if (!res) return;
        if (!res.data) {
          setOptionsP([]);
        } else {
          const data = productFeatureArrangedData(res.data);
          setOptionsP(data);
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
    setSubmitting,
    handleSubmit,
    setFieldValue,
    setValues,
    getFieldProps
  } = formik;

  function changeData(data) {
    const orderItem = data.quote_items.map(function (key, index) {
      const { id, product_id, name, size, color } = productItemArrangedData(key.product);
      return {
        id: index + 1,
        quote_item_id: key.id,
        product_id: product_id,
        product_feature_id: id,
        costing_item_id: key?.costing_item_id,
        name: name,
        size: size,
        color: color,
        item_name: `${name} ${size} - ${color}`,
        qty: key.qty,
        delivery_date: null,
        unit_price: key.unit_price,
        hs_code: 0,
        item_serial_number: 0,
        description: ''
      };
    });
    setValues({
      quote_id: data.id,
      po_number: data.po_number,
      sold_to: data.sold_to,
      ship_to: data.ship_to,
      issue_date: data.issue_date,
      valid_thru: data.valid_thru,
      import_flag: false,
      delivery_date: data.delivery_date,
      tax: data.tax,
      currency_id: data.currency_id
    });

    let _party = _partyAddress(data.party);
    let _ship = _partyAddress(data.ship);

    setSelectedValueSO(_party);
    setSelectedValueSH(_ship);
    setItems(orderItem);
  }

  const deleteData = useCallback((id) => () => {
    setItems((prevItems) => {
      const rowToDeleteIndex = id;
      return prevItems.filter((x) => x.id !== id);
    });
  });

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        function formatDate(date) {
          var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
        }

        //update items state
        setItems((prevItems) => {
          const itemToUpdateIndex = parseInt(editedIds[0]);

          return prevItems.map((row, index) => {
            if (row.id === parseInt(itemToUpdateIndex)) {
              if (editedColumnName === 'date') {
                return {
                  ...row,
                  [editedColumnName]: formatDate(editRowData[editedColumnName].value)
                };
              } else {
                return {
                  ...row,
                  [editedColumnName]: editRowData[editedColumnName].value
                };
              }
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

  const handleUpdateAllRows = () => {
    API.getARFQ(values.quote_id, function (res) {
      if (!res) alert('Something went wrong!');
      var temp = res.data.quote_items;
      temp = res.data.quote_items.map(function (_d) {
        return {
          id: index,
          RFQ_item_id: key.id,
          product_id: key.product.id,
          product_feature_id: key.product_feature_id,
          costing_item_id: key.costing_item_id,
          name: key.product.name,
          size: key.product.size,
          color: key.product.color,
          qty: key.qty,
          unit_price: key.unit_price,
          delivery_date: key.delivery_date,
          description: ''
        };
      });
      setItems(temp);
    });
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', type: 'number', editable: true },
      { field: 'unit_price', type: 'number', headerName: 'Unit Price', editable: true },
      { field: 'shipment_estimated', type: 'date', headerName: 'Delivery Date', editable: true },
      { field: 'description', headerName: 'Description', editable: true, width: 300 },
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

  const columnsBC = useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'hs_code', headerName: 'Kode HS', editable: true },
    {
      field: 'item_serial_number',
      headerName: 'Nomor Seri Barang',
      editable: true,
      width: '200'
    },
    { field: 'item_name', headerName: 'Name', width: 350, align: 'left' }
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

  // Radio
  const handleRadioChange = (event) => {
    setFieldValue('currency_id', event.target.value);
  };

  // Radio Import Activity
  // ----------------------------------------------------------------- //
  const [isImport, setIsImport] = useState(false);

  const handleRadioImportCheck = (e) => {
    if (e.target.value === 'true') {
      setIsImport(true);
      setFieldValue('import_flag', true);
    } else {
      setIsImport(false);
      setFieldValue('import_flag', false);
      if (valueTab === '4') setValueTab('1');
    }
  };
  // ----------------------------------------------------------------- //

  return (
    <Page>
      <Container>
        <Modal open={openM} handleClose={handleCloseModal} items={items} setItems={setItems} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingPage />
            ) : (
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
                          <AutoComplete
                            fullWidth
                            autoComplete="quote_id"
                            type="text"
                            label="No Quotation"
                            error={Boolean(touched.quote_id && errors.quote_id)}
                            helperText={touched.quote_id && errors.quote_id}
                            options={options}
                            setOpen={setOpen}
                            loading={loading}
                            changeData={changeData}
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
                                  <Typography variant="subtitle1">
                                    {selectedValueSO?.name}
                                  </Typography>
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
                                  <Typography variant="subtitle1">
                                    {selectedValueSH?.name}
                                  </Typography>
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
                                <TabList
                                  onChange={handleChangeTab}
                                  aria-label="lab API tabs example"
                                >
                                  <Tab label="Overview" value="1" />
                                  <Tab label="Description" value="2" />
                                  <Tab label="Finance" value="3" />
                                  <Tab label="Customs" value="4" disabled={!isImport} />
                                </TabList>
                              </Box>

                              <TabPanel value="1">
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
                                    rows={6}
                                    type="text"
                                    {...getFieldProps('description')}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                  />
                                </Stack>
                              </TabPanel>

                              <TabPanel value="3">
                                <Stack direction="column" spacing={4}>
                                  <FormControl sx={{ width: '25ch' }}>
                                    <FormLabel>Tax</FormLabel>
                                    <TextField
                                      autoComplete="tax"
                                      type="number"
                                      {...getFieldProps('tax')}
                                      error={Boolean(touched.tax && errors.tax)}
                                      helperText={touched.tax && errors.tax}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">%</InputAdornment>
                                        )
                                      }}
                                    />
                                  </FormControl>

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
                                </Stack>
                              </TabPanel>

                              <TabPanel value="4">
                                <Grid container direction="row" spacing={2}>
                                  <Grid item xs={4}>
                                    <FormControl>
                                      <FormLabel id="xx">Nomor Dokumen Kepabean</FormLabel>
                                      <TextField
                                        placeholder="13223XX"
                                        fullWidth
                                        autoComplete="document_number"
                                        type="text"
                                        {...getFieldProps('document_number')}
                                        error={Boolean(
                                          touched.document_number && errors.document_number
                                        )}
                                        helperText={
                                          touched.document_number && errors.document_number
                                        }
                                      />
                                    </FormControl>
                                  </Grid>

                                  <Grid item xs={4}>
                                    <FormControl>
                                      <FormLabel id="xx">Tanggal Dokumen Kepabean</FormLabel>
                                      <TextField
                                        type="date"
                                        placeholder="26-03-2023"
                                        fullWidth
                                        autoComplete="customs_document_date"
                                        {...getFieldProps('customs_document_date')}
                                        error={Boolean(
                                          touched.customs_document_date &&
                                            errors.customs_document_date
                                        )}
                                        helperText={
                                          touched.customs_document_date &&
                                          errors.customs_document_date
                                        }
                                      />
                                    </FormControl>
                                  </Grid>

                                  <Grid item xs={4}>
                                    <FormControl>
                                      <FormLabel id="xx">Jenis Dokumen Kepabean</FormLabel>
                                      <Select
                                        {...getFieldProps('customs_document_type')}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        error={Boolean(
                                          touched.customs_document_type &&
                                            errors.customs_document_type
                                        )}
                                        helperText={
                                          touched.customs_document_type &&
                                          errors.customs_document_type
                                        }
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>BC 2.0</MenuItem>
                                        <MenuItem value={2}>BC 2.4</MenuItem>
                                        <MenuItem value={3}>BC 2.5</MenuItem>
                                        <MenuItem value={4}>BC 2.8</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <DataGrid
                                      columns={columnsBC}
                                      rows={items}
                                      onEditRowsModelChange={handleEditRowsModelChange}
                                      handleUpdateAllRows={handleUpdateAllRows}
                                    />
                                  </Grid>
                                </Grid>
                              </TabPanel>
                            </TabContext>
                          </ColumnBox>
                        </Grid>
                        {/* End of .... */}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                {/* End of New */}

                {/* Button */}
                <Grid item xs={12}>
                  <Box sx={{ paddingTop: 2, px: 0, display: 'flex', justifyContent: 'end' }}>
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
            )}
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default SalesOrder;
