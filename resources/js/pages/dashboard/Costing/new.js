import React, { useState, useMemo, useEffect } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Tab,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Link as RouterLink, useLocation } from 'react-router-dom';

// API
import API from '../../../helpers';

// Components
import ColumnBox from '../../../components/ColumnBox';
import SpaceBetweenBox from '../../../components/SpaceBetweenBox';
import DialogBoxParty from './components/DialogBoxParty';

import AutoComplete from './components/AutoComplete';
import AutoCompleteP from './components/AutoCompleteP';
import DataGrid from './components/DataGrid';
import Modal from './components/ModalNewP';
import Modal2 from './components/ModalNewO';
import Modal3 from './components/ModalNewS';
import Modal4 from './components/ModalNewD';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { optionProductFeature, partyArrangedData, serviceList } from '../../../helpers/data';
import { gt, isUndefined } from 'lodash';

function isEmpty(data) {
  return !gt(data, 0);
}

function totalConsumption(params) {
  return (parseFloat(params.row.allowance) / 100 + 1) * parseFloat(params.row.consumption);
}

function totalMoney(params) {
  return (
    (parseFloat(params.row.allowance) / 100 + 1) *
    parseFloat(params.row.consumption) *
    params.row.unit_price
  ).toFixed(4);
}

function BillofMaterial() {
  const { pathname } = useLocation();
  const [items, setItems] = useState([]);

  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  // Options for Product Feature
  const [options, setOptions] = useState([]);

  // Options for Product
  const [options3, setOptions3] = useState([]);

  // Options for Service
  const [options4, setOptions4] = useState([]);

  // Options for Work Center
  const [options2, setOptions2] = useState([]);

  const [operation, setOperation] = useState([]);
  const [component, setComponent] = useState([]);
  const [service, setService] = useState([]);

  //Modal Component of BOM
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  //Modal Operation of BOM
  const [openMO, setOpenMO] = React.useState(false);
  const handleOpenModalO = () => setOpenMO(true);
  const handleCloseModalO = () => setOpenMO(false);

  //Modal Service of BOM
  const [openS, setOpenS] = React.useState(false);
  const handleOpenModalS = () => setOpenS(true);
  const handleCloseModalS = () => setOpenS(false);

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  //Data Grid Opration of BOM
  const [editRowsModelO, setEditRowsModelO] = React.useState({});
  const [editRowDataO, setEditRowDataO] = React.useState({});

  // DialogBox for Party
  const [optionParty, setOptionParty] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && optionParty.length === 0;
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    type: {
      name: ''
    }
  });

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        await API.getBuyers((res) => {
          if (!res) return;
          else {
            let data = partyArrangedData(res);
            setOptionParty(data);
          }
        });
      } catch (error) {
        alert('error');
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSH]);

  const handleCloseDialogParty = (data) => {
    if (!data) {
      setOpenSH(false);
    } else {
      setSelectedValueSH(data);
      setFieldValue('party_id', data.id);
      setOpenSH(false);
    }
  };

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const BOMSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    product_id: Yup.string().required('Product ID is required'),
    company_name: Yup.string().required('Company is required'),
    qty: Yup.number().required('Quantity BOM is required'),
    margin: Yup.number().required('Margin is required'),
    tax: Yup.number().required('Tax is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      party_id: '',
      product_id: '',
      product_feature_id: '',
      company_name: 'PT Buana Sandang Indonesia',
      qty: 0,
      margin: 0,
      starting_price: 0,
      tax: 11,
      start_date: '',
      end_date: ''
    },
    validationSchema: BOMSchema,
    onSubmit: (values) => {
      const _data = { ...values, components: component, operations: operation, services: service };
      API.insertBOM(_data, (res) => {
        if (!res.success) {
          alert('Failed');
        } else {
          alert('Success');
        }
      });
      setSubmitting(false);
    }
  });

  useEffect(() => {
    let active = true;

    (async () => {
      await API.getProductFeature((res) => {
        if (!res) return;
        if (!res.data) {
          setOptions([]);
        } else {
          const data = optionProductFeature(res.data);
          setOptions(data);
        }
      });

      await API.getWorkCenter((res) => {
        if (!res) return;
        if (!res.data) {
          setOptions2([]);
        } else {
          setOptions2(res.data);
        }
      });

      await API.getFinishedGoods((res) => {
        if (isUndefined(res)) return;
        if (!res.success) {
          setOptions3([]);
        } else {
          const _data = res.data.map(function (item) {
            const {
              product: {
                id,
                goods: { name }
              },
              category
            } = item;
            return { id, name, category: category.name };
          });
          setOptions3(_data);
        }
      });

      await API.getService((res) => {
        if (!res) return;
        if (!res.data) {
          setOptions4([]);
        } else {
          setOptions4(serviceList(res.data));
        }
      });

      await API.getBOMMaterialToDuplicate((res) => {
        if (!res) return;
        if (!res.data) {
          setOptionBOMData([]);
        } else {
          setOptionBOMData(res.data);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  function changeData(data) {
    setItems(data);
  }

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  const goodsColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
      { field: 'name', width: 300, headerName: 'Name', editable: false },
      { field: 'size', headerName: 'Size', editable: true },
      { field: 'color', headerName: 'Color', editable: true },
      { field: 'brand', headerName: 'Brand', editable: false },
      { field: 'consumption', headerName: 'Konsumsi', editable: true },
      { field: 'allowance', headerName: 'Allowance %', editable: true },
      { field: 'unit_price', headerName: 'Harga', editable: true },
      { field: 'qty', headerName: 'Total Konsumsi', editable: true, valueGetter: totalConsumption },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteDataComponent(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteDataComponent]
  );

  const operationColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, hideable: true, width: 30 },
      { field: 'seq', headerName: 'seq', editable: true, width: 30 },
      { field: 'work_center_id', headerName: 'Work Center ID', editable: false, width: 30 },
      { field: 'name', width: 300, headerName: 'Operation Name', editable: false, width: 250 },
      {
        field: 'work_hours',
        headerName: 'Working Hours',
        editable: false,
        width: 100,
        align: 'left'
      },
      {
        field: 'cost_per_hour',
        headerName: 'Cost per Hours',
        editable: false,
        width: 100,
        align: 'left'
      },
      {
        field: 'labor_alloc',
        headerName: 'Labor Allocation',
        editable: false,
        width: 100,
        align: 'left'
      },
      { field: 'overhead_cost', headerName: 'CM Cost', editable: false, width: 100, align: 'left' },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteDataOperation(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteDataOperation]
  );

  const serviceColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, hideable: true, width: 30 },
      { field: 'name', width: 300, headerName: 'Service Name', editable: false, width: 250 },
      { field: 'unit_price', headerName: 'Harga', editable: true },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteDataService(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteDataService]
  );

  /**
   * Handling Data Grid for a Component BOM
   */

  const handleEditComponentRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setComponent((prevItems) => {
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

  /**
   * Handling Data Grid for a Component BOM
   */

  const handleEditServiceRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setService((prevItems) => {
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

  /**
   * Handling Data Grid for a Operation BOM
   */

  const handleEditOperationRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setOperation((prevItems) => {
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

  const handleResetOperationRows = () => {
    setOperation([]);
  };

  const handleResetComponentRows = () => {
    setComponent([]);
  };

  const deleteDataComponent = React.useCallback((id) => () => {
    setComponent((prevComponent) => {
      return prevComponent.filter((x) => x.id !== id);
    });
  });

  const deleteDataOperation = React.useCallback((id) => () => {
    setOperation((prevOperation) => {
      return prevOperation.filter((x) => x.id !== id);
    });
  });

  const deleteDataService = React.useCallback((id) => () => {
    setService((prevService) => {
      return prevService.filter((x) => x.id !== id);
    });
  });

  //Modal Duplicate of BOM
  const [optionBOMData, setOptionBOMData] = useState([]);

  const [openDuplicate, setOpenDuplicate] = React.useState(false);
  const handleOpenModalDuplicate = () => setOpenDuplicate(true);
  const handleCloseModalDuplicate = () => setOpenDuplicate(false);

  return (
    <Page>
      <Container>
        <Modal
          payload={[]}
          open={openM}
          options={options}
          handleClose={handleCloseModal}
          items={component}
          setItems={setComponent}
        />
        <Modal2
          payload={[]}
          open={openMO}
          options={options2}
          handleClose={handleCloseModalO}
          items={operation}
          setItems={setOperation}
        />
        <Modal3
          payload={[]}
          open={openS}
          options={options4}
          handleClose={handleCloseModalS}
          setComponent={setService}
        />
        {/* Handle Duplicate Data from another BOM */}
        <Modal4
          payload={[]}
          open={openDuplicate}
          options={optionBOMData}
          handleClose={handleCloseModalDuplicate}
          setItems={setComponent}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                  <CardContent>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Buyer </Typography>
                        <Button onClick={() => setOpenSH(true)}>Select</Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">{selectedValueSH?.name}</Typography>
                      </div>
                      <DialogBoxParty
                        options={optionParty}
                        loading={loadingSH}
                        // error={Boolean(touched.facility_id && errors.facility_id)}
                        // helperText={touched.facility_id && errors.facility_id}
                        // selectedValue={values.facility_id}
                        open={openSH}
                        onClose={(value) => handleCloseDialogParty(value)}
                      />
                    </ColumnBox>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={8}>
                <Card>
                  <CardHeader title="Costing Information" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          autoComplete="name"
                          type="text"
                          label="Costing Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <AutoCompleteP
                          fullWidth
                          autoComplete="product_id"
                          type="text"
                          label="Product Id"
                          error={Boolean(touched.product_id && errors.product_id)}
                          helperText={touched.product_id && errors.product_id}
                          options={options3}
                          setOpen={setOpen}
                          loading={loading}
                          changeData={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <AutoComplete
                          fullWidth
                          autoComplete="product_feature_id"
                          type="text"
                          label="Product Variant Id"
                          error={Boolean(touched.product_feature_id && errors.product_feature_id)}
                          helperText={touched.product_feature_id && errors.product_feature_id}
                          options={options}
                          setOpen={setOpen}
                          loading={loading}
                          changeData={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          autoComplete="start_date"
                          type="date"
                          label="Start Date"
                          {...getFieldProps('start_date')}
                          error={Boolean(touched.start_date && errors.start_date)}
                          helperText={touched.start_date && errors.start_date}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          autoComplete="end_date"
                          type="date"
                          label="End Date"
                          {...getFieldProps('end_date')}
                          error={Boolean(touched.end_date && errors.end_date)}
                          helperText={touched.end_date && errors.end_date}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          autoComplete="qty"
                          type="text"
                          label="Quantity"
                          {...getFieldProps('qty')}
                          error={Boolean(touched.qty && errors.qty)}
                          helperText={touched.qty && errors.qty}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          autoComplete="company_name"
                          type="text"
                          label="Company Name"
                          {...getFieldProps('company_name')}
                          error={Boolean(touched.company_name && errors.company_name)}
                          helperText={touched.company_name && errors.company_name}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                      <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label="Initial Price" value="1" />
                            <Tab label="Work" value="2" />
                            <Tab label="Material" value="3" />
                            <Tab label="Service" value="4" />
                            <Tab label="Tax" value="5" />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1">Starting Price</Typography>
                            <TextField
                              autoComplete="starting_price"
                              type="number"
                              {...getFieldProps('starting_price')}
                              error={Boolean(touched.starting_price && errors.starting_price)}
                              helperText={touched.starting_price && errors.starting_price}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>
                              }}
                              sx={{
                                '& .MuiInputBase-input': {
                                  textAlign: 'right'
                                }
                              }}
                            />
                          </Stack>
                        </TabPanel>
                        <TabPanel value="2">
                          <DataGrid
                            columns={operationColumns}
                            rows={operation}
                            handleAddRow={handleOpenModalO}
                            onEditRowsModelChange={handleEditOperationRowsModelChange}
                            handleResetRows={handleResetOperationRows}
                          />
                        </TabPanel>
                        <TabPanel value="3">
                          <DataGrid
                            columns={goodsColumns}
                            rows={component}
                            handleAddRow={handleOpenModal}
                            onEditRowsModelChange={handleEditComponentRowsModelChange}
                            handleResetRows={handleResetComponentRows}
                            handleDuplicate={handleOpenModalDuplicate}
                            duplicateMaterial={true}
                          />
                        </TabPanel>
                        <TabPanel value="4">
                          <DataGrid
                            columns={serviceColumns}
                            rows={service}
                            handleAddRow={handleOpenModalS}
                            onEditRowsModelChange={handleEditServiceRowsModelChange}
                            handleResetRows={handleResetComponentRows}
                          />
                        </TabPanel>
                        <TabPanel value="5">
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1">Tax</Typography>
                            <TextField
                              autoComplete="tax"
                              type="number"
                              {...getFieldProps('tax')}
                              error={Boolean(touched.tax && errors.tax)}
                              helperText={touched.tax && errors.tax}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                              }}
                              sx={{
                                '& .MuiInputBase-input': {
                                  textAlign: 'right'
                                }
                              }}
                            />
                          </Stack>
                        </TabPanel>
                      </TabContext>
                    </Box>
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

export default BillofMaterial;
