import supertest from 'supertest';
import { expect } from 'chai';
import { Roles, Users } from '../../models/Index';
import app from '../../server';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';
import userSeeds from '../../db/seeds/Users';

const request = supertest(app);
let token;

/**
 * ROLE API
 *
 * GET /roles        => Admin should be able to retrieve all roles
 * GET /roles/:id    => Admin should be able to retrieve roles by id
 * PUT /roles/:id    => Admin should be able to update roles
 * !DELETE /roles/:id => Admin should not be able to remove role(s)
 *
 * !POST /roles      => Users should not be able to create role(s)
 * !GET /roles       => Users should not be able to retrieve role(s)
 */
describe('ROLE API', () => {
  // setup
  before((done) => {
    Roles
      .create(roleSeeds[0])
      .then((role) => {
        adminSeed.roleId = role.dataValues.id;
        request
          .post('/users')
          .send(adminSeed)
          .end((err, res) => {
            if (!err) {
              token = res.body.data.credential.token;
            }
            done();
          });
      });
  });

  // teardown
  after(() => Users.sequelize.sync({ force: true }));

  describe('ADMIN', () => {
    it('1. POST /roles => Should allow admin user to create role', (done) => {
      request
        .post('/roles')
        .set('authorization', token)
        .send(roleSeeds[1])
        .expect(201)
        .end((err, res) => {
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('role(s) successfully created.');
          done();
        });
    });
    it('2. GET /roles => Admin should be able to retrieve roles', (done) => {
      request
        .get('/roles')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('role(s) successfully retrieved.');
          expect(res.body.data).to.have.length.above(0);
          done();
        });
    });
    it('3. GET /roles/:id => Admin should be able to retrieve role by id', (done) => {
      const id = 2;

      request
        .get(`/roles/${id}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal('role(s) successfully retrieved.');
          done();
        });
    });
    it('4. GET /roles/:id => Should return 404 if role does not exist', (done) => {
      const id = 10;

      request
        .get(`/roles/${id}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Sorry! role(s) not found.');
          done();
        });
    });
  });
  describe('CONSULTANT, FACILITATOR, FELLOW', () => {
    it('1. POST /roles => Should not allow other users to create role', (done) => {
      request
        .post('/users')
        .send(userSeeds[0])
        .end((err, res) => {
          if (!err) {
            token = res.body.data.credential.token;
            request
              .post('/roles')
              .set('authorization', token)
              .send(roleSeeds[2])
              .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body.success).to.be.false;
                expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
                done();
              });
          }
        });
    });
    it('2. GET /roles => Should not allow other users to view roles', () => {
      request
        .get('/roles')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal('Forbidden! This is a restricted content');
          done();
        });
    });
  });
});
