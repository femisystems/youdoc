import { expect } from 'chai';
import { Roles, Users, Types, Documents } from '../../models/Index';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';
import userSeeds from '../../db/seeds/Users';
import typeSeeds from '../../db/seeds/Types';
import docSeeds from '../../db/seeds/Documents';

const defaultUsers = [adminSeed, userSeeds[0], userSeeds[1], userSeeds[2]];

describe('DOCUMENT MODEL TEST', () => {
  // setup
  before((done) => {
    Roles
      .bulkCreate(roleSeeds)
      .then(() => {
        Users.bulkCreate(defaultUsers, { individualHooks: true })
          .then(() => {
            Types.bulkCreate(typeSeeds).then(() => done());
          });
      });
  });

  // teardown
  after((done) => {
    Users.sequelize.sync({ force: true })
      .then(() => {
        Roles.sequelize.sync({ force: true })
          .then(() => done());
      });
  });

  describe('#Create', () => {
    it('1. Should not allow null data persistence', () => {
      Documents
        .create(docSeeds[0])
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('Document title cannot be empty');
        });
    });
    it('2. Should create document if data are valid', () => {
      Documents
        .create(docSeeds[1])
        .then((doc) => {
          expect(doc).to.be.an('object');
          expect(doc).to.have.property('title');
          expect(doc).to.have.property('content');
          expect(doc).to.have.property('ownerId');
          expect(doc).to.have.property('accessLevel');
          expect(doc).to.have.property('ownerRoleId');
        });
    });
  });

  describe('#Read', () => {
    it('1. Should be able to fetch multiple documents', () => {
      Documents
        .findAll({})
        .then((docs) => {
          expect(docs).to.be.instanceof(Array);
          expect(docs[0]).to.have.property('title');
          expect(docs[0]).to.have.property('content');
        });
    });
    it('2. Should be able to find specific document by id.', () => {
      const docId = 1;
      Documents
        .findById(docId)
        .then((doc) => {
          expect(doc).to.be.an('object');
          expect(doc).to.have.property('title');
          expect(doc).to.have.property('content');
        });
    });
    it('3. Should return error if specific document is not found', () => {
      const docId = 50;
      Documents
        .findById(docId)
        .then((doc) => {
          expect(doc).to.be.null;
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
