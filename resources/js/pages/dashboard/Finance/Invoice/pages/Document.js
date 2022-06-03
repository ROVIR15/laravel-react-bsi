import React, { useState, useEffect } from 'react';
import Page from '../../../../../components/Page';

import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import {Box, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
import { MHidden } from '../../../../../components/@material-extend';

// Components
import Table from '../components/TableINV'

// API
import API from '../../../../../helpers/index';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: 180,
    background: '#666666'
  }
}));

const IDontKnow = styled('span')(({ theme }) => ({
  height: "22px", 
  minWidth: "22px", 
  lineHeight: "0", 
  borderRadius: "6px", 
  cursor: "default", 
  alignItems: "center", 
  whiteSpace: "nowrap", 
  display: "inline-flex", 
  justifyContent: "center", 
  padding: "0px 8px", 
  color: "rgb(86, 187, 241)", 
  fontSize: "1.25rem", 
  backgroundColor: "rgb(77, 119, 255, 0.2)", 
  fontWeight: "700", 
  textTransform: "uppercase", 
  marginBottom: "8px"
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    margin: 4,
    backgroundColor: "rgb(255, 255, 255)", 
    color: "rgb(33, 43, 54)", 
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
    backgroundImage: "none", 
    overflow: "hidden", 
    position: "relative", 
    boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px", 
    borderRadius: "16px", 
    zIndex: "0", 
    paddingTop: "40px", 
    paddingLeft: "40px", 
    paddingRight: "40px"
  }
}));

const GridItemX = styled('div')(({ theme }) => ({
  height: "100%", 
  overflow: "hidden"
}));

function FirstPage(){
  const { id } = useParams();

  const [invInfo, setInvInfo] = useState({
    invoice_date: '',
    invoice_id: '',
    total_price: 0
  })
  const [items, setItems] = useState([])

  const [selectedValueSO, setSelectedValueSO] = React.useState({
    name: '',
    address: '',
    postal_code: 0
  })

  const [selectedValueSH] = React.useState({
    name: 'PT. BSI Indonesia',
    address: 'Jalan Albisindo Raya no 24, Kec. Kaliwungu, Kab. Kudus, Provinsi Jawa Tengah, Indonesia',
    postal_code: 42133,
    phone_number: '(0291) 2381023'
  })

  React.useEffect(() => {
    API.getASalesInvoice(id, (res) => {
      if(!res) return undefined;
      if(!res.data) alert('failed');
      else {
        changeData(res.data)
      }
    })
  }, [id])

  const changeData = (payload) => {

    function total(qty, price) {
        return qty * price;
    }

    const temp = payload.items.map((item, index) => {
      return {
        'id': index+1,
        'order_item_id': item.id,
        'name' : item.product_feature_id.name,
        'size' : item.product_feature_id.size,
        'color' : item.product_feature_id.color,
        'qty': item.qty,
        'amount': item.amount,
        'total': total(item.qty, item.amount)  
      }
    })

    console.log(temp);

    setSelectedValueSO({
      name: payload.sold_to.name,
      address: `${payload.sold_to.address.street} ${payload.sold_to.address.city} ${payload.sold_to.address.province} ${payload.sold_to.address.country}`,
      postal_code: payload.sold_to.address.postal_code
    });

    setInvInfo({
      invoice_date: payload.invoice_date,
      invoice_id: payload.id,
      total_price: payload.total_price
    })

    setItems(temp);
  }

  return (
      <MHidden width="mdDown">
        <RootStyle>
          <PaperStyled sx={{ width: "210mm", height: "279mm"}}>
            {/* Header Info */}
            <Stack direction="column" spacing={2}>
            <Grid container sx={{
              boxSizing: "border-box",
              display: "flex",
              flexFlow: "row wrap",
              width: "100%",
            }}>
              <Grid item md={6} sx={{width: '50%', marginBottom: '1em'}}>
                <Box
                  component="img"
                  src="https://1.bp.blogspot.com/-Jl8W1ycfiDY/Xa_nji0dXaI/AAAAAAAALrw/j4oS4c5mQmkO89tCzn6o9PcrU_0W9V3JgCLcBGAsYHQ/s1600/FB_IMG_1571808912832.jpg"
                  sx={{width: '15%', height: '80px', marginLeft: '0.75 em'}}
                />
              </Grid>
              <Grid item={6} sx={{width: '50%', marginBottom: '1em'}}>
                <Box sx={{textAlign: 'right'}}>
                  <IDontKnow>INVOICE</IDontKnow>
                  <Typography variant="h3">INV-{id}-A</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <Box>
                  <div>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Invoice From
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {selectedValueSH.name}
                    </Typography>
                    <Typography
                      variant="body1" 
                      gutterBottom 
                      component="div"
                    >
                      {selectedValueSH.address}
                    </Typography>
                    <Typography
                      variant="body1" 
                      gutterBottom 
                      component="div"
                    >
                      {selectedValueSH.postal_code}
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <div>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Invoice To
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {selectedValueSO.name}
                    </Typography>
                    <Typography
                      variant="body1" 
                      gutterBottom 
                      component="div"
                    >
                      {selectedValueSO.address}
                    </Typography>
                    <Typography
                      variant="body1" 
                      gutterBottom 
                      component="div"
                    >
                      {selectedValueSO.postal_code}
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box>
                  <div>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Issued Date
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {moment(invInfo.invoice_date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
                    </Typography>
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <div>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Due Date
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {moment(invInfo.invoice_date, 'YYYY-MM-DD').add('days', 7).format('DD MMMM YYYY')}
                    </Typography>
                  </div>
                </Box>
              </Grid>

              </Grid>
              <GridItemX >
                <Table payload={items} subTotal={invInfo.total_price}/>
              </GridItemX>

              <Divider fullWidth />
              <Grid container>
                <Box sx={{marginBottom: 15}}>
                  <Typography variant="h6">
                    This Document Generated Automatically
                  </Typography>
                </Box>
              </Grid>
            </Stack>
          </PaperStyled>
        </RootStyle>
      </MHidden>
  )
}

export default FirstPage;