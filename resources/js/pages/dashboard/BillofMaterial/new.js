import React from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import DataGrid from '../../../components/DataGrid';

function BillOfMaterial() {

  const BOMSchema = Yup.object().shape({
    inquiry_id: Yup.string().required('Inquiry References is required'),
    id: Yup.string().email('Email must be a valid email address').required('Email is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_tp: Yup.string().required('Address is required'),
    po_number: Yup.string().required('city is required'),
    po_date: Yup.string().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      product_id: '',
      product_variant_id: '',
      qty: '',
      company: ''
    },
    validationSchema: BOMSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="BOM Information"
          />
          <CardContent>
            <TextField
              fullWidth
              autoComplete="name"
              type="text"
              label="BOM Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              autoComplete="product_id"
              type="text"
              label="Product"
              {...getFieldProps('product_id')}
              error={Boolean(touched.product_id && errors.product_id)}
              helperText={touched.product_id && errors.product_id}
            />
            <TextField
              fullWidth
              autoComplete="product_feature_id"
              type="text"
              label="Product Name"
              {...getFieldProps('product_feature_id')}
              error={Boolean(touched.product_feature_id && errors.product_feature_id)}
              helperText={touched.product_feature_id && errors.product_feature_id}
            />
            <TextField
              fullWidth
              autoComplete="company"
              type="text"
              label="Company Name"
              {...getFieldProps('company')}
              error={Boolean(touched.company && errors.company)}
              helperText={touched.company && errors.company}
            />
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Components"
          />
          <CardContent>
            <DataGrid />
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Operations"
          />
          <CardContent>
            <DataGrid />
          </CardContent>
        </Card>
        <Card sx={{ p:2, display: 'flex', justifyContent: 'end' }}>
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
            size="large"
            type="submit"
            color="grey"
            variant="contained"
            sx={{ m: 1 }}
          >
            Cancel
          </Button>
        </Card>
        </Form>
      </FormikProvider>
      </Container>
    </Page>
  )
}

export default BillOfMaterial