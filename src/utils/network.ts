import { Response } from 'express';
import { tSrvs, tNetwork } from '../types';

export const ServiceToNetworkStatusMap: Record<tSrvs.ServiceCodesVals, tNetwork.StatusNum> = {
  [tSrvs.ServiceCodes.Ok]: tNetwork.Status.Ok,
  [tSrvs.ServiceCodes.Created]: tNetwork.Status.Created,
  [tSrvs.ServiceCodes.InsufficientData]: tNetwork.Status.UnprocessableEntity,
  [tSrvs.ServiceCodes.InvalidData]: tNetwork.Status.UnprocessableEntity,
  [tSrvs.ServiceCodes.Conflict]: tNetwork.Status.Conflict,
  [tSrvs.ServiceCodes.UnexpectedError]: tNetwork.Status.InternalServerError,
  [tSrvs.ServiceCodes.Unauthenticated]: tNetwork.Status.Unauthenticated,
  [tSrvs.ServiceCodes.NotFound]: tNetwork.Status.NotFound,
};

/**
 * Converts a service result to an HTTP response by mapping ServiceCodes to HTTP status codes.
 *
 * @param res - Express response object
 * @param serviceResult - The result from a service function
 * @returns The HTTP response with the appropriate status code and message
 */
export function sendResponse<Data>(res: Response, serviceResult: tSrvs.Result<Data>) {
  const { code, error, message, data } = serviceResult;
  const statusCode =
    ServiceToNetworkStatusMap[code as tSrvs.ServiceCodesVals] ||
    tNetwork.Status.InternalServerError;

  res.status(statusCode).json({
    error,
    message,
    data: data ?? null,
  });
}
