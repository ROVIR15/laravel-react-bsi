import React, { useState, useMemo } from 'react';
import Page from '../../../components/Page';
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  TextField,
  Paper,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';

// API
import API from '../../../helpers';

// Components
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AutoComplete from './components/AutoCompleteB';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function InvoiceReceipt() {
  //AutoComplete props
  const [options, setOptions] = useState([]);
  const [buyerOptions, setBuyerOptions] = useState([]);

  // Props of AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);
  a;

  const InquirySchema = Yup.object().shape({
    no_invoice: Yup.string().required('Id is required'),
    amount: Yup.number().required('Sold to Buyer is required'),
    tax_amount: Yup.number().required('Ship to Buyer is required'),
    invoice_date: Yup.date().required('Invoice Date is required'),
    posting_date: Yup.date().required('Posting Date is required')
  });

  const formik = useFormik({
    initialValues: {
      no_invoice: '',
      amount: 0,
      tax_amount: 0,
      invoice_date: '',
      posting_date: ''
    },
    validationSchema: InquirySchema,
    onSubmit: (values) => {
      const _data = { ...values, inquiry_item: items };
      API.insertInquiry(_data, (res) => {
        if (!res.success) {
          alert('Failed');
        } else {
          alert('Success');
        }
      });
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
    getFieldProps,
    setFieldValue
  } = formik;

  // Preapre data from product features
  React.useEffect(() => {
    let active = true;

    API.getProductFeature((res) => {
      if (!res) return;
      if (!res.data) {
        setOptions([]);
      } else {
        setOptions(res.data);
      }
    });

    API.getBuyers((res) => {
      if (!res) return;
      else setBuyerOptions(res);
    });

    return () => {
      active = false;
    };
  }, [loading]);

  /**
   * Data Grid for Inquiry Items
   */

  const [items, setItems] = useState([]);

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const invoiceReceiptColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
      { field: 'name', headerName: 'Name', editable: false },
      { field: 'size', headerName: 'Size', editable: true },
      { field: 'color', headerName: 'Color', editable: true },
      { field: 'amount', headerName: 'Amount', editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
      { field: 'purchase_order_id', headerName: 'PO Number', editable: true },
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

  // Handling Request from Inquiry Items Data Grid Component
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

  const deleteData = React.useCallback((id) => () => {
    setItems((prevItems) => {
      return prevItems.filter((x) => x.id !== id);
    });
  });

  return (
    <Page>
      <Container>
        <Modal
          payload={[]}
          open={openM}
          options={options}
          handleClose={handleCloseModal}
          setComponent={setItems}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Invoice Receipt Information" />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          autoComplete="no_invoices"
                          type="text"
                          label="No Invoices"
                          {...getFieldProps('no_invoices')}
                          error={Boolean(touched.no_invoices && errors.no_invoices)}
                          helperText={touched.no_invoices && errors.no_invoices}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          autoComplete="amount"
                          type="text"
                          label="Amount"
                          {...getFieldProps('amount')}
                          error={Boolean(touched.amount && errors.amount)}
                          helperText={touched.amount && errors.amount}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          autoComplete="tax_amount"
                          type="text"
                          label="Amount"
                          {...getFieldProps('tax_amount')}
                          error={Boolean(touched.tax_amount && errors.tax_amount)}
                          helperText={touched.tax_amount && errors.tax_amount}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Item Overview" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          autoComplete="invoice_date"
                          type="date"
                          placeholder="invoice_date"
                          label="Invoice Date"
                          {...getFieldProps('invoice_date')}
                          error={Boolean(touched.invoice_date && errors.invoice_date)}
                          helperText={touched.invoice_date && errors.invoice_date}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          autoComplete="posting_date"
                          type="date"
                          label="Posting Date"
                          {...getFieldProps('posting_date')}
                          error={Boolean(touched.posting_date && errors.posting_date)}
                          helperText={touched.posting_date && errors.posting_date}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  columns={invoiceReceiptColumns}
                  rows={items}
                  handleAddRow={handleOpenModal}
                  onEditRowsModelChange={handleEditRowsModelChange}
                  handleResetRows={handleResetRows}
                />
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'end', marginTop: '1.5em' }}>
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

export default InvoiceReceipt;
