import { Application, Router } from 'express';
import { login, logout } from './core/middleware';
import { RouteMap } from './types';

const routesMap: RouteMap = {
  auth: {
    '/login': [{ method: 'post', deps: [login] }],
    '/logout': [{ method: 'post', deps: [logout] }],
  },

  /**
   * --------------------------------------
   * user
   * --------------------------------------
   */
  users: {
    // '/': [
    //   { method: 'post', deps: [UserController.createUser] },
    //   {
    //     method: 'get',
    //     deps: [verifyUser, buildUserSearchQuery, UserController.listUsers],
    //   },
    // ],
    // '/:id': [
    //   {
    //     method: 'get',
    //     deps: [verifyUser, buildUserSearchQuery, UserController.getUser],
    //   },
    //   {
    //     method: 'put',
    //     deps: [verifyUser, checkUserWriteAccess, UserController.updateUser],
    //   },
    //   {
    //     method: 'delete',
    //     deps: [verifyUser, verifyAdmin, UserController.deleteUser],
    //   },
    // ],
    // '/:id/documents': [
    //   {
    //     method: 'get',
    //     deps: [verifyUser, fetchOwnerData, getUserDocs],
    //   },
    // ],
  },

  /**
   * --------------------------------------
   * roles
   * --------------------------------------
   */
  // roles: {
  //   '/': [
  //     {
  //       method: 'get',
  //       deps: [verifyUser, verifyAdmin, RoleController.listRoles],
  //     },
  //     {
  //       method: 'post',
  //       deps: [verifyUser, verifyAdmin, RoleController.createRole],
  //     },
  //   ],
  //   '/:id': [
  //     {
  //       method: 'get',
  //       deps: [verifyUser, verifyAdmin, RoleController.getRole],
  //     },
  //     {
  //       method: 'put',
  //       deps: [
  //         verifyUser,
  //         verifyAdmin,
  //         checkRoleWriteAccess,
  //         RoleController.updateRole,
  //       ],
  //     },
  //     {
  //       method: 'delete',
  //       deps: [
  //         verifyUser,
  //         verifyAdmin,
  //         checkRoleWriteAccess,
  //         RoleController.deleteRole,
  //       ],
  //     },
  //   ],
  // },

  /**
   * --------------------------------------
   * documents
   * --------------------------------------
   */
  // documents: {
  //   '/': [
  //     {
  //       method: 'get',
  //       deps: [verifyUser, search, search],
  //     },
  //     {
  //       method: 'post',
  //       deps: [verifyUser, docExists, createDoc],
  //     },
  //   ],
  //   '/:id': [
  //     {
  //       method: 'get',
  //       deps: [verifyUser, buildSingleDocQuery, getDoc],
  //     },
  //     {
  //       method: 'put',
  //       deps: [verifyUser, checkDocWriteAccess, docExists, updateDoc],
  //     },
  //     {
  //       method: 'delete',
  //       deps: [verifyUser, checkDocWriteAccess, deleteDoc],
  //     },
  //   ],
  // },

  /**
   * --------------------------------------
   * types
   * --------------------------------------
   */
  // types: {
  //   '/': [
  //     {
  //       method: 'post',
  //       deps: [verifyUser, verifyAdmin, TypeController.createType],
  //     },
  //     { method: 'get', deps: [verifyUser, TypeController.listTypes] },
  //   ],
  //   '/:id': [
  //     { method: 'get', deps: [verifyUser, TypeController.getType] },
  //     {
  //       method: 'delete',
  //       deps: [verifyUser, verifyAdmin, TypeController.deleteType],
  //     },
  //   ],
  // },

  /**
   * --------------------------------------
   * search
   * --------------------------------------
   */
  // search: {
  //   '/': [
  //     {
  //       method: 'get',
  //       deps: [verifyUser, search, search],
  //     },
  //   ],
  // },
};

const configureRoutes = (
  routesMap: RouteMap
): ((a: Application) => Application) => {
  return (app: Application) => {
    const router = Router();
    app.get('/', (_, res) => res.send('Welcome to youdoc api!'));

    const parentRoutes = Object.keys(routesMap);
    parentRoutes.forEach((pr: string) => {
      const definitions = routesMap[pr];
      const endpoints = Object.keys(definitions);

      endpoints.forEach((url) => {
        const routeDefs = definitions[url];

        routeDefs.forEach((def) => {
          const { method, deps } = def;
          router.route(`/${pr}${url}`)[method](...deps);
        });
      });
    });

    app.use('/api/v1', router);

    // app.put('*', verifyUser, invalidRoute);
    // app.delete('*', verifyUser, invalidRoute);
    return app;
  };
};

export const route = configureRoutes(routesMap);
