// src/components/FloatingActionButton.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../screens/styles';

type Props = {
  onPress: () => void;
  style?: ViewStyle;
};

export default function AddPostButton({ onPress, style }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Ionicons name="add" size={28} color="white" />
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     position: 'absolute',
//     bottom: 24,
//     right: 24,
//     backgroundColor: 'tomato',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
// });
