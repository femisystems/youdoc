import RoleRoutes from './Role';
import UserRoutes from './User';
import TypeRoutes from './Type';
import DocRoutes from './Document';


export default (app) => {
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
