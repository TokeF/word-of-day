import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IWordDocument from "../models/WordDocument";
import { router, useRouter } from "expo-router";
import { globalStyles, pastelRed } from "./style";

const FavouritesScreen = () => {
  const [favorites, setFavorites] = useState<{ [id: string]: IWordDocument }>(
    {}
  );

  useEffect(() => {
    const fetchFavoritesFromStorage = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favoriteWords");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favoriteWords from storage:", error);
      }
    };

    fetchFavoritesFromStorage();
  }, []);

  const handlePress = (word: string, color: string) => {
    router.push({ pathname: "/word-of-day", params: { word, color } });
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handlePress(item, pastelRed)}>
      <View style={styles.item}>
        <Text style={styles.word}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={[globalStyles.frame, { backgroundColor: pastelRed }]}>
        <FlatList
          style={{ width: "100%" }}
          data={Object.keys(favorites)}
          renderItem={({ item }) => renderItem({ item })}
          keyExtractor={(item) => item}
          ListEmptyComponent={<Text>No favorite words.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  word: {
    fontSize: 18,
    color: "#E9EAE0",
  },
});

export default FavouritesScreen;
