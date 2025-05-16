enum TransactionType {
  WITHDRAWL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export type ChangeBalanceParams = {
  userId: string;
  amount: string;
  transactionType: TransactionType;
};
