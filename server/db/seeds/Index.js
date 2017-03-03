import roles from './Roles';
import users from './Users';
import types from './Types';
import docs from './Documents';

export default {
  // roles
  validRoles: roles.validRoles,
  invalidRoles: roles.invalidRoles,

  // users
  validUsers: users.validUsers,
  invalidUsers: users.invalidUsers,

  // types
  validTypes: types.validTypes,
  invalidTypes: types.invalidTypes,

  // docs
  validDocs: docs.validDocs,
  invalidDocs: docs.invalidDocs
};
