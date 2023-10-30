import React, { useEffect, useState } from 'react';
import Page from '../../../../components/Page';
import ColumnBox from '../../../../components/ColumnBox';
import SpaceBetweenBox from '../../../../components/SpaceBetweenBox';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Stack,
  styled,
  IconButton
} from '@mui/material';
import { isArray, isEmpty, isUndefined } from 'lodash';
//API
import API from '../../../../helpers';
import { fCurrency } from '../../../../utils/formatNumber';
//
import { BasicTable, DialogBox } from './components';
//Icons
import plusSquare from '@iconify/icons-eva/plus-square-fill';
import { Icon } from '@iconify/react';

const GridData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

function FinanceAccountNew() {
  const [cat, setCat] = useState([]);
  const loading = cat.length === 0;

  const [financialAccount, setFinancialAccount] = useState([]);
  const loading2 = financialAccount.length === 0;

  const GoodsSchema = Yup.object().shape({
    trx_type_id: Yup.number().required('Trx Type is required'),
    financial_account_id: Yup.number().required('Financial Account is required')
  });

  const formik = useFormik({
    initialValues: {
      trx_date: '',
      trx_type_id: 0,
      financial_account_id: 0
    },
    validationSchema: GoodsSchema,
    onSubmit: (values) => {
      try {
        let _data = selected.map((i) => ({
          ...values,
          trx_date: i.effective_date,
          trx_amount: i.total_amount,
          ref_num: i.ref_num
        }));
        API.insertFinanceTransactions(_data, function (res) {
          if (!res) return;
          if (!res.success) alert('failed');
          else alert('success');
          handleReset();
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
    isSubmitting,
    setSubmitting,
    setFieldValue,
    handleSubmit,
    getFieldProps,
    handleReset
  } = formik;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (cat.length > 0 || cat.length != 0) return;
    else {
      try {
        API.getFinanceAccountType(function (res) {
          if (isUndefined(res)) throw new Error('Error occured');
          else setCat(res.data);
        });
      } catch (error) {
        alert(error);
      }
    }

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    let active = true;

    if (!loading2) {
      return undefined;
    }

    try {
      API.getFinanceAccount('', function (res) {
        if (isUndefined(res)) throw new Error('Error occured');
        else setFinancialAccount(res.data);
      });
    } catch (error) {
      alert(error);
    }

    return () => {
      active = false;
    };
  }, [loading2]);

  // DialogBox for Payment
  const [options, setOptions] = useState([]);
  const [openSH, setOpenSH] = useState(false);
  const loadingSH = openSH && options.length === 0;

  const [selected, setSelected] = useState([]);
  const [selectedValueSH, setSelectedValueSH] = React.useState({
    ref_num: ''
  });

  const amount = 0;

  useEffect(() => {
    let active = true;

    (() => {
      try {
        API.getPaymentCollection('', (res) => {
          if (!res) return;
          if (isEmpty(res.data)) throw new Error('no data');
          else {
            let _data = res.data.map((i, index) => ({ ...i, id: index + 1 }));
            setOptions(_data);
          }
        });
      } catch (error) {
        alert(error);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSH]);

  const handleRadioChange = (e) => {
    setFieldValue('trx_type_id', e.target.value);
  };

  return (
    <Page>
      <Container>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel>Akun Rekening</InputLabel>
                    <Select
                      autoComplete="financial_account_id"
                      type="number"
                      {...getFieldProps('financial_account_id')}
                      error={Boolean(touched.financial_account_id && errors.financial_account_id)}
                      helperText={touched.financial_account_id && errors.financial_account_id}
                    >
                      {!isArray(financialAccount)
                        ? null
                        : financialAccount.map(function (x) {
                            return (
                              <MenuItem
                                value={x.id}
                              >{`${x.account_name} - ${x.account_number}`}</MenuItem>
                            );
                          })}
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel id="row-radio-buttons-group-label">Transaction Type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="1"
                        onChange={handleRadioChange}
                        control={<Radio />}
                        label="Withdrawal"
                      />
                      <FormControlLabel
                        value="2"
                        onChange={handleRadioChange}
                        control={<Radio />}
                        label="Deposit"
                      />
                      <FormControlLabel
                        value="3"
                        onChange={handleRadioChange}
                        control={<Radio />}
                        label="Adjustment"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                {/* <Grid item xs={12} lg={5}></Grid>¸ */}
                {/* <CardContent>
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Payment </Typography>
                        <Button onClick={() => setOpenSH(true)}>Select</Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">{selectedValueSH?.ref_num}</Typography>
                      </div>
                      <DialogBox
                        options={options}
                        loading={loadingSH}
                        // error={Boolean(touched.facility_id && errors.facility_id)}
                        // helperText={touched.facility_id && errors.facility_id}
                        // selectedValue={values.facility_id}
                        open={openSH}
                        onClose={(value) => handleCloseDialogParty(value)}
                      />
                    </ColumnBox>
                  </CardContent> */}
              </CardContent>

              <CardContent>
                <DialogBox
                  options={options}
                  loading={loadingSH}
                  selected={selected}
                  setSelected={setSelected}
                  // error={Boolean(touched.facility_id && errors.facility_id)}
                  // helperText={touched.facility_id && errors.facility_id}
                  // selectedValue={values.facility_id}
                  open={openSH}
                  onClose={() => setOpenSH(false)}
                />
                <Box>
                  <GridData>
                    <Typography variant="h6">Payment List</Typography>
                    <IconButton
                      onClick={() => setOpenSH(true)}
                      sx={{
                        height: '36px',
                        width: '36px',
                        backgroundColor: 'rgb(255, 255, 255)',
                        color: 'rgb(54, 179, 126)'
                      }}
                    >
                      <Icon icon={plusSquare} />
                    </IconButton>
                  </GridData>
                </Box>
                <Box>
                  <BasicTable payload={selected} amount={fCurrency(amount)} />
                </Box>
              </CardContent>

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

export default FinanceAccountNew;
