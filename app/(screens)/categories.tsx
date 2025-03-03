import { Text, View, StyleSheet } from "react-native";
import s from "../styles";

export default function Categories() {
  return (
    <View style={s.defaultScreen}>
      <Text style={styles.text}>Categories</Text>
      {/* Add tag selection for categories here */}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#000',
  },
});