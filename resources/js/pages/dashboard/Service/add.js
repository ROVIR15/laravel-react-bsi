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
    name: Yup.string().required('Nama is required'),
    category: Yup.string().required('Kategori is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, category}) => {
      const _new = {
        service: {
          name
        }, 
        category
      }
      API.insertService(_new, function(res){
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

  useEffect(() => {
    let active = true;

    if(!loading){
      return undefined
    }

    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getProductCategory(function(res){
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
                          (!isArray(cat)? null : 
                            cat.map(function(x){
                              if (x.sub === " ") {
                                return (
                                <MenuItem value={x.id}>{`${x.name}`}</MenuItem>
                                ) 
                              } else {
                                return (
                                  <MenuItem value={x.id}>{`${x.name} - ${x.sub}`}</MenuItem>
                                )
                              }
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