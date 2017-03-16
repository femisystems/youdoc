import { expect } from 'chai';
import Db from '../../models/Index';
import seeds from '../../db/seeds/Index';

const roles = seeds.validRoles;
const users = seeds.validUsers;

/**
 * USER MODEL
 *
 * CREATE => Create user(s)
 * UPDATE => Update user(s)
 */
describe('USER MODEL TEST', () => {
  // setup
  before(() => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate([users[0], users[1]]);
      });
  });

  // teardown
  after(() => Db.Users.sequelize.sync({ force: true }));

  describe('CREATE', () => {
    it('1. Should create a user when valid details are given', () => {
      Db.Users.create(users[2])
        .then((user) => {
          expect(user.dataValues.firstName).to.equal(users[2].firstName);
          expect(user.dataValues.lastName).to.equal(users[2].lastName);
          expect(user.dataValues.email).to.equal(users[2].email);
          expect(user.dataValues.username).to.equal(users[2].username);
        });
    });
  });

  describe('UPDATE', () => {
    it('1. Should be able to update user details', () => {
      const update = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'newpassword'
      };

      Db.Users.create(users[3])
        .then((user) => {
          user.update(update)
            .then((updatedUser) => {
              expect(updatedUser.firstName).to.equal(update.firstName);
              expect(updatedUser.lastName).to.equal(update.lastName);
            });
        });
    });
  });

  describe('NULL DATA VIOLATION', () => {
    const newUser = Object.assign({}, users[4]);
    newUser.firstName = null;

    it('1. Should not create user with null firstName', () => {
      Db.Users.create(newUser)
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('firstName cannot be null');
        });
    });
  });

  describe('UNIQUE DATA VIOLATION', () => {
    const newUser = Object.assign({}, users[3]);
    newUser.id = 6;

    it('1. Should not create user with existing username', () => {
      Db.Users.create(newUser)
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('email must be unique');
        });
    });
  });
});
