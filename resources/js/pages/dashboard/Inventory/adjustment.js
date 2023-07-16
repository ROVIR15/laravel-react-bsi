import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Paper,
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  FormLabel,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled
} from '@mui/material';

import { FormikProvider, Form, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import { LoadingButton } from '@mui/lab';

import DataGrid from './components/DataGrid';
import Modal from './components/Modal';

import API from '../../../helpers';
import { isEmpty } from 'lodash';

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

function StockAdjustment() {
  const formik = useFormik({
    initialValues: {
      to_facility_id: 0,
      est_transfer_date: '',
      description: ''
    },
    onSubmit: (values) => {
      try {
        let _payload = { ...values, items, user_id: user.id };
        API.insertMaterialTransfer(_payload, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed');
          else {
            alert('success');
          }
        });
      } catch (error) {
        alert(error);
      }

      // handleReset();
      // setItems([])
      setSubmitting(false);
    }
  });

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

  useEffect(() => {
    //get facility
    API.getFacility('', (res) => {
      if(!res) return;
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

  //handle filter by bom
  const handleFacility = (event) => {
    setFieldValue('to_facility_id', event.target.value);
  };

  // store material transfer item
  const [items, setItems] = useState([]);

  // handle state select option
  const [options, setOptions] = useState([]);

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

  // columns on data grid
  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'id', editable: false, visible: 'hide' },
      {
        field: 'product_feature_id',
        headerName: 'Product Feature ID',
        editable: false,
        visible: 'hide'
      },
      { field: 'product_id', headerName: 'Product ID', editable: false, visible: 'hide' },
      { field: 'order_item_id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Nama Material', width: 450, editable: false },
      {
        field: 'current_qty',
        headerName: 'Quantity Sistem',
        width: 250,
        type: 'number',
        editable: true,
        flex: 1
      },
      {
        field: 'counted_qty',
        headerName: 'Quantity Aktual',
        width: 250,
        type: 'number',
        editable: true,
        flex: 1
      },
      {
        field: 'satuan',
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

  //handle state open/close dialog box
  const [openSh, setOpenSh] = useState(false);

  return (
    <FormikProvider value={formik}>
      <Modal open={openSh} handleClose={() => setOpenSh(false)} items={items} setItems={setItems} />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Paper elevation={2} style={{ padding: '2em' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Facility</InputLabel>
                <Select
                  // onChange={handleFacility}
                  // value={values.to_facility_id}
                  label="Facility"
                  // error={Boolean(touched.to_facility_id && errors.to_facility_id)}
                  // helperText={touched.to_facility_id && errors.to_facility_id}
                  // sx={{ backgroundColor: '#f5f6fa' }}
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
                  // onChange={handleEstTransferDate}
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
                // autoComplete="est_transfer_date"
                type="date"
                // placeholder="est_transfer_date"
                // {...getFieldProps('est_transfer_date')}
                // error={Boolean(touched.est_transfer_date) && errors.est_transfer_date}
                // helpers={touched.est_transfer_date && errors.est_transfer_date}
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
                onEditRowsModelChange={handleEditComponentRowsModelChange}
                // handleResetRows={handleResetComponentRows}
              />
            </Grid>

            <Grid item xs={12} style={{ marginTop: '2.5em' }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={5}
                // {...getFieldProps('description')}
                // placeholder="deskripsi"
                label="deskripsi/catatan ke gudang"
                // error={Boolean(touched.description) && errors.description}
                // helpers={touched.description && errors.description}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#f5f6fa'
                  }
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={false}
                sx={{ m: 1 }}
              >
                Save
              </LoadingButton>
              <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                Cancel
              </Button>
            </Box>
          </Grid>
        </Paper>
      </Form>
    </FormikProvider>
  );
}

export default StockAdjustment;
