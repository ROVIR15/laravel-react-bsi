import { Container } from '@mui/material'
import React from 'react'
import Page from '../components/Page'

function Layout({ children }) {
  return (
    <Page title="Dashboard | BSI IS">
      <Container>
        {children}
      </Container>
    </Page>
  )
}

export default Layout