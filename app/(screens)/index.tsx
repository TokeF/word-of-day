import { Link } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchWords } from "../store/wordSlice";
import WordDocument from "../models/WordDocument";

const Index = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words, loading, error } = useSelector(
    (state: RootState) => state.words
  );

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const todaysWord: WordDocument | undefined = words[0];

  return (
    <SafeAreaView style={styles.container}>
      <Link href="/word-of-day" asChild>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.extraText}>Word of the day</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text style={styles.text}>
                  {todaysWord ? todaysWord.word : "No word available"}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <Link href="/categories" asChild>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>📚 Categories</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#7ACDA8",
  },
  button: {
    backgroundColor: "#C2EFF5",
    borderRadius: 10,
    width: "80%",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flex: 1,
    fontSize: 30,
    textAlign: "center",
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
  },
  text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  extraText: {
    textAlign: "center",
    color: "black",
    fontFamily: "Arial",
    fontStyle: "italic",
    fontSize: 16,
  },
});

export default Index;
