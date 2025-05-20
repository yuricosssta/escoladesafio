import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert, ScrollView, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PostsStackParamList } from '../../navigation/types';
import { getPostById, createPost, updatePost } from '../../lib/api/posts';
import { IPost } from '../../lib/types/IPost';
import styles from '../styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type PostEditScreenRouteProp = RouteProp<PostsStackParamList, 'PostEdit'>;

export default function PostEditScreen() {
  const route = useRoute<PostEditScreenRouteProp>();
  const navigation = useNavigation();
  const isEditing = !!route.params?.postId;
  const postId = route.params?.postId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(300);

  useEffect(() => {
    if (isEditing && postId) {
      setLoading(true);
      getPostById(postId)
        .then(post => {
          setTitle(post.title);
          setDescription(post.description);
          setContent(post.content);
          // setAuthor(post.author ?? '');
          setAuthor(post.author);
        })
        .catch(error => {
          console.error('Erro ao carregar post:', error);
          Alert.alert('Erro', 'Não foi possível carregar o post.');
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, postId]);

  const handleSubmit = async () => {
    if (!title || !description || !content || !author) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    const postData: Partial<IPost> = {
      title,
      description,
      content,
      author,
      published: true,
    };

    setLoading(true);
    try {
      if (isEditing && postId) {
        await updatePost(postId, postData);
        Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      } else {
        await createPost(postData);
        Alert.alert('Sucesso', 'Post criado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      Alert.alert('Erro', 'Não foi possível salvar o post.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <ScrollView contentContainerStyle={[styles.scrollContainer]}>
          <Text style={styles.label}>Título</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Título" />

          <Text style={styles.label}>Descrição</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Descrição" />

          <Text style={styles.label}>Conteúdo</Text>
          <TextInput
            style={[styles.input, { height: inputHeight }]}
            value={content}
            onChangeText={setContent}
            placeholder="Conteúdo"
            multiline
            // onContentSizeChange={(event) => {
            //   const newHeight = event.nativeEvent.contentSize.height;
            //   setInputHeight(newHeight < 800 ? newHeight + 20 : 800); // Limita até 800
            // }}
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput style={styles.input} value={author} onChangeText={setAuthor} placeholder="Autor" />

          <Button title={isEditing ? 'Atualizar Post' : 'Criar Post'} onPress={handleSubmit} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 32,
//   },
//   label: {
//     marginTop: 12,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 4,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
