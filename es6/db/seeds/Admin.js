import faker from 'faker';

const admin = {
  id: 1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: 'admin@youdoc.com',
  username: 'admin',
  password: 'password',
  roleId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

export default admin;
