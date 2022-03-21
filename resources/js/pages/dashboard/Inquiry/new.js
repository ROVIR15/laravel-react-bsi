import React from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import DataGrid from '../../../components/DataGrid';

function Inquiry() {

  const InquirySchema = Yup.object().shape({
    inquiry_id: Yup.string().required('Inquiry References is required'),
    id: Yup.string().email('Email must be a valid email address').required('Email is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_tp: Yup.string().required('Address is required'),
    po_number: Yup.string().required('city is required'),
    po_date: Yup.string().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      sold_to: '',
      ship_tp: '',
      po_number: '',
      po_date: '',
      delivery_date: '',
      valid_to: ''
    },
    validationSchema: InquirySchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Inquiry Information"
          />
          <CardContent>
            <TextField
              fullWidth
              autoComplete="id"
              type="text"
              label="No Inquiry"
              {...getFieldProps('id')}
              error={Boolean(touched.id && errors.id)}
              helperText={touched.id && errors.id}
            />
            <TextField
              fullWidth
              autoComplete="sold_to"
              type="number"
              label="Pembeli"
              {...getFieldProps('sold_to')}
              error={Boolean(touched.sold_to && errors.sold_to)}
              helperText={touched.sold_to && errors.sold_to}
            />
            <TextField
              fullWidth
              autoComplete="ship_to"
              type="number"
              label="Penerima"
              {...getFieldProps('ship_to')}
              error={Boolean(touched.ship_to && errors.ship_to)}
              helperText={touched.ship_to && errors.ship_to}
            />
            <TextField
              fullWidth
              autoComplete="po_number"
              type="number"
              label="No PO"
              {...getFieldProps('po_number')}
              error={Boolean(touched.po_number && errors.po_number)}
              helperText={touched.po_number && errors.po_number}
            />    
            <TextField
              fullWidth
              autoComplete="delivery_date"
              type="date"
              label="Delivery Time"
              {...getFieldProps('po_date')}
              error={Boolean(touched.delivery_date && errors.delivery_date)}
              helperText={touched.delivery_date && errors.delivery_date}
            />            
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Item Overview"
          />
          <CardContent>
            <div style={{display: 'flex'}}>
            <TextField
              fullWidth
              autoComplete="po_date"
              type="date"
              placeholder='po_date'
              label="PO Date"
              {...getFieldProps('po_date')}
              error={Boolean(touched.po_date && errors.po_date)}
              helperText={touched.po_date && errors.po_date}
            />
            <TextField
              fullWidth
              autoComplete="valid_to"
              type="date"
              placeholder='valid_to'
              label="Expired Date"
              {...getFieldProps('valid_to')}
              error={Boolean(touched.valid_to && errors.valid_to)}
              helperText={touched.valid_to && errors.valid_to}
            /> 
            </div>
            <DataGrid />
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
            type="submit"
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

export default Inquiry