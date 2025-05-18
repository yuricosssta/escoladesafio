//Mobile/src/lib/types/IUser.ts
  
  export enum UserRule {
  Admin,      // 0
  Teacher,    // 1
  Student     // 2
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  rule: UserRule;
}


export function getUserRuleLabel(rule: UserRule | number): string {
  switch (rule) {
    case UserRule.Admin:
      return 'Administração';
    case UserRule.Teacher:
      return 'Professor(a)';
    case UserRule.Student:
      return 'Estudante';
    default:
      return 'Desconhecido';
  }
}

