import { IRequestWithUser } from '../../shared/utils/interface';
import { createBet, getBetsByUserId } from './bet.service';
import { Response } from 'express';

export const createUserBet = async (request: IRequestWithUser, response: Response) => {
  const userId = request.user._id;
  const bet = request.body;
  bet.userId = userId;
  const createdBet = await createBet(bet);
  if (!createdBet) {
    return response.status(400).json({ message: 'Unable to place bet' });
  }
  return response.status(201).json({
    status: 201,
    message: 'Bet placed successfully',
    data: bet,
  });
};

export const getUserBets = async (request: IRequestWithUser, response: Response) => {
  const userId = request.user._id;
  const bets = await getBetsByUserId(userId);
  if (!bets) {
    return response.status(400).json({ message: 'Unable to retrieve bets' });
  }
  return response.status(200).json({
    status: 200,
    message: 'Bets retrieved successfully',
    data: bets,
  });
};
