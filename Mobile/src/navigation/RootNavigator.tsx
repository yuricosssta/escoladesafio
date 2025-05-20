import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import BottomTabsNavigator from './tabs/BottomTabsNavigator';
import LoginScreen from '../screens/user/LoginScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false, 
      headerStyle: {
        backgroundColor: '#ffffff', // Cor do fundo do header
      },
      headerTintColor: '#000000', // Cor do texto e dos ícones
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      headerTitleAlign: 'center', // Alinhamento do título
    }}
    >
      {/* {user ? ( */}
      <Stack.Screen name="MainTabs" component={BottomTabsNavigator} />
       {/* ) : (  */}
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
       {/* )}  */}
    </Stack.Navigator>
  );
}
