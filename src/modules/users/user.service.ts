import { generateToken, hashPassword, IRespond, respond, verifyPassword } from '../../shared/utils/helpers';
import { ICreateUser, IUser } from './interface';
import { UserModel } from './user.model';
import { createUserValidationSchema } from './validation';
import { v4 as uuid } from 'uuid';

export const createUser = async (userDto: ICreateUser): Promise<IRespond> => {
  const validation = createUserValidationSchema.safeParse(userDto);
  if (!validation.success) {
    return respond(false, {
      message: validation.error.issues[0].message,
    });
  }
  const userExist = await getUserByEmail(userDto.email);
  if (userExist) {
    return respond(false, { message: 'User with email already exists' });
  }
  const encryptPassword = hashPassword(userDto.password);
  const user: Partial<IUser> = {
    ...userDto,
    _id: uuid(),
    password: encryptPassword,
  };
  const createUser = new UserModel(user);
  createUser.save();
  return respond(true, {
    _id: createUser._id,
    name: createUser.name,
    email: createUser.email,
    createdAt: createUser.createdAt,
    updatedAt: createUser.updatedAt,
  });
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email }).lean().exec();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  user: Omit<IUser, 'password'>;
  token: string;
}> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  if (!verifyPassword(password, user.password)) {
    throw new Error('Invalid User credentials');
  }
  const token = generateToken({ email: user.email, _id: user._id });
  if (!token) {
    throw new Error('Oops something went wrong');
  }
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};
