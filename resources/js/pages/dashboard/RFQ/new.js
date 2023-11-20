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
  Grid,
  InputAdornment,
  Tab,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { partyArrangedData } from '../../../helpers/data';
import { RFQSchema } from '../../../helpers/FormerSchema';
import { isEmpty, isNull } from 'lodash';

// Loading Page
import LoadingPage from '../../../components/LoadingPage';
import { enqueueSnackbar } from 'notistack';

import useCurrencyExchange from '../../../context/currency';

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

function RFQ() {
  // Option Inquiry
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSO || openM) && options.length === 0;
  const loading2 = openSH && options2.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([]);

  //Data Grid
  const [items, setItems] = useState([]);

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  // Contextual currency
  const { exchanger } = useCurrencyExchange();

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
      ship_to: '',
      bought_from: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
      tax: 0,
      currency_id: 2
    },
    validationSchema: RFQSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        quote_items: items,
        quote_type: 'PO'
      };

      try {
        API.insertRFQ(_data, function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    setFieldValue,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setValues,
    getFieldProps
  } = formik;

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
          if (!res) return;
          else {
            let data = await partyArrangedData(res);
            setOptions(data);
          }
        });
      } catch (e) {
        alert('error');
      }
    }

    return () => {
      active = false;
    };
  }, [loading]);

  // Preapre data from buyer
  React.useEffect(() => {
    let active = true;

    if (!loading2) {
      return undefined;
    }

    setOptions2([]);

    if (active) {
      try {
        API.getBuyers(async (res) => {
          if (!res) return;
          else {
            let data = await partyArrangedData(res);
            setOptions2(data);
          }
        });
      } catch (e) {
        alert('error');
      }
    }
    return () => {
      active = false;
    };
  }, [loading2]);

  // Dialog Box
  const handleClose = (name, value) => {
    if (name === 'bought_from') {
      setOpenSO(false);
      setSelectedValueSO(value);
    }
    if (name === 'ship_to') {
      setOpenSH(false);
      setSelectedValueSH(value);
    }
    setFieldValue(name, value.id);
    setOptions([]);
    setOptions2([]);
  };

  const deleteData = useCallback((id) => () => {
    const rowToDeleteIndex = id;
    let a = [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];

    a = a.map(function (x, index) {
      return { ...x, id: index };
    });

    setItems(a);
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
              if (isNull(row.costing_item_id)) {
                return { ...row, [editedColumnName]: editRowData[editedColumnName].value };
              }
              else if (
                editedColumnName === 'unit_price' &&
                editRowData[editedColumnName].value > parseFloat(row.unit_price) * 1.1
              ) {
                enqueueSnackbar(`Cannot more than ${row.unit_price}`, { variant: 'failedAlert' });
                return row;
              } else {
                return { ...row, [editedColumnName]: editRowData[editedColumnName].value };
              }
            } else {
              return row;
            }
          });
        });

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
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Purchase Re Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
      { field: 'unit_measurement', headerName: 'Satuan', editable: true },
      { field: 'unit_price', headerName: 'Unit Price', editable: true },
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

  // Populate
  const [populateState, setPopulateState] = useState({ y: '', z: 0, aa: 0 });
  const handlePopulate = () => {
    const { y, z, aa } = populateState;
    if (y === '' && z === 0) return;
    const res = items.map(function (x) {
      if (z !== 0) x = { ...x, qty: z };
      if (aa !== 0) x = { ...x, unit_price: aa };
      return x;
    });
    setItems(res);
  };

  const handleChangePopulate = (e) => {
    const { name, value } = e.target;
    if (name === 'z') setPopulateState({ ...populateState, z: value });
    if (name === 'aa') setPopulateState({ ...populateState, aa: value });
    else return;
  };

  // Radio
  const handleRadioChange = (event) => {
    setFieldValue('currency_id', event.target.value);
  };

  React.useEffect(() => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.currency_id !== values.currency_id) {
          let current_value = item.unit_price;
          let initialCurrency = item.currency_id === 1 ? 'usd' : 'idr';
          let convertedCurrency = parseInt(values.currency_id) === 1 ? 'usd' : 'idr';
          let converted_val = exchanger(current_value, initialCurrency, convertedCurrency);
          return { ...item, unit_price: converted_val };
        }
      });
    });
  }, [values.currency_id]);

  return (
    <Page>
      <Container>
        <Modal
          payload={items}
          open={openM}
          handleClose={handleCloseModal}
          items={items}
          currency={values.currency_id}
          setItems={setItems}
        />

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {isSubmitting ? (
              <LoadingPage />
            ) : (
              <Card>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={4}>
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
                    <Grid item xs={8}>
                      <Paper>
                        <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                          <ColumnBox>
                            <SpaceBetweenBox>
                              <Typography variant="h6"> Supplier </Typography>
                              <Button onClick={() => setOpenSO(true)}>Select</Button>
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
                            <DialogBox
                              options={options}
                              loading={loading}
                              error={Boolean(touched.bought_from && errors.bought_from)}
                              helperText={touched.bought_from && errors.bought_from}
                              selectedValue={selectedValueSO}
                              open={openSO}
                              onClose={(value) => handleClose('bought_from', value)}
                            />
                          </ColumnBox>
                          <Divider orientation="vertical" variant="middle" flexItem />
                          <ColumnBox>
                            <SpaceBetweenBox>
                              <Typography variant="h6"> Penerima </Typography>
                              <Button onClick={() => setOpenSH(true)}>Select</Button>
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
                            <DialogBox
                              options={options2}
                              loading={loading}
                              error={Boolean(touched.ship_to && errors.ship_to)}
                              helperText={touched.ship_to && errors.ship_to}
                              selectedValue={selectedValueSH}
                              open={openSH}
                              onClose={(value) => handleClose('ship_to', value)}
                            />
                          </ColumnBox>
                        </Stack>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                      <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} pt={2} pl={2} pr={2}>
                          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Overview" value="1" />
                            <Tab label="Finance" value="2" />
                          </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ paddingTop: '8px', paddingBottom: '8px' }}>
                          <Stack direction="row" spacing={1}>
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
                            <Button onClick={handlePopulate}>Populate</Button>
                          </Stack>

                          <DataGrid
                            columns={columns}
                            rows={items}
                            onEditRowsModelChange={handleEditRowsModelChange}
                            handleAddRow={handleOpenModal}
                            handleReset={handleResetRows}
                            handleUpdateAllRows={false}
                          />
                        </TabPanel>

                        <TabPanel value="2" sx={{ paddingTop: 'unset' }}>
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
                                  endAdornment: <InputAdornment position="end">%</InputAdornment>
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
                                <FormControlLabel value={2} control={<Radio />} label="Rupiah" />
                              </RadioGroup>
                            </FormControl>
                          </Stack>
                        </TabPanel>
                      </TabContext>
                    </Grid>
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

export default RFQ;
