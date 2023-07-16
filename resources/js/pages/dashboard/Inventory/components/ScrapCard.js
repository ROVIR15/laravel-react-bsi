import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

import {
  Button,
  Card,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Modal,
  MenuItem,
  TextField,
  CardActions,
  CardContent,
  CardHeader
} from '@mui/material';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { useTheme, styled } from '@mui/material/styles';
import API from '../../../../helpers';
import { isNull, isUndefined } from 'lodash';

const list_of_data = [
  {
    id: 1,
    name: 'Facility A'
  },
  {
    id: 2,
    name: 'Facility B'
  },
  {
    id: 3,
    name: 'Facility'
  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  [theme.breakpoints.down('sm')]: { width: 400 }
}));

function getStyles(name, selectedValue, theme) {
  return {
    fontWeight:
      selectedValue !== name
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function Scrap({
  modalOpen,
  onCloseModal,
  id
  // setSelected,
  // selected
}) {
  const Schema = Yup.object().shape({
    product_id: Yup.number().required('Product ID is required'),
    product_feature_id: Yup.number().required('Product Feature is required'),
    from_facility_id: Yup.number().required('From Facility is required'),
    to_facility_id: Yup.number().required('To Facility is required'),
    qty: Yup.number().required('qty is required')
  });

  const formik = useFormik({
    initialValues: {
      product_id: 0,
      product_feature_id: 0,
      from_facility_id: 0,
      to_facility_id: 15,
      qty: 0
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      try {
        API.insertScrap(values, (res) => {
          if(!res) return;
          if(!res.success) throw new Error('Error');
          alert('success');
        })
      } catch (error) {
        alert(error);
      }

      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setValues,
    setFieldValue,
    handleSubmit,
    getFieldProps
  } = formik;

  const [nameOfSelectedProduct, setNameOfSelectedProduct] = useState(
    'Name of product will be mentioned here'
  );
  const [uom, setUom] = useState('pcs');
  const [selected, setSelected] = useState(0);
  const [list, setList] = useState([]);
  const theme = useTheme();

  const [productData, setProductData] = useState(null);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;

    setSelected(value);
    setFieldValue('from_facility_id', value);
  };

  useEffect(() => {
    prepare_data();
    if (!isNull(id)) get_a_product_feature(id);
  }, [id]);

  const get_a_product_feature = (id) => {
    try {
      API.getAProductFeature(id, function (res) {
        if (!res) return;
        if (!res.data) throw new Error('failed to get data');
        else {
          setProductData(res.data[0]);
          setValues({
            ...values,
            product_id: res.data[0].product_id,
            product_feature_id: res.data[0].id
          });
          setNameOfSelectedProduct(res.data[0].item_name);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const prepare_data = () => {
    try {
      API.getFacility('', function (res) {
        if (!res) return;
        if (!res.data) throw new Error('No data received');
        else {
          setList(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Modal open={modalOpen}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <StyledCard
            // sx={{
            //   padding: 4
            // }}
            style={style}
          >
            <CardHeader title="Tambahkan Scrap/AVAL/Waste" />
            <CardContent>
              <Stack direction="column" spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  value={nameOfSelectedProduct}
                  disabled={true}
                />
                <FormControl fullWidth size="small">
                  <InputLabel id="to_facility_if">Dari Bagian</InputLabel>
                  <Select
                    value={selected}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    error={Boolean(touched.to_facility_id && errors.to_facility_id)}
                    helperText={touched.to_facility_id && errors.to_facility_id}
                  >
                    {list?.map(({ id, name }) => (
                      <MenuItem key={id} value={id} style={getStyles(id, selected, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Lot/Serial"
                    name="lot_serial"
                    type="text"
                  />
                  <FormControl size="small" fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel id="to_facility_if">Qty Aval/Waste</InputLabel>
                    <OutlinedInput
                      name="qty"
                      endAdornment={
                        <InputAdornment position="end">
                          {isNull(productData) ? 'none' : productData?.uom}
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      type="number"
                      {...getFieldProps('qty')}
                      error={Boolean(touched.qty && errors.qty)}
                      helperText={touched.qty && errors.qty}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                      Berapa banyak waste/aval
                    </FormHelperText>
                  </FormControl>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions>
              {/* <Stack direction="row" spacing={2}> */}
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ m: 1 }}
                fullWidth
              >
                Save
              </LoadingButton>
              <Button
                fullWidth
                size="large"
                color="grey"
                variant="contained"
                onClick={onCloseModal}
                sx={{ margin: '8px' }}
              >
                Cancel
              </Button>
              {/* </Stack> */}
            </CardActions>
          </StyledCard>
        </Form>
      </FormikProvider>
    </Modal>
  );
}

export default Scrap;
