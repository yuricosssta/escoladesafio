// src/navigation/types.ts

export type PostsStackParamList = {
  PostsHome: undefined;
  PostEdit: { postId?: string };// otherParam: string };
  PostDetails: { postId: string };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
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
  MainTabs: undefined;
  // SettingsTab: undefined;
  Login: undefined;
};

export type BottomTabsParamList = {
  PostsTab: undefined;
  SettingsTab: undefined;
};
