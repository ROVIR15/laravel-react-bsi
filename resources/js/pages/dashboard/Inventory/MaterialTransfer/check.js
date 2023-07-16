import React from 'react';
import { Grid, IconButton, Paper, Stack } from '@mui/material';

import { Icon } from '@iconify/react';
import CheckmarkFill from '@iconify/icons-eva/checkmark-fill';
import ExternalLink from '@iconify/icons-eva/external-link-fill';
import playButton from '@iconify/icons-eva/arrow-right-fill';

const _data = [
  {
    id: 1,
    party_name: 'Someone Else Request',
    assigned_to: 'Sewing Line 1'
  },
  {
    id: 2,
    party_name: 'Someone Else Request',
    assigned_to: 'Sewing Line 2'
  },
  {
    id: 3,
    party_name: 'Someone Else Request',
    assigned_to: 'Sewing Line 3'
  }
]

function CheckRecentMaterialTransfer() {
  return (
    <Grid container direction="row" spacing={2} justifyContent='center' alignItems='center'>
      {_data.map(function(item){
        return (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{
              paddingLeft : '1.25em',
              paddingRight : '0.75em',
              paddingY : '0.5em',
              maxWidth : '65%',
              margin: 'auto',
              border: '1px #0000004f solid'
            }}>
              <Grid container direction="rows" alignItems='center' spacing={2}>
                <Grid item xs={2}>
                  <IconButton>
                    <Icon icon={playButton}/>
                  </IconButton>
                  {item.id}
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'end'}}>
                  {item.party_name}
                </Grid>
                <Grid item xs={4}>
                  {item.assigned_to}
                </Grid>
                <Grid item xs={2}>
                  <Stack direction="row" justifyContent='end'>
                    <IconButton>
                      <Icon icon={CheckmarkFill} />
                    </IconButton>

                    <IconButton>
                      <Icon icon={ExternalLink} />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CheckRecentMaterialTransfer;