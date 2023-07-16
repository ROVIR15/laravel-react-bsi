import React, { useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ValidateRowModelControlGrid({
  columns,
  rows,
  handleUpdateAllRows,
  handleAddRow,
  ...rest
}) {
  return (
    <Box
      sx={{
        height: 400,
        backgroundColor: 'white',
        width: 1,
        '& .MuiDataGrid-cell--editing': {
          bgcolor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
          '& .MuiInputBase-root': {
            height: '100%'
          }
        },
        '& .MuiDataGrid-virtualScrollerContent': {
          backgroundColor: '#f5f6fa'
        },
        '& .Mui-error': {
          bgcolor: (theme) => `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
          color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f')
        }
      }}
    >
      <Stack sx={{ width: '100%', mb: 1 }} direction="row" alignItems="flex-start" columnGap={1}>
        <Button size="small" onClick={handleUpdateAllRows} disabled={!handleUpdateAllRows ? true : false}>
          Update
        </Button>
      </Stack>
      <DataGrid
        rows={rows ? rows : mrows}
        columns={columns ? columns : estColumns}
        {...rest}
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  );
}

const estColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
    preProcessEditCellProps: (params) => {
      const isValid = validateEmail(params.props.value);
      return { ...params.props, error: !isValid };
    }
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true
  }
];

const mrows = [];
