import React, { useState, useMemo, useEffect } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  InputAdornment,
  TextField,
  Tab,
  Typography,
  Select,
  Stack,
  Table,
  TableRow,
  TableCell
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams, useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// API
import API from '../../../helpers';
// Components
import ColumnBox from '../../../components/ColumnBox';
import SpaceBetweenBox from '../../../components/SpaceBetweenBox';
import DialogBoxParty from './components/DialogBoxParty';

import DataGrid from '../../../components/DataGrid';
import Modal from './components/ModalNewP';
import Modal2 from './components/ModalNewO';
import Modal3 from './components/ModalShowS';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

// snackbar
import { enqueueSnackbar } from 'notistack';

import {
  optionProductFeature,
  partyArrangedData,
  serviceList,
  BomServiceList
} from '../../../helpers/data';
import { isUndefined, isEmpty, isNull } from 'lodash';
import LoadingPage from './components/LoadingPage';
import useAuth from '../../../context';

function getPathname(array) {
  if (!array.length) console.error('Require an Array type');
  return '/' + array[1] + '/' + array[2] + '/' + array[3];
}

function totalConsumption(params) {
  return parseFloat(params.row.unit_price) * parseFloat(params.row.consumption);
}

function totalMoney(params) {
  return (parseFloat(params.row.consumption) * params.row.unit_price).toFixed(4);
}

function BillofMaterial() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user } = useAuth();

  const [items, setItems] = useState([]);

  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  // Options for Product Feature
  const [options, setOptions] = useState([]);

  // Options for Service
  const [options4, setOptions4] = useState([]);

  // Options for Product
  const [options3, setOptions3] = useState([]);

  // Options for Work Center
  const [options2, setOptions2] = useState([]);

  //Data Grid variable items
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

  const navigate = useNavigate();

  const [listPO, setListPO] = useState([]);
  const [statusCosting, setStatusCosting] = useState({ id: null, status_type: null });

  /**
   * Handling GET Bill of Material Information from spesific bom_id
   */
  useEffect(async () => {
    if (!id) return;

    const load = await axios
      .get(process.env.MIX_API_URL + '/bom' + `/${id}`)
      .then(function ({ data: { data, items } }) {
        setStatusCosting(data?.status[0]);
        setListPO(items);
        return data;
      })
      .catch((error) => {
        alert(error);
      });

    setValues({
      id: load.id,
      currency_id: load.currency_info?.id,
      party_id: load.party?.id,
      product_id: load.product_id,
      product_feature_id: load.product_feature_id,
      name: load.name,
      qty: load.qty,
      margin: load?.margin,
      starting_price: load?.starting_price,
      tax: load?.tax,
      start_date: load.start_date,
      end_date: load.end_date,
      company_name: load.company_name
    });

    setSelectedValueSH(load.party);

    const load2 = load?.bom_items;

    var c = load2.map((key) => {
      const {
        product_feature: {
          size,
          color,
          product: { goods }
        },
        ...rest
      } = key;

      let item_name = `${goods?.name} ${color} ${size}`;
      const sku_id = `RM-${key?.product_feature?.product?.goods_id}-${key?.product_feature?.product?.id}-${key?.product_feature?.id}`;

      return {
        ...goods,
        ...rest,
        size,
        color,
        sku_id: sku_id,
        item_name,
        goods_id: key?.product_feature?.product?.goods_id,
        product_id: key?.product_id,
        product_feature_id: key.product_feature_id,
        bom_id: key.bom_id,
        qty: key.qty,
        company_name: key.company_name
      };
    });
    setComponent(c);

    const load3 = load?.bom_services;

    var s = BomServiceList(load3);
    setService(s);

    const load4 = load?.operations;

    var o = load4.map((key) => {
      const { work_center_info, seq, id, work_center_id, bom_id } = key;
      return {
        ...work_center_info,
        seq,
        bom_id,
        id,
        work_center_id
      };
    });
    setOperation(o);
  }, [id]);

  const editableUser = user.id === 2 ? true : false;
  const editableCondition = isEmpty(statusCosting) ? true : statusCosting.status_type === 'Submit' ? true : false;
  const __editable = editableUser || editableCondition

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
    currency_id: Yup.number().required('Currency is required'),
    name: Yup.string().required('Name is required'),
    product_id: Yup.string().required('Product ID is required'),
    company_name: Yup.string().required('Company is required'),
    qty: Yup.number().required('Quantity BOM is required'),
    margin: Yup.number().required('Margin is required'),
    tax: Yup.number().required('Tax is required')
  });

  const formik = useFormik({
    initialValues: {
      currency_id: 2,
      party_id: '',
      name: '',
      product_id: '',
      product_feature_id: '',
      company_name: '',
      qty: '',
      margin: 0,
      tax: 11,
      start_date: '',
      end_date: ''
    },
    validationSchema: BOMSchema,
    onSubmit: (values) => {
      try {
        API.updateBOM(id, values, function (res) {
          if (res.success) enqueueSnackbar('Item updated', { variant: 'successAlert' });
          else enqueueSnackbar('failed to update', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('Failed to update', { variant: 'failedAlert' });
      }
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    setValues,
    setFieldValue,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  useEffect(() => {
    let active = true;

    (async () => {
      await API.getProductFeature((res) => {
        if (!res) return;
        if (!res.data) {
          setOptions([]);
        } else {
          let data = optionProductFeature(res.data);
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
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const goodsColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
      { field: 'sku_id', headerName: 'SKU ID', editable: false, visible: 'hide' },
      { field: 'item_name', width: 300, headerName: 'Name', editable: false },
      // { field: 'size', headerName: 'Size', editable: true },
      // { field: 'color', headerName: 'Color', editable: true },
      // { field: 'brand', headerName: 'Brand', editable: false },
      { field: 'consumption', headerName: 'Konsumsi', editable: true },
      // { field: 'allowance', headerName: 'Allowance %', editable: true },
      { field: 'unit_price', headerName: 'Harga', editable: true },
      // { field: 'qty', headerName: 'Total Konsumsi', editable: true, valueGetter: totalConsumption },
      {
        field: 'jumlah',
        headerName: 'Biaya Unit',
        editable: editableUser,
        valueGetter: totalMoney
      },
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
          />,
          <GridActionsCellItem
            // icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Edit Material"
            onClick={editMaterial(params.row.goods_id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteDataComponent, editMaterial]
  );

  const deleteDataComponent = React.useCallback((id) => () => {
    if (!editableUser || !editableCondition) return;

    setComponent((prevComponent) => {
      return prevComponent.filter((x) => x.id !== id);
    });

    try {
      API.deleteABOMItem(id, (res) => {
        if (res.success) enqueueSnackbar('Item Deleted', { variant: 'successAlert' });
        else enqueueSnackbar('', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }

    handleUpdateAllComponentRows();
  });

  const editMaterial = React.useCallback((id) => () => {
    navigate(`../../material/goods/${id}`);
  });

  const operationColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, hideable: true, width: 30 },
      { field: 'seq', headerName: 'seq', editable: true, width: 30 },
      { field: 'work_center_id', headerName: 'Work Center ID', editable: false, width: 30 },
      { field: 'name', width: 300, headerName: 'Operation Name', editable: false, width: 250 },
      {
        field: 'work_hours',
        headerName: 'Working Days',
        editable: false,
        width: 100,
        align: 'left'
      },
      {
        field: 'cost_per_hour',
        headerName: 'Cost per Days',
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
      { field: 'id', headerName: 'ID', editable: false, hideable: false, width: 30 },
      { field: 'name', headerName: 'Service Name', editable: false, width: 250 },
      { field: 'unit_price', headerName: 'Harga', editable: editableCondition },
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
        if (editableUser) {
          const editedIds = Object.keys(editRowsModel);
          const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

          //update items state
          const data = new Object();
          data[editedColumnName] = editRowData[editedColumnName].value;

          try {
            API.updateABOMItem(editedIds, data, function (res) {
              if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
              else enqueueSnackbar('', { variant: 'failedAlert' });
            });
          } catch (error) {
            enqueueSnackbar('', { variant: 'failedAlert' });
          }
        } else {
          if (editableCondition) {
            const editedIds = Object.keys(editRowsModel);
            const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

            //update items state
            const data = new Object();
            data[editedColumnName] = editRowData[editedColumnName].value;

            try {
              API.updateABOMItem(editedIds, data, function (res) {
                if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
                else enqueueSnackbar('', { variant: 'failedAlert' });
              });
            } catch (error) {
              enqueueSnackbar('', { variant: 'failedAlert' });
            }
          }
        }
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllComponentRows = async () => {
    const load2 = await axios
      .get(process.env.MIX_API_URL + '/bom-item' + `/${id}`)
      .then(function ({ data: { data } }) {
        return data;
      })
      .catch((error) => {
        alert(error);
      });

    var c = load2.map((key) => {
      const {
        product_feature: {
          size,
          color,
          product: { goods }
        },
        ...rest
      } = key;

      let item_name = `${goods?.name} ${color} ${size}`;
      const sku_id = `RM-${key?.product_feature?.product?.goods_id}-${key?.product_feature?.product?.id}-${key?.product_feature?.id}`;

      return {
        ...goods,
        ...rest,
        size,
        color,
        sku_id: sku_id,
        item_name,
        product_feature_id: key.product_feature_id,
        bom_id: key.bom_id,
        qty: key.qty,
        company_name: key.company_name
      };
    });
    setComponent(c);
  };

  const handleResetComponentRows = () => {
    setComponent([]);
  };

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
        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;

        try {
          API.updateOperation(editedIds, data, function (res) {
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

  const handleUpdateAllOperationRows = async () => {
    const load4 = await axios
      .get(process.env.MIX_API_URL + '/operation' + `/${id}`)
      .then(function ({ data: { data } }) {
        return data;
      })
      .catch((error) => {
        alert(error);
      });

    var o = load4.map((key) => {
      const { work_center_info, seq, id, work_center_id, bom_id } = key;
      return {
        ...work_center_info,
        seq,
        bom_id,
        id,
        work_center_id
      };
    });

    setOperation(o);
  };

  const handleResetOperationRows = () => {
    setComponent([]);
  };

  const deleteDataOperation = React.useCallback((id) => () => {
    setOperation((prevOperation) => {
      return prevOperation.filter((x) => x.id !== id);
    });

    API.deleteOperation(id, (res) => {
      alert('success');
    });

    handleUpdateAllOperationRows();
  });

  /**
   * Handling Data Grid for a Component BOM
   */

  const handleEditServiceRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        if (editableUser) {
          const editedIds = Object.keys(editRowsModel);
          const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

          //update items state
          const data = new Object();
          data[editedColumnName] = editRowData[editedColumnName].value;

          try {
            API.updateABOMService(editedIds, data, function (res) {
              if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
              else enqueueSnackbar('', { variant: 'failedAlert' });
            });
          } catch (error) {
            enqueueSnackbar('', { variant: 'failedAlert' });
          }
        } else {
          if (editableCondition) {
            const editedIds = Object.keys(editRowsModel);
            const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

            //update items state
            const data = new Object();
            data[editedColumnName] = editRowData[editedColumnName].value;

            try {
              API.updateABOMService(editedIds, data, function (res) {
                if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
                else enqueueSnackbar('', { variant: 'failedAlert' });
              });
            } catch (error) {
              enqueueSnackbar('', { variant: 'failedAlert' });
            }
          }
        }
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllServiceRows = async () => {
    const load2 = await axios
      .get(process.env.MIX_API_URL + '/bom-service' + `/${id}`)
      .then(function ({ data: { data } }) {
        return data;
      })
      .catch((error) => {
        alert(error);
      });

    var c = BomServiceList(load2);
    setService(c);
  };

  const handleResetServiceRows = () => {
    setService([]);
  };

  const deleteDataService = React.useCallback((id) => () => {
    setService((prevService) => {
      return prevService.filter((x) => x.id !== id);
    });

    API.deleteABOMService(id, (res) => {
      alert('success');
    });

    handleUpdateAllServiceRows();
  });

  return (
    <Page>
      <Container>
        <Modal
          payload={component}
          bom_id={id}
          open={openM}
          options={options}
          items={component}
          setItems={setComponent}
          handleClose={handleCloseModal}
          updateIt={handleUpdateAllComponentRows}
        />
        <Modal2
          payload={operation}
          bom_id={id}
          open={openMO}
          options={options2}
          items={operation}
          setItems={setOperation}
          handleClose={handleCloseModalO}
          updateIt={handleUpdateAllOperationRows}
        />
        <Modal3
          payload={[]}
          bom_id={id}
          open={openS}
          options={options4}
          handleClose={handleCloseModalS}
          updateIt={handleUpdateAllServiceRows}
          setComponent={setService}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {isSubmitting ? (
              LoadingPage
            ) : (
              <Grid container spacing={3}>
                {/* BOM Form */}
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="Costing Information" />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                              error={Boolean(touched.party_id && errors.party_id)}
                              helperText={touched.party_id && errors.party_id}
                              selectedValue={values.party_id}
                              open={openSH}
                              onClose={(value) => handleCloseDialogParty(value)}
                            />
                          </ColumnBox>
                        </Grid>
                        <Grid item xs={2}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                              label="Currency"
                              // onChange={handleChange}
                              {...getFieldProps('currency_id')}
                              error={Boolean(touched.currency_id && errors.currency_id)}
                              helperText={touched.currency_id && errors.currency_id}
                            >
                              <MenuItem value={1}>USD</MenuItem>
                              <MenuItem value={2}>IDR</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={10}>
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
                          <TextField
                            fullWidth
                            autoComplete="product_id"
                            type="text"
                            label="Product Id"
                            {...getFieldProps('product_id')}
                            disabled
                            error={Boolean(touched.product_id && errors.product_id)}
                            helperText={touched.product_id && errors.product_id}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            autoComplete="product_feature_id"
                            type="text"
                            label="Product Variant Id"
                            {...getFieldProps('product_feature_id')}
                            disabled
                            error={Boolean(touched.product_feature_id && errors.product_feature_id)}
                            helperText={touched.product_feature_id && errors.product_feature_id}
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
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: '100%',
                              border: '1px dashed #b8b8b8',
                              padding: '0.5em 0.25em',
                              borderRadius: '5px'
                            }}
                          >
                            <TabContext value={valueTab}>
                              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                  onChange={handleChangeTab}
                                  aria-label="lab API tabs example"
                                >
                                  <Tab label="Initial Price" value="1" />
                                  <Tab label="Work" value="2" />
                                  <Tab label="Material" value="3" />
                                  <Tab label="Service" value="4" />
                                  <Tab label="Tax" value="5" />
                                  <Tab label="List PO" value="6" />
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
                                      startAdornment: (
                                        <InputAdornment position="start">Rp</InputAdornment>
                                      )
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
                                  handleUpdateAllRows={handleUpdateAllComponentRows}
                                />
                              </TabPanel>
                              <TabPanel value="4">
                                <DataGrid
                                  columns={serviceColumns}
                                  rows={service}
                                  handleAddRow={handleOpenModalS}
                                  onEditRowsModelChange={handleEditServiceRowsModelChange}
                                  handleUpdateAllRows={handleUpdateAllServiceRows}
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
                                      endAdornment: (
                                        <InputAdornment position="end">%</InputAdornment>
                                      )
                                    }}
                                    sx={{
                                      '& .MuiInputBase-input': {
                                        textAlign: 'right'
                                      }
                                    }}
                                  />
                                </Stack>
                              </TabPanel>
                              <TabPanel value="6">
                                <Table>
                                  <TableRow>
                                    <TableCell>
                                      <Typography variant="h6">No</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nama Barang</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Qty</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nomor PO</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nomor PIB</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nomor Penerimaan</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nomor Invoice</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Typography variant="h6">Nomor Payment</Typography>
                                    </TableCell>
                                  </TableRow>
                                  {!isEmpty(listPO) ? (
                                    listPO.map(function (item, index) {
                                      return (
                                        <TableRow>
                                          <TableCell variant="subtitle">{index + 1}</TableCell>
                                          <TableCell variant="subtitle">
                                            <Typography variant="body1">
                                              {`${item.item_name}`}
                                            </Typography>
                                          </TableCell>
                                          <TableCell variant="subtitle">
                                            <Typography variant="body1">
                                              {`${item.qty} ${item.unit_measurement}`}
                                            </Typography>
                                          </TableCell>
                                          <TableCell variant="subtitle">
                                            {isNull(item.purchase_order_id) ? null : (
                                              <Typography
                                                variant="body1"
                                                component="a"
                                                href={`../../purchasing/purchase-order/${item.purchase_order_id}`}
                                              >
                                                {`PO-0${item.purchase_order_id}`}
                                              </Typography>
                                            )}
                                          </TableCell>
                                          <TableCell variant="subtitle">
                                            {isNull(item.document_number) ? null : (
                                              <Typography
                                                variant="body1"
                                                component="a"
                                                href={`../../kite/import/${item.import_id}`}
                                              >
                                                {`PIB-${item.document_number}`}
                                              </Typography>
                                            )}
                                          </TableCell>
                                          <TableCell variant="subtitle">
                                            {isNull(item.shipment_id) ? null : (
                                              <Typography
                                                variant="body1"
                                                component="a"
                                                href={`../../shipment/incoming/${item.shipment_id}`}
                                              >
                                                {`INSHIP-${item.shipment_id}`}
                                              </Typography>
                                            )}
                                          </TableCell>
                                          <TableCell variant="subtitle">
                                            {isNull(item.invoice_id) ? null : (
                                              <Typography
                                                variant="body1"
                                                component="a"
                                                href={`../../finance/vendor-bills/${item.invoice_id}`}
                                              >
                                                {`INV-${item?.invoice_id}`}
                                              </Typography>
                                            )}
                                          </TableCell>
                                          <TableCell variant="subtitle">
                                            {isNull(item.payment_id) ? null : (
                                              <Typography
                                                variant="body1"
                                                component="a"
                                                href={`../../finance/payment/${item?.payment_id}`}
                                              >
                                                {`PAYMENT-${item?.payment_id}`}
                                              </Typography>
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })
                                  ) : (
                                    <TableRow>Data is empty!</TableRow>
                                  )}
                                </Table>
                              </TabPanel>
                            </TabContext>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box
                            sx={{ paddingTop: 2, px: 0, display: 'flex', justifyContent: 'end' }}
                          >
                            <LoadingButton
                              size="large"
                              type="submit"
                              variant="contained"
                              loading={isSubmitting}
                              sx={{ m: 1 }}
                            >
                              Save
                            </LoadingButton>
                            <Button
                              component={RouterLink}
                              to={getPathname(pathname.split('/')) + `/document/${id}`}
                              size="large"
                              color="grey"
                              variant="contained"
                              sx={{ m: 1 }}
                            >
                              Show
                            </Button>
                            <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                              Cancel
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default BillofMaterial;
