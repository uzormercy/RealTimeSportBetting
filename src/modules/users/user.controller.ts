import { Request, Response } from 'express';
import { createUser, loginUser } from './user.service';
import { ICreateUser } from './interface';

export const registerUser = async (request: Request, response: Response) => {
  const userDto: ICreateUser = request.body;
  const user = await createUser(userDto);
  if (!user) {
    return response.status(400).json({ message: 'Unable to create user' });
  }
  return response.status(201).json(user);
};

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const user = await loginUser(email, password);
  if (!user) {
    return response.status(400).json({ message: 'Invalid credentials' });
  }
  return response.status(200).json(user);
};
