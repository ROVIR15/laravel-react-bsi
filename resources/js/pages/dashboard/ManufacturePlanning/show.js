import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, Stack, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';

import { isArray, isEmpty } from 'lodash'
//API
import API from '../../../helpers'
import { useParams } from 'react-router-dom';
import { fCurrency, fNumber } from '../../../utils/formatNumber';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));


function calculateOutput(params){
  const layer = parseFloat(params.row.expected_output)*parseFloat(params.row.work_days);
  return Math.floor(layer);
}

const FloatingPaper = styled(Box)(({theme}) => ({
  padding: "4px 30px", 
  bottom: "24px", 
  zIndex: "999", 
  position: "fixed", 
  boxShadow: "rgb(99 115 129 / 36%) -12px 12px 32px -4px", 
  backdropFilter: "blur(6px)", 
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  minWidth: "72rem"
}))

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

  //Data Grid
  const [items, setItems] = useState([])
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});


  const [ collected, setCollected ] = React.useState({
    qty: 0,
    money: 0
  })

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const handleAddItems = (values) => {
    try {
      API.setManufacturePlanningItems(values, (res) => {
        if(!res.success) alert("failed");
        else alert('success');

        handleUpdateData();
      })
    } catch (error) {
      alert('error')
    }
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


        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value

        try {
          API.updateManufacturePlanningItems(id, data, function(res){
            if(res.success) alert('success');
            else alert('failed aa');
          })            
        } catch {
          alert('error')
        }

      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  //
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

          API.setManufacturePlanning(payload, function(res){
            if(res.success) alert('success');
            else alert('failed bb')
          })          

      } catch (error) {
        alert('error')        
      }
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    if(!id) return;
    handleUpdateData();
  }, [id])
  
  const handleUpdateData = () => {
    try {
      API.getAManufacturePlanning(id, (res) => {
        if(!res) return undefined
        else {
          const payload = res.items_with_price.map(function(item){
            return {
              id: item?.sales_order_id,
              po_number: item?.info?.po_number,
              total_qty: item?.info?.avg_price[0]?.total_qty,
              expected_output: item?.expected_output,
              work_days: item?.work_days,
              total_plan_qty: Math.floor(item?.expected_output * item?.work_days),
              total_plan_amount: Math.floor(item?.expected_output * item?.work_days * parseFloat(item?.info?.avg_price[0]?.cm_price_avg))
            }
          })

          const result = payload?.reduce(function(initial, next){
            return {
              qty: initial.qty + next?.total_plan_qty,
              money: initial.money + next?.total_plan_amount
            }
          }, {
            qty: 0,
            money: 0
          })
          
          setCollected(result)
          setItems(payload);

          setFieldValue('monthYear', `${res.year}-${res.month}`);
        }
      })
    } catch (error) {
      alert(error)
    }
  }
  
  
  const handleMultiSelect = (name, value) => {
    setFieldValue(name, value);
  }
  

  return (
    <Page>
      <Container >
      <Modal 
        open={openM}
        onAddItems={handleAddItems}
        handleClose={handleCloseModal}
        selected={items}
        setSelected={setItems}
        update={handleUpdateData}
      />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>

            <Grid item xs={12}>

            </Grid>

            <Grid item xs={12}>
              <Card >
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

                  <Grid item xs={12} lg={7}>
                    <Stack 
                      direction="row"
                      spacing={2}
                    >
                      <Item>
                        <Typography variant="body2">Total Qty</Typography>
                        <Typography variant="h5"> {fNumber(collected.qty)}</Typography>
                      </Item>
                      <Item>
                        <Typography variant="body2">Total Expected Revenue</Typography>
                        <Typography variant="h5"> Rp. {fCurrency(collected.money)}</Typography>
                      </Item>
                    </Stack>
                  </Grid>

                </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} mb={2}>
              <DataGrid 
                columns={columns} 
                rows={items}
                onEditRowsModelChange={handleEditRowsModelChange}
                handleAddRow={handleOpenModal}
              />
            </Grid>

            <Grid item xs={12}>
              <FloatingPaper>
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
              </FloatingPaper>
            </Grid>
          </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
}

export default Goods