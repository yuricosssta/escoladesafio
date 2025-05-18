// components/AdmConfigs.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../screens/styles';
import { SettingsStackParamList, UserStackParamList } from '../navigation/types';
import { UserRule } from '../lib/types/IUser';

type Props = {
  title?: string;
};


export default function AdmConfigs({ title = 'Administração'}: Props) {  
  const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  return (
    <View style={[styles.item, {alignItems: 'flex-end'}, styles.option]}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('UserList', { filterRule: UserRule.Student })}
      >
        <Text style={styles.optionText}>Alunos cadastrados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('UserList', { filterRule: UserRule.Teacher })}
      >
        <Text style={styles.optionText}>Professores cadastrados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('UserList', { filterRule: UserRule.Admin })}
      >
        <Text style={styles.optionText}>Administração cadastrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('RegisterUser')}
      >
        <Text style={styles.optionText}>Adicionar Novo Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   option: {
//     paddingVertical: 12,
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#007AFF',
//   },
// });
