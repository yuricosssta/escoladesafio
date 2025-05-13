// src/navigation/UserStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from '../types';
import React from 'react';
import RegisterScreen from '../../screens/user/RegisterScreen';
import ForgotPasswordScreen from '../../screens/user/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} /> */}
    </Stack.Navigator>
  );
}
