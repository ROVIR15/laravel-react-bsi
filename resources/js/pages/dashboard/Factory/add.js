import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomMultiSelect from '../../../components/CustomMultiSelect';

import { isArray } from 'lodash'
//API
import API from '../../../helpers'

const UploadPaper = styled(Button)(({theme}) => ({
    outline: "none", 
    padding: "40px 8px", 
    borderRadius: "8px", 
    backgroundColor: "rgb(244, 246, 248)", 
    border: "1px dashed rgba(145, 158, 171, 0.32)",
    height: '100%'
}));

function Goods() {
  const [cat, setCat] = useState([]);
  const loading = cat.length === 0;
  const [file, setFile] = useState(null);

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {

      try {
        API.insertFactory(values, function(res){
          if(!res.success) throw new Error('Failed to send');
          else {
            alert('success');
          }
        })
      } catch (error) {
        alert('error')        
      }
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
                  title="Factory Information"
                />
                <CardContent>
                <Grid container spacing={2}>
                  
                  <Grid item xs={12} lg={5}>
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
                      rows={3}
                      multiline
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

export default Goods