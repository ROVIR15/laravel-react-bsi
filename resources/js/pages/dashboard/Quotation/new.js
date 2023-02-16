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
import * as Yup from 'yup';
import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';
import { partyArrangedData } from '../../../helpers/data';
import { findTotalAmountOfQuotation, findTotalQty } from '../../../helpers/data/calculation';
import { fCurrency } from '../../../utils/formatNumber';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

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
  // Option Inquiry
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSO || openSH) && options.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  //Data Grid
  const [items, setItems] = useState([]);

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const QuotationSchema = Yup.object().shape({
    po_number: Yup.string().required('Inquiry References is required'),
    ship_to: Yup.number().required('Inquiry References is required'),
    sold_to: Yup.number().required('Inquiry References is required'),
    issue_date: Yup.date().required('PO Date is required'),
    valid_thru: Yup.date().required('Valid To is required'),
    delivery_date: Yup.date().required('Delivery Date is required')
  });

  const formik = useFormik({
    initialValues: {
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
        quote_items: items,
        quote_type: 'SO'
      };
      API.insertQuote(_data, function (res) {
        if (res.success) alert('success');
        else alert('failed');
      });
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

  // Preapre data from product
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

  // Data Grid
  const deleteData = useCallback((id) => () => {
    const rowToDeleteIndex = id;
    let a = [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];
    a = a.map(function (x, index) {
      return { ...x, id: index + 1 };
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
              return { ...row, [editedColumnName]: editRowData[editedColumnName].value };
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
      { field: 'id', headerName: 'ID', editable: false },
      { field: 'name', headerName: 'Name', width: 300, editable: false },
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
    setFieldValue('currency_id', event.target.value)
  }
  
  return (
    <Page>
      <Container>
        <Modal
          payload={items}
          open={openM}
          handleClose={handleCloseModal}
          items={items}
          setItems={setItems}
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
                        handleAddRow={handleOpenModal}
                        handleReset={handleResetRows}
                        handleUpdateAllRows={false}
                      />
                    </TabPanel>

                    <TabPanel value="2" sx={{ paddingTop: 'unset' }}>
                      <CardContent>
                        <Stack direction="column" spacing={4}>
                          <FormControl sx={{ width: '25ch'}}>
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

                          <FormControl >
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
