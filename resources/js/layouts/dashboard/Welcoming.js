import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const CardStyled = styled(Card)(({theme}) => ({
    color: "rgb(33, 43, 54)", 
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", 
    backgroundImage: "none", 
    overflow: "hidden", 
    position: "relative", 
    borderRadius: "16px", 
    zIndex: "0", 
    boxShadow: "none", 
    textAlign: "center", 
    backgroundColor: "rgb(209, 233, 252)"
}))

function Welcoming() {
  return (
    <CardStyled
      sx={{
        height: "100%", 
        width: '80%',
        margin: 'auto',
        display: "flex", 
        textAlign: "left", 
        alignItems: "center", 
        justifyContent: "space-between"
      }}
    >
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">
            Welcome back! <br/>
            Buana Sandang Indonesia <br/>
            Information System
          </Typography>

          <Typography variant="body1">
            Sekarang kamu berada di halaman paling depan. Kamu bisa memilih menu dengan memilih menu disamping kanan ini atau jika kamu kesulitan bisa menekan tombol ikon garis tiga di pojok kanan atas
          </Typography>
          
        </Stack>

      </CardContent>
      
      <Box sx={{margin: '0 2em'}}>
        <img src="/data_file/business-3d.png" alt="welcome" sx={{minWidth: '7em'}}/>
      </Box>

    </CardStyled>
  )
}

export default Welcoming