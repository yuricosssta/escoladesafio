// src/navigation/BottomTabsNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreen from '../../screens/posts/PostsHomeScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import { BottomTabsParamList, RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import PostsStackNavigator from '../stacks/PostsStackNavigator';
import SettingsStackNavigator from '../stacks/SettingsStackNavigator';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'PostsTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })} 
    >
      <Tab.Screen name="PostsTab" component={PostsStackNavigator} options={{title: 'Escola Desafio'}}/>
      <Tab.Screen name="SettingsTab" component={SettingsStackNavigator} options={{title: 'Confifurações'}}/>
    </Tab.Navigator>
  );
}
