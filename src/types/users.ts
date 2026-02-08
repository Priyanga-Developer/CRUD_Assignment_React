export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type CreateUserInput = Omit<User, "id">;
