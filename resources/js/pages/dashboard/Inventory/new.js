import React from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Button, Container, Card, CardHeader, CardContent, TextField } from '@mui/material';
import CustomMultiSelect from '../../../components/CustomMultiSelect';

function Inventory() {

  const InventorySchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    unit_measurement: Yup.string().required('Satuan is required'),
    gross_weight: Yup.string().required('Berat Kotor is required'),
    category: Yup.string().required('Kategori is required'),
    value: Yup.string().required('Nilai Produk is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      unit_measurement: '',
      gross_weight: '',
      category: '',
    //   feature
      serial: '',
      brand: '',
      type: '',
      code: '',
      price: ''
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page>
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader
                title="Product Information"
              />
              <CardContent>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Nama"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="category"
                  type="text"
                  label="Kategori"
                  {...getFieldProps('category')}
                  error={Boolean(touched.category && errors.category)}
                  helperText={touched.category && errors.category}
                />
                <TextField
                  fullWidth
                  autoComplete="unit_measurement"
                  type="text"
                  label="Satuan"
                  {...getFieldProps('unit_measurement')}
                  error={Boolean(touched.unit_measurement && errors.unit_measurement)}
                  helperText={touched.unit_measurement && errors.unit_measurement}
                />
                <TextField
                  fullWidth
                  autoComplete="gross_weight"
                  type="text"
                  label="Berat Kotor"
                  {...getFieldProps('gross_weight')}
                  error={Boolean(touched.gross_weight && errors.gross_weight)}
                  helperText={touched.gross_weight && errors.gross_weight}
                />
                <TextField
                  fullWidth
                  autoComplete="value"
                  type="text"
                  label="Nilai Produk"
                  {...getFieldProps('value')}
                  error={Boolean(touched.value && errors.value)}
                  helperText={touched.value && errors.value}
                />
              </CardContent>
            </Card>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 }, position: 'unset' }}>
              
              
              <CardHeader
                title="Product Feature"
              />
              <CardContent>
              <TextField
                fullWidth
                autoComplete="serial"
                type="text"
                label="Serial Number"
                {...getFieldProps('serial')}
                error={Boolean(touched.serial && errors.serial)}
                helperText={touched.serial && errors.serial}
              />
              <TextField
                fullWidth
                autoComplete="brand"
                type="text"
                label="Merek"
                {...getFieldProps('brand')}
                error={Boolean(touched.brand && errors.brand)}
                helperText={touched.brand && errors.brand}
              />
              <TextField
                fullWidth
                autoComplete="type"
                type="text"
                label="Tipe"
                {...getFieldProps('type')}
                error={Boolean(touched.type && errors.type)}
                helperText={touched.type && errors.type}
              />
              <TextField
                fullWidth
                autoComplete="code"
                type="text"
                label="Kode"
                {...getFieldProps('code')}
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
              />
              <TextField
                fullWidth
                autoComplete="price"
                type="text"
                label="Harga"
                {...getFieldProps('price')}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
              />     
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

export default Inventory