import { Schema, model, Document } from 'mongoose';
import { IBet } from './interface';

export type BetDocument = IBet & Document;

const betSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  gameId: { type: String, required: true },
  betAmount: { type: Number, required: true },
  betNumber: { type: Number, required: true },
  winningNumber: { type: Number, required: true },
  winningAmount: { type: Number, required: true },
  winning: { type: Boolean, required: true, default: false },
  status: { type: String, required: true, default: 'pending' },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const BetModel = model<BetDocument>('Bet', betSchema);
