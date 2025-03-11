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

const Index = () => {
  const dispatch: AppDispatch = useDispatch();
  const { todaysWord, loading } = useSelector(
    (state: RootState) => state.words
  );

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.buttonWrapper}>

      <Link href="/word-of-day" asChild>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
              <Text style={styles.extraText}>Word of the day</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Text style={styles.textDailyWord}>
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
            {/* 🎛️🔧🛠️ */}
              <Text style={styles.textButton}>🏆 Challenge</Text>  
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      <View style={styles.buttonRow}>
        <Link href="/categories" asChild>
          <TouchableOpacity style={styles.rowButton}>
            <View style={styles.buttonContent}>
              <View style={styles.textContainer}>
                <Text style={styles.textButton}>❤️ Favourites</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>   
        <View style={{flex:0.1}}></View>
        <Link href="/history" asChild>
          <TouchableOpacity style={styles.rowButton}>
            <View style={styles.buttonContent}>
              <View style={styles.textContainer}>
                <Text style={styles.textButton}>📚 History</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
      <Link href="/categories" asChild>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            <View style={styles.textContainer}>
            {/* 🎛️🔧🛠️ */}
              <Text style={styles.textButton}>🎨 Categories</Text>  
            </View>
          </View>
        </TouchableOpacity>
      </Link>
      </View>
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
  buttonWrapper: {
    flex: 1,
    width: '80%',
    flexDirection: 'column',
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#C2EFF5",
    borderRadius: 10,
    height: 70,
    marginBottom: 20,
    justifyContent: "center",
  },
  rowButton: {
    flex: 1,
    backgroundColor: "#C2EFF5",
    borderRadius: 10,
    height: 70
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
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
  textDailyWord: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold'
  },
  textButton: {
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
