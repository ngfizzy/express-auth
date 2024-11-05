export const AppRequests = {
  AccountVerification: 'AccountVerification',
  PasswdChangeVerification: 'PasswordChangeVerification',
  LoginVerification: 'LoginVerification',
  PasswordReset: 'PasswordReset',
} as const;

export type AppRequests = typeof AppRequests;
export type AppRequestsNames = keyof AppRequests;
export type AppRequestVals = AppRequests[AppRequestsNames];
