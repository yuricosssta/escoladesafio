// src/navigation/HomeStackNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsHomeScreen from '../screens/posts/PostsHomeScreen';
import { PostsStackParamList } from './types';
import PostEditScreen from '../screens/posts/PostEditScreen';
import PostDetailsScreen from '../screens/posts/PostDetailsScreen';

const Stack = createNativeStackNavigator<PostsStackParamList>();

export default function PostsNavigator() {
  return (
    <Stack.Navigator initialRouteName="PostsHome">
      <Stack.Screen name="PostsHome" component={PostsHomeScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
    </Stack.Navigator>
  );
}
