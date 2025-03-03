import { Text, View, StyleSheet } from "react-native";
import s from "./styles";

export default function WordOfDay() {
  return (
    <View style={s.defaultScreen}>
      <Text style={styles.text}>Word of the Day</Text>
      {/* Add more details about the word here */}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#000',
  },
});