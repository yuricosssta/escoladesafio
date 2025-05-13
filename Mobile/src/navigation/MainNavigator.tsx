// src/navigation/MainNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/posts/PostsHomeScreen';
import DetailsScreen from '../screens/posts/PostDetailsScreen';
import React from 'react';
import { RootStackParamList } from './types';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (

    <BottomTabsNavigator />

  );
}