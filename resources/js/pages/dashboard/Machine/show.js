import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, FormControl, InputLabel, Paper, Select, MenuItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';

//API
import API from '../../../helpers'

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

const UploadPaper = styled(Button)(({theme}) => ({
  outline: "none", 
  padding: "40px 8px", 
  borderRadius: "8px", 
  backgroundColor: "rgb(244, 246, 248)", 
  border: "1px dashed rgba(145, 158, 171, 0.32)",
  height: '100%'
}));

function Machine() {
  const {id} = useParams();
  
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [cat, setCat] = useState([]);

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    unit_measurement: Yup.string().required('Satuan is required'),
    category: Yup.string().required('Kategori is required'),
    value: Yup.string().required('Nilai Produk is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      unit_measurement: '',
      category: '',
      value: '',
      brand: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, unit_measurement, value, brand, category}) => {
      const _new = {
        goods: {
          name, unit: unit_measurement, value, brand, imageUrl: file
        }, 
        category
      }
      try {
        API.updateGoods(id, _new, function(res){
          if(res.success) alert('success');
          else alert('failed')
        })
        setSubmitting(false);  
      } catch (error) {
        alert('error')
      }
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  /**
   * Handle Upload File
   */
  const [file, setFile] = useState(null);

  const handleOnFileChange = (event) => {
    // Create an object of formData
    const formData = new FormData();
    
    // Update the formData object
    formData.append(
      "file",
      event.target.files[0],
      event.target.files[0].name
    );

    API.uploadImage(formData, function(res){
      if(res.success) {setFile(res.path); alert(JSON.stringify(res))}
      else {alert('error');}
    })
  }

  useEffect(() => {
    if(cat.length > 0 || cat.length != 0) return
    else {
      try {
        API.getProductCategory(function(res){
          setCat(res.data);
        });
      } catch {
        alert('error');
      }
    }
  }, [cat])

  const loading = (values.product_id.valueOf()? false : true) && id;

  useEffect(() => {
    if(!id) return;

    if(!loading) return undefined;
    try {
      API.getAGoods(id, function(res){
        if(!res) alert("Something went wrong!");
        setValues({
          ...values,
          product_id: res.data.product_id[0].id,
          name: res.data.name,
          unit_measurement: res.data.unit_measurement,
          gross_weight: res.data.gross_weight,
          category : res.data.category[0].id,
          value: res.data.value,
          brand: res.data.brand,
        });
        setFile(res.data.imageUrl);
      });  
    } catch (e) {
      alert(e);
    }
  }, [id]);

  function ShowImageWhenItsUploaded(){
    if(file) {
      return (
        <Paper sx={{padding: 2, height: '100%'}}>
          <img src={file} alt="Image"/>
          <label htmlFor='upload-file'>
          <input 
            accept="image/*" 
            multiple 
            id="upload-file" 
            type="file" 
            onChange={handleOnFileChange}
            style={{display: 'none'}}
          />
            <Button>
              <Typography variant="h5">
                Change File
              </Typography>
            </Button>
          </label>
        </Paper>
      )
    } else {
      return (
        <Paper sx={{padding: 2, height: '100%'}}>
          <label htmlFor='upload-file'>
          <input 
            accept="image/*" 
            multiple 
            id="upload-file" 
            type="file" 
            onChange={handleOnFileChange}
            style={{display: 'none'}}
          />
          <UploadPaper 
            component="span" 
            fullWidth
          >
              <Typography variant="h5">
                Drop or Select File
            </Typography>
          </UploadPaper>
          </label>
        </Paper>
      )
    }
  }

  return (
    <Page>
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <ShowImageWhenItsUploaded/>
            </Grid>

            <Grid item xs={7}>
              <Card >
                <CardHeader
                  title="Product Information"
                />
                <CardContent>
                <Grid container spacing={2}>
                  
                  <Grid item xs={12}>
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

                  <Grid item xs={7}>
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
                              <MenuItem value={x.id}>{x.name}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      autoComplete="brand"
                      type="text"
                      label="Brand"
                      {...getFieldProps('brand')}
                      error={Boolean(touched.brand && errors.brand)}
                      helperText={touched.brand && errors.brand}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="unit_measurement"
                      type="text"
                      label="Satuan"
                      {...getFieldProps('unit_measurement')}
                      error={Boolean(touched.unit_measurement && errors.unit_measurement)}
                      helperText={touched.unit_measurement && errors.unit_measurement}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="value"
                      type="text"
                      label="Nilai Produk"
                      {...getFieldProps('value')}
                      error={Boolean(touched.value && errors.value)}
                      helperText={touched.value && errors.value}
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
                  type="submit"
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

export default Machine