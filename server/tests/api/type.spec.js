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
const invalidTypes = seeds.invalidTypes;

// test users
const admin = {};
const user = {};

/**
 * TYPE API
 *
 * POST
 * GET /types         => Admin should be able to retrieve all users
 * GET /users/:id     => Admin should be able to retrieve single user
 * PUT /users/:id     => Admin should be able to update user details
 * DELETE /users/:id  => Admin should be able to remove user
 *
 * GET /users/:id     => Users should be able to view their own details
 * PUT /users/:id     => Users should be able to update their own details
 * !DELETE /users/:id => Users should not be able to delete account
 *
 * POST /users        => Admin/Users should be able to login/logout
 */
describe('TYPE API', () => {
  // setup
  before((done) => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate([users[0], users[1]], { individualHooks: true })
        .then(() => {
          Db.Types.bulkCreate(types)
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

  // teardown
  after((done) => {
    Db.sequelize.sync({ force: true })
      .then(() => done());
  });

  describe('ADMIN', () => {
    describe('POST', () => {
      it('1. Admin should be able to create document type', (done) => {
        request
          .post('/types')
          .set('authorization', admin.token)
          .send({
            id: 6,
            title: 'article',
            ownerId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .end((err, res) => {
            if (!err) {
              if (res.body.data.length < 1) {
                expect(res.statusCode).to.equal(400);
              }
              expect(res.statusCode).to.equal(201);
              expect(res.body.success).to.equal(true);
              expect(res.body.msg).to.equal('type(s) successfully created.');
            } else {
              expect(res.statusCode).to.equal(500);
              expect(res.body.success).to.equal(false);
              expect(res.body.msg).to.equal('Oops! Unable to create type(s). Please try again.');
            }
            done();
          });
      });
      it('2. Should not create type with invalid details', (done) => {
        request
          .post('/types')
          .set('authorization', admin.token)
          .send(invalidTypes[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.message).to.equal('Validation error: Type cannot be empty!');
            done();
          });
      });
      it('3. Should not create duplicate document type', (done) => {
        request
          .post('/types')
          .set('authorization', admin.token)
          .send(invalidTypes[0])
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.errors[0].message).to.equal('title must be unique');
            done();
          });
      });
    });
    describe('GET', () => {
      it('1. Admin should be able to read document type', (done) => {
        request
          .get('/types')
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('type(s) successfully retrieved.');
            expect(res.body.data).be.instanceof(Array);
            done();
          });
      });
      it('2. Admin should be able to check a type by id', (done) => {
        const id = 1;

        request
          .get(`/types/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('type(s) successfully retrieved.');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
      it('3. Should return 500 if get request fails', (done) => {
        const id = 'x';

        request
          .get(`/types/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Sorry! Unable to reach type(s). Please try again.');
            done();
          });
      });
      it('3. Should return 404 if types are not found', (done) => {
        const id = 10;

        request
          .get(`/types/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Sorry! type(s) not found.');
            done();
          });
      });
    });
    describe('PUT', () => {
      it('1. Admin should be able to update a document type', (done) => {
        const id = 1;
        const update = { title: 'New title' };

        request
          .put(`/types/${id}`)
          .set('authorization', admin.token)
          .send(update)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('type(s) successfully updated.');
            expect(res.body.data).to.be.an('object');
            done();
          });
      });
      it('2. Should not update a non-existing type', (done) => {
        const id = 7;
        const update = { title: 'New title' };

        request
          .put(`/types/${id}`)
          .set('authorization', admin.token)
          .send(update)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Sorry! type(s) not found.');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('1. Admin should be able to delete document type', () => {
        const id = 6;

        request
          .delete(`/types/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('type(s) successfully deleted.');
          });
      });
      it('1. Should return 500 if delete request fails', () => {
        const id = 'x';

        request
          .delete(`/types/${id}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Oops! Unable to delete type(s). Please try again.');
          });
      });
    });
  });

  describe('USERS', () => {
    // setup
    before((done) => {
      request
        .post('/users/login')
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

    describe('POST', () => {
      it('1. Users should not be able to create document type', (done) => {
        request
        .post('/types')
        .set('authorization', user.token)
        .send({
          id: 7,
          title: 'Sticky note',
          ownerId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
      });
    });
    describe('GET', () => {
      it('1. Users should be able to access all document types', (done) => {
        request
        .get('/types')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully retrieved.');
          expect(res.body.data).be.instanceof(Array);
          done();
        });
      });
      it('1. Users should be able to see a single document type', (done) => {
        const id = 1;

        request
        .get(`/types/${id}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully retrieved.');
          expect(res.body.data).be.an('object');
          done();
        });
      });
    });
    describe('PUT', () => {
      it('1. Users should not be able to update a document type', (done) => {
        const id = 1;
        const update = { title: 'New title' };

        request
        .put(`/types/${id}`)
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
      it('1. Users should not be able to delete a document type', (done) => {
        const id = 2;

        request
        .delete(`/types/${id}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
      });
    });

    after((done) => {
      Db.Types.sequelize.sync({ force: true })
        .then(() => done());
    });
  });
});
