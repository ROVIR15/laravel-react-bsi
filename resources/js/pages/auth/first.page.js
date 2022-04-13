import React from 'react';
import Page from '../../components/Page';

import { styled } from '@mui/material/styles';

import {Box, Divider, Grid, Paper, Typography} from '@mui/material';
import { MHidden } from '../../components/@material-extend';

// Components
import Table from './components/Table'

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
  return (
      <MHidden width="mdDown">
        <RootStyle>
          <PaperStyled sx={{}}>
            {/* Product Info */}
            <Grid container sx={{
              boxSizing: "border-box",
              display: "flex",
              flexFlow: "row wrap",
              width: "100%",
            }}>
              <Grid item md={6} sx={{width: '50%', marginBottom: '1em'}}>
                <Box>
                  <Typography variant="h3">BSI Indonesia</Typography>                
                </Box>
              </Grid>
              <Grid item={6} sx={{width: '50%', marginBottom: '1em'}}>
                <Box sx={{textAlign: 'right'}}>
                  <IDontKnow>Bill of Material</IDontKnow>
                  <Typography variant="h3">BOM-SO-1-A</Typography>
                </Box>
              </Grid>
              <Grid item
                xs={12}
                md={6}
                lg={7}
              >
                <Box
                  sx={{
                    width: "65%", 
                    lineHeight: "0", 
                    display: "block", 
                    overflow: "hidden", 
                    position: "relative", 
                    paddingTop: "100%", 
                    cursor: "zoom-in",
                    padding: '8px',
                    margin: 'auto'
                  }}
                >
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
                    sx={{
                      height: "75%", 
                      objectFit: "cover",
                      borderRadius: '16px',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item
                xs={12}
                md={6}
                lg={5}
              >
              <Box sx={{marginTop: '30px'}}>
                <div>
                  <Typography
                    variant="overline" 
                    display="block" 
                    gutterBottom
                  >
                    Product Name
                  </Typography>
                  <Typography
                    variant="h5" 
                    gutterBottom 
                    component="div"
                  >
                    Barang 1
                  </Typography>
                </div>

                <div>
                  <Typography
                    variant="overline" 
                    display="block" 
                    gutterBottom
                  >
                    Variant
                  </Typography>
                  <Typography
                    variant="h5" 
                    gutterBottom 
                    component="div"
                  >
                    Red - XL
                  </Typography>
                </div>

                <div>
                  <Typography
                    variant="overline" 
                    display="block" 
                    gutterBottom
                  >
                    Expected Start Date
                  </Typography>
                  <Typography
                    variant="h5" 
                    gutterBottom 
                    component="div"
                  >
                    28 March 2021
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="overline" 
                    display="block" 
                    gutterBottom
                  >
                    Expected End Date
                  </Typography>
                  <Typography
                    variant="h5" 
                    gutterBottom 
                    component="div"
                  >
                    28 March 2021
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="overline" 
                    display="block" 
                    gutterBottom
                  >
                    Work Duration
                  </Typography>
                  <Typography
                    variant="h5" 
                    gutterBottom 
                    component="div"
                  >
                    28 Days
                  </Typography>
                </div>
              </Box>
              </Grid>
            </Grid>
            <GridItemX >
              <Table/>
            </GridItemX>
            <Divider fullWidth />
            <Grid container>
              <Box sx={{marginBottom: 15}}>
                <Typography variant="h6">
                  This Document Generated Automatically
                </Typography>
              </Box>
            </Grid>
          </PaperStyled>
        </RootStyle>
      </MHidden>
  )
}

export default FirstPage;