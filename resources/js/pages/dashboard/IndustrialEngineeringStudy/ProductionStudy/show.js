import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../../components/Page';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, CardHeader, CardContent, Container, Grid, Typography, Stack, Button } from '@mui/material'
import { Link as RouterLink, useLocation, } from 'react-router-dom';
import { GridActionsCellItem } from '@mui/x-data-grid';

// Components
import DataGrid from '../../../../components/DataGrid';
import Modal from './components/Modal2';

//Dialog Component
import DialogBox from './components/DialogBox';

//API
import API from '../../../../helpers'

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function ProductionStudy() {
  const {id} = useParams();
  const navigate = useNavigate();

  //AutoComplete props
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  //Dialog Interaction
  const [openDP, setOpenDP] = useState(false);
  const [selectedValueP, setSelectedValueP] = React.useState({});
  const loadingP = openDP && options.length === 0;
  
  const [openDWC, setOpenDWC] = useState(false);
  const loadingWC = openDWC && options.length === 0;
  const [selectedValueWC, setSelectedValueWC] = React.useState({});

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});
  const [items, setItems] = useState([])

  const ProductionStudySchema = Yup.object().shape({
    id: Yup.string().required('Email is required'),
    product_id: Yup.string().required('product_id is required'),
    work_center_id: Yup.string().required('work_center_id is required'),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      product_id: '',
      work_center_id: '',
      product_name: '',
      work_center_name: ''
    },
    validationSchema: ProductionStudySchema,
    onSubmit: (values) => {
      API.updateProductFeature(id, values, function(res){
        alert('success');
      });
      setSubmitting(false);
    }
  })

  const deleteData = useCallback(
    (id) => () => {
      API.deleteProcessStudy(id, function(res){
        if(res.success) alert('success');
        else alert('failed')
      });
      handleUpdateAllRows();
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
        API.updateRequestItem(editedIds, data, function(res){
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
    API.getProcessStudyByProductionStudy(id, function(res){
      if(res.data) setItems(res.data);
      setItems(temp);
    });
  };
  
  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => {
    handleUpdateAllRows();
    setOpenM(false);
  };

  //Handle Close Dialog
  const handleCloseP = (value) => {
    setOpenDP(false);
    setSelectedValueP(value);
  };

  const handleCloseWC = (value) => {
    setOpenDWC(false);
    setSelectedValueWC(value);
  };

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
    { field: 'process_id', headerName: 'ID Process', editable: false, visible: 'hide' },
    { field: 'process_name', headerName: 'Nama Process', editable: false, width: 200 },
    { field: 'labor_id', headerName: 'ID Pekerja', editable: false},
    { field: 'labor_name', headerName: 'Nama Pekerja', editable: false, width: 200 },
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

    // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loadingP) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getProduct((res) => {
          if(!res) return
          else setOptions(res.data);
        })
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingP])

  // Preapre data from work center
  React.useEffect(() => {
    let active = true;

    if (!loadingWC) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getWorkCenter((res) => {
          if(!res) return
          else setOptions(res.data);
        })
      }
    })();
    
    return () => {
      active = false;
    };
  }, [loadingWC])

  // Get a production study data
  useEffect(() => {
    if(!id) return;
    API.getAProductionStudy(id, function(res){
      if(!res) alert("Something went wrong!");
      const { id, product_id, product_name, work_center_id, work_center_name, process_list} = res.data
      setValues({
        id: id,
        product_id,
        product_name,
        work_center_id,
        work_center_name
      });

      setItems(process_list);
    });
  }, [id]);

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  return (
    <Page>
      <Container>
      <Modal 
        payload={[]}
        id={values.id}
        open={openM}
        handleClose={handleCloseModal}
        setComponent={setItems}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack component="div" spacing={2}>
            <Card >
              <CardHeader
                title="Product"
                action={
                  <Button
                    onClick={() => setOpenDP(true)}
                  >
                    Select
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="body1">
                  {values.product_name}
                </Typography>
              </CardContent>
              <DialogBox
                options={options}
                loading={loadingP}
                error={Boolean(touched.product_id && errors.product_feature_id)}
                helperText={touched.product_id && errors.product_id}
                selectedValue={{id: values.product_id, name: values.product_name}}
                open={openDP}
                onClose={handleCloseP}
              />
            </Card>
            <Card >
              <CardHeader
                title="Type of Work"
                action={
                  <Button
                    onClick={() => setOpenDWC(true)}
                  >
                    Select
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="body1">
                  {values.work_center_name}
                </Typography>
              </CardContent>
              <DialogBox
                options={options}
                loading={loadingWC}
                error={Boolean(touched.work_center_id && errors.work_center_id)}
                helperText={touched.work_center_id && errors.work_center_id}
                selectedValue={{id: values.work_center_id, name: values.work_center_name}}
                open={openDWC}
                onClose={handleCloseWC}
              />
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Card >
            <CardHeader
              title="Item Overview"
            />
            <CardContent>
              <DataGrid 
                columns={columns}
                rows={items}
                handleAddRow={handleOpenModal}
                onEditRowsModelChange={handleEditRowsModelChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'end', marginTop: '1.5em' }}>
            <Button
              size="large"
              color="info"
              variant="contained"
              onClick={() => navigate('/dashboard/ie-study/result/' + id + '/add')}
              sx={{ m: 1 }}
            >
              Record
            </Button>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ m: 1 }}
            >
              Update
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

export default ProductionStudy