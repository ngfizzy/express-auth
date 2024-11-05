import { Request } from 'express';

export const Status = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Conflict: 409,
  UnprocessableEntity: 422,
  ServiceUnavailable: 503,
  InternalServerError: 500,
  Unauthenticated: 401,
  Unauthorized: 403,
  NotFound: 400,
} as const;

export type Status = typeof Status;
export type StatusNames = keyof Status;
export type StatusNum = Status[StatusNames];

export type Req<Body = unknown> = Request<{}, {}, Body>;

export interface AuthReq<Body = unknown> extends Request {
  user?: { userId: string };
  body: Body;
}
