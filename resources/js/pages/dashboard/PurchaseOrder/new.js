import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  InputAdornment,
  Tab,
  TextField,
  Typography,
  Paper,
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
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//Helpers
import {
  productFeatureArrangedData,
  productItemArrangedData,
  _partyAddress
} from '../../../helpers/data';

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
      delivery_date: ''
    },
    validationSchema: PurchaseOrderSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        order_items: items
      };
      API.insertPurchaseOrder(_data, function (res) {
        if (res.success) alert('success');
        else alert('failed');
      });
      setSubmitting(false);
    }
  });

  useEffect(() => {
    let active = true;

    (async () => {
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
    })();

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
        name: name,
        size: size,
        color: color,
        qty: key.qty,
        delivery_date: null,
        unit_price: key.unit_price
      };
    });
    setValues({
      quote_id: data.id,
      po_number: data.po_number,
      sold_to: data.sold_to,
      ship_to: data.ship_to,
      issue_date: data.issue_date,
      valid_thru: data.valid_thru,
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
      { field: 'name', headerName: 'Name', width: 350, editable: false },
      { field: 'size', headerName: 'Size', editable: false },
      { field: 'color', headerName: 'Color', width: 150, editable: false },
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

  return (
    <Page>
      <Container>
        <Modal open={openM} handleClose={handleCloseModal} items={items} setItems={setItems} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardHeader title="Choose Quotation" />
                  <CardContent sx={{ paddingBottom: '6px' }}>
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
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={8}>
                <Card>
                  <CardContent>
                    <Paper>
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
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>

              {/* ddd */}
              <Grid item xs={12}>
                <Card sx={{ '& .MuiTextField-root': { m: 1 } }}>
                  <CardContent>
                    <TabContext value={valueTab}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                          <Tab label="Overview" value="1" />
                          <Tab label="Description" value="2" />
                          <Tab label="Finance" value="3" />
                        </TabList>
                      </Box>

                      <TabPanel value="1">
                        <Stack direction="column" spacing={2}>
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

                          {/* Populate */}
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
                            rows={6}
                            type="text"
                            {...getFieldProps('description')}
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                          />
                        </Stack>
                      </TabPanel>

                      <TabPanel value="3">
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

              {/*  */}
              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'end' }}>
                  <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ m: 1 }}
                  >
                    Save
                  </LoadingButton>
                  <Button size="large" type="submit" color="grey" variant="contained" sx={{ m: 1 }}>
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

export default SalesOrder;
