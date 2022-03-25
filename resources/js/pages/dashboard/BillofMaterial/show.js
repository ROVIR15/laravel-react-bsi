import React, { useState, useMemo, useEffect } from 'react'
import Page from '../../../components/Page';
import { Card, CardHeader, CardContent, Container, TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { GridActionsCellItem } from '@mui/x-data-grid';

// API
import API from '../../../helpers';

// Components
import AutoComplete from './components/AutoComplete';
import DataGrid from '../../../components/DataGrid';
import Modal from './components/Modal';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

function BillOfMaterial() {
  const {id} = useParams();

  const [options, setOptions] = useState([]);
  const [vAC, setVAC] = useState({});

  const loading = open && options.length === 0;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [component, setComponent] = useState([]);

  //Modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenModal = () => setOpenM(true);
  const handleCloseModal = () => setOpenM(false);


  //Data Grid
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});


  //AutoComplete Product Feaure
  const [items, setItems] = useState([]);


  const BOMSchema = Yup.object().shape({
    inquiry_id: Yup.string().required('Inquiry References is required'),
    id: Yup.string().email('Email must be a valid email address').required('Email is required'),
    sold_to: Yup.string().required('Name is required'),
    ship_tp: Yup.string().required('Address is required'),
    po_number: Yup.string().required('city is required'),
    po_date: Yup.string().required('province is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      product_id: '',
      company_name: '',
      qty: '',
    },
    validationSchema: BOMSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  })

  const { errors, touched, values, setValues, isSubmitting, handleSubmit, getFieldProps } = formik;

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
    })();

    return () => {
      active = false;
    };
  }, [loading])

  function changeData(data){
    setItems(data);
  }

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
          onClick={deleteData(params.id)}
          showInMenu
        />
      ]
    }
  ], [deleteData]);

  /**
   * Handling GET Bill of Material Information from spesific bom_id
   */
  useEffect(async () => {
    if(!id) return;

    const load = await axios.get('http://localhost:8000/api' + '/bom' + `/${id}`)
    .then(function({data: {data}}) {
      return(data);
    }).catch((error) => {
        console.log(error);
    })

    setValues({
      id: load.id,
      product_id: load.product_id,
      product_feature_id: load.product_feature_id,
      name: load.name,
      qty: load.qty,
      company_name: load.company_name
    })

    const load2 = await axios.get('http://localhost:8000/api' + '/bom-item' + `/${id}`)
    .then(function({data: {data}}) {
      return(data);
    }).catch((error) => {
      console.log(error);
    })

    var c = load2.map((key)=>{
      const { product_feature } = key
      return {...product_feature, product_feature_id: key.product_feature_id, id: key.id, bom_id: key.bom_id, qty: key.qty, company_name: key.company_name}
    })
    setComponent(c);

    /**
     * GET Product Feature Data
     */

    const load3 = await axios.get('http://localhost:8000/api' + '/product-feature')
    .then(function({data: {data}}) {
      return(data);
    }).catch((error) => {
      console.log(error);
    })

    // Set to Autocomplete product_feature option variable
    setOptions(load3);

    // Find selected product feature from bom item
    const selectedOptionProductFeature = load2.map((option) => (option.product_feature));

    // set to item on selected;
    setItems(selectedOptionProductFeature);

    if(!vAC) {
      (async () => {
        await API.getAProductFeature(load.product_feature_id, (res) => {
          if(!res) return
          if(!res.data) {
            setVAC({});
          } else {
            setVAC(res.data);
          }
        })
      })();
    } 

  }, [id]);

  /**
   * Handling Data Grid for a Component BOM
   */

  const handleEditRowsModelChange = React.useCallback(
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

  const handleResetRows = () => {
    setComponent([]);
  }

  const deleteData = React.useCallback(
    (id) => () => {
      setComponent((prevComponent) => {
        return prevComponent.filter((x) => (x.id !== id))
      });
  })

  return (
    <Page>
      <Container>
        <Modal
          payload={items}
          open={openM}
          options={options}
          handleClose={handleCloseModal}
          setComponent={setComponent}
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
            <AutoComplete
              fullWidth
              autoComplete="product_id"
              type="text"
              label="Product Id"
              error={Boolean(touched.product_id && errors.product_id)}
              helperText={touched.product_id && errors.product_id}
              options={options}
              setOpen={setOpen}
              loading={loading}
              choosen={vAC}
            />
            <AutoComplete
              fullWidth
              autoComplete="product_feature_id"
              type="text"
              label="Product Feature Id"
              error={Boolean(touched.product_feature_id && errors.product_feature_id)}
              helperText={touched.product_feature_id && errors.product_feature_id}
              options={options}
              setOpen={setOpen}
              loading={loading}
              choosen={vAC}
              changeData={changeData}
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
              onEditRowsModelChange={handleEditRowsModelChange}
              handleResetRows={handleResetRows}
            />
          </CardContent>
        </Card>
        <Card sx={{ m: 2, '& .MuiTextField-root': { m: 1 } }}>
          <CardHeader
            title="Operations"
          />
          <CardContent>
            <DataGrid />
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