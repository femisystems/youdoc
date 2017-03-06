import supertest from 'supertest';
import { expect } from 'chai';
import Db from '../../models/Index';
import app from '../../app';
import seeds from '../../db/seeds/Index';

const request = supertest(app);

// seeds
const roles = seeds.validRoles;
const users = seeds.validUsers;
const types = seeds.validTypes;
const documents = seeds.validDocs;

// test users
const admin = {};
const user = {};

/**
 * DOCUMENT SEARCH API
 *
 * GET /documents/search?q=<text>&type=<docType>
 *
 */
describe('DOCUMENT SEARCH API', () => {
  // setup
  before((done) => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate(users, { individualHooks: true })
        .then(() => {
          Db.Types.bulkCreate(types)
          .then(() => {
            Db.Documents.bulkCreate(documents)
            .then(() => done());
          });
        });
      });
  });

  // teardown
  after((done) => {
    Db.sequelize.sync({ force: true })
      .then(() => done());
  });

  // tests
  describe('ADMIN', () => {
    before((done) => {
      request
        .post('/users/login')
        .send({
          userIdentity: users[0].username,
          password: users[0].password
        })
        .end((err, res) => {
          admin.id = users[0].id;
          admin.roleId = users[0].roleId;
          admin.token = res.body.userToken.token;
          done();
        });
    });

    before((done) => {
      request
        .post('/users/login')
        .send({
          userIdentity: users[4].username,
          password: users[4].password
        })
        .end((err, res) => {
          user.id = users[4].id;
          user.roleId = users[4].roleId;
          user.token = res.body.userToken.token;
          done();
        });
    });

    it('1. Should retrieve all documents for admin', (done) => {
      request
        .get('/documents/search')
        .set('authorization', admin.token)
        .end((err, res) => {
          const results = res.body.data;
          results.forEach((result) => {
            expect(result.accessLevel).to.be.oneOf(['public', 'private', 'role']);
          });
          done();
        });
    });
    it('2. Should retrieve only public/role-based documents to regular users', (done) => {
      request
        .get('/documents/search')
        .set('authorization', user.token)
        .end((err, res) => {
          const raw = res.body.data;
          const filtered = raw.filter((result) => {
            if (result.ownerId !== user.id) {
              return result;
            }
          });
          filtered.forEach((result) => {
            expect(result.accessLevel).to.be.oneOf(['public', 'role']);
          });
          done();
        });
    });
    it('3. Should retrieve documents with specific search term', (done) => {
      const searchTerm = 'welcome';

      request
        .get(`/documents/search?q=${searchTerm}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.body.data).to.have.length.of.at.most(1);
          done();
        });
    });
    it('4. Should limit results based on user instruction', (done) => {
      request
        .get('/documents/search?limit=5')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.body.data).to.have.length.of.at.most(5);
          done();
        });
    });
    it('5. Should filter result by type if type is included', (done) => {
      const type = 'agenda';
      const limit = 5;

      request
        .get(`/documents/search?limit=${limit}&type=${type}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          const results = res.body.data;
          results.forEach((result) => {
            expect(result.type).to.equal(type);
          });
          expect(res.body.data).to.have.length.of.at.most(5);
          done();
        });
    });
    it('5. Should return 404 if there are no matching results', (done) => {
      const queryStr = 'territory';
      const type = 'Object';

      request
        .get(`/documents/search?q=${queryStr}&type=${type}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });
});
