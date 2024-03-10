import React, { useState, useMemo, useEffect } from 'react';
import AutoComplete from './components/AutoComplete';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useFormik, Form, FormikProvider } from 'formik';
import { isEmpty, isUndefined, update, isNull } from 'lodash';

import API from '../../../helpers';
import { optionProductFeature, optionProductFeatureV3 } from '../../../helpers/data';

import Modal from './components/Modal';
import DataGrid from './components/DataGrid';

import { styled } from '@mui/material/styles';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { useParams, useItems } from 'react-router-dom';
import quartersToYears from 'date-fns/quartersToYears/index';

function totalConsumption(params, qty) {
  return (parseFloat(params.row.allowance) / 100 + 1) * parseFloat(params.row.consumption) * qty;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#f3f3f3'
  }
}));

export function bomitem_data_alt(array, qty = 1) {
  if (isEmpty(array)) return;
  let arranged = array.map((x) => {
    const { id, consumption, allowance, unit_price, bom_id, product_feature } = x;

    let item_name = `${product_feature?.product?.goods?.name} - ${product_feature?.color}`;

    return {
      id,
      product_feature: product_feature?.id,
      product_id: product_feature?.product?.id,
      item_name,
      bom_id,
      consumption: parseFloat(consumption).toFixed(5),
      qty: parseFloat(consumption) * qty,
      allowance: parseFloat(allowance).toFixed(0),
      unit_price: parseFloat(unit_price).toFixed(2)
    };
  });

  return arranged;
}

function BillofMaterial() {
  function padStartWithZero(number) {
    if (isNull(number)) return '0000';
    return number?.toString().padStart(4, '0');
  }

  // param
  const { id } = useParams();

  //Modal Component of BOM
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  // storing data of material list of a bom
  const [component, setComponent] = useState([]);

  // reconcile data storage
  const [reconcile, setReconcile] = useState({});

  // export document data storage
  const [exportLicense, setExportLicense] = useState({});

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
      choosen: '',
      product_feature_id: null,
      unit_measurement: '',
      category: '',
      qty: 1
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
    setFieldValue,
    setValues
  } = formik;

  React.useEffect(() => {
    handleUpdate();
  }, [id]);

  const handleUpdate = () => {
    try {
      API.getABOMV2_alt(id, function (res) {
        if (!res) return;
        if (!res.data) return;
        else {
          let item = `${res.data?.product?.id},  ${res.data?.product?.goods?.name}`;

          setValues({
            choosen: item,
            unit_measurement: `${res.data?.qty} ${res.data?.product?.goods?.satuan}`,
            qty: res.data?.qty,
            category: 'Finished Goods'
          });

          setFile(res.data?.product?.goods?.imageUrl);

          if (isEmpty(res?.items)) return;
          // let bom_item = bomitem_data_alt(res.data?.items, res.data?.qty);
          setComponent(res.items);

          setReconcile(res.reconcile);

          setExportLicense(res.export_license);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  // file
  const [file, setFile] = useState(null);

  // columns for material
  const goodsColumns = useMemo(
    () => [
      { field: 'sku_id', headerName: 'SKU ID', width: 200, editable: false, visible: 'hide' },
      { field: 'item_serial_number', width: 150, headerName: 'Nomor Seri Barang', editable: false },
      { field: 'document_number', width: 150, headerName: 'No. Dokumen', editable: false },
      { field: 'bl_number', width: 150, headerName: 'Bill of Lading', editable: false },
      { field: 'pl_number', width: 150, headerName: 'Packing List', editable: false },
      { field: 'item_name', width: 300, headerName: 'Nama Barang', editable: false },
      { field: 'consumption', headerName: 'Konsumsi', type: 'number', editable: false },
      { field: 'unit_measurement', headerName: 'Satuan', editable: false },
      { field: 'order_qty', headerName: 'Total Dipesan', width: 200, editable: false },
      {
        field: 'consumed_material_qty',
        headerName: 'Total Keluar Gudang',
        width: 200,
        editable: false
      },
      { field: 'available_qty', headerName: 'Tersisa di Gudang', width: 200, editable: false },
      { field: 'scrap_conversion', headerName: 'Konversi ke KG', width: 200, type: 'number', editable: false },
      { field: 'scrap', headerName: 'Waste/Scrap', width: 200, editable: false },
      { field: 'converted_scrap', headerName: 'Waste/Scrap kg', width: 300, editable: false }
    ],
    [deleteDataComponent]
  );

  //delete a row on data component
  const deleteDataComponent = React.useCallback((id) => () => {
    try {
      alert('You will delete this item?');

      API.deleteABOMItem_alt(id);
    } catch (error) {}
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
        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;

        API.updateABOMItem_alt(editedIds, data, function (res) {
          alert(JSON.stringify(res));
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
            updateIt={handleUpdate}
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
                    <Typography variant="h6">{values?.choosen}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledTextField
                      disabled
                      fullWidth
                      autoComplete="unit_measurement"
                      type="text"
                      label="Total Produksi"
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
                    <div className="wk_table_responsive">
                      <table style={{ fontSize: '11px' }}>
                        <tr>
                          <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                            BOM / CBD
                          </td>
                          <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                            <a
                              href={`../../../production/costing/show-bom/${reconcile?.costing_id}`}
                              target="_blank"
                            >
                              CBD-{padStartWithZero(reconcile?.costing_id)}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                            Sales Order
                          </td>
                          <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                            <a
                              href={`../../../order/sales-order/document/${reconcile?.sales_order_id}`}
                              target="_blank"
                            >
                              SO-{padStartWithZero(reconcile?.costing_id)}-
                              {padStartWithZero(reconcile?.sales_order_id)}
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                            Nomor PEB
                          </td>
                          <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                            <a
                              href={`../../../kite/export/${exportLicense?.id}`}
                              target="_blank"
                            >
                              {padStartWithZero(exportLicense?.document_number)}
                            </a>
                          </td>
                        </tr>

                        <tr>
                          <td className="wk_width_1 wk_padd_8_20 wk_semi_bold wk_primary_color wk_gray_bg">
                            Tanggal Dokumen PEB
                          </td>
                          <td className="wk_width_1 wk_padd_8_20 wk_text_left">
                            {exportLicense?.date}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <DataGrid columns={goodsColumns} rows={component} duplicateMaterial={false} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default BillofMaterial;
