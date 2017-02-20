const RoleRoutes = require('./RoleRoutes');
const UserRoutes = require('./UserRoutes');
const TypeRoutes = require('./TypeRoutes');
const DocRoutes = require('./DocRoutes');


module.exports = (app) => {
  // Home route
  app.get('/', (req, res) => {
    res.send('Welcome!!');
  });

  // Use userRoutes
  app.use('/users', UserRoutes);

  // Use documentTypes
  app.use('/types', TypeRoutes);

  // Use DocRoutes
  app.use('/documents', DocRoutes);

  // Role routes
  app.use('/roles', RoleRoutes);
};
