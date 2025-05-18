
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { getPosts } from '../../lib/api/posts';
import { IPost } from '../../lib/types/IPost';
import PostList from '../../components/PostList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PostsStackParamList } from '../../navigation/types';
import AddPostButton from '../../components/AddPostButton';
import styles from '../styles';


export default function PostsHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<PostsStackParamList>>();

  const handleCreatePost = () => {
    navigation.navigate('PostEdit', { postId: '' }); // você pode ajustar os parâmetros conforme necessário
  };

  return (
    <SafeAreaProvider> 
      <SafeAreaView style={styles.container}>
      <PostList />
      <AddPostButton onPress={handleCreatePost} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
  
//   title: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     marginBottom: 4
//   }
  
// });
