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

//Dialog Component
import DialogBox from './components/DialogBox';


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

function calculateTarget(params) {
  return (3600/parseFloat(params.row.time_1)).toFixed(2);
}

function setCalculateTarget(params){
  const a = parseFloat(params.value.time_1);
}

function SamplingStudy() {
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
        ...values, 
        study_payload: items
      };

      API.insertSamplingStudy(_data, function(res){
        if(res.success) alert('success');
        else alert('failed');
      })

      alert(JSON.stringify(_data));
    }
  })

  const { errors, touched, values, setValues, isSubmitting, setSubmitting, handleSubmit, setFieldValue } = formik;

  // Get Data

  useEffect(() => {
    
    API.getASamplingStudy(id, function(res){
      console.log(id);
      if(!res) return;
      setValues({
        product_id: res.product.id,
        work_center_id: res.work_center_id
      });

      setSelectedValueP(res.product);
      setSelectedValueWC(res.work_center);

      setItems(res.data);
    });

  }, [id])

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
    const _data = {id: items.length+1, sampling_study_id: id, name: 'isi', machine_code: 'isi', time_1: '0.02'}
    API.insertSampleProcess(_data, function(res){
      if(res.success) setItems([...items, _data]);
      else alert('error');
    });
  }

  const processItems = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false, flex: 1, hideable: true },
    { field: 'name', headerName: 'Nama Process', editable: true, width: 200 },
    { field: 'machine_code', headerName: 'Mesin', editable: true, width: 100},
    { field: 'time_1', headerName: 'Time 1', editable: true, width: 100},
    { field: 'target', headerName: 'Target', width: 100, valueGetter: calculateTarget},
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

        API.updateSampleProcess(editedIds[0], data, function(res){
          if(res.success) {
            setItems((prevItems) => {
              return prevItems.map((item) => 
                (item.id === parseInt(editedIds[0]) ? {...item, time_1: data.time_1}:item)
              )
            })
          } else {
            alert('error')
          }
        })

      } else {
        setEditRowData(model[editedIds[0]]);
      }
  
      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleResetRows = () => {
    setItems([]);
  }

  const deleteData = React.useCallback(
    (id) => () => {
      setItems((prevItems) => {
        return prevItems.filter((x) => (x.id !== id))
      });

      API.deleteSampleProcess(id, function(res){
        if(!res.success) alert('Failed');
        else alert('Success')
      })
  })

  function findUniqueProcess(data){
    if(!data.length) return 0;
    return data.length;
  }

  function findAverageTime(data){
    if(!data.length) return 0;
    const sum = data.reduce((a, {time_1}) => a + parseFloat(time_1), 0);
    return (sum/data.length).toFixed(2);
  }

  function findSumTarget(data){
    if(!data.length) return 0;
    const sum = data.reduce((a, {time_1}) => a + parseFloat(time_1), 0);
    return (3600/sum).toFixed(2);
  }

  function findBalancing(data){
    if(!data.length) return 0
    return findSumTarget(data)*data.length*7*0.8
  }

  const [file, setFile] = useState();

  const handleOnChangeUpload = (e) => {
    setFile(e.target.files[0]);

    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      const text = e.target.result;
      csvFileToArray(text);
    };

    fileReader.readAsText(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const csvHeader = ['id', 'process_name', 'machine_code', 'time_1']
    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setItems(array);
  };

  const handleOnSubmitUpload = (e) => {
    e.preventDefault();

  };


  //Dialog Interaction
  const [openDP, setOpenDP] = useState(false);
  const loadingP = openDP && options.length === 0;
  
  const [openDWC, setOpenDWC] = useState(false);
  const loadingWC = openDWC && options.length === 0;


  //Handle Close Dialog
  const handleCloseP = (value) => {
    setOpenDP(false);
    setSelectedValueP(value);
    setFieldValue('product_id', value.id);
    setOptions([]);
  };

  const handleCloseWC = (value) => {
    setOpenDWC(false);
    setSelectedValueWC(value);
    setFieldValue('work_center_id', value.id);
    setOptions([]);
  };

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

  return (
    <Page>
      <Container>
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
                    {selectedValueP.name}
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
                    {selectedValueWC.name}
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
            handleOnChangeUpload={handleOnChangeUpload}
            handleOnSubmitUpload={handleOnSubmitUpload}
            handleAddRow={handleAddDataOnModal}
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

export default SamplingStudy;