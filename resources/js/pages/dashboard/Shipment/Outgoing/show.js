import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  FormLabel,
  FormControlLabel,
  Grid,
  Tab,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  Stack,
  Select,
  Paper,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { useParams } from 'react-router-dom';
import { _shipmentItem } from '../../../../helpers/data';
import useAuth from '../../../../context';

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

function OutboundDelivery() {
  const { id } = useParams();
  const { user } = useAuth();

  // Option Inquiry
  const [options, setOptions] = useState([]);

  //AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);
  const [po_number, setPONumber] = useState('');
  const [SOID, setSOID] = useState(0);

  // Option for Product Items
  const [selectedValueSO, setSelectedValueSO] = React.useState({});

  //Data Grid
  const [items, setItems] = useState([]);
  const handleAddItems = (values) => {
    setItems(values);
  };

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  /**
   * Get Data of Shipment
   */

  useEffect(() => {
    if (!id) return;

    try {
      API.getAShipment(id, function (res) {
        if (!res) return;
        if (!res.data) return;
        else {
          const { order, items, type, status, ...info } = res.data;
          setValues(info);
          setPONumber(order?.sales_order?.po_number);
          setSOID(order?.sales_order?.id);
          setSelectedValueSO(order?.sales_order?.ship);
          setStatus(status[0]?.shipment_type_status_id);
          let _items = _shipmentItem(items);
          setItems(_items);
          setIsSubcontract(Boolean(res?.data?.subcontract_flag));
        }
      });
    } catch (error) {
      alert('error');
    }
  }, [id]);

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    let active = true;

    (async () => {
      API.getSalesOrder('', (res) => {
        if (!res) return;
        if (!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const OutboundDeliverySchema = Yup.object().shape({
    order_id: Yup.number().required('Sales Order is required'),
    serial_number: Yup.string().required('Serial Number is required'),
    delivery_date: Yup.date().required('Delivery Date is required'),
    est_delivery_date: Yup.date().required('Estimated Delivery Date is required')
  });

  const formik = useFormik({
    initialValues: {
      order_id: '',
      serial_number: '',
      delivery_date: moment(new Date()).format('YYYY-MM-DD'),
      est_delivery_date: moment(new Date()).format('YYYY-MM-DD'),
      comment: 'nothing'
    },
    validationSchema: OutboundDeliverySchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        shipment_type_id: 2
      };

      try {
        API.updateShipment(_data, (res) => {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }
      setSubmitting(false);
      handleReset();
      setSelectedValueSO({});
      setItems([]);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setValues,
    setFieldValue,
    handleReset,
    getFieldProps
  } = formik;

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
      { field: 'sku_id', headerName: 'SKU ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 500, editable: false },
      { field: 'qty_order', headerName: 'Qty Pesanan', editable: false },
      { field: 'deliv_qty', headerName: 'Qty Terkirim', editable: false },
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

  /**
   * Completion Status
   */

  const [status, setStatus] = React.useState(0);

  const handleSubmitCompletionStatus = () => {
    if (!status) {
      alert('Stop');
      return undefined;
    }
    try {
      API.insertShipmentStatus(
        {
          user_id: user.id,
          shipment_id: values.id,
          shipment_type_status_id: status
        },
        function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        }
      );
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  /**
   * Handle item issuance
   */
  // -----------------------------------------------------------//
  const handleItemIssuance = () => {
    try {
      let _obj = {
        user_id: user?.id,
        description: values.comment,
        shipment_id: id,
        items: items,
        from_facility_id: 2,
        to_facility_id: 17
      };

      API.insertItemIssuance(_obj, function (res) {
        if (res.success)
          enqueueSnackbar('Shipment ini sudah dipindahkan', { variant: 'successAlert' });
        else enqueueSnackbar('Anda tidak dapat melakukan ini dua kali', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };
  // -----------------------------------------------------------//

  return (
    <Page>
      <Container>
        <Modal
          open={openM}
          onAddItems={handleAddItems}
          so_id={selectedValueSO.id}
          order_id={values.order_id}
          handleClose={handleCloseModal}
          selected={items}
          setSelected={setItems}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={4}>
                    <Stack direction="column" spacing={2}>
                      <TextField
                        fullWidth
                        autoComplete="delivery_date"
                        type="date"
                        label="Delivery Date"
                        {...getFieldProps('delivery_date')}
                        error={Boolean(touched.delivery_date && errors.delivery_date)}
                        helperText={touched.delivery_date && errors.delivery_date}
                      />
                      <TextField
                        fullWidth
                        disabled
                        autoComplete="est_delivery_date"
                        type="date"
                        label="Estimated Delivery Date"
                        {...getFieldProps('est_delivery_date')}
                        error={Boolean(touched.est_delivery_date && errors.est_delivery_date)}
                        helperText={touched.est_delivery_date && errors.est_delivery_date}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <ColumnBox
                      style={{
                        padding: '1em 0.75em',
                        border: '1px dashed #b8b8b8',
                        borderRadius: '8px'
                      }}
                    >
                      <Grid container direction="row" spacing={2}>
                        <Grid item xs={6} sx={{ padding: 'unset' }}>
                          <TextField fullWidth label="PO Number" value={po_number} disabled />

                          <Typography
                            variant="body1"
                            href={`../../order/sales-order/${SOID}`}
                            component="a"
                          >
                            {`SO-0${SOID}`}
                          </Typography>
                        </Grid>

                        <Grid item xs={6} sx={{ padding: 'unset' }}>
                          <TextField
                            variant="outlined"
                            type="text"
                            fullWidth
                            disabled
                            autoComplete="serial_number"
                            placeholder="Delivery Serial Number"
                            {...getFieldProps('serial_number')}
                            error={Boolean(touched.serial_number && errors.serial_number)}
                            helperText={touched.serial_number && errors.serial_number}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <ColumnBox>
                            <SpaceBetweenBox>
                              <Typography variant="h6"> Buyer </Typography>
                              <Button disabled>Select</Button>
                            </SpaceBetweenBox>
                            <div>
                              <Typography variant="body1">{selectedValueSO.name}</Typography>
                            </div>
                          </ColumnBox>
                        </Grid>
                      </Grid>
                    </ColumnBox>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider orientation="horizontal" variant="middle" flexItem />
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
                            <Tab label="Item Overview" value="1" />
                            <Tab label="Status" value="2" />
                            <Tab label="Comments" value="3" />
                          </TabList>
                        </Box>
                        {/* Item Overview */}
                        <TabPanel value="1" sx={{ padding: '10px 0' }}>
                          <DataGrid
                            columns={columns}
                            rows={items}
                            onEditRowsModelChange={handleEditRowsModelChange}
                            handleReset={handleResetRows}
                            handleUpdateAllRows={false}
                          />
                        </TabPanel>
                        {/* Status of Shipment */}
                        <TabPanel value="2">
                          <Stack direction="row" spacing={4} alignItems="center">
                            <FormControl fullWidth>
                              <InputLabel>Selet Status</InputLabel>
                              <Select value={status} label="Status" onChange={handleChangeStatus}>
                                <MenuItem value={5}>Scheduled</MenuItem>
                                <MenuItem value={1}>Shipped</MenuItem>
                                <MenuItem value={2}>On Going</MenuItem>
                                <MenuItem value={3}>Cancelled</MenuItem>
                                <MenuItem value={4}>Delivered</MenuItem>
                              </Select>
                            </FormControl>

                            <Button onClick={handleSubmitCompletionStatus}> Update </Button>
                          </Stack>
                        </TabPanel>
                        {/* Comments */}
                        <TabPanel value="3">
                          <TextField
                            variant="outlined"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            autoComplete="comment"
                            {...getFieldProps('comment')}
                            error={Boolean(touched.comment && errors.comment)}
                            helperText={touched.comment && errors.comment}
                          ></TextField>
                        </TabPanel>
                      </TabContext>
                    </ColumnBox>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Stack direction="row">
                  <Button
                    fullWidth
                    size="large"
                    color="success"
                    variant="contained"
                    onClick={handleItemIssuance}
                    sx={{ m: 1 }}
                  >
                    Issue From Warehouse
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
                </Stack>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default OutboundDelivery;
