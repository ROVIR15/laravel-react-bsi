import React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

const StyledBox = styled(Box)(() => ({
  height: "24px",
  minWidth: "22px",
  lineHeight: 0,
  borderRadius: "6px",
  cursor: "default",
  alignItems: "center",
  whiteSpace: "nowrap",
  display: "inline-flex",
  justifyContent: "center",
  textTransform: "capitalize",
  padding: "0px 8px",
  fontSize: "0.75rem",
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 700
}));

export default function PinStatus({status, ...props}){
  return <StyledBox {...props}>{status}</StyledBox>
};