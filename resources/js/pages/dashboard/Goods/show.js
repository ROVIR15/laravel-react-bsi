import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Stack,
  MenuItem,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';

// Components
import DataGrid from '../../../components/DataGrid';

//API
import API from '../../../helpers';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { useSnackbar } from 'notistack';

import { strPadLeft } from '../../../utils/formatCase';
import { isUndefined } from 'lodash';

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
    name: 'F02 - Finished Goods (Domestik Order)'
  }
];

function Goods() {
  const { id } = useParams();

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Nama is required'),
    unit_measurement: Yup.string().required('Satuan is required'),
    category: Yup.string().required('Kategori is required'),
    product_code: Yup.number().required('Kode Produk is required'),
    value: Yup.string().required('Nilai Produk is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      unit_measurement: '',
      category: '',
      value: '',
      product_code: 0,
      brand: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, unit_measurement, product_code, value, brand, category }) => {
      const _new = {
        goods: {
          name,
          product_code,
          unit: unit_measurement,
          value,
          brand,
          imageUrl: file
        },
        category
      };
      try {
        API.updateGoods(id, _new, function (res) {
          if (!res) enqueueSnackbar('', { variant: 'failedAlert' });
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }
      setSubmitting(false);
    }
  });

  const deleteData = useCallback(
    (id) => () => {
      try {
        API.deleteProductFeature(id, function (res) {
          if (!res) enqueueSnackbar('', { variant: 'failedAlert' });
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }

      handleUpdateAllRows();
    },
    []
  );

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;
        // update on firebase
        try {
          API.updateProductFeature(editedIds, data, function (res) {
            if (!res) enqueueSnackbar('', { variant: 'failedAlert' });
            if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
            else enqueueSnackbar('', { variant: 'failedAlert' });
          });
        } catch (error) {
          enqueueSnackbar('', { variant: 'failedAlert' });
        }
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = () => {
    API.getAGoods(id, function (res) {
      if (!res) alert('Something went wrong!');
      var temp = res.data.goods_items;
      temp = temp.map(function (x) {
        return { ...x, name: res.data.name, brand: res.data.brand };
      });
      setItems(temp);
    }).catch(function (error) {
      alert('Error');
    });
  };

  const handleAddRow = () => {
    const _new = {
      product_id: values.product_id,
      size: 'Isi',
      color: 'Color'
    };
    API.newProductFeature(_new, function (res) {
      const { success, data } = res;
      if (!success) alert('error');
      setItems((prevItems) => [...prevItems, { ...data, name: values.name, brand: values.brand }]);
    }).catch(function (err) {
      alert('error');
    });
  };

  /**
   * Handle Upload File
   */
  const [file, setFile] = useState(null);

  const handleOnFileChange = (event) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('file', event.target.files[0], event.target.files[0].name);

    try {
      API.uploadImage(formData, function (res) {
        if (!res) enqueueSnackbar('', { variant: 'failedAlert' });
        if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
        else enqueueSnackbar('', { variant: 'failedAlert' });
      });
    } catch (error) {
      enqueueSnackbar('', { variant: 'failedAlert' });
    }
  };

  const columns = useMemo(
    () => [
      { field: 'sku_id', headerName: 'SKU ID', editable: false, visible: 'hide', width: 150 },
      { field: 'name', headerName: 'Name', editable: false , width: 350},
      { field: 'size', headerName: 'Size', editable: true },
      { field: 'color', headerName: 'Color', editable: true },
      { field: 'brand', headerName: 'Brand', editable: false },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteData(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteData]
  );

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    setValues
  } = formik;

  useEffect(() => {
    if (cat.length > 0 || cat.length != 0) return;
    else {
      API.getProductCategory(function (res) {
        setCat(res.data);
      });
    }
  }, [cat]);

  useEffect(() => {
    if (!id) return;
    API.getAGoods(id, function (res) {
      if (!res) alert('Something went wrong!');
      if (!res?.data) alert('Something went wrong!');
      else {
        let data = res?.data;

        setValues({
          ...values,
          product_id: data?.product_id[0]?.id,
          name: data?.name,
          unit_measurement: data?.unit_measurement,
          gross_weight: data?.gross_weight,
          category: data?.category[0]?.id,
          product_code: data?.product_code,
          value: data?.value,
          brand: data?.brand
        });

        setFile(data?.imageUrl);

        var temp = data?.goods_items;

        temp = temp?.map(function (x) {
          return {
            ...x,
            sku_id: x.sku_id,
            name: data?.name,
            brand: data?.brand
          };
        });

        setItems(temp);
      }
    });
  }, [id]);

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

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel>Kategori</InputLabel>
                          <Select
                            autoComplete="category"
                            type="text"
                            {...getFieldProps('category')}
                            error={Boolean(touched.category && errors.category)}
                            helperText={touched.category && errors.category}
                          >
                            {cat.map(function (x) {
                              return (
                                <MenuItem value={x.id} key={x.id}>
                                  {x.name} - {x.sub}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6}>
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

                      <Grid item xs={4}>
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

                      <Grid item xs={4}>
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
                  </Grid>

                  <Grid item xs={12}>
                    <DataGrid
                      columns={columns}
                      rows={items}
                      onEditRowsModelChange={handleEditRowsModelChange}
                      handleUpdateAllRows={handleUpdateAllRows}
                      handleAddRow={handleAddRow}
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
