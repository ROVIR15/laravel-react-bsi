import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../components/Page';
import {
  Autocomplete,
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
  Grid
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
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

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//Helpers
import { _partyAddress, productItemArrangedData } from '../../../helpers/data';
import { enqueueSnackbar } from 'notistack';

import LoadingPage from '../../../components/LoadingPage';
import { UploadPaper } from './components/UploadPaper';
import { isString, isUndefined } from 'lodash';

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

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const SalesOrderSchema = Yup.object().shape({
    quote_id: Yup.string().required('Quote References is required'),
    po_number: Yup.string().required('city is required'),
    issue_date: Yup.date().required('province is required'),
    valid_thru: Yup.date().required('city is required'),
    delivery_date: Yup.date().required('province is required'),
    costing_id: Yup.number().required('Must be filled!')
  });

  const formik = useFormik({
    initialValues: {
      nomor_po: '0',
      tanggal_po: '2023-01-01',
      sold_to: '',
      ship_to: '',
      quote_id: '',
      po_number: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
      export_flag: false,
      tax: 0,
      currency_id: 2,
      costing_id: null
    },
    validationSchema: SalesOrderSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        imageUrl: _link,
        order_items: items
      };

      try {
        API.insertSalesOrder(_data, function (res) {
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
      API.getQuoteBySO('', (res) => {
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
    setSubmitting,
    handleSubmit,
    setFieldValue,
    setValues,
    getFieldProps,
    handleReset
  } = formik;

  function changeData(data) {
    const orderItem = data.quote_items.map(function (key, index) {
      const { id, product_id, name, size, color } = productItemArrangedData(key.product);
      return {
        product_feature_id: id,
        id: index + 1,
        quote_item_id: key.id,
        product_id: product_id,
        name: name,
        size: size,
        color: color,
        qty: key.qty,
        shipment_estimated: null,
        unit_price: key.unit_price,
        description: ''
      };
    });
    setValues({
      quote_id: data.id,
      po_number: data.po_number,
      tax: data.tax,
      currency_id: data.currency_id,
      sold_to: data.sold_to,
      ship_to: data.ship_to,
      issue_date: data.issue_date,
      valid_thru: data.valid_thru,
      export_flag: false,
      delivery_date: data.delivery_date
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
      return [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];
    });
  });

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

  const handleUpdateAllRows = () => {
    API.getAQuote(values.quote_id, function (res) {
      if (!res) alert('Something went wrong!');
      var temp = res.data.quote_items;
      temp = res.data.quote_items.map(function (_d) {
        return {
          id: index,
          quote_item_id: key.id,
          product_id: key.product.id,
          product_feature_id: key.product_feature_id,
          name: key.product.name,
          size: key.product.size,
          color: key.product.color,
          qty: key.qty,
          shipment_estimated: null,
          unit_price: key.unit_price
        };
      });
      setItems(temp);
    });
  };

  const [populateState, setPopulateState] = useState({ y: '', z: 0, aa: 0, bb: 0 });
  const handlePopulate = () => {
    const { y, z, aa, bb } = populateState;
    if (y === '' && z === 0) return;
    const res = items.map(function (x) {
      if (y !== '') x = { ...x, shipment_estimated: y };
      if (z !== 0) x = { ...x, qty: z };
      if (bb !== 0) x = { ...x, cm_price: bb };
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
    if (name === 'bb') setPopulateState({ ...populateState, bb: value });
    else return;
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'name', headerName: 'Name', width: 350, editable: false },
      { field: 'size', headerName: 'Size', editable: false },
      { field: 'color', headerName: 'Color', editable: false },
      { field: 'qty', headerName: 'Quantity', type: 'number', editable: true },
      { field: 'unit_price', type: 'number', headerName: 'Unit Price', editable: true },
      { field: 'cm_price', type: 'number', headerName: 'CM Price', editable: true },
      {
        field: 'shipment_estimated',
        type: 'date',
        headerName: 'Shipment Estimated',
        editable: true
      },
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

  // Radio
  const handleRadioChange = (event) => {
    setFieldValue('currency_id', event.target.value);
  };

  // Radio Import Activity
  // ----------------------------------------------------------------- //
  const [isExport, setIsExport] = useState(false);

  const handleRadioExportCheck = (e) => {
    if (e.target.value === 'true') {
      setIsExport(true);
      setFieldValue('export_flag', true);
    } else {
      setIsExport(false);
      setFieldValue('export_flag', false);
      if (valueTab === '4') setValueTab('1');
    }
  };

  // ----------------------------------------------------------------- //
  // Upload file area
  // ----------------------------------------------------------------- //

  const [file, setFile] = useState(null);
  const [_link, _setLink] = useState(null);
  const [dragging, setDragging] = useState(false);

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
      API.uploadSalesOrderImage(formData, function (res) {
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
                accept="image/*"
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
              accept="image/*"
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
  // ----------------------------------------------------------------- //

  //Costing Option
  const [optionsCosting, setOptionsCosting] = React.useState([]);
  const loadingCosting = optionsCosting.length === 0;

  const [choosen, setChoosen] = React.useState();

  const handleAutoComplete = (value) => {
    let val = value.split('-')[0];
    if (!isUndefined(val) && val !== 'undefined') {
      let val = value.split('-')[0];
      setFieldValue('costing_id', parseInt(val));
      setChoosen(parseInt(val));
    }
  };

  React.useEffect(() => {
    let active = true;

    if (!loadingCosting) {
      return undefined;
    }

    if (optionsCosting.length > 0 || optionsCosting.length != 0) return;
    else {
      try {
        API.getCostingList(function (res) {
          if (!res.length) return;
          else {
            let _data = res.map(function (item) {
              return {
                id: item?.id,
                name: item?.name
              };
            });
            setOptionsCosting(_data);
          }
        });
      } catch (error) {
        alert('error');
      }
    }

    return () => {
      active = false;
    };
  }, [loadingCosting]);

  return (
    <Page>
      <Container>
        <Modal
          items={items}
          setItems={setItems}
          open={openM}
          options={optionsP}
          handleClose={handleCloseModal}
          setComponent={setItems}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingPage />
            ) : (
              <Card>
                {/* Quotation List and "Pembeli and Penerima Selection" */}
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={4}>
                      <Stack direction="column" spacing={2}>
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

                        <Autocomplete
                          fullWidth
                          disablePortal
                          onInputChange={(event, newInputValue) => {
                            handleAutoComplete(newInputValue);
                          }}
                          value={choosen}
                          options={optionsCosting}
                          isOptionEqualToValue={(option, value) => {
                            return option.id === value;
                          }}
                          getOptionLabel={(option) => `${option.id}-${option.name}`}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              error={Boolean(touched.costing_id && errors.costing_id)}
                              helperText={touched.costing_id && errors.costing_id}
                              {...params}
                            />
                          )}
                        />
                      </Stack>
                    </Grid>

                    {/* Pembeli dan Penerima */}
                    <Grid item xs={8}>
                      <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Pembeli </Typography>
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
                        <FormLabel id="Improt">Ekspor</FormLabel>
                        <RadioGroup
                          row
                          value={isExport}
                          name="import-activity-check"
                          onChange={handleRadioExportCheck}
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
                          borderRadius: '8px',
                          minHeight: '42em'
                        }}
                      >
                        <TabContext value={valueTab}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                              <Tab label="Overview" value="1" />
                              <Tab label="Finance" value="2" />
                              <Tab label="Attachment Official PO" value="3" />
                            </TabList>
                          </Box>

                          <TabPanel
                            value="1"
                            sx={{
                              paddingBottom: 'unset',
                              paddingLeft: 'unset',
                              paddingRight: 'unset',
                              paddingTop: '12px'
                            }}
                          >
                            <Stack direction="row" spacing={4}>
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
                              <TextField
                                type="number"
                                label="CM Price"
                                name="bb"
                                value={populateState.bb}
                                onChange={handleChangePopulate}
                              />
                              <Button onClick={handlePopulate}>Populate</Button>
                            </Stack>
                            {/* Populate */}

                            <DataGrid
                              columns={columns}
                              rows={items}
                              onEditRowsModelChange={handleEditRowsModelChange}
                              handleUpdateAllRows={handleUpdateAllRows}
                              handleAddRow={handleOpenModal}
                              sx={{ marginTop: '12px' }}
                            />
                          </TabPanel>

                          <TabPanel value="2" sx={{ padding: 'unset' }}>
                            <CardContent>
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
                            </CardContent>
                          </TabPanel>

                          <TabPanel value="3" sx={{ padding: 'unset' }}>
                            <Box p={2}>
                              <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                  <Stack direction="row" spacing={2}>
                                    <TextField
                                      fullWidth
                                      autoComplete="tanggal_po"
                                      type="date"
                                      label="Tanggal Rilis PO Buyer Resmi"
                                      {...getFieldProps('tanggal_po')}
                                      error={Boolean(touched.tanggal_po && errors.tanggal_po)}
                                      helperText={touched.tanggal_po && errors.tanggal_po}
                                    />
                                    <TextField
                                      fullWidth
                                      autoComplete="nomor_po"
                                      type="text"
                                      label="Nomor PO Buyer Resmi"
                                      {...getFieldProps('nomor_po')}
                                      error={Boolean(touched.nomor_po && errors.nomor_po)}
                                      helperText={touched.nomor_po && errors.nomor_po}
                                    />
                                  </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                  <ShowImageWhenItsUploaded />
                                </Grid>
                              </Grid>
                            </Box>
                          </TabPanel>
                        </TabContext>
                      </ColumnBox>
                    </Grid>
                    {/* End of .... */}
                  </Grid>
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
            )}
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default SalesOrder;
