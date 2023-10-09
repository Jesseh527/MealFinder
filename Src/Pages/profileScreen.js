// ProfieScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
const ProfieScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading}>Profile Screen</Text>
      
      <View style={styles.profileInfo}>
      <ProfilePicture
        
        size={150} // Set the size of the profile picture
      />
        <Text>Name: John Doe</Text>
        <Text>Email: johndoe@example.com</Text>
        <Text>Phone: (123) 456-7890</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
});

export default ProfieScreen;
