
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { getPosts } from '../../lib/api/posts';
import { IPost } from '../../lib/types/IPost';
import PostList from '../../components/PostList';

export default function PostsHomeScreen() {
 
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <PostList />
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
