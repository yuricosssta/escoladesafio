// src/screens/SettingsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚙️ Datalhe de usuário</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  text: {
    fontSize: 24
  }
});