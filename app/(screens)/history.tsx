import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IWordDocument from '../models/WordDocument';
import { useRouter } from 'expo-router';

const PreviousWordsScreen = () => {
  const [words, setWords] = useState<{[id: string]: IWordDocument}>({});
  const router = useRouter();

  useEffect(() => {
    const fetchWordsFromStorage = async () => {
      try {
        const storedWords = await AsyncStorage.getItem('previousWords');
        if (storedWords) {
          setWords(JSON.parse(storedWords));
        }
      } catch (error) {
        console.error('Failed to load words from storage:', error);
      }
    };

    fetchWordsFromStorage();
  }, []);

  const handlePress = (word: string) => {
    router.push({ pathname: '/word-of-day', params: { word } });
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.item}>
        <Text style={styles.word}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(words)}
        renderItem={({ item }) => renderItem({ item })}
        keyExtractor={(item) => item}
        ListEmptyComponent={<Text>No previously seen words.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  word: {
    fontSize: 18,
  },
});

export default PreviousWordsScreen;