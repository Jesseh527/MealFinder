import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const addMeal = () => {};
  const showAlert = () => {
    Alert.alert(
      'Feature Not Ready',
      'The "Search by Photo" feature is not yet available. Please check back later.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipe')}>
          <Ionicons name="search" color="grey" size={24} />
          <Text style={styles.buttonText}>Search for meals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRed} onPress={() => navigation.navigate('Add-Recipe')}>
          <Ionicons name="add" color="grey" size={24} />
          <Text style={styles.buttonText}>Add meals</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showAlert}>
          <Ionicons name="images" color="grey" size={24} />
          <Text style={styles.buttonText}>Search by photos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'white',
    height: 120,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonRed: {
    backgroundColor: 'white',
    height: 120,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'black', // Adjust text color to your preference
    marginTop: 5,
  },
});
