import React, { useEffect, useState } from 'react';
import {
  FormControlLabel,
  FormLabel,
  FormControl,
  IconButton,
  InputLabel,
  Typography,
  Radio,
  RadioGroup,
  Select,
  TextField,
  MenuItem
} from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { FormikProvider, Form, useFormik } from 'formik';

import API from '../../../../helpers';
import Modal from './components/Modal';

import { Icon } from '@iconify/react';
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import { isEmpty } from 'lodash';
import moment from 'moment';

function MaterialTransfer() {
  const formik = useFormik({
    initialValues: {
      to_facility_id: 0,
      est_transfer_date: '',
      description: ''
    },
    onSubmit: (values) => {
      try {
        console.log('a');
      } catch (error) {
        alert(error);
      }
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
    console.log(value)
    if (value) {
      setDisableForm(true);
      setFieldValue('est_transfer_date', moment().format('YYYY-MM-DD'));
    } else {
      setDisableForm(false);
      setFieldValue('est_transfer_date', null);
    }
  };

  //handle filter by bom
  const handleFacility = (event) => {
    setFieldValue('to_facility_id', event.target.value);
  }

  // columns on data grid
  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'id', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Nama Material', width: 300, editable: false },
      { field: 'qty', headerName: 'Quantity', type: 'number', editable: false, flex: 1 },
      {
        field: 'unit_measurement',
        type: 'Satuan',
        headerName: 'Unit Price',
        editable: false,
        flex: 1
      },
      { field: 'total', type: 'number', headerName: 'Total', editable: false, flex: 1 },
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

  // formik
  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setFieldValue,
    setValues,
    getFieldProps
  } = formik;

  console.log(values)
  return (
    <div>
      <Modal open={openSh} handleClose={() => setOpenSh(false)} items={items} setItems={setItems} />
      <FormControl fullWidth>
        <InputLabel>Facility</InputLabel>
        <Select
          onChange={handleFacility}
          value={values.to_facility_id}
          label="Facility"
          error={Boolean(touched.to_facility_id && errors.to_facility_id)}
          helperText={touched.to_facility_id && errors.to_facility_id}
        >
          {options.map((item) => (
            <MenuItem value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Estimasi Kebutuhan</FormLabel>
        <RadioGroup row onChange={handleEstTransferDate}>
          <FormControlLabel value={true} control={<Radio />} label="Kirim Hari Ini" />
          <FormControlLabel value={false} control={<Radio />} label="Hari Berbeda" />
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        autoComplete="est_transfer_date"
        type="date"
        placeholder="est_transfer_date"
        {...getFieldProps('est_transfer_date')}
        error={Boolean(touched.est_transfer_date) && errors.est_transfer_date}
        helpers={touched.est_transfer_date && errors.est_transfer_date}
      />

      <>
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
      </>

      <TextField
        multiline
        minRows={2}
        maxRows={5}
        {...getFieldProps('description')}
        placeholder="deskripsi"
        label="deskripsi/catatan ke gudang"
        error={Boolean(touched.description) && errors.description}
        helpers={touched.description && errors.description}
      />
    </div>
  );
}

export default MaterialTransfer;
