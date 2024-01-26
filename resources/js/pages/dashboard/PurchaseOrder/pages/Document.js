import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../components/Page';

import { styled } from '@mui/material/styles';

import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../../../components/@material-extend';

import { useLocation, useParams } from 'react-router-dom';

// Components
import Table from '../components/TableINV';

//API
import API from '../../../../helpers';
import { productItemArrangedData } from '../../../../helpers/data';

//Icons
import editFill from '@iconify/icons-eva/edit-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

//pdf
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import useAuth from '../../../../context';
import { getPages } from '../../../../utils/getPathname';

import Dialog from '../../../../components/DialogBox/dialog';
import moment from 'moment';
import { isEmpty, isEqual, uniqBy } from 'lodash';
import QRCode from 'react-qr-code';

const RootStyle = styled(Page)(({ theme }) => ({}));

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

const BOXColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '85%',
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

const SpaceBetween = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '40px'
}));

const GridItemX = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'unset'
}));

const termsandconditions = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],
  ['Donec sit amet nibh ac felis congue sagittis.'],
  ['Mauris ut magna in urna tincidunt congue sed quis justo.'],
  ['Quisque aliquet tortor eget erat semper, facilisis tincidunt est mattis.']
];

function FirstPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const pdfRef = useRef(null);
  const { pathname } = useLocation();

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
  moment.locale('id');

  const [data, setData] = useState({
    id: '',
    po_number: '',
    party: {
      name: ''
    },
    tax: 0,
    issue_date: '',
    quote_items: []
  });

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
          title: 'Review Purchase Order?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'review',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'approve':
        setWarning({
          title: 'Apporve Purchase Order?',
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

  const handleDownload = React.useCallback(() => {
    const content = pdfRef.current;

    setTimeout(() => {
      html2canvas(content, { scale: 3, allowTaint: true, useCORS: true }).then((canvas) => {
        const image = { type: 'jpeg', quality: 0.98 };
        const margin = [0.2, 0.2];
        const filename = `PO/${data.po_number}/${data.issue_date}/00${id}`;

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

        pdf.save(filename);
      });
    }, 1000);
  }, [pdfRef]);

  useEffect(async () => {
    try {
      API.getAPurchaseOrder(id, async function (res) {
        if (!res) return;
        if (isEmpty(res.data)) throw new Error('failed to load data');
        else {
          const quoteItem = res.data.order_item.map(function (key, index) {
            const { id, product_id, name, size, color, satuan } = productItemArrangedData(
              key.product_feature
            );
            return {
              id: key.id,
              product_id: product_id,
              product_feature_id: id,
              name: name,
              size: size,
              color: color,
              qty: key.qty,
              unit_price: key.unit_price,
              unit_measurement: satuan,
              description: key.description
            };
          });

          let _statusOrderData = uniqBy(res.data.status, 'status_type');

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

          let currency;
          if(res.data.order?.currency_id === 1) currency = 'usd';
          else currency='idr'  

          setData({
            ...data,
            id: res.data.id,
            order_id: res.data.order_id,
            po_number: res.data.po_number,
            issue_date: res.data.issue_date,
            delivery_date: res.data.delivery_date,
            quote_items: quoteItem,
            description: res.data?.order?.description,
            party: res.data.bought_from,
            ship_to: res.data.ship_to,
            tax: res.data.order?.tax,
            currency
          });
        }
      });
    } catch (error) {
      alert(error)
    }
  }, [id]);

  function handleSubmission(key, description) {
    let payload = { user_id: user.id, status_type: '', order_id: data.order_id };
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
      API.insertOrderStatus(payload, (res) => {
        if (!res) return undefined;
        if (!res.success) new Error('Failed');
        else alert('Success');
      });
    } catch (error) {
      alert('error');
    }

    setDialogOpen(false);
  }

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
          <IconButton onClick={handleDownload} disabled={isEmpty(valueReview)}>
            <Icon icon={downloadFill} width={20} height={20} />
          </IconButton>
        </div>

        <div>
          <Button onClick={() => handleDialog('submit')} disabled={!submit || isSubmitted}>
            Submit
          </Button>
          <Button onClick={() => handleDialog('review')}>
          {/* <Button onClick={() => handleDialog('review')} disabled={!review || isReviewed}> */}
            Review
          </Button>
          <Button onClick={() => handleDialog('approve')} disabled={!approve}>
            Tandai Approve
          </Button>
        </div>
      </SpaceBetween>
      <RootStyle>
        <PaperStyled sx={{ width: '210mm', margin: 'auto' }}>
          <div ref={pdfRef}>
            {/* Header Info */}
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
                  <IDontKnow>Purchase Order</IDontKnow>
                  <Typography variant="h6">PO-{id.toString().padStart(5, '0')}</Typography>
                </Box>
              </Grid>
            </Grid>
            <Stack direction="column" spacing={4}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: '1rem' }} />
                  <Stack direction="row" justifyContent="space-between" style={{ padding: '8px' }}>
                    <Box>
                      <Typography variant="overline" display="block">
                        Document Number
                      </Typography>
                      <Typography variant="h6" component="div">
                        {data.id}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="overline" display="block">
                        Created Date
                      </Typography>
                      <Typography variant="h6" component="div">
                        {moment(data.issue_date).format('LL')}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="overline" display="block">
                        Delivery Date
                      </Typography>
                      <Typography variant="h6" component="div">
                        {moment(data.delivery_date).format('LL')}
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Grid container direction="row" justifyContent="space-evenly" spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="overline" display="block" gutterBottom>
                        Supplier
                      </Typography>
                      <Typography variant="h6" component="div">
                        {data.party.name}
                      </Typography>
                      <Typography variant="body2">{`${data.party.address?.street} \n ${data.party?.address?.postal_code}`}</Typography>
                      <Typography variant="body2">{`${data.party.address?.city}, ${data.party.address?.province}, ${data.party.address?.country}`}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="overline" display="block" gutterBottom>
                        Ship To
                      </Typography>
                      <Typography variant="h6" component="div">
                        {data.ship_to?.name}
                      </Typography>
                      <Typography variant="body2">{`${data.ship_to?.address?.street} \n ${data.ship_to?.address?.postal_code}`}</Typography>
                      <Typography variant="body2">{`${data.ship_to?.address?.city}, ${data.ship_to?.address?.province}, ${data.ship_to?.address?.country}`}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Table payload={data.quote_items} tax={data?.tax} currency={data?.currency} />
              </Grid>

              <Grid item xs={12} style={{ marginTop: 'unset' }}>
                <Typography variant="h5">Catatan</Typography>
                {data?.description?.split('\n').map((item) => {
                  return <Typography variant="body2">{`${item}`}</Typography>;
                })}

                <Typography variant="body1" fontStyle='italic'>**NB: Sertakan nomor dokumen PO-{id.toString().padStart(5, '0')} pada surat jalan untuk memudahkan proses pengecekan. Terimakasih</Typography>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="space-around">
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
                    <p className="wk_m0 wk_f16 wk_primary_color">Merchandiser</p>
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
                    <p className="wk_m0 wk_f16 wk_primary_color">Purchasing</p>
                  </div>

                  <div className="wk_sign wk_text_center">
                    {/* <img
                      src="https://brandeps.com/icon-download/B/Barcode-icon-vector-02.svg"
                      alt="Sign"
                      style={{ margin: 'auto' }}
                    /> */}
                    <div style={{ height: '75px' }} />
                    <p className="wk_m0 wk_ternary_color">{data?.party?.name}</p>
                    <p className="wk_m0 wk_f16 wk_primary_color">Supplier</p>
                  </div>
                </Stack>
              </Grid>
            </Stack>

            <div style={{ height: '8px' }}></div>
          </div>
        </PaperStyled>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
