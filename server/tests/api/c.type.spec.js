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
 */
describe('TYPE API', () => {
  // Teardown and setup
  before((done) => {
    Db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    Db.Roles.bulkCreate(roles)
      .then(() => {
        Db.Users.bulkCreate([users[0], users[1]], { individualHooks: true })
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

  before((done) => {
    Db.Types.bulkCreate([types[0], types[1]]).then(() => {
      done();
    });
  });

  describe('ADMIN', () => {
    it('POST - Should be able to create document types', (done) => {
      request
        .post('/types')
        .set('authorization', admin.token)
        .send(types[2])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully created.');
          done();
        });
    });
    it('GET - Should be able to list document types', (done) => {
      request
        .get('/types')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully retrieved.');
          done();
        });
    });
    it('GET - Should be able to view a single type', (done) => {
      request
        .get('/types/2')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully retrieved.');
          done();
        });
    });
    it('DELETE - Should be able to delete type', (done) => {
      request
        .delete('/types/3')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully deleted.');
          done();
        });
    });

    it('POST - Should not be able to create document types with null data', (done) => {
      request
        .post('/types')
        .set('authorization', admin.token)
        .send(invalidTypes[1])
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Oops! Unable to create type(s). Please try again.');
          expect(res.body.error).to.equal('Title cannot be empty.');
          done();
        });
    });
    it('POST - Should not be able to create an existing type', (done) => {
      request
        .post('/types')
        .set('authorization', admin.token)
        .send(invalidTypes[0])
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Oops! Unable to create type(s). Please try again.');
          expect(res.body.error).to.equal('title must be unique');
          done();
        });
    });
    it('GET - Should not be able to view a non-existing type', (done) => {
      request
        .get('/types/10')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! type(s) not found.');
          done();
        });
    });
    it('GET - Should not be able to view a type with invalid id', (done) => {
      request
        .get('/types/x')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach type(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
    it('DELETE - Should not be able to delete a non existing type', (done) => {
      request
        .delete('/types/10')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! type(s) not found.');
          done();
        });
    });
    it('DELETE - Should not be able to delete type with wrong id', (done) => {
      request
        .delete('/types/x')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach type(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
  });

  describe('USERS', () => {
    it('GET - should be able to list types', (done) => {
      request
        .get('/types')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully retrieved.');
          done();
        });
    });
    it('GET - Should be able to view a single type', (done) => {
      request
        .get('/types/1')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('type(s) successfully retrieved.');
          done();
        });
    });

    it('POST - should not be able to create type', (done) => {
      request
        .post('/types')
        .set('authorization', user.token)
        .send(types[1])
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('DELETE - Should not be able to delete type', (done) => {
      request
        .delete('/types/1')
        .set('authorization', user.token)
        .send({ title: 'personal' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
  });

  describe('EDGE CASE', () => {
    describe('Empty Db', () => {
      before((done) => {
        Db.Users.destroy({ where: {} }).then(() => {
          done();
        });
      });

      it('GET - Should return error if no roles are found', () => {
        request
          .get('/users')
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          });
      });
    });
  });
});
