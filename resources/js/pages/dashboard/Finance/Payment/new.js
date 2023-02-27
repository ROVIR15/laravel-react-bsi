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
  Paper,
  Select,
  TextField,
  Typography,
  styled,
  IconButton
} from '@mui/material';
import { isArray, isUndefined } from 'lodash';
import DialogBox from './components/DialogBox';
//API
import API from '../../../../helpers';
import { fCurrency } from '../../../../utils/formatNumber';
import BasicTable from './components/BasicTable';
//Icons
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import { Icon } from '@iconify/react';

//
import { generateInvSerialNumber_alt } from '../utils'

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

const UploadPaper = styled(Button)(({ theme }) => ({
  outline: 'none',
  padding: '40px 8px',
  borderRadius: '8px',
  backgroundColor: 'rgb(244, 246, 248)',
  border: '1px dashed rgba(145, 158, 171, 0.32)',
  height: '100%'
}));

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

  const [selected, setSelected] = useState([]);

  const GoodsSchema = Yup.object().shape({
    ref_num: Yup.string().required('account name is required'),
    invoice_id: Yup.array().required('account number is required'),
    type: Yup.number().required('Line is required'),
    effective_date: Yup.date().required('Line is required'),
    amount: Yup.number().required('Line is required')
  });

  const formik = useFormik({
    initialValues: {
      type: 0,
      invoice_id: 0,
      ref_num: '',
      effective_date: '',
      amount: '0.0',
      comment: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      try {
        const { invoice_id, type, ...item } = values;

        let load = invoice_id.map((i) => ({ ...item, invoice_id: i.id, amount: i.amount, payment_method_type_id: type, imageUrl: file }));
        API.insertPayment(
          {
            payment_method_type_id: values.type,
            invoice_id: values.invoice_id,
            ref_num: values.ref_num,
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

        // API.insertManyPayment(
        //   load,
        //   function (res) {
        //     if (!res.success) alert('failed');
        //     else alert('success');
        //     handleReset();
        //     setSelectedValueSH(null);
        //   }
        // );
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
        API.getInvoiceHasPayment('', (res) => {
          if (!res) return;
          if (!res.data) {
            setOptionsInvoice([]);
          } else {
            const _data = res.data.map(function (item) {
              const { all_invoice_type } = item;

              return {
                id: item?.invoice_id,
                type: item?.invoice_type_id,
                serial_number: generateInvSerialNumber_alt(all_invoice_type, item.invoice_type_id),
                billed_to: all_invoice_type?.party?.name,
                status: all_invoice_type?.status[0]?.type?.name,
                total_amount: all_invoice_type?.sum[0]?.total_amount * (1 + all_invoice_type?.tax / 100)
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

  const billedAmount = selected.reduce((initial, next) => initial + next?.total_amount, 0);

  const handleCloseDialog = () => {
    // if (!data) {
    //   setOpenSH(false);
    // } else {
    // setSelectedValueSH(data);
    const a = selected.map((e) => {
      if(e.type === 1) return ({ id: e.id, type: e.type, amount: e.total_amount });
      if(e.type === 2) return ({ id: e.id, type: e.type, amount: e.total_amount*-1 });
      else return ({ id: e.id, type: 0, amount: e.total_amount * 0});
    });

    console.log(a);
    setFieldValue('invoice_id', a);
    setFieldValue('amount', billedAmount);
    setOpenSH(false);
    // }
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

  const [file, setFile] = useState(null);

  function ShowImageWhenItsUploaded() {
    if (file) {
      return (
        <Paper sx={{ padding: 2, height: '100%' }}>
          <img src={file} alt="Image" sx={{height: '50%', width: '50%', margin: 'auto'}}/>
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

    API.uploadPaymentImage(formData, function (res) {
      if (res.success) {
        setFile(res.path);
        alert(JSON.stringify(res));
      } else {
        alert('error');
      }
    });
  };

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* <Grid item xs={5}>
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
                            selected={selected}
                            setSelected={setSelected}
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
                        <Typography variant="h3" sx={{ color: '#636b6f' }}>
                          Rp. {fCurrency(billedAmount)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid> */}

              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Payment Information" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="ref_num"
                          type="number"
                          label="Reff Number"
                          {...getFieldProps('ref_num')}
                          error={Boolean(touched.ref_num && errors.ref_num)}
                          helperText={touched.ref_num && errors.ref_num}
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
                <DialogBox
                  options={optionsInvoice}
                  loading={loadingSH}
                  selected={selected}
                  setSelected={setSelected}
                  // error={Boolean(touched.facility_id && errors.facility_id)}
                  // helperText={touched.facility_id && errors.facility_id}
                  // selectedValue={values.facility_id}
                  open={openSH}
                  onClose={(value) => handleCloseDialog(value)}
                />

                <Card>
                  <CardContent sx={{ py: '24px', paddingTop: '10px', paddingBottom: '4px' }}>
                    <GridData>
                      <Typography variant="h6">Invoice List</Typography>
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
                  </CardContent>
                  <CardContent>
                    <BasicTable payload={selected} total={fCurrency(billedAmount)} />
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
                <Card>
                  <CardHeader
                    title="Upload Proof"
                  />
                  <ShowImageWhenItsUploaded />
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
