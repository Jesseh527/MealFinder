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

      </View>):( <View style={styles.container}>
      <View style={styles.header}>
      <ProfilePicture  
          style={styles.profileImage} // Set the size of the profile picture
        />
        <Text style={styles.username}>{currentUser.uid}</Text>
      </View>
      <View style={styles.bio}>
        <Text style={styles.bioText}>Your bio goes here</Text>
      </View>
      <View style={styles.stats}>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>100</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>200k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>300</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View> 
      <View style={styles.postsContainer}>
        <View style={[styles.post, {backgroundColor: "blue"}]}>
          {/* Your post content goes here */}
        </View>
        <View style={styles.post}>
          {/* Your post content goes here */}
        </View>
        <View style={styles.post}>
          {/* Your post content goes here */}
        </View>
        {/* Add more post boxes as needed */}
      </View>
    </View>) }
      

    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  username: {
    fontSize: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: 'gray',
  },
  bio: {
    marginTop: 20,
  },
  bioText: {
    fontSize: 16,
  },  
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
    post: {
    width: '32%',
    aspectRatio: 1,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
});

export default ProfieScreen;
