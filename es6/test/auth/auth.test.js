import request from 'supertest';
import { expect } from 'chai';
import { Roles, Users } from '../../models/Index';
import app from '../../app';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';

request(app);

before(() => {
  Roles
    .create(roleSeeds[0])
    .then(() => {
      Users
        .create(adminSeed);
    })
    .then(() => {
      request
        .post('/users/login')
        .send(adminSeed)
        .end((err, res) => {
          console.log(res);
        });
    });
});
