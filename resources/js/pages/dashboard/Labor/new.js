import React from 'react';
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button } from '@mui/material'

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import axios from 'axios';

import AutoComplete from './components/AutoComplete';

//api
import API from '../../../helpers';
import { LaborSchema } from '../../../helpers/FormerSchema';

function Labor() {
  const [choosen, setChoosen] = React.useState({
    id: 0, name: '', role: ''
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      role_type_id: '',
      npwp: '',
      email: '',
      phone_number: '',
    },
    validationSchema: LaborSchema,
    onSubmit: ({ name, npwp, email, address, city, province, country, postal_code, role_type_id}) => {
      const data = {
        name, email, npwp: 0, type: "Person", role_type_id
      }
      API.insertLabor(data, function(res){
        if(res.success) alert('Success');
        else alert('Failed')
      });
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

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
                  changeData={handleChangeAC}
                />
              </Grid>
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
              type="submit"
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