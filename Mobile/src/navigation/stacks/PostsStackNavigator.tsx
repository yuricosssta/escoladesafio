// src/navigation/HomeStackNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsHomeScreen from '../../screens/posts/PostsHomeScreen';
import { PostsStackParamList } from '../types';
import PostEditScreen from '../../screens/posts/PostEditScreen';
import PostDetailsScreen from '../../screens/posts/PostDetailsScreen';

const Stack = createNativeStackNavigator<PostsStackParamList>();

export default function PostsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="PostsHome"
      screenOptions={{
        headerShown: true,
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
      <Stack.Screen name="PostsHome" component={PostsHomeScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
    </Stack.Navigator>
  );
}
