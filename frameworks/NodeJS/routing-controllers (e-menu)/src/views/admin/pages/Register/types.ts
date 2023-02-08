export interface IRegisterFormFields extends Omit<ISignUpData, "role"> {
  confirm_password: string;
}
