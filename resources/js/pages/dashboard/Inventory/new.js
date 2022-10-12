import React, { useEffect, useState } from 'react'
import Page from '../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Container, 
  Divider,
  Grid, 
  TextField, 
  Typography, 
  Paper, 
  Stack, 
  Button 
} from '@mui/material'
import { styled } from '@mui/material/styles';

// api
import API from '../../../helpers';

// Component
import DialogBoxPF from './components/DBProductFeature';
import DialogBoxF from './components/DBFacility';


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

function Inventory() {

    // Option Inquiry
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loadingSO = openSO && options.length === 0;
  const loadingSH = openSH && options2.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({
    name: '',
    category: '',
    size: '',
    color: ''
  });
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: '',
    type: {
      name: ''
    }
  });

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loadingSO) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getProductNotYetInInventoryItem((res) => {
          if(!res) return
          else setOptions(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSO])

  // Preapre data from facility
  React.useEffect(() => {
    let active = true;

    if (!loadingSH) {
      return undefined;
    }

    setOptions2([]);

    (async () => {
      if (active) {
        API.getFacility((res) => {
          if(!res) return
          else setOptions2(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSH])

  const InventorySchema = Yup.object().shape({
    product_feature_id: Yup.string().required('Nama is required'),
    facility_id: Yup.string().required('Satuan is required'),
    qty_on_hand: Yup.number().required('Berat Kotor is required'),
  });

  const formik = useFormik({
    initialValues: {
      product_feature_id: '',
      facility_id: '',
      qty_on_hand: 0
    },
    onSubmit: (values) => {
      API.insertInventoryItem(values, function(res){
        if(res.success) {
          alert('success');
        }
        else alert('failed');
      })
    }
  });

    // Dialog Box
  const handleClose = (name, value) => {
    if(name === 'product_feature_id') {
      setOpenSO(false)
      setSelectedValueSO(value);
    }
    if(name === 'facility_id') {
      setOpenSH(false)
      setSelectedValueSH(value);
    }
    setFieldValue(name, value.id);
    setOptions([]);
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <Page>
      <Container >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader
                title="Product Information"
              />
              <CardContent>
                <Paper>
                  <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Product </Typography>
                        <Button
                          onClick={() => setOpenSO(true)}
                        >
                          Select
                        </Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">
                          {`${selectedValueSO.name} ${selectedValueSO.size} - ${selectedValueSO.color} `}
                        </Typography>
                        <Typography variant="caption">
                          {`${selectedValueSO.category}`}
                        </Typography>
                      </div>
                      <DialogBoxPF
                        options={options}
                        loading={loadingSO}
                        error={Boolean(touched.product_feature_id && errors.product_feature_id)}
                        helperText={touched.product_feature_id && errors.product_feature_id}
                        selectedValue={values.product_feature_id}
                        open={openSO}
                        onClose={(value) => handleClose('product_feature_id', value)}
                      />
                    </ColumnBox>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Facility </Typography>
                        <Button
                          onClick={() => setOpenSH(true)}
                        >
                          Select
                        </Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">
                          {selectedValueSH.name}
                        </Typography>
                        <Typography variant="caption">
                          {selectedValueSH.type.name}
                        </Typography>
                      </div>
                      <DialogBoxF
                        options={options2}
                        loading={loadingSH}
                        error={Boolean(touched.facility_id && errors.facility_id)}
                        helperText={touched.facility_id && errors.facility_id}
                        selectedValue={values.facility_id}
                        open={openSH}
                        onClose={(value) => handleClose('facility_id', value)}
                      />
                    </ColumnBox>
                  </Stack>
                </Paper>
            </CardContent>
            </Card>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 }, position: 'unset' }}>              
              <CardContent>
                <TextField
                  fullWidth
                  autoComplete="qty_on_hand"
                  type="number"
                  label="Quantity"
                  {...getFieldProps('qty_on_hand')}
                  error={Boolean(touched.qty_on_hand && errors.qty_on_hand)}
                  helperText={touched.qty_on_hand && errors.qty_on_hand}
                />
              </CardContent>
            </Card>
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
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
}

export default Inventory