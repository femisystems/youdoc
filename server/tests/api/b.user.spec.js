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
    it('GET - Should be able to list all users', (done) => {
      request
        .get('/users')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          expect(res.body.data).to.have.length.above(1);
          done();
        });
    });
    it('GET - Should be able to view a single user', (done) => {
      request
        .get('/users/1')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('PUT - Should be able to update admin details', (done) => {
      const update = { firstName: 'default' };

      request
        .put('/users/1')
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          expect(res.body.data.firstName).to.equal(update.firstName);
          done();
        });
    });
    it('PUT - Should be able to update a user\'s detail', (done) => {
      const update = { email: 'cyber@youdoc.com' };

      request
        .put('/users/2')
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          expect(res.body.data.email).to.equal(update.email);
          done();
        });
    });
    it('PUT - Should not be able to update user role', (done) => {
      const update = { role: 'facilitator' };

      request
        .put('/users/2')
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('DELETE - Should be able to delete user', (done) => {
      request
        .delete('/users/3')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully deleted.');
          done();
        });
    });

    it('GET - Should not be able to view a non-existing user', (done) => {
      request
        .get('/users/10')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          done();
        });
    });
    it('PUT - Should not be able to update admin role', (done) => {
      const update = { role: 'consultant' };

      request
        .put('/users/1')
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('PUT - Should not be able to update a non-existing user', (done) => {
      const update = { role: 'consultant' };

      request
        .put('/users/10')
        .set('authorization', admin.token)
        .send(update)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          done();
        });
    });
    it('DELETE - Should not be able to delete admin account', (done) => {
      request
        .delete('/users/1')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('DELETE - Should not be able to delete a non existing user', (done) => {
      request
        .delete('/users/10')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! user(s) not found.');
          done();
        });
    });
    it('GET - Should not be able to delete user with invalid id', (done) => {
      request
        .delete('/users/x')
        .set('authorization', admin.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach user(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
  });

  describe('USERS', () => {
    it('POST - Should be able to sign up with valid details', (done) => {
      request
        .post('/users')
        .send({
          firstName: 'john',
          lastName: 'doe',
          email: 'johndoe@youdoc.com',
          username: 'johndoe',
          password: 'password',
          role: 'fellow'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully created.');
          done();
        });
    });
    it('POST - should be able to login with valid details', (done) => {
      const userDetails = {
        userIdentity: 'murphy',
        password: 'password'
      };

      request
        .post('/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal(`Welcome ${userDetails.userIdentity}! You are now logged in.`);
          done();
        });
    });
    it('GET - should be able to see own details', (done) => {
      request
        .get('/users/2')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('GET - Should be able to view a single user', (done) => {
      request
        .get('/users/1')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully retrieved.');
          done();
        });
    });
    it('PUT - Should be able to update own detials', (done) => {
      const update = {
        username: 'engineeromin'
      };

      request
        .put('/users/2')
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('user(s) successfully updated.');
          expect(res.body.data.username).to.equal(update.username);
          done();
        });
    });

    describe('POST - Should not allow user to signup with null data', () => {
      const notNullFields = ['firstName', 'lastName', 'email', 'username', 'password'];

      notNullFields.forEach((field) => {
        const userDetails = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(10, true)
        };
        userDetails[`${field}`] = null;

        it(`- Should flag null ${field}`, (done) => {
          request
            .post('/users')
            .send(userDetails)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.success).to.equal(false);
              expect(res.body.msg).to.equal('Oops! Unable to create user(s). Please try again.');
              expect(res.body.error).to.equal(`${field} cannot be null`);
              done();
            });
        });
      });
    });

    describe('POST - Should not allow user to signup with existing user details', () => {
      const uniqueFields = ['email', 'username'];

      uniqueFields.forEach((field) => {
        const userDetails = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(10, true)
        };

        userDetails[`${field}`] = users[0].field;

        it(`- Should flag violation of unique ${field}`, (done) => {
          request
            .post('/users')
            .send(userDetails)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.success).to.equal(false);
              expect(res.body.msg).to.equal('Oops! Unable to create user(s). Please try again.');
              expect(res.body.error).to.equal(`${field} cannot be null`);
              done();
            });
        });
      });
    });
    it('POST - should not be able to login with wrong data', (done) => {
      const userDetails = {
        userIdentity: 'murphy123',
        password: 'password'
      };

      request
        .post('/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Invalid userId or password');
          done();
        });
    });
    it('GET - Should not be able to fetch user with invalid id', (done) => {
      request
        .get('/users/x')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Sorry! Unable to reach user(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
    it('PUT - Should not be able to update own role', (done) => {
      const update = {
        role: 'super consultant'
      };

      request
        .put('/users/1')
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('PUT - Should not be able to update other user accounts', (done) => {
      const update = {
        username: 'clinton'
      };

      request
        .put('/users/4')
        .set('authorization', user.token)
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('PUT - Should not be able to update details with empty/null data', (done) => {
      request
        .put('/users/2')
        .set('authorization', user.token)
        .send({
          username: ''
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Oops! Unable to update user(s). Please try again.');
          expect(res.body.error).to.equal('Invalid input.');
          done();
        });
    });
    it('DELETE - Should not be able to delete account', (done) => {
      request
        .delete('/users/1')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Forbidden! Restricted content.');
          done();
        });
    });
    it('Should be able to logout', (done) => {
      request
        .post('/users/logout')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.msg).to.equal('You are now logged out.');
          done();
        });
    });
    it('Should not be able to access secured routes after logging out', (done) => {
      request
        .get('/users')
        .set('authorization', user.token)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.success).to.equal(false);
          expect(res.body.msg).to.equal('Unauthorized user! Signup or login to access resource.');
          expect(res.body.error).to.equal('Expired token');
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
