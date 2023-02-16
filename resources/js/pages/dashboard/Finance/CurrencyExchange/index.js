import React, { useEffect, useState } from 'react';
import { Box, Loading, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Layout from '../../../../layouts/Layout';
import { styled } from '@mui/material';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import TableHistory from './display';
import API from '../../../../helpers';

const StyledBox = styled(Box)(({ theme }) => ({
  minWidth: '500px',
  maxWidth: '600px',
  paddingTop: '2em',
  paddingBottom: '2em',
  paddingLeft: '1em',
  paddingRight: '1em',
  margin: 'auto'
}));

export const Schema = Yup.object().shape({
  usd: Yup.number().required('USD is required'),
  idr: Yup.number().required('IDR is required')
});

function CurrencyExchange() {

  const [historyData, setHistoryData] = useState([])

  const formik = useFormik({
    initialValues: {
      usd: 1,
      idr: 0
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      try {
        API.updateNewCurrency(values, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed to store data');
          else alert('success');
        });
      } catch (error) {
        alert('error');
      }

      handleUpdateData();

      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    setValues,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    handleReset
  } = formik;

  useEffect(() => {
    handleUpdateData();
  }, [])

  const handleUpdateData = () => {
    try {
      API.getCurrencyData(function(res){
        if(!res) return;
        if(!res.success) throw new Error('failed to get data');
        else {
          setValues({
            'idr' : res?.data?.idr,
            'usd' : res?.data?.usd
          });

          setHistoryData(res?.data?.history)
        }
      })
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <Stack direction="column" spacing={3} justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Currency Exchange Rate (IDR - USD)
        </Typography>
        <StyledBox component={Paper}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2}>
                <TextField
                  variant="outlined"
                  type="number"
                  {...getFieldProps('usd')}
                  error={Boolean(touched.usd && errors.usd)}
                  helperText={touched.usd && errors.usd}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">USD $</InputAdornment>
                  }}
                  disabled
                />

                <TextField
                  variant="outlined"
                  type="number"
                  {...getFieldProps('idr')}
                  error={Boolean(touched.idr && errors.idr)}
                  helperText={touched.idr && errors.idr}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp.</InputAdornment>
                  }}
                />

                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </StyledBox>

        <TableHistory data={historyData}/>
      </Stack>
    </Layout>
  );
}

export default CurrencyExchange;
