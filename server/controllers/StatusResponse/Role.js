// Status messages for role actions
const role = {
  GETSUCCESS: {
    success: true,
    message: 'Role(s) successfully retrieved!'
  },
  POSTSUCCESS: {
    success: true,
    message: 'Role successfully created!'
  },
  PUTSUCCESS: {
    success: true,
    message: 'Role successfully updated!'
  },
  DELSUCCESS: {
    success: true,
    message: 'Role successfully removed!'
  },
  GETFAIL: {
    success: false,
    message: 'Process failed! Unable to fetch role(s).'
  },
  POSTFAIL: {
    success: false,
    message: 'Process failed! Unable to create role.'
  },
  PUTFAIL: {
    success: false,
    message: 'Process failed! Unable to update role.'
  },
  DELFAIL: {
    success: false,
    message: 'Process failed! Unable to remove role.'
  }
};

module.exports = role;
