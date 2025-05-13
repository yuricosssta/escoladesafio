// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

type Props = {
  onLoginSuccess: () => void;
};

export default function LoginScreen({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const canLogin = username !== '' && password !== '';

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Faça login</Text>

      <Text>Usuário</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      <Text>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />

      <Button
        title="Entrar"
        disabled={!canLogin}
        onPress={onLoginSuccess}
      />
    </View>
  );
}
