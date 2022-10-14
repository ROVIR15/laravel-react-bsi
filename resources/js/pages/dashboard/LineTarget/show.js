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
      date: '',
      facility_id: 0,
      target: 0
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
      API.getFacility('?type=line-sewing', function(res){
        setCat(res.data);
      })
    }
  }, [cat])

  useEffect(() => {
    if(!id) return;
    API.getAFacilityTarget(id, function(res){
      if(!res) alert("Something went wrong!");
      setValues({
        ...values,
        facility_id: res?.facility_id,
        date: res?.date,
        target : res?.target
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
                  title="Line Target Information"
                />
                <CardContent>
                <Grid container spacing={2}>
                  
                  <Grid item xs={12} lg={5}>
                    <TextField
                      fullWidth
                      autoComplete="date"
                      type="date"
                      label="Tanggal"
                      {...getFieldProps('date')}
                      error={Boolean(touched.date && errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  </Grid>

                  <Grid item xs={12} lg={5}>
                    <FormControl fullWidth>
                      <InputLabel >Line</InputLabel>
                      <Select
                        autoComplete="facility_id"
                        type="text"
                        {...getFieldProps('facility_id')}
                        error={Boolean(touched.facility_id && errors.facility_id)}
                        helperText={touched.facility_id && errors.facility_id}
                      >
                        {
                          (!isArray(cat)? null : 
                            cat.map(function(x){
                              return (
                                <MenuItem value={x.id}>{`${x.name}`}</MenuItem>
                              ) 
                            })
                          )
                        }
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} lg={2}>
                    <TextField
                      fullWidth
                      autoComplete="target"
                      type="number"
                      label="Target"
                      {...getFieldProps('target')}
                      error={Boolean(touched.target && errors.target)}
                      helperText={touched.target && errors.target}
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