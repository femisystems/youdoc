const UserRoutes = require('./UserRoutes');
const DocRoutes = require('./DocRoutes');
const RoleRoutes = require('./RoleRoutes');

module.exports = (app) => {
  // Home route
  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  // Use userRoutes
  app.use('/users', UserRoutes);

  // Use DocRoutes
  app.use('/documents', DocRoutes);

  // Role routes
  app.use('/roles', RoleRoutes);
};
