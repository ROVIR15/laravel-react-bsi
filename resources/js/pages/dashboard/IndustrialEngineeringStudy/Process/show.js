import React, { useEffect, useMemo, useState } from 'react'
import Page from '../../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button} from '@mui/material'
import { GridActionsCellItem } from '@mui/x-data-grid';

//API
import API from '../../../../helpers'

function Process() {
  const {id} = useParams();

  const ProcessSchema = Yup.object().shape({
    name: Yup.string().required('Process name is required'),
    description: Yup.string().required('Description of the process is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: ProcessSchema,
    onSubmit: ({ name, description }) => {
      const _new = {
        name,
        description
      }
      API.updateProcess(id, _new, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  useEffect(() => {
    if(!id) return;
    API.getAProcess(id, function(res){
      if(!res) alert("Something went wrong!");
      setValues({
        name: res.data.name,
        description: res.data.description,
      });
    });
  }, [id]);

  return (
    <Page>
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card >
                <CardHeader
                  title="Process Information"
                />
                <CardContent>
                <Grid container spacing={2}>
                  
                  <Grid item xs={6}>
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

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      autoComplete="description"
                      type="text"
                      label="Description"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
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

export default Process