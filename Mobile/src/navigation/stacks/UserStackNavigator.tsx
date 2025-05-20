// src/navigation/UserStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../types';
import React from 'react';
import RegisterUserScreen from '../../screens/user/RegisterUserScreen';
import ForgotPasswordScreen from '../../screens/user/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      title: 'Escola Desafio',
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
      {/* <Stack.Screen name="RegisterUser" component={RegisterUserScreen} /> */}
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} /> */}
    </Stack.Navigator>
  );
}
