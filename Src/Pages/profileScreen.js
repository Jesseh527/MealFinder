// ProfieScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
import { useCurrentUser  } from "../componets/tab"
const ProfieScreen = ({ navigation }) => {
  const currentUser = useCurrentUser();
  return (
    <View style={styles.container}>
      {currentUser  == null ? (<View>

        <Text style ={{fontSize:20,padding:15}}>Please log in to acces your profile</Text>
        <Button title='click her to go to your profile' onPress={()=> navigation.navigate('Login')}/>

      </View>):(<View>
        <Text style={styles.heading}>Profile Screen</Text>
      
      <View style={styles.profileInfo}>
      <ProfilePicture
        
        size={150} // Set the size of the profile picture
      />
        <Text>Name: John Doe</Text>
        <Text>{currentUser.uid}</Text>
        <Text>Email: {currentUser.email}</Text>
        <Text>Phone: (123) 456-7890</Text>
      </View>
      </View>)}
      

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
