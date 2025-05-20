// src/navigation/SettingsStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../types';
import React from 'react';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import UserListScreen from '../../screens/settings/UserListScreen';
import UserDetailsScreen from '../../screens/settings/UserDetailsScreen';
import ProfileScreen from '../../screens/settings/ProfileScreen';
import RegisterUserScreen from '../../screens/user/RegisterUserScreen';
import { Icon } from 'react-native-vector-icons/Icon';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: true,
      title: 'Configurações',
      headerStyle: {
        backgroundColor: '#ffffff', // Cor do fundo do header
        height: 60 
      },
      headerTintColor: '#000000', // Cor do texto e dos ícones
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      headerTitleAlign: 'center', // Alinhamento do título
    }}    
    >
      
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
