
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { getPosts } from '../lib/api/posts';
import { IPost } from '../lib/types/IPost';
import PostList from '../components/PostList';

export default function HomeScreen() {
  // const [posts, setPosts] = useState<IPost[]>([]);
  // const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const data = await getPosts();
  //       setPosts(data);
  //       console.log('Posts:', data);
  //     } catch (error) {
  //       console.error('Erro ao buscar posts:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" color="#333" />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <PostList />
        {/* <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.textBody}>{item.author}</Text>
              <Text style={styles.textBody} numberOfLines={3}>{item.content}</Text>

            </View>
          )}
          keyExtractor={item => item.id}
        /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4
  }
  
});
