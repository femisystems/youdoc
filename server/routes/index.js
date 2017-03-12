import RoleRoutes from './Role';
import UserRoutes from './User';
import TypeRoutes from './Type';
import DocRoutes from './Document';
import Auth from '../middleware/Auth';
import Status from '../middleware/ActionStatus';


export default (app) => {
  // Home route
  app.get('/', (req, res) => {
    res.send('Welcome to youdoc api!');
  });

  // Use userRoutes
  app.use('/users', UserRoutes);

  // Use documentTypes
  app.use('/types', TypeRoutes);

  // Use DocRoutes
  app.use('/documents', DocRoutes);

  // Role routes
  app.use('/roles', RoleRoutes);

  app.put('*', Auth.verifyUser, Status.invalidRoute);
  app.delete('*', Auth.verifyUser, Status.invalidRoute);
};
