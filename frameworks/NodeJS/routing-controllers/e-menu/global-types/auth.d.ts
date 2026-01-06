declare interface ITokenData {
  _id: string;
  role: string;
}

declare interface IAuthData {
  user: IUser;
  token: string;
}

declare interface ISignInData {
  email: string;
  password: string;
}

declare interface ISignUpData {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
}

declare interface IEmailConfirmationTokenData {
  _id: string;
  email: string;
}
