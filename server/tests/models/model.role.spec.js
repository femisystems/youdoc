import { expect } from 'chai';
import Db from '../../models/Index';
import seeds from '../../db/seeds/Index';

const roles = seeds.validRoles;
const invalidRoles = seeds.invalidRoles;

/**
 * ROLE MODEL
 *
 * CREATE => Create role(s)
 * UPDATE => Update role(s)
 */
describe('ROLE MODEL TEST', () => {
  // setup
  beforeEach((done) => {
    Db.Roles.bulkCreate([roles[0], roles[1]])
      .then(() => done());
  });

  // teardown
  afterEach((done) => {
    Db.sequelize.sync({ force: true })
      .then(() => done());
  });

  describe('CREATE', () => {
    it('1. Should create a role', (done) => {
      Db.Roles.create(roles[2])
        .then((role) => {
          expect(role).to.be.an('object');
          expect(role.dataValues.title).to.equal('facilitator');
          done();
        });
    });
  });

  describe('UNIQUE VALIDATION', () => {
    it('1. Should not allow new role to be created if title already exists', (done) => {
      Db.Roles.create(invalidRoles[0])
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('title must be unique');
          expect(err.errors[0].type).to.equal('unique violation');
          done();
        });
    });
  });

  describe('NOT NULL VALIDATION', () => {
    it('1. Should not allow new role to be created without title', (done) => {
      Db.Roles.create(invalidRoles[1])
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('Title cannot be empty');
          expect(err.errors[0].type).to.equal('Validation error');
          done();
        });
    });
  });

  describe('UPDATE', () => {
    it('1. Should not allow role update', (done) => {
      const update = { title: 'senior consultant' };

      Db.Roles.findOne({ where: { title: 'consultant' } })
        .then((ourrole) => {
          ourrole.update(update)
            .then((updatedRole) => {
              expect(updatedRole.dataValues.title).to.equal('consultant');
              done();
            });
        });
    });
  });
});
