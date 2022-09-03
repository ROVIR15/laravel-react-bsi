import React from 'react';
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

//API
import API from '../../../helpers'

function WorkCenter() {

  const WorkCenterSchema = Yup.object().shape({
    name: Yup.string().required('is required'),
    work_hours: Yup.string().required('is required'),
    company_name: Yup.string().required('is required'),
    overhead_cost: Yup.string().required('References is required'),
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
      company_name: '',
      overhead_cost: 0,
      prod_capacity: 0,
      oee_target: 0,
      cost_per_hour: 0,
      labor_alloc: 0,
      description: ''
    },
    validationSchema: WorkCenterSchema,
    onSubmit: (values) => {
      API.insertWorkCenter(values, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Work Center Information */}
          <Grid item xs={12}>
            <Card >
              <CardHeader
                title="Work Center Information"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item
                    xs={6}
                  >
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
                  <Grid item
                    xs={6}
                  >
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
            </Card>
          </Grid>
          {/* Work Center Information */}
          <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader
              title="Rencana Penggunaan"
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item 
                  sm={4} xs={12}
                >
                  <TextField
                    fullWidth
                    autoComplete="oee_target"
                    type="text"
                    label="Kecepatan Produksi (operator/jam)"
                    {...getFieldProps('oee_target')}
                    error={Boolean(touched.oee_target && errors.oee_target)}
                    helperText={touched.oee_target && errors.oee_target}
                  />
                </Grid>
                <Grid item 
                  sm={4} xs={12}
                >
                  <TextField
                    fullWidth
                    autoComplete="labor_alloc"
                    type="text"
                    label="Alokasi Labor"
                    {...getFieldProps('labor_alloc')}
                    error={Boolean(touched.labor_alloc && errors.labor_alloc)}
                    helperText={touched.labor_alloc && errors.labor_alloc}
                  />
                </Grid>
                <Grid item 
                  sm={4} xs={12}
                >
                  <TextField
                    fullWidth
                    autoComplete="prod_capacity"
                    type="text"
                    label="Kapasitas Produksi"
                    {...getFieldProps('prod_capacity')}
                    error={Boolean(touched.prod_capacity && errors.prod_capacity)}
                    helperText={touched.prod_capacity && errors.prod_capacity}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title="Detail Biaya"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item 
                    sm={4} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="work_hours"
                      type="text"
                      label="Hari Kerja"
                      {...getFieldProps('work_hours')}
                      error={Boolean(touched.work_hours && errors.work_hours)}
                      helperText={touched.work_hours && errors.cost_per_hour}
                    />
                  </Grid>
                  <Grid item 
                    sm={4} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="overhead_cost"
                      type="text"
                      label="CM Cost"
                      {...getFieldProps('overhead_cost')}
                      error={Boolean(touched.overhead_cost && errors.overhead_cost)}
                      helperText={touched.overhead_cost && errors.overhead_cost}
                    />
                  </Grid>

                  <Grid item 
                    sm={4} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="cost_per_hour"
                      type="text"
                      label="Biaya Produksi per Hari"
                      {...getFieldProps('cost_per_hour')}
                      error={Boolean(touched.cost_per_hour && errors.cost_per_hour)}
                      helperText={touched.cost_per_hour && errors.cost_per_hour}
                    />
                  </Grid>
                  <Grid item
                    sm={12}
                    xs={12}
                  >
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
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Button */}
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

export default WorkCenter