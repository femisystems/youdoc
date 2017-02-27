import { expect } from 'chai';
import { Roles, Users, Types } from '../../models/Index';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';
import typeSeeds from '../../db/seeds/Types';

describe('TYPE MODEL TEST', () => {
  before(() => Roles.bulkCreate(roleSeeds));
  before(() => Users.create(adminSeed));
  before(() => Types.bulkCreate(typeSeeds));

  after(() => Roles.sequelize.sync({ force: true }));
  after(() => Users.sequelize.sync({ force: true }));
  after(() => Types.sequelize.sync({ force: true }));

  describe('#Create', () => {
    const typeOne = Types.build({
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
      typeOne
        .save()
        .then()
        .catch((err) => {
          expect(err.errors[0].type).to.equal('unique violation');
          expect(err.errors[0].message).to.equal('title must be unique');
        });
    });
    it('2. Should not allow null data persistence', () => {
      Types
        .create(typeTwo)
        .then()
        .catch((err) => {
          expect(err.errors[0].type).to.equal('notNull Violation');
          expect(err.errors[0].message).to.equal('title cannot be null');
        });
    });
  });

  describe('#Read', () => {
    it('1. Type should exist with a property title', () => {
      Types
        .findAll()
        .then((type) => {
          expect(type).to.have.length.above(1);
          expect(type[0]).to.have.property('title');
        });
    });
  });

  describe('#Update', () => {
    it('1. Should be able to update type title', () => {
      const typeId = 1;
      const update = { title: 'my agenda' };

      Types
        .findById(typeId)
        .then((agenda) => {
          agenda
            .update(update)
            .then(updatedType => expect(updatedType.title).to.equal(update.title));
        });
    });
  });

  describe('#Delete', () => {
    it('1. Should be able to delete type', () => {
      const typeId = 1;

      Types
        .findById(typeId)
        .then((type) => {
          type.destroy()
            .then(() => {
              Types
                .findById(typeId)
                .then()
                .catch(err => expect(err.message).to.equal('relation "Types" does not exist'));
            });
        });
    });
  });
});
