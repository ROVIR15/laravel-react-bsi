import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  TextField,
  Typography,
  Paper,
  Stack,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// api
import API from '../../../helpers';

//Component
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { partyArrangedData } from '../../../helpers/data';
import { RFQSchema } from '../../../helpers/FormerSchema';
import { isEmpty } from 'lodash';

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

function RFQ() {
  // Option Inquiry
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  //Dialog Interaction
  const [openSO, setOpenSO] = useState(false);
  const [openSH, setOpenSH] = useState(false);
  const loading = (openSO || openM) && options.length === 0;
  const loading2 = openSH && options2.length === 0;
  const [selectedValueSO, setSelectedValueSO] = React.useState({});
  const [selectedValueSH, setSelectedValueSH] = React.useState({});

  // Option for Product Items
  const [optionsP, setOptionsP] = useState([]);

  //Data Grid
  const [items, setItems] = useState([]);

  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const formik = useFormik({
    initialValues: {
      id: '',
      po_number: '',
      ship_to: '',
      bought_from: '',
      issue_date: '',
      valid_thru: '',
      delivery_date: ''
    },
    validationSchema: RFQSchema,
    onSubmit: (values) => {
      const _data = {
        ...values,
        quote_items: items,
        quote_type: 'PO'
      };
      API.insertRFQ(_data, function (res) {
        if (res.success) alert('success');
        else alert('failed');
      });
      setSubmitting(false);
    }
  });

  const {
    errors,
    touched,
    values,
    setFieldValue,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    setValues,
    getFieldProps
  } = formik;

  // Preapre data from vendor
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    setOptions([]);

    if (active) {
      try {
        API.getVendors(async (res) => {
          if (!res) return;
          else {
            let data = await partyArrangedData(res);
            setOptions(data);
          }
        });
      } catch (e) {
        alert('error');
      }
    }

    return () => {
      active = false;
    };
  }, [loading]);

  // Preapre data from buyer
  React.useEffect(() => {
    let active = true;

    if (!loading2) {
      return undefined;
    }

    setOptions2([]);

    if (active) {
      try {
        API.getBuyers(async (res) => {
          if (!res) return;
          else {
            let data = await partyArrangedData(res);
            setOptions2(data);
          }
        });
      } catch (e) {
        alert('error');
      }
    }
    return () => {
      active = false;
    };
  }, [loading2]);

  // Dialog Box
  const handleClose = (name, value) => {
    if (name === 'bought_from') {
      setOpenSO(false);
      setSelectedValueSO(value);
    }
    if (name === 'ship_to') {
      setOpenSH(false);
      setSelectedValueSH(value);
    }
    setFieldValue(name, value.id);
    setOptions([]);
    setOptions2([]);
  };

  const deleteData = useCallback((id) => () => {
    const rowToDeleteIndex = id;
    let a = [...items.slice(0, rowToDeleteIndex), ...items.slice(rowToDeleteIndex + 1)];

    a = a.map(function (x, index) {
      return { ...x, id: index };
    });

    setItems(a);
  });

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

  const handleResetRows = () => {
    setItems([]);
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'Purchase Re Item ID', editable: false, visible: 'hide' },
      { field: 'item_name', headerName: 'Name', width: 350, editable: false },
      { field: 'qty', headerName: 'Quantity', editable: true },
      { field: 'unit_price', headerName: 'Unit Price', editable: true },
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

  return (
    <Page>
      <Container>
        <Modal open={openM} handleClose={handleCloseModal} items={items} setItems={setItems} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardHeader title="RFQ Information" />
              <CardContent>
                <Paper>
                  <Stack direction="row" spacing={2} pl={2} pr={2} pb={3}>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Penjual </Typography>
                        <Button onClick={() => setOpenSO(true)}>Select</Button>
                      </SpaceBetweenBox>
                      {selectedValueSO?.name ? (
                        <div>
                          <Typography variant="subtitle1">{selectedValueSO?.name}</Typography>
                          <Typography component="span" variant="caption">
                            {selectedValueSO?.street}
                          </Typography>
                          <Typography variant="body2">{`${selectedValueSO?.city}, ${selectedValueSO?.province}, ${selectedValueSO.country}`}</Typography>
                        </div>
                      ) : null}

                      <DialogBox
                        options={options}
                        loading={loading}
                        error={Boolean(touched.bought_from && errors.bought_from)}
                        helperText={touched.bought_from && errors.bought_from}
                        selectedValue={selectedValueSO}
                        open={openSO}
                        onClose={(value) => handleClose('bought_from', value)}
                      />
                    </ColumnBox>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Dikirim ke </Typography>
                        <Button onClick={() => setOpenSH(true)}>Select</Button>
                      </SpaceBetweenBox>
                      {selectedValueSH?.name ? (
                        <div>
                          <Typography variant="subtitle1">{selectedValueSH?.name}</Typography>
                          <Typography component="span" variant="caption">
                            {selectedValueSH?.street}
                          </Typography>
                          <Typography variant="body2">{`${selectedValueSH?.city}, ${selectedValueSH?.province}, ${selectedValueSH.country}`}</Typography>
                        </div>
                      ) : null}

                      <DialogBox
                        options={options2}
                        loading={loading2}
                        error={Boolean(touched.ship_to && errors.ship_to)}
                        helperText={touched.ship_to && errors.ship_to}
                        selectedValue={selectedValueSH}
                        open={openSH}
                        onClose={(value) => handleClose('ship_to', value)}
                      />
                    </ColumnBox>
                  </Stack>
                </Paper>
              </CardContent>
            </Card>

            <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
              <CardContent>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Purchase Items" value="1" />
                        <Tab label="Finance" value="2" />
                      </TabList>
                    </Box>

                    <TabPanel value="1">
                      {/* Here You Go */}
                      <Grid container spacing={3}>
                        <Grid item xs={7}>
                          <TextField
                            fullWidth
                            autoComplete="po_number"
                            type="text"
                            label="No PO"
                            {...getFieldProps('po_number')}
                            error={Boolean(touched.po_number && errors.po_number)}
                            helperText={touched.po_number && errors.po_number}
                          />
                        </Grid>
                      </Grid>
                      <div style={{ display: 'flex' }}>
                        <TextField
                          fullWidth
                          autoComplete="issue_date"
                          type="date"
                          placeholder="valid"
                          label="PO Date"
                          {...getFieldProps('issue_date')}
                          error={Boolean(touched.issue_date && errors.issue_date)}
                          helperText={touched.issue_date && errors.issue_date}
                        />
                        <TextField
                          fullWidth
                          autoComplete="valid_thru"
                          type="date"
                          label="Valid to"
                          placeholder="valid"
                          {...getFieldProps('valid_thru')}
                          error={Boolean(touched.valid_thru && errors.valid_thru)}
                          helperText={touched.valid_thru && errors.valid_thru}
                        />
                        <TextField
                          fullWidth
                          autoComplete="delivery_date"
                          type="date"
                          label="Tanggal Pengiriman"
                          {...getFieldProps('delivery_date')}
                          error={Boolean(touched.delivery_date && errors.delivery_date)}
                          helperText={touched.delivery_date && errors.delivery_date}
                        />
                      </div>
                      <DataGrid
                        columns={columns}
                        rows={items}
                        onEditRowsModelChange={handleEditRowsModelChange}
                        handleAddRow={handleOpenModal}
                        handleReset={handleResetRows}
                        handleUpdateAllRows={false}
                      />
                    </TabPanel>
                  </TabContext>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ p: 2, display: 'flex', justifyContent: 'end' }}>
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
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default RFQ;
