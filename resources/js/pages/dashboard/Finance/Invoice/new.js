import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Typography,
  Paper,
  Stack,
  TextField,
  styled,
  IconButton
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

import DataGrid from './components/DataGrid';
import DialogBox from './components/DBBuyer';
import DialogBoxShipment from './components/DialogBox';

import AutoComplete from './components/AutoComplete';
import API from '../../../../helpers';

//Icons
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { partyArrangedData } from '../../../../helpers/data';

import { orderItemToInvoiceItem } from '../utils';
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

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

function Invoice() {
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: 'PT. Buana Sandang Indonesia',
    address:
      'Jl. Raya Albisindo Desa Gondosari, RT 01 RW 05, Kec. Gebog, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 59354,
    phone_number: '(0291) 4251259'
  });

  const formik = useFormik({
    initialValues: {
      order_id: [],
      sales_order_id: [],
      shipment_id: [],
      sold_to: 0,
      invoice_date: '',
      description: '',
      tax: 0
    },
    onSubmit: (values) => {
      let _data = { ...values, items, type: 1, terms: rowsInvoiceTerm };
      try {
        API.insertSalesInvoice(_data, (res) => {
          if (!res) return undefined;
          if (!res.success) throw new Error('failed to store data');
          else alert('success');
        });
      } catch (error) {
        alert(error);
      }
      setSubmitting(false);
    }
  });

  // Dialog Box Option
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedValueSO, setSelectedValueSO] = React.useState({
    name: '',
    address: '',
    postal_code: 0
  });
  const loading = openDialogBox && options.length === 0;

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  // Preapre data from buyer
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

  const handleClose = (name, value) => {
    setOpenDialogBox(false);
    setOptions([]);
    if (value) {
      setSelectedValueSO({
        name: value.name,
        address: `${value.street} ${value.city} ${value.province} ${value.country}`,
        postal_code: value.postal_code
      });
      setFieldValue('sold_to', value.id);
    }
  };

  //   END

  /**
   * Data Grid for Invoice Item
   */

  const [items, setItems] = React.useState([]);

  const columns = React.useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false },
    { field: 'size', headerName: 'Size', editable: false },
    { field: 'color', headerName: 'Color', editable: false },
    { field: 'qty', headerName: 'Quantity', type: 'number', editable: false, flex: 1 },
    { field: 'amount', type: 'number', headerName: 'Unit Price', editable: false, flex: 1 },
    { field: 'total', type: 'number', headerName: 'Total', editable: false, flex: 1 },
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
  ]);

  /**
   * Handle Invoice Term
   */
  const [rowsInvoiceTerm, setRowsInvoiceTerm] = useState([]);
  const columnsInvoiceTerm = React.useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'term_description', headerName: 'Term Description', editable: true, width: 350 },
    { field: 'term_value', headerName: 'Value', editable: true, type: 'number' },
    {
      field: 'value_type',
      headerName: 'Type',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Percentage', 'Number']
    }
  ]);

  const handleAddInvoiceTerm = () => {
    setRowsInvoiceTerm([
      ...rowsInvoiceTerm,
      {
        id: rowsInvoiceTerm.length + 1,
        invoice_id: null,
        invoice_item_id: null,
        term_description: 'contoh. Potongan',
        term_value: 0
      }
    ]);
  };

  /**
   * Handling Data Grid for a Component BOM
   */

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setRowsInvoiceTerm((prevItems) => {
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

  const deleteData = React.useCallback((id) => () => {
    setItems((prevItems) => {
      const rowToDeleteIndex = id;
      return [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];
    });
  });

  // AutoComplete

  const [optionsAutoComplete, setOptionsAutoComplete] = React.useState([]);
  const [selectedShipment, setSelectedShipment] = React.useState({
    id: '',
    po_number: ''
  });
  const [openAutoComplete, setOpenAutoComplete] = React.useState(false);
  const loadingAutoComplete = openAutoComplete && optionsAutoComplete.length === 0;

  React.useEffect(() => {
    let active = true;

    (async () => {
      API.getShipment(`?shipment_type=2`, (res) => {
        if (!res) return;
        if (!res.data) {
          setOptionsAutoComplete([]);
        } else {
          let _done = res.data.map(function (item) {
            return {
              id: item.id,
              name: item.order?.sales_order?.po_number,
              date: item.delivery_date
            };
          });
          setOptionsAutoComplete(_done);
        }
      });
    })();

    return () => {
      active = false;
    };
  }, [loadingAutoComplete]);

  const changeData = (payload) => {
    let invoiceItems = orderItemToInvoiceItem(payload.items);
    setFieldValue('sales_order_id', payload.order.sales_order.id);
    setFieldValue('order_id', payload.order.id);
    setItems(invoiceItems);
  };

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

  // DialogBox for Payment
  const [optionsShipment, setOptionsShipment] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && options.length === 0;

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let active = true;

    (() => {
      try {
        API.getShipmentForInvoicing(`?shipment_type=2`, (res) => {
          if (!res) return;
          if (!res.data) {
            setOptionsShipment([]);
          } else {
            let _done = res.data;
            setOptionsShipment(_done);
          }
        });
      } catch (error) {
        alert(error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSH]);

  useEffect(() => {
    if (isEmpty(selected)) return;
    else {
      const _conv = selected.reduce(
        function (initial, next) {
          const _sss = orderItemToInvoiceItem(next.items);

          return {
            sales_order_id: [...initial.sales_order_id, next.order.sales_order.id],
            order_id: [...initial.order_id, next.order.id],
            shipment_id: [...initial.shipment_id, next.id],
            items: initial.items.concat(_sss)
          };
        },
        {
          sales_order_id: [],
          order_id: [],
          shipment_id: [],
          items: []
        }
      );
      setFieldValue('sales_order_id', _conv.sales_order_id);
      setFieldValue('order_id', _conv.order_id);
      setFieldValue('shipment_id', _conv.shipment_id);
      setItems(_conv.items);
    }
  }, [selected]);

  return (
    <FormikProvider value={formik}>
      <DialogBoxShipment
        options={optionsShipment}
        loading={loadingSH}
        selected={selected}
        setSelected={setSelected}
        // error={Boolean(touched.facility_id && errors.facility_id)}
        // helperText={touched.facility_id && errors.facility_id}
        // selectedValue={values.facility_id}
        open={openSH}
        onClose={() => setOpenSH(false)}
      />

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Invoice Date" />
          <CardContent>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12} lg={4}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    autoComplete="invoice_date"
                    type="date"
                    placeholder="invoice_date"
                    {...getFieldProps('invoice_date')}
                    error={Boolean(touched.invoice_date && errors.invoice_date)}
                    helperText={touched.invoice_date && errors.invoice_date}
                  />
                  <TextField
                    fullWidth
                    autoComplete="due_date"
                    type="number"
                    placeholder="due_date"
                    {...getFieldProps('due_date')}
                    error={Boolean(touched.due_date && errors.due_date)}
                    helperText={touched.due_date && errors.due_date}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">Hari</InputAdornment>
                    }}
                  />
                </Stack>
              </Grid>

              <Grid item lg={8} xs={12}>
                <ColumnBox
                  style={{
                    padding: '1em 0.75em',
                    border: '1px dashed #b8b8b8',
                    borderRadius: '8px'
                  }}
                >
                  <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Penagihan ke </Typography>
                        <Button onClick={() => setOpenDialogBox(true)}>Select</Button>
                      </SpaceBetweenBox>
                      {selectedValueSO?.name ? (
                        <div>
                          <Typography variant="subtitle1">{selectedValueSO?.name}</Typography>
                          <Typography component="span" variant="caption">
                            {selectedValueSO?.address}
                          </Typography>
                          <Typography variant="body2">{`${selectedValueSO?.postal_code}`}</Typography>
                        </div>
                      ) : null}
                      <DialogBox
                        options={options}
                        loading={loading}
                        error={Boolean(touched.sold_to && errors.sold_to)}
                        helperText={touched.sold_to && errors.sold_to}
                        selectedValue={values.sold_to}
                        open={openDialogBox}
                        onClose={(value) => handleClose('sold_to', value)}
                      />
                    </ColumnBox>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Penagih </Typography>
                        <Button disabled>Select</Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">{selectedValueSH.name}</Typography>
                        <Typography variant="body1">{selectedValueSH.address}</Typography>
                        <Typography variant="body1">{selectedValueSH.postal_code}</Typography>{' '}
                      </div>
                    </ColumnBox>
                  </Stack>
                </ColumnBox>
              </Grid>
            </Grid>
          </CardContent>

          {/* Data Grid for Invoice Item */}
          <CardContent>
            <ColumnBox
              style={{
                padding: '1em 0.75em',
                border: '1px dashed #b8b8b8',
                borderRadius: '8px'
              }}
            >
              <Box sx={{ paddingBottom: 0 }}>
                <GridData>
                  <Typography variant="h6">Shipment</Typography>
                  <IconButton
                    onClick={() => setOpenSH(true)}
                    sx={{
                      height: '36px',
                      width: '36px',
                      backgroundColor: 'rgb(255, 255, 255)',
                      color: 'rgb(54, 179, 126)'
                    }}
                  >
                    <Icon icon={plusSquare} />
                  </IconButton>
                </GridData>
              </Box>
              <Box>
                <DataGrid rows={items} columns={columns} />
              </Box>
            </ColumnBox>
          </CardContent>

          {/* Tab Panel */}
          <CardContent>
            <TabContext value={valueTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                  <Tab label="Description" value="1" />
                  <Tab label="Finance" value="2" />
                  <Tab label="Terms" value="3" />
                </TabList>
              </Box>

              <TabPanel value="1">
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

              <TabPanel value="2">
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

              <TabPanel value="3">
                <DataGrid
                  columns={columnsInvoiceTerm}
                  rows={rowsInvoiceTerm}
                  handleAddRow={handleAddInvoiceTerm}
                  onEditRowsModelChange={handleEditRowsModelChange}
                />
              </TabPanel>
            </TabContext>
          </CardContent>

          <CardContent>
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
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}

export default Invoice;
