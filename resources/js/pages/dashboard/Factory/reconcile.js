import React, { useEffect, useState } from 'react';
import { filter, isArray, isUndefined } from 'lodash';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
  Paper,
  Button
} from '@mui/material';
//components

import TableCosting from './components/TableCosting';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ListHead, ListToolbar, MoreMenu } from '../../../components/Table';
//
import BUYERLIST from '../../../_mocks_/buyer';
// api
import API from '../../../helpers';
import { serviceList2 } from '../../../helpers/data';

import Modal from './components/Modal';

function DisplayBuyer({ placeHolder }) {
  const [rows, setRows] = useState([]);
  const [bomRows, setBomRows] = useState([]);

  const [open, setOpen] = useState(false);
  // "1" for Purchase Order and "2" for Sales Order;
  const [modalType, setModalType] = useState(1);
  const [selectedPO, setSelectedPO] = useState([]);
  const [selectedSO, setSelectedSO] = useState([]);
  const [selectedCosting, setSelectedCosting] = useState({});

  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = (open, type) => {
    setOpen(open);
    setModalType(type);
  };

  const setSelectedOrder = (payload, type) => {
    if (!type) return;
    if (type === 1) handleChangeOfPurchaseOrder(payload);
    if (type === 2) handleChangeOfSalesOrder(payload);
    else return;
  };

  const ReconcileSchema = Yup.object().shape({
    costing_id: Yup.number().required('costing is required'),
    sales_order: Yup.object().required('Sales Order is required'),
    purchase_order: Yup.array().required('Purchase Order is required')
  });

  const formik = useFormik({
    initialValues: {
      costing_id: '',
      sales_order: null,
      purchase_order: []
    },
    validationSchema: ReconcileSchema,
    onSubmit: (values) => {
      try {
        API.insertReconcile(values, function(res){
          if(!res) return;
          if(!res.success) throw new Error('failed to store data');
          else alert('done')
        })
      } catch (error) {
        alert(error);
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, setFieldValue } = formik;

  const handleChangeOfCosting = (data) => {
    setSelectedCosting(data);
    setFieldValue('costing_id', data.id);
  };

  const handleChangeOfSalesOrder = (data) => {
    if (data.length > 1) {
      alert('please choose one costing and uncheck the selected data');
      return;
    }
    setSelectedSO(data);
    setFieldValue('sales_order', {
      id: data[0].id,
      order_id: data[0].order_id
    });
  };

  const handleChangeOfPurchaseOrder = (data) => {
    setSelectedPO(data);
    let a = data.reduce((initial, next) => {
      return [
        ...initial,
        {
          purchase_order_id: next.id,
          order_id: next.order_id
        }
      ];
    }, []);

    setFieldValue('purchase_order', a);
  };

  useEffect(() => {
    try {
      API.getBOMList((res) => {
        if (!res) return;
        if (!res.data) {
          setBomRows([]);
        } else {
          const ras = res.data.map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            final_price: item.final_price
          }));
          setBomRows(ras);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Modal
            open={open}
            type={modalType}
            handleClose={handleCloseModal}
            selected={[selectedPO, selectedSO]}
            setSelected={(payload, type) => setSelectedOrder(payload, type)}
          />
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <TableCosting
                list={bomRows}
                selected={selectedCosting}
                setSelected={handleChangeOfCosting}
              />
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Sales Order" />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={50}>#</TableCell>
                          <TableCell width={50}># Order Id</TableCell>
                          <TableCell width={200} align="left">
                            Sales Order Number
                          </TableCell>
                          <TableCell width={100} align="right">
                            Qty
                          </TableCell>
                          <TableCell width={200} align="right">
                            Total (Rp)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedSO.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.order_id}</TableCell>
                            <TableCell align="right">{row.po_number}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                          </TableRow>
                        ))}
                        <Button onClick={() => handleOpenModal(true, 2)} fullWidth>
                          {' '}
                          Add Items
                        </Button>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Purchase Order" />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={50}>#</TableCell>
                          <TableCell width={50}># Order Id</TableCell>
                          <TableCell width={200} align="left">
                            Purchase Order Number
                          </TableCell>
                          <TableCell width={100} align="right">
                            Qty
                          </TableCell>
                          <TableCell width={200} align="right">
                            Total (Rp)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedPO.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.order_id}</TableCell>
                            <TableCell align="right">{row.po_number}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <Button onClick={() => handleOpenModal(true, 1)} fullWidth>
                            {' '}
                            Add Items
                          </Button>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Button
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ m: 1 }}
          >
            Save
          </Button>
        </Form>
      </FormikProvider>
    </>
  );
}

export default DisplayBuyer;
