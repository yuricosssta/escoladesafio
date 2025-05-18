// components/UserDetails.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getUserRuleLabel, IUser } from '../lib/types/IUser';
import { getUserById } from '../lib/api/users'; // ajuste o caminho conforme seu projeto
import styles from '../screens/styles'; // ajuste o caminho conforme seu projeto

type Props = {
  userId: string;
};

export default function UserDetails({ userId }: Props) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        console.log('Fetched user:', fetchedUser); 
        setUser(fetchedUser);
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!user) return <Text>Usuário não encontrado.</Text>;

  return (
    <View style={[styles.item, { alignContent: 'flex-start' }]}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Função: {user.rule} {getUserRuleLabel(user.rule)}</Text>
    </View>
  );
}

// const UserRoleToLabel = (role: number): string => {
//   switch (role) {
//     case 0: return 'Administração';
//     case 1: return 'Professor';
//     case 2: return 'Aluna(o)';
//     default: return 'Desconhecido';
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 8,
//     marginVertical: 8,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
