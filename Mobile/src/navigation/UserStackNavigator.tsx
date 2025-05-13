// src/navigation/UserStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserStackParamList } from './types';

import RegisterScreen from '../screens/user/RegisterScreen';
import ForgotPasswordScreen from '../screens/user/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/user/ResetPasswordScreen';
import ChangePasswordScreen from '../screens/user/ChangePasswordScreen';

const Stack = createNativeStackNavigator<UserStackParamList>();

export default function UserStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
