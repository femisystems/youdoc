import { expect } from 'chai';
import Db from '../../models/Index';
import seeds from '../../db/seeds/Index';

const roles = seeds.validRoles;
const users = seeds.validUsers;
const types = seeds.validTypes;
const docs = seeds.validDocs;

/**
 * DOCUMENT MODEL
 *
 * CREATE => Create user(s)
 * UPDATE => Update user(s)
 */
describe('DOCUMENT MODEL TEST', () => {
  // setup
  before((done) => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate(users, { individualHooks: true })
          .then(() => {
            Db.Types.bulkCreate(types).then(() => done());
          });
      });
  });

  // teardown
  after((done) => {
    Db.Users.sequelize.sync({ force: true })
      .then(() => {
        Db.Roles.sequelize.sync({ force: true })
          .then(() => done());
      });
  });

  describe('CREATE', () => {
    it('1. Should not allow null data persistence', () => {
      const newDoc = docs[0];
      newDoc.title = null;

      Db.Documents.create(newDoc)
        .then()
        .catch((err) => {
          expect(err.errors[0].message).to.equal('title cannot be null');
        });
    });
    it('2. Should create document if data are valid', () => {
      Db.Documents.create(docs[1])
        .then((doc) => {
          expect(doc).to.be.an('object');
          expect(doc).to.have.property('title');
          expect(doc).to.have.property('content');
          expect(doc).to.have.property('ownerId');
          expect(doc).to.have.property('accessLevel');
          expect(doc).to.have.property('ownerRole');
        });
    });
  });

  describe('UPDATE', () => {
    it('1. Should be able to update document', () => {
      const update = { title: 'my agenda' };

      Db.Documents.create(docs[2])
        .then((doc) => {
          doc.update(update)
            .then((updatedDoc) => {
              expect(updatedDoc.title).to.equal(update.title);
            });
        });
    });
  });
});
