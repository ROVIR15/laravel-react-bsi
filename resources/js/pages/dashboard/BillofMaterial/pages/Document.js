import React, { useState, useEffect, useRef } from 'react';

import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';

import { useLocation, useParams } from 'react-router-dom';

// Components
import Table from '../components/Table';
import TableCM from '../components/TableCM';
import TableComponent from '../components/TableComponent';
import TableService from '../components/TableService';
import { MHidden } from '../../../../components/@material-extend';
import Page from '../../../../components/Page';
import { fDate, dateDifference } from '../../../../utils/formatTime';

// axios
import axios from 'axios';
import API from '../../../../helpers';
import { bomDocumentArranged } from '../../../../helpers/data';

//Icons
import editFill from '@iconify/icons-eva/edit-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

//Comtext
import useAuth from '../../../../context';
import { getPages } from '../../../../utils/getPathname';

import { jsPDF } from 'jspdf';
import { toBlob, toPng } from 'html-to-image';
import Dialog from '../../../../components/DialogBox/dialog';
import DialogDraggable from '../components/DialogBoxDragable';
import { sum } from 'lodash';
import { fPercent } from '../../../../utils/formatNumber';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: 180,
    background: '#666666'
  }
}));

const FloatingBox = styled(Box)(({ theme }) => ({
  padding: '4px 30px',
  bottom: '24px',
  zIndex: '999',
  position: 'fixed',
  boxShadow: 'rgb(99 115 129 / 36%) -12px 12px 32px -4px',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  minWidth: '72rem'
}));

const SpaceBetween = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0.5rem'
}));

const IDontKnow = styled('span')(({ theme }) => ({
  height: '22px',
  minWidth: '22px',
  lineHeight: '0',
  borderRadius: '6px',
  cursor: 'default',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  justifyContent: 'center',
  padding: '0px 8px',
  color: 'rgb(86, 187, 241)',
  fontSize: '1.25rem',
  backgroundColor: 'rgb(77, 119, 255, 0.2)',
  fontWeight: '700',
  textTransform: 'uppercase',
  marginBottom: '8px'
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: 4,
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(33, 43, 54)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundImage: 'none',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
    borderRadius: '16px',
    zIndex: '0',
    paddingTop: '40px',
    paddingLeft: '40px',
    paddingRight: '40px'
  }
}));

const GridItemX = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden'
}));

function Document() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [service, setService] = useState([]);
  const [op, setOp] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const pdfRef = useRef(null);

  const { user } = useAuth();
  const { pathname } = useLocation();

  const [margin, setMargin] = useState('0');
  const [startingPrice, setStartingPrice] = useState('0');
  const [finalPrice, setFinalPrice] = useState('0');

  const [submit, setSubmit] = useState(false);
  const [review, setReview] = useState(false);
  const [approve, setApprove] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentCtn, setCommentCtn] = useState('');
  const [warning, setWarning] = useState({
    title: '',
    message: ''
  });

  //Dialog Draggable
  const [dialogDragableActive, setDialogDragableActive] = useState(false);
  const handleOpenDialogDraggable = () => {
    setDialogDragableActive(true);
  };

  const handleCloseDialogDraggable = () => {
    setDialogDragableActive(false);
  };

  const [status, setStatus] = useState({});

  function handleDialog(key) {
    switch (key) {
      case 'submit':
        setWarning({
          title: 'Submit Sales Order?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'submit',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'review':
        setWarning({
          title: 'Review Sales Order?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'review',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'approve':
        setWarning({
          title: 'Apporve Sales Order?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'approve',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      default:
        break;
    }
  }

  const handleDownloadPng = React.useCallback(() => {
    const content = pdfRef.current;

    // toBlob(content, {cacheBust: true})
    // .then((blob) => {
    //   const doc = new jsPDF();

    //   doc.addImage(blob);
    //   doc.save('hehe.pdf')
    // })
    // .catch((err) => {
    //   alert(err)
    // })

    toPng(content, { cacheBust: true })
      .then((dataUrl) => {
        const doc = new jsPDF();

        doc.addImage(dataUrl, 5, 5);
        doc.save('hehe.pdf');
      })
      .catch((err) => {
        alert(err);
      });
  }, [pdfRef]);

  // state for document
  const [data, setData] = useState({
    bom_id: '',
    bom_name: '',
    goods_name: '',
    size: '',
    color: '',
    margin: 0,
    tax: 0,
    start_date: '',
    end_date: '',
    labor_alloc: 0,
    many_operations: 0,
    many_components: 0,
    total_cost: 0,
    total_overhead: 0,
    total_goods: 0
  });

  useEffect(() => {
    const { role } = user;
    const name = getPages(pathname.split('/'));

    role.map(function (x) {
      if (x.name === name) {
        setSubmit(Boolean(x.submit));
        setReview(Boolean(x.review));
        setApprove(Boolean(x.approve));
      }
    });
  }, []);

  useEffect(() => {
    let active = true;

    handleUpdateData();

    return () => {
      active = false;
    };
  }, [id]);

  const handleUpdateData = () => {
    try {
      API.getABOM(id, async (res) => {
        if (!res) return undefined;
        let ras = await bomDocumentArranged(res.data);
        setData(ras);
        setMargin(res.data?.margin);
        setImageUrl(ras.imageUrl);
        setItems(res.data?.bom_items);
        setService(res.data?.bom_services);
        setOp(res.data?.operations);
        setStartingPrice(res.data?.starting_price);
        setFinalPrice(res.data?.final_price);
        setStatus(res.data?.status[0]);
      });
    } catch (error) {
      alert('error');
    }
  };

  const { bom_name, goods_name, size, color, start_date, end_date, ...rest } = data;

  useEffect(() => {
    const { cm_cost, average_of_product_cost, average_add_cost } = rest;
    let _offerPrice = sum([cm_cost, average_of_product_cost, average_add_cost]);
    if (parseFloat(finalPrice) !== 0) {
      let margin = (finalPrice - _offerPrice) / _offerPrice;
      margin = margin * 100;
      setMargin(margin);
    }
  }, [finalPrice]);

  function handleSubmission(key, description) {
    let payload = {
      user_id: user.id,
      status_type: '',
      bom_id: data.bom_id,
      final_price: finalPrice
    };
    switch (key) {
      case 'submit':
        payload = { ...payload, status_type: 'Submit', description: '' };
        break;

      case 'review':
        payload = { ...payload, status_type: 'Review', description };
        try {
          API.updateBOM(data.bom_id, { margin, final_price: finalPrice }, (res) => {
            if (!res) return undefined;
            if (!res.success) return undefined;
            alert('success');
          });
        } catch (error) {
          alert(error);
        }
        break;

      case 'reject-review':
        payload = { ...payload, status_type: 'Dropped', description };
        try {
          API.updateBOM(data.bom_id, { margin, final_price: finalPrice }, (res) => {
            if (!res) return undefined;
            if (!res.success) return undefined;
            alert('success');
          });
        } catch (error) {
          alert(error);
        }
        break;

      case 'approve':
        payload = { ...payload, status_type: 'Approve', description: '' };
        try {
          API.updateBOM(data.bom_id, { margin, final_price: finalPrice }, (res) => {
            if (!res) return undefined;
            if (!res.success) return undefined;
            alert('success');
          });
        } catch (error) {
          alert(error);
        }
        break;

      case 'reject-approve':
        payload = { ...payload, status_type: 'Dropped', description };
        try {
          API.updateBOM(data.bom_id, { margin, final_price: finalPrice }, (res) => {
            if (!res) return undefined;
            if (!res.success) return undefined;
            alert('success');
          });
        } catch (error) {
          alert(error);
        }
        break;

      default:
        payload;
        break;
    }
    // alert(JSON.stringify(payload));
    // return;
    try {
      API.insertBOMStatus(payload, (res) => {
        if (!res) return undefined;
        if (!res.success) new Error('Failed');
        else alert('Success');
      });
    } catch (error) {
      alert('error');
    }

    setDialogOpen(false);
    handleUpdateDate();
  }

  return (
    <MHidden width="mdDown">
      <DialogDraggable
        bom_id={id}
        open={dialogDragableActive}
        handleClose={handleCloseDialogDraggable}
      />
      <Dialog
        title={warning.title}
        message={warning.message}
        setOpen={setDialogOpen}
        open={dialogOpen}
        comment={comment}
        setComment={setComment}
        type={warning.type}
        send={warning.send}
      />
      <FloatingBox>
        <SpaceBetween>
          <div>
            <IconButton>
              <Icon icon={editFill} onClick={handleOpenDialogDraggable} width={20} height={20} />
            </IconButton>
            <IconButton>
              <Icon icon={downloadFill} width={20} height={20} />
            </IconButton>
          </div>
          <div>
            <Button onClick={() => handleDialog('submit')} disabled={!submit}>
              Submit
            </Button>
            <Button
              onClick={() => handleDialog('review')}
              disabled={!review || status?.status_type?.toLowerCase() === 'approve'}
            >
              Review
            </Button>
            <Button
              onClick={() => handleDialog('approve')}
              disabled={!approve || status?.status_type?.toLowerCase() === 'approve'}
            >
              Tandai Approve
            </Button>
          </div>
        </SpaceBetween>
      </FloatingBox>
      <PaperStyled elevation={2} sx={{}}>
        {/* Product Info */}
        <Grid
          container
          spacing={3}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexFlow: 'row wrap',
            width: '100%'
          }}
        >
          <Grid item md={6} sx={{ width: '50%', marginBottom: '1em' }}>
            <Box
              component="img"
              src="/data_file/bsi_logo.jpeg"
              sx={{ width: '15%', height: '80px', marginLeft: '0.75 em' }}
            />
          </Grid>
          <Grid item={6} sx={{ width: '50%', marginBottom: '1em' }}>
            <Box sx={{ textAlign: 'right' }}>
              <IDontKnow>Costing</IDontKnow>
              <Typography variant="h3">{bom_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider fullWidth />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Box
              sx={{
                width: '65%',
                lineHeight: '0',
                display: 'block',
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '100%',
                cursor: 'zoom-in',
                padding: '8px',
                margin: 'auto'
              }}
            >
              <Box
                component="img"
                src={imageUrl ? imageUrl : null}
                sx={{
                  height: '300px',
                  margin: 'auto',
                  objectFit: 'cover',
                  borderRadius: '16px'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Box sx={{ marginTop: '30px' }}>
              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  Product Name
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                  {goods_name}
                </Typography>
              </div>

              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  Variant
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                  {`${color} - ${size}`}
                </Typography>
              </div>

              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  Expected Start Date
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                  {start_date ? fDate(start_date) : '-'}
                </Typography>
              </div>
              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  Expected End Date
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                  {end_date ? fDate(end_date) : '-'}
                </Typography>
              </div>
              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  Work Duration
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                  {data.total_work_days} Days
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
        <GridItemX sx={{ marginTop: 8, marginBottom: 4 }}>
          {/**
           *
           * Table Primary
           */}
          <Table
            payload={rest}
            approval={approve}
            review={review}
            margin={margin}
            setMargin={setMargin}
            startingPrice={startingPrice}
            finalPrice={finalPrice}
            setFinalPrice={setFinalPrice}
            tax={data.tax}
            status={status?.status_type?.toLowerCase() === 'approve'}
          />
        </GridItemX>
        <Divider fullWidth />
        <Grid container>
          <Box sx={{ marginBottom: 15 }}>
            <Typography variant="h6">This Document Generated Automatically</Typography>
          </Box>
        </Grid>
      </PaperStyled>

      <PaperStyled>
        <Grid
          container
          spacing={3}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexFlow: 'row wrap',
            width: '100%'
          }}
        >
          <Grid item md={6} sx={{ width: '50%', marginBottom: '1em' }}>
            <Box
              component="img"
              src="/data_file/bsi_logo.jpeg"
              sx={{ width: '15%', height: '80px', marginLeft: '0.75 em' }}
            />
          </Grid>
          <Grid item={6} sx={{ width: '50%', marginBottom: '1em' }}>
            <Box sx={{ textAlign: 'right' }}>
              <IDontKnow>Costing</IDontKnow>
              <Typography variant="h3">{bom_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider fullWidth />
          </Grid>
        </Grid>

        <Grid item>
          <Typography m={2} variant="h5">
            Breakdown Material Cost
          </Typography>
        </Grid>
        <GridItemX sx={{ marginTop: 3, marginBottom: 4 }}>
          <TableComponent payload={items} tax={data.tax} />
        </GridItemX>
        <Divider fullWidth />
        <Grid container>
          <Box sx={{ marginBottom: 15 }}>
            <Typography variant="h6">This Document Generated Automatically</Typography>
          </Box>
        </Grid>
      </PaperStyled>

      <PaperStyled>
        <Grid
          container
          spacing={3}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexFlow: 'row wrap',
            width: '100%'
          }}
        >
          <Grid item md={6} sx={{ width: '50%', marginBottom: '1em' }}>
            <Box
              component="img"
              src="/data_file/bsi_logo.jpeg"
              sx={{ width: '15%', height: '80px', marginLeft: '0.75 em' }}
            />
          </Grid>
          <Grid item={6} sx={{ width: '50%', marginBottom: '1em' }}>
            <Box sx={{ textAlign: 'right' }}>
              <IDontKnow>Costing</IDontKnow>
              <Typography variant="h3">{bom_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider fullWidth />
          </Grid>
        </Grid>
        <Grid item>
          <Typography m={2} variant="h5">
            Breakdown Service Cost
          </Typography>
        </Grid>
        <GridItemX sx={{ marginTop: 3, marginBottom: 4 }}>
          <TableService payload={service} qty={data?.qty} tax={data.tax} />
        </GridItemX>

        <Grid item>
          <Typography m={2} variant="h5">
            Breakdown CM Cost
          </Typography>
        </Grid>
        <GridItemX sx={{ marginTop: 3, marginBottom: 4 }}>
          <TableCM payload={op} qty={data?.qty} tax={data.tax} />
        </GridItemX>

        <Divider fullWidth />
        <Grid container>
          <Box sx={{ marginBottom: 15 }}>
            <Typography variant="h6">This Document Generated Automatically</Typography>
          </Box>
        </Grid>
      </PaperStyled>
    </MHidden>
  );
}

export default Document;
