import React, { useState, useMemo, useEffect } from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// API
import API from '../../../helpers';

// Components
import AutoComplete from './components/AutoComplete';
import AutoCompleteP from './components/AutoCompleteP';
import DataGrid from '../../../components/DataGrid';
import Modal from './components/ModalNewP';
import Modal2 from './components/ModalNewO';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function BillOfMaterial() {
  const [items, setItems] = useState([]);

  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);

  // Options for Product Feature
  const [options, setOptions] = useState([]);

  // Options for Product
  const [options3, setOptions3] = useState([]);
  
  // Options for Work Center
  const [options2, setOptions2] = useState([]);

  const [operation, setOperation] = useState([]);
  const [component, setComponent] = useState([]);

  //Modal Component of BOM 
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);

  //Modal Operation of BOM
  const [openMO, setOpenMO] = React.useState(false);
  const handleOpenModalO = () => setOpenMO(true);
  const handleCloseModalO = () => setOpenMO(false);

  //Data Grid Component of BOM
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  //Data Grid Opration of BOM
  const [editRowsModelO, setEditRowsModelO] = React.useState({});
  const [editRowDataO, setEditRowDataO] = React.useState({});

  const BOMSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    product_id: Yup.string().required('Product ID is required'),
    company_name: Yup.string().required('Company is required'),
    qty: Yup.number().required('Quantity BOM is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      product_id: '',
      product_feature_id: '',
      company_name: '',
      qty: '',
    },
    validationSchema: BOMSchema,
    onSubmit: (values) => {
      const _data = {...values, components: component, operations: operation}
      API.insertBOM(_data, (res)=>{
        if(!res.success) {
          alert('Failed');
        } else {
          alert('Success');
        }
      })
      setSubmitting(false)
    }
  })

  useEffect(() => {
    let active = true;

    (async () => {
      await API.getProductFeature((res) => {
        if(!res) return
		    if(!res.data) {
          setOptions([]);
        } else {
          setOptions(res.data);
        }
      })

      await API.getWorkCenter((res) => {
        if(!res) return
		    if(!res.data) {
          setOptions2([]);
        } else {
          setOptions2(res.data);
        }
      })

      await API.getProduct((res) => {
        if(!res) return
		    if(!res.data) {
          setOptions3([]);
        } else {
          setOptions3(res.data);
        }
      })

    })();

    return () => {
      active = false;
    };
  }, [loading])

  function changeData(data){
    setItems(data);
  }

  const { errors, touched, values, isSubmitting, setSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const goodsColumns = useMemo(() => [
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
          onClick={deleteDataComponent(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteDataComponent]);

  const operationColumns = useMemo(() => [
    { field: 'id', headerName: 'ID Feature', editable: false, hideable: true },
    { field: 'seq', headerName: 'seq', editable: true},
    { field: 'work_center_id', headerName: 'Work Center ID', editable: false },
    { field: 'name', headerName: 'Operation Name', editable: false, width: 250 },
    { field: 'actions', type: 'actions', width: 100, 
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Icon icon={trash2Outline} width={24} height={24} />}
          label="Delete"
          onClick={deleteDataOperation(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteDataOperation]);

  /**
   * Handling Data Grid for a Component BOM
   */

   const handleEditComponentRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setComponent((prevItems) => {
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


  /**
   * Handling Data Grid for a Operation BOM
   */

  const handleEditOperationRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        const editedIds = Object.keys(editRowsModel);
        const editedColumnName = Object.keys(editRowsModel[editedIds[0]])[0];

        //update items state
        setOperation((prevItems) => {
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

  const handleResetOperationRows = () => {
    setOperation([]);
  }

  const handleResetComponentRows = () => {
    setComponent([]);
  }

  const deleteDataComponent = React.useCallback(
    (id) => () => {
      setComponent((prevComponent) => {
        return prevComponent.filter((x) => (x.id !== id))
      });
  })

  const deleteDataOperation = React.useCallback(
    (id) => () => {
      setOperation((prevOperation) => {
        return prevOperation.filter((x) => (x.id !== id))
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
          setComponent={setComponent}
        />
        <Modal2
          payload={[]}
          open={openMO}
          options={options2}
          handleClose={handleCloseModalO}
          setComponent={setOperation}
        />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="BOM Information"
          />
          <CardContent>
            <TextField
              fullWidth
              autoComplete="name"
              type="text"
              label="BOM Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <AutoCompleteP
              fullWidth
              autoComplete="product_id"
              type="text"
              label="Product Id"
              error={Boolean(touched.product_id && errors.product_id)}
              helperText={touched.product_id && errors.product_id}
              options={options3}
              setOpen={setOpen}
              loading={loading}
              changeData={setFieldValue}
            />
            <AutoComplete
              fullWidth
              autoComplete="product_feature_id"
              type="text"
              label="Product Variant Id"
              error={Boolean(touched.product_feature_id && errors.product_feature_id)}
              helperText={touched.product_feature_id && errors.product_feature_id}
              options={options}
              setOpen={setOpen}
              loading={loading}
              changeData={setFieldValue}
            />
            <TextField
              fullWidth
              autoComplete="qty"
              type="text"
              label="Quantity"
              {...getFieldProps('qty')}
              error={Boolean(touched.qty && errors.qty)}
              helperText={touched.qty && errors.qty}
            />
            <TextField
              fullWidth
              autoComplete="company_name"
              type="text"
              label="Company Name"
              {...getFieldProps('company_name')}
              error={Boolean(touched.company_name && errors.company_name)}
              helperText={touched.company_name && errors.company_name}
            />
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Components"
          />
          <CardContent>
            <DataGrid 
              columns={goodsColumns}
              rows={component}
              handleAddRow={handleOpenModal}
              onEditRowsModelChange={handleEditComponentRowsModelChange}
              handleResetRows={handleResetComponentRows}
            />
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Operations"
          />
          <CardContent>
            <DataGrid 
              columns={operationColumns}
              rows={operation}
              handleAddRow={handleOpenModalO}
              onEditRowsModelChange={handleEditOperationRowsModelChange}
              handleResetRows={handleResetOperationRows}
            />
          </CardContent>
        </Card>
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
        </Form>
      </FormikProvider>
      </Container>
    </Page>
  )
}

export default BillOfMaterial