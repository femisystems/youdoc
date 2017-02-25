import { expect } from 'chai';
import Db from '../../models/Index';
import seed from '../../db/seeds/Role';

describe('#RoleTest', () => {
  // setup
  before(() => Db.Roles.bulkCreate(seed));

  // teardown
  after(() => Db.Roles.sequelize.sync({ force: true }));

  // create role
  describe('#Create', () => {
    it('1. Admin role was successfully created', () => {
      Db.Roles
        .findOne({ title: 'admin' })
        .then(role => expect(role.id).to.equal(1));
    });
    it('2. Other roles(consultant, facilitator, fellow) were successfully created', () => {
      Db.Roles
        .findAll()
        .then((roles) => {
          expect(roles.length).to.equal(4);
          expect(roles[1].title).to.equal('consultant');
          expect(roles[2].title).to.equal('facilitator');
          expect(roles[3].title).to.equal('fellow');
        });
    });
  });

  // validate create role input
  describe('#Validate', () => {
    it('1. Should not recreate an existing role', () => {
      const role5 = {
        id: 5,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      Db.Roles
      .create(role5)
      .then(role => expect(role).to.not.exist)
      .catch((err) => {
        expect(err.errors[0].type).to.equal('unique violation');
        expect(err.errors[0].message).to.equal('title must be unique');
      });
    });
    it('2. Should not create a role with null data', () => {
      const role6 = {};

      Db.Roles
      .create(role6)
      .then(role => expect(role).to.not.exist)
      .catch((err) => {
        expect(err.message).to.equal('notNull Violation: title cannot be null');
      });
    });
    it('3. Should not create a role with wrong data type', () => {
      const role7 = {
        id: 7,
        title: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      Db.Roles
      .create(role7)
      .then()
      .catch((err) => {
        expect(err.message).to.equal('notNull Violation: title cannot be null');
      });
    });
  });

  // update role
  describe('#Update', () => {
    it('1. Should update role by id', () => {
      const adminRoleId = 1;
      const update = { title: 'superAdmin' };

      Db.Roles
        .findById(adminRoleId)
        .then((role) => {
          role.update(update)
            .then(updatedRole => expect(updatedRole.dataValues.title).to.equal('superAdmin'));
        });
    });
  });

  // delete role
  describe('#Delete', () => {
    it('1. Should delete role by id', () => {
      const consultantRoleId = 2;

      Db.Roles
        .findById(consultantRoleId)
        .then((role) => {
          role.destroy()
            .then(() => {
              Db.Roles
                .findById(consultantRoleId)
                .then()
                .catch(err => expect(err.message).to.equal('relation "Roles" does not exist'));
            });
        });
    });
  });
});
