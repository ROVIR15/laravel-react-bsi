import React, { useState, useEffect } from 'react';
import Page from '../../../components/Page';
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  TextField,
  Button,
  Stack,
  Paper,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

//Components
import ColumnBox from '../../../components/ColumnBox';
import SpaceBetweenBox from '../../../components/SpaceBetweenBox';
import DialogBoxParty from './components/DialogBox';

//API
import API from '../../../helpers';
import { fCurrency } from '../../../utils/formatNumber';

function capacityProd(labor_alloc, oee_target) {
  return Math.floor(parseInt(labor_alloc) * parseFloat(oee_target) * 8);
}

function costEachDay(work_hours, cost_per_hour, overhead_cost) {
  return Math.floor(parseInt(work_hours) * parseInt(cost_per_hour) + parseInt(overhead_cost));
}

function daysOfWorks(qty, targetEachDay, layout_produksi) {
  return Math.floor(
    parseFloat(parseInt(qty) / parseFloat(targetEachDay)) + Math.floor(layout_produksi)
  );
}

function WorkCenter() {
  const WorkCenterSchema = Yup.object().shape({
    name: Yup.string().required('is required'),
    work_hours: Yup.string().required('is required'),
    company_name: Yup.string().required('is required'),
    overhead_cost: Yup.string().required('References is required'),
    layout_produksi: Yup.string().required('is required'),
    prod_capacity: Yup.string().required('is required'),
    oee_target: Yup.string().required('is required'),
    cost_per_hour: Yup.string().required('is required'),
    labor_alloc: Yup.string().required('is required'),
    description: Yup.string().required('is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      work_hours: 0,
      company_name: 'PT Buana Sandang Indonesia',
      overhead_cost: 0,
      prod_capacity: 0,
      layout_produksi: 0,
      oee_target: '0',
      cost_per_hour: 9240000,
      labor_alloc: 30,
      description: '',
      goods_id: 0,
      cm_target_price: 0,
      target_output: 0,
      qty: 0
    },
    validationSchema: WorkCenterSchema,
    onSubmit: (values) => {
      let _new = values.prod_capacity / 0.85;
      _new = _new.toFixed(1);

      let newPayload = { ...values, prod_capacity: _new };

      try {
        API.insertWorkCenter(newPayload, function (res) {
          if (res.success) alert('success');
          else alert('failed');
        });
      } catch (error) {}

      handleReset();
      setSelectedValueSH({ name: '' });
      setSubmitting(false);
      setImageUrl(null);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    handleReset
  } = formik;

  const [qty, setQty] = React.useState(0);
  const [layProd, setLayProd] = React.useState(0);

  React.useEffect(() => {
    // let { labor_alloc, cost_per_hour, layout_produksi, prod_capacity, oee_target, work_hours } =
    //   values;
    // if (labor_alloc !== 0 && oee_target !== 0) {
    //   let _prod = capacityProd(labor_alloc, oee_target);
    //   setFieldValue('prod_capacity', _prod);
    // }
    // if (qty !== 0 && prod_capacity !== 0) {
    //   let _work = daysOfWorks(qty, capacityProd(labor_alloc, oee_target), layout_produksi);
    //   setFieldValue('work_hours', _work);
    // } else {
    //   return undefined;
    // }

    if (values.cm_target_price !== 0) {
      let target_output = parseFloat(values.cost_per_hour) / parseFloat(values.cm_target_price);
      setFieldValue('prod_capacity', parseInt(target_output));
    }

    if (values.qty !== 0 && values.prod_capacity !== 0) {
      let _work = values.qty / values.prod_capacity;
      let oee_target = values.prod_capacity / values.labor_alloc / 8;
      _work = _work.toFixed(1);
      oee_target = oee_target.toFixed(2);

      setFieldValue('work_hours', _work);
      setFieldValue('oee_target', oee_target);
    }
  }, [values.cm_target_price, values.cost_per_hour, values.qty, values.prod_capacity]);

  // DialogBox for Party
  const [optionPF, setOptionPF] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && optionPF.length === 0;
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: ''
  });
  const [imageUrl, setImageUrl] = useState(null);

  const handleSelectProduct = (data) => {
    if (!data) {
      return;
    } else {
      const { imageUrl, ...rest } = data;
      setImageUrl(data.imageUrl);
      setSelectedValueSH(rest);
      setFieldValue('goods_id', rest.id);
    }
    setOpenSH(false);
  };

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        await API.getFinishedGoods((res) => {
          if (!res) return;
          else {
            const data = res.data.map(function (item) {
              const {
                product: { goods },
                category
              } = item;
              return { ...goods, category: category.name };
            });

            setOptionPF(data);
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
  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <ColumnBox>
                  <SpaceBetweenBox>
                    <Typography variant="h6"> Product </Typography>
                    <Button onClick={() => setOpenSH(true)}>Select</Button>
                  </SpaceBetweenBox>
                  {imageUrl ? <img src={imageUrl} alt="Image" /> : null}
                  <div
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body1">{selectedValueSH?.name}</Typography>
                  </div>
                  <DialogBoxParty
                    options={optionPF}
                    loading={loadingSH}
                    open={openSH}
                    selectedValue={selectedValueSH}
                    onSelect={handleSelectProduct}
                    onClose={() => setOpenSH(false)}
                  />
                </ColumnBox>
              </CardContent>
              {/* Work Center Information */}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="name"
                      type="text"
                      label="Work Center Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
              {/* Work Center Information */}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sm={12} xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="cost_per_hour"
                      type="number"
                      label="Biaya Produksi 1 Line"
                      {...getFieldProps('cost_per_hour')}
                      error={Boolean(touched.cost_per_hour && errors.cost_per_hour)}
                      helperText={touched.cost_per_hour && errors.cost_per_hour}
                    />
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="cm_target_price"
                      type="number"
                      label="Target Harga CM per PCS"
                      {...getFieldProps('cm_target_price')}
                    />
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      autoComplete="prod_capacity"
                      label="Target Kecepatan"
                      {...getFieldProps('prod_capacity')}
                    />
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="qty"
                      label="Target QTY Produksi"
                      {...getFieldProps('qty')}
                    />
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      autoComplete="work_hours"
                      label="Target Hari Penyelesaian"
                      {...getFieldProps('work_hours')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  autoComplete="description"
                  type="text"
                  label="Deskripsi"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </CardContent>

              {/* Button */}
              <CardContent>
                <Typography variant="h5" sx={{ flex: 1, textAlign: 'center' }}>
                  Total Biaya Produksi CM {values.name} Rp.{' '}
                  {fCurrency(
                    costEachDay(values.work_hours, values.cost_per_hour, values.overhead_cost)
                  )}
                </Typography>
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
      </Container>
    </Page>
  );
}

export default WorkCenter;
