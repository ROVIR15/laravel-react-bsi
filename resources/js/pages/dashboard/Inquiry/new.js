import React, {useState, useMemo} from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';

// API
import API from '../../../helpers';

// Components
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AutoComplete from './components/AutoCompleteB';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function Inquiry() {

  //AutoComplete props
  const [options, setOptions] = useState([]);
  const [buyerOptions, setBuyerOptions] = useState([]);

  // Props of AutoComplete
  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);a

  const InquirySchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
    sold_to: Yup.number().required('Sold to Buyer is required'),
    ship_to: Yup.number().required('Ship to Buyer is required'),
    po_number: Yup.string().required('city is required'),
    po_date: Yup.string().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      sold_to: 0,
      ship_to: 0,
      po_number: '',
      po_date: '',
      delivery_date: '',
      valid_to: ''
    },
    validationSchema: InquirySchema,
    onSubmit: (values) => {
      const _data = {...values, inquiry_item: items};
      API.insertInquiry(_data, (res)=>{
        if(!res.success) {
          alert('Failed');
        } else {
          alert('Success');
        }
      })
      setSubmitting(false)
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  // Preapre data from product features
  React.useEffect(() => {
    let active = true;

      API.getProductFeature((res) => {
        if(!res) return
		    if(!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      })

      API.getBuyers((res) => {
        if(!res) return
        else setBuyerOptions(res);
      })

    return () => {
      active = false;
    };
  }, [loading])

  /**
   * Data Grid for Inquiry Items
   */

  const [items, setItems] = useState([]);

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  // Modal Props and Handling
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  const inquiryItemsColumns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, visible: 'hide' },
    { field: 'name', headerName: 'Name', editable: false },
    { field: 'size', headerName: 'Size', editable: true},
    { field: 'color', headerName: 'Color', editable: true },
    { field: 'brand', headerName: 'Brand', editable: false },
    { field: 'qty', headerName: 'Quantity', editable: true },
    { field: 'actions', type: 'actions', width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={trash2Outline} width={24} height={24} />}
          label="Delete"
          onClick={deleteData(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteData]);


  // Handling Request from Inquiry Items Data Grid Component
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
            if(row.id === parseInt(itemToUpdateIndex)){
              return {...row, [editedColumnName]: editRowData[editedColumnName].value}
            } else {
              return row
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

  const handleResetRows = () => {
    setItems([]);
  }

  const deleteData = React.useCallback(
    (id) => () => {
      setItems((prevItems) => {
        return prevItems.filter((x) => (x.id !== id))
      });
  })

  return (
    <Page>
      <Container>
      <Modal 
        payload={[]}
        open={openM}
        options={options}
        handleClose={handleCloseModal}
        setComponent={setItems}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Inquiry Information"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    autoComplete="id"
                    type="text"
                    label="No Inquiry"
                    {...getFieldProps('id')}
                    error={Boolean(touched.id && errors.id)}
                    helperText={touched.id && errors.id}
                  />
                </Grid>
                <Grid item xs={8}>
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
                <Grid item xs={6}>
                  <AutoComplete
                    fullWidth
                    autoComplete="sold_to"
                    label="Pembeli"
                    error={Boolean(touched.sold_to && errors.sold_to)}
                    helperText={touched.sold_to && errors.sold_to}
                    options={buyerOptions}
                    setOpen={setOpen}
                    loading={loading}
                    changeData={setFieldValue}
                    name='sold_to'
                  />
                </Grid>
                <Grid item xs={6}>
                  <AutoComplete
                    fullWidth
                    autoComplete="ship_to"
                    type="text"
                    label="Penerima To"
                    error={Boolean(touched.ship_to && errors.ship_to)}
                    helperText={touched.ship_to && errors.ship_to}
                    options={buyerOptions}
                    setOpen={setOpen}
                    loading={loading}
                    changeData={setFieldValue}
                    name='ship_to'
                  />
                </Grid>
              </Grid>       
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card >
            <CardHeader
              title="Item Overview"
            />
            <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoComplete="po_date"
                  type="date"
                  placeholder='po_date'
                  label="PO Date"
                  {...getFieldProps('po_date')}
                  error={Boolean(touched.po_date && errors.po_date)}
                  helperText={touched.po_date && errors.po_date}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoComplete="valid_to"
                  type="date"
                  placeholder='valid_to'
                  label="Expired Date"
                  {...getFieldProps('valid_to')}
                  error={Boolean(touched.valid_to && errors.valid_to)}
                  helperText={touched.valid_to && errors.valid_to}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  autoComplete="delivery_date"
                  type="date"
                  label="Delivery Time"
                  {...getFieldProps('delivery_date')}
                  error={Boolean(touched.delivery_date && errors.delivery_date)}
                  helperText={touched.delivery_date && errors.delivery_date}
                />
              </Grid>
            </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
            <DataGrid 
              columns={inquiryItemsColumns}
              rows={items}
              handleAddRow={handleOpenModal}
              onEditRowsModelChange={handleEditRowsModelChange}
              handleResetRows={handleResetRows}
            />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p:2, display: 'flex', justifyContent: 'end', marginTop: '1.5em' }}>
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

export default Inquiry