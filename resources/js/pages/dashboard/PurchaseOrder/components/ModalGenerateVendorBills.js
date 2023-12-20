import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';

import { Icon } from '@iconify/react';
import SquareOutline from '@iconify/icons-eva/square-outline';
import CheckSquareOutline from '@iconify/icons-eva/checkmark-square-2-outline';

//
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import useAuth from '../../../../context';

// Components
import API from '../../../../helpers';

import Table from '../../Shipment/Incoming/components/Table';
import { _orderItem } from '../../../../helpers/data';
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import closeCircle from '@iconify/icons-eva/close-outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({ order_id, open, handleClose }) {
  const { user } = useAuth();

  const ValidationSchema = Yup.object().shape({
    invoice_date: Yup.date().required('Tanggal Penerbitan Invoice'),
    due_date: Yup.number().required('Tenggat Waktu Pembayaran')
  });

  const formik = useFormik({
    initialValues: {
      invoice_date: '',
      due_date: 0
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      const payload = { order_id, user_id: user.id, info: { ...values } };
      try {
        API.postVendorBills(payload, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed');
          else alert('done');
        });
      } catch (error) {
        alert(error);
      }

      handleReset();
      setSubmitting(false);
      handleClose();
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    handleReset
  } = formik;

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" justifyContent="space-between">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Lengkapi Informasi Tagihan Supplier
              </Typography>
              <IconButton onClick={handleClose} color="error">
                <Icon icon={closeCircle} />
              </IconButton>
            </Stack>

            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
                style={{ margin: 'none' }}
              >
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      autoComplete="invoice_date"
                      type="date"
                      placeholder="invoice_date"
                      {...getFieldProps('invoice_date')}
                      error={Boolean(touched.invoice_date && errors.invoice_date)}
                      helperText={touched.invoice_date && errors.invoice_date}
                    />
                    <TextField
                      fullWidth
                      autoComplete="due_date"
                      type="number"
                      placeholder="due_date"
                      {...getFieldProps('due_date')}
                      error={Boolean(touched.due_date && errors.due_date)}
                      helperText={touched.due_date && errors.due_date}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">Hari</InputAdornment>
                      }}
                    />
                  </Stack>
                  <LoadingButton
                    size="large"
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ m: 1 }}
                  >
                    Save
                  </LoadingButton>
                  <Button
                    size="large"
                    fullWidth
                    color="grey"
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Form>
            </FormikProvider>
          </Stack>
        </Card>
      </Modal>
    </div>
  );
}
