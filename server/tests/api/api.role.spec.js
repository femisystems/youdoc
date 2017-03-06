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

  describe('ADMIN', () => {
    describe('POST', () => {
      it('1. Should allow admin user to create role with valid role details', (done) => {
        const newRoleDetail = {
          id: 5,
          title: 'staff',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        request
          .post('/roles')
          .set('authorization', admin.token)
          .send(newRoleDetail)
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('role(s) successfully created.');
            done();
          });
      });
      it('2. Should not allow role to be created with null data', (done) => {
        request
          .post('/roles')
          .set('authorization', admin.token)
          .send(invalidRoles[1])
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.errors[0].message).to.equal('Title cannot be empty');
            done();
          });
      });
      it('3. Should not allow role to be created twice or more', (done) => {
        request
          .post('/roles')
          .set('authorization', admin.token)
          .send(invalidRoles[0])
          .end((err, res) => {
            expect(res.statusCode).to.equal(500);
            expect(res.body.success).to.equal(false);
            expect(res.body.error.errors[0].message).to.equal('title must be unique');
            done();
          });
      });
    });
    describe('GET', () => {
      it('1. Admin should be able to retrieve roles', (done) => {
        request
          .get('/roles')
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('role(s) successfully retrieved.');
            expect(res.body.data).to.have.length.above(0);

            if (err) {
              expect(res.status).to.equal(500);
              expect(res.body.success).to.equal(false);
            }
            done();
          });
      });
      it('2. Should be able to retrieve role by id', (done) => {
        request
          .get('/roles/1')
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('role(s) successfully retrieved.');
            done();
          });
      });
      it('3. Should return 404 if role does not exist', (done) => {
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
      it('4. Should return 500 for a failed request', (done) => {
        request
          .get('/roles/id')
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            expect(res.body.success).to.equal(false);
            done();
          });
      });
    });
    describe('PUT', () => {
      it('1. Admin Should not be allowed to update default admin role', (done) => {
        const roleId = 1;
        const update = {
          title: 'super admin'
        };

        request
          .put(`/roles/${roleId}`)
          .set('authorization', admin.token)
          .send(update)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
      it('1. Should be able to update other roles', (done) => {
        const roleId = 2;
        const update = {
          title: 'super admin'
        };

        request
          .put(`/roles/${roleId}`)
          .set('authorization', admin.token)
          .send(update)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('role(s) successfully updated.');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('1. Admin Should not be able to delete default admin role', (done) => {
        const roleId = 1;

        request
          .delete(`/roles/${roleId}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
      it('2. Should be able to delete other roles', (done) => {
        const roleId = 5;

        request
          .delete(`/roles/${roleId}`)
          .set('authorization', admin.token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.msg).to.equal('role(s) successfully deleted.');
            done();
          });
      });
    });
  });

  describe('USERS', () => {
    describe('POST', () => {
      it('1. User should not be able to create role(s)', (done) => {
        const newRoleDetail = {
          id: 6,
          title: 'floor manager',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        request
          .post('/roles')
          .set('authorization', user.token)
          .send(newRoleDetail)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
    });
    describe('GET', () => {
      it('1. User should not be able to fetch role(s)', (done) => {
        request
          .get('/roles')
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
    });
    describe('PUT', () => {
      it('1. User should not be able to update role(s)', (done) => {
        const roleId = 2;
        const update = {
          title: 'super consultant'
        };

        request
          .put(`/roles/${roleId}`)
          .set('authorization', user.token)
          .send(update)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('1. User should not be able to delete role(s)', (done) => {
        const roleId = 2;

        request
          .delete(`/roles/${roleId}`)
          .set('authorization', user.token)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.success).to.equal(false);
            expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
            done();
          });
      });
    });
  });
});
