import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

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
    <View style={styles.container}>
      <View style={styles.frame}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#7ACDA8",
    paddingTop: 100,
  },
  frame: {
    backgroundColor: "#C2EFF5",
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
