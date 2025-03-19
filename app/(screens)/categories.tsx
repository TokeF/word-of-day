import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import globalStyles from "./style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const chipData = [
  { title: "Science", icon: "🔬" },
  { title: "History", icon: "📚" },
  { title: "Math", icon: "🔢" },
  { title: "Youth", icon: "😎" },
  { title: "Curse Words", icon: "🔥" },
  // Add more chip data as needed
];

export default function Categories() {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  useEffect(() => {
    const fetchSelectedChips = async () => {
      try {
        const storedChips = await AsyncStorage.getItem("selectedCategories");
        if (storedChips) {
          setSelectedChips(JSON.parse(storedChips));
        }
      } catch (error) {
        console.error(
          "Failed to load selected categories from storage:",
          error
        );
      }
    };

    fetchSelectedChips();
  }, []);

  const handleToggleChip = async (label: string) => {
    const updatedChips = selectedChips.includes(label)
      ? selectedChips.filter((chip) => chip !== label)
      : [...selectedChips, label];
    setSelectedChips(updatedChips);
    try {
      await AsyncStorage.setItem(
        "selectedCategories",
        JSON.stringify(updatedChips)
      );
    } catch (error) {
      console.error("Failed to save selected categories to storage:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
        <View style={[globalStyles.frame]}>
          <Text style={styles.smallTitle}>Categories</Text>
          <View style={styles.chipContainer}>
            {chipData.map((chip) => (
              <Chip
                key={chip.title}
                selected={selectedChips.includes(chip.title)}
                onPress={() => handleToggleChip(chip.title)}
                style={[
                  styles.chip,
                  selectedChips.includes(chip.title) && styles.chipSelected,
                ]}
                showSelectedCheck={false}
                icon={() => <Text style={styles.emoji}>{chip.icon}</Text>}
                textStyle={styles.chipText}
              >
                {chip.title}
              </Chip>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  smallTitle: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#000",
    paddingBottom: 20,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  chip: {
    margin: 6,
    backgroundColor: "lightgrey",
    borderRadius: 20,
  },
  chipSelected: {
    margin: 6,
    borderRadius: 20,
    backgroundColor: "#EDBFD6",
  },
  chipText: {
    fontSize: 18,
    color: "#000",
  },
  emoji: {
    fontSize: 24,
  },
});
