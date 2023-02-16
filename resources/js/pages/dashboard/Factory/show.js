import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, FormControl, InputLabel, Paper, Select, MenuItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

//API
import API from '../../../helpers'
import { isArray, isEmpty, isUndefined } from 'lodash';

import DataGrid from '../../../components/DataGrid';
import Modal from './components/Modal';
import { GridActionsCellItem } from '@mui/x-data-grid';
//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Goods() {
  const {id} = useParams();
  
  //Modal Component of BOM 
  const [items, setItems] = useState([]);

  const [options, setOptions] = useState([])

  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);


  const GoodsSchema = Yup.object().shape({
    name: Yup.string().required('Date is required')
  });

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      try {
        API.updateFactory(id, values, function(res){
          if(res.success) alert('success');
          else alert('failed')
        })
        setSubmitting(false);          
      } catch (error) {
        alert('error');
      }
    }
  });

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
    { field: 'name', width: 300, headerName: 'Name', editable: false },
    { field: 'facility_type_name', headerName: 'Size', editable: true},
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

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  const deleteData = () => {
    try {
      // 
    } catch (error) {
      alert(error);
    }
  }

  const updateFacilityList = () => {
    try {
      API.getAFactory(id, function(res){
        if(isUndefined(res)) return;
        if(!res.success) throw new Error('failed to get data of facility');
        if(isEmpty(res.data)) setItems([])
        else {
          setValues({
            ...values,
            name: res.data.name,
            description: res.data.description
          });
          let _items = res.data.items.map(function(item){
            return {
              id: item?.info?.id,
              name: item?.info?.name,
              facility_type_id: item?.info?.type?.id,
              facility_type_name: item?.info?.type?.name
            }
          })
          setItems(_items)
        }
      })
    } catch (error) {
      setItems([]);
    }
  }

  useEffect(() => {
    if(!id) return;
    updateFacilityList();
  }, [id]);

  useEffect(() => {
    if(!id) return;
    try {
      API.getFacility(``, function(res){
        if(isUndefined(res)) return;
        else {
          if(!isArray(res.data)) throw new ('No Data');
          else {
            let _a = res.data.map(function(item){
              return {
                id: item.id,
                name: item.name,
                facility_type_id: item.type.id,
                facility_type_name: item.type.name
              }
            })
            setOptions(_a);
          }
        }
      })
    } catch (error) {
      alert(error);
      setOptions([]);
    }
  }, [])

  return (
    <Page>
      <Modal
        open={openM}
        options={options}
        items={items}
        setItems={setItems}
        handleClose={handleCloseModal}
        update={updateFacilityList}
      />
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card >
                <CardHeader
                  title="Line Target Information"
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

                  <Grid item xs={12} lg={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      autoComplete="description"
                      type="text"
                      label="Description"
                      {...getFieldProps('description')}
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>

                </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card >
                <CardHeader
                  title="Line Target Information"
                />
                <CardContent>
                  <DataGrid 
                    columns={columns}
                    rows={items}
                    handleAddRow={handleOpenModal}
                    handleUpdateAllRows={updateFacilityList}
                  />
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