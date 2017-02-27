import supertest from 'supertest';
import { expect } from 'chai';
import { Roles, Users } from '../../models/Index';
import app from '../../server';
import roleSeeds from '../../db/seeds/Roles';
import adminSeed from '../../db/seeds/Admin';
import userSeeds from '../../db/seeds/Users';
import typeSeeds from '../../db/seeds/Types';
import docSeeds from '../../db/seeds/Documents';

const request = supertest(app);
let token;

/**
 * USER API
 *
 * GET /users         => Admin should be able to retrieve all users
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
describe('USER API', () => {

});
