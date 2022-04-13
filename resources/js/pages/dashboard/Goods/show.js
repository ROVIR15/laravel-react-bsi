import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link as RouterLink, useLocation, } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';

// Components
import DataGrid from '../../../components/DataGrid';

//API
import API from '../../../helpers'

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Goods() {
  const {id} = useParams();
  
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([]);
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
      brand: '',
    },
    validationSchema: GoodsSchema,
    onSubmit: ({ name, unit_measurement, value, brand, category}) => {
      const _new = {
        goods: {
          name, unit: unit_measurement, value, brand
        }, 
        category
      }
      API.updateGoods(id, _new, function(res){
        if(res.success) alert('success');
        else alert('failed')
      })
      setSubmitting(false);
    }
  });

  const deleteData = useCallback(
    (id) => () => {
      API.deleteProductFeature(id, function(res){
        location.reload();
      }).catch(function(error){
        alert('Fail');
      });
    }, []
  )

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
        API.updateProductFeature(editedIds, data, function(res){
          alert(JSON.stringify(res));
        })
      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = () => {
    API.getAGoods(id, function(res){
      if(!res) alert("Something went wrong!");
      var temp = res.data.goods_items;
      temp = temp.map(function(x){
        return {...x, name: res.data.name, brand: res.data.brand}
      });
      setItems(temp);
    }).catch(function(error){
      alert('Error');
    });
  };

  const handleAddRow = () => {
    const _new = {
      product_id: values.product_id,
      size: 'Isi',
      color: 'Color'
    }
    API.newProductFeature(_new, function(res){
      const {success, data} = res;
      if(!success) alert('error');
      setItems((prevItems) => [...prevItems, {...data, name: values.name, brand: values.brand}]);
    }).catch(function(err){
      alert('error');
    });
  };

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false },
    { field: 'size', headerName: 'Size', editable: true},
    { field: 'color', headerName: 'Color', editable: true },
    { field: 'brand', headerName: 'Brand', editable: false },
    { field: 'actions', type: 'actions', width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={trash2Outline} width={24} height={24} />}
          label="Delete"
          onClick={deleteData(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteData]);

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

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  useEffect(() => {
    if(cat.length > 0 || cat.length != 0) return
    else {
      API.getProductCategory(function(res){
        setCat(res.data);
      })  
    }
  }, [cat])

  useEffect(() => {
    if(!id) return;
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
      var temp = res.data.goods_items;
      temp = temp.map(function(x){
        return {...x, name: res.data.name, brand: res.data.brand}
      });
      setItems(temp);
    });
  }, [id]);

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

                </Grid>
                </CardContent>
            </Card>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 }, position: 'unset' }}>
              <CardHeader
                title="Product Feature"
              />
              <CardContent>
                <DataGrid 
                  columns={columns} 
                  rows={items}
                  onEditRowsModelChange={handleEditRowsModelChange}
                  handleUpdateAllRows={handleUpdateAllRows}
                  handleAddRow={handleAddRow}
                />
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