import React, { useEffect, useState } from 'react';
import Page from '../../../../components/Page';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import {
  Paper,
  Box,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  TextField,
  MenuList
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Modal from './components/Modal';

import { isArray } from 'lodash';
//API
import API from '../../../../helpers';

import TableCosting from './components/TableCosting';

function calculateOutput(params) {
  const layer = parseFloat(params.row.expected_output) * parseFloat(params.row.work_days);
  return Math.floor(layer);
}

const columns = [
  { field: 'id', width: 50, headerName: 'ID', editable: false },
  { field: 'facility_name', headerName: 'Line', width: 250, editable: false },
  { field: 'costing_name', headerName: 'Costing', width: 250, editable: false },
  { field: 'po_number', headerName: 'Sales PO Number', width: 300, editable: false },
  { field: 'total_qty', headerName: 'Total Qty', editable: false },
  { field: 'expected_output', headerName: 'Expected Output', editable: true },
  { field: 'work_days', headerName: 'Work Days Output', editable: true },
  {
    field: 'expected_total_output',
    headerName: 'Est. Output',
    editable: false,
    valueGetter: calculateOutput
  }
];

function Goods() {
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
          const ras = res.data.map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            final_price: item.final_price
          }));
          setRows(ras);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Order Budget Planning (Monthly)" />
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
                <TableCosting list={rows} selected={items} placeHolder="" setSelected={setItems} />
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: 2, display: 'flex', justifyContent: 'end' }}>
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
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default Goods;
