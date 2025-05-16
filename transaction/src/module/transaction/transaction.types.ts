export enum TransactionType {
  WITHDRAWL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export type FindTransactionParams = {
  userIds?: string[];
  transIds?: string[];
  type?: TransactionType;
  amounts?: string[];
  take?: number;
  skip?: number;
};
