import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PostsStackParamList } from '../../navigation/types';
import { IPost } from '../../lib/types/IPost';
import { getPostById } from '../../lib/api/posts'; // você precisa ter essa função

type PostDetailsRouteProp = RouteProp<PostsStackParamList, 'PostDetails'>;

export default function PostDetailsScreen() {
  const route = useRoute<PostDetailsRouteProp>();
  const { postId } = route.params;

  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Post não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
      )}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.meta}>Autor: {post.author || 'Desconhecido'}</Text>
      <Text style={styles.meta}>
        Publicado em: {new Date(post.created_at).toLocaleDateString()}
      </Text>
      {post.modified_at && (
        <Text style={styles.meta}>
          Atualizado em: {new Date(post.modified_at).toLocaleDateString()}
        </Text>
      )}
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.body}>{post.description}</Text>
      <Text style={styles.label}>Conteúdo:</Text>
      <Text style={styles.body}>{post.content}</Text>
      <Text style={styles.status}>
        {post.published ? '✅ Publicado' : '❌ Rascunho'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  status: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
