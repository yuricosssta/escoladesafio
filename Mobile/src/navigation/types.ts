// src/navigation/types.ts

import { UserRule } from "../lib/types/IUser";

export type PostsStackParamList = {
  PostsHome: undefined;
  PostEdit: { postId?: string };// otherParam: string };
  PostDetails: { postId: string };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
  Profile: undefined;
  UserDetails: { userId: string };
  RegisterUser: undefined;
  UserList: { filterRule?: UserRule };
  // Teachers: undefined;
  // TeacherDetails: { teacherId: number };
  Students: undefined;
  // StudentDetails: { studentId: number };
};

export type UserStackParamList = { 
  // RegisterUser: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ChangePassword: undefined;
  
};

export type RootStackParamList = {
  MainTabs: undefined;
  // SettingsTab: undefined;
  Login: undefined;
};

export type BottomTabsParamList = {
  PostsTab: undefined;
  SettingsTab: undefined;
};
