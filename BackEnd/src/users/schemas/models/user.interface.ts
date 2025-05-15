// export enum UserRole {
//   Admin = 'admin',
//   Teacher = 'teacher',
//   Student = 'student',
// }

export enum UserRole {
  Admin,      // 0
  Teacher,    // 1
  Student     // 2
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  rule: UserRole;
}

