import React from 'react';
import {
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: 5,
  textAlign: 'center'
}))

function ShowCounter({ days, hours, minutes, seconds }){
  return (
        <Grid
          container 
          direction="row"
          spacing={2}
        >
          <Grid item xs={6} sm={3} sx={{ textAlign: 'center'}}>
            <Typography variant="h5">
              {days}
            </Typography>
            <Typography variant="body1">
              Days
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: 'center'}}>
            <Typography variant="h5">
              {hours}
            </Typography>
            <Typography variant="body1">
              Hours
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: 'center'}}>
            <Typography variant="h5">
              {minutes}
            </Typography>
            <Typography variant="body1">
              Minutes
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: 'center'}}>
            <Typography variant="h5">
              {seconds}
            </Typography>
            <Typography variant="body1">
              Seconds
            </Typography>
          </Grid>
        </Grid>
  )
}

export default ShowCounter;