import { expect } from 'chai';
import { Roles, Users } from '../../models/Index';
import roleSeeds from '../../db/seeds/Roles';
import userSeeds from '../../db/seeds/Users';


describe('USER MODEL TEST', () => {
  // setup
  beforeEach(() => Roles.bulkCreate(roleSeeds));
  beforeEach(() => Users.bulkCreate(userSeeds));

  // teardown
  afterEach(() => Roles.sequelize.sync({ force: true }));
  afterEach(() => Users.destroy({ where: {} }));

  // validate user data
  describe('#Validate', () => {
    const nonUniqueUser = {
      id: 8,
      firstName: 'John',
      lastName: 'Doe',
      email: 'uniqueuser@youdoc.com',
      username: 'uniqueuser',
      password: 'password',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const nullDataUser = {
      id: 9,
      firstName: '',
      lastName: 'doe',
      email: 'johndoe@youdoc.com',
      username: 'johndoe',
      password: 'password',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('1. Should not allow unique data violation', () => {
      Users
        .create(nonUniqueUser)
        .then()
        .catch((err) => {
          expect(err.errors[0].type).to.equal('unique violation');
          expect(err.errors[0].message).to.equal('email must be unique');
        });
    });
    it('2. Should not allow null data persistence', () => {
      Users
        .create(nullDataUser)
        .then()
        .catch((err) => {
          expect(err.errors[0].type).to.equal('Validation error');
          expect(err.errors[0].message).to.equal('Firstname must be 2 to 15 characters long.');
        });
    });
  });

  // Read user data
  describe('#Read', () => {
    it('1. When users are created, they should exist', () => {
      Users
        .findAll()
        .then((allUsers) => {
          expect(Array.isArray(allUsers)).to.be.true;
          expect(allUsers).to.have.length.above(0);
        });
    });
    it('2. Users should have valid details', () => {
      Users
        .findAll()
        .then((allUsers) => {
          let singleUser;
          allUsers.forEach((user) => {
            singleUser = user;
            expect(singleUser.firstName).to.exist;
            expect(singleUser.lastName).to.exist;
            expect(singleUser.email).to.exist;
            expect(singleUser.username).to.exist;
            expect(singleUser.password).to.exist;
            expect(singleUser.roleId).to.exist;
          });
        });
    });
  });

  // update user data
  describe('#Update', () => {
    const userId = 2;
    const update = { firstName: 'Wilson' };
    it('1. Should allow user data update', () => {
      Users
        .findById(userId)
        .then((user) => {
          user.update(update)
            .then((updatedUser) => {
              expect(updatedUser.firstName).to.equal(update.firstName);
            });
        });
    });
    it('2. Should ensure that updated password is hashed', () => {
      update.password = 'newpassword';
      Users
        .findById(userId)
        .then((user) => {
          user.update(update)
            .then((updatedUser) => {
              expect(updatedUser.firstName).to.equal(update.firstName);
              expect(updatedUser.password).to.not.equal(update.password);
            });
        });
    });
  });

  // delete user data
  describe('#Delete', () => {
    it('1. Should delete user data given a user id', () => {
      const userId = 2;

      Roles
        .findById(userId)
        .then((role) => {
          role.destroy()
            .then(() => {
              Roles
                .findById(userId)
                .then()
                .catch(err => expect(err.message).to.equal('relation "Users" does not exist'));
            });
        });
    });
  });
});
