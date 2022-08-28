import React, { useState, useEffect } from 'react';
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button } from '@mui/material'

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';

import AutoComplete from './components/AutoComplete';

//api
import API from '../../../helpers';
import { useParams } from 'react-router-dom';
import { LaborSchema } from '../../../helpers/FormerSchema/LaborSchema';
import { laborArrangedData } from '../../../helpers/data';

function Labor() {
  const {id} = useParams();
  const [choosen, setChoosen] = React.useState({
    id: 0, name: '', role: ''
  });

  const formik = useFormik({
    initialValues: {
      email : "",
      role_type_id: 0,
      name : "",
      npwp : "",
      address : "",
      city : "",
      province : "",
      country : "",
      postal_code : "",
      phone_number :"" 
    },
    validationSchema: LaborSchema,
    onSubmit: ({ name, npwp, email, address, city, province, country, postal_code, role_type_id}) => {
      const data = {
        party_info: {
          name, email, npwp
        },
        address: {
          street: address,
          city, province, country, postal_code
        }, 
        roles : {
          role_type_id,
          relationship_id: 3
        }
      }
      API.updateLabor(id, data, function(res){
        setSubmitting(false);
        alert(JSON.stringify(res));
      });
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setValues, setSubmitting, setFieldValue } = formik;

  useEffect(() => {
    if(!id) return;
    API.getALabor(id,async function(res){
      if(!res.success) alert("Something went wrong!");
      const {role_type, ...arrangedData} = laborArrangedData(res.data);
      setValues(arrangedData);
      setChoosen(role_type)
    });
  }, [id]);

// Auto Complete
const [open, setOpen] = React.useState(false);

const [options, setOptions] = React.useState([]);
const loading = open && options.length === 0;

React.useEffect(() => {
  let active = true;

  // get labor categories
  if (!loading) {
    return undefined;
  }

  API.getRoleType('?type=Employee', (res) => {
    if(!res) return
    if(!res.data) {
      setOptions([]);
    } else {
      setOptions(res.data);
    }
  });

  return () => {
    active = false;
  };
}, [loading])

const handleChangeAC = async (newValue) => {
  setChoosen(newValue);
  await setFieldValue('role_type_id', newValue.id);
}

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <Card >
          <CardHeader
            title="Identity Information"
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Nama"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              
              <Grid item xs={6}>
                <AutoComplete
                  fullWidth
                  autoComplete="role_type_id"
                  type="text"
                  label="Role Type"
                  error={Boolean(touched.role_type_id && errors.role_type_id)}
                  helperText={touched.role_type_id && errors.role_type_id}
                  options={options}
                  setOpen={setOpen}
                  loading={loading}
                  choosen={choosen}
                  changeData={handleChangeAC}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoComplete="npwp"
                  type="text"
                  label="NPWP"
                  {...getFieldProps('npwp')}
                  error={Boolean(touched.npwp && errors.npwp)}
                  helperText={touched.npwp && errors.npwp}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Grid>

        <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Address Information"
          />
          <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoComplete="address"
                type="text"
                label="Alamat"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Grid>            
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoComplete="city"
                type="text"
                label="Kota"
                {...getFieldProps('city')}
                error={Boolean(touched.city && errors.city)}
                helperText={touched.city && errors.city}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoComplete="province"
                type="text"
                label="Provinsi"
                {...getFieldProps('province')}
                error={Boolean(touched.province && errors.province)}
                helperText={touched.province && errors.province}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoComplete="country"
                type="text"
                label="Country"
                {...getFieldProps('country')}
                error={Boolean(touched.country && errors.country)}
                helperText={touched.country && errors.country}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                autoComplete="postal code"
                type="text"
                label="Postal Code"
                {...getFieldProps('postal_code')}
                error={Boolean(touched.postal_code && errors.postal_code)}
                helperText={touched.postal_code && errors.postal_code}
              />
            </Grid>
          </Grid>
          </CardContent>
        </Card>
        </Grid>

        <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Contact Information"
            />
            <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoComplete="phone number"
                  type="text"
                  label="Phone Number"
                  {...getFieldProps('phone_number')}
                  error={Boolean(touched.phone_number && errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                />
              </Grid>
            </Grid>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12}>
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
              color="grey"
              variant="contained"
              sx={{ m: 1 }}
            >
              Cancel
            </Button>
          </Card>
        </Grid>
      </Grid>
        </Form>
      </FormikProvider>
      </Container>
    </Page>
  )
}

export default Labor