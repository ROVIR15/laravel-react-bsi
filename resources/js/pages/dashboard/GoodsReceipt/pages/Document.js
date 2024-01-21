import React, { useState, useEffect } from 'react';
import Page from '../../../../components/Page';

import { styled } from '@mui/material/styles';

import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { MHidden } from '../../../../components/@material-extend';

import { useParams } from 'react-router-dom';

// Components
import Table from '../components/TableGR';

//API
import API from '../../../../helpers';
import { _partyAddress, _shipmentItem } from '../../../../helpers/data';
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

  return (
    <MHidden width="mdDown">
      <RootStyle>
        <PaperStyled sx={{ width: '210mm', minHeight: '279mm' }}>
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
                  <IDontKnow>Goods Receipt</IDontKnow>
                  <Typography variant="h3">GR-{values.id ? values?.id?.toString().padStart(5, '0') : '0000'}</Typography>
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
                    {values?.delivery_date ? moment(values.delivery_date).format('ll') : 'Belum Diterbitkan'}
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
