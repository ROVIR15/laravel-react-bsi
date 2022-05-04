import React, {useState, useMemo} from 'react'
import Page from '../../../../components/Page';
import { Card, CardHeader, CardContent, Container, Grid, TextField, Paper, Button, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import { LoadingButton } from '@mui/lab';

// API
import API from '../../../../helpers';

// Components
import DataGrid from './components/DataGrid';
import Modal from './components/Modal';
import { GridActionsCellItem } from '@mui/x-data-grid';

//Dialog Component
import DialogBox from './components/DialogBox';

//Icons
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

const TextBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

const InsideTextBox = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  justifyContent: "space-between", 
  marginBottom: "8px"
}))

function ProductionStudy() {
  //AutoComplete props
  const [options, setOptions] = useState([]);

  //Dialog Interaction
  const [openDP, setOpenDP] = useState(false);
  const [selectedValueP, setSelectedValueP] = React.useState({});
  const loadingP = openDP && options.length === 0;
  
  const [openDWC, setOpenDWC] = useState(false);
  const loadingWC = openDWC && options.length === 0;
  const [selectedValueWC, setSelectedValueWC] = React.useState({});
  
  const ProductionStudySchema = Yup.object().shape({
    product_id: Yup.string().required('product is required'),
    work_center_id: Yup.string().required('work center is required'),
  });

  const formik = useFormik({
    initialValues: {
      product_id: '',
      work_center_id: '',
    },
    validationSchema: ProductionStudySchema,
    onSubmit: (values) => {
      const _data = {...values, process_list: items};
      API.insertProductionStudy(_data, (res)=>{
        if(!res.success) {
          alert('Failed');
        } else {
          alert('Success');
        }
      })
      setSubmitting(false)
    }
  })

  const { errors, touched, values, setFieldValue, isSubmitting, setSubmitting, handleSubmit } = formik;

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loadingP) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getProduct((res) => {
          if(!res) return
          else setOptions(res.data);
        })
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingP])

  // Preapre data from work center
  React.useEffect(() => {
    let active = true;

    if (!loadingWC) {
      return undefined;
    }

    setOptions([]);

    (async () => {
      if (active) {
        API.getWorkCenter((res) => {
          if(!res) return
          else setOptions(res.data);
        })
      }
    })();
    
    return () => {
      active = false;
    };
  }, [loadingWC])

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

  //Handle Close Dialog
  const handleCloseP = (value) => {
    setOpenDP(false);
    setSelectedValueP(value);
    setFieldValue('product_id', value.id);
    setOptions([]);
  };

  const handleCloseWC = (value) => {
    setOpenDWC(false);
    setSelectedValueWC(value);
    setFieldValue('work_center_id', value.id);
    setOptions([]);
  };

  const processItems = useMemo(() => [
    { field: 'id', headerName: 'ID', editable: false, visible: 'hide' },
    { field: 'process_id', headerName: 'ID Process', editable: false, visible: 'hide' },
    { field: 'process_name', headerName: 'Nama Process', editable: false, width: 200 },
    { field: 'labor_id', headerName: 'ID Pekerja', editable: false},
    { field: 'labor_name', headerName: 'Nama Pekerja', editable: false, width: 200 },
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
        handleClose={handleCloseModal}
        setComponent={setItems}
      />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack component="div" spacing={2}>
            <Card >
              <CardHeader
                title="Product"
                action={
                  <Button
                    onClick={() => setOpenDP(true)}
                  >
                    Select
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="body1">
                  {selectedValueP.name}
                </Typography>
              </CardContent>
              <DialogBox
                options={options}
                loading={loadingP}
                error={Boolean(touched.product_id && errors.product_feature_id)}
                helperText={touched.product_id && errors.product_id}
                selectedValue={selectedValueP}
                open={openDP}
                onClose={handleCloseP}
              />
            </Card>
            <Card >
              <CardHeader
                title="Type of Work"
                action={
                  <Button
                    onClick={() => setOpenDWC(true)}
                  >
                    Select
                  </Button>
                }
              />
              <CardContent>
                <Typography variant="body1">
                  {selectedValueWC.name}
                </Typography>
              </CardContent>
              <DialogBox
                options={options}
                loading={loadingWC}
                error={Boolean(touched.work_center_id && errors.work_center_id)}
                helperText={touched.work_center_id && errors.work_center_id}
                selectedValue={selectedValueWC}
                open={openDWC}
                onClose={handleCloseWC}
              />
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Card >
            <CardHeader
              title="Item Overview"
            />
            <CardContent>
              <DataGrid 
                columns={processItems}
                rows={items}
                handleAddRow={handleOpenModal}
                onEditRowsModelChange={handleEditRowsModelChange}
                handleResetRows={handleResetRows}
              />
            </CardContent>
          </Card>
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

export default ProductionStudy;