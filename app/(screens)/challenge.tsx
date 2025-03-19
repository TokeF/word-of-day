import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IWordDocument from "../models/WordDocument";
import globalStyles from "./style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ChallengeScreen = () => {
  const [words, setWords] = useState<{ [id: string]: IWordDocument }>({});
  const [currentWord, setCurrentWord] = useState<IWordDocument | null>(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWordsFromStorage = async () => {
      try {
        const storedWords = await AsyncStorage.getItem("previousWords");
        if (storedWords) {
          const words = JSON.parse(storedWords);
          setWords(words);
          const wordKeys = Object.keys(words);
          const randomWord =
            words[wordKeys[Math.floor(Math.random() * wordKeys.length)]];
          setCurrentWord(randomWord);
        }
      } catch (error) {
        console.error("Failed to load words from storage:", error);
      }
    };

    fetchWordsFromStorage();
  }, []);

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  const handleSubmit = () => {
    if (currentWord && input.toLowerCase() === currentWord.word.toLowerCase()) {
      setMessage("Success! You guessed the correct word.");
    } else {
      setMessage("Try again!");
    }
  };

  const getSentenceWithoutWord = (sentence: string, word: string) => {
    const regex = new RegExp(`\\b${word.slice(0, -1)}\\w*\\b`, "gi"); // weak handling of different word endings
    return sentence.replace(regex, "_____");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
        <View style={[globalStyles.frame]}>
          <Text style={styles.title}>Word Challenge</Text>
          {currentWord ? (
            <>
              <Text style={styles.sentence}>
                {getSentenceWithoutWord(currentWord.example, currentWord.word)}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the word"
                value={input}
                onChangeText={handleInputChange}
              />
              <Button title="Submit" onPress={handleSubmit} />
              {message && <Text style={styles.message}>{message}</Text>}
            </>
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sentence: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: "green",
  },
  loadingText: {
    fontSize: 18,
    color: "#000",
  },
});

export default ChallengeScreen;
