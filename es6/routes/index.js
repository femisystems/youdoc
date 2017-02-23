import RoleRoutes from './RoleRoutes';
import UserRoutes from './UserRoutes';
import TypeRoutes from './TypeRoutes';
import DocRoutes from './DocRoutes';


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
