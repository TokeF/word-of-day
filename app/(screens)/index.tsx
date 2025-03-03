import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import s from "../styles";

export default function Index() {
  return (
    <View style={s.defaultScreen}>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Link href="/(screens)/word-of-day" style={styles.link}>
          <View style={styles.buttonContent}>
            <Text style={styles.icon}>📅</Text>
            <View style={styles.textContainer}>
              <Text style={styles.additionalText}>Word of the day</Text>
              <Text style={styles.buttonText}>Dinosaur</Text>
            </View>
          </View>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Link href="/(screens)/categories" style={styles.link}>
          <View style={styles.buttonContent}>
            <Text style={styles.icon}>📚</Text>
            <Text style={styles.buttonText}>Categories</Text>
          </View>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f4511e',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  icon: {
    flex: 1,
    fontSize: 40,
    textAlign: 'center',
  },
  textContainer: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    flex: 4,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    alignContent: "space-between"
  },
  additionalText: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    textDecorationLine: 'none',
    width: '100%',
    alignItems: 'center',
  },
});