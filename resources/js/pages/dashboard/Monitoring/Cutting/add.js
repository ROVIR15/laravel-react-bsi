import React, { useMemo, useCallback, useState } from 'react';
import Page from '../../../../components/Page';
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  TextField,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

//Icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//API
import API from '../../../../helpers';

// Data Grid
import DataGrid from './DataGrid';
import Modal from './Modal';
import DialogBox from './DialogBox';
import DialogBoxR from './DialogBoxR';
import { isEmpty, isUndefined } from 'lodash';

const ColumnBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
}));

const SpaceBetweenBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px'
}));

function WorkCenter() {
  const WorkCenterSchema = Yup.object().shape({
    sales_order_id: Yup.string().required('is required'),
    date: Yup.date().required('is required')
  });

  const formik = useFormik({
    initialValues: {
      sales_order_id: '',
      line: null,
      date: ''
    },
    validationSchema: WorkCenterSchema,
    onSubmit: (values) => {
      const { sales_order_id, spread_id, date } = values;
      let data = items.map(({ id, brand, qty_loading, name, size, color, ...x }) => ({
        ...x,
        sales_order_id,
        date,
        spread_id: 0
      }));
      try {
        API.insertMonitoringCutting(data, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed to save');
          // setItems([]);
          alert('success')
          // handleReset();
          // setSelectedValueSO({});
        });
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
    setSubmitting,
    handleSubmit,
    handleReset,
    getFieldProps,
    setFieldValue
  } = formik;

  // columns - Data grid
  const deleteData = useCallback((id) => () => {
    setItems((prevItems) => {
      return prevItems.filter(function (x) {
        return x.id != id;
      });
    });
  });

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
      { field: 'po_number', headerName: 'PO Number', editable: true },
      { field: 'name', width: 300, headerName: 'Name', editable: false },
      { field: 'size', headerName: 'Size', editable: false },
      { field: 'color', headerName: 'Color', editable: false },
      { field: 'output', headerName: 'Output', type: 'number', editable: true },
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

  // Sales Order Items storage variable on Data Grid
  const [items, setItems] = useState([]);

  //Data Grid
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

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
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  //   Dialog Box
  const [options, setOptions] = useState([]);
  const [openSO, setOpenSO] = useState(false);
  const loading = openSO && options.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getSalesOrder('?completion_status=2', (res) => {
          if (!res) return;
          else {
            let _data = res.data.filter((item) => {
              return item.completion_status[0]?.completion_status_id === 2;
            });

            setOptions(_data);
          }
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const handleClose = (name, value) => {
    setOpenSO(false);
    setSelectedValueSO(value);
    setFieldValue(name, value.id);
    setOptions([]);
    setId(value.id);
  };

  //   Dialog Box
  const [optionsSpreading, setOptionsSpreading] = useState([]);
  const [openSp, setOpenSp] = useState(false);
  const loadingSp = openSp && optionsSpreading.length === 0;
  const [selectedValueSp, setSelectedValueSp] = React.useState({});
  // const [id, setId] = React.useState(0);

  React.useEffect(() => {
    let active = true;

    if (!loadingSp) {
      return undefined;
    }

    setOptionsSpreading([]);

    (async () => {
      if (active) {
        API.getMonitoringSpreading('', (res) => {
          if (!res) return;
          else setOptionsSpreading(res.data);
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSp]);

  const handleCloseR = (name, value) => {
    setOpenSp(false);
    setSelectedValueSp(value);
    setFieldValue(name, value.id);
    setOptionsSpreading([]);
  };

  // Modal
  const handleAddItems = (values) => {
    setItems(values);
  };

  return (
    <Page>
      <Container>
        <Modal
          open={openM}
          onAddItems={handleAddItems}
          so_id={selectedValueSO.id}
          order_id={selectedValueSO.order_id}
          handleClose={handleCloseModal}
          selected={items}
          setSelected={setItems}
        />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              {/* Work Center Information */}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ColumnBox
                      style={{
                        padding: '1em 0.75em',
                        border: '1px dashed #b8b8b8',
                        borderRadius: '8px',
                        background: '#b6b6b62b'
                      }}
                    >
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Pilih Sales Order </Typography>
                        <Button onClick={() => setOpenSO(true)}>Select</Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">{selectedValueSO.id}</Typography>
                        <Typography variant="span">{selectedValueSO.po_number}</Typography>
                        <Typography variant="body2">{selectedValueSO.sold_to}</Typography>
                      </div>
                      <DialogBox
                        options={options}
                        loading={loading}
                        error={Boolean(touched.order_id && errors.order_id)}
                        helperText={touched.order_id && errors.order_id}
                        selectedValue={selectedValueSO}
                        open={openSO}
                        onClose={(value) => handleClose('sales_order_id', value)}
                      />
                    </ColumnBox>
                  </Grid>
                  <Grid item xs={12}>
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
                </Grid>
              </CardContent>

              {/* Work Center Information */}
              <CardContent>
                <Stack spacing={2}>
                  <Button fullWidth disabled={isUndefined(selectedValueSO.id)} variant="contained" onClick={handleOpenModal}>
                    Pilih Style Item
                  </Button>
                  <DataGrid
                    columns={columns}
                    rows={items}
                    onEditRowsModelChange={handleEditRowsModelChange}
                  />
                </Stack>
              </CardContent>

              {/* Button */}
              <CardContent>
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
                <Button fullWidth size="large" color="grey" variant="contained" sx={{ m: 1 }}>
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default WorkCenter;
