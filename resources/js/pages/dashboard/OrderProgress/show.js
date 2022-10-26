import React, { useEffect, useState } from 'react';
import Sewing from './sewing'
import QC from './qc'
import FG from './fg'
// api
import API from '../../../helpers';
import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

function Display({ placeHolder }) {
  const {id} = useParams();
  const [sales, setSales] = useState({})
  const [sewing, setSewing] = useState([])
  const [qc, setQc] = useState([])
  const [fg, setFg] = useState([])


  useEffect(() => {
    handleUpdateData();
  }, [])

  const handleUpdateData = () => {
    // let params = `?fromDate=${filterDate.fromDate}&thruDate=${filterDate.thruDate}`;
    try { 
      API.getAOrder(id, (res) => {
        if(!res) {
          alert('error')
        } else {
          setSales(res.sales_order);
          setSewing(res.sewing)
          setQc(res.qc)
          setFg(res.fg)
        }
      });
    } catch (error) {
      alert('error')
    }
  }


  return (
    <>
    <Typography variant="h3">
      {sales?.po_number}
    </Typography>
    <Stack direction="column" spacing={2}>
      <Sewing placeHolder={null} items={sewing}/>
      <QC placeHolder={null} items={qc}/>
      <FG placeHolder={null} items={fg}/>
    </Stack>
    </>
  )
}

export default Display;