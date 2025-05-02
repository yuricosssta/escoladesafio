// src/screens/DetailsScreen.tsx

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostsStackParamList, RootParamList } from '../navigation/types';
import { View, Text, Button } from 'react-native';
import React from 'react';

type Props = NativeStackScreenProps<PostsStackParamList, 'PostEdit'>;

export default function PostEditScreen({ route, navigation }: Props) {
  const { postId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detalhes do item: {postId}</Text>
      <Text>Outro param: {otherParam}</Text>

      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}