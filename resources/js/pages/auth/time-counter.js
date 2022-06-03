import React, { useState, useEffect} from 'react';
import Page from '../../components/Page';

import {
  Box,
  Paper,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { MHidden } from '../../components/@material-extend';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: 180,
  }
}));

const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: 10,
  textAlign: 'center'
}))

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))* -1;
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * -1)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60) * -1);
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000 * -1);

  return [days, hours, minutes, seconds];
};

function FirstPage(){

  const [ days, hours, minutes, seconds ] = useCountdown('2022-04-05');

  return (
      <MHidden width="mdDown">
        <RootStyle>
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
        </RootStyle>
      </MHidden>
  )
}

export default FirstPage;