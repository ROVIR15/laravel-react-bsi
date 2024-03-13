import React, { useEffect, useState } from 'react';
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import {
  Paper,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  TextField,
  MenuList,
  InputAdornment,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { fNumber } from '../../../utils/formatNumber';

import { isArray } from 'lodash';
//API
import API from '../../../helpers';

const UploadPaper = styled(Button)(({ theme }) => ({
  outline: 'none',
  padding: '40px 8px',
  borderRadius: '8px',
  backgroundColor: 'rgb(244, 246, 248)',
  border: '1px dashed rgba(145, 158, 171, 0.32)',
  height: '100%'
}));

const recognised_cat = [
  {
    id: 0,
    code: '00',
    name: 'None'
  },
  {
    id: 1,
    code: '01',
    name: '01 - Bahan Baku atau Bahan Penolong Domestik (Ekspor Order)'
  },
  {
    id: 2,
    code: '02',
    name: '02 - Bahan Baku atau Bahan Penolong Impor (Ekspor Order)'
  },
  {
    id: 3,
    code: '03',
    name: '03 - Bahan Baku atau Bahan Penolong Domestik (Ekspor Order)'
  },
  {
    id: 4,
    code: 'F01',
    name: 'F01 - Finished Goods (Ekspor Order)'
  },
  {
    id: 5,
    code: 'F02',
    name: 'F01 - Finished Goods (Ekspor Order)'
  }
];

function Goods() {
  const [cat, setCat] = useState([]);
  const loading = cat.length === 0;
  const [file, setFile] = useState(null);

  const GoodsSchema = Yup.object().shape({
    code: Yup.string().required('Kode is required'),
    name: Yup.string().required('Nama is required'),
    unit_measurement: Yup.string().required('Satuan is required'),
    category: Yup.string().required('Kategori is required'),
    value: Yup.string().required('Nilai Produk is required'),
    product_code: Yup.number().min(1).required('Kode Produk is required'),
    feature_one: Yup.string().required('Size Produk is required'),
    feature_two: Yup.string().required('Color Produk is required')
  });

  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
      unit_measurement: '',
      category: '',
      value: '',
      brand: '',
      feature_one: '',
      feature_two: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: ({
      name,
      code,
      unit_measurement,
      value,
      brand,
      category,
      feature_one,
      feature_two
    }) => {
      const _new = {
        goods: {
          name: `${name} - #${code}`,
          unit: unit_measurement,
          value,
          brand,
          imageUrl: file
        },
        category,
        feature_one: feature_one.split(','),
        feature_two: feature_two.split(',')
      };

      try {
        API.insertGoods(_new, function (res) {
          if (res.success) alert('success');
          else alert('failed');
        });
      } catch (error) {
        alert(`error occured is ${error}`);
      }

      handleReset();
      setFile(null);
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleReset,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleMultiSelect = (name, value) => {
    setFieldValue(name, value);
  };

  const MenuItemList = (listArray) => {
    if (!Array.isArray(listArray)) {
      return <MenuItem value={1}>{'wkwkw'}</MenuItem>;
    } else {
      listArray.map(function (x) {
        return <MenuItem value={x.id}>{x.name}</MenuItem>;
      });
    }
  };

  /**
   * Handle Upload File
   */

  const handleOnFileChange = (event) => {
    setFile(event.target.files[0]);

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('file', event.target.files[0], event.target.files[0].name);

    API.uploadImage(formData, function (res) {
      if (res.success) {
        setFile(res.path);
        alert(JSON.stringify(res));
      } else {
        alert('error');
      }
    });
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (cat.length > 0 || cat.length != 0) return;
    else {
      API.getProductCategory(function (res) {
        setCat(res.data);
      });
    }

    return () => {
      active = false;
    };
  }, [loading]);

  function ShowImageWhenItsUploaded() {
    if (file) {
      return (
        <Paper sx={{ padding: 2, height: '100%' }}>
          <img src={file} alt="Image" />
          <Button component="label" htmlFor="upload-file">
            <input
              accept="image/*"
              multiple
              id="upload-file"
              type="file"
              onChange={handleOnFileChange}
              hidden
            />
            <Typography variant="h5">Change File</Typography>
          </Button>
        </Paper>
      );
    } else {
      return (
        <Paper sx={{ padding: 2, height: '100%' }}>
          <label htmlFor="upload-file">
            <input
              accept="image/*"
              multiple
              id="upload-file"
              type="file"
              onChange={handleOnFileChange}
              style={{ display: 'none' }}
            />
            <UploadPaper component="span" fullWidth>
              <Typography variant="h5">Drop or Select File</Typography>
            </UploadPaper>
          </label>
        </Paper>
      );
    }
  }

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader title="Product Information" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={5}>
                    <ShowImageWhenItsUploaded />
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          autoComplete="code"
                          type="text"
                          label="Kode"
                          {...getFieldProps('code')}
                          error={Boolean(touched.code && errors.code)}
                          helperText={touched.code && errors.code}
                        />
                      </Grid>

                      <Grid item xs={8}>
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

                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel>Kategori</InputLabel>
                          <Select
                            autoComplete="category"
                            type="text"
                            {...getFieldProps('category')}
                            error={Boolean(touched.category && errors.category)}
                            helperText={touched.category && errors.category}
                          >
                            {!isArray(cat)
                              ? null
                              : cat.map(function (x) {
                                  if (x.sub === ' ') {
                                    return <MenuItem value={x.id}>{`${x.name}`}</MenuItem>;
                                  } else {
                                    return (
                                      <MenuItem value={x.id}>{`${x.name} - ${x.sub}`}</MenuItem>
                                    );
                                  }
                                })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel>Kode Pengenalan Produk</InputLabel>
                          <Select
                            autoComplete="product_code"
                            type="text"
                            {...getFieldProps('product_code')}
                            error={Boolean(
                              touched.product_code && errors.product_code
                            )}
                            helperText={
                              touched.product_code && errors.product_code
                            }
                          >
                            {recognised_cat.map(function (x) {
                              return <MenuItem value={x.id}>{`${x.name}`}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={4}>
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
                          InputProps={{
                            startAdornment: <InputAdornment position="start">Rp.</InputAdornment>
                          }}
                          autoComplete="value"
                          type="number"
                          label="Nilai Produk"
                          {...getFieldProps('value')}
                          error={Boolean(touched.value && errors.value)}
                          helperText={touched.value && errors.value}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
              <CardContent>
                <Stack direction="column">
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ m: 1 }}
                  >
                    Save
                  </LoadingButton>
                  <Button fullWidth size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                    Cancel
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default Goods;
