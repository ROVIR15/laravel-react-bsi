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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { isArray, isUndefined } from 'lodash';
//API
import API from '../../../../helpers';

function FinanceAccountNew() {
  const [cat, setCat] = useState([]);
  const loading = cat.length === 0;

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('account name is required'),
    number: Yup.number().required('account number is required'),
    type: Yup.number().required('Line is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      number: 0,
      type: 0
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      try {
        API.insertFinanceAccount({
          finance_account_type_id: values.type,
          account_name: values.name,
          account_number: values.number
        }, function (res) {
          if (!res.success) alert('failed');
          else alert('success');
          handleReset();
        });
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
    getFieldProps
  } = formik;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (cat.length > 0 || cat.length != 0) return;
    else {
      try {
        API.getFinanceAccountType(function (res) {
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
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Finance Account Information" />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={5}>
                        <TextField
                          fullWidth
                          autoComplete="name"
                          type="text"
                          label="Nama Rekening"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>

                      <Grid item xs={12} lg={5}>
                        <FormControl fullWidth>
                          <InputLabel>Tipe Akun Rekening</InputLabel>
                          <Select
                            autoComplete="type"
                            type="number"
                            {...getFieldProps('type')}
                            error={Boolean(touched.facility_type_id && errors.type)}
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

                      <Grid item xs={12} lg={5}>
                        <TextField
                          fullWidth
                          autoComplete="number"
                          type="text"
                          label="Nomor Rekening"
                          {...getFieldProps('number')}
                          error={Boolean(touched.number && errors.number)}
                          helperText={touched.number && errors.number}
                        />
                      </Grid>
                    </Grid>
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

export default FinanceAccountNew;
