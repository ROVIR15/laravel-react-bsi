import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Grid,
  Tab,
  TextField,
  Button
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import AutoComplete from './components/AutoComplete';
import DataGrid from '../../../components/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';
//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

//api
import API from '../../../helpers';
import { useParams } from 'react-router-dom';
import { BuyerSchema } from '../../../helpers/FormerSchema';

//Utils
import { _partyArrangedData } from '../../../helpers/data';
import { isEmpty } from 'lodash';
import {
  _getAddressInfoOfParty,
  _getEmailInfoOfParty,
  _getPhoneNumberInfoOfParty
} from '../../../helpers/data';

function Buyer() {
  const { id } = useParams();
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const [addressList, setAddressList] = React.useState([]);
  const [emailList, setEmailList] = React.useState([]);
  const [phoneNumberList, setPhoneNumberList] = React.useState([]);

  const [choosen, setChoosen] = React.useState({
    id: 0,
    name: '',
    role: ''
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      npwp: '',
      street: '',
      city: '',
      province: '',
      country: '',
      postal_code: '',
      phone_number: ''
    },
    validationSchema: BuyerSchema,
    onSubmit: ({
      name,
      npwp,
      email,
      street,
      city,
      province,
      country,
      postal_code,
      role_type_id
    }) => {
      const data = {
        party_info: {
          name,
          email,
          npwp
        },
        address: {
          street,
          city,
          province,
          country,
          postal_code
        },
        roles: {
          role_type_id,
          relationship_id: 1
        }
      };

      try {
        API.editBuyer(id, data, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed');
          else alert('success');
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
    handleSubmit,
    getFieldProps,
    setValues,
    setSubmitting,
    setFieldValue
  } = formik;

  // get data party by Id
  useEffect(() => {
    if (!id) return;
    handleUpdateBuyerInfo(id);
  }, [id]);

  // Handle Update
  const handleUpdateBuyerInfo = (_id) => {
    try {
      API.getBuyer(_id, function (res) {
        if (!res) return;
        if (!res.success) throw new Error('Something went wrong!');
        const { role_type, ...arrangedData } = _partyArrangedData(res.data);
        let _addr = _getAddressInfoOfParty(res?.address);
        let _emailList = _getEmailInfoOfParty(res?.email);
        let _phoneNumberList = _getPhoneNumberInfoOfParty(res?.phone_number);

        setAddressList(_addr);
        setEmailList(_emailList);
        setPhoneNumberList(_phoneNumberList);
        setValues(arrangedData);
        setChoosen(role_type);
      });
    } catch (error) {
      alert(error);
    }
  };

  // Auto Complete
  const [open, setOpen] = React.useState(false);

  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    // get labor categories
    if (!loading) {
      return undefined;
    }

    API.getRoleType('?type=Buyer', (res) => {
      if (!res) return;
      if (!res.data) {
        setOptions([]);
      } else {
        setOptions(res.data);
      }
    });

    return () => {
      active = false;
    };
  }, [loading]);

  const handleChangeAC = async (newValue) => {
    setChoosen(newValue);
    await setFieldValue('role_type_id', newValue.id);
  };

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  /**
   * Handle Data Grid Actions
   *
   * In this data grid user can actively doing CRUD.
   */

  const columnsAddress = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
      { field: 'street', width: 500, headerName: 'Alamat', editable: true },
      { field: 'city', width: 300, headerName: 'Kota', editable: true },
      { field: 'province', width: 300, headerName: 'Provinsi', editable: true },
      { field: 'country', width: 300, headerName: 'Negara', editable: true },
      { field: 'postal_code', width: 300, headerName: 'Postal', type: 'number', editable: true },
      { field: 'contact_mechanism_id', width: 50, headerName: 'Postal', hide: true },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteData(params?.row?.contact_mechanism_id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteData]
  );

  const columnsEmail = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
      { field: 'name', width: 200, headerName: 'Alamat', editable: true },
      { field: 'contact_mechanism_id', width: 50, headerName: 'Postal', hide: true },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteData(params?.row?.contact_mechanism_id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteData]
  );

  const columnsPhoneNumber = useMemo(
    () => [
      { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
      { field: 'number', width: 200, headerName: 'Alamat', editable: true },
      { field: 'contact_mechanism_id', width: 50, headerName: 'Postal', hide: true },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Icon icon={trash2Outline} width={24} height={24} />}
            label="Delete"
            onClick={deleteData(params?.row?.contact_mechanism_id)}
            showInMenu
          />
        ]
      }
    ],
    [deleteData]
  );

  const deleteData = useCallback(
    (id) => () => {
      try {
        API.deleteContactMechanism(id, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed to delete data');
          else alert('deleted');
        });
      } catch (error) {
        alert(error);
      }

      handleUpdateBuyerInfo(id);
      // API.deleteProductFeature(id, function (res) {
      //   handleUpdateAllRows();
      // }).catch(function (error) {
      //   alert('Fail');
      // });
    },
    []
  );

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        const data = new Object();
        data[editedColumnName] = editRowData[editedColumnName].value;
        // update on firebase

        try {
          if (parseInt(valueTab) === 1) {
            API.updateContactMechanismPostalAddress(editedIds, data, function (res) {
              if (!res) return;
              if (!res.success) throw new Error('failed to update an data');
              else alert('succesfully address update data');
            });
          }

          if (parseInt(valueTab) === 2) {
            API.updateContactMechanismEmail(editedIds, data, function (res) {
              if (!res) return;
              if (!res.success) throw new Error('failed to update an data');
              else alert('succesfully email update data');
            });
          }

          if (parseInt(valueTab) === 3) {
            API.updateContactMechanismTelecommunicationNumber(editedIds, data, function (res) {
              if (!res) return;
              if (!res.success) throw new Error('failed to update an data');
              else alert('succesfully phone number update data');
            });
          }
        } catch (error) {
          alert('error');
        }
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  const handleAddRow = (type) => {
    let _new = {
      type,
      party_id: id
    };

    const _newAddress = {
      street: 'Jl. .....',
      city: 'Kota...',
      province: 'Provinsi...',
      country: 'Negara....',
      postal_code: '59XX....'
    };

    const _newE = {
      name: 'here_your_email@mail.com'
    };

    const _newNumber = {
      number: '081XXXXXX'
    };

    try {
      if (!type) throw new Error('Please defined a type');

      if (type === 1) {
        _new = { ..._new, ..._newNumber };
      }

      if (type === 2) {
        _new = { ..._new, ..._newE };
      }

      if (type === 3) {
        _new = { ..._new, ..._newAddress };
      }

      API.insertContactMechanism(_new, (res) => {
        if (!res) return;
        if (!res.success) throw new Error('failed to store data');
        else {
          alert('succesfully insert new data');
        }
      });
    } catch (error) {
      alert(error);
    }

    handleUpdateBuyerInfo(id);
  };

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Identity Information" />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          autoComplete="name"
                          type="text"
                          label="Nama"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <AutoComplete
                          fullWidth
                          autoComplete="role_type_id"
                          type="text"
                          label="Role Type"
                          error={Boolean(touched.role_type_id && errors.role_type_id)}
                          helperText={touched.role_type_id && errors.role_type_id}
                          options={options}
                          setOpen={setOpen}
                          loading={loading}
                          changeData={handleChangeAC}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          autoComplete="npwp"
                          type="text"
                          label="NPWP"
                          {...getFieldProps('npwp')}
                          error={Boolean(touched.npwp && errors.npwp)}
                          helperText={touched.npwp && errors.npwp}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={valueTab}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                          <Tab label="Address" value="1" />
                          <Tab label="Email" value="2" />
                          <Tab label="Number" value="3" />
                        </TabList>
                      </Box>

                      <TabPanel value="1">
                        <DataGrid
                          columns={columnsAddress}
                          rows={addressList}
                          onEditRowsModelChange={handleEditRowsModelChange}
                          handleAddRow={() => handleAddRow(3)}
                        />
                      </TabPanel>

                      <TabPanel value="2">
                        <DataGrid
                          columns={columnsEmail}
                          rows={emailList}
                          onEditRowsModelChange={handleEditRowsModelChange}
                          handleAddRow={() => handleAddRow(2)}
                        />
                      </TabPanel>

                      <TabPanel value="3">
                        <DataGrid
                          columns={columnsPhoneNumber}
                          rows={phoneNumberList}
                          onEditRowsModelChange={handleEditRowsModelChange}
                          handleAddRow={() => handleAddRow(1)}
                        />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12}>
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
                  <Button size="large" type="submit" color="grey" variant="contained" sx={{ m: 1 }}>
                    Cancel
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}

export default Buyer;
