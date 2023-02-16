import React, { useEffect } from 'react';
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
} from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import AutoComplete from './components/AutoComplete';

//api
import API from '../../../helpers';
import { BuyerSchema } from '../../../helpers/FormerSchema';
import useAPIRoles from '../../../context/checkRoles';
import { useNavigate } from 'react-router-dom';

function Buyer() {
  const { isUserAllowedToInsertion, isNotReady } = useAPIRoles();
  const navigate = useNavigate();

  const [choosen, setChoosen] = React.useState({
    id: 0, name: '', role: ''
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      npwp: '',
      role_type_id: '',
      address: '',
      city: '',
      province: '',
      country: '',
      postal_code: '',
      email: '',
      phone_number: '',
    },
    validationSchema: BuyerSchema,
    onSubmit: ({ name, npwp, email, address, phone_number, city, province, country, postal_code, role_type_id}) => {
      const data = {
        name, email, npwp, type: choosen.name, role_type_id
      }

      const postal_address = {
          contact_mechanism_type_id: 3,
          type: 1,
          street: address,
          city, province, country, postal_code
      }

      const telecommunication_number = {
        contact_mechanism_type_id: 1,
        type: 3,
        number: phone_number
      }

      const _email = {
        contact_mechanism_type_id: 2,
        type: 2,
        name: email
      }

      try {
        API.setBuyer(data, function(res){
          if(!res) return undefined;
          if(!res.success) throw new Error('failed to store');
          API.insertContactMechanism({...postal_address, party_id: res.party});
          API.insertContactMechanism({...telecommunication_number, party_id: res.party});
          API.insertContactMechanism({..._email, party_id: res.party});

        });
      } catch (error) {
        alert(error)
      }


      setSubmitting(false);
      // handleReset()
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue, handleReset } = formik;

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
      if(!res) return
      if(!res.data) {
        setOptions([]);
      } else {
        setOptions(res.data);
      }
    });

    return () => {
      active = false;
    };
  }, [loading])

  const handleChangeAC = async (newValue) => {
    setChoosen(newValue);
    await setFieldValue('role_type_id', newValue.id);
  }

  /**
   * TAB Panel
   */
  const [valueTab, setValueTab] = React.useState('1');

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <Page>
      <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Card >
          <CardHeader
            title="Identity Information"
          />
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
                    <Tab label="Contact Information" value="2" />
                  </TabList>
                </Box>

              <TabPanel 
                value="1"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="address"
                      type="text"
                      label="Alamat"
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="city"
                      type="text"
                      label="Kota"
                      {...getFieldProps('city')}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="province"
                      type="text"
                      label="Provinsi"
                      {...getFieldProps('province')}
                      error={Boolean(touched.province && errors.province)}
                      helperText={touched.province && errors.province}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="country"
                      type="text"
                      label="Country"
                      {...getFieldProps('country')}
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.country && errors.country}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="postal code"
                      type="text"
                      label="Postal Code"
                      {...getFieldProps('postal_code')}
                      error={Boolean(touched.postal_code && errors.postal_code)}
                      helperText={touched.postal_code && errors.postal_code}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel
                value="2"
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="email"
                      type="email"
                      label="Email address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      autoComplete="phone number"
                      type="text"
                      label="Phone Number"
                      {...getFieldProps('phone_number')}
                      error={Boolean(touched.phone_number && errors.phone_number)}
                      helperText={touched.phone_number && errors.phone_number}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

            </TabContext>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'end' }}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ m: 1 }}
            >
              Save
            </LoadingButton>
            <Button
              size="large"
              type="submit"
              color="grey"
              variant="contained"
              sx={{ m: 1 }}
            >
              Cancel
            </Button>
          </Card>
        </Grid>
      </Grid>
        </Form>
      </FormikProvider>
      </Container>
    </Page>
  )
}

export default Buyer