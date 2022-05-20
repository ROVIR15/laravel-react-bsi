import * as React from 'react';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import {
  Autocomplete,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from '@mui/material'

import API from '../../../../helpers';

export default function DialogBox({ handleClose, open}) {
  const { manufacture_operation_id } =  useParams()

  // Modal State
  const [openModal, setOpenModal] = React.useState(false);
  const [options, setOptions] =  React.useState([]);
  const loading = openModal && options.length === 0;

  const [temp, setTemp] = React.useState({});

  React.useEffect(() => {
    let active = true

    if(!loading){
      return undefined
    }
    
    (async () => {
      API.getLabor(function(res) {
        if(!res) return undefined;
        else setOptions(res);
      })
    })();

    return () => {
      active = false
    }
  }, [loading])

  const formik = useFormik({
    initialValues: {
      labor_id: '',
      qty: 0,
    },
    onSubmit: (values) => {
      let _data = { party_id: values.labor_id, manufacture_operation_id, qty_produced: values.qty}
      API.insertMOResult(_data, function(res) {
        if(res.success) alert('success');
        else alert('failed');
      })
      handleClose()
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle>Record Data</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <Stack spacing={3} sx={{margin: '2em'}}>
            <Autocomplete
              onChange={(event, newValue) => {
                setFieldValue('labor_id', newValue.id);
                setTemp(newValue);
              }}
              open={openModal}
              onOpen={() => {
                setOpenModal(true);
              }}
              onClose={() => {
                setOptions([]);
                setOpenModal(false);
              }}
              getOptionLabel={({ name, id}) => (`${id} - ${name}`)}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField {...params} label="Party" />
              )}
            />
            <TextField
              autoFocus
              margin="dense"
              id="qty"
              label="Qty"
              type="number"
              variant="standard"
              {...getFieldProps('qty')}
              error={Boolean(touched.qty && errors.qty)}
              helperText={touched.qty && errors.qty}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button 
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button 
            type="grey"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </Form>
    </FormikProvider>
  );
}