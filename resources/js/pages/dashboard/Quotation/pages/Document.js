import React, { useState, useEffect } from 'react';
import Page from '../../../../components/Page';

import { styled } from '@mui/material/styles';

import {Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography} from '@mui/material';
import { MHidden } from '../../../../components/@material-extend';

import {useLocation, useParams} from 'react-router-dom';

// Components
import Table from '../components/TableINV';

//API
import API from '../../../../helpers'
import { productItemArrangedData } from '../../../../helpers/data';

//Icons
import editFill from '@iconify/icons-eva/edit-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { Icon } from '@iconify/react';

//Comtext
import useAuth from '../../../../context';
import { getPages } from '../../../../utils/getPathname';

const RootStyle = styled(Page)(({ theme }) => ({

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

const BOXColumn = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column'
}))

const PaperStyled = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '100%',
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

const SpaceBetween = styled(Box)(({theme}) => ({
  display: "flex", 
  justifyContent: "space-between", 
  marginBottom: "40px"
}))

const GridItemX = styled('div')(({ theme }) => ({
  height: "100%", 
  overflow: "hidden"
}));

function FirstPage(){
  const { id } = useParams();
  const { user } = useAuth();
  const { pathname } = useLocation();

  const [submit, setSubmit] = useState(false);
  const [review, setReview] = useState(false);
  const [approve, setApprove] = useState(false);

  useEffect(() => {
    const { role } = user;
    const name = getPages(pathname.split('/'));

    role.map(function(x){
      if(x.name === name){
        setSubmit(Boolean(x.submit));
        setReview(Boolean(x.review));
        setApprove(Boolean(x.approve));
        console.log(submit, review, approve)
      }
    })
  }, [])

  const [data, setData] = useState({
    id: '',
    po_number: '',
    party: {
      name: ''
    },
    issue_date: '',
    quote_items: []
  })

  useEffect(async () => {
    API.getAQuote(id, function(res){
      if (!res) return;
      else {
        const quoteItem = res.data.quote_items.map(function(key, index){
          const {id, product_id, name, size, color} = productItemArrangedData(key.product)
          return {
            'id': key.id,
            'product_id' : product_id,
            'product_feature_id' : key.product_feature_id,
            'name' : name,
            'size' : size,
            'color' : color,
            'qty' : key.qty,
            'unit_price' : key.unit_price
          }
        });

        setData({
          ...data, 
          id: res.data.id,
          po_number: res.data.po_number,
          issue_date: res.data.issue_date,
          quote_items: quoteItem,
          party: res.data.party
        })

      }
    })

  }, [id]);

  return (
      <MHidden width="mdDown">
        <SpaceBetween>
          <div >
            <IconButton>
              <Icon icon={editFill} width={20} height={20} />
            </IconButton>
            <IconButton>
              <Icon icon={downloadFill} width={20} height={20} />
            </IconButton>
          </div>

          <div>
            <Button
              disabled={!submit}
            >
              Submit
            </Button>
            <Button
              disabled={!review}
            >
              Review
            </Button>
            <Button
              disabled={!approve}
            >
              Tandai Approve
            </Button>
          </div>
        </SpaceBetween>
        <RootStyle>
          <PaperStyled sx={{ width: "210mm", minHeight: "279mm"}}>
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
                  <IDontKnow>Quotation</IDontKnow>
                  <Typography variant="h3">Quotation-{data.id}</Typography>
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
                      Quote Number
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {data.po_number}
                    </Typography>
                  </div>
                </Box>
                <BOXColumn>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Created Date
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {data.issue_date}
                    </Typography>
                </BOXColumn>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <div>
                    <Typography
                      variant="overline" 
                      display="block" 
                      gutterBottom
                    >
                      Supplier
                    </Typography>
                    <Typography
                      variant="h6" 
                      gutterBottom 
                      component="div"
                    >
                      {data.party.name}
                    </Typography>
                    <Typography variant="body1">{data.party.address?.street}</Typography>
                    <Typography variant="body1">{`${data.party.address?.city}, ${data.party.address?.province}, ${data.party.address?.country}`}</Typography>

                  </div>
                </Box>
              </Grid>

              </Grid>
              <GridItemX>
                <Table payload={data.quote_items}/>
              </GridItemX>

              <Divider fullWidth />
              <Grid container>
                <Box sx={{marginBottom: 3, position: 'absolute', bottom: 0}}>
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