import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { Paper, Box, Button, Container, Card, CardHeader, CardContent, FormControl, Grid, InputLabel, MenuItem, Typography, Select, TextField, Stack, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';

import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import SelectEdit from './components/SelectEdit';
import AutoComplete from './components/AutoComplete';

import { isArray, isEmpty } from 'lodash'
//API
import API from '../../../helpers'
import { useParams } from 'react-router-dom';
import { fCurrency, fNumber } from '../../../utils/formatNumber';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-2-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));


function calculateOutput(params){
  const layer = parseFloat(params.row.expected_total_output)/parseFloat(params.row.expected_output);
  return layer.toFixed(2);
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
}));

const renderSelectEditInputCell = (params) => {
  return <SelectEdit {...params} />;
};

const renderAutoCompleteCell = (params) => {
  return <AutoComplete {...params} />;
};

function Goods() {

  const {id} = useParams();

  //Data Grid
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const [ collected, setCollected ] = React.useState({
    qty: 0,
    money: 0
  })

  const columns = useMemo(() => [
    { field: 'id', width: 50, headerName: 'ID', editable: false},
    { field: 'facility_name', headerName: 'Line', width: 250, editable: false},
    { field: 'costing_name', headerName: 'Costing', width: 250, editable: false},
    { field: 'po_number', headerName: 'Sales PO Number', width: 300, editable: false},
    { field: 'total_qty', headerName: 'Total Qty', editable: false},
    { field: 'expected_total_output', headerName: 'Estimasi Output', width: 300, editable: true},
    { field: 'expected_output', headerName: 'Estimasi Kecepatan Output', width: 300, editable: true},
    { field: 'work_days', headerName: 'Work Days Output', editable: false, valueGetter: calculateOutput},
    { field: 'actions', type: 'actions', width: 50, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={editFill} width={24} height={24} />}
          label="Edit"
          onClick={editData(params)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Icon icon={trash2Outline} width={24} height={24} />}
          label="Delete"
          onClick={deleteData(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteData, editData]);

  const editData = useCallback(
    (params) => () => {
      setSelected(params.row);
      handleOpenModal();
    }
  )

  const deleteData = useCallback(
    (id) => () => {
      try {
        API.deleteManufacturePlanningItem(id, function(res){
          handleUpdateData();
        })
      } catch(err){
        alert('err')
      }

    }, []
  )

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => {
    setOpenM(false);
    handleUpdateData();
  }

  const handleAddItems = (values) => {
    try {
      API.setManufacturePlanningItems(values, (res) => {
        if(!res.success) alert("failed");
        else alert('success');
      })
    } catch (error) {
      alert('error')
    }

    setItems([])
    handleUpdateData();
  }

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];
        let _payloadToBePosted = {};

        //update items state
        setItems((prevItems) => {
          const itemToUpdateIndex = parseInt(editedIds[0]);
          return prevItems.map((row, index) => {
            if(row.id === parseInt(itemToUpdateIndex)){
              if (editedColumnName === 'expected_total_output' && row?.expected_output > 0) {
                _payloadToBePosted = {[editedColumnName]: editRowData[editedColumnName].value, work_days: (editRowData[editedColumnName].value/row?.expected_output)?.toFixed(2)}
                return {...row, [editedColumnName]: editRowData[editedColumnName].value, work_days: (editRowData[editedColumnName].value/row?.expected_output)?.toFixed(2)}
              }
              else if ( editedColumnName === 'expected_output' && row?.expected_total_output > 0 ) {
                _payloadToBePosted = {[editedColumnName]: editRowData[editedColumnName].value, work_days: (row?.expected_total_output/editRowData[editedColumnName].value).toFixed(2)}
                return {...row, [editedColumnName]: editRowData[editedColumnName].value, work_days: (row?.expected_total_output/editRowData[editedColumnName].value).toFixed(2)}
              }
              else {
                _payloadToBePosted = {[editedColumnName]: editRowData[editedColumnName].value}
                return {...row, [editedColumnName]: editRowData[editedColumnName].value}
              }
            } else {
              return row
            }
          });
        });

        try {
          API.updateManufacturePlanningItems(editedIds, _payloadToBePosted, function(res){
            if(res.success) alert('success');
            else throw new Error('failed');
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
        alert('done')
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
              id: item?.id,
              bom_id: item?.bom_id,
              costing_name: item?.costing?.name,
              facility_id: item?.facility_id,
              facility_name: item?.facility?.name,
              sales_order_id: item?.sales_order_id,
              po_number: item?.info?.po_number,
              total_qty: item?.info?.avg_price[0]?.total_qty,
              expected_output: item?.expected_output,
              work_days: parseFloat(item?.work_days),
              expected_total_output: Math.round(parseFloat(item?.work_days) * parseFloat(item?.expected_output)),
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

          let monthYear =  `${res?.year}-${res?.month}`;
          monthYear = moment(monthYear).format('YYYY-MMMM');

          setFieldValue('monthYear', monthYear);
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
        selected={selected}
        setSelected={setSelected}
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
                        <Typography variant="body2">Total Expected X Revenue</Typography>
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