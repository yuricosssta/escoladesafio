// src/screens/DetailsScreen.tsx

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostsStackParamList, RootParamList } from '../../navigation/types';
import { View, Text, Button } from 'react-native';
import React from 'react';

type Props = NativeStackScreenProps<PostsStackParamList, 'PostDetails'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { postId } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detalhes do item: {postId}</Text>


      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}