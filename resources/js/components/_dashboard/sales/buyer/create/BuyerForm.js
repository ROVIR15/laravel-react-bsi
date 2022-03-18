import React from 'react';
import { Card, CardHeader, CardContent, TextField, Button } from '@mui/material'

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';

function BuyerForm() {

  const BuyerSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('city is required'),
    province: Yup.string().required('province is required'),
    country: Yup.string().required('country is required'),
    postal_code: Yup.string().required('postal_code is required'),
    phone_number: Yup.string().required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      city: '',
      province: '',
      country: '',
      postal_code: '',
      email: '',
      phone_number: '',
    },
    validationSchema: BuyerSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Identity Information"
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
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Address Information"
          />
          <CardContent>
          <TextField
            fullWidth
            autoComplete="address"
            type="text"
            label="Alamat"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField
            fullWidth
            autoComplete="city"
            type="text"
            label="Kota"
            {...getFieldProps('city')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />
          <TextField
            fullWidth
            autoComplete="province"
            type="text"
            label="Provinsi"
            {...getFieldProps('province')}
            error={Boolean(touched.province && errors.province)}
            helperText={touched.province && errors.province}
          />
          <TextField
            fullWidth
            autoComplete="country"
            type="text"
            label="Country"
            {...getFieldProps('country')}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}
          />
          <TextField
            fullWidth
            autoComplete="postal code"
            type="text"
            label="Postal Code"
            {...getFieldProps('postal_code')}
            error={Boolean(touched.postal_code && errors.postal_code)}
            helperText={touched.postal_code && errors.postal_code}
          />
          </CardContent>
          </Card>
          <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Contact Information"
          />
          <CardContent>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="phone number"
            type="text"
            label="Phone Number"
            {...getFieldProps('phone_number')}
            error={Boolean(touched.phone_number && errors.phone_number)}
            helperText={touched.phone_number && errors.phone_number}
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
  )
}

export default BuyerForm;