import { Response as ExpResponse, Locals } from 'express';

export type Response<Body> = ExpResponse<Body, Locals>;
