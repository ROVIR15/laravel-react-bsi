import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, CardHeader, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';

import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState, useMemo, useCallback } from 'react';
import Page from '../../../../components/Page';
import Modal from './components/Modal';
import DataGrid from './components/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { enqueueSnackbar } from 'notistack';

import useAuth from '../../../../context';

// api
import API from '../../../../helpers';

// function transformData(data) {
//   const transformedData = [];

//   // Group the data by 'cat'
//   const groupedData = data.reduce((acc, obj) => {
//     const { facility_id } = obj;
//     if (!acc[facility_id]) {
//       acc[facility_id] = [];
//     }
//     acc[facility_id].push(obj);
//     return acc;
//   }, {});

//   // Convert the grouped data into the desired format
//   for (const facility_id in groupedData) {
//     transformedData.push({ facility_id: parseInt(facility_id), data: groupedData[facility_id] });
//   }

//   return transformedData;
// }

function Scrap() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      document_number: 0,
      date: '2023-07-18',
      type: 15
    },
    onSubmit: (values) => {
      const data = { ...values, items, user_id: user.id };

      try {
        API.insertScrapV2(data, function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        alert(error);
        enqueueSnackbar('', { variant: 'failedAlert' });
      }

      setSubmitting(false);
      handleReset();
    }
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setValues,
    setFieldValue,
    handleReset,
    getFieldProps
  } = formik;

  // --------------------------------------------------------------------- //
  const [items, setItems] = useState([]);
  const handleAddItems = (values) => {
    setItems(values);
  };

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  /** Column for data grid */
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Qty', editable: true },
      { field: 'unit_measurement', headerName: 'Satuan', editable: true },
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
  /** end column for data grid */

  /** handle delete data  */
  const deleteData = useCallback((id) => () => {
    const rowToDeleteIndex = id;
    setItems((prevItems) => {
      return [...prevItems.slice(0, rowToDeleteIndex), ...prevItems.slice(rowToDeleteIndex + 1)];
    });
  });
  /** end handle delete data */

  /** Handle Reset */
  const handleResetRows = () => {
    setItems([]);
  };
  /** End Handle Reset */

  /** Handle Edit */
  const handleEditRowsModelChange = React.useCallback(
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

        console.log(items);

        // update on field value
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );
  /** end handle edit */

  // --------------------------------------------------------------------- //

  // Modal Props and Handling
  // --------------------------------------------------------------------- //
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);
  // --------------------------------------------------------------------- //

  // Radio Import Activity
  // ----------------------------------------------------------------- //

  const handleRadioTypeCheck = (e) => {
    // skrap
    var selected = parseInt(e.target.value)

    if (selected === 15) {
      setFieldValue('type', 15);
    } 
    else if (selected === 21) {
      // waste
      setFieldValue('type', 21);
    }
    // error
    else {
      enqueueSnackbar('Error', { variant: 'failedAlert' });
    }
    
  };
  // ----------------------------------------------------------------- //

  return (
    <Page>
      <Container>
        <Modal
          payload={items}
          open={openM}
          handleClose={handleCloseModal}
          stype={values.type}
          items={items}
          setItems={setItems}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader title="Scrap Management" />
              <CardContent>
                <Grid container spacing={1} direction="row">
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="date"
                      type="date"
                      label="Date"
                      {...getFieldProps('date')}
                      error={Boolean(touched.date && errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="document_number"
                      label="Nomor Dokumen"
                      {...getFieldProps('document_number')}
                      error={Boolean(touched.document_number && errors.document_number)}
                      helperText={touched.document_number && errors.document_number}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="type">Tipe</FormLabel>
                      <RadioGroup
                        row
                        value={values.type}
                        name="import-activity-check"
                        onChange={handleRadioTypeCheck}
                      >
                        <FormControlLabel value={15} control={<Radio />} label="Skrap" />
                        <FormControlLabel value={21} control={<Radio />} label="Waste" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <DataGrid
                      columns={columns}
                      rows={items}
                      onEditRowsModelChange={handleEditRowsModelChange}
                      handleAddRow={handleOpenModal}
                      addItemActive={true}
                      handleReset={handleResetRows}
                      handleUpdateAllRows={false}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LoadingButton
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      sx={{ m: 1 }}
                    >
                      Save
                    </LoadingButton>
                    <Button size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default Scrap;
