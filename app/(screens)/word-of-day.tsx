import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useGlobalSearchParams } from "expo-router";
import WordDocument from "../models/WordDocument";
import { FontAwesome } from "@expo/vector-icons";

export default function WordOfDay() {
  const { todaysWord } = useSelector((state: RootState) => state.words);
  const [currentWord, setWord] = useState<WordDocument | null>(null);
  const [favorites, setFavorites] = useState<{ [id: string]: WordDocument }>(
    {}
  );
  const { word: wordParam, color: colorParam } = useGlobalSearchParams<{
    word: string;
    color: string;
  }>();

  useEffect(() => {
    const fetchWordFromStorage = async () => {
      if (wordParam) {
        try {
          const storedWords = await AsyncStorage.getItem("previousWords");
          const previousWords = storedWords ? JSON.parse(storedWords) : {};
          setWord(previousWords[wordParam] || null);
        } catch (error) {
          console.error("Failed to load word from storage:", error);
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
          const storedWords = await AsyncStorage.getItem("previousWords");
          const previousWords = storedWords ? JSON.parse(storedWords) : {};
          if (!previousWords[todaysWord.word]) {
            previousWords[todaysWord.word] = todaysWord;
            await AsyncStorage.setItem(
              "previousWords",
              JSON.stringify(previousWords)
            );
          }
        } catch (error) {
          console.error("Failed to save word to storage:", error);
        }
      }
    };

    saveWordToStorage();
  }, [todaysWord]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favoriteWords");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorite words from storage:", error);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async () => {
    if (currentWord) {
      const updatedFavorites = { ...favorites };
      if (favorites[currentWord.word]) {
        delete updatedFavorites[currentWord.word];
      } else {
        updatedFavorites[currentWord.word] = currentWord;
      }
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(
        "favoriteWords",
        JSON.stringify(updatedFavorites)
      );
    }
  };

  const isFavorite = currentWord && favorites[currentWord.word];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.frame,
          { backgroundColor: colorParam ? colorParam : "#C2EFF5" },
        ]}
      >
        <Text style={styles.smallTitle}>
          {wordParam ? "Previous Word" : "Today's Word"}
        </Text>
        {currentWord ? (
          <>
            <Text style={styles.largeTitle}>{currentWord.word}</Text>
            {currentWord.class && (
              <Text style={styles.class}>({currentWord.class})</Text>
            )}
            <Text style={styles.description}>{currentWord.description}</Text>
            <Text style={styles.example}>"{currentWord.example}"</Text>
            <Text style={styles.category}>
              Category: {currentWord.category}
            </Text>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={styles.favoriteButton}
            >
              <FontAwesome
                name={isFavorite ? "heart" : "heart-o"}
                size={24}
                color="#FF3D33"
              />
            </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#7ACDA8",
  },
  frame: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  smallTitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#000",
    paddingBottom: 20,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    paddingBottom: 10,
  },
  class: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#000",
    paddingBottom: 40,
  },
  description: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    flexWrap: "wrap",
    paddingBottom: 40,
  },
  example: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    flexWrap: "wrap",
    fontStyle: "italic",
    paddingBottom: 60,
  },
  loadingText: {
    fontSize: 18,
    color: "#000",
  },
  category: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 12,
    fontStyle: "italic",
    color: "#000",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
