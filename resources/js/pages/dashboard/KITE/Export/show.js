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
  Paper,
  Select,
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
import { _partyAddress, productItemArrangedData } from '../../../../helpers/data';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import AutoComplete from './components/AutoComplete';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import useAuth from '../../../../context';

// Snackbar
import { enqueueSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
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

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([]);
  const [selectedValueSO, setSelectedValueSO] = React.useState({});

  const [options2, setOptions2] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && options2.length === 0;

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
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    let active = true;

    try {
      API.getImportedPO('?import_flag=1&completion_status=2', (res) => {
        if (!res) return;
        if (!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }

    return () => {
      active = false;
    };
  }, [loading]);

  const OutboundDeliverySchema = Yup.object().shape({
    order_id: Yup.number().required('Purchase Order is required'),
    document_number: Yup.string().required('Serial Number is required'),
    date: Yup.date().required('Date is required')
  });

  const formik = useFormik({
    initialValues: {
      type: 0,
      document_number: '',
      bl_number: '0000000',
      purchase_order_id: 0,
      date: moment(new Date()).format('YYYY-MM-DD')
    },
    validationSchema: OutboundDeliverySchema,
    onSubmit: (values) => {
      try {
        API.updateKiteImport(values, (res) => {
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
      setFile(null);
    }
  });

  useEffect(() => {
    if (isEmpty(id)) return;

    try {
      API.getAKiteExport(id, function (res) {
        if (!res) return;
        if (!res.data) throw new Error('None Data');
        else {
          let data = res.data[0];
          setValues({
            ...values,
            po_number: data?.po_number,
            order_id: data?.order_id,
            sales_order_id: data?.sales_order_id,
            date: data?.date,
            document_number: data?.document_number,
            bl_number: data?.bl_number
          });

          setItems(data?.items);

          let _bought_from = _partyAddress(data.party);
          setSelectedValueSO(_bought_from);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

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
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'sku_id', width: 150, headerName: 'SKU ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 350, align: 'left' },
      { field: 'qty', headerName: 'Qty', align: 'left' },
      { field: 'unit_price', headerName: 'Harga', align: 'left' },
      { field: 'total', headerName: 'Total', width: 350, align: 'left' },
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
    alert('cannot');
    // setItems((prevItems) => {
    //   return [...prevItems.slice(0, rowToDeleteIndex), ...prevItems.slice(rowToDeleteIndex + 1)];
    // });
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
          API.updateAKiteImportItem(editedIds, data, function (res) {
            if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
            else enqueueSnackbar('', { variant: 'failedAlert' });
          });
        } catch (error) {
          enqueueSnackbar('', { variant: 'failedAlert' });
        }

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

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader title="KITE Pengelolaan Export" />
              <CardContent>
                <Grid container spacing={2} direction="row">
                  <Grid item xs={12}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs={12} sx={{ padding: 'unset' }}>
                        <TextField fullWidth label="PO Number" value={values.po_number} disabled />
                      </Grid>

                      <Grid item xs={4} sx={{ padding: 'unset' }}>
                        <FormControl fullWidth>
                          <FormLabel id="xx">Tanggal Penerbitan</FormLabel>
                          <TextField
                            variant="outlined"
                            type="date"
                            fullWidth
                            autoComplete="date"
                            placeholder="Tanggal Terbit"
                            {...getFieldProps('date')}
                            error={Boolean(touched.date && errors.date)}
                            helperText={touched.date && errors.date}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={4} sx={{ padding: 'unset' }}>
                        <FormControl fullWidth>
                          <FormLabel id="xx">Nomor Dokumen Kepabean</FormLabel>

                          <TextField
                            variant="outlined"
                            type="text"
                            fullWidth
                            autoComplete="document_number"
                            placeholder="Nomor Dokumen"
                            {...getFieldProps('document_number')}
                            error={Boolean(touched.document_number && errors.document_number)}
                            helperText={touched.document_number && errors.document_number}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={4} sx={{ padding: 'unset' }}>
                        <FormControl fullWidth>
                          <FormLabel id="xx">Nomor Dokumen Kepabean</FormLabel>

                          <TextField
                            variant="outlined"
                            type="text"
                            fullWidth
                            autoComplete="document_number"
                            placeholder="Nomor Dokumen"
                            {...getFieldProps('document_number')}
                            error={Boolean(touched.document_number && errors.document_number)}
                            helperText={touched.document_number && errors.document_number}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Supplier </Typography>
                            <Button disabled>Select</Button>
                          </SpaceBetweenBox>
                          {selectedValueSO?.name ? (
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
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%', marginTop: '0.5rem', typography: 'body1' }}>
                      <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Item Overview" value="1" />
                          </TabList>
                        </Box>
                        {/* Item Overview */}
                        <TabPanel value="1" sx={{ padding: '10px 0' }}>
                          <DataGrid
                            columns={columns}
                            rows={items}
                            onEditRowsModelChange={handleEditRowsModelChange}
                            handleAddRow={handleOpenModal}
                            handleReset={handleResetRows}
                            handleUpdateAllRows={false}
                          />
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Stack direction="column">
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
