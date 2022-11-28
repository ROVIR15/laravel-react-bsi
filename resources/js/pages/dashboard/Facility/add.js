import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomMultiSelect from '../../../components/CustomMultiSelect';

import { isArray, isUndefined } from 'lodash'
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
    name: Yup.string().required('Date is required'),
    type: Yup.number().required('Line is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      type: 0
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {

      try {
        API.insertFacility(values, function(res){
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

  useEffect(() => {
    let active = true;

    if(!loading){
      return undefined
    }

    if(cat.length > 0 || cat.length != 0) return
    else {
      try {
        API.getFacilityType('', function(res){
          if(isUndefined(res)) throw new Error('Error occured');
          else setCat(res.data);
        })        
      } catch (error) {
        alert(error);
      }
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
                  title="Facility Information"
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
                                <MenuItem value={x.id}>{`${x.name}`}</MenuItem>
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