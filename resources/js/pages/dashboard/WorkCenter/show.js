import React from 'react';
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

// api
import API from '../../../helpers';
import { fCurrency } from '../../../utils/formatNumber';

//Component
import DataGrid from '../../../components/DataGrid';


function costEachDay(work_hours, cost_per_hour, overhead_cost){
  return Math.floor((parseInt(work_hours) * parseInt(cost_per_hour)) + parseInt(overhead_cost));
}

function daysOfWorks(work_hours, layout_produksi){
  return Math.floor(work_hours+layout_produksi)
}

function ShowWorkCenter() {

  const {id} = useParams();

  const WorkCenterSchema = Yup.object().shape({
    id: Yup.string().required('is required'),
    name: Yup.string().required('is required'),
    company_name: Yup.string().required('is required'),
    work_hours: Yup.number().required('is required'),
    layout_produksi: Yup.number().required('is required'),
    overhead_cost: Yup.number().required('is required'),
    prod_capacity: Yup.number().required('is required'),
    oee_target: Yup.number().required('is required'),
    cost_per_hour: Yup.number().required('is required'),
    labor_alloc: Yup.number().required('is required'),
    description: Yup.string().required('is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      work_hours: 0,
      company_name: '',
      overhead_cost: 0,
      prod_capacity: 0,
      layout_produksi: 0,
      oee_target: 0,
      cost_per_hour: 0,
      labor_alloc: 0,
      description: ''
    },
    validationSchema: WorkCenterSchema,
    onSubmit: (values) => {
      API.updateWorkCenter(id, values, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, setValues, getFieldProps } = formik;

  React.useEffect(async () => {
    if(!id) return;
    
    API.getAWorkCenter(id, (res) => {
      setValues(res.data);
    })

  }, [id]);

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
                    sm={12} xs={12}
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
                    sm={12} xs={12}
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
                    sm={6} xs={12}
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
                  <Grid item 
                    sm={6} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="layout_produksi"
                      type="text"
                      label="Layout Produksi"
                      {...getFieldProps('layout_produksi')}
                      error={Boolean(touched.layout_produksi && errors.layout_produksi)}
                      helperText={touched.layout_produksi && errors.layout_produksi}
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
                    sm={12} xs={12}
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
                    sm={12} xs={12}
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
                    sm={12} xs={12}
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
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item
            sm={12}
            xs={12}
          >
            <Card sx={{ p:2, display: 'flex', justifyContent: 'end' }}>

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
          </Card>
          </Grid>

          {/* Button */}
          <Grid item xs={12}>
            <Card sx={{ p:2, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Typography 
                variant='h5'
                sx={{flex: 1}}
              > 
              Total Biaya Unit Kerja {values.name} Rp. {fCurrency(costEachDay(values.work_hours, values.cost_per_hour, values.overhead_cost))}
              </Typography>
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

export default ShowWorkCenter