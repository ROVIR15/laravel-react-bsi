import React, { useMemo } from 'react';

export const columnsBC = useMemo(
  () => [
    { field: 'id', headerName: 'Order Item ID', editable: false, visible: 'hide' },
    { field: 'hs_code', headerName: 'Name', width: 350, editable: false },
    { field: 'serial_number_customs', headerName: 'Quantity', type: 'number', editable: true },
  ]
);
