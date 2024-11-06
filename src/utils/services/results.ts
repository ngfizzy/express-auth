import { tSrvs } from 'types';
import logger from 'utils/logger';

export function createConflictResult<Data = unknown>(
  message: string,
  data?: Data,
): tSrvs.Result<Data> {
  logger.warn(message, tSrvs.ServiceCodes.Conflict, data);
  return {
    error: true,
    message,
    code: tSrvs.ServiceCodes.Conflict,
    data,
  };
}

export function createOkResult<Data = unknown>(message: string, data?: Data): tSrvs.Result<Data> {
  logger.info(message, tSrvs.ServiceCodes.Ok, data);

  return {
    error: false,
    message,
    code: tSrvs.ServiceCodes.Ok,
    data,
  };
}

export function createCreatedResult<Data = unknown>(
  message: string,
  data?: Data,
): tSrvs.Result<Data> {
  logger.info(message, tSrvs.ServiceCodes.Created, data);

  return {
    error: false,
    message,
    code: tSrvs.ServiceCodes.Created,
    data,
  };
}

export function createInsufficientDataErrorResult<Data = never>(
  message: string,
  data?: Data,
): tSrvs.Result<Data> {
  logger.warn(message, tSrvs.ServiceCodes.InsufficientData, data);

  return {
    error: true,
    message,
    code: tSrvs.ServiceCodes.InsufficientData,
    data,
  };
}

export function createUnauthenticatedResult<Data = unknown>(
  message: string,
  data?: Data,
): tSrvs.Result<Data> {
  logger.info(message, tSrvs.ServiceCodes.Unauthenticated, data);

  return {
    error: true,
    message,
    code: tSrvs.ServiceCodes.Unauthenticated,
    data,
  };
}

export function createInvalidDataErrorResult<Data = never>(message: string, data?: Data) {
  logger.warn(message, tSrvs.ServiceCodes.InvalidData, data);

  return {
    error: true,
    message,
    code: tSrvs.ServiceCodes.InvalidData,
    data,
  };
}

export function createNotFoundErrorResult<Data = never>(message: string, data?: Data) {
  logger.warn(message, tSrvs.ServiceCodes.NotFound, data);

  return {
    error: true,
    message,
    code: tSrvs.ServiceCodes.NotFound,
    data,
  };
}

export function createUnexpectedErrorResult<Data = never>(
  message: string,
  data?: Data,
): tSrvs.Result<Data> {
  logger.error(message, tSrvs.ServiceCodes.UnexpectedError, data);

  return {
    error: true,
    message,
    code: tSrvs.ServiceCodes.UnexpectedError,
    data,
  };
}
