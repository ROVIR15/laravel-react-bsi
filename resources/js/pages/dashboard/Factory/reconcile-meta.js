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
import { useParams } from 'react-router-dom';

import { fCurrency } from '../../../utils/formatNumber';

function DisplayBuyer({ placeHolder }) {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [costingRows, setCostingRows] = useState([]);

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
        API.insertReconcile(values, function (res) {
          if (!res) return;
          if (!res.success) throw new Error('failed to store data');
          else alert('done');
        });
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
          reconcile_id: id,
          purchase_order_id: next.id,
          order_id: next.order_id
        }
      ];
    }, []);
  };

  useEffect(() => {
    try {
      API.getAReconcile(id, (res) => {
        if (!res) return;
        if (!res.data) {
          setBomRows([]);
        } else {
          const {
            costing: { bom_items, bom_services, operation, qty },
            order: { sales_order, info, ...order }
          } = res.data;

          const so = [
            {
              id: sales_order?.id,
              order_id: order?.id,
              po_number: sales_order?.po_number,
              qty: info[0]?.total_qty,
              amount: info[0]?.total_amount
            }
          ];

          setSelectedSO(so);

          let total_bom_items = bom_items.reduce(
            (initial, next) =>
              initial +
              Math.round(next.consumption * (1 + next.allowance / 100) * next.unit_price * qty),
            0
          );

          let total_bom_services = bom_services.reduce(
            (initial, next) => initial + Math.round(next.unit_price * qty),
            0
          );

          let total_cost_cmt = operation.reduce(
            (initial, next) =>
              initial +
              Math.round(next?.work_center?.work_hours * next?.work_center?.cost_per_hour),
            0
          );

          setTotalBudget(total_bom_items + total_bom_services + total_cost_cmt);

          setCostingRows([
            { id: 1, name: 'Total Material Budget', total: total_bom_items },
            { id: 2, name: 'Total Service Budget', total: total_bom_services },
            { id: 3, name: 'Total CMT Budget', total: total_cost_cmt }
          ]);

          let po = res.data.po.map((item) => {
            let {
              order: { info, ...order },
              detail
            } = item;
            return {
              id: order?.purchase_order_id,
              order_id: order?.id,
              po_number: detail?.po_number,
              qty: info[0]?.total_qty,
              amount: info[0]?.total_amount
            };
          });
          setSelectedPO(po);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

  const total = () => {
    return selectedPO.reduce((initial, next) => {
      return initial + parseInt(next.amount);
    }, 0);
  };

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
              <Card>
                <CardHeader title="Budget" />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell width={50}>#</TableCell>
                          <TableCell width={200} align="left">
                            Name
                          </TableCell>
                          <TableCell width={200} align="right">
                            Total (Rp)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {costingRows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="right">{`Rp. ${fCurrency(row.total)}`}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell align="right" colSpan={2}>
                            Total Budget
                          </TableCell>
                          <TableCell align="right">
                            {`Rp. ${fCurrency(
                              totalBudget
                            )}`}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="right" colSpan={2}>
                            Total Spending
                          </TableCell>
                          <TableCell align="right">{`Rp. ${fCurrency(total())}`}</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="right" colSpan={2}>
                            Selisih
                          </TableCell>
                          <TableCell align="right">{`Rp. ${fCurrency(totalBudget - total())}`}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
              {/* <TableCosting
                list={bomRows}
                selected={selectedCosting}
                setSelected={handleChangeOfCosting}
              /> */}
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
                            <TableCell align="right">{`Rp. ${fCurrency(row.amount)}`}</TableCell>
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
                            <TableCell align="left">{row.order_id}</TableCell>
                            <TableCell align="left">{row.po_number}</TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{`Rp. ${fCurrency(row.amount)}`}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell align="right" colSpan={5}>{`Rp. ${fCurrency(
                            total()
                          )}`}</TableCell>
                        </TableRow>
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
