import React, { useState, useEffect, useCallback } from 'react';
import {
    TextInput,
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { getUserRuleLabel, IUser, UserRule } from '../lib/types/IUser';
import { getUsers } from '../lib/api/users';
import { SettingsStackParamList } from '../navigation/types';
import styles from '../screens/styles';

type Props = {
    filterRule?: UserRule;
};


export default function UserList({ filterRule }: Props) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

    useFocusEffect(
        useCallback(() => {
            const fetchUsers = async () => {
                try {
                    const data = await getUsers();
                    const filteredByRule = filterRule != null
                        ? data.filter(user => user.rule === filterRule)
                        : data;

                    setUsers(filteredByRule);
                    setFilteredUsers(filteredByRule);
                } catch (error) {
                    console.error('Erro ao buscar usuários:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        }, [])
    );



    useEffect(() => {
        let filtered = users;
        if (filterRule !== undefined) {
            filtered = filtered.filter(user => user.rule === filterRule);
        }

        filtered = users.filter(user =>
            (user.name?.toLowerCase() ?? '').includes(searchText.toLowerCase()) ||
            (user.email?.toLowerCase() ?? '').includes(searchText.toLowerCase())
            // (user.rule?.toLowerCase() ?? '').includes(searchText.toLowerCase())
        );

        setFilteredUsers(filtered);
    }, [searchText, users, filterRule]);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Procurar usuário"
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
            />
            <FlatList
                data={filteredUsers}
                initialNumToRender={5}
                keyExtractor={item => item._id}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('UserDetails', { userId: (item._id) })}
                    >
                        {/* <Text style={styles.textBody}>{item._id}</Text> */}
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.textBody}>{item.email}</Text>
                        <Text style={styles.textBody}>{getUserRuleLabel(item.rule)}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: { padding: 16, flex: 1 },
//     searchInput: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         padding: 16,
//         marginBottom: 12,
//     },
//     item: {
//         backgroundColor: '#f0f0f0',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderRadius: 8,
//     },
//     title: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginBottom: 4,
//     },
//     textBody: {
//         fontSize: 12,
//         marginBottom: 2,
//     },
//     loader: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
