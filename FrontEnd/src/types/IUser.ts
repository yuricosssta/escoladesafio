export enum UserRule {
  Admin,      // 0
  Teacher,    // 1
  Student     // 2
}

export interface IUser {
  id?: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  rule: UserRule;
  created_at?: Date;
  modified_at?: Date;
}