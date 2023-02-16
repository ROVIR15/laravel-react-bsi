import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, FormControl, InputLabel, Paper, Select, MenuItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

//API
import API from '../../../helpers'

function Goods() {
  const {id} = useParams();
  
  const [cat, setCat] = useState([]);

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    category: Yup.string().required('Kategori is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: 0,
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, unit_measurement, value, brand, category}) => {
      const _new = {
        service: {
          name
        }, 
        category
      }
      API.updateService(id, _new, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  useEffect(() => {
    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getProductCategory(function(res){
        setCat(res.data);
      })  
    }
  }, [cat])

  useEffect(() => {
    if(!id) return;
    API.getAService(id, function(res){
      if(!res) alert("Something went wrong!");
      setValues({
        ...values,
        product_id: res.data.product_id.id,
        name: res.data.name,
        category : res.data.category.id
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
                  title="Product Information"
                />
                <CardContent>
                <Grid container spacing={2}>
                  
                  <Grid item xs={7}>
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

                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <InputLabel >Kategori</InputLabel>
                      <Select
                        autoComplete="category"
                        type="text"
                        {...getFieldProps('category')}
                        error={Boolean(touched.category && errors.category)}
                        helperText={touched.category && errors.category}
                      >
                        {
                          cat.map(function(x){
                            return (
                              <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
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