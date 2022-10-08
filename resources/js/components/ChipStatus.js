import React from 'react'
import { styled } from '@mui/system';
import { Chip } from '@mui/material';

const ChipStyled = styled(Chip)(({theme}) => ({
  color: '#fff',
  fontWeight: 'bolder'
}))

function ChipStatus(param){
  switch (param) {
    case "Submit":
      return <ChipStyled label={param} color="primary"/>
      break;

    case "Reject Review" || "Reject Approve":
      return <ChipStyled label={param} color="error"/>
      break;
      
    case "Review":
      return <ChipStyled variant="filled"  label={param} color="warning"/>
      break;

    case "Approve":
      return <ChipStyled label={param} color="success"/>
      break;
      
    default:
      return <Chip label="Created"/>
      break;
  }
}
export default ChipStatus