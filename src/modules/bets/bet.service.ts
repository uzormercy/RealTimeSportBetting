import { BetModel } from './bet.model';
import { IBet, ICreateBet } from './interface';
import { v4 as uuid } from 'uuid';

export const createBet = async (createBetDTO: ICreateBet): Promise<IBet> => {
  // Validation here
  const betToSave = {
    ...createBetDTO,
    _id: uuid(),
    status: 'pending',
    winning: false,
  };

  // Save the bet to the database
  const bet = new BetModel(betToSave);
  await bet.save();
  return bet;
};
export const getBetsByUserId = (userId: string): Promise<IBet[]> => {
  return BetModel.find({ userId }).lean().exec();
};
