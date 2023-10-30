import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';


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
        API.insertFacilityTarget(values, function(res){
          if(!res.success) alert('failed');
          else alert('success')
          handleReset();
        })
          
      } catch (error) {
        alert('error')        
      }
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleReset, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleMultiSelect = (name, value) => {
    setFieldValue(name, value);
  }

  const MenuItemList = (listArray) => {
    if(!Array.isArray(listArray)) {
      return (
        <MenuItem value={1}>{"wkwkw"}</MenuItem>
      )
    } else {
      listArray.map(function(x){
        return (
          <MenuItem value={x.id}>{x.name}</MenuItem>
        )
      })
    }
  }

  useEffect(() => {
    let active = true;

    if(!loading){
      return undefined
    }

    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getFacility('?type=line-sewing', function(res){
        setCat(res.data);
      })
    }

    return () => {
      active= false
    }
  }, [loading])

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