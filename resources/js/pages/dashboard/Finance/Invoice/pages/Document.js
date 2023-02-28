import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../../components/Page';

import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';
import moment from 'moment';

import { Box, Button, IconButton, Grid, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../../../../components/@material-extend';

//Icons
import editFill from '@iconify/icons-eva/edit-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

// Components
import Table from '../components/TableINV';
import Dialog from '../../../../../components/DialogBox/dialog';

// API
import API from '../../../../../helpers/index';
import { _partyAddress } from '../../../../../helpers/data';
import { generateInvSerialNumber } from '../../utils';

//pdf
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import useAuth from '../../../../../context';
import { getPages } from '../../../../../utils/getPathname';

//utils
import { isEmpty, isEqual, uniqBy } from 'lodash';
import QRCode from 'react-qr-code';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
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

const SpaceBetween = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '40px'
}));

function FirstPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const pdfRef = useRef(null);
  const { pathname } = useLocation();

  const [invInfo, setInvInfo] = useState({
    invoice_date: '',
    invoice_id: '',
    total_price: 0
  });
  const [items, setItems] = useState([]);
  const [terms, setTerms] = useState([]);

  const [selectedValueSO, setSelectedValueSO] = React.useState({
    name: '',
    address: '',
    postal_code: 0
  });

  const [selectedValueSH, setSelectedValueSH] = React.useState({
    name: 'PT. Buana Sandang Indonesia',
    address:
      'Jl. Raya Albisindo Desa Gondosari, RT/RW 02/06, Kec. Gebog, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 59354,
    phone_number: '(0291) 4251259'
  });

  React.useEffect(() => {
    try {
      API.getASalesInvoice(id, '?invoice_type=1', (res) => {
        if (!res) return;
        if (!res.data) alert('failed to load data');
        else {
          changeData(res.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }, [id]);

  const changeData = (payload) => {
    function total(qty, price) {
      return qty * price;
    }

    const temp = payload.items.map((item, index) => {
      const { order_item, ...rest } = item;
      return {
        id: rest.id,
        order_item_id: order_item.id,
        name: `${order_item.product_feature?.product?.goods?.name} ${order_item.product_feature.color} - ${order_item.product_feature.size}`,
        qty: rest.qty,
        amount: rest.amount,
        total: total(rest.qty, rest.amount)
      };
    });

    let _data = _partyAddress(payload.party);
    setSelectedValueSO({
      name: _data.name,
      address: `${_data.street} ${_data.city} ${_data.province} ${_data.country}`,
      postal_code: _data.postal_code
    });

    setInvInfo({
      invoice_date: payload.invoice_date,
      due_date: payload.due_date,
      invoice_id: generateInvSerialNumber(payload, 1),
      total_price: 0,
      description: payload.description,
      tax: payload.tax
    });

    setItems(temp);

    setTerms(payload.terms);

    // submission status
    let _statusOrderData = uniqBy(payload.submission, 'status_type');

    console.log(_statusOrderData)

    let _isReviewed = _statusOrderData.filter(
      (item) => item.status_type.toLowerCase() === 'review'
    );
    let _isSubmitted = _statusOrderData.filter(
      (item) => item.status_type.toLowerCase() === 'submit'
    );
    
    if(_isSubmitted.length > 0) {
      // let salt = _isSubmitted?.id + _isSubmitted?.order_id + _isSubmitted?.user_id;
      let { user_info, ...rest } = _isSubmitted[0];
      setValueSubmit({id: rest.id, created_at: rest.created_at, name: user_info?.name, email: user_info?.email, status: 'Signed by submitter'});
      setIsSubmitted(true);
    }

    if(_isReviewed.length > 0) {
      // let salt = _isReviewed?.id + _isReviewed?.order_id + _isReviewed?.user_id;
      let { user_info, ...rest } = _isReviewed[0];
      setValueReview({id: rest.id, created_at: rest.created_at, name: user_info?.name, email: user_info?.email, status: 'Signed by reviewer'});
      setIsReviewed(true);
    }

    console.log(_isReviewed, _isSubmitted)
  };

  const handleDownload = React.useCallback(() => {
    const content = pdfRef.current;

    setTimeout(() => {
      html2canvas(content, { scale: 3, allowTaint: true, useCORS: true }).then((canvas) => {
        const image = { type: 'jpeg', quality: 0.98 };
        const margin = [0.2, 0.2];
        const filename = 'myfile.pdf';

        var imgWidth = 8.5;
        var pageHeight = 11;

        var innerPageWidth = imgWidth - margin[0] * 2;
        var innerPageHeight = pageHeight - margin[1] * 4;

        // Calculate the number of pages.
        var pxFullHeight = canvas.height;
        var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
        var nPages = Math.ceil(pxFullHeight / pxPageHeight);

        // Define pageHeight separately so it can be trimmed on the final page.
        var pageHeight = innerPageHeight;

        // Create a one-page canvas to split up the full image.
        var pageCanvas = document.createElement('canvas');
        var pageCtx = pageCanvas.getContext('2d');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pxPageHeight;

        // Initialize the PDF.
        var pdf = new jsPDF('p', 'in', [8.5, 11]);

        for (var page = 0; page < nPages; page++) {
          // Trim the final page to reduce file size.
          if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
            pageCanvas.height = pxFullHeight % pxPageHeight;
            pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
          }

          // Display the page.
          var w = pageCanvas.width;
          var h = pageCanvas.height;
          pageCtx.fillStyle = 'white';
          pageCtx.fillRect(0, 0, w, h);
          pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

          // Add the page to the PDF.
          if (page > 0) pdf.addPage();
          debugger;
          var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
          pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
        }

        pdf.save();
      });
    }, 1000);
  }, [pdfRef]);

  /**
   * Dialog for submission process.
   */

  // variable for submission dialog
  const [submit, setSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [review, setReview] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [approve, setApprove] = useState(true);

  const [valueSubmit, setValueSubmit] = useState(false);
  const [valueReview, setValueReview] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentCtn, setCommentCtn] = useState('');
  const [warning, setWarning] = useState({
    title: '',
    message: ''
  });

  //handle tile, message, type on dialog
  function handleDialog(key) {
    switch (key) {
      case 'submit':
        setWarning({
          title: 'Submit Purchase Order?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'submit',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'review':
        setWarning({
          title: 'Review?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'review',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'approve':
        setWarning({
          title: 'Apporve?',
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

  // set variable when its initila load
  useEffect(() => {
    const { role } = user;
    console.log(role)
    const name = getPages(pathname.split('/'));

    role.map(function (x) {
      if (x.name === name) {
        setSubmit(Boolean(x.submit));
        setReview(Boolean(x.review));
        setApprove(Boolean(x.approve));
      }
    });
  }, []);

  //handle submission
  function handleSubmission(key, description) {
    let payload = { user_id: user.id, status_type: '', invoice_id: id };
    switch (key) {
      case 'submit':
        payload = { ...payload, status_type: 'Submit', description: '' };
        break;

      case 'review':
        payload = { ...payload, status_type: 'Review', description };
        break;

      case 'reject-review':
        payload = { ...payload, status_type: 'Reject Review', description };
        break;

      case 'approve':
        payload = { ...payload, status_type: 'Approve', description: '' };
        break;

      case 'reject-approve':
        payload = { ...payload, status_type: 'Reject Approve', description };
        break;

      default:
        payload;
        break;
    }
    // alert(JSON.stringify(payload));
    // return;
    try {
      API.insertInvoiceSubmission(payload, (res) => {
        if (!res) return undefined;
        if (!res.success) new Error('Failed');
        else alert('Success');
      });
    } catch (error) {
      alert('error');
    }

    setDialogOpen(false);
  }
  // --------------------------------------------------------------------------------

  return (
    <MHidden width="mdDown">
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
      <SpaceBetween>
        <div>
          <IconButton>
            <Icon icon={editFill} width={20} height={20} />
          </IconButton>
          <IconButton onClick={handleDownload}>
            <Icon icon={downloadFill} width={20} height={20} />
          </IconButton>
        </div>

        <div>
          <Button onClick={() => handleDialog('submit')} disabled={!submit || isSubmitted}>
            Submit
          </Button>
          <Button onClick={() => handleDialog('review')} disabled={!review || isReviewed}>
            Approve
          </Button>
        </div>
      </SpaceBetween>

      <RootStyle>
        <PaperStyled sx={{ minHeight: '279mm' }}>
          {/* Header Info */}
          <div ref={pdfRef}>
            <Stack direction="column" spacing={2}>
              <Grid
                container
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
                <Grid
                  item={6}
                  sx={{
                    width: '50%',
                    marginBottom: '1em',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ textAlign: 'right' }}>
                    <IDontKnow>INVOICE</IDontKnow>
                    <Typography variant="h6">{invInfo.invoice_id}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <Box>
                    <div>
                      <Typography variant="overline" display="block" gutterBottom>
                        Invoice From
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {selectedValueSH.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom component="div">
                        {selectedValueSH.address}
                      </Typography>
                      <Typography variant="body1" gutterBottom component="div">
                        {selectedValueSH.postal_code}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <div>
                      <Typography variant="overline" display="block" gutterBottom>
                        Invoice To
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {selectedValueSO.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom component="div">
                        {selectedValueSO.address}
                      </Typography>
                      <Typography variant="body1" gutterBottom component="div">
                        {selectedValueSO.postal_code}
                      </Typography>
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box>
                    <div>
                      <Typography variant="overline" display="block" gutterBottom>
                        Issued Date
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {moment(invInfo.invoice_date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <div>
                      <Typography variant="overline" display="block" gutterBottom>
                        Due Date
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {moment(invInfo.invoice_date, 'YYYY-MM-DD')
                          .add('days', invInfo.due_date)
                          .format('DD MMMM YYYY')}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <GridItemX>
                <Table
                  payload={items}
                  terms={terms}
                  subTotal={invInfo.total_price}
                  tax={invInfo.tax}
                />
              </GridItemX>

              <Grid item xs={12}>
                <Typography variant="h5">Catatan</Typography>
                {invInfo?.description?.split('\n').map((item) => {
                  return <Typography variant="body2">{`${item}`}</Typography>;
                })}
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-around"
                  style={{ margin: '12px 0' }}
                >
                  <div className="wk_sign wk_text_center">
                    {/* <img
                      src="https://brandeps.com/icon-download/B/Barcode-icon-vector-02.svg"
                      alt="Sign"
                      style={{ margin: 'auto' }}
                    /> */}
                    {isEmpty(valueSubmit) ? (
                      <div style={{ height: '75px' }} />
                    ) : (
                      <QRCode
                        size={256}
                        style={{ height: '75px', maxWidth: '100%', width: '100%' }}
                        value={JSON.stringify(valueSubmit)}
                        viewBox={`0 0 256 256`}
                      />
                    )}

                    {/* <div style={{ height: '50px' }} /> */}
                    <p className="wk_m0 wk_ternary_color">
                      {isEmpty(valueSubmit) ? 'Not Signed Yet' : valueSubmit?.name}
                    </p>
                    <p className="wk_m0 wk_f16 wk_primary_color">Finance Person</p>
                  </div>

                  <div className="wk_sign wk_text_center">
                    {/* <img
                      src="https://brandeps.com/icon-download/B/Barcode-icon-vector-02.svg"
                      alt="Sign"
                      style={{ margin: 'auto' }}
                    /> */}
                    {isEmpty(valueReview) ? (
                      <div style={{ height: '75px' }} />
                    ) : (
                      <QRCode
                        size={256}
                        style={{ height: '75px', maxWidth: '100%', width: '100%' }}
                        value={JSON.stringify(valueReview)}
                        viewBox={`0 0 256 256`}
                      />
                    )}
                    <p className="wk_m0 wk_ternary_color">
                      {isEmpty(valueReview) ? 'Not Signed Yet' : valueReview?.name}
                    </p>
                    <p className="wk_m0 wk_f16 wk_primary_color">Direktur</p>
                  </div>
                </Stack>
              </Grid>

              <div style={{ height: '10px' }} />
            </Stack>
          </div>
        </PaperStyled>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
