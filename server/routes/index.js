const userRoutes = require('./UserRoutes');
const docRoutes = require('./DocRoutes');
const roleRoutes = require('./RoleRoutes');

module.exports = (app) => {
  // Home route
  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  // User routes
  app.use('/users', userRoutes);

  // document routes
  app.use('/documents', docRoutes);

  // Role routes
  app.use('/roles', roleRoutes);
};
