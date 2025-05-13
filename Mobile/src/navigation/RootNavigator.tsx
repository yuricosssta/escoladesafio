import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import BottomTabsNavigator from './tabs/BottomTabsNavigator';
import LoginScreen from '../screens/user/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isLoggedIn = true; // troque para sua lógica de autenticação

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {isLoggedIn ? ( */}
        <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
      {/* ) : ( */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      {/* )} */}
    </Stack.Navigator>
  );
}
