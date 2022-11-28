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
import { isArray } from 'lodash';

function Goods() {
  const {id} = useParams();
  
  const [cat, setCat] = useState([]);

  const GoodsSchema = Yup.object().shape({
    date: Yup.date().required('Date is required'),
    facility_id: Yup.number().required('Line is required'),
    target: Yup.number().required('Target is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      facility_type_id: 0
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      try {
        API.updateFacilityTarget(id, values, function(res){
          if(res.success) alert('success');
          else alert('failed')
        })
        setSubmitting(false);          
      } catch (error) {
        alert('error');
      }
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  useEffect(() => {
    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getFacilityType('?type=line-sewing', function(res){
        setCat(res.data);
      })
    }
  }, [cat])

  useEffect(() => {
    if(!id) return;
    try {
      API.getAFacility(id, function(res){
        if(!res) throw new Error("Something went wrong!");
        setValues({
          ...values,
          facility_type_id: res?.data?.type?.id,
          name: res?.data?.name
        });
      });        
    } catch (error) {
      alert(error)
    }
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
                  title="Line Target Information"
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

                  <Grid item xs={12} lg={5}>
                    <FormControl fullWidth>
                      <InputLabel>Facility Type</InputLabel>
                      <Select
                        autoComplete="facility_type_id"
                        type="number"
                        {...getFieldProps('facility_type_id')}
                        error={Boolean(touched.facility_type_id && errors.facility_type_id)}
                        helperText={touched.facility_type_id && errors.facility_type_id}
                      >
                        {
                          (!isArray(cat)? null : 
                            cat.map(function(x){
                              return (
                                <MenuItem value={x.id} selected={x.id === values.facility_type_id}>{`${x.name}`}</MenuItem>
                              ) 
                            })
                          )
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