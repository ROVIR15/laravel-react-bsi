import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Button, Container, Card, CardHeader, CardContent, FormControl, InputLabel, MenuItem, Stack, Select, TextField, MenuList } from '@mui/material';
import CustomMultiSelect from '../../../components/CustomMultiSelect';
//API
import API from '../../../helpers'

function Goods() {
  const [cat, setCat] = useState([]);

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    unit_measurement: Yup.string().required('Satuan is required'),
    gross_weight: Yup.string().required('Berat Kotor is required'),
    category: Yup.string().required('Kategori is required'),
    value: Yup.string().required('Nilai Produk is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      unit_measurement: '',
      gross_weight: '',
      category: '',
      value: '',
      brand: '',
      feature_one: [],
      feature_two: []
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, unit, value, brand, category, feature_one, feature_two }) => {
      const _new = {
        goods: {
          name, unit, value, brand
        }, 
        category,
        feature_one,
        feature_two
      }
      API.insertGoods(_new, function(res){
        setSubmitting(false);
        handleReset();
      }).catch(function(error){
        setSubmitting(false);
        alert(error);
      })
    }
  });

  const opt = [
  {
    label: "XXXX",
    sub: [
      {
        value: "Red"
      }, 
      {
        value: "Green"
      }, 
      {
        value: "Blue"
      }, 
    ]
  },
  {
    label: "Turunan",
    sub: [
      {
        value: "12"
      }, 
      {
        value: "13"
      }, 
      {
        value: "14"
      }, 
    ]
  }
  ]

  const { errors, touched, values, isSubmitting, setSubmitting, handleReset, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleMultiSelect = (name, value) => {
    setFieldValue(name, value);
  }

  const MenuItemList = (listArray) => {
    console.log(listArray);
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
    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getProductCategory(function(res){
        console.log(res);
        setCat(res.data);
      })  
    }
  }, [cat])

  return (
    <Page>
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader
                title="Product Information"
              />
              <CardContent>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Nama"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
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
                <TextField
                  fullWidth
                  autoComplete="unit_measurement"
                  type="text"
                  label="Satuan"
                  {...getFieldProps('unit_measurement')}
                  error={Boolean(touched.unit_measurement && errors.unit_measurement)}
                  helperText={touched.unit_measurement && errors.unit_measurement}
                />
                <TextField
                  fullWidth
                  autoComplete="gross_weight"
                  type="text"
                  label="Berat Kotor"
                  {...getFieldProps('gross_weight')}
                  error={Boolean(touched.gross_weight && errors.gross_weight)}
                  helperText={touched.gross_weight && errors.gross_weight}
                />
                <TextField
                  fullWidth
                  autoComplete="value"
                  type="text"
                  label="Nilai Produk"
                  {...getFieldProps('value')}
                  error={Boolean(touched.value && errors.value)}
                  helperText={touched.value && errors.value}
                />
                <TextField
                  fullWidth
                  autoComplete="brand"
                  type="text"
                  label="Brand"
                  {...getFieldProps('brand')}
                  error={Boolean(touched.brand && errors.brand)}
                  helperText={touched.brand && errors.brand}
                />
              </CardContent>
            </Card>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 }, position: 'unset' }}>
              <CardHeader
                title="Product Feature"
              />
              <CardContent>
                <Stack direction="row">
                  <CustomMultiSelect 
                    label="Feature Size"
                    name="feature_one"
                    type="array"
                    handleChange={handleMultiSelect}
                    error={Boolean(touched.feature_one && errors.feature_one)}
                    helperText={touched.feature_one && errors.feature_one}
                    option={opt}              
                  />
                  <CustomMultiSelect 
                    label="Feature color"
                    name="feature_two"
                    type="array"
                    handleChange={handleMultiSelect}
                    error={Boolean(touched.feature_one && errors.feature_one)}
                    helperText={touched.feature_one && errors.feature_one}
                    option={opt}              
                  />
                </Stack>
              </CardContent>
            </Card>
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
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
}

export default Goods