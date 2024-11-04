export const Status = {
  Ok: 200,
  ServiceUnavailable: 503,
  InternalServerError: 500,
} as const;

export type Status = typeof Status;
export type StatusNames = keyof Status;
export type StatusNum = Status[StatusNames];
