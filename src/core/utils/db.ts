import { NextFunction, Request, Response } from 'express';
import DocumentModel from '../database/models/document.model';
import { ExtendedRequest } from '../../types';
import UserEntity from '../database/models/user.model';
import { notFound, getFail, postFail } from '../middleware';

export const isAdmin = (req: any): boolean => {
  return parseInt(req.decoded.roleId, 10) === 1;
};

export const isAdminRoleField = (req: any): boolean => {
  return req.body.roleId && parseInt(req.params.id, 10) === 1;
};

export const buildUserSearchQuery = (
  req: ExtendedRequest,
  _: Response,
  next: NextFunction
): void => {
  // base query to include user's attributes
  const query = {
    attributes: {
      exclude: ['password'],
    },
    where: {},
  };

  // if request is coming from /users route use custom query
  if (`${req.baseUrl}` === '/users') {
    if (isAdmin(req)) {
      query.where = {};
    } else {
      query.where = {
        id: req.decoded?.userId,
      };
    }
  }

  // request is coming from /users/:id route, use custom query
  if (`${req.baseUrl}${req.route.path}` === '/users/:id') {
    query.where = {
      id: parseInt(req.params.id, 10),
    };

    if (!isAdmin(req) && !(req?.decoded?.userId === req.params?.id)) {
      query.attributes.exclude = [
        'id',
        'roleId',
        'email',
        'password',
        'createdAt',
        'updatedAt',
      ];
    }
  }

  req.searchQuery = query;
  next();
};

export const buildSingleDocQuery = (
  req: any,
  res: any,
  next: NextFunction
): void => {
  let rawQuery;

  if (isAdmin(req)) {
    rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        WHERE "Documents"."id" = ${req.params.id}
        ORDER BY id ASC`;
  } else {
    rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        WHERE "Documents"."id" = ${req.params.id} AND
        ( "Documents"."ownerId" = ${req.decoded.userId} OR
          "Documents"."accessLevel" = 'public' OR
          (
            "Documents"."accessLevel" = 'role' AND "Users"."roleId" = '${req.decoded.roleId}'
          )
        )
        ORDER BY id ASC`;
  }

  req.rawQuery = rawQuery;
  next();
};

export const fetchOwnerData = (req: any, res: any, next: NextFunction) => {
  const userQuery = {
    where: {
      id: parseInt(req.params.id, 10),
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password', 'email'],
    },
  };

  UserEntity.findOne(userQuery)
    .then((user) => {
      if (!user) return notFound(res, 'user');
      let rawQuery;

      if (isAdmin(req)) {
        rawQuery = `
            SELECT "Documents"."id", "Documents"."title", "Documents"."content",
            "Documents"."accessLevel", "Documents"."createdAt", "Documents"."updatedAt",
            "Documents"."typeId"
            FROM "Documents" WHERE "Documents"."ownerId" = ${req.params.id}
            ORDER BY id ASC;`;
      } else {
        rawQuery = `
            SELECT "Documents"."id", "Documents"."title", "Documents"."content",
            "Documents"."accessLevel", "Documents"."createdAt", "Documents"."updatedAt",
            "Documents"."typeId"
            FROM "Documents"
            INNER JOIN "Users"
            ON "Documents"."ownerId" = "Users"."id"
            WHERE "Documents"."ownerId" = ${req.params.id} AND
            (
              "Documents"."accessLevel" = 'public' OR
              (
                "Documents"."accessLevel" = 'role' AND "Users"."roleId" = '${req.decoded.roleId}'
              )
            )
            ORDER BY id ASC;`;
      }

      req.rawQuery = rawQuery;
      req.ownerData = user;
      next();
    })
    .catch(() => getFail(res, 400, 'user', 'Invalid input.'));
};

export const search = (req: any, res: any, next: NextFunction) => {
  /**
   * where: accessLevel = public ||
   * ownerId = req.decoded.userId ||
   * (accessLevel = role && onwer role = req.decoded.role)
   */
  let rawQuery;
  const keys = {
    queryString: req.query.q || '',
    docType: req.query.type || '',
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    orderBy: req.query.orderBy || 'id',
    order: req.query.order || 'ASC',
  };
  let offset = 0;

  // if limit exists, append to base query or use default limit
  if (keys.limit && keys.limit < 1) {
    return getFail(res, 400, 'document', 'limit cannot be less than 1');
  }

  // if page exists, append to base query or use default page
  if (keys.page && keys.page >= 1) {
    offset = (keys.page - 1) * keys.limit;
  } else {
    return getFail(res, 400, 'document', 'page cannot be less than 1');
  }

  if (isAdmin(req)) {
    rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        INNER JOIN "Types"
        ON "Documents"."typeId" = "Types"."id"
        AND ("Documents"."title" ILIKE '%${keys.queryString}%' OR "Documents"."content" ILIKE '%${keys.queryString}%')
        AND ("Types"."title" ILIKE '%${keys.docType}%')
        ORDER BY id ASC
        LIMIT ${keys.limit} OFFSET ${offset};`;
  } else {
    rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        INNER JOIN "Types"
        ON "Documents"."typeId" = "Types"."id"
        WHERE ("Documents"."accessLevel" = 'public'
        OR "Documents"."ownerId" = ${req.decoded.userId}
        OR ("Documents"."accessLevel" = 'role'  AND "Users"."roleId" = '${req.decoded.roleId}'))
        AND ("Documents"."title" ILIKE '%${keys.queryString}%' OR "Documents"."content" ILIKE '%${keys.queryString}%')
        AND ("Types"."title" ILIKE '%${keys.docType}%')
        ORDER BY id ASC
        LIMIT ${keys.limit} OFFSET ${offset};`;
  }
  req.rawQuery = rawQuery;
  next();
};

export const docExists = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const query = {
    where: {
      $and: [
        { ownerId: req?.decoded?.userId },
        { title: req.body.title },
        { content: req.body.content },
      ],
    },
  };

  DocumentModel.findOne(query).then((document) => {
    if (document) {
      return postFail(
        res,
        409,
        'document',
        'Document with title and content already exists.'
      );
    }

    req.body.ownerId = req?.decoded?.userId;
    next();
  });
};
