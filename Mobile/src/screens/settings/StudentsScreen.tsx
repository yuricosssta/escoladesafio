// src/screens/settings/TeacherDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Students'>;

export default function StudentsScreen({ route }: Props) {
  // const { teacherId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Professor</Text>
      {/* <Text>ID: {teacherId}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
});
