import { expect } from 'chai';
import Db from '../../models/Index';
import seeds from '../../db/seeds/Index';

const roles = seeds.validRoles;
const users = seeds.validUsers;
const types = seeds.validTypes;

/**
 * TYPE MODEL
 *
 * CREATE => Create user(s)
 * UPDATE => Update user(s)
 */

describe('TYPE MODEL TEST', () => {
  before(() => Db.Roles.bulkCreate(roles));
  before(() => Db.Users.create(users[0]));
  before(() => Db.Types.bulkCreate(types));

  after(() => Db.sequelize.sync({ force: true }));

  describe('VALIDATION', () => {
    const typeOne = Db.Types.build({
      id: 6,
      title: 'agenda',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const typeTwo = {
      id: 7,
      title: '',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('1. Should not allow duplication of record', () => {
      typeOne.save()
        .then()
        .catch((err) => {
          expect(err.errors[0].type).to.equal('unique violation');
          expect(err.errors[0].message).to.equal('title must be unique');
        });
    });
    it('2. Should not allow null data persistence', () => {
      Db.Types.create(typeTwo)
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('Type cannot be empty!');
        });
    });
  });

  describe('UPDATE', () => {
    it('1. Should not be able to update type title', () => {
      const update = { title: 'New title' };

      Db.Types.findOne({ where: { title: 'memo' } })
        .then((doctype) => {
          doctype.update(update)
            .then((updatedType) => {
              expect(updatedType.title).to.equal('memo');
            });
        });
    });
  });
});
