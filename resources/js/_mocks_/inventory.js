import faker from '@faker-js/faker';
import { getUnit } from '@mui/material/styles/cssUtils';
// utils

const PRODUCT_UNIT = [
  " Bag",
  "Lot",
  " Board Feet",
  "Linear Yard",
  " Bale",
  "housand",
  " Bottle",
  "Milligram",
  " Box",
  "Milliliter",
  "Hundred",
  "Millimeter",
  " Cubic Centimeter",
  "Minute",
  " Cubic Feet",
  "Month",
  " Curie",
  "Micron",
  " Cylinder",
  "Meter",
  " Centimeter",
  "Omega",
  " Can",
  "Ounce",
  " Case",
  "Package",
  " Carton",
  "Piece",
  " Hundred Weight",
  "Page",
  " Cubic Yard",
  "Pack",
  " Diameter",
  "Pail",
  " Drum",
  "Pair",
  " Dewar",
  "Pint",
  " Day",
  "Quarter",
  " Dozen",
  "Quart",
  " Each",
  "Rod",
  " Feet",
  "Roll",
  " Gallon",
  "Ream",
  " Gram",
  "Square Feet",
  " Grain",
  "Sheet",
  " Gross",
  "Set",
  " Hour",
  "Square Yard",
  " Inch",
  "Tube",
  " Jar",
  "Transaction",
  " Kilogram",
  "Unit",
  " Kit",
  "Vial",
  " Lambda",
  "Week",
  " Pound",
  "Yard",
  " Linear Feet",
  "Year"
];

const PRODUCT_CAT_MATERIAL = [
    'Finished Goods',
    'Raw Materials',
    'Widiw Material'
];

const PRODUCT_COLOR = [
    'Red',
    'Yellow',
    'Purple',
    'YEAY'
];

const PRODUCT_SIZE = [
    'S',
    'M',
    'L',
    'XL'
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// ----------------------------------------------------------------------

const goods = [...Array(24)].map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  unit_measurement: PRODUCT_UNIT[getRandomInt(70)],
  category: PRODUCT_CAT_MATERIAL[getRandomInt(3)],
  brand: PRODUCT_SIZE[getRandomInt(4)],
  type: PRODUCT_COLOR[getRandomInt(4)]
}));

export default goods;