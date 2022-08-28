import React, {useMemo, useCallback, useState} from 'react';
import Page from '../../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Button, Typography } from '@mui/material'
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
import API from '../../../../helpers'

// Data Grid
import DataGrid from './DataGrid';
import Modal from './Modal';
import DialogBox from './DialogBox';

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

const SpaceBetweenBox = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  justifyContent: "space-between", 
  marginBottom: "8px"
}))

function calculateLayer(params){
  const layer = parseFloat(params.row.fabric_length)/parseFloat(params.row.actual_spread_length);
  return Math.floor(layer);
}

function calculateRestan(params){
  if(!params.row.fabric_length && !params.row.actual_spread_length) return
  return parseFloat(params.row.fabric_length) - (calculateLayer(params) * params.row.actual_spread_length);
}

function WorkCenter() {

  const WorkCenterSchema = Yup.object().shape({
    sales_order_id: Yup.string().required('is required'),
    date: Yup.date().required('is required'),
  });

  const formik = useFormik({
    initialValues: {
      recorder: '',
      sales_order_id: '',
      line: null,
      date: ''
    },
    validationSchema: WorkCenterSchema,
    onSubmit: (values) => {
      const {sales_order_id} = values;
      const {order_id} = selectedValueSO;
      let data = items.map(({id, date, brand, satuan, category, sub_category, created_at, updated_at, product_id, value, name, size, color, layer, restan, ...x}) => ({ ...x, product_feature_id: id, date: values.date, sales_order_id, order_id}));
      API.insertMonitoringSpreading(data, function(res){
        alert(JSON.stringify(res))
      })
      setSubmitting(false);
    }
  });

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

// columns - Data grid
  const deleteData = useCallback(
   (id) => () => {
     setItems((prevItems) => {
       return prevItems.filter(function(x){
         return x.id != id
       })
     })
   })

  const columns = useMemo(() => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'po_number', headerName: 'PO', editable: true },
    { field: 'name', headerName: 'Name', editable: false},
    { field: 'color', headerName: 'Color', editable: false},
    { field: 'ratio', headerName: 'Ratio', editable: true, width: 100 },
    { field: 'marker_length', headerName: 'Panjang Market', editable: true },
    { field: 'fabric_length', headerName: 'Panjang Kain', editable: true },
    { field: 'fabric_width', headerName: 'Lebar Kain', type: 'number', editable: true },
    { field: 'actual_spread_length', headerName: 'Panjang Actual', type: 'number', editable: true },
    { field: 'lot', headerName: 'Lot', type: 'lot', editable: true },
    { field: 'layer', headerName: 'Layer', type: 'lot', editable: false, valueGetter: calculateLayer},
    { field: 'sisa', headerName: 'Sisa', type: 'sisa', editable: false, valueGetter: calculateRestan },
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

  // Sales Order Items storage variable on Data Grid
  const [items, setItems] = useState([])

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

//   Dialog Box

const [options, setOptions] = useState([]);
const [openSO, setOpenSO] = useState(false);
const loading = (openSO) && options.length === 0;
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
        API.getSalesOrder((res) => {
          if(!res) return
          else setOptions(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loading])

  const handleClose = (name, value) => {
    setOpenSO(false)
    setSelectedValueSO(value);
    setFieldValue(name, value.id);
    setOptions([]);
    setId(value.id);
  };

// Modal
  const handleAddItems = (values) => {
    setItems(values);
  }

  const [selected, setSelected] = React.useState([]);
  
  return (
    <Page>
      <Container>
      <Modal 
        open={openM}
        onAddItems={handleAddItems}
        order_id={id}
        handleClose={handleCloseModal}
        selected={items}
        setSelected={setItems}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Work Center Information */}
          <Grid item xs={12}>
            <Card >
              <CardHeader
                title="Work Center Information"
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item
                    xs={6}
                  >
                    <ColumnBox>
                      <SpaceBetweenBox>
                        <Typography variant="h6"> Sales Order </Typography>
                        <Button
                          onClick={() => setOpenSO(true)}
                        >
                          Select
                        </Button>
                      </SpaceBetweenBox>
                      <div>
                        <Typography variant="body1">
                          {selectedValueSO.id}
                        </Typography>
                        <Typography variant="span">
                          {selectedValueSO.po_number}
                        </Typography>
                        <Typography variant="body2">
                          {selectedValueSO.sold_to}
                        </Typography>
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

                  <Grid item
                    xs={6}
                  >
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
            </Card>
          </Grid>
          
          {/* Work Center Information */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Detail Performance in Work Center"
              />
              <CardContent>
                <Grid item xs={12}>
                  <DataGrid 
                    columns={columns} 
                    rows={items}
                    onEditRowsModelChange={handleEditRowsModelChange}
                    handleAddRow={handleOpenModal}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {/* Button */}
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

export default WorkCenter