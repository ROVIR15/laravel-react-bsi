import React from 'react'
import Page from '../../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Button, Container, Card, CardHeader, CardContent, Grid, TextField } from '@mui/material';
//API
import API from '../../../../helpers'

function Process() {
  const ProcessSchema = Yup.object().shape({
    name: Yup.string().required('Process name is required'),
    description: Yup.string().required('Description of the process is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: ProcessSchema,
    onSubmit: ({ name, description }) => {
      const _new = {
        name, description
      }
      API.insertProcess(_new, function(res){
        handleReset();
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleReset, handleSubmit, getFieldProps, setFieldValue } = formik;

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