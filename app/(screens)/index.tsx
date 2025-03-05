import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebaseConfig.js'

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

const Index = () => {
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Link href="/word-of-day" asChild>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
            <View style={styles.buttonContent}>
              <View style={styles.textContainer}>
                <Text style={styles.extraText}>Word of the day</Text>
                <Text style={styles.text}>Dinosaur</Text>
              </View>
            </View>
        </TouchableOpacity>
      </Link>
      <Link href="/categories" asChild>
        <TouchableOpacity style={styles.button} onPress={() => {fetchData}}>
            <View style={styles.buttonContent}>
              <Text style={styles.icon}>📚</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Categories</Text>
              </View>
            </View>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#7ACDA8',
  },
  button: {
    backgroundColor: '#C2EFF5',
    borderRadius: 10,
    width: '80%',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    },
  icon: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center'
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',

  },
  extraText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Arial',
    fontStyle: 'italic',
    fontSize: 16,
    },
});

export default Index;
