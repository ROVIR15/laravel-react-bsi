import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Table from './components/Table';

import API from '../../../helpers';
import { isArray, isUndefined } from 'lodash';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [listOfPages, setListOfPages] = useState([]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('First name required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      try {
        API.insertPages(values, function (res) {
          if (!res.success) throw new Error('failed to store new pages');
          else {
            alert('done');
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  });

  useEffect(() => {
    try {
      API.getPages(function (res) {
        if (isUndefined(res)) return;
        if (!isArray(res)) throw new Error('empty');
        else {
          setListOfPages(res);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const { errors, touched, values, handleSubmit, setValues, getFieldProps } = formik;

  console.log(values);
  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField fullWidth label="Pages Name" {...getFieldProps('name')} />
            </Stack>
            <TextField
              fullWidth
              autoComplete="description"
              type="text"
              label="Description"
              {...getFieldProps('description')}
            />
            <Button fullWidth size="large" type="submit" variant="contained">
              Insert
            </Button>
          </Stack>
        </Form>
      </FormikProvider>

      <Table list={listOfPages} />
    </div>
  );
}
