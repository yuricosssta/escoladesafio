// src/screens/settings/TeacherDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SettingsStackParamList } from '../../navigation/types';
import UserList from '../../components/UserList';
import { UserRule } from '../../lib/types/IUser';
import { RouteProp, useRoute } from '@react-navigation/native';


type Props = NativeStackScreenProps<SettingsStackParamList, 'UserList'>



export default function UserListScreen({ navigation }: Props) {
  // const { teacherId } = route.params;
  const route = useRoute<RouteProp<SettingsStackParamList, 'UserList'>>();
  const filterRule = route.params?.filterRule;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Detalhes do Professor</Text> */}
      <UserList filterRule={filterRule} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
});
