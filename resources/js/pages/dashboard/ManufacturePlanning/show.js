import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';

import { isArray } from 'lodash'
//API
import API from '../../../helpers'
import { useParams } from 'react-router-dom';

function calculateOutput(params){
  const layer = parseFloat(params.row.expected_output)*parseFloat(params.row.work_days);
  return Math.floor(layer);
}

const columns = [
  { field: 'id', width: 50, headerName: 'ID', editable: false},
  { field: 'po_number', headerName: 'Sales PO Number', width: 300, editable: false},
  { field: 'total_qty', headerName: 'Total Qty', editable: false},
  { field: 'expected_output', headerName: 'Expected Output', editable: true},
  { field: 'work_days', headerName: 'Work Days Output', editable: true},
  { field: 'expected_total_output', headerName: 'Est. Output', editable: false, valueGetter: calculateOutput},
];

function Goods() {

  const {id} = useParams();

  const GoodsSchema = Yup.object().shape({
    monthYear: Yup.date().required('is required'),
  });

  const formik = useFormik({
    initialValues: {
      monthYear: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      const haha = values.monthYear.split("-");
      try {
        const payload = {
          month: parseInt(haha[1]),
          year: haha[0],
          items
        }

        try {
          API.setManufacturePlanning(payload, function(res){
            if(res.success) alert('success');
            else alert('failed')
          })          
        } catch (error) {
          alert('error')  
        }

      } catch (error) {
        alert('error')        
      }
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    handleUpdateData();
  }, [id])
  
  const handleUpdateData = () => {
    try {
      API.getAManufacturePlanning(id, (res) => {
        if(!res) alert('failed');
        else {
          setFieldValue('monthYear', `${res.year}-${res.month}`);
          const payload = res.items.map(function(item){
            return {
              id: item?.sales_order_id,
              po_number: item?.sales_order?.po_number,
              total_qty: item?.sales_order?.sum[0]?.total_qty,
              expected_output: item?.expected_output,
              work_days: item?.work_days
            }
          })
          setItems(payload);
        }
      })
    } catch (error) {
      alert('error')
    }
  }
  
  const handleMultiSelect = (name, value) => {
    setFieldValue(name, value);
  }

  //Data Grid
  const [items, setItems] = useState([])
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const handleAddItems = (values) => {
    setItems(values);
  }
  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setItems((prevItems) => {
          const itemToUpdateIndex = parseInt(editedIds[0]);
    
          return prevItems.map((row, index) => {
            if(row.id === parseInt(itemToUpdateIndex)){
              return {...row, [editedColumnName]: editRowData[editedColumnName].value}
            } else {
              return row
            }
          });
        });

      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );
  

  return (
    <Page>
      <Container >
      <Modal 
        open={openM}
        onAddItems={handleAddItems}
        handleClose={handleCloseModal}
        selected={items}
        setSelected={setItems}
      />
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
                      autoComplete="monthYear"
                      type="month"
                      label="Month and Year"
                      {...getFieldProps('monthYear')}
                      error={Boolean(touched.monthYear && errors.monthYear)}
                      helperText={touched.monthYear && errors.monthYear}
                    />
                  </Grid>

                </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <DataGrid 
                columns={columns} 
                rows={items}
                onEditRowsModelChange={handleEditRowsModelChange}
                handleAddRow={handleOpenModal}
              />
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