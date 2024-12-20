export interface IBet {
  _id: string;
  userId: string;
  gameId: string;
  betAmount: number;
  betNumber: number;
  betColor: string;
  winningNumber: number;
  winningColor: string;
  winningAmount: number;
  winning: boolean;
  status: 'pending' | 'inprogress' | 'completed' | 'canceled';
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ICreateBet {
  userId: string;
  gameId: string;
  betAmount: number;
  betNumber: number;
  winningAmount: number;
}
