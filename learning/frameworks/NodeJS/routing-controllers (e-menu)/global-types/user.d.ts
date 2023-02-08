declare type IRole = "admin" | "superadmin";

declare interface IUser {
  _id: string;
  role: IRole;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
