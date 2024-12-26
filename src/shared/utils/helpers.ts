import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, salt);
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(password, hashedPassword);
}

const TOKEN_KEY: string = process.env.TOKEN_SECRET as unknown as string;

const verifyJWTToken = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_KEY, (err: any, decoded: any) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
export const verifyToken = async (token: string) => verifyJWTToken(token);

export const generateToken = (payload: any) => {
  return jwt.sign(payload, TOKEN_KEY, { expiresIn: '1h' });
};

export interface IRespond {
  isSuccess: boolean;
  data: Record<string, any>;
}

export const respond = (isSuccess: boolean, data: Record<string, any>): IRespond => ({
  isSuccess,
  data,
});
