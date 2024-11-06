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

export interface LoginReq {
  mobile: string;
  password: string;
}

export interface LoginVerifReq extends VerificationReq {}
export interface ResetPasswordReq {
  mobile: string;
}

export interface RestPasswordVerifReq extends VerificationReq {
  password: string;
}
