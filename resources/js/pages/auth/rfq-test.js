import React, { useRef } from 'react';
import Page from '../../components/Page';

import { styled } from '@mui/material/styles';

import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../components/@material-extend';

// Components
import Table from './components/TableINV';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    background: '#666666'
  }
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

const BOXColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: 4,
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
  const pdfRef = useRef(null);

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
    }, 1000)

    // doc.html(
    //   content,
    //   {
    //     html2canvas: { width: 1080, height: 1920 }
    //   },
    //   {
    //     callback: function (doc) {
    //       doc.save('output.pdf');
    //     },
    //     x: 10,
    //     y: 10
    //   }
    // );

    // toBlob(content, {cacheBust: true})
    // .then((blob) => {
    //   const doc = new jsPDF();

    //   doc.addImage(blob);
    //   doc.save('hehe.pdf')
    // })
    // .catch((err) => {
    //   alert(err)
    // })
  }, [pdfRef]);

  return (
    <MHidden width="mdDown">
      <RootStyle>
        <Button onClick={handleDownload}>Download</Button>
        <PaperStyled>
          <div ref={pdfRef}>
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
                <Grid item={6} sx={{ width: '50%', marginBottom: '1em' }}>
                  <Box sx={{ textAlign: 'right' }}>
                    <IDontKnow>Request of Quotation</IDontKnow>
                    <Typography variant="h3">RFQ-PO-1-A</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <Box>
                    <div>
                      <Typography variant="overline" display="block" gutterBottom>
                        RFQ Number
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {'1280312893'}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <div>
                      <Typography variant="overline" display="block" gutterBottom>
                        Supplier
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {'wkwkwkwkwk'}
                      </Typography>
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <BOXColumn>
                    <Typography variant="overline" display="block" gutterBottom>
                      Created Date
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      {'wkwkwkwkwk'}
                    </Typography>
                  </BOXColumn>
                </Grid>
              </Grid>
              <GridItemX>
                <Table />
              </GridItemX>

              <Divider fullWidth />
              <Grid container>
                <Box sx={{ marginBottom: 15 }}>
                  <Typography variant="h6">This Document Generated Automatically</Typography>
                </Box>
              </Grid>
            </Stack>
          </div>
        </PaperStyled>
      </RootStyle>
    </MHidden>
  );
}

export default FirstPage;
