import supertest from 'supertest';
import faker from 'faker';
import { expect } from 'chai';
import { Roles, Users } from '../../models/Index';
import app from '../../server';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';
import userSeeds from '../../db/seeds/Users';

const request = supertest(app);
const defaultUsers = [userSeeds[0], userSeeds[1], userSeeds[2]];
let [admin, user] = [{}, {}];

/**
 * USER API
 *
 * GET /users         => Admin should be able to retrieve all users
 * GET /users/:id     => Admin should be able to retrieve single user
 * PUT /users/:id     => Admin should be able to update user details
 * DELETE /users/:id  => Admin should be able to remove user
 *
 * POST /users        => Users should be able to signup
 * GET /users/:id     => Users should be able to view their own details
 * PUT /users/:id     => Users should be able to update their own details
 * !DELETE /users/:id => Users should not be able to delete account
 *
 * POST /users        => Admin/Users should be able to logout
 */
describe('USER API', () => {
  // setup
  before((done) => {
    Roles
      .bulkCreate(roleSeeds)
      .then((roles) => {
        if (roles) {
          request
            .post('/users')
            .send(adminSeed)
            .end((err, res) => {
              if (!err) {
                admin = {
                  id: res.body.data.newUser.id,
                  roleId: res.body.data.newUser.roleId,
                  token: res.body.data.credential.token
                };
                done();
              }
            });
        }
      });
  });

  beforeEach((done) => {
    Users
      .bulkCreate(defaultUsers, { individualHooks: true })
      .then(() => {
        request
          .post('/users')
          .send(userSeeds[4])
          .end((err, res) => {
            user = {
              username: res.body.data.newUser.username,
              id: res.body.data.newUser.id,
              roleId: res.body.data.newUser.roleId,
              token: res.body.data.credential.token
            };
            done();
          });
      });
  });

  // teardown
  after((done) => {
    Roles.destroy({ where: {} })
      .then(() => {
        done();
      });
  });

  afterEach((done) => {
    Users.destroy({ where: {} })
      .then(() => done());
  });

  describe('ADMIN', () => {
    it('1. GET /users => Admin should be able to retrieve all users', (done) => {
      request
        .get('/users')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          expect(res.body.data).to.have.length.above(0);
          done();
        });
    });
    it('2. GET /users/:id => Admin should be able to retrieve single user', (done) => {
      const id = 2;

      request
        .get(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('3. GET /users/:id => Should return 404 not found if userid is not valid', (done) => {
      const id = 10;

      request
        .get(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          done();
        });
    });
    it('4. PUT /users/:id => Admin should be able to edit user details', (done) => {
      const id = 2;
      const update = { firstName: 'Jon', lastName: 'Doe' };

      request
        .put(`/users/${id}`)
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          done();
        });
    });
    it('5. DELETE /users/:id => Admin should be able to remove user(s)', (done) => {
      const id = 2;

      request
        .delete(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully deleted.');
          done();
        });
    });
  });

  describe('USERS', () => {
    it('1. POST /users => Users should be able to signup with valid details', (done) => {
      request
        .post('/users')
        .send(userSeeds[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully created.');
          done();
        });
    });
    it('2. POST /users => Users should not be able to signup with existing user email/username', (done) => {
      userSeeds[0].id = 5;
      request
        .post('/users')
        .send(userSeeds[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(501);
          expect(res.body.success).to.be.false;
          expect(res.body.error.errors[0].message).to.equal('email must be unique');
          done();
        });
    });
    it('3. GET /users => Users should not be able to fetch list of users', (done) => {
      request
        .get('/users')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
    it('4. GET /users/:id => Users should be able to view their own details', (done) => {
      request
        .get(`/users/${user.id}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('5. GET /users/:id => Users should not be able to view details of other users', (done) => {
      const id = 1;
      request
        .get(`/users/${id}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
    it('6. PUT /users/:id => Users should be able to update their own details', (done) => {
      const update = {
        email: 'avidReader@youdoc.com',
        username: 'avidReader'
      };

      request
        .put(`/users/${user.id}`)
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          done();
        });
    });
    it('7. PUT /users/:id => Users should not be able to update details of other users', (done) => {
      const id = 1;
      const update = {
        email: 'avidReader@youdoc.com',
        username: 'avidReader'
      };

      request
        .put(`/users/${id}`)
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
    it('8. DELETE /users/:id => Users should not be able to delete any user account', (done) => {
      const id = 1;
      request
        .delete(`/users/${id}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
    it('9. POST /users/login => Users should be able to login', (done) => {
      request
        .post('/users/login')
        .send({
          userIdentity: user.username,
          password: 'password'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.userToken).to.exist;
          expect(res.body.msg).to.equal('You are now logged in.');
          done();
        });
    });
    it('10. POST /users/login => Login should fail with error msg if details are incorrect', (done) => {
      request
        .post('/users/login')
        .send({
          userIdentity: faker.internet.userName(),
          password: 'password'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.userToken).to.not.exist;
          expect(res.body.msg).to.equal('Invalid username or password');
          done();
        });
    });
    it('12. Logout /users/logout => Users should be able to logout', (done) => {
      request
        .post('/users/logout')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('You are now logged out.');
          done();
        });
    });
  });
});
