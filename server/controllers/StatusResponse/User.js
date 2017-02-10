// Status messages for user actions
const user = {
  GETSUCCESS: {
    success: true,
    message: 'User(s) successfully retrieved!'
  },
  POSTSUCCESS: {
    success: true,
    message: 'User successfully created!'
  },
  PUTSUCCESS: {
    success: true,
    message: 'User successfully updated!'
  },
  DELSUCCESS: {
    success: true,
    message: 'User successfully removed!'
  },
  REGFAIL: {
    success: false,
    message: 'User with this email already exists'
  },
  POSTFAIL: {
    success: false,
    message: 'Process failed! Unable to create user.'
  },
  PUTFAIL: {
    success: false,
    message: 'Process failed! Unable to update user.'
  },
  DELFAIL: {
    success: false,
    message: 'Process failed! Unable to remove user.'
  },
  GETFAIL: {
    success: false,
    message: 'Process failed! Unable to retrieve user(s) at this time.'
  },
  GHOSTLOGIN: {
    success: false,
    message: 'The username or password logged is incorrect. Check and try again!'
  },
  LOGINSUCCESS: {
    success: true,
    message: 'You are now logged in.'
  },
  LOGINFAIL: {
    success: false,
    message: 'Process failed! Unable to login.'
  },
  LOGOUTSUCCESS: {
    success: true,
    message: 'You are now logged out! See ya!'
  },
  LOGOUTFAIL: {
    success: false,
    message: 'Process failed! Unable to logout.'
  }
};

module.exports = user;
