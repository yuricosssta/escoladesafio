// src/navigation/MainNavigator.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/PostDetailsScreen';
import React from 'react';
import { RootParamList } from './types';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createNativeStackNavigator<RootParamList>();

export default function MainNavigator() {
  return (

    <BottomTabsNavigator />

  );
}