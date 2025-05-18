// export enum UserRole {
//   Admin = 'admin',
//   Teacher = 'teacher',
//   Student = 'student',
// }
//BackEnd/src/users/schemas/models/user.interface.ts

export enum UserRule {
  Admin,      // 0
  Teacher,    // 1
  Student     // 2
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  rule: UserRule;
}

