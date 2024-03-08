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
  Stack,
  TextField,
  MenuItem,
  styled
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { FormikProvider, Form, useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import API from '../../../../../helpers';
import DataGrid from '../components/DataGrid';
import Modal from '../components/Modal';

//utils
import { material_transfer_items } from '../../utils';

import { Icon } from '@iconify/react';
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { isEmpty } from 'lodash';
import moment from 'moment';
import useAuth from '../../../../../context';

import { enqueueSnackbar } from 'notistack';

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

const BOXColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

function MaterialTransfer() {
  // get user information
  const { user } = useAuth();

  // data
  const [info, setInfo] = useState({
    to_facility_name: 'XXX',
    from_facility_name: 'XXX',
    party_name: 'person',
    date: '11/12/2023',
    est_transfer_date: '11/12/2023'
  });

  // get id of parameter
  const { id } = useParams();

  // check whether data of a resoruces already load
  const [statusLoad, setStatusLoad] = useState({ completed: false, timestamps: '' });

  const formik = useFormik({
    initialValues: {
      material_transfer_id: 0,
      to_facility_id: 0,
      from_facility_id: 0,
      est_transfer_date: '',
      description: ''
    },
    onSubmit: (values) => {
      try {
        const _payload = items.map((data) => ({
          transferred_qty: data?.transferred_qty,
          costing_item_id: data.costing_item_id,
          material_transfer_id: data.material_transfer_id,
          material_transfer_item_id: data.id,
          to_facility_id: values.to_facility_id,
          from_facility_id: values.from_facility_id,
          date: values?.est_transfer_date,
          import_flag: data?.import_flag,
          order_item_id: data?.order_item_id,
          product_feature_id: data?.product_feature_id,
          product_id: data?.product_id,
          goods_id: data?.goods_id
        }));

        API.postMaterialTransferIssue(_payload, function (res) {
          if (res.success) enqueueSnackbar('', { variant: 'successAlert' });
          else enqueueSnackbar('', { variant: 'failedAlert' });
        });
      } catch (error) {
        enqueueSnackbar('', { variant: 'failedAlert' });
      }

      // handleReset();
      // setItems([]);
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

  // get data when parameter id on url shown up
  useEffect(() => {
    //get api on spesific material transfer resources
    if (!id) return;
    if (statusLoad.completed) return;
    try {
      API.getAMaterialTransfer(id, (res) => {
        if (!res) return;
        if (!res.data) throw new Error('failed');
        else {
          let _date = moment(res.data?.date).format('YYYY-MM-DD');

          setInfo({
            ...info,
            to_facility_name: res.data?.to_facility?.name,
            from_facility_name: res.data?.from_facility?.name,
            party_name: res.data?.party_name,
            date: moment(res.data?.created_at).format('LL'),
            est_transfer_date: moment(res.data?.est_transfer_date).format('LL')
          });

          setValues({
            material_transfer_id: res.data?.id,
            to_facility_id: res.data?.to_facility_id,
            from_facility_id: res.data?.from_facility_id,
            est_transfer_date: _date,
            description: res.data?.description
          });

          let _items = material_transfer_items(res.data?.items);
          setItems(_items);

          setStatusLoad({
            ...statusLoad,
            completed: true,
            timestamps: moment(res.data.status[0]?.created_at).format('LT')
          });
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

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
  };

  // columns on data grid
  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'id', editable: false, visible: 'hide' },
      { field: 'sku_id', headerName: 'SKU ID', editable: false, width: 150, visible: 'hide' },
      { field: 'item_name', headerName: 'Nama Material', width: 450, editable: false },
      {
        field: 'transfer_qty',
        headerName: 'Req Transfer Qty',
        type: 'number',
        editable: true,
        flex: 1
      },
      {
        field: 'transferred_qty',
        headerName: 'Confrimed',
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

  // handle fill all with requested qty
  const handleFillAllReq = () => {
    let a = items.map((data) => ({ ...data, transferred_qty: data.transfer_qty }));
    setItems(a);
  };

  // handle reset all transferred_qty
  const handleResetTransferQty = () => {
    let a = items.map((data) => ({ ...data, transferred_qty: 0 }));
    setItems(a);
  };

  return (
    <FormikProvider value={formik}>
      <Modal open={openSh} handleClose={() => setOpenSh(false)} items={items} setItems={setItems} />
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Paper elevation={2} style={{ padding: '2em' }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Stack>
                <Box>
                  <Typography variant="overline" display="block" gutterBottom>
                    Pembuat
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    {info.to_facility_name}
                  </Typography>
                </Box>

                <BOXColumn>
                  <Typography variant="overline" display="block" gutterBottom>
                    Tanggal Diterbitkan
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    {info.date}
                  </Typography>
                </BOXColumn>
              </Stack>
            </Grid>
            <Grid item xs={5}>
              <Stack>
                <Box>
                  <Typography variant="overline" display="block" gutterBottom>
                    Dikirim dari bagian
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    {info.from_facility_name}
                  </Typography>
                </Box>

                <BOXColumn>
                  <Typography variant="overline" display="block" gutterBottom>
                    Estimasi Pemenuhan
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    {info.est_transfer_date}
                  </Typography>
                </BOXColumn>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              {/* <GridData>
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
              </GridData> */}

              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleFillAllReq}>
                  Fill All
                </Button>
                <Button variant="contained" onClick={handleResetTransferQty}>
                  Reset
                </Button>
              </Stack>

              <DataGrid
                columns={columns}
                rows={items}
                onEditRowsModelChange={handleEditComponentRowsModelChange}
                // handleResetRows={handleResetComponentRows}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ m: 1 }}
              >
                Post Goods I
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

export default MaterialTransfer;
