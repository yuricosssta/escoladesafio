// src/navigation/types.ts

export type PostsStackParamList = {
  PostsHome: undefined;
  PostEdit: { postId: number; otherParam: string };
  PostDetails: { postId: number };
};

export type SettingsStackParamList = {
  Settings: undefined;
  Profile: undefined;
  Teachers: undefined;
  TeacherDetails: { teacherId: number };
  Students: undefined;
  StudentDetails: { studentId: number };
};

export type UserStackParamList = {
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
};

export type RootStackParamList = {
  PostsTab: undefined;
  SettingsTab: undefined;
  Login: undefined;
};