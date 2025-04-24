export type FindUserParams = {
  userIds?: string[];
  phones?: string[];
  login?: string;
  take?: number;
  skip?: number;
};

export type CheckExistUserParams = {
  phone: string;
  login: string;
};

export type CreateUserResponse = {
  firstName: string;
  lastName: string;
  phone: string;
  userId: string;
};
