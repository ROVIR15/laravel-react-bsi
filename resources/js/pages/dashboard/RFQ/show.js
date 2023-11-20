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
  Radio,
  RadioGroup,
  Paper,
  Stack,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { GridActionsCellItem } from '@mui/x-data-grid';

import LoadingPage from '../../../components/LoadingPage';

// api
import API from '../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//helpers
import { _partyAddress, partyArrangedData, productItemArrangedData } from '../../../helpers/data';
import { RFQSchema } from '../../../helpers/FormerSchema';
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

function RFQ() {
  const { id } = useParams();

  // Option Inquiry
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSO || openSH || openM) && options.length === 0;
  const loading2 = openSH && options2.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  //Data Grid
  const [items, setItems] = useState([]);

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

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

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
      ship_to: '',
      bought_from: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: ''
    },
    validationSchema: RFQSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        party_id: values.bought_from
      };
      try {
        API.updateQuote(id, _data, function (res) {
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
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setFieldValue,
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
  };

  const deleteData = useCallback((id) => () => {
    // API.deleteQuoteItem(id, function(res){
    //   if(res.success) alert('success');
    //   else alert('failed')
    // })

    // handleUpdateAllRows();
    alert('this feature no longer active');
  });

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;

        try {
          API.updateQuoteItem(editedIds, data, function (res) {
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

  const handleUpdateAllRows = () => {
    API.getAQuote(id, function (res) {
      if (!res) alert('Something went wrong!');
      var temp = res.data.quote_items;
      temp = res.data.quote_items.map(function (key, index) {
        const { id, sku_id, product_id, name, size, color } = productItemArrangedData(key.product);
        return {
          id: key.id,
          sku_id: sku_id,
          inquiry_item_id: key?.request_item_id,
          product_id: product_id,
          product_feature_id: key.product_feature_id,
          costing_item_id: key.costing_item_id,
          name: name,
          size: size,
          color: color,
          item_name: `${name} ${size} - ${color}`,
          qty: key.qty,
          unit_price: key.unit_price
        };
      });
      setItems(temp);
    });
  };

  const columns = useMemo(
    () => [
      { field: 'sku_id', headerName: 'SKU ID', width: 150, editable: false},
      // { field: 'product_feature_id', headerName: 'Variant ID', editable: true },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', editable: false },
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

  useEffect(() => {
    if (!id) return;
    API.getAQuote(id, function (res) {
      if (!res.data) alert('Something went wrong!');
      const quoteItem = res.data.quote_items.map(function (key, index) {
        const { id, sku_id, product_id, name, size, color } = productItemArrangedData(key.product);
        return {
          id: key.id,
          sku_id: sku_id,
          inquiry_item_id: key?.request_item_id,
          product_id: product_id,
          product_feature_id: key.product_feature_id,
          costing_item_id: key.costing_item_id,
          name: name,
          size: size,
          color: color,
          item_name: `${name} ${size} - ${color}`,
          qty: key.qty,
          unit_price: key.unit_price
        };
      });

      setValues({
        id: res.data.id,
        po_number: res.data.po_number,
        bought_from: res.data.sold_to,
        ship_to: res.data.ship_to,
        issue_date: res.data.issue_date,
        delivery_date: res.data.delivery_date,
        valid_thru: res.data.valid_thru,
        tax: res.data.tax,
        currency_id: res.data.currency_id
      });

      let _party = _partyAddress(res.data.party);
      let _ship = _partyAddress(res.data.ship);

      setSelectedValueSO(_party);
      setSelectedValueSH(_ship);

      setItems(quoteItem);
    });
  }, [id]);

  // Radio
  const handleRadioChange = (event) => {
    setFieldValue('currency_id', event.target.value);
    try {
      API.updateQuote(id, { currency_id: event.target.value }, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('failed to update quote');
        else throw new Error('success');
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleTaxChange = (event) => {
    setFieldValue('tax', event.target.value);
    try {
      API.updateQuote(id, { tax: values.tax }, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('failed to update quote');
        else throw new Error('success');
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Page>
      <Container>
        <Modal open={openM} handleClose={handleCloseModal} items={items} setItems={setItems} />

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
                      <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Pembeli </Typography>
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
                            options={options}
                            loading={loading}
                            error={Boolean(touched.ship_to && errors.ship_to)}
                            helperText={touched.ship_to && errors.ship_to}
                            selectedValue={selectedValueSH}
                            open={openSH}
                            onClose={(value) => handleClose('ship_to', value)}
                          />
                        </ColumnBox>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
                      <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} pt={2} pl={2} pr={2}>
                          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Overview" value="1" />
                            <Tab label="Finance" value="2" />
                          </TabList>
                        </Box>

                        <TabPanel value="1" sx={{ paddingTop: 'unset' }}>
                          {/* <CardContent sx={{ paddingBottom: 'unset' }}>
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
                    </CardContent> */}

                          <DataGrid
                            columns={columns}
                            rows={items}
                            onEditRowsModelChange={handleEditRowsModelChange}
                            handleUpdateAllRows={handleUpdateAllRows}
                            handleAddRow={handleOpenModal}
                          />
                        </TabPanel>

                        <TabPanel value="2" sx={{ paddingTop: 'unset' }}>
                          <CardContent>
                            <Stack direction="column" spacing={4}>
                              <FormControl sx={{ width: '25ch' }}>
                                <FormLabel>Tax</FormLabel>
                                <TextField
                                  autoComplete="tax"
                                  type="number"
                                  onChange={handleTaxChange}
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
                          </CardContent>
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
