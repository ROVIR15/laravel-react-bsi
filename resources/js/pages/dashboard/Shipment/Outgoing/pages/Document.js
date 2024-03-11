import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../../components/Page';

import { styled } from '@mui/material/styles';

import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../../../../components/@material-extend';

import { useParams } from 'react-router-dom';

// Components
import Table from '../components/TableGR';

//API
import API from '../../../../../helpers';

//pdf
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

//helpers
import { _shipmentItem } from '../../../../../helpers/data';
import moment from 'moment';

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

const SpaceBetween = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '40px'
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: 'auto',
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

function FirstPage() {
  moment.locale('id');
  const { id } = useParams();
  const pdfRef = useRef(null);

  const [data, setData] = useState({
    id: '',
    po_number: '',
    bought_from: {
      name: ''
    },
    issue_date: '',
    GR_Items: []
  });

  useEffect(() => {
    try {
      API.getAShipment(id, (res) => {
        if (!res) return;
        if (!res.data) throw new Error('failed to load data');
        else {
          const { order, items, type, status, ...info } = res.data;
          let _items = _shipmentItem(items);

          setData({
            ...data,
            id: info?.id,
            po_number: order?.sales_order?.po_number,
            bought_from: order?.sales_order?.party ? order?.sales_order?.party : info?.ship_to,
            issue_date: moment(info?.created_at).format('LL'),
            GR_Items: _items
          });
        }
      });
    } catch (error) {}
  }, [id]);

  const handleDownload = React.useCallback(() => {
    const content = pdfRef.current;
    const filename = `${id}/BSI-SJ/${moment().month() + 1}/${moment().year()}.pdf`;

    setTimeout(() => {
      html2canvas(content, { scale: 3, allowTaint: true, useCORS: true }).then((canvas) => {
        const image = { type: 'jpeg', quality: 0.98 };
        const margin = [0.2, 0.2];

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

  return (
    <MHidden width="mdDown">
      <SpaceBetween>
        <Button variant="outlined" onClick={handleDownload}>
          Download
        </Button>
      </SpaceBetween>
      <RootStyle>
        <PaperStyled sx={{ width: '210mm' }} ref={pdfRef}>
          {/* Header Info */}
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
              <Grid item={6} sx={{ width: '50%', marginBottom: '1em', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'right' }}>
                  <IDontKnow>Packing List</IDontKnow>
                </Box>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <Stack direction="column" spacing={1}>
                  <div>
                    <Typography variant="overline" display="block" gutterBottom>
                      No. Surat Jalan
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      {data?.id}/BSI-SJ/{moment().month() + 1}/{moment().year()}
                    </Typography>
                  </div>
                  <BOXColumn>
                    <Typography variant="overline" display="block" gutterBottom>
                      Shipment Date
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      {moment().format('LL')}
                    </Typography>
                  </BOXColumn>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography variant="overline" display="block" gutterBottom>
                    Destination
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    {data?.bought_from?.name}
                  </Typography>
                  <Typography variant="body1">{`${data.bought_from?.address?.street} ${data.bought_from?.address?.postal_code}`}</Typography>
                  <Typography variant="body1">{`${data.bought_from?.address?.city}, ${data.bought_from?.address?.province}, ${data.bought_from?.address?.country}`}</Typography>
                </div>
              </Grid>
            </Grid>

            <GridItemX style={{ margin: '2rem 0' }}>
              <Table payload={data.GR_Items} />
            </GridItemX>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="space-around">
                <div className="wk_sign wk_text_center">
                  {/* <img
                      src="https://brandeps.com/icon-download/B/Barcode-icon-vector-02.svg"
                      alt="Sign"
                      style={{ margin: 'auto' }}
                    /> */}
                  <div style={{ height: '50px' }} />
                  <p className="wk_m0 wk_ternary_color">{data?.bought_from?.name}</p>
                  <p className="wk_m0 wk_f16 wk_primary_color">Buyer</p>
                </div>
              </Stack>
              <div style={{height: 10}}/>
            </Grid>
          </Stack>
        </PaperStyled>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
