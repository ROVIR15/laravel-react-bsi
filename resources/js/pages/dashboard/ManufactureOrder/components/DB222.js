import * as React from 'react';

import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';

import * as Yup from 'yup';

import {
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Select,  
  Stack,
  Typography
} from '@mui/material'

import API from '../../../../helpers';

import DBJJ from './DB222';

export default function DialogBox({ handleClose, open}) {

  // Category Option
  const [cat, setCat] = React.useState([]);

  React.useEffect(() => {
    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getProductCategory(function(res){
        setCat(res.data);
      })  
    }
  }, [cat])

  // Modal State
  const [openModal, setOpenModal] = React.useState(false);
  const [options, setOptions] =  React.useState([]);
  const loading = openModal && options.length === 0;

  const [temp, setTemp] = React.useState({});

  React.useEffect(() => {
    let active = true

    if(!loading){
      return undefined
    }
    
    (async () => {
      API.getLabor(function(res) {
        if(!res) return undefined;
        else setOptions(res);
      })
    })();

    return () => {
      active = false
    }
  }, [loading])

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
        if(!res) return undefined;
        if(!res.success) alert('failed');
        else alert('done');
        handleReset();
        handleClose();
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, handleReset } = formik;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <FormikProvider value={formik}>
    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

      <DialogTitle id="alert-dialog-title">
        {"Have you done this work?"}
      </DialogTitle>
      <DialogContent>
        
          <Grid container spacing={3} alignItems="center" justifyContent="center" >
            <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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


                  <Grid item xs={9}>
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

                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
            </Grid>
          </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button type="submit" autoFocus>
          Agree
        </Button>
      </DialogActions>
      </Form>
    </FormikProvider>
    </Dialog>
  );
}