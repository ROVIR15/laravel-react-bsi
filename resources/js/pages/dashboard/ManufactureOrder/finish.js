import * as React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Paper,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    Popover
} from '@mui/material';

import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import Scrollbar from '../../../components/Scrollbar'
import Page from '../../../components/Page';

import API from '../../../helpers'
import { styled } from '@mui/material/styles';

import DialogBox from './components/DB222';
import { id } from 'date-fns/locale';
import { array } from 'yup';

const ListItemStyled = styled(ListItem)(({ theme }) => ({
    WebkitTapHighlightColor: "transparent", 
    backgroundColor: "transparent", 
    outline: "0px", 
    border: "0px", 
    margin: "0px", 
    cursor: "pointer", 
    userSelect: "none", 
    verticalAlign: "middle", 
    appearance: "none", 
    color: "inherit", 
    display: "flex", 
    flexGrow: "1", 
    justifyContent: "flex-start", 
    position: "relative", 
    textDecoration: "none", 
    minWidth: "0px", 
    boxSizing: "border-box", 
    textAlign: "left", 
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
    padding: "12px", 
    borderRadius: "8px", 
    flexDirection: "column", 
    alignItems: "flex-start"
  }))

const SpaceBetweenBox = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  justifyContent: "space-between", 
  marginBottom: "8px"
}))

function ListOfFacility({something, set}){
  /**
   * Popover
   */
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
 
   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;

  /**
   * List Options
   */
  const [options, setOptions] = React.useState([]);
  const loading = Boolean(open) && options.length === 0;
  const [selectedValue, setSelectedValue] = React.useState();

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getFacility((res) => {
          if(!res) return
          else setOptions(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loading])

  // Handle Selected Option
  const handleSelected = (value) => {
      set(value);
      handleClose();
  } 

  /**
   * Dialog Box
   */
  const [openDB, setOpenDB] = React.useState(false);
  
    return (
        <List component="div" role="group">
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="product-name"
            aria-label="Product Name"
            onClick={handleClick}
          >
            <ListItemText primary="Facility Name" secondary={something ? `${something.name}` : 'Halah'} />
          </ListItem>
          <Popover
            id={id}
            open={anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List sx={{ pt: 0 }}>
              <Scrollbar sx={{
                  padding: '0px 12px 12px',
                  maxHeight: 640,
              }}>
                <SpaceBetweenBox>
                  <Typography variant="body1"> Facility </Typography>
                </SpaceBetweenBox>
              { 
                (options.length === 0) ? <Typography>Loading</Typography> : ( 
                options.map((item) => (
                  <ListItemStyled 
                    button 
                    onClick={() => handleSelected(item)}
                    selected={something ? something.id === item.id : null}
                    key={item.id}
                  >
                    <Typography variant="subtitle2">{`${item.name}`}</Typography>
                    <Typography component="span" variant="caption">{item.category}</Typography>
                  </ListItemStyled>
                )))
              }
              </Scrollbar>
            </List>
          </Popover>  

        </List>

  )
}

function ListOfProduct({something, set}){
  /**
   * Popover
   */
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
 
   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;

  /**
   * List Options
   */
  const [options, setOptions] = React.useState([]);
  const loading = Boolean(open) && options.length === 0;
  const [selectedValue, setSelectedValue] = React.useState();

  // Preapre data from product
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        API.getProductFeature((res) => {
          if(!res) return
          else setOptions(res.data);
        })  
      }
    })();

    return () => {
      active = false;
    };
  }, [loading])

  // Handle Selected Option
  const handleSelected = (value) => {
      set(value);
      handleClose();
  } 

  /**
   * Dialog Box
   */
  const [openDB, setOpenDB] = React.useState(false);
  
    return (
        <List component="div" role="group">
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="product-name"
            aria-label="Product Name"
            onClick={handleClick}
          >
            <ListItemText primary="Product Name" secondary={something ? `${something.name} ${something.size} - ${something.color}` : 'Halah'} />
          </ListItem>
          <Popover
            id={id}
            open={anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <List sx={{ pt: 0 }}>
              <Scrollbar sx={{
                  padding: '0px 12px 12px',
                  maxHeight: 640,
              }}>
                <SpaceBetweenBox>
                  <Typography variant="h6"> Product </Typography>
                  <Button
                    onClick={() => setOpenDB(true)}
                  >
                    Add
                  </Button>
                </SpaceBetweenBox>
              { 
                (options.length === 0) ? <Typography>Loading</Typography> : ( 
                options.map((item) => (
                  <ListItemStyled 
                    button 
                    onClick={() => handleSelected(item)}
                    selected={something ? something.id === item.id : null}
                    key={item.id}
                  >
                    <Typography variant="subtitle2">{`${item.name} ${item.size} - ${item.color} `}</Typography>
                    <Typography component="span" variant="caption">{item.category}</Typography>
                    <Typography variant="body2">{item.brand}</Typography>
                  </ListItemStyled>
                )))
              }
              </Scrollbar>
            </List>
          </Popover>  

          <DialogBox open={openDB} handleClose={() => setOpenDB(false)} />        

        </List>

  )
}

function QuantityForm({ getFieldProps, touched, value, errors }) {
  return (
    <Stack spacing={2}>
      <TextField
        fullWidth
        autoComplete="qty_produced"
        type="number"
        label="Quantity Produced"
        disabled
        {...getFieldProps('qty_produced')}
        values={value.qty_produced}
      />
      <TextField
        fullWidth
        autoComplete="qty_rejected"
        type="number"
        label="Quantity Rejected"
        {...getFieldProps('qty_rejected')}
        error={Boolean(touched.qty_rejected && errors.qty_rejected)}
        helperText={touched.qty_rejected && errors.qty_rejected}
        values={value.qty_rejected}
      />
    </Stack>
  )
}

export default function VerticalLinearStepper() {
  const { id, manufacture_operation_id } =  useParams()
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /**
   * Stepper
   */
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetS = () => {
    setActiveStep(0);
  };

  /**
   * Formik
   */

  const formik = useFormik({
    initialValues: {
      manufacture_order_id: '',
      product_feature_id: '',
      qty_rejected: 0,
      qty_produced: 0
    },
    onSubmit: (values)=> {
      API.insertProductionRecord(values, (res) => {
        if(!res) return undefined;
        if(!res.success) alert('failed')
        else alert('success');
      })
      handleResetS();
      handleReset();
    }
  })

  const { errors, touched, values, isSubmitting, setSubmitting, handleReset, handleSubmit, getFieldProps, setFieldValue, setValues } = formik;

  /**
   * Selected Value for Product Choosen
   */
  
  const [selectedValue, setSelectedValue] = React.useState({});
  const [selectedValueFacility, setSelectedValueFacility] = React.useState({});

  const handleSet = (value) => {
    setSelectedValue(value);
    setFieldValue('product_feature_id', value.id);
  }

  const handleSetFacility = (value) => {
    setSelectedValueFacility(value);
    setFieldValue('facility_id', value.id);
  }

  const steps = [
    {
      label: 'Please Read This',
      description: `After click 'done' it will be recorded by the system as work result, you cannot repeat the process please check.
      You may be asked to fill the name and type of goods result.`
      ,
    },
    {
      label: 'Select Product',
      description: <ListOfProduct something={selectedValue} set={(value) => handleSet(value)} />
    },
    {
      label: 'Select Facility',
      description: <ListOfFacility something={selectedValueFacility} set={(value) => handleSetFacility(value)} />
    },
    {
      label: 'Confirm Quantity',
      description: <QuantityForm getFieldProps={getFieldProps} touched={touched} value={values} errors={errors}/>
    },
    {
      label: 'Record It',
      description: `Your work is going to be submitted if you have anything to change plese go back to previous step.`,
    },
  ];

  /**
   * processing data
   */

  React.useEffect(() => {

    const sumOfProducedQty = (var1) => {
      if(!Array.isArray(var1)) return undefined;
      let total = 0;
      var1.map((item) => {
        total = item.qty_produced + total;
      })
      return total;
    }

    const payload = JSON.parse(localStorage.getItem('data'));
    if(!payload) alert(failed);
    else {
      let totalProducedQty = sumOfProducedQty(payload.result);
      console.log(totalProducedQty, payload);
      setValues({
        manufacture_order_id: id,
        manufacture_operation_id,
        qty_produced: totalProducedQty
      })
    }

  }, [])

  return (
    <Paper>
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4}}>
        <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                <Typography variant="h6">{step.label}</Typography>
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Sure' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button type='submit' sx={{ mt: 1, mr: 1 }}>
              Done
            </Button>
          </Paper>
        )}
          </Form>
        </FormikProvider>
      </Box>
    </Paper>
  );
}
