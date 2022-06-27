import React, {useEffect} from 'react';
import {Card, Button, Input, Stack} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ValidateRowModelControlGrid({ columns, rows, handleResetRows, handleAddRow, handleOnChangeUpload, handleOnSubmitUpload, ...rest }) {
  
  return (
    <Card
      sx={{
		height: 600,
		padding: '2em',
		bgColor: 'none',
        width: 1,
        '& .MuiDataGrid-cell--editing': {
          bgcolor: 'rgb(255,215,115, 0.19)',
          color: '#1a3e72',
          '& .MuiInputBase-root': {
            height: '100%',
          },
        },
        '& .Mui-error': {
          bgcolor: (theme) =>
            `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
          color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
        },
      }}
    >
      <Stack
        sx={{ width: '100%', mb: 1 }}
        direction="row"
        alignItems="flex-start"
        columnGap={1}
      >
      	<label htmlFor="button-file">
      	  <Input accept=".csv" id="button-file" multiple type="file"
			onChange={handleOnChangeUpload} sx={{ display: 'none'}} />
      	  <Button component="span" size="small">
      	    Upload
      	  </Button>
      	</label>
        <Button size="small" onClick={handleResetRows}>
          Reset
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add Data
        </Button>
      </Stack>
      <DataGrid 
	    rows={rows ? rows : mrows } 
		columns={columns ? columns : estColumns} 
		{...rest}

		initialState={{
		  ...rows.initialState,
		  columns: {
		    columnVisibilityModel: {
		  		id: false,
		  		work_center_id: false,
		  		labor_id: false,
		    },
		  },
	    }}
	  />
    </Card>
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
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const mrows = [
	{
		"id": "8EA9AA23-B7DB-9A34-449C-2D6B1D62F684",
		"name": "Audrey Alvarado",
		"email": "velit.quisque.varius@hotmail.edu",
		"dateCreated": "2022-05-26 20:38:32",
		"lastLogin": "2022-11-27 01:35:40"
	},
	{
		"id": "E7DD1F90-3C1D-B3C5-A804-A97DDE2CFF8B",
		"name": "Hayes Wright",
		"email": "auctor.velit.aliquam@outlook.couk",
		"dateCreated": "2022-06-24 13:46:27",
		"lastLogin": "2023-02-20 15:04:38"
	},
	{
		"id": "666EB7A2-A822-7F7B-FBB6-8B2A2D52799D",
		"name": "Curran Cervantes",
		"email": "eros.nec@hotmail.couk",
		"dateCreated": "2022-10-06 19:09:11",
		"lastLogin": "2022-03-06 05:15:35"
	},
	{
		"id": "4CD28D67-D86B-651B-D715-75333D4A54BB",
		"name": "Nigel Williamson",
		"email": "erat@protonmail.net",
		"dateCreated": "2021-05-22 20:30:57",
		"lastLogin": "2022-08-24 16:42:32"
	},
	{
		"id": "E68533E5-D344-1111-2833-22DD11E4125C",
		"name": "Ori Pratt",
		"email": "erat.vitae@google.edu",
		"dateCreated": "2021-05-23 01:30:27",
		"lastLogin": "2021-12-18 18:16:51"
	},
	{
		"id": "638E2C1C-4E6F-711B-8F31-46929E666A71",
		"name": "Amaya Robinson",
		"email": "vivamus.molestie.dapibus@aol.org",
		"dateCreated": "2023-01-17 08:18:40",
		"lastLogin": "2022-06-17 09:44:06"
	},
	{
		"id": "96769EE2-A454-4B09-D237-5978C0B22927",
		"name": "Elton Harrington",
		"email": "arcu.et@aol.org",
		"dateCreated": "2021-07-11 09:03:33",
		"lastLogin": "2022-03-31 08:03:35"
	},
	{
		"id": "BD22A874-71BE-89C2-1B21-F8FA8C16E3A8",
		"name": "Ignacia Wynn",
		"email": "laoreet.posuere.enim@yahoo.ca",
		"dateCreated": "2021-12-11 07:18:17",
		"lastLogin": "2022-01-14 09:17:54"
	},
	{
		"id": "88B373D6-57A5-C16B-7187-209961CD4D68",
		"name": "Allistair Buckner",
		"email": "venenatis@icloud.edu",
		"dateCreated": "2022-07-06 10:51:07",
		"lastLogin": "2021-09-12 23:29:33"
	},
	{
		"id": "CE6123EE-C4D6-3897-262A-E2337E319322",
		"name": "Serena Dorsey",
		"email": "sed.congue@google.net",
		"dateCreated": "2022-03-05 07:57:48",
		"lastLogin": "2021-04-23 19:18:05"
	}
]