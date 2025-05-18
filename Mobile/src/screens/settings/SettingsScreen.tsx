// src/screens/SettingsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserList from '../../components/UserList';
import UserDetails from '../../components/ProfileDetails';
import AdmConfigs from '../../components/AdmConfigs';
import styles from '../styles';

const someUserId = '6829b4819cac584c0efa6d29'; // Substitua pelo ID do usuário que você deseja exibir

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <UserDetails userId={someUserId} />
      <AdmConfigs title="Painel Administrativo" />
      {/* <Text style={styles.text}>⚙️ Configurações</Text> 
      <UserList /> */}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, justifyContent: 'center', alignItems: 'center'
//   },
//   text: {
//     fontSize: 24
//   }
// })
;
