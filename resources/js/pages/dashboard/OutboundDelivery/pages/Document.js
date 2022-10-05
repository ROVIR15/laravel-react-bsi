import React, { useState, useEffect } from 'react';
import Page from '../../../../components/Page';

import { styled } from '@mui/material/styles';

import {Box, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
import { MHidden } from '../../../../components/@material-extend';

import {useParams} from 'react-router-dom';

// Components
import Table from '../components/TableGR';

//API
import API from '../../../../helpers'

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
    margin: 'auto',
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

  const [data, setData] = useState({
    id: '',
    po_number: '',
    bought_from: {
      name: ''
    },
    issue_date: '',
    GR_Items: []
  })

  useEffect(async () => {
    API.getAGoodsReceipt(id, function(res){
      if (!res) return;
      else setData(res.data);
    })

    
  }, [id]);

  return (
      <MHidden width="mdDown">
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
                  <IDontKnow>Goods Receipt</IDontKnow>
                  <Typography variant="h3">GR-PO-{data.id}-A</Typography>
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
                      Goods Receipt Number
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
                      {data.bought_from.name}
                    </Typography>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={6}>
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

              </Grid>
              <GridItemX >
                <Table payload={data.GR_Items}/>
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