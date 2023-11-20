import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, CardHeader, Container, Grid, TextField } from '@mui/material';

import { Form, FormikProvider, useFormik } from 'formik';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Page from '../../../../components/Page';
import Modal from './components/Modal';
import DataGrid from './components/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { enqueueSnackbar } from 'notistack';

// api
import API from '../../../../helpers';
import { useParams } from 'react-router-dom';

function Scrap() {

  const {id} = useParams();
  const formik = useFormik({
    initialValues: {
      document_number: 0,
      date: '2023-07-18'
    },
    onSubmit: (values) => {
      const data = {...values, items};

      try {
        API.insertScrapV2(data, function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        alert(error)
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
      { field: 'sku_id', width: 150, headerName: 'SKU ID', editable: false, visible: 'hide' },
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

  useEffect(() => {
    try {
      API.getAScrapV2(id, function(res){
        if(!res) return;
        if(!res.success) alert('error');

        setValues({
          ...values,
          document_number: res.data.document_number,
          date: res.data.date
        });

        setItems(res.items);
      })
    } catch (error) {
      alert(error);
    }
  }, id)

  return (
    <Page>
      <Container>
        <Modal
          payload={items}
          open={openM}
          handleClose={handleCloseModal}
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
