// src/navigation/SettingsStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../types';
import React from 'react';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import UserListScreen from '../../screens/settings/UserListScreen';
import UserDetailsScreen from '../../screens/settings/UserDetailsScreen';
import ProfileScreen from '../../screens/settings/ProfileScreen';
import RegisterUserScreen from '../../screens/user/RegisterUserScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Teachers" component={TeachersScreen} />
      <Stack.Screen name="TeacherDetails" component={TeacherDetailsScreen} />
      
      <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} /> */}
    </Stack.Navigator>
  );
}
