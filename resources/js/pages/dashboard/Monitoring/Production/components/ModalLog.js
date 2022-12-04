import * as React from 'react';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';
import checkMark from '@iconify/icons-eva/checkmark-outline';

// Components
import { Card, CardContent, CardHeader, IconButton, Modal, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';

import API from '../../../../../helpers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '-webkit-fill-available'
};

const FlexEnd = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end'
}));

export default function BasicModal({ open, handleClose, facility_id=0 }) {
  const ValidatorSchema = Yup.object().shape({
    date: Yup.date().required('Date is Required'),
    log: Yup.string().required('Description is required')
  });

  const formik = useFormik({
    initialValues: {
      date: '',
      log: ''
    },
    validationSchema: ValidatorSchema,
    onSubmit: (values) => {
      try {
        if(!facility_id) throw new Error('must select facility first');
        API.insertProductionLog({...values, facility_id}, function(res){
          if(!res) return;
          if(res.success) alert('success');
          else throw new Error('failed to store log');
        })
      } catch (error) {
        alert('error');
        handleReset();
      }
    }
  });

  const { errors, touched, handleSubmit, handleReset, getFieldProps } = formik;

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={style}>
              <CardHeader title="Catatan Produksi" />
              <CardContent>
                <Stack direction="column" spacing={2}>
                  <TextField
                    type="date"
                    label="Date"
                    sx={{ width: '10em' }}
                    {...getFieldProps('date')}
                    error={Boolean(touched.date && errors.date)}
                    helperText={touched.date && errors.date}
                  />

                  <TextField
                    fullWidth
                    type="text"
                    multiline
                    rows={4}
                    {...getFieldProps('log')}
                    error={Boolean(touched.log && errors.log)}
                    helperText={touched.log && errors.log}
                  />

                  <FlexEnd>
                    <IconButton onClick={handleClose} color="error">
                      <Icon icon={closeCircle} />
                    </IconButton>

                    <IconButton type="submit" color="success">
                      <Icon icon={checkMark} />
                    </IconButton>
                  </FlexEnd>
                </Stack>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Modal>
    </div>
  );
}
