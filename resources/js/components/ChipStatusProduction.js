import React from 'react'
import { styled } from '@mui/system';
import { Chip } from '@mui/material';

const ChipStyled = styled(Chip)(({theme}) => ({
  color: '#fff',
  fontWeight: 'bolder'
}))

function ChipStatusProduction(param){
  switch (param) {
    case "Completed":
      return <ChipStyled label={param} color="success"/>
      break;

    case "Running":
      return <ChipStyled label={param} color="primary"/>
      break;
      
    case "On Shipment":
      return <ChipStyled label={param} color="info"/>
      break;
      
    case "Waiting":
      return <ChipStyled label={param} color="warning"/>
      break;

    default:
      return <ChipStyled variant="filled" label="Draft"/>
      break;
  }
}
export default ChipStatusProduction