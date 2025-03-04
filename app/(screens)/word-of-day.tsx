import { Text, View, StyleSheet } from "react-native";

export default function WordOfDay() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Word of the Day</Text>
      {/* Add more details about the word here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#7ACDA8',
  },
  text: {
    fontSize: 24,
    color: '#000',
  },
});