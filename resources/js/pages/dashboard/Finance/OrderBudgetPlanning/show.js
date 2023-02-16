import React, { useEffect, useState } from 'react';
import Page from '../../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  Stack,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment'
//API
import API from '../../../../helpers';

import Modal from './components/Modal'

import TableCosting from './components/TableCosting';
import { useParams } from 'react-router-dom';


const FloatingPaper = styled(Box)(({ theme }) => ({
  padding: '4px 30px',
  bottom: '24px',
  zIndex: '999',
  position: 'fixed',
  boxShadow: 'rgb(99 115 129 / 36%) -12px 12px 32px -4px',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  minWidth: '72rem'
}));

function Goods() {
  const { id } = useParams();

  const GoodsSchema = Yup.object().shape({
    monthYear: Yup.date().required('is required')
  });

  const formik = useFormik({
    initialValues: {
      monthYear: ''
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      const haha = values.monthYear.split('-');
      try {
        let _itemsPreparation = items.map((item) => ({ costing_id: item.id }));
        const payload = {
          month: parseInt(haha[1]),
          year: haha[0],
          items: _itemsPreparation
        };

        try {
          API.insertFinancialOrderBudget(payload, function (res) {
            if (res.success) alert('success');
            else alert('failed');
          });
        } catch (error) {
          alert('error');
        }
      } catch (error) {
        alert('error');
      }

      handleReset();
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleReset,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleMultiSelect = (name, value) => {
    setFieldValue(name, value);
  };

  // to store data of selected costing
  const [items, setItems] = useState([]);

  // store list of costing to be shown on table
  const [rows, setRows] = useState([]);

  useEffect(() => {

    try {
      API.getBOMList((res) => {
        if (!res) return;
        if (!res.data) {
          setRows([]);
        } else {
          let ras = res.data.map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            final_price: item.final_price
          }));
          setRows(ras);
        }
      });

      API.getAFinancialOrderBudget(id, function(res){
        if(!res) return;
        if(!res.data) {
          setItems([]);
        } else {
          setFieldValue('monthYear', moment(`${res?.data?.year}-${res?.data?.month}`).format('YYYY-MM'))
          let _selectedItems = res?.data?.items?.map((item) => ({
            item_id: item?.id,
            id: item?.costing?.id,
            name: item?.costing?.name,
            qty: item?.costing?.qty,
            final_price: item?.costing?.final_price
          }));

          setItems(_selectedItems)
        }
      })

    } catch (error) {
      alert(error);
    }

  }, []);

  const handleUpdate = () => {
    try {
      API.getAFinancialOrderBudget(id, function(res){
        if(!res) return;
        if(!res.data) {
          setItems([]);
        } else {
          setFieldValue('monthYear', moment(`${res?.data?.year}-${res?.data?.month}`).format('YYYY-MM'))
          let _selectedItems = res?.data?.items?.map((item) => ({
            item_id: item?.id,
            id: item?.costing?.id,
            name: item?.costing?.name,
            qty: item?.costing?.qty,
            final_price: item?.costing?.final_price
          }));
  
          setItems(_selectedItems)
        }
      })      
    } catch (error) {
      alert(error)
    }
  }

  //handle modal open and close
  const [openModal, setOpenModal] = useState(false);

  return (
    <Page>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        selected={items}
        setSelected={setItems}
        list={rows}
        update={handleUpdate}
      />
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
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

                      {/* <Grid item xs={12} lg={7}>
                        <Stack direction="row" spacing={2}>
                          <Item>
                            <Typography variant="body2">Total Qty</Typography>
                            <Typography variant="h5"> {fNumber(collected.qty)}</Typography>
                          </Item>
                          <Item>
                            <Typography variant="body2">Total Expected X Revenue</Typography>
                            <Typography variant="h5"> Rp. {fCurrency(collected.money)}</Typography>
                          </Item>
                        </Stack>
                      </Grid> */}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <TableCosting disableChecklist={true} list={items} selected={items} placeHolder="" handleOpenModal={() => setOpenModal(true)}/>
              </Grid>

              <Grid item xs={12}>
                <Box component={Paper}>
                  <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ m: 1 }}
                  >
                    Save
                  </LoadingButton>
                  <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default Goods;
