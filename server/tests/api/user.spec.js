import supertest from 'supertest';
import faker from 'faker';
import { expect } from 'chai';
import Db from '../../models/Index';
import app from '../../app';
import seeds from '../../db/seeds/Index';

const request = supertest(app);

// seeds
const roles = seeds.validRoles;
const users = seeds.validUsers;
const invalidUsers = seeds.invalidUsers;

// test users
const admin = {};
const user = {};

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

  // teardown
  after((done) => {
    Db.sequelize.sync({ force: true })
      .then(() => done());
  });

  describe('SIGNUP/SIGNIN', () => {
    it('1. User should sign up with valid details', (done) => {
      request
        .post('/users')
        .send(users[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully created.');
          done();
        });
    });
    it('2. User should not be able to sign up with null data', (done) => {
      request
        .post('/users')
        .send(invalidUsers[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.error.errors[0].message).to.equal('Firstname must be 2 to 15 characters long.');
          done();
        });
    });
    it('3. User should not be able to sign up with existing email', (done) => {
      request
        .post('/users')
        .send(invalidUsers[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.error.parent.detail).to.equal('Key (email)=(admin@youdoc.com) already exists.');
          done();
        });
    });
    it('4. User should not be able to sign up with existing username', (done) => {
      request
        .post('/users')
        .send(invalidUsers[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.error.parent.detail).to.equal('Key (username)=(admin) already exists.');
          done();
        });
    });
    it('5. User should not be able to sign in with wrong username', (done) => {
      const signinDetail = {
        userIdentity: faker.internet.userName(),
        password: 'password'
      };

      request
        .post('/users/login')
        .send(signinDetail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Invalid userId or password');
          done();
        });
    });
    it('6. User should not be able to sign in with wrong email', (done) => {
      const signinDetail = {
        userIdentity: 'wronguser@yahoo.com',
        password: 'password'
      };

      request
        .post('/users/login')
        .send(signinDetail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Invalid userId or password');
          done();
        });
    });
    it('7. User should not be able to sign in with wrong password', (done) => {
      const signinDetail = {
        userIdentity: 'admin@youdoc.com',
        password: 'wrongpassword'
      };

      request
        .post('/users/login')
        .send(signinDetail)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Invalid userId or password');
          done();
        });
    });
    it('8. Logout /users/logout => Users should be able to logout', (done) => {
      request
        .post('/users/logout')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('You are now logged out.');
          done();
        });
    });
  });

  describe('ADMIN', () => {
    it('1. GET /users => Admin should be able to retrieve all users', (done) => {
      request
        .get('/users')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
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
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('3. GET /users/:id => Should return 404 not found if userid is not valid', (done) => {
      const id = 100;

      request
        .get(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          done();
        });
    });
    it('4. GET /users/:id => Should return 500 if request fails', (done) => {
      const id = 'id';

      request
        .get(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach user(s). Please try again.');
          done();
        });
    });
    it('5. PUT /users/:id => Admin should be able to edit user details', (done) => {
      const id = 2;
      const update = { firstName: 'Jon', lastName: 'Doe' };

      request
        .put(`/users/${id}`)
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          done();
        });
    });
    it('6. DELETE /users/:id => Admin should be able to remove user(s)', (done) => {
      const id = 3;

      request
        .delete(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully deleted.');
          done();
        });
    });
    it('7. DELETE /users/:id => Should return 500 if delete request fails', (done) => {
      const id = 'id';

      request
        .delete(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach user(s). Please try again.');
          done();
        });
    });
    it('8. DELETE /users/:id => Admin should not be able to delete self', (done) => {
      const adminId = admin.id;

      request
        .delete(`/users/${adminId}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
    it('9. DELETE /users/:id => Admin should not be able to delete non-existing user', (done) => {
      const id = 100;

      request
        .delete(`/users/${id}`)
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          done();
        });
    });
  });

  describe('USERS', () => {
    it('3. GET /users => Users should not be able to fetch list of users', (done) => {
      request
        .get('/users')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('4. GET /users/:id => Users should be able to view their own details', (done) => {
      const selfId = user.id;

      request
        .get(`/users/${selfId}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('5. GET /users/:id => Users should be able to view details of other users', (done) => {
      const userId = 1;

      request
        .get(`/users/${userId}`)
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('6. PUT /users/:id => Users should be able to update their own details', (done) => {
      const selfId = user.id;
      const update = {
        email: 'avidReader@youdoc.com',
        username: 'avidReader'
      };

      request
        .put(`/users/${selfId}`)
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          done();
        });
    });
    it('7. PUT /users/:id => Users should not be able to update details of other users', (done) => {
      const userId = 1;
      const update = {
        email: 'avidReader@youdoc.com',
        username: 'avidReader'
      };

      request
        .put(`/users/${userId}`)
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
    it('8. DELETE /users/:id => Users should not be able to delete any user account', (done) => {
      const userId = 1;
      request
        .delete(`/users/${userId}`)
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
