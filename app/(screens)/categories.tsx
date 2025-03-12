import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Chip } from "react-native-paper";
import { globalStyles } from "./style";

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

  const handleToggleChip = (label: string) => {
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(label)
        ? prevSelectedChips.filter((chip) => chip !== label)
        : [...prevSelectedChips, label]
    );
  };

  return (
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
    // borderColor: "lightgrey",
    // borderWidth: 0.5,
  },
  chipSelected: {
    margin: 6,
    borderRadius: 20,
    backgroundColor: "#EDBFD6",
    // borderColor: "black",
    // borderWidth: 0.5,
  },
  chipText: {
    fontSize: 18,
    color: "#000",
  },
  emoji: {
    fontSize: 24,
  },
});
