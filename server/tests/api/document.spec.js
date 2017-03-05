import supertest from 'supertest';
import { expect } from 'chai';
import faker from 'faker';
import Db from '../../models/Index';
import app from '../../app';
import seeds from '../../db/seeds/Index';

const request = supertest(app);

// seeds
const roles = seeds.validRoles;
const users = seeds.validUsers;
const types = seeds.validTypes;
const documents = seeds.validDocs;
const invalidDocs = seeds.invalidDocs;

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
  // setup
  before((done) => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate(users, { individualHooks: true })
        .then(() => {
          Db.Types.bulkCreate(types)
          .then(() => {
            Db.Documents.create(documents[0])
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
                  done();
                });
            });
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
    describe('POST', () => {
      it('1. Should be able to create document with valid data', (done) => {
        request
          .post('/documents')
          .set('authorization', admin.token)
          .send(documents[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully created.');
            done();
          });
      });
      it('2. Should not create document without title', (done) => {
        const newDoc = Object.assign({}, invalidDocs[0]);
        newDoc.id = 3;

        request
          .post('/documents')
          .set('authorization', admin.token)
          .send(newDoc)
          .end((err, res) => {
            console.log(res);
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.message).to.equal('Validation error: Document title cannot be empty');
            done();
          });
      });
      it('3. Should not create document without content', (done) => {
        const newDoc = Object.assign({}, invalidDocs[1]);
        newDoc.id = 4;

        request
          .post('/documents')
          .set('authorization', admin.token)
          .send(newDoc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.message).to.equal('Validation error: Content cannot be empty');
            done();
          });
      });
      it('4. Should not create document without accessLevel', (done) => {
        const newDoc = Object.assign({}, invalidDocs[2]);
        newDoc.id = 5;

        request
          .post('/documents')
          .set('authorization', admin.token)
          .send(newDoc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.message).to.equal('Validation error: access level can only be public, private or role');
            done();
          });
      });
      it('5. Should not create document without type', (done) => {
        const newDoc = Object.assign({}, invalidDocs[3]);
        newDoc.id = 6;

        request
          .post('/documents')
          .set('authorization', admin.token)
          .send(newDoc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Oops! Unable to create document(s). Please try again.');
            done();
          });
      });
    });
    describe('GET', () => {
      it('1. Should be able to fetch and view all documents', (done) => {
        request
          .get('/documents')
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            expect(res.body.data).to.be.instanceof(Array);
            expect(res.body.data).to.have.length.of.at.least(1);
            done();
          });
      });
      it('2. Should be able to fetch documents per user', (done) => {
        const id = 1;

        request
          .get(`/users/${id}/documents`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            expect(res.body.data).to.be.instanceof(Array);
            expect(res.body.data).to.have.length.of.at.least(1);
            done();
          });
      });
      it('3. Should be able to fetch a single document by id', (done) => {
        const docId = 1;

        request
          .get(`/documents/${docId}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
      it('4. Should not be able to fetch document of non-existing user', (done) => {
        const id = 100;

        request
          .get(`/users/${id}/documents`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Sorry! document(s) not found.');
            done();
          });
      });
      it('5. Should not be able to fetch non-existing document', (done) => {
        const id = 100;

        request
          .get(`/documents/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Sorry! document(s) not found.');
            done();
          });
      });
    });
    describe('PUT', () => {
      it('1. Should be able to update own document', (done) => {
        const docId = 2;
        const update = {
          title: faker.company.catchPhrase()
        };

        request
          .put(`/documents/${docId}`)
          .set('authorization', admin.token)
          .send(update)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully updated.');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('1. Should be able to delete own document', (done) => {
        const id = 2;

        request
          .delete(`/documents/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully deleted.');
            done();
          });
      });
    });
  });

  describe('USER', () => {
    // setup
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

    describe('POST', () => {
      it('1. Should be able to create document', (done) => {
        const newDoc = Object.assign({}, documents[2]);
        newDoc.id = 7;
        newDoc.ownerId = user.id;

        request
          .post('/documents')
          .set('authorization', user.token)
          .send(newDoc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully created.');
            done();
          });
      });
    });
    describe('GET', () => {
      it('1. Should be able to fetch own documents', (done) => {
        const selfId = user.id;

        request
          .get(`/users/${selfId}/documents`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            expect(res.body.data).to.be.instanceof(Array);
            expect(res.body.data).to.have.length.of.at.least(1);
            done();
          });
      });
      it('2. Should be able to get a single document', (done) => {
        const docId = 7;

        request
          .get(`/documents/${docId}`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
      it('3. Should return error if get request fails', (done) => {
        const docId = 'id';

        request
          .get(`/documents/${docId}`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            done();
          });
      });
      it('4. Should be able to fetch "PUBLIC" documents of other users with different role levels', (done) => {
        const userId = 1;

        request
          .get(`/users/${userId}/documents`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            expect(res.body.data).to.be.instanceof(Array);
            expect(res.body.data).to.have.length.of.at.least(1);
            done();
          });
      });
      it('5. Should return error if get request fails with wrong user data', (done) => {
        const userId = 'x';

        request
          .get(`/users/${userId}/documents`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            done();
          });
      });
      it('6. Should be able to fetch own documents in database', (done) => {
        request
          .get('/documents')
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully retrieved.');
            done();
          });
      });
    });
    describe('PUT', () => {
      it('1. Should be able to update own documents', (done) => {
        const docId = 7;
        const update = {
          title: faker.company.catchPhrase(),
          content: faker.lorem.paragraph()
        };

        request
          .put(`/documents/${docId}`)
          .set('authorization', admin.token)
          .send(update)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('document(s) successfully updated.');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
      it('2. Should not be able to update documents of other users', (done) => {
        const docId = 1;
        const update = {
          title: 'New title',
          content: faker.lorem.paragraph()
        };

        request
          .put(`/documents/${docId}`)
          .set('authorization', user.token)
          .send(update)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('1. Should be able to delete own documents', (done) => {
        const docId = 7;

        request
          .delete(`/documents/${docId}`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.msg).to.equal('document(s) successfully deleted.');
            done();
          });
      });
      it('2. Should not be able to delete documents of other users', (done) => {
        const docId = 1;

        request
          .delete(`/documents/${docId}`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
    });
  });
});
