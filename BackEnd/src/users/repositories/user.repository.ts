//Backend/src/users/repositories/user.repository.ts

import { IUser } from '../schemas/models/user.interface';

export abstract class UserRepository {
  abstract getAllUsers(): Promise<IUser[]>;
  abstract getUser(userId: string): Promise<IUser>;
  abstract createUser(user: IUser): Promise<IUser>;
  abstract searchUser(term: string): Promise<IUser[]>;
  abstract findByEmail(email: string): Promise<IUser | null>;

  abstract updateUser(
    userId: string,
    user: Partial<IUser>,
  ): Promise<IUser | null>;

  abstract deleteUser(userId: string): Promise<IUser | null>;
}