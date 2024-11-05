import { Response } from 'express';
import { tSrvs } from 'types';
import { Status, StatusNum } from 'types/network.interface';
import { ServiceCodes, ServiceCodesVals } from 'types/services.interface';

export const ServiceToNetworkStatusMap: Record<ServiceCodesVals, StatusNum> = {
  [ServiceCodes.Ok]: Status.Ok,
  [ServiceCodes.Created]: Status.Created,
  [ServiceCodes.InsufficientData]: Status.UnprocessableEntity,
  [ServiceCodes.InvalidData]: Status.UnprocessableEntity,
  [ServiceCodes.Conflict]: Status.Conflict,
  [ServiceCodes.UnexpectedError]: Status.InternalServerError,
  [ServiceCodes.Unauthenticated]: Status.Unauthenticated,
  [ServiceCodes.NotFound]: Status.NotFound,
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
    ServiceToNetworkStatusMap[code as ServiceCodesVals] || Status.InternalServerError;

  res.status(statusCode).json({
    error,
    message,
    data: data ?? null,
  });
}
