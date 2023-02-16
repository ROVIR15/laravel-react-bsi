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
import { toBlob, toPng } from 'html-to-image';

import useAuth from '../../../../context';
import { getPages } from '../../../../utils/getPathname';

import Dialog from '../../../../components/DialogBox/dialog';

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

function FirstPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const pdfRef = useRef(null);
  const { pathname } = useLocation();

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

  function handleDialog(key) {
    switch (key) {
      case 'submit':
        setWarning({
          title: 'Submit Quotation?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'submit',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'review':
        setWarning({
          title: 'Review Quotation?',
          message: "Once you submit you cannot make changes unless it's rejected",
          type: 'review',
          send: (type, content) => handleSubmission(type, content)
        });
        setDialogOpen(true);
        break;

      case 'approve':
        setWarning({
          title: 'Apporve Quotation?',
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

  // const handleDownloadPdf = () => {
  //   const content = pdfRef.current;

  //   const doc = new jsPDF('l','mm',[210, 297]);

  //   doc.html(content, {
  //     callback: (doc) => {
  //       doc.save('wow.pdf')
  //     },
  //   })
  // }

  const handleDownload = React.useCallback(() => {
    const content = pdfRef.current;

    setTimeout(() => {
      html2canvas(content, { scale: 3, allowTaint: true, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const pageHeight = 290;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        const doc = new jsPDF('pt', 'mm');
        let position = 0;
        doc.addImage(imgData, 'SVG', 10, 10, imgWidth, imgHeight + 25);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 25);
          heightLeft -= pageHeight;
        }
        doc.save('download.pdf');
        setLoader(false);
      });
    }, 1000);
  }, [pdfRef]);

  const [data, setData] = useState({
    id: '',
    po_number: '',
    party: {
      name: ''
    },
    issue_date: '',
    quote_items: []
  });

  useEffect(async () => {
    API.getAQuote(id, function (res) {
      if (!res) return;
      else {
        const quoteItem = res.data.quote_items.map(function (key, index) {
          const { id, product_id, name, size, color } = productItemArrangedData(key.product);
          return {
            id: key.id,
            product_id: product_id,
            product_feature_id: key.product_feature_id,
            name: name,
            size: size,
            color: color,
            qty: key.qty,
            unit_price: key.unit_price
          };
        });

        setData({
          ...data,
          id: res.data.id,
          po_number: res.data.po_number,
          issue_date: res.data.issue_date,
          quote_items: quoteItem,
          party: res.data.party
        });
      }
    });
  }, [id]);

  function handleSubmission(key, description) {
    const { id } = user;
    let payload = { user_id: id, status_type: '', quote_id: data.id };
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
      API.insertQuoteStatus(payload, (res) => {
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
          <IconButton onClick={handleDownload}>
            <Icon icon={downloadFill} width={20} height={20} />
          </IconButton>
        </div>

        <div>
          <Button onClick={() => handleDialog('submit')} disabled={!submit}>
            Submit
          </Button>
          <Button onClick={() => handleDialog('review')} disabled={!review}>
            Review
          </Button>
          <Button onClick={() => handleDialog('approve')} disabled={!approve}>
            Tandai Approve
          </Button>
        </div>
      </SpaceBetween>
      <RootStyle>
        <PaperStyled sx={{ width: '210mm', minHeight: '279mm' }}>
          {/* Header Info */}
          <Stack ref={pdfRef} direction="column" spacing={2}>
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
              <Grid item={6} sx={{ width: '50%', marginBottom: '1em' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <IDontKnow>Request of Quotation</IDontKnow>
                  <Typography variant="h3">RFQ-PO-{data.id}-A</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={7}>
                <Stack>
                  <Box>
                    <Typography variant="overline" display="block" gutterBottom>
                      RFQ Number
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      {data.po_number}
                    </Typography>
                  </Box>

                  <BOXColumn>
                    <Typography variant="overline" display="block" gutterBottom>
                      Created Date
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      {data.issue_date}
                    </Typography>
                  </BOXColumn>
                </Stack>
              </Grid>
              <Grid item xs={5}>
                <Box>
                  <div>
                    <Typography variant="overline" display="block" gutterBottom>
                      Supplier
                    </Typography>
                    <Typography variant="h6" component="div">
                      {data.party.name}
                    </Typography>
                    <Typography variant="body1">{data.party.address?.street}</Typography>
                    <Typography variant="body1">{`${data.party.address?.city}, ${data.party.address?.province}, ${data.party.address?.country}`}</Typography>
                  </div>
                </Box>
              </Grid>
            </Grid>

            <GridItemX>
              <Table payload={data.quote_items} />
            </GridItemX>

            <Divider fullWidth />
            <Grid container>
              <Box sx={{ marginBottom: 15 }}>
                <Typography variant="h6">This Document Generated Automatically</Typography>
              </Box>
            </Grid>
          </Stack>
        </PaperStyled>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
