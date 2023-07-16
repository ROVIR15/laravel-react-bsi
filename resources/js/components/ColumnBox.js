import React from 'react'
import { styled } from "@mui/material"

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  padding: '1em 0.75em',
  border: "1px dashed #b8b8b8",
  borderRadius: '8px',
  width: "100%"
}))

export default ColumnBox;