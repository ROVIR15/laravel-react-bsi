import React from 'react';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

function LoadingPage() {
  //Loadng
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Paper style={{ padding: '10em 5em' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ margin: '0 1em' }}>
          <img src="/data_file/3d-waiting.png" alt="welcome" sx={{ width: '1em' }} />
        </Box>
        <Typography variant="h2"> Hold on, we are working to store your data...</Typography>
      </Stack>

      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Paper>
  );
}

export default LoadingPage;
