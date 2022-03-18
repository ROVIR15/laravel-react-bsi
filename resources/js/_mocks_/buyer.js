import faker from '@faker-js/faker';
// utils

// ----------------------------------------------------------------------

const buyer = [...Array(24)].map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  province: faker.address.state(),
  country: faker.address.country(),
  postal_code: faker.address.zipCode(),
  email: faker.internet.email(),
  phone_number: faker.phone.phoneNumber()
}));

export default buyer;