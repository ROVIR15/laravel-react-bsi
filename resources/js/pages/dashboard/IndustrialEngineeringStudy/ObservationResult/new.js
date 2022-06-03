import React, {useState, useMemo, useEffect} from 'react'
import Page from '../../../../components/Page';
import { Card, CardContent, Container, Grid, Divider, Paper, Button, Typography, Stack, CardHeader } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';

// API
import API from '../../../../helpers';

// Components
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import { GridActionsCellItem } from '@mui/x-data-grid';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import data from '@iconify/icons-eva/plus-fill';

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

const SpaceBetweenBox = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  justifyContent: "space-between", 
  marginBottom: "8px"
}))

function ObservationResult() {
  const {id} = useParams();
  
  //AutoComplete props
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [selectedValueP, setSelectedValueP] = React.useState({name: "HAHAH"});
  
  const [selectedValueWC, setSelectedValueWC] = React.useState({name: "HAHAH"});
  
  const ProductionStudySchema = Yup.object().shape({
    product_id: Yup.string().required('product is required'),
    work_center_id: Yup.string().required('work center is required'),
  });

  const formik = useFormik({
    initialValues: {
      product_id: '',
      work_center_id: '',
    },
    validationSchema: ProductionStudySchema,
    onSubmit: (values) => {

      const _data = {
        production_study_id: id,
        result_item: values
      };

      alert(JSON.stringify(_data));
    }
  })

  const { errors, touched, values, setValues, isSubmitting, setSubmitting, handleSubmit } = formik;

  /**
   * Data Grid for Inquiry Items
   */

  const [items, setItems] = useState([]);

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const handleAddDataOnModal = (data) => {
    const _data = {...data, production_study_id: id, seq_1: 0, seq_2: 0, seq_3: 0}
    API.insertProcessStudy(_data, function(res){
      if(!res.success) alert("failed");
      else alert('Success');
    })

    handleUpdateAllRows();
  }

  const processItems = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false, hideable: true },
    { field: 'process_name', headerName: 'Nama Process', editable: false, width: 200 },
    { field: 'labor_id', headerName: 'ID Pekerja', editable: false, hideable: true },
    { field: 'labor_name', headerName: 'Nama Pekerja', editable: false, width: 200 },
    { field: 'seq_1', headerName: 'Time 1', editable: true, width: 100 },
    { field: 'seq_2', headerName: 'Time 2', editable: true, width: 100 },
    { field: 'seq_3', headerName: 'Time 3', editable: true, width: 100 },
    { field: 'average', headerName: 'Average', editable: true, width: 100 },
    { field: 'target', headerName: 'Target', editable: true, width: 100 },
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


  // Handling Request from Inquiry Items Data Grid Component
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
        API.updateProcessStudy(editedIds, data, function(res){
          alert(JSON.stringify(res));
        })

        handleUpdateAllRows();

      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleUpdateAllRows = () => {
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
  };


  const handleResetRows = () => {
    setItems([]);
  }

  const deleteData = React.useCallback(
    (id) => () => {
      setItems((prevItems) => {
        return prevItems.filter((x) => (x.id !== id))
      });

      API.deleteProcessStudy(id, function(res){
        if(!res.success) alert('Failed');
        else alert('Success')
      })
  })

  useEffect(() => {
    if(!id) return;

    function isEmpty(array){
      return array.length === 0 || !Array.isArray(array);
    }

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

  function findUniqueProcess(data){
    let a = [...new Set(data.map(item => item.process_id))];
    return a.length;
  }

  function findAverageTime(data){
    let a = 0;
    data.map((item) => {
      a = a + item.average;
    })
    a = (a/data.length);
    return a.toFixed(2);
  }

  function findSumTarget(data){
    let a = 0;
    data.map((item) => {
      a = a + item.target;
    })
    return a;
  }

  function findBalancing(data){
    let totalTarget = 0;
    data.map((item) => {
      totalTarget = totalTarget + item.target;
    })

    let totalProcess = [...new Set(data.map(item => item.process_id))].length;

    return totalTarget/totalProcess
  }

  return (
    <Page>
      <Container>
      <Modal 
        payload={[]}
        open={openM}
        handleClose={handleCloseModal}
        setComponent={handleAddDataOnModal}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Stack direction="row" spacing={2} p={4}>
              <ColumnBox>
                <SpaceBetweenBox>
                  <Typography variant="h6"> Product </Typography>
                  <Button
                    disabled
                  >
                    Select
                  </Button>
                </SpaceBetweenBox>
                <div>
                  <Typography variant="body1">
                    {values.product_name}
                  </Typography>
                </div>
              </ColumnBox>
              <Divider orientation="vertical" variant="middle" flexItem />
              <ColumnBox>
                <SpaceBetweenBox>
                  <Typography variant="h6"> Work Center </Typography>
                  <Button
                    disabled
                  >
                    Select
                  </Button>
                </SpaceBetweenBox>
                <div>
                  <Typography variant="body1">
                    {values.work_center_name}
                  </Typography>
                </div>
              </ColumnBox>

            </Stack>
          </Paper>
        </Grid>

        {/* Item 4 */}
        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Total Target"
            />
            <CardContent>
              <Typography variant="h4">{findSumTarget(items)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Total Process"
            />
            <CardContent>
              <Typography variant="h4">{findUniqueProcess(items)}</Typography>            
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Average Time"
            />
            <CardContent>
              <Typography variant="h4">{findAverageTime(items)}</Typography>            
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Target Balancing"
            />
            <CardContent>
              <Typography variant="h4">{findBalancing(items).toFixed()}</Typography>              
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12}>
          <DataGrid 
            columns={processItems}
            rows={items}
            handleAddRow={handleOpenModal}
            onEditRowsModelChange={handleEditRowsModelChange}
            handleResetRows={handleResetRows}
          />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'end', marginTop: '1.5em' }}>
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

export default ObservationResult;