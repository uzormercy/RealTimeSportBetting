import { Schema, model, Document } from 'mongoose';
import { IUser } from './interface';

export type UserDocument = IUser & Document;

const userSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model<UserDocument>('User', userSchema);
