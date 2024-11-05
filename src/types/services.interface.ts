export const ServiceCodes = {
  InsufficientData: 'InsufficientData',
  Created: 'Created',
  Ok: 'Ok',
  UnexpectedError: 'UnexpectedError',
  Conflict: 'Conflict',
  InvalidData: 'InvalidData',
  Unauthenticated: 'Unauthenticated',
  NotFound: 'NotFound',
} as const;

export type ServiceCodes = typeof ServiceCodes;
export type ServiceCodesNames = keyof ServiceCodes;
export type ServiceCodesVals = ServiceCodes[ServiceCodesNames];

export type DataOrUnknown<T> = T extends never ? unknown : T;

export interface Result<Data = unknown> {
  code: ServiceCodesVals;
  error: boolean;
  message: string;
  data?: Data;
}
