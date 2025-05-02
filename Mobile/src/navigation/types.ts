// src/navigation/types.ts

export type PostsStackParamList = {
  Home: undefined;
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

export type RootParamList = {
  Home: undefined;  
  Settings: undefined;  
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
};