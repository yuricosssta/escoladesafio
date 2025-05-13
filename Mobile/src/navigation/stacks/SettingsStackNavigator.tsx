// src/navigation/SettingsStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../types';
import React from 'react';
import SettingsScreen from '../../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Teachers" component={TeachersScreen} />
      <Stack.Screen name="TeacherDetails" component={TeacherDetailsScreen} />
      <Stack.Screen name="Students" component={StudentsScreen} />
      <Stack.Screen name="StudentDetails" component={StudentDetailsScreen} /> */}
    </Stack.Navigator>
  );
}
