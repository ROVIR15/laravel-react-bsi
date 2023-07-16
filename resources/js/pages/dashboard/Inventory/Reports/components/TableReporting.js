import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { fCurrency } from '../../../../../utils/formatNumber';

const BoxStyle = styled(Box)(({ theme }) => ({
  margin: 12
}));

const NoBorderCell = styled(TableCell)(({ theme }) => ({
  border: 'unset'
}));

function createData(name, qty, unit_price) {
  return { name, qty, unit_price };
}

const rows = [
  createData('Product A', 200, 20000),
  createData('Product B', 200, 20000),
  createData('Product C', 200, 20000),
  createData('Product D', 200, 20000)
];

const __payload = [
	{
		"item_name": "dui, nec tempus",
		"material_code": "5684E6D9-0369-6341-778A-29E273D585D9",
		"category": "finished_goods,",
		"qty": 73,
		"unit_measurement": "roll",
		"unit_price": 613249
	},
	{
		"item_name": "Sed malesuada augue",
		"material_code": "41A7AD45-7119-2677-9A13-17347C9E59E3",
		"category": "raw_material,",
		"qty": 55,
		"unit_measurement": "roll",
		"unit_price": 127129
	},
	{
		"item_name": "in consequat enim",
		"material_code": "A1E6476C-E160-E5D3-6217-A72D681778F3",
		"category": "finished_goods,",
		"qty": 30,
		"unit_measurement": "yards",
		"unit_price": 829502
	},
	{
		"item_name": "vestibulum lorem, sit",
		"material_code": "EE4DD180-7072-4CB4-E2DC-D55822A5C1A7",
		"category": "raw_material,",
		"qty": 85,
		"unit_measurement": "kg",
		"unit_price": 584262
	},
	{
		"item_name": "orci quis lectus.",
		"material_code": "87C6BE7F-4ED9-74C3-44D9-78EC88AF6CA4",
		"category": "raw_material,",
		"qty": 37,
		"unit_measurement": "meter",
		"unit_price": 690012
	},
	{
		"item_name": "tempor arcu. Vestibulum",
		"material_code": "2D32C411-7B9E-33E9-4F17-38D4248187BC",
		"category": "finished_goods,",
		"qty": 25,
		"unit_measurement": "kg",
		"unit_price": 259926
	},
	{
		"item_name": "risus. Donec nibh",
		"material_code": "66876574-0E51-9BD8-3B98-8C505E773967",
		"category": "raw_material,",
		"qty": 20,
		"unit_measurement": "yards",
		"unit_price": 847749
	},
	{
		"item_name": "ligula. Aenean gravida",
		"material_code": "E911DA1A-BB7F-344D-A192-A1E329596EC3",
		"category": "raw_material,",
		"qty": 51,
		"unit_measurement": "meter",
		"unit_price": 473248
	},
	{
		"item_name": "Proin ultrices. Duis",
		"material_code": "B6453C21-6179-96A7-A421-36A2CD235D77",
		"category": "assembly_material",
		"qty": 60,
		"unit_measurement": "yards",
		"unit_price": 353020
	},
	{
		"item_name": "arcu eu odio",
		"material_code": "143CC028-0AF2-C1BB-942B-033A11396C2B",
		"category": "assembly_material",
		"qty": 24,
		"unit_measurement": "yards",
		"unit_price": 257062
	},
	{
		"item_name": "ac mi eleifend",
		"material_code": "DA3497E0-910F-8EAE-72EA-8237E74A8D84",
		"category": "finished_goods,",
		"qty": 49,
		"unit_measurement": "roll",
		"unit_price": 819785
	},
	{
		"item_name": "Duis elementum, dui",
		"material_code": "B6A82829-57E2-C78B-D62E-98A54D8352F3",
		"category": "raw_material,",
		"qty": 10,
		"unit_measurement": "roll",
		"unit_price": 132355
	},
	{
		"item_name": "eu, eleifend nec,",
		"material_code": "9267631D-5810-62E8-600A-69DCADD54AEB",
		"category": "raw_material,",
		"qty": 98,
		"unit_measurement": "kg",
		"unit_price": 757082
	},
	{
		"item_name": "nec, diam. Duis",
		"material_code": "9C1D4884-AB5D-BCE9-1089-C386611DD366",
		"category": "assembly_material",
		"qty": 65,
		"unit_measurement": "kg",
		"unit_price": 643469
	},
	{
		"item_name": "elit. Nulla facilisi.",
		"material_code": "EA67C0A3-88CE-6392-3794-E2A9B6C0D6DA",
		"category": "finished_goods,",
		"qty": 98,
		"unit_measurement": "yards",
		"unit_price": 374792
	},
	{
		"item_name": "Etiam laoreet, libero",
		"material_code": "3DE3F536-C6AE-346A-7E7C-339722850B10",
		"category": "finished_goods,",
		"qty": 56,
		"unit_measurement": "yards",
		"unit_price": 834122
	},
	{
		"item_name": "ornare tortor at",
		"material_code": "7289155B-CF49-8EC4-6D4C-466E8C47A2D5",
		"category": "finished_goods,",
		"qty": 99,
		"unit_measurement": "yards",
		"unit_price": 387857
	},
	{
		"item_name": "bibendum ullamcorper. Duis",
		"material_code": "CBA1E546-C455-B5CE-6489-D1F3B229A881",
		"category": "finished_goods,",
		"qty": 66,
		"unit_measurement": "roll",
		"unit_price": 21059
	},
	{
		"item_name": "lacinia mattis. Integer",
		"material_code": "E0DE9C8A-1E98-A615-4226-A299240DB708",
		"category": "assembly_material",
		"qty": 81,
		"unit_measurement": "roll",
		"unit_price": 82283
	},
	{
		"item_name": "laoreet, libero et",
		"material_code": "8EEBE62E-1799-9B18-1B67-10E5CF42576F",
		"category": "raw_material,",
		"qty": 29,
		"unit_measurement": "kg",
		"unit_price": 298095
	}
]

const table_columns = [
  'material_name',
  'material_code',
  'category',
  'sub',
  'qty',
  'unit_measurement',
  'amount',
  'total'
];

export default function BasicTable({ payload, tax, currency }) {
  const sumSubTotal = () => {
    var sub = 0;
    __payload.map(function (item) {
      sub = sub + item.qty * item.unit_price;
    });
    return Math.floor(sub);
  };

  const total = () => {
    var sub = 0;
    __payload.map(function (item) {
      sub = sub + item.qty * item.unit_price;
    });

    if (tax < 1) return fCurrency(Math.floor(sub), currency);
    else return fCurrency(Math.floor(sub) * (1 + tax / 100), currency);
  };
  return (
    <>
      <div className="wk_table wk_style1">
        <div className="wk_border">
          <div className="wk_table_responsive">
            <table>
              <thead>
                <tr>
                  <th colSpan='2' className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                    Bea Cukai
                  </th>
                  <th colSpan='2' className="wk_width_3 wk_text_center wk_semi_bold wk_primary_color wk_gray_bg">
                    Sales Order
                  </th>
                </tr>
                <tr>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">Tanggal</th>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">No Bea</th>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">Tanggal</th>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">No SO</th>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">Kode Barang</th>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">Item Name</th>
                  <th className="wk_width_3 wk_semi_bold wk_primary_color wk_gray_bg">
                    Category Name
                  </th>
                  <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">Qty</th>
                  <th className="wk_width_1 wk_semi_bold wk_primary_color wk_gray_bg">Satuan</th>
                  <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg">Nilai</th>
                  <th className="wk_width_2 wk_semi_bold wk_primary_color wk_gray_bg">Total</th>
                </tr>
              </thead>
              <tbody>
                {__payload.map((row, index) => (
                  <tr>
                    <td className="wk_width_2"> 12/12/2023 </td>
                    <td className="wk_width_2"> {`BC ${12389+index}`} </td>
                    <td className="wk_width_2"> 12/12/2023 </td>
                    <td className="wk_width_2"> {`SO ${39800+index}`} </td>
                    <td className="wk_width_3">{row.material_code}</td>
                    <td className="wk_width_2">{row.item_name}</td>
                    <td className="wk_width_2">{row.category}</td>
                    <td className="wk_width_1">{row.qty}</td>
                    <td className="wk_width_1">{row.unit_measurement}</td>
                    <td className="wk_width_2">{fCurrency(row.unit_price, 'id')}</td>
                    <td className="wk_width_2">{row.satuan}</td>
                    {/* <td className="wk_width_2">{row.unit_price * row.qty}</td> */}
                    <td className="wk_width_2 wk_text_right">
                      {fCurrency(Math.floor(row.qty * row.unit_price), 'id')}
                    </td>
                    {/* <td className="wk_width_2">{row.satuan}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
