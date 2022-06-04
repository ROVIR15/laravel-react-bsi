import React, { useMemo, useState } from 'react';
import Page from '../../../components/Page';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Grid,
  Typography,
  Stack,
  Button, 
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { useCountdown } from '../../../helpers/hooks/useCountDown'

//api
import API from '../../../helpers';

//component
import DataGrid from './components/DGWork';
import DialogBox from './components/DBRecord';
import DialogBoxConsumeProduct from './components/DialogBox-ConsumeProduct';
import ShowCounter from './components/ShowCounter';
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
    result: [],
    status: {
      action: 'none',
      time: null
    }
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

    const { operation, status, result } = payload;
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

    setSelectedValueSH({...selectedValueSH, name: operation.work_center.name, result: resultNew, status })
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

  /**------------------------------ END ---------------------------------*/

  /**
   * Dialog Box For Consume Product
   */

  const [openDBConsumeProduct, setDBConsumeProduct] = useState(false);

  const handleOpenDBConsumeProduct = () => {
    setDBConsumeProduct(true);
  }

  const handleCloseDBConsumeProduct = () => {
    setDBConsumeProduct(false);
  }

  /**------------------------------ END ---------------------------------*/

  // handle submit (alternative)
  const handleSubmitAlt = () => {
    localStorage.setItem('data', JSON.stringify({values, result: selectedValueSH.result}));
    navigate(pathname+'/finish');
    setSubmitting(false);
    return
  }

  // handle Action
  const handlePlay = () => {
    const _data = {
      'action_type_id': 1,
      manufacture_operation_id
    } 
    API.insertAction(_data, (res) => {
      if(!res) return undefined;
      if(!res.success) alert('Failed');
      else alert('Success');
    });

    handleUpdate();
  }

  const handlePause = () => {
    const _data = {
      'action_type_id': 2,
      manufacture_operation_id
    } 
    API.insertAction(_data, (res) => {
      if(!res) return undefined;
      if(!res.success) alert('Failed');
      else alert('Success');
    });

    handleUpdate();
  }

  const handleResume = () => {
    const _data = {
      'action_type_id': 3,
      manufacture_operation_id
    } 
    API.insertAction(_data, (res) => {
      if(!res) return undefined;
      if(!res.success) alert('Failed');
      else alert('Success');
    });

    handleUpdate();
  }

  const isStartActive = () => {
    if (selectedValueSH.status.action === 'none') return false;
    else return true;
  }

  const isPauseActive = () => {
    if(selectedValueSH.status.action === 'resume') return false;
    else if (selectedValueSH.status.action === 'start') return false;
    else if (selectedValueSH.status.action === 'none') return true;
    else return true;
  }

  const isResumeActive = () => {
    if(selectedValueSH.status.action === 'start') return true;
    else if (selectedValueSH.status.action === 'resume') return true;
    else if (selectedValueSH.status.action === 'finish') return true;
    else if (selectedValueSH.status.action === 'none') return true;
    else return false;
  }

  const isRecordInactive = () => {
    if(selectedValueSH.status.action === 'pause') return true;
    else if(selectedValueSH.status.action === 'finish') return true;
    else return false;
  }

  const cannotNextStep = () => {
    if(selectedValueSH.status.action === 'pause') return true;
    else if(selectedValueSH.status.action === 'finish') return true;
    else return false;
  }
  
  // TimeCounter

  const handleUpdate = () => {
    API.getAManufactureOperation(manufacture_operation_id, (res) => {
      if(!res) return;
      changeData(res.data);
    })
  }

  const [ days, hours, minutes, seconds ] = useCountdown(manufacture_operation_id, selectedValueSH.status);

  return (
    <Page>
      <Container>
      <Stack sx={{marginBottom: '20px'}} direction="row" justifyContent="space-between">
        <div>
          <Button
            onClick={handleOpenDBConsumeProduct}
          >
            Consume Material
          </Button>
        </div>
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Card >
            <CardHeader
              title="Timer"
            />
            <CardContent>
                <ShowCounter
                  days={days}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
            </CardContent>
          </Card>            
          </Grid>
          <Grid item xs={8}>
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
              <Button
                onClick={handlePlay}
                size="small"
                variant="contained"
                color="primary"
                sx={{ m: 1 }}
                disabled={isStartActive()}
              >
                Play
              </Button>
              <Button
                onClick={handleResume}
                size="small"
                variant="contained"
                color="primary"
                disabled={isResumeActive()}
                sx={{ m: 1 }}
              >
                Resume
              </Button>
              <Button
                onClick={handlePause}
                size="small"
                variant="contained"
                color="warning"
                disabled={isPauseActive()}
                sx={{ m: 1 }}
              >
                Pause
              </Button>
              <Button
                onClick={handleSubmitAlt}
                size="small"
                color="grey"
                variant="contained"
                disabled={cannotNextStep()}
                sx={{ m: 1 }}
              >
                Done
              </Button>
            </CardActions>
          </Card>

        </Grid>

        <DialogBox open={openDBRecord} handleClose={handleCloseDBRecord} />
        <DialogBoxConsumeProduct open={openDBConsumeProduct} handleClose={handleCloseDBConsumeProduct} />
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Button
                size="small"
                variant="contained"
                onClick={handleOpenDBRecord}
                disabled={isRecordInactive()}
                sx={{ m: 1 }}
              >
                Record
              </Button>
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