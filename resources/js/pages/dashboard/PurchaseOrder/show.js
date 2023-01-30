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

import axios from 'axios';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from '../../../components/DataGrid';
import Modal from './components/Modal';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { PurchaseOrderSchema } from '../../../helpers/FormerSchema';
import { _partyAddress } from '../../../helpers/data';
import { isEmpty } from 'lodash';

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

  const formik = useFormik({
    initialValues: {
      id: '',
      order_id: '',
      bought_from: '',
      ship_to: '',
      po_number: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: ''
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
      delivery_date: load.delivery_date
    });

    setDescription(load.order.description);
    setTax(load.order.tax);

    let _bought_from = _partyAddress(load.bought_from);
    let _ship_to = _partyAddress(load.ship_to);
    setSelectedValueSO(_bought_from);
    setSelectedValueSH(_ship_to);

    var c = load.order_item.map((key) => {
      const { product_feature } = key;
      return {
        ...product_feature,
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
        ...key
      };
    });
    setItems(c);
  }, [id]);

  useEffect(() => {
    let active = true;

    (async () => {
      API.getProductFeature((res) => {
        if (!res) return;
        if (!res.data) {
          setOptionsP([]);
        } else {
          setOptionsP(res.data);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const { errors, touched, values, isSubmitting, handleSubmit, setValues, getFieldProps } = formik;

  const deleteData = useCallback((id) => () => {
    setItems((prevItems) => {
      const rowToDeleteIndex = id;
      return filter.map((x) => x.id !== id);
    });

    API.deleteSalesOrderItem(id, (res) => {
      alert('success');
    });

    handleUpdateAllRows();
  });

  useEffect(() => {
    var orderItem;
  }, [items]);

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
        id: key.id,
        delivery_date: new Date(key.delivery_date),
        ...key
      };
    });
    setItems(c);
  };

  const columns = useMemo(
    () => [
      { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
      { field: 'product_feature_id', headerName: 'Variant ID', editable: true },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
      { field: 'unit_price', headerName: 'Unit Price', editable: true },
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

  const columnShipment = useMemo(
    () => [
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
      { field: 'total_shipped', headerName: 'Qty Terkirim', editable: true },
    ]
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

  const handleUpdateTax = () => {
    try {
      if (isEmpty(tax)) throw new Error('tax is required');
      API.updateOrder(values.order_id, { tax }, function (res) {
        if (!res) return;
        if (res.success) alert('success');
        else throw new Error('error occured failed store data');
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
          order_id={values.order_id}
          update={handleUpdateAllRows}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card>
                  <CardHeader title="Choose Quotation" />
                  <CardContent sx={{ paddingBottom: '6px' }}>
                    <Stack direction="column" spacing={1}>
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
                    </Stack>
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
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ '& .MuiTextField-root': { m: 1 } }}>
                  <CardContent>
                    <TabContext value={valueTab}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                          <Tab label="Overview" value="1" />
                          <Tab label="Description" value="2" />
                          <Tab label="Shipment Tracking" value="3" />
                          <Tab label="Finance" value="4" />
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
                        <Stack direction="row" spacing={4} alignItems="center">
                          <Typography variant="body1">Tax</Typography>
                          <TextField
                            autoComplete="tax"
                            type="number"
                            value={tax}
                            onChange={(event) => setTax(event.target.value)}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>
                            }}
                          />
                        </Stack>
                        <Button onClick={handleUpdateTax} variant="outlined">
                          Save
                        </Button>
                      </TabPanel>
                    </TabContext>
                  </CardContent>
                </Card>
              </Grid>

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
