import TrendUp from '@iconify/icons-eva/trending-up-fill'
import TrendDown from '@iconify/icons-eva/trending-down-fill'
import { Icon } from '@iconify/react'
import { Box, Grid, Paper, styled, Typography } from '@mui/material'
import React from 'react';
import { fCurrency, fNumber } from '../../../../utils/formatNumber';

const DataRevenue = styled(Paper)(({theme}) => ({
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
  backgroundImage: "none", 
  overflow: "hidden", 
  position: "relative", 
  borderRadius: "16px", 
  zIndex: "0", 
  padding: "24px", 
  boxShadow: "none", 
  color: "rgb(122, 9, 48)", 
  backgroundColor: "rgb(255, 227, 213)"
}))

const DataQuantity = styled(Paper)(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  padding: "24px", 
  borderRadius: "16px", 
  overflow: "hidden", 
  position: "relative", 
  color: "rgb(255, 255, 255)", 
  backgroundColor: "rgb(0, 108, 156)"
}))

const ComponentOne = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  justifyContent: "space-between", 
  marginBottom: "24px"
}))

const ComponentTwo = styled('div')(({theme}) => ({
  display: "flex", 
  flexDirection: "row", 
  alignItems: "center", 
  justifyContent: "flex-end", 
  marginBottom: "4.8px"
}))

const TextOne = styled(Typography)(({theme}) => ({
  margin: "0px 0px 16px", 
  fontWeight: "600", 
  lineHeight: "1.57143", 
  fontSize: "1.2rem"
}))

const TextTwo = styled(Typography)(({theme}) => ({
  margin: "0px", 
  fontWeight: "700", 
  lineHeight: "1.5", 
  fontSize: "2rem"
}))

const TextThree = styled(Typography)(({theme}) => ({
  margin: "0px", 
  lineHeight: "1.57143", 
  fontSize: "0.875rem", 
  fontWeight: "400", 
  opacity: "0.72"
}))

function Test({value, qty}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <DataRevenue>
          <ComponentOne>
            <div>
            <TextOne component="p">
              Total Income
            </TextOne>

            <TextTwo component="p" sx={{minSize: '2rem'}}>
              Rp. {fCurrency(value)}
            </TextTwo>
            </div>
            <div>
              <ComponentTwo>
                <Icon icon={TrendUp}/>
                <Typography 
                  component="span" 
                  sx={{
                    margin: "0px 0px 0px 4px", 
                    fontWeight: "600", 
                    lineHeight: "1.57143", 
                    fontSize: "0.875rem"
                  }}
                >
                  0 %
                </Typography>
              </ComponentTwo>
              <TextThree component="span" variant="subtitle1">
                than last month
              </TextThree>
            </div>
          </ComponentOne>
        </DataRevenue>
      </Grid>
      <Grid item xs={6}>
        <DataQuantity>
          <Box>
            <Typography variant="h4">
              {fNumber(qty)}
            </Typography>
            <Typography variant="body2" component="p">
              Total Garment
            </Typography>
          </Box>
        </DataQuantity>
      </Grid>
    </Grid>
  )
}

export default Test