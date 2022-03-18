import React, { useState, useEffect } from 'react';
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';

//api
import API from '../../../helpers';
import { useParams } from 'react-router-dom';

function getEditPathname(array) {
  if(!array.length > 5) return null;
  return '/' + array[1] + '/' + array[2] + `/${array[3]}`;
}

function Buyer() {
  const {id} = useParams();

  const {pathname} = useLocation();
  
  const BuyerSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    npwp: Yup.string().required('NPWP is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('city is required'),
    province: Yup.string().required('province is required'),
    country: Yup.string().required('country is required'),
    postal_code: Yup.string().required('postal_code is required'),
    phone_number: Yup.string().required('Phone Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      email : "",
      name : "",
      npwp : "",
      address : "",
      city : "",
      province : "",
      country : "",
      postal_code : "",
      phone_number :"" 
    },
    validationSchema: BuyerSchema,
    onSubmit: ({ name, npwp, email, address, city, province, country, postal_code}) => {
      const data = {
        party_info: {
          name, email, npwp
        },
        address: {
          street: address,
          city, province, country, postal_code
        }, type: {
          role: "Buyer",
          party: "Person"
        }
      }
      API.editBuyer(id, data, function(res){
        setSubmitting(false);
        alert(JSON.stringify(res));
      });
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setValues, setSubmitting } = formik;

  useEffect(() => {
    if(!id) return;
    API.getBuyer(id, function(res){
      console.log(res);
      if(!res.success) alert("Something went wrong!");
      setValues({
        ...values,
        email: res.data[0].email,
        name: res.data[0].name,
        npwp: res.data[0].npwp,
        address : res.data[0].street,
        city: res.data[0].city,
        province: res.data[0].province,
        country: res.data[0].country,
        postal_code: res.data[0].postal_code,
        phone_number  : ""
      });
    });
  }, [id]);


  return (
    <Page>
      <Container>
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
              // value= {load.name}
            />
            <TextField
              fullWidth
              autoComplete="npwp"
              type="text"
              label="NPWP"
              {...getFieldProps('npwp')}
              error={Boolean(touched.npwp && errors.npwp)}
              helperText={touched.npwp && errors.npwp}
              // value= {load.npwp}
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
            // value={load.address}
          />
          <TextField
            fullWidth
            autoComplete="city"
            type="text"
            label="Kota"
            {...getFieldProps('city')}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
            // value={load.city}
          />
          <TextField
            fullWidth
            autoComplete="province"
            type="text"
            label="Provinsi"
            {...getFieldProps('province')}
            error={Boolean(touched.province && errors.province)}
            helperText={touched.province && errors.province}
            // value={load.province}
          />
          <TextField
            fullWidth
            autoComplete="country"
            type="text"
            label="Country"
            {...getFieldProps('country')}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}
            // value={load.country}
          />
          <TextField
            fullWidth
            autoComplete="postal code"
            type="text"
            label="Postal Code"
            {...getFieldProps('postal_code')}
            error={Boolean(touched.postal_code && errors.postal_code)}
            helperText={touched.postal_code && errors.postal_code}
            // value={load.postal_code}
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
            value={values.email}
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
            component={RouterLink}
            to={getEditPathname(pathname.split('/'))}
            size="large"
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

export default Buyer