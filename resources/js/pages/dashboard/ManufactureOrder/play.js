import React, { useMemo, useState } from 'react';
import Page from '../../../components/Page';
import { 
  Box,
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Divider,
  Grid,
  Tab,
  TextField, 
  Typography, 
  Button, 
  CardActions
} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';

//api
import API from '../../../helpers';

//component
import DataGrid from './components/DGWork';
import DialogBox from './components/DBRecord';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

function Labor() {
  const { id, manufacture_operation_id } =  useParams()
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    qty_produced: 0,
    result: []
  });

  const LaborSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    npwp: Yup.string().required('NPWP is required'),
    address: Yup.string().required('Address is required'),
  });

  const resultColumns = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false, hideable: true, width: 30},
    { field: 'party_name', headerName: 'Recorder', editable: true, width: 150},
    { field: 'qty_produced', headerName: 'Qty Produced', editable: false, width: 100 },
    { field: 'created_at', headerName: 'Created at', editable: false, width: 200, align: 'left' },
    { field: 'updated_at', headerName: 'Updated at', editable: false, width: 200, align: 'left' }
  ], []);
  

  const formik = useFormik({
    initialValues: {
      name: '',
      npwp: '',
      address: '',
    },
    validationSchema: LaborSchema,
    onSubmit: (values) => {
      localStorage.setItem('data', {values, result: selectedValueSH.result});
      navigate(pathname+'/finish');
      setSubmitting(false);
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps } = formik;

  React.useEffect(() => {
    API.getAManufactureOperation(manufacture_operation_id, (res) => {
      if(!res) return;
      changeData(res.data);
    })
  }, [manufacture_operation_id])

  const changeData = (payload) => {
    
    if(!payload) return;

    const { operation, result } = payload;
    let resultNew = result.map((item) => {
      return {
        id: item.id,
        party_id: item.party.id,
        party_name: item.party.name,
        qty_produced: item.qty_produced,
        created_at: item.created_at,
        updated_at: item.updated_at
      }
    })

    setSelectedValueSH({...selectedValueSH, name: operation.work_center.name, result: resultNew })
  }

  /**
   * Functional calculation
   */
  const sumOfProducedQty = () => {
    let total = 0;
    selectedValueSH.result.map((item) => {
      total = item.qty_produced + total;
    })
    return total;
  }
  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };


  /**
   * Dialog Box For Record
   */
  const [openDBRecord, setOpenDBRecord] = useState(false);

  const handleOpenDBRecord = () => {
    setOpenDBRecord(true);
  }

  const handleCloseDBRecord = () => {
    setOpenDBRecord(false);
    handleUpdateAll();
  }

  const handleUpdateAll = () => {
    API.getAManufactureOperation(manufacture_operation_id, (res) => {
      if(!res) return;
      changeData(res.data);
    });
  }

  // handle submit (alternative)
  const handleSubmitAlt = () => {
    localStorage.setItem('data', JSON.stringify({values, result: selectedValueSH.result}));
    navigate(pathname+'/finish');
    setSubmitting(false);
    return
  }

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Manufacture Order Information"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <ColumnBox>
                    <Typography variant="h6">
                      {'Work Center'}
                    </Typography>
                    <Typography variant="body1">
                      {selectedValueSH.name}
                    </Typography>
                  </ColumnBox>
                </Grid>
                <Grid item xs={6}>
                  <ColumnBox>
                    <Typography variant="h6">
                      {'Current Quantity'}
                    </Typography>
                    <Typography variant="body1">
                      {selectedValueSH.result.length === 0 ? '0' : sumOfProducedQty()}
                    </Typography>
                  </ColumnBox>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ p:2, display: 'flex', justifyContent: 'end' }}>
              <LoadingButton
                size="small"
                variant="contained"
                onClick={handleOpenDBRecord}
                sx={{ m: 1 }}
              >
                Record
              </LoadingButton>
              <Button
                onClick={handleSubmitAlt}
                size="small"
                color="grey"
                variant="contained"
                sx={{ m: 1 }}
              >
                Done
              </Button>
            </CardActions>
          </Card>

        </Grid>

        <DialogBox open={openDBRecord} handleClose={handleCloseDBRecord} />
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <DataGrid rows={selectedValueSH.result} columns={resultColumns} />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
        </Form>
      </FormikProvider>
      </Container>
    </Page>
  )
}

export default Labor