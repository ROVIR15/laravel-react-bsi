import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  FormControlLabel,
  FormLabel,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  MenuItem,
  styled,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { FormikProvider, Form, useFormik } from 'formik';

import API from '../../../../helpers';
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';

import { Icon } from '@iconify/react';
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { isEmpty, isUndefined } from 'lodash';
import { enqueueSnackbar } from 'notistack';

import moment from 'moment';
import useAuth from '../../../../context';

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

function MaterialTransfer() {
  const { user } = useAuth();

  const pages = !isEmpty(user) ? user?.pages : [];

  const disableSeeRequest = pages.some(function (item) {
    return item.pages_id === 12;
  });

  const formik = useFormik({
    initialValues: {
      to_facility_id: 0,
      from_facility_id: 0,
      est_transfer_date: '',
      description: ''
    },
    onSubmit: (values) => {
      try {
        let _payload = { ...values, items, user_id: user.id };
        API.insertMaterialTransfer(_payload, function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }

      // handleReset();
      // setItems([])
      setSubmitting(false);
    }
  });

  useEffect(() => {
    //get facility
    API.getFacility('', (res) => {
      if (isEmpty(res.data)) {
        setOptions([]);
      } else {
        let a = res.data.map(function (item) {
          return {
            id: item.id,
            name: item.name,
            facility_type: item.type.name
          };
        });
        setOptions(a);
      }
    });
  }, []);

  //handle state open/close dialog box
  const [openSh, setOpenSh] = useState(false);

  //handle state of loading on get items
  const [loadingSh, setLoadingSh] = useState(false);

  //hadnle state for store material item
  const [optionItems, setOptionItems] = useState([]);

  // handle state select option
  const [options, setOptions] = useState([]);

  // store material transfer item
  const [items, setItems] = useState([]);

  // handle state est_transfer_date
  const [disableForm, setDisableForm] = useState(true);
  const handleEstTransferDate = (event) => {
    const {
      target: { value }
    } = event;
    if (isUndefined(value) || isEmpty(value)) return;
    if (value) {
      setDisableForm(true);
      // setFieldValue('est_transfer_date', moment().format('YYYY-MM-DD'));
    } else {
      setDisableForm(false);
      setFieldValue('est_transfer_date', null);
    }
  };

  //handle filter by bom
  const handleFacility = (event) => {
    const {
      target: { name, value }
    } = event;
    console.log(`the ${name} field is being edited by the user`);
    setFieldValue(name, event.target.value);
  };

  // columns on data grid
  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'id', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Nama Material', width: 450, editable: false },
      { field: 'qty', headerName: 'Quantity', type: 'number', editable: true, flex: 1 },
      {
        field: 'unit_measurement',
        type: 'number',
        headerName: 'Satuan',
        editable: false,
        flex: 1
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteData(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteData]
  );

  //handle deletion data from datagrid
  const deleteData = React.useCallback((id) => () => {
    setItems((prevItems) => {
      const rowToDeleteIndex = id;
      return [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];
    });
  });

  const handleSaveAndConfirmation = () => {
    try {
      let _payload = { ...values, items, user_id: user.id };
      API.postMaterialTransferSupermarket(_payload, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('failed');
        else {
          alert('success');
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  // formik
  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleReset,
    setFieldValue,
    setValues,
    getFieldProps
  } = formik;

  console.log(disableSeeRequest, values.from_facility_id);

  /**
   * Handling Data Grid for a Component BOM
   */

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // handle edit compoennt rows change
  const handleEditComponentRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setItems((prevItems) => {
          const itemToUpdateIndex = parseInt(editedIds[0]);

          return prevItems.map((row, index) => {
            if (row.id === parseInt(itemToUpdateIndex)) {
              if (editRowData[editedColumnName].value > row.current_stock) {
                alert('You trying to do something wrong! please check your input');
                return row;
              }

              return { ...row, [editedColumnName]: editRowData[editedColumnName].value };
            } else {
              return row;
            }
          });
        });
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  return (
    <FormikProvider value={formik}>
      <Modal
        open={openSh}
        handleClose={() => setOpenSh(false)}
        items={items}
        setItems={setItems}
        params={values.from_facility_id}
      />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Dari Fasilitas</InputLabel>
                  <Select
                    onChange={handleFacility}
                    value={values.from_facility_id}
                    label="Facility"
                    name="from_facility_id"
                    error={Boolean(touched.from_facility_id && errors.from_facility_id)}
                    helperText={touched.from_facility_id && errors.from_facility_id}
                    sx={{ backgroundColor: '#f5f6fa' }}
                  >
                    {options.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Ke Fasilitas</InputLabel>
                  <Select
                    onChange={handleFacility}
                    value={values.to_facility_id}
                    name="to_facility_id"
                    label="Facility"
                    error={Boolean(touched.to_facility_id && errors.to_facility_id)}
                    helperText={touched.to_facility_id && errors.to_facility_id}
                    sx={{ backgroundColor: '#f5f6fa' }}
                  >
                    {options.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl>
                  <FormLabel>Estimasi Kebutuhan</FormLabel>
                  <RadioGroup
                    row
                    onChange={handleEstTransferDate}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#f5f6fa',
                      '.&MuiFormControlLabel-root': {
                        paddingLeft: '4px',
                        paddingRight: '4px'
                      }
                    }}
                  >
                    <FormControlLabel value={true} control={<Radio />} label="Kirim Hari Ini" />
                    <FormControlLabel value={false} control={<Radio />} label="Hari Berbeda" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoComplete="est_transfer_date"
                  type="date"
                  placeholder="est_transfer_date"
                  {...getFieldProps('est_transfer_date')}
                  error={Boolean(touched.est_transfer_date) && errors.est_transfer_date}
                  helpers={touched.est_transfer_date && errors.est_transfer_date}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#f5f6fa'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <GridData>
                  <Typography variant="h6">Material Item</Typography>
                  <IconButton
                    onClick={() => setOpenSh(true)}
                    sx={{
                      height: '36px',
                      width: '36px',
                      backgroundColor: 'rgb(255, 255, 255)',
                      color: 'rgb(54, 179, 126)'
                    }}
                  >
                    <Icon icon={plusSquare} />
                  </IconButton>
                </GridData>

                <DataGrid
                  columns={columns}
                  rows={items}
                  onRowModesModelChange={handleEditComponentRowsModelChange}
                  // handleResetRows={handleResetComponentRows}
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: '2.5em' }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={5}
                  {...getFieldProps('description')}
                  placeholder="deskripsi"
                  label="deskripsi/catatan ke gudang"
                  error={Boolean(touched.description) && errors.description}
                  helpers={touched.description && errors.description}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#f5f6fa'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardContent>
            <Stack direction="column">
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ m: 1 }}
              >
                Save
              </LoadingButton>
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{ m: 1 }}
                onClick={handleSaveAndConfirmation}
                disabled={disableSeeRequest && !(values.from_facility_id === 20)}
              >
                Save and Transfer
              </Button>

              <Button fullWidth size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                Cancel
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}

export default MaterialTransfer;
