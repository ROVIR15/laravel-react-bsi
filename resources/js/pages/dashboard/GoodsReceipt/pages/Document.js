import React, { useState, useEffect, useRef } from 'react';
import Page from '../../../../components/Page';

import { styled } from '@mui/material/styles';

import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../../../components/@material-extend';

import { useParams } from 'react-router-dom';

// Components
import Table from '../components/TableGR';

//pdf
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

//API
import API from '../../../../helpers';
import { _partyAddress, _shipmentItem } from '../../../../helpers/data';
import moment from 'moment';

moment.locale('id');

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
  const { id } = useParams();

  const [PONumber, setPONumber] = useState('');
  const [POID, setPOID] = useState(0);
  const [shipper, setShipper] = useState({});
  const [status, setStatus] = useState(0);
  const [items, setItems] = useState([]);

  const [values, setValues] = useState({});

  useEffect(async () => {
    if (!id) return;

    try {
      API.getAShipment(id, function (res) {
        if (!res) return;
        if (!res.data) return;
        else {
          const { order, items, type, status, ...info } = res.data;
          setValues(info);
          setPONumber(order?.purchase_order?.po_number);
          setPOID(order?.purchase_order?.id);
          let _ship = _partyAddress(order?.purchase_order?.party);
          setShipper(_ship);
          setStatus(status[0]?.shipment_type_status_id);
          let _items = _shipmentItem(items);
          setItems(_items);
        }
      });
    } catch (error) {
      alert('error');
    }
  }, [id]);

  const pdfRef = useRef(null);
  const handleDownload = React.useCallback(() => {
    const content = pdfRef.current;

    setTimeout(() => {
      html2canvas(content, { scale: 3, allowTaint: true, useCORS: true }).then((canvas) => {
        const image = { type: 'jpeg', quality: 0.98 };
        const margin = [0.2, 0.2];
        const filename = `GR-${POID.toString().padStart(4, '0')}-${id.toString().padStart(4, '0')}`;

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
  }, [pdfRef, POID]);

  return (
    <MHidden width="mdDown">
      <RootStyle>
        <Stack direction="column" spacing={2} alignItems="center">
          <Button onClick={handleDownload} variant="outlined" sx={{ width: '210mm' }}>
            Download
          </Button>
          <PaperStyled sx={{ width: '210mm', minHeight: '279mm' }}>
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
                      <IDontKnow>Goods Receipt</IDontKnow>
                      <Typography variant="h6">
                        GR-{values.id ? values?.id?.toString().padStart(5, '0') : '0000'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={4}>
                    <Box>
                      <div>
                        <Typography variant="overline" display="block" gutterBottom>
                          Nomor Dokumen PO
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                          PO-{POID ? POID.toString().padStart(5, '0') : '0000'}
                        </Typography>
                        <Typography variant='caption' gutterBottom component="div">
                          {PONumber}
                        </Typography>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <div>
                        <Typography variant="overline" display="block" gutterBottom>
                          Nomor Dokumen Pengiriman
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                          INSHIP-{values?.id ? values?.id?.toString().padStart(5, '0') : '0000'}
                        </Typography>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <BOXColumn>
                      <Typography variant="overline" display="block" gutterBottom>
                        Tanggal Diterbitkan
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {/* masih salah */}
                        {values?.delivery_date
                          ? moment(values.delivery_date).format('ll')
                          : 'Belum Diterbitkan'}
                      </Typography>
                    </BOXColumn>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="overline" display="block" gutterBottom>
                        Pengirim
                      </Typography>
                      {shipper.name ? (
                        <div>
                          <Typography variant="subtitle1">{shipper.name}</Typography>
                          <Typography component="span" variant="caption">
                            {shipper.street}
                          </Typography>
                          <Typography variant="body2">{`${shipper.city}, ${shipper.province}, ${shipper.country}`}</Typography>
                        </div>
                      ) : null}
                    </Box>
                  </Grid>
                </Grid>
                <GridItemX>
                  <Table payload={items} />
                </GridItemX>

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-around"
                  style={{ margin: '12px 0' }}
                >
                  <div className="wk_sign wk_text_center">
                    <p className="wk_m0 wk_f14 wk_primary_color">Pengirim</p>
                    <div style={{ height: '75px' }} />

                    {/* <div style={{ height: '50px' }} /> */}
                    <p className="wk_m0 wk_ternary_color">[...................]</p>
                  </div>

                  <div className="wk_sign wk_text_center">
                    <p className="wk_m0 wk_f14 wk_primary_color">Penerima</p>
                    <div style={{ height: '75px' }} />

                    {/* <div style={{ height: '50px' }} /> */}
                    <p className="wk_m0 wk_ternary_color">[...................]</p>
                  </div>

                  <div className="wk_sign wk_text_center">
                    <p className="wk_m0 wk_f14 wk_primary_color">Mengetahui</p>
                    <div style={{ height: '75px' }} />

                    {/* <div style={{ height: '50px' }} /> */}
                    <p className="wk_m0 wk_ternary_color">[...................]</p>
                  </div>
                </Stack>

                <Divider fullWidth />
                <Grid container>
                  <Box sx={{ marginBottom: 15 }}>
                    <Typography variant="subtitle">This Document Generated Automatically at {moment().format('LLLL')}</Typography>
                  </Box>
                </Grid>
              </Stack>
            </div>
          </PaperStyled>
        </Stack>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
