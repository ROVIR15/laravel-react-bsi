import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'auto'
});

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  padding: '0px 12px 12px',
  maxHeight: 640,
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
  '& .simplebar-placeholder': {
    display: 'unset'
  },
  '& .simplebar-offset': {
    right: 0
  },
  '& .simplebar-height-auto-observer-wrapper': {
    boxSizing: "inherit!important", 
    height: "100%", 
    width: "100%", 
    maxWidth: "1px", 
    position: "relative", 
    float: "left", 
    maxHeight: "1px", 
    overflow: "hidden", 
    zIndex: "-1", 
    padding: "0", 
    margin: "0", 
    pointerEvents: "none", 
    flexGrow: "inherit", 
    flexShrink: "0", 
    flexBasis: "0"
  }
}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
};

export default function Scrollbar({ children, sx, ...other }) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
