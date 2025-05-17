//Mobile/src/lib/types/IUser.ts
  
  export enum UserRule {
  Admin,      // 0
  Teacher,    // 1
  Student     // 2
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  rule: UserRule;
}
