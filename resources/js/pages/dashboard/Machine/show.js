import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';

//API
import API from '../../../helpers'

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { machineData } from '../../../helpers/data';

const UploadPaper = styled(Button)(({theme}) => ({
  outline: "none", 
  padding: "40px 8px", 
  borderRadius: "8px", 
  backgroundColor: "rgb(244, 246, 248)", 
  border: "1px dashed rgba(145, 158, 171, 0.32)",
  height: '100%'
}));

function costEachDay(work_hours, cost_per_hour, overhead_cost){
  return Math.floor((parseInt(work_hours) * parseInt(cost_per_hour)) + parseInt(overhead_cost));
}


function Machine() {
  const {id} = useParams();
  const [cat, setCat] = useState([]);

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    satuan: Yup.string().required('Satuan is required'),
    category: Yup.string().required('Kategori is required'),
    value: Yup.string().required('Nilai Produk is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      satuan: '',
      category: '',
      value: '',
      brand: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, satuan, value, brand, category}) => {
      const _new = {
        goods: {
          name, unit: satuan, value, brand, imageUrl: file
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
    if(!id) return;

    try {
      API.getAMachine(id, function(res){
        if(!res) alert("Something went wrong!");
        let data = machineData(res.data);
        setValues(data);
        setFile(data.imageUrl);
      });  
    } catch (e) {
      alert(e);
    }
  }, [id]);


  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Work Center Information */}
          <Grid item xs={12}>
            <Card >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      autoComplete="name"
                      type="text"
                      label="Work Center Name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item
                    xs={6}
                  >
                    <TextField
                      fullWidth
                      autoComplete="company_name"
                      type="text"
                      label="Company Name"
                      {...getFieldProps('company_name')}
                      error={Boolean(touched.company_name && errors.company_name)}
                      helperText={touched.company_name && errors.company_name}
                    />      
                  </Grid>
                </Grid>      
              </CardContent>
            </Card>
          </Grid>
          {/* Work Center Information */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title="Rencana Penggunaan"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item 
                    sm={6} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="oee_target"
                      type="text"
                      label="Kecepatan Produksi (operator/jam)"
                      {...getFieldProps('oee_target')}
                      error={Boolean(touched.oee_target && errors.oee_target)}
                      helperText={touched.oee_target && errors.oee_target}
                    />
                  </Grid>
                  <Grid item 
                    sm={6} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="qty"
                      type="number"
                      label="Rencana Produksi"
                      onChange={(event) => setQty(event.target.value)}
                    />
                  </Grid>
                  <Grid item 
                    sm={12} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="labor_alloc"
                      type="text"
                      label="Alokasi Labor"
                      {...getFieldProps('labor_alloc')}
                      error={Boolean(touched.labor_alloc && errors.labor_alloc)}
                      helperText={touched.labor_alloc && errors.labor_alloc}
                    />
                  </Grid>
                  <Grid item 
                    sm={12} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="prod_capacity"
                      type="text"
                      label="Kapasitas Produksi"
                      {...getFieldProps('prod_capacity')}
                      error={Boolean(touched.prod_capacity && errors.prod_capacity)}
                      helperText={touched.prod_capacity && errors.prod_capacity}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title="Detail Biaya"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item 
                    sm={12} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="work_hours"
                      type="text"
                      label="Hari Kerja"
                      {...getFieldProps('work_hours')}
                      error={Boolean(touched.work_hours && errors.work_hours)}
                      helperText={touched.work_hours && errors.cost_per_hour}
                    />
                  </Grid>
                  <Grid item 
                    sm={12} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="overhead_cost"
                      type="text"
                      label="CM Cost"
                      {...getFieldProps('overhead_cost')}
                      error={Boolean(touched.overhead_cost && errors.overhead_cost)}
                      helperText={touched.overhead_cost && errors.overhead_cost}
                    />
                  </Grid>

                  <Grid item 
                    sm={12} xs={12}
                  >
                    <TextField
                      fullWidth
                      autoComplete="cost_per_hour"
                      type="text"
                      label="Biaya Produksi per Hari"
                      {...getFieldProps('cost_per_hour')}
                      error={Boolean(touched.cost_per_hour && errors.cost_per_hour)}
                      helperText={touched.cost_per_hour && errors.cost_per_hour}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item
            sm={12}
            xs={12}
          >
            <Card sx={{ p:2, display: 'flex', justifyContent: 'end' }}>

            <TextField
              fullWidth
              multiline
              rows={4}
              autoComplete="description"
              type="text"
              label="Deskripsi"
              {...getFieldProps('description')}
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
            />
          </Card>
          </Grid>
          {/* Button */}
          <Grid item xs={12}>
            <Card sx={{ p:2, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
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

export default Machine