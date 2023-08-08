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
} from '@mui/material';import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../../helpers';
import { _partyAddress, _shipmentItem } from '../../../../helpers/data';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { useParams } from 'react-router-dom';
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

const UploadPaper = styled(Button)(({ theme }) => ({
  outline: 'none',
  padding: '40px 8px',
  borderRadius: '8px',
  backgroundColor: 'rgb(244, 246, 248)',
  border: '1px dashed rgba(145, 158, 171, 0.32)',
  height: '100%'
}));

function OutboundDelivery() {
  const { id } = useParams();
  const { user } = useAuth();
  const [file, setFile] = useState(null);

  // Option Inquiry
  const [options, setOptions] = useState([]);

  //AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);
  const [po_number, setPONumber] = useState('');

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
    handleChangeData(id);
  }, [id]);

  function handleChangeData(id) {
    if (!id) return;

    try {
      API.getAShipment(id, function (res) {
        if (!res) return;
        if (!res.data) return;
        else {
          const { order, items, type, status, ...info } = res.data;
          setValues({...info, category_shipment_name: type?.name});
          // setPONumber(order?.purchase_order?.po_number);
          let _ship = _partyAddress(res.data?.ship_to);
          setSelectedValueSO(_ship);
          setStatus(status[0]?.shipment_type_status_id);
          let _items = _shipmentItem(items);
          setItems(_items);
          setFile(info?.imageUrl);
          // setIsSubcontract(Boolean(res.data?.subcontract_flag));
        }
      });
    } catch (error) {
      alert('error');
    }
  }

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
      API.getPurchaseOrder('', (res) => {
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
    order_id: Yup.number().required('Purchase Order is required'),
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
        shipment_type_id: 1,
        imageUrl: file
      };

      try {
        API.updateShipment(id, _data, (res) => {
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
    setValues,
    setFieldValue,
    handleReset,
    getFieldProps
  } = formik;

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 450, editable: false },
      { field: 'qty_order', headerName: 'Qty Order', editable: false },
      { field: 'satuan', headerName: 'Satuan', editable: false },
      { field: 'qty_shipped', headerName: 'Qty Delivery', editable: true },
      { field: 'description', width: 400, headerName: 'Description', editable: true },
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

        // update on shipment item
        try {
          API.updateShipmentItem(
            editedIds,
            { [editedColumnName]: editRowData[editedColumnName].value },
            function (res) {
              if (!res) return;
              if (!res.success) throw new Error('failed');
              else alert('done');
            }
          );
        } catch (error) {
          alert(error);
        }
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

  function ShowImageWhenItsUploaded() {
    if (file) {
      return (
        <Paper sx={{ padding: 2, height: '100%' }}>
          <img src={file} alt="Image" />
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
        </Paper>
      );
    } else {
      return (
        <Paper sx={{ padding: 2, height: '100%' }}>
          <label htmlFor="upload-file">
            <input
              accept="image/*"
              multiple
              id="upload-file"
              type="file"
              onChange={handleOnFileChange}
              style={{ display: 'none' }}
            />
            <UploadPaper component="span" fullWidth>
              <Typography variant="h5">Drop or Select File</Typography>
            </UploadPaper>
          </label>
        </Paper>
      );
    }
  }

  /**
   * Handle Upload File
   */

  const handleOnFileChange = (event) => {
    setFile(event.target.files[0]);

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('file', event.target.files[0], event.target.files[0].name);

    try {
      API.uploadShipmentReceiptProof(formData, function (res) {
        if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
        else enqueueSnackbar('', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };

  // Radio Import Activity
  // ----------------------------------------------------------------- //
  const [isSubcontract, setIsSubcontract] = useState(false);

  const handleRadioSubcontractCheck = (e) => {
    if (e.target.value === 'true') {
      setIsSubcontract(true);
      setFieldValue('subcontract_flag', true);
    } else {
      setIsSubcontract(false);
      setFieldValue('subcontract_flag', false);
      if (valueTab === '4') setValueTab('1');
    }
  };
  // ----------------------------------------------------------------- //

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
            <Grid container spacing={1} direction="row">
              <Grid item xs={4}>
                <Card>
                  <CardHeader title="Delivery Date" />
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Card>
                  <CardHeader title="Delivery Information" />
                  <CardContent>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={5} sx={{ padding: 'unset' }}>
                        <TextField fullWidth value={values.category_shipment_name} disabled />
                      </Grid>

                      <Grid item xs={5} sx={{ padding: 'unset' }}>
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
                            <Typography variant="h6"> Subcontractor </Typography>
                            <Button disabled>Select</Button>
                          </SpaceBetweenBox>
                          {selectedValueSO.name ? (
                            <div>
                              <Typography variant="subtitle1">{selectedValueSO.name}</Typography>
                              <Typography component="span" variant="caption">
                                {selectedValueSO.street}
                              </Typography>
                              <Typography variant="body2">{`${selectedValueSO.city}, ${selectedValueSO.province}, ${selectedValueSO.country}`}</Typography>
                            </div>
                          ) : null}
                        </ColumnBox>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Card sx={{ mt: 2, mb: 2 }}>
              <CardContent>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Item Overview" value="1" />
                        <Tab label="Status" value="2" />
                        <Tab label="Shipment Receipt" value="3" />
                        <Tab label="Comments" value="4" />
                      </TabList>
                    </Box>
                    {/* Item Overview */}
                    <TabPanel value="1" sx={{ padding: '10px 0' }}>
                      <Stack direction="column" spacing={2}>
                        <DataGrid
                          columns={columns}
                          rows={items}
                          onEditRowsModelChange={handleEditRowsModelChange}
                          handleAddRow={handleOpenModal}
                          addItemActive={false}
                          updateActive={false}
                          handleReset={handleResetRows}
                        />

                        <Box>
                          <TextField
                            sx={{ marginTop: '3.5em' }}
                            variant="outlined"
                            type="text"
                            multiline
                            rows={3}
                            fullWidth
                            autoComplete="comment"
                            {...getFieldProps('comment')}
                            error={Boolean(touched.comment && errors.comment)}
                            helperText={touched.comment && errors.comment}
                          />
                        </Box>
                      </Stack>
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
                    {/* Proof of Receipt */}
                    <TabPanel value="3">
                      <ShowImageWhenItsUploaded />
                    </TabPanel>
                    {/* Comments */}
                    <TabPanel value="4">
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
                      />
                    </TabPanel>
                  </TabContext>
                </Box>
              </CardContent>
            </Card>
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
              <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                Cancel
              </Button>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default OutboundDelivery;