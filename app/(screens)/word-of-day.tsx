import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import WordDocument from '../models/WordDocument';

export default function WordOfDay() {
  const { words } = useSelector((state: RootState) => state.words);
  const todaysWord: WordDocument | undefined = words[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.frame}>
        <Text style={styles.smallTitle}>Today's Word</Text>
        {todaysWord ? (
          <>
            <Text style={styles.largeTitle}>{todaysWord.word}</Text>
            <Text style={styles.class}>({todaysWord.class})</Text>
            <Text style={styles.description}>{todaysWord.description}</Text>
            <Text style={styles.sentence}>{todaysWord.example}</Text>
            <Text style={styles.category}>Category: {todaysWord.category}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: '#7ACDA8',
  },
  frame: {
    backgroundColor: '#C2EFF5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  smallTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#000',
    paddingBottom: 20
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10
  },
  class: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#000',
    paddingBottom: 40
  },
  description: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingBottom: 40
  },
  sentence: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    flexWrap: 'wrap',
    fontStyle: 'italic',
    paddingBottom: 60
  },
  loadingText: {
    fontSize: 18,
    color: '#000',
  },
  category: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#000',
  },
});