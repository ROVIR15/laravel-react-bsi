import React, { useState } from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Stack, TextField, Button } from '@mui/material'

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import DataGrid from '../../../components/DataGrid';

function Routing() {
  const [data, setData] = useState(mrows);

  const BOMSchema = Yup.object().shape({
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
      name: '',
      company: '',
    },
    validationSchema: BOMSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    }
  })

  function handleAddRow(){
    setData((prevData) => [...prevData, zeroRow]);
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader
                title="Routing Information"
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
                  autoComplete="name"
                  type="text"
                  label="Routing Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  autoComplete="company"
                  type="text"
                  label="Company"
                  {...getFieldProps('company')}
                  error={Boolean(touched.company && errors.company)}
                  helperText={touched.company && errors.company}
                />
              </CardContent>
            </Card>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader
                title="Work Center Operataion"
              />
              <CardContent>
                <Stack
                  sx={{ width: '100%', mb: 1 }}
                  direction="row"
                  alignItems="flex-start"
                  columnGap={1}                
                >
                  <Button size="small" onClick={handleAddRow}>
                    Add Row
                  </Button>
                </Stack>
                <DataGrid rows={data} />
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
}

export default Routing;

const zeroRow = {
    "id" : '',
    "name" : '',
    "email" : '',
    "dateCreated" : '',
    "lastLogin" : ''
}

const mrows = [
	{
		"id": "8EA9AA23-B7DB-9A34-449C-2D6B1D62F684",
		"name": "Audrey Alvarado",
		"email": "velit.quisque.varius@hotmail.edu",
		"dateCreated": "2022-05-26 20:38:32",
		"lastLogin": "2022-11-27 01:35:40"
	},
	{
		"id": "E7DD1F90-3C1D-B3C5-A804-A97DDE2CFF8B",
		"name": "Hayes Wright",
		"email": "auctor.velit.aliquam@outlook.couk",
		"dateCreated": "2022-06-24 13:46:27",
		"lastLogin": "2023-02-20 15:04:38"
	},
	{
		"id": "666EB7A2-A822-7F7B-FBB6-8B2A2D52799D",
		"name": "Curran Cervantes",
		"email": "eros.nec@hotmail.couk",
		"dateCreated": "2022-10-06 19:09:11",
		"lastLogin": "2022-03-06 05:15:35"
	},
]