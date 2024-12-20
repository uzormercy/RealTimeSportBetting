export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface IUser extends ICreateUser {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}
