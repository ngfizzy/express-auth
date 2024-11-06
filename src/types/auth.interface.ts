export interface SignupReq {
  mobile: string;
  email: string;
  password: string;
  name: string;
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
