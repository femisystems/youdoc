import { Request, RequestHandler } from 'express';

export interface ExtendedRequest extends Request {
  decoded?: {
    roleId: string;
    userId: string;
    username: string;
    email: string;
  };
  rawQuery?: string;
  searchQuery?: Record<string, any>;
}

export interface RouteDefinition {
  [path: string]: Array<{
    method: 'get' | 'post' | 'put' | 'delete';
    deps: Array<RequestHandler>;
  }>;
}

export type RouteMap = Record<string, RouteDefinition>;
