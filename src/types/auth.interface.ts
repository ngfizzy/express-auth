export interface SignupReq {
  mobile: string;
  password: string;
}

export interface VerificationReq {
  mobile: string;
  code: string;
}

export interface AccountVerifReq extends VerificationReq {}

export interface LoginReq extends SignupReq {}

export interface LoginVerifReq extends VerificationReq {}
export interface ResetPasswordReq {
  mobile: string;
}

export interface RestPasswordVerifReq extends VerificationReq {
  password: string;
}
