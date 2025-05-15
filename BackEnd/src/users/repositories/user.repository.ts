import { IUser } from '../schemas/models/user.interface';

export abstract class UserRepository {
  abstract getAllUsers(): Promise<IUser[]>;
  abstract getUser(postId: string): Promise<IUser>;
  abstract createUser(post: IUser): Promise<void>;
  abstract searchUser(term: string): Promise<IUser[]>;

  abstract updateUser(
    userId: string,
    user: Partial<IUser>,
  ): Promise<IUser | null>;

  abstract deleteUser(userId: string): Promise<IUser | null>;
}