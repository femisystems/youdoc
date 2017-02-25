import Db from '../../models/Index';
import seed from '../../db/seeds/Role';

describe('#RoleTest', () => {
  // setup
  beforeAll(() => Db.Roles.bulkCreate(seed));

  // teardown
  afterAll(() => Db.Roles.sequelize.sync({ force: true }));

  // create role
  describe('#Create', () => {
    test('1. Admin role was successfully created', () => {
      Db.Roles
        .findOne({ title: 'admin' })
        .then(role => expect(role.id).toEqual(1));
    });
    test('2. Other roles(consultant, facilitator, fellow) were successfully created', () => {
      Db.Roles
        .findAll()
        .then((roles) => {
          expect(roles.length).toEqual(4);
          expect(roles[1].title).toEqual('consultant');
          expect(roles[2].title).toEqual('facilitator');
          expect(roles[3].title).toEqual('fellow');
        });
    });
  });

  // validate create role input
  describe('#Validate', () => {
    test('1. Should not recreate an existing role', () => {
      const role5 = {
        id: 5,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      Db.Roles
      .create(role5)
      .then(role => expect(role).toBeUndefined)
      .catch((err) => {
        expect(err.errors[0].type).toBe('unique violation');
        expect(err.errors[0].message).toBe('title must be unique');
      });
    });
    test('2. Should not create a role with null data', () => {
      const role6 = {};

      Db.Roles
      .create(role6)
      .then(role => expect(role).toBeUndefined)
      .catch((err) => {
        expect(err.message).toBe('notNull Violation: title cannot be null');
      });
    });
    test('3. Should not create a role with wrong data type', () => {
      const role7 = {
        id: 7,
        title: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      Db.Roles
      .create(role7)
      .then(role => expect(role).toBeUndefined)
      .catch((err) => {
        expect(err.message).toBe('notNull Violation: title cannot be null');
      });
    });
  });

  // update role
  describe('#Update', () => {
    test('1. Should update role by id', () => {
      const adminRoleId = 1;
      const update = { title: 'superAdmin' };

      Db.Roles
        .findById(adminRoleId)
        .then((role) => {
          role.update(update)
            .then(updatedRole => expect(updatedRole.dataValues.title).toBe('superAdmin'));
        });
    });
  });

  // delete role
  describe('#Delete', () => {
    test('1. Should delete role by id', () => {
      const consultantRoleId = 2;

      Db.Roles
        .findById(consultantRoleId)
        .then((role) => {
          role.destroy()
            .then(() => {
              Db.Roles
                .findById(consultantRoleId)
                .then()
                .catch(err => expect(err.message).toBe('relation "Roles" does not exist'));
            });
        });
    });
  });
});
