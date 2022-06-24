import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomMultiSelect from '../../../components/CustomMultiSelect';
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

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    unit_measurement: Yup.string().required('Satuan is required'),
    category: Yup.string().required('Kategori is required'),
    value: Yup.string().required('Nilai Produk is required'),
    feature_one: Yup.string().required('Size Produk is required'),
    feature_two: Yup.string().required('Color Produk is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      unit_measurement: '',
      category: '',
      value: '',
      brand: '',
      feature_one: '',
      feature_two: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, unit_measurement, value, brand, category, feature_one, feature_two }) => {
      const _new = {
        goods: {
          name, unit: unit_measurement, value, brand
        }, 
        category,
        feature_one: feature_one.split(','),
        feature_two: feature_two.split(',')
      }
      API.insertGoods(_new, function(res){
        handleReset();
      })
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

  /**
   * Handle Upload File
   */
  const [file, setFile] = useState(null);

  const handleUploadFile = (event) => {
    // Create an object of formData
    const formData = new FormData();
    
    // Update the formData object
    formData.append(
      "file",
      file,
      file.name
    );

    API.uploadImage(formData, function(res){
      if(res.success) setFile(res.path);
      else alert('error');
    })
  }

  const handleOnFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getProductCategory(function(res){
        setCat(res.data);
      })  
    }
  }, [cat])

  return (
    <Page>
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
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
                  onChange={handleUploadFile}
                  fullWidth
                >
                    <Typography variant="h5">
                      Drop or Select File
                  </Typography>
                </UploadPaper>
                </label>
              </Paper>
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

                  <Grid item xs={7}>
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

                  <Grid item xs={7}>
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
              <Card>
                <CardHeader
                  title="Product Feature"
                />
                <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      autoComplete="feature_one"
                      type="text"
                      placeholder="Input ukuran pisah dengan koma"
                      label="Size"
                      {...getFieldProps('feature_one')}
                      error={Boolean(touched.feature_one && errors.feature_one)}
                      helperText={touched.feature_one && errors.feature_one}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      autoComplete="feature_two"
                      type="text"
                      placeholder="Input warna pisah dengan koma"
                      label="Warna"
                      {...getFieldProps('feature_two')}
                      error={Boolean(touched.feature_two && errors.feature_two)}
                      helperText={touched.feature_two && errors.feature_two}
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

export default Goods