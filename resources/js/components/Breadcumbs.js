import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { titleCase, firstLetterUpperCase } from '../utils/formatCase';

const LinkRouter = (props) => {
  return <Link {...props} component={RouterLink} />;
};

function Breadcumbs() {
  const location = useLocation();
  const pathname = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcumbs">
      {pathname.map((item, index) => {
        const last = index === pathname.length - 1;
        const to = `/${pathname.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="inherit">{titleCase(item.replace('-', ' '))}</Typography>
        ) : (
          <LinkRouter disabled={!last} underline="hover" color="inherit" to={to}>
            <Typography color="text.primary">{titleCase(item.replace('-', ' '))}</Typography>
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}

export default Breadcumbs;
