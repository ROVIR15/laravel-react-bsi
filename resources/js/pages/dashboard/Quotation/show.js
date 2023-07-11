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

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';
import { fCurrency } from '../../../utils/formatNumber';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//helpers
import { partyArrangedData, productItemArrangedData } from '../../../helpers/data';
import { QuotationSchema } from '../../../helpers/FormerSchema';
import { isArray, isEmpty } from 'lodash';
import { findTotalAmountOfQuotation, findTotalQty } from '../../../helpers/data/calculation';
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

function Quotation() {
  const { id } = useParams();

  // Option Inquiry
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

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

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
      ship_to: '',
      sold_to: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: '',
      tax: 0,
      currency_id: 2
    },
    validationSchema: QuotationSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        party_id: values.sold_to
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
        API.getBuyers((res) => {
          if (!res) return;
          else {
            let data = partyArrangedData(res);
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
    if (name === 'sold_to') {
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
    API.deleteQuoteItem(id, function (res) {
      if (res.success) alert('success');
      else alert('failed');
    });

    handleUpdateAllRows();
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
      temp = res.data.quote_items.map(function (key) {
        const { id, product_id, name, size, color } = productItemArrangedData(key.product);
        return {
          id: key.id,
          product_id: product_id,
          product_feature_id: key.product_feature_id,
          name: name,
          size: size,
          color: color,
          qty: key.qty,
          unit_price: key.unit_price
        };
      });
      setItems(temp);
    });
  };

  const columns = useMemo(
    () => [
      { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
      { field: 'product_feature_id', headerName: 'Variant ID', editable: true },
      { field: 'name', width: 350, headerName: 'Name', editable: false },
      { field: 'size', headerName: 'Size', editable: false },
      { field: 'color', headerName: 'Color', editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
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

    try {
      API.getAQuote(id, function (res) {
        if(!res) return
        if (!res.data) throw new Error('Error');
        else {
          const quoteItem = res.data.quote_items.map(function (key, index) {
            const { id, product_id, name, size, color } = productItemArrangedData(key.product);
            return {
              id: key.id,
              product_id: product_id,
              product_feature_id: key.product_feature_id,
              name: name,
              size: size,
              color: color,
              qty: key.qty,
              unit_price: key.unit_price
            };
          });
    
          setValues({
            id: res.data.id,
            po_number: res.data.po_number,
            sold_to: res.data.sold_to,
            ship_to: res.data.ship_to,
            issue_date: res.data.issue_date,
            delivery_date: res.data.delivery_date,
            tax: res.data.tax,
            currency_id: res.data.currency_id,
            valid_thru: res.data.valid_thru
          });
    
          setSelectedValueSO(res.data.party);
          setSelectedValueSH(res.data.ship);
    
          setItems(quoteItem);  
        }
      });      
    } catch (error) {
      alert(error)
    }

  }, [id]);

  // Populate

  const [populateState, setPopulateState] = useState({});
  const handlePopulate = () => {
    let payload = { items: populateState, quote_id: parseInt(id) };
    try {
      API.updateQuoteItem(0, payload, (res) => {
        if (!res.success) alert('failed');
        alert('success');
        handleUpdateAllRows();
      });
    } catch (e) {
      alert(e);
    }
  };

  const handleChangePopulate = (e) => {
    const { name, value } = e.target;
    if (name === 'qty' && value !== 0) setPopulateState({ ...populateState, qty: value });
    if (name === 'unit_price' && value !== 0)
      setPopulateState({ ...populateState, unit_price: value });
    else return;
  };

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
        <Modal
          payload={items}
          open={openM}
          handleClose={handleCloseModal}
          items={items}
          setItems={setItems}
          update={handleUpdateAllRows}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardHeader title="Choose Quotation" />
                  <CardContent sx={{ paddingBottom: '6px' }}>
                    <TextField
                      fullWidth
                      autoComplete="po_number"
                      type="text"
                      label="No PO"
                      {...getFieldProps('po_number')}
                      error={Boolean(touched.po_number && errors.po_number)}
                      helperText={touched.po_number && errors.po_number}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card>
                  <CardHeader title="Quotation Information" />
                  <CardContent>
                    <Paper>
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
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} pt={2} pl={2} pr={2}>
                      <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Overview" value="1" />
                        <Tab label="Finance" value="2" />
                      </TabList>
                    </Box>

                    <TabPanel value="1" sx={{ paddingTop: 'unset' }}>
                      <CardContent sx={{ paddingBottom: 'unset' }}>
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
                      </CardContent>

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
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <Typography variant="h5" sx={{ flex: 1 }}>
                    Total Qty {findTotalQty(items)} and Rp.{' '}
                    {fCurrency(findTotalAmountOfQuotation(items))}
                  </Typography>
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
      </Container>
    </Page>
  );
}

export default Quotation;
