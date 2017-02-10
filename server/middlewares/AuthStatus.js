// Status messages for authentication
const status = {
  SUCCESS: {
    success: true,
    message: 'Welcome!'
  },
  FAIL: {
    success: false,
    message: 'Sorry! Token authentication failed.'
  },
  UNAUTHORIZED: {
    success: false,
    message: 'Not authorized! Please login or create an account.',
  },
  FORBIDDEN: {
    success: false,
    message: 'Forbidden! Admin access only.'
  }
};

module.exports = status;
