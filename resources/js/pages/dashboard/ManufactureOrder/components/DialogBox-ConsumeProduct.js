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
  DialogTitle,
  Stack
} from '@mui/material'

import API from '../../../../helpers';

export default function DialogBox({ handleClose, open}) {
  const { id } =  useParams()

  // Modal State
  const [openModal, setOpenModal] = React.useState(false);
  const [options, setOptions] =  React.useState([]);
  const loading = openModal && options.length === 0;

  const [temp, setTemp] = React.useState({});

  React.useEffect(() => {
    let active = true

    const changeData = (array) => {  
      if(array.length === 0) return undefined;
  
      const _newArray = array.map(function(item){
        const { product, qty_on_hand } = item;
        return {...product, qty_on_hand: parseInt(qty_on_hand)}
      });
    
      const _filteredArray = _newArray.filter(function(item){
        return (item.product_category_id === 2 || item.product_category_id === 3)
      })
    
      setOptions(_filteredArray);
    } 

    if(!loading){
      return undefined
    }
    
    (async () => {
      API.getInventoryItem(function(res) {
        if(!res) return undefined;
        else changeData(res.data);
      })
    })();

    return () => {
      active = false
    }
  }, [loading])

  const formik = useFormik({
    initialValues: {
      product_feature_id: '',
      qty: 0,
    },
    onSubmit: (values) => {
      let _data = { ...values, manufacture_id: id}
      API.insertManufactureComponent(_data, function(res) {
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
        <DialogTitle>Consume Material</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <Stack spacing={3} sx={{margin: '2em'}}>
            <Autocomplete
              onChange={(event, newValue) => {
                setFieldValue('product_feature_id', newValue.id);
                setFieldValue('facility_id', newValue.facility_id);
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
              getOptionLabel={({ name, id, color, size, brand}) => (`${id} - ${name} ${color} ${size}`)}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField {...params} label="Material" />
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