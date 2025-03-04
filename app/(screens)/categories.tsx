import { Text, View, StyleSheet } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categories</Text>
      {/* Add tag selection for categories here */}
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