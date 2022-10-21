import React from 'react'
import { styled } from "@mui/material"

const ColumnBox = styled('div')(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%"
}))

export default ColumnBox;