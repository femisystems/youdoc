import supertest from 'supertest';
import { expect } from 'chai';
import Db from '../../models/Index';
import app from '../../app';
import seeds from '../../db/seeds/Index';

const request = supertest(app);

// seeds
const roles = seeds.validRoles;
const invalidRoles = seeds.invalidRoles;
const users = seeds.validUsers;

// test users
const admin = {};
const user = {};

/**
 * ROLE API
 *
 * POST /roles        => Admin should be able to create new role(s)
 * GET /roles         => Admin should be able to retrieve all roles
 * GET /roles/:id     => Admin should be able to retrieve roles by id
 * PUT /roles/:id     => Admin should be able to update other roles
 *                    => Admin should not be able to update default admin role
 * DELETE /roles/:id  => Admin should be able to delete other roles
 *                       Admin should not be able to remove default admin role
 *
 * POST /roles       => Users should not be able to create role(s)
 * GET /roles        => Users should not be able to retrieve role(s)
 * PUT /roles/:id    => Users should not be able to update roles
 * DELETE /roles/:id => Users should not be able to delete roles
 */
describe('ROLE API', () => {
  // Teardown and setup
  before((done) => {
    Db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  before((done) => {
    Db.Roles.bulkCreate([roles[0], roles[1]])
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

  describe('ADMIN', () => {
    it('POST - Should be able to create new role', (done) => {
      request
        .post('/roles')
        .set('authorization', admin.token)
        .send(roles[2])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('role(s) successfully created.');
          expect(res.body.data.title).to.equal(roles[2].title);
          done();
        });
    });
    it('GET - Should be able to list roles', (done) => {
      request
        .get('/roles')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('role(s) successfully retrieved.');
          expect(res.body.data).to.length.of.at.least(1);
          done();
        });
    });
    it('GET - Should be able to view a single role', (done) => {
      request
        .get('/roles/1')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('role(s) successfully retrieved.');
          expect(res.body.data.title).to.equal(roles[0].title);
          done();
        });
    });
    it('DELETE - Should be able to delete role', (done) => {
      request
        .delete('/roles/3')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('role(s) successfully deleted.');
          done();
        });
    });

    it('POST - Should not be able to create role with null title', (done) => {
      request
        .post('/roles')
        .set('authorization', admin.token)
        .send({ title: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Oops! Unable to create role(s). Please try again.');
          expect(res.body.error).to.equal('Title cannot be empty.');
          done();
        });
    });
    it('POST - Should not be able to create duplicate role', (done) => {
      request
        .post('/roles')
        .set('authorization', admin.token)
        .send(invalidRoles[0])
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Oops! Unable to create role(s). Please try again.');
          expect(res.body.error).to.equal('title must be unique');
          done();
        });
    });
    it('GET - Should not be able to view a non-existing role', (done) => {
      request
        .get('/roles/10')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! role(s) not found.');
          done();
        });
    });
    it('GET - Should return error for invalid role id', (done) => {
      request
        .get('/roles/x')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach role(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
    it('DELETE - Should not be able to delete non-existing role', (done) => {
      request
        .delete('/roles/10')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! role(s) not found.');
          done();
        });
    });
    it('DELETE - Should not be able to delete the admin role', (done) => {
      request
        .delete('/roles/1')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('DELETE - Should return error for invalid role id', (done) => {
      request
        .get('/roles/x')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach role(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
  });

  describe('USERS', () => {
    it('POST - Should not be able to create new role', (done) => {
      request
        .post('/roles')
        .set('authorization', user.token)
        .send({ title: 'newrole' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('GET - Should not be able to list roles', (done) => {
      request
        .get('/roles')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('GET - Should not be able to view a single role', (done) => {
      request
        .get('/roles/2')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('DELETE - not Should be able to delete role', (done) => {
      request
        .delete('/roles/2')
        .set('authorization', user.token)
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
        Db.Roles.destroy({ where: {} }).then(() => {
          done();
        });
      });

      it('GET - Should return error if no roles are found', () => {
        request
          .get('/roles')
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
