import React, { useState, useEffect } from 'react';
import {
    TextInput,
    FlatList,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { IPost } from '../lib/types/IPost';
import { getPosts } from '../lib/api/posts';

export default function PostList() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                const sorted = data.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                setPosts(sorted);
                setFilteredPosts(sorted); // mostrar tudo inicialmente
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {

        const filtered = posts.filter(post =>
            (post.title?.toLowerCase() ?? '').includes(searchText.toLowerCase()) ||
            (post.description?.toLowerCase() ?? '').includes(searchText.toLowerCase()) ||
            (post.content?.toLowerCase() ?? '').includes(searchText.toLowerCase()) ||
            (post.author?.toLowerCase() ?? '').includes(searchText.toLowerCase())
        ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setFilteredPosts(filtered);
    }, [searchText, posts]);

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
                placeholder="Procurar ..."
                value={searchText}
                onChangeText={setSearchText}
                style={styles.searchInput}
            />
            <FlatList
                data={filteredPosts}
                keyExtractor={item => item.id}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.textBody}>{item.author}</Text>
                        <Text style={styles.textBody} numberOfLines={3}>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, flex: 1 },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    item: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    textBody: {
        fontSize: 12,
        marginBottom: 2,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
