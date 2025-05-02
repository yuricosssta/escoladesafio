// src/screens/ProfileScreen.tsx

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { View, Text, Button } from 'react-native';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function ProfileScreen({ route, navigation }: Props) {
  const userId  = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de Perfil</Text>
      

      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}