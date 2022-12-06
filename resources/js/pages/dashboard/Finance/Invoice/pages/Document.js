import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../../components/Page';

import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Box, Button, IconButton, Grid, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../../../../components/@material-extend';

//Icons
import editFill from '@iconify/icons-eva/edit-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

// Components
import Table from '../components/TableINV';

// API
import API from '../../../../../helpers/index';
import { _partyAddress } from '../../../../../helpers/data';
import { generateInvSerialNumber } from '../../utils';

//pdf
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  const pdfRef = useRef(null);

  const [invInfo, setInvInfo] = useState({
    invoice_date: '',
    invoice_id: '',
    total_price: 0
  });
  const [items, setItems] = useState([]);

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
        name: `${order_item.product_feature?.product?.goods?.name} - ${order_item.product_feature.color} - ${order_item.product_feature.size}`,
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
      invoice_id: generateInvSerialNumber(payload, 1),
      total_price: 0,
      description: payload.description,
      tax: payload.tax
    });

    setItems(temp);
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

  return (
    <MHidden width="mdDown">
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
          <Button disabled>
            Submit
          </Button>
          <Button disabled>
            Review
          </Button>
          <Button disabled>
            Tandai Approve
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
                <Grid item={6} sx={{ width: '50%', marginBottom: '1em' }}>
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
                          .add('days', 7)
                          .format('DD MMMM YYYY')}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <GridItemX>
                <Table payload={items} subTotal={invInfo.total_price} tax={invInfo.tax} />
              </GridItemX>

              <Grid item xs={12}>
                <Typography variant="h5">Catatan</Typography>
                {invInfo?.description?.split('\n').map((item) => {
                  return <Typography variant="body2">{`${item}`}</Typography>;
                })}
              </Grid>
            </Stack>
          </div>
        </PaperStyled>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
