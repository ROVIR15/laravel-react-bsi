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

function calculateOutput(params){
  const layer = parseFloat(params.row.expected_total_output)/parseFloat(params.row.expected_output);
  return layer.toFixed(2);
}

const columns = [
  { field: 'id', width: 50, headerName: 'ID', editable: false},
  { field: 'facility_name', headerName: 'Line', width: 250, editable: false},
  { field: 'costing_name', headerName: 'Costing', width: 250, editable: false},
  { field: 'po_number', headerName: 'Sales PO Number', width: 300, editable: false},
  { field: 'total_qty', headerName: 'Total Qty', editable: false},
  { field: 'expected_total_output', headerName: 'Estimasi Output', width: 300, editable: true},
  { field: 'expected_output', headerName: 'Estimasi Kecepatan Output', width: 300, editable: true},
  { field: 'work_days', headerName: 'Work Days Output', editable: false, valueGetter: calculateOutput},
];

function Goods() {
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

      handleReset();
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleReset, handleSubmit, getFieldProps, setFieldValue } = formik;

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
  const handleCloseModal = () => {
    setOpenM(false);
  }

  const handleAddItems = (values) => {
    setItems((prevItems) => prevItems.concat(values));
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
              if (editedColumnName === 'expected_total_output' && row?.expected_output > 0) {
                return {...row, [editedColumnName]: editRowData[editedColumnName].value, work_days: (editRowData[editedColumnName].value/row?.expected_output)?.toFixed(2)}
              }
              else if ( editedColumnName === 'expected_output' && row?.expected_total_output > 0 ) {
                return {...row, [editedColumnName]: editRowData[editedColumnName].value, work_days: (row?.expected_total_output/editRowData[editedColumnName].value).toFixed(2)}
              }
              else {
                return {...row, [editedColumnName]: editRowData[editedColumnName].value}
              }
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
        lengthOfSelected={items.length}
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
              <Paper>
                <DataGrid 
                  columns={columns} 
                  rows={items}
                  onEditRowsModelChange={handleEditRowsModelChange}
                  handleAddRow={handleOpenModal}
                />
              </Paper>
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