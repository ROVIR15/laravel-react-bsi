import faker from '@faker-js/faker';
import { getUnit } from '@mui/material/styles/cssUtils';
// utils

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

const buyer = [...Array(24)].map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  category: PRODUCT_CAT_MATERIAL[getRandomInt(3)],
  size: PRODUCT_SIZE[getRandomInt(4)],
  color: PRODUCT_COLOR[getRandomInt(4)]
}));

export default buyer;