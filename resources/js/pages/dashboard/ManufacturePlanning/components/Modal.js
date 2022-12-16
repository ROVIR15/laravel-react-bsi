import * as React from 'react';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Autocomplete,
  Button,
  CardActions,
  Grid,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

import { useFormik, Form, FormikProvider } from 'formik';

// Components
import API from '../../../../helpers';

import { isNull, isArray, isEmpty, isString, isUndefined } from 'lodash';
import Table from './Table';
import { useLocation, useParams } from 'react-router-dom';
import { isEditCondition } from '../../../../helpers/data';

import { IconButton, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import closeCircle from '@iconify/icons-eva/close-outline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  p: 4
};

export default function BasicModal({
  order_id,
  onAddItems,
  update,
  open,
  options,
  handleClose,
  selected,
  setSelected
}) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [value, setValue] = React.useState([]);
  const loading = openX && options.length === 0;
  const [openX, setOpenX] = React.useState(false);

  const GoodsSchema = Yup.object().shape({
    facility_id: Yup.number().min(1, 'The minimum is one').required('Facility is required'),
    costing_id: Yup.number().min(1, 'The minimum amount is one').required('is required'),
    selectedItem: Yup.object().required('You Fucked up')
  });

  //Formik
  const formik = useFormik({
    initialValues: {
      facility_id: 0,
      costing_id: 0,
      selectedItem: {}
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      let { selectedItem, facility_id, costing_id, facility_name, costing_name } = values;
      let payload = { ...selectedItem, facility_id, costing_id };
      if (isEditCondition(pathname.split('/'), id)) {
        if (!isUndefined(values?.id)) {
          let {
            costing_name,
            facility_name,
            po_number,
            total_qty,
            expected_output,
            work_days,
            total_plan_amount,
            total_plan_qty,
            id,
            ...rest
          } = selectedItem;
          try {
            let aa = { ...rest, bom_id: costing_id, facility_id };
            API.updateManufacturePlanningItems(values.id, aa, function (res) {
              if (res.success) alert('success');
              else throw new Error('failed');
            });
          } catch (error) {
            alert(error);
          }
        } else {
          try {
            API.setManufacturePlanningItems(payload, function (res) {
              if (!res.success) throw new Error('Failed');
              else alert('success');
            });
          } catch (error) {
            alert(error);
          }
        }
      } else {
        let _p = {...payload, facility_name, costing_name}
        onAddItems(_p);
      }

      handleClose();
      handleReset();
      setItems([]);
      setSelected(null);
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleReset,
    setValues,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleSelectedItems = (value) => {
    setFieldValue('selectedItem', value);
  };

  const handleAutoComplete = (value) => {
    if (isString(value)) {
      setFieldValue('costing_id', value.split('-')[0]);
      setFieldValue('costing_name', value);
    }
  };

  //Line Option
  const [optionsLine, setOptionsLine] = React.useState([]);
  const loadingLine = optionsLine.length === 0;

  //Costing Option
  const [optionsCosting, setOptionsCosting] = React.useState([]);
  const loadingCosting = optionsCosting.length === 0;

  React.useEffect(() => {
    API.getSalesOrder('', (res) => {
      if (!res) return;
      if (!res.data) {
        setValue([]);
      } else {
        const data = res.data.map(function (item) {
          return {
            id: item?.id,
            order_id: item?.order_id,
            po_number: item?.po_number,
            sold_to: item?.sold_to,
            total_qty: item?.sum[0]?.total_qty,
            total_money: item?.sum[0]?.total_money
          };
        });
        setValue(data);
      }
    });
  }, [order_id]);

  React.useEffect(() => {
    let active = true;

    if (!loadingLine) {
      return undefined;
    }

    if (optionsLine.length > 0 || optionsLine.length != 0) return;
    else {
      try {
        API.getFacility('?type=line-sewing', function (res) {
          setOptionsLine(res.data);
        });
      } catch (error) {
        alert('error');
      }
    }

    return () => {
      active = false;
    };
  }, [loadingLine]);

  React.useEffect(() => {
    let active = true;

    if (!loadingCosting) {
      return undefined;
    }

    if (optionsCosting.length > 0 || optionsCosting.length != 0) return;
    else {
      try {
        API.getCostingList(function (res) {
          if (!res.length) return;
          else {
            let _data = res.map(function (item) {
              return {
                id: item?.id,
                name: item?.name
              };
            });
            setOptionsCosting(_data);
          }
        });
      } catch (error) {
        alert('error');
      }
    }

    return () => {
      active = false;
    };
  }, [loadingCosting]);

  React.useEffect(() => {
    if (isEmpty(selected)) return;
    else {
      const { id, bom_id, facility_id, facility_name, ...rest } = selected;
      setFieldValue('id', id);
      setFieldValue('costing_id', bom_id);
      setFieldValue('facility_id', facility_id);
      setFieldValue('selectedItem', rest);
    }
  }, [selected]);

  React.useEffect(() => {
    if (isEmpty(selected)) return;
    else {
      const { id, bom_id, facility_id, facility_name, ...rest } = selected;
      setFieldValue('id', id);
      setFieldValue('costing_id', bom_id);
      setFieldValue('facility_id', facility_id);
      setFieldValue('selectedItem', rest);
    }
  }, []);

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
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Add New Items
                    </Typography>
                    <IconButton onClick={handleClose} color="error">
                      <Icon icon={closeCircle} />
                    </IconButton>
                  </Stack>
                </Grid>

                <Grid item xs={6}>
                  <Select
                    size="small"
                    fullWidth
                    autoComplete="Line"
                    value={values.facility_id}
                    onChange={(event) => {
                      let line = optionsLine.filter((value) => value.id === event.target.value);
                      setFieldValue('facility_name', line[0].name);
                      setFieldValue('facility_id', event.target.value);
                    }}
                    error={Boolean(touched.facility_id && errors.facility_id)}
                    helperText={touched.facility_id && errors.facility_id}
                    sx={{ height: 1 }}
                    autoFocus
                  >
                    {!isArray(optionsLine)
                      ? 'Loading...'
                      : optionsLine.map(function (x) {
                          return <MenuItem value={x.id}>{x.name}</MenuItem>;
                        })}
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    size="small"
                    disablePortal
                    onInputChange={(event, newInputValue) => {
                      handleAutoComplete(newInputValue);
                    }}
                    options={optionsCosting}
                    isOptionEqualToValue={(option, value) => {
                      return option.id === value;
                    }}
                    getOptionLabel={(option) => `${option.id}-${option.name}`}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Table
                    list={value}
                    selected={values.selectedItem}
                    setSelected={handleSelectedItems}
                    update={update}
                  />
                </Grid>
              </Grid>

              <CardActions sx={{ justifyContent: 'end' }}>
                <LoadingButton
                  size="small"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ m: 1 }}
                >
                  Save
                </LoadingButton>
                <Button size="medium" color="grey" variant="contained" sx={{ m: 1 }}>
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Form>
        </FormikProvider>
      </Modal>
    </div>
  );
}
