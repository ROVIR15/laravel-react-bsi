import React from 'react';
import {
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
        <Stack 
          direction="row"
          spacing={2}
        >
          <PaperStyle>
            <Typography variant="h5">
              {days}
            </Typography>
            <Typography variant="body1">
              Days
            </Typography>
          </PaperStyle>
          <PaperStyle>
            <Typography variant="h5">
              {hours}
            </Typography>
            <Typography variant="body1">
              Hours
            </Typography>
          </PaperStyle>
          <PaperStyle>
            <Typography variant="h5">
              {minutes}
            </Typography>
            <Typography variant="body1">
              Minutes
            </Typography>
          </PaperStyle>
          <PaperStyle>
            <Typography variant="h5">
              {seconds}
            </Typography>
            <Typography variant="body1">
              Seconds
            </Typography>
          </PaperStyle>
        </Stack>
  )
}

export default ShowCounter;