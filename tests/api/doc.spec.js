import supertest from 'supertest';
import { expect } from 'chai';
import faker from 'faker';
import Db from '../../src/database/models/Index';
import app from '../../src/app';
import seeds from '../mock/Index';

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
 * DOCUMENT API
 *
 * POST /documents
 * GET /documents         => Admin should be able to retrieve all documents
 * GET /documents/:id     => Admin should be able to retrieve single document
 * PUT /documents/:id     => Admin should be able to update document
 * DELETE /documents/:id  => Admin should be able to remove document
 *
 *
 * POST /documents        => Users should be able to create documents
 * GET /documents/:id     => Users should be able to view their own documents
 *                        => Users should be able to view other users' documents
 *                           that are public
 *                        => Users should be able to view other users' documents
 *                           who share the same role.
 * PUT /documents/:id     => Users should be able to update their own documents
 * DELETE /documents/:id => Users should be able to delete their own documents
 *
 */
describe('DOCUMENT API', () => {
  // Teardown and setup
  before((done) => {
    Db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate(users, { individualHooks: true })
        .then(() => {
          Db.Types.bulkCreate(types)
          .then(() => {
            Db.Documents.bulkCreate(documents)
            .then(() => {
              request.post('/users/login')
                .send({
                  userIdentity: users[0].username,
                  password: users[0].password
                })
                .end((err, res) => {
                  admin.id = 1;
                  admin.roleId = 1;
                  admin.token = res.body.userToken.token;
                });
            })
            .then(() => {
              request.post('/users/login')
                .send({
                  userIdentity: users[1].username,
                  password: users[1].password
                })
                .end((err, res) => {
                  user.id = users[1].id;
                  user.roleId = users[1].roleId;
                  user.token = res.body.userToken.token;
                  done();
                });
            });
          });
        });
      });
  });

  describe('ADMIN', () => {
    it('GET - Should be able to list all documents', (done) => {
      request
        .get('/documents')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          done();
        });
    });
    it('GET - Should be able to view all documents for a single user', (done) => {
      const ownerId = 4;

      request
        .get(`/users/${ownerId}/documents`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          expect(res.body.data.documents).to.be.instanceof(Array);
          expect(res.body.data.owner.id).to.equal(ownerId);
          done();
        });
    });
    it('GET - Should return error if wrong user id is passed', (done) => {
      request
        .get('/users/x/documents')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach user(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
    it('GET - Should be able to search documents with query string', (done) => {
      const queryString = 'random';

      request
        .get(`/documents/search?q=${queryString}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          expect(res.body.data).to.be.instanceof(Array);

          const docs = res.body.data;
          docs.forEach((doc) => {
            expect(doc.content.indexOf(queryString.replace(/[^a-z0-9]+/gi, ''))).to.be.above(-1);
          });
          done();
        });
    });
    it('GET - Should be able to search documents by type', (done) => {
      const myDoc = {
        id: 2,
        title: 'memo'
      };

      request
        .get(`/documents/search?type=${myDoc.title}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          expect(res.body.data).to.be.instanceof(Array);

          const docs = res.body.data;
          docs.forEach((doc) => {
            expect(doc.typeId).to.equal(myDoc.id);
          });
          done();
        });
    });
    it('GET - Should be able to specify limit for document search result', (done) => {
      const limit = 5;

      request
        .get(`/documents/search?limit=${limit}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          expect(res.body.data).to.be.instanceof(Array);
          expect(res.body.data).to.have.length.of.at.most(limit);
          done();
        });
    });
    it('GET - Should return error message if search result is empty', (done) => {
      const queryString = 'thisWillReturnEmpty';

      request
        .get(`/documents/search?q=${queryString}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! document(s) not found.');
          done();
        });
    });
    it('GET - Should return error if a wrong value is passed to document/:id route', (done) => {
      request
        .get('/documents/id')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach document(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input');
          done();
        });
    });
    it('PUT - Should be able to update other user\'s documents', (done) => {
      const docData = {
        title: faker.company.catchPhrase(),
        accessLevel: 'private',
      };

      request
        .put('/documents/3')
        .set('authorization', admin.token)
        .send(docData)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully updated.');
          done();
        });
    });
    it('DELETE - Should be able to delete own document', (done) => {
      request
        .delete('/documents/2')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully deleted.');
          done();
        });
    });
    it('DELETE - Should be able to delete other user\'s document', (done) => {
      request
        .delete('/documents/5')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully deleted.');
          done();
        });
    });

    it('POST - Should not be able to create an existing document', (done) => {
      request
        .post('/documents')
        .set('authorization', admin.token)
        .send(documents[0])
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Oops! Unable to create document(s). Please try again.');
          expect(res.body.error).to.equal('Document with title and content already exists.');
          done();
        });
    });
    it('GET - Should not be able to view a non-existing document', (done) => {
      request
        .get('/documents/100')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! document(s) not found.');
          done();
        });
    });

    describe('GET - Should flag negative value for pagination and limit', () => {
      const nonNegativeValues = ['limit', 'page'];

      nonNegativeValues.forEach((param) => {
        const value = -5;

        it(`- Should flag negative value for ${param}`, (done) => {
          request
            .get(`/documents/search?${param}=${value}`)
            .set('authorization', admin.token)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.success).to.equal(false);
              expect(res.body.msg).to.equal('Sorry! Unable to reach document(s). Please try again.');
              expect(res.body.error).to.equal(`${param} cannot be less than 1`);
              done();
            });
        });
      });
    });

    it('DELETE - Should not be able to delete a non existing document', (done) => {
      request
        .get('/documents/100')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! document(s) not found.');
          done();
        });
    });
  });

  describe('USERS', () => {
    it('POST - Should be able to create document with valid data', (done) => {
      const docData = {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        typeId: 2,
        accessLevel: 'public',
      };

      request
        .post('/documents')
        .set('authorization', user.token)
        .send(docData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully created.');
          done();
        });
    });

    describe('POST - Should not allow user to create document with null data', () => {
      const notNullFields = ['title', 'content', 'typeId', 'accessLevel'];

      notNullFields.forEach((field) => {
        const docData = {
          title: faker.company.catchPhrase(),
          content: faker.lorem.paragraph(25),
          typeId: 1,
          accessLevel: 'public',
        };
        docData[`${field}`] = null;

        it(`- Should flag null ${field}`, (done) => {
          request
            .post('/documents')
            .set('authorization', user.token)
            .send(docData)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.success).to.equal(false);
              expect(res.body.msg).to.equal('Oops! Unable to create document(s). Please try again.');
              expect(res.body.error).to.equal(`${field} cannot be null`);
              done();
            });
        });
      });
    });

    it('GET - should be able to list documents based on access levels', (done) => {
      const accessLevels = ['public', 'role'];
      request
        .get('/documents')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          const docs = res.body.data;

          docs.forEach((doc) => {
            if (doc.ownerId !== user.id) {
              expect(accessLevels.indexOf(doc.accessLevel)).to.be.above(-1);
            }
          });
          done();
        });
    });
    it('GET - Should be able to view a single document', (done) => {
      request
        .get('/documents/1')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully retrieved.');
          done();
        });
    });
    it('PUT - Should be able to update own document', (done) => {
      const update = {
        title: faker.company.catchPhrase(),
        accessLevel: 'role'
      };

      request
        .put('/documents/12')
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully updated.');
          done();
        });
    });
    it('DELETE - Should be able to delete own document', (done) => {
      request
        .delete('/documents/12')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('document(s) successfully deleted.');
          done();
        });
    });

    it('GET - Should not be able to access a secured document', (done) => {
      request
        .get('/documents/2')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! document(s) not found.');
          done();
        });
    });
    it('PUT - Should not be able to update other users\' documents', (done) => {
      const update = {
        title: faker.company.catchPhrase(),
        accessLevel: 'public'
      };

      request
        .put('/documents/6')
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('DELETE - Should not be able to delete other users\' documents', (done) => {
      request
        .delete('/documents/6')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
  });
});
