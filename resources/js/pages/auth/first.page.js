import React from 'react';
import {Card, Typography} from '@mui/material';
import { MHidden } from '../../components/@material-extend';

function FirstPage(){
  return (
      <MHidden width="mdDown">
        <Card>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
        </Card>
      </MHidden>
  )
}

export default FirstPage;