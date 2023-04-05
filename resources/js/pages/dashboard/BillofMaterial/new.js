import React, { useState, useMemo, useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Paper, Stack, TextField } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useFormik, Form, FormikProvider } from 'formik';
import { isEmpty, isUndefined } from 'lodash';

import API from '../../../helpers';
import { optionProductFeature, optionProductFeatureV3 } from '../../../helpers/data';

import Modal from './components/Modal';
import ModalDuplicateBOM from './duplicate/ModalD';
import DataGrid from './components/DataGrid';

import { styled } from '@mui/material/styles';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function totalConsumption(params) {
  return (parseFloat(params.row.allowance) / 100 + 1) * parseFloat(params.row.consumption);
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#f3f3f3'
  }
}));

function BillOfMaterial() {
  //Modal Component of BOM
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  // storing data of material list of a bom
  const [component, setComponent] = useState([]);

  //store value of options for modal
  const [options, setOptions] = useState([]);

  //store value of options for autocomplete
  const [optionsAC, setOptionsAC] = useState([]);

  // handle autocomplete is active or not;
  const [open, setOpen] = useState(false);
  const loading = open && isEmpty(options) && isEmpty(optionsAC);

  // formik
  const formik = useFormik({
    initialValues: {
      product_feature_id: null,
      unit_measurement: '',
      category: ''
    },
    // validationSchema: BOMSchema,
    onSubmit: (values) => {
      const { product_feature_id } = values;
      API.insertBOM_alt({ product_feature_id, items: component }, (res) => {
        if (!res.success) {
          alert('Failed');
        } else {
          alert('Success');
        }
      });
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
    getFieldProps,
    setFieldValue
  } = formik;

  React.useEffect(() => {
    let active = true;

    try {
        API.getProductFeature((res) => {
          if (!res) return;
          if (!res.data) {
            setOptions([]);
          } else {
            const data = optionProductFeature(res.data);
            const dataAC = optionProductFeatureV3(res.data);
            setOptions(data);
            setOptionsAC(dataAC);
          }
        });

      API.getBOM_alt('', (res) => {
        if (!res) return;
        if (!res.data) {
          setOptionBOMData([]);
        } else {
          setOptionBOMData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [loading]);

  // file
  const [file, setFile] = useState(null);

  // columns for material
  const goodsColumns = useMemo(
    () => [
      { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
      { field: 'item_name', width: 300, headerName: 'Name', editable: false },
      { field: 'consumption', headerName: 'Konsumsi', type: 'number', editable: true },
      { field: 'allowance', headerName: 'Allowance %', type: 'number', editable: true },
      { field: 'unit_price', headerName: 'Harga', type: 'number', editable: true },
      { field: 'qty', headerName: 'Total Konsumsi', editable: true, valueGetter: totalConsumption },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteDataComponent(params.id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteDataComponent]
  );

  //delete a row on data component
  const deleteDataComponent = React.useCallback((id) => () => {
    setComponent((prevComponent) => {
      return prevComponent.filter((x) => x.id !== id);
    });
  });

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
        setComponent((prevItems) => {
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

  // handle reset data in rows
  const handleResetComponentRows = () => {
    setComponent([]);
  };

  // handle data change on autocomplete
  const handleAutoComplete = (data, full) => {
    if (isUndefined(full)) return;
    const result = options.find((obj) => obj.id === data);

    if (isEmpty(result)) return;
    setFieldValue('choosen', full);
    setFieldValue('product_feature_id', result.id);
    setFieldValue('unit_measurement', result.satuan);
    let cat = `${result.category} ${result.sub_category}`;
    setFieldValue('category', cat);
    setFile(result.imageUrl);
  };

  //Modal Duplicate of BOM
  const [optionBOMData, setOptionBOMData] = useState([]);

  const [openDuplicate, setOpenDuplicate] = React.useState(false);
  const handleOpenModalDuplicate = () => setOpenDuplicate(true);
  const handleCloseModalDuplicate = () => setOpenDuplicate(false);

  function ShowImageWhenItsUploaded() {
    if (file) {
      return (
        <Paper sx={{ padding: 2, height: '100%', backgroundColor: '#f3f3f3' }}>
          <img src={file} alt="Image" />
        </Paper>
      );
    } else {
      return <Paper sx={{ padding: 2, height: '100%', backgroundColor: '#f3f3f3' }}></Paper>;
    }
  }

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Modal
            payload={[]}
            open={openM}
            options={options}
            handleClose={handleCloseModal}
            items={component}
            setItems={setComponent}
          />
          <ModalDuplicateBOM
            payload={[]}
            open={openDuplicate}
            options={optionBOMData}
            handleClose={handleCloseModalDuplicate}
            setItems={setComponent}
          />

          <Card sx={{ paddingTop: '48px', paddingBottom: '16px', paddingX: '16px' }}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4}>
                <ShowImageWhenItsUploaded />
              </Grid>

              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <AutoComplete
                      fullWidth
                      autoComplete="product_feature_id"
                      type="text"
                      label="Product Variant Id"
                      error={Boolean(touched.product_feature_id && errors.product_feature_id)}
                      helperText={touched.product_feature_id && errors.product_feature_id}
                      options={optionsAC}
                      setOpen={setOpen}
                      loading={loading}
                      changeData={handleAutoComplete}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      disabled
                      fullWidth
                      autoComplete="unit_measurement"
                      type="text"
                      label="Satuan"
                      {...getFieldProps('unit_measurement')}
                      error={Boolean(touched.unit_measurement && errors.unit_measurement)}
                      helperText={touched.unit_measurement && errors.unit_measurement}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      disabled
                      fullWidth
                      autoComplete="category"
                      type="text"
                      label="Kategori"
                      {...getFieldProps('category')}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DataGrid
                      columns={goodsColumns}
                      rows={component}
                      handleAddRow={handleOpenModal}
                      onEditRowsModelChange={handleEditComponentRowsModelChange}
                      handleResetRows={handleResetComponentRows}
                      handleDuplicate={handleOpenModalDuplicate}
                      duplicateMaterial={true}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: '32px' }}>
                <Paper
                  sx={{ backgroundColor: '#f3f3f3', display: 'flex', justifyContent: 'flex-end' }}
                >
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
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default BillOfMaterial;
