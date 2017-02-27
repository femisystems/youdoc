import { expect } from 'chai';
import faker from 'faker';
import { Roles, Users, Types, Documents } from '../../models/Index';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';
import userSeeds from '../../db/seeds/Users';
import typeSeeds from '../../db/seeds/Types';
import docSeeds from '../../db/seeds/Documents';

describe('DOCUMENT MODEL TEST', () => {
  before(() => Roles.bulkCreate(roleSeeds));
  before(() => Users.create(adminSeed));
  before(() => Users.bulkCreate(userSeeds, { individualHooks: true }));
  const userPromise = new Promise((resolve, reject) => {
    Types
      .bulkCreate(typeSeeds)
      .then(() => resolve())
      .catch(() => reject());
  });
  userPromise.then(() => Documents.bulkCreate(docSeeds).then(() => console.log('docs created')));

  after(() => Roles.sequelize.sync({ force: true }));
  after(() => Users.sequelize.sync({ force: true }));
  after(() => Types.sequelize.sync({ force: true }));
  after(() => Documents.sequelize.sync({ force: true }));

  describe('#Create', () => {
    const dummyDoc = {
      id: 12,
      title: '',
      content: faker.lorem.paragraph(),
      accessLevel: 'public',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 2,
      typeId: 1,
      ownerRoleId: 2
    };

    it('1. Should not allow null data persistence', () => {
      Documents
        .create(dummyDoc)
        .then()
        .catch((err) => {
          expect(err.message).to.equal('Validation error: Document title should be 1 to 32 characters long.');
        });
    });
    it('2. ', () => {
      const docId = 1;

      Documents
        .findById(docId)
        .then(doc => console.log(doc));
    });
  });

  xdescribe('#Read', () => {
    it('1. Documents should exist with a properties: title, content', () => {
      Documents
        .findAll({})
        .then((docs) => {
          // console.log('documents are: ', docs);
          // expect(documents).to.have.length.above(1);
          // expect(docs[0]).to.have.property('title');
          // expect(documents[0]).to.have.property('content');
        });
    });
  });

  xdescribe('#Update', () => {
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

  xdescribe('#Delete', () => {
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
