import React from 'react';
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import DataGrid from '../../../components/DataGrid';

function WorkCenter() {

  const WorkCenterSchema = Yup.object().shape({
    id: Yup.string().required('is required'),
    name: Yup.string().required('is required'),
    code: Yup.string().required('is required'),
    working_hours: Yup.string().required('is required'),
    company: Yup.string().required('is required'),
    time_efficiency: Yup.string().required('References is required'),
    capacity: Yup.string().required('is required'),
    oee_target: Yup.string().required('is required'),
    cost_per_hour: Yup.string().required('is required'),
    desc: Yup.string().required('is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      working_hours: '',
      company_name: '',
      time_efficiency: '',
      capacity: '',
      oee_target: '',
      cost_per_hour: '',
      description: ''
    },
    validationSchema: WorkCenterSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Work Center Information"
          />
          <CardContent>
            <TextField
              fullWidth
              autoComplete="id"
              type="text"
              label="Work Center Id"
              {...getFieldProps('id')}
              error={Boolean(touched.id && errors.id)}
              helperText={touched.id && errors.id}
            />
            <TextField
              fullWidth
              autoComplete="name"
              type="text"
              label="Work Center Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              autoComplete="working_hours"
              type="text"
              label="Working Hours"
              {...getFieldProps('working_hours')}
              error={Boolean(touched.working_hours && errors.working_hours)}
              helperText={touched.working_hours && errors.working_hours}
            />
            <TextField
              fullWidth
              autoComplete="company_name"
              type="text"
              label="Company Name"
              {...getFieldProps('company_name')}
              error={Boolean(touched.company_name && errors.company_name)}
              helperText={touched.company_name && errors.company_name}
            />            
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Detail Performance in Work Center"
          />
          <CardContent>
            <Stack direction="row" m={1}>
            <Stack direction="column" m={1}>
              <TextField
                fullWidth
                autoComplete="time_efficiency"
                type="text"
                label="Waktu Produksi Efisien"
                {...getFieldProps('time_efficiency')}
                error={Boolean(touched.time_efficiency && errors.time_efficiency)}
                helperText={touched.time_efficiency && errors.time_efficiency}
              />
              <TextField
                fullWidth
                autoComplete="prod_capacity"
                type="text"
                label="Kapasitas Produksi"
                {...getFieldProps('prod_capacity')}
                error={Boolean(touched.prod_capacity && errors.prod_capacity)}
                helperText={touched.prod_capacity && errors.prod_capacity}
              />
              <TextField
                fullWidth
                autoComplete="oee_target"
                type="text"
                label="Target Produksi"
                {...getFieldProps('oee_target')}
                error={Boolean(touched.oee_target && errors.oee_target)}
                helperText={touched.oee_target && errors.oee_target}
              />
            </Stack>
            <Stack direction="column" m={1}>
              <TextField
                fullWidth
                autoComplete="cost_per_hour"
                type="text"
                label="Biaya Produksi per Jam"
                {...getFieldProps('cost_per_hour')}
                error={Boolean(touched.cost_per_hour && errors.cost_per_hour)}
                helperText={touched.cost_per_hour && errors.cost_per_hour}
              />
              <TextField
                fullWidth
                autoComplete="description"
                type="text"
                label="Deskripsi"
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Stack>
            </Stack>
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

export default WorkCenter