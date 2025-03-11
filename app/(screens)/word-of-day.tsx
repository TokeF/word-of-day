import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import WordDocument from '../models/WordDocument';

export default function WordOfDay() {
  const { todaysWord } = useSelector((state: RootState) => state.words);
  const [currentWord, setWord] = useState<WordDocument | null>(null);
  const { word: wordParam } = useGlobalSearchParams<{ word: string }>();

  useEffect(() => {
    const fetchWordFromStorage = async () => {
      if (wordParam) {
        try {
          const storedWords = await AsyncStorage.getItem('previousWords');
          const previousWords = storedWords ? JSON.parse(storedWords) : {};
          setWord(previousWords[wordParam] || null);
        } catch (error) {
          console.error('Failed to load word from storage:', error);
        }
      } else {
        setWord(todaysWord);
      }
    };

    fetchWordFromStorage();
  }, [todaysWord, wordParam]);

  useEffect(() => {
    const saveWordToStorage = async () => {
      if (todaysWord) {
        try {
          const storedWords = await AsyncStorage.getItem('previousWords');
          const previousWords = storedWords ? JSON.parse(storedWords) : {};
          if (!previousWords[todaysWord.word]) {
            previousWords[todaysWord.word] = todaysWord;
            await AsyncStorage.setItem('previousWords', JSON.stringify(previousWords));
          }
        } catch (error) {
          console.error('Failed to save word to storage:', error);
        }
      }
    };

    saveWordToStorage();
  }, [todaysWord]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.frame, { backgroundColor: wordParam ? '#FFD700' : '#C2EFF5' }]}>
        <Text style={styles.smallTitle}>Today's Word</Text>
        {currentWord ? (
          <>
            <Text style={styles.largeTitle}>{currentWord.word}</Text>
            {currentWord.class && <Text style={styles.class}>({currentWord.class})</Text>}
            <Text style={styles.description}>{currentWord.description}</Text>
            <Text style={styles.example}>"{currentWord.example}"</Text>
            <Text style={styles.category}>Category: {currentWord.category}</Text>
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
  example: {
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