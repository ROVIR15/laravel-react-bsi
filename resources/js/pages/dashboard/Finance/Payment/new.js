import React, { useEffect, useState } from 'react';
import Page from '../../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { isArray, isUndefined } from 'lodash';
import ColumnBox from '../../../../components/ColumnBox';
import SpaceBetweenBox from '../../../../components/SpaceBetweenBox';
import DialogBox from './components/DialogBox';
//API
import API from '../../../../helpers';
import { fCurrency } from '../../../../utils/formatNumber';

function PaymentAccountNew() {
  const [cat, setCat] = useState([]);
  const loading = cat.length === 0;

  const [optionsInvoice, setOptionsInvoice] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && optionsInvoice.length === 0;
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    type: {
      name: ''
    }
  });

  const GoodsSchema = Yup.object().shape({
    reff_num: Yup.string().required('account name is required'),
    invoice_id: Yup.number().required('account number is required'),
    type: Yup.number().required('Line is required'),
    effective_date: Yup.date().required('Line is required'),
    amount: Yup.number().required('Line is required'),
    comment: Yup.string().required('Line is required')
  });

  const formik = useFormik({
    initialValues: {
      type: 0,
      invoice_id: 0,
      reff_num: '',
      effective_date: '',
      amount: '0.0',
      comment: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      try {
        API.insertPayment(
          {
            payment_method_type_id: values.type,
            invoice_id: values.invoice_id,
            ref_num: values.reff_num,
            effective_date: values.effective_date,
            amount: values.amount,
            comment: values.comment
          },
          function (res) {
            if (!res.success) alert('failed');
            else alert('success');
            handleReset();
            setSelectedValueSH(null);
          }
        );
      } catch (error) {
        alert('error');
      }
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleReset,
    handleSubmit,
    setFieldValue,
    getFieldProps
  } = formik;

  useEffect(() => {
    let active = true;

    (() => {
      try {
        API.getSalesInvoice('?invoice_type=1', (res) => {
          if (!res) return;
          if (!res.data) {
            setOptionsInvoice([]);
          } else {
            const _data = res.data.map(function (item) {
              const { sales_invoice } = item;
              return {
                id: sales_invoice?.id,
                serial_number: `INV. No ${sales_invoice.id}/${sales_invoice?.sales_order?.id}-${sales_invoice?.sales_order?.sales_order?.id}/${sales_invoice.invoice_date}/${sales_invoice?.sales_order?.sales_order?.po_number}`,
                billed_to: sales_invoice?.party?.name,
                status: sales_invoice?.status[0]?.type?.name,
                total_amount: sales_invoice?.sum[0]?.total_amount*(1 + (sales_invoice?.tax/100))
              };
            });
            setOptionsInvoice(_data);
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

  const handleCloseDialog = (data) => {
    if (!data) {
      setOpenSH(false);
    } else {
      setSelectedValueSH(data);
      setFieldValue('invoice_id', data.id);
      setOpenSH(false);
    }
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (cat.length > 0 || cat.length != 0) return;
    else {
      try {
        API.getPaymentMethodType(function (res) {
          if (isUndefined(res)) throw new Error('Error occured');
          else setCat(res.data);
        });
      } catch (error) {
        alert(error);
      }
    }

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                      <CardContent>
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Invoice </Typography>
                            <Button onClick={() => setOpenSH(true)}>Select</Button>
                          </SpaceBetweenBox>
                          <div>
                            <Typography variant="subtitle1">
                              {selectedValueSH?.serial_number}
                            </Typography>
                            <Typography variant="body2">{selectedValueSH?.billed_to}</Typography>
                          </div>
                          <DialogBox
                            options={optionsInvoice}
                            loading={loadingSH}
                            // error={Boolean(touched.facility_id && errors.facility_id)}
                            // helperText={touched.facility_id && errors.facility_id}
                            // selectedValue={values.facility_id}
                            open={openSH}
                            onClose={(value) => handleCloseDialog(value)}
                          />
                        </ColumnBox>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
                      <CardContent>
                        <ColumnBox>
                          <SpaceBetweenBox>
                            <Typography variant="h6"> Invoice Amount </Typography>
                          </SpaceBetweenBox>
                        </ColumnBox>
                        <Typography variant="h3" sx={{ color: '#636b6f'}}>
                          Rp. {fCurrency(selectedValueSH?.total_amount)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={7}>
                <Card>
                  <CardHeader title="Payment Information" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="reff_num"
                          type="number"
                          label="Reff Number"
                          {...getFieldProps('reff_num')}
                          error={Boolean(touched.reff_num && errors.reff_num)}
                          helperText={touched.reff_num && errors.reff_num}
                        />
                      </Grid>

                      <Grid item xs={12} lg={5}>
                        <FormControl fullWidth>
                          <InputLabel>Tipe Akun Rekening</InputLabel>
                          <Select
                            autoComplete="type"
                            type="number"
                            {...getFieldProps('type')}
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                          >
                            {!isArray(cat)
                              ? null
                              : cat.map(function (x) {
                                  return <MenuItem value={x.id}>{`${x.name}`}</MenuItem>;
                                })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="effective_date"
                          type="date"
                          label="Payment Date"
                          {...getFieldProps('effective_date')}
                          error={Boolean(touched.effective_date && errors.effective_date)}
                          helperText={touched.effective_date && errors.effective_date}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          InputProps={{
                            startAdornment: <InputAdornment position="start">Rp.</InputAdornment>
                          }}
                          type="number"
                          label="Amount Payment"
                          {...getFieldProps('amount')}
                          error={Boolean(touched.amount && errors.amount)}
                          helperText={touched.amount && errors.amount}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <TextField
                      fullWidth
                      name="comment"
                      multiline
                      rows="3"
                      type="text"
                      label="Comment"
                      {...getFieldProps('comment')}
                      error={Boolean(touched.comment && errors.comment)}
                      helperText={touched.comment && errors.comment}
                    />
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

export default PaymentAccountNew;
