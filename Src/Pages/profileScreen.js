// ProfieScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet,FlatList } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
import { useCurrentUser  } from "../componets/tab"
import { getUserProfile,getUserPosts } from '../componets/config';
const ProfieScreen = ({ navigation }) => {  
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const currentUser = useCurrentUser();
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser !== null) {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
        console.log(profile)
        const posts = await getUserPosts(currentUser.uid);//otherUserProfile
        setUserPosts(posts);
        console.log(posts);
      }
    };

    fetchUserProfile();
  }, [currentUser]);
  return (
    <View style={styles.container}>
      {currentUser  == null ? (<View>

        <Text style ={{fontSize:20,padding:15}}>Please log in to acces your profile</Text>
        <Button title='click her to go to your profile' onPress={()=> navigation.navigate('Login')}/>

      </View>):( <View style={styles.container}>
      <View style={styles.header}>
      <ProfilePicture  profileID = {currentUser.uid}
          style={styles.profileImage} // Set the size of the profile picture
        />
        <Text style={styles.username}>
              {userProfile ? userProfile.username : 'Loading...'}
            </Text>
      </View>
      <View style={styles.bio}>
        <Text style={styles.bioText}>{userProfile ? userProfile.profile.bio : 'Loading...'}</Text>{/* impliment somthing to grab bio from RTDB, update or delete all users first  */ }
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
      <FlatList
  data={userPosts}
  keyExtractor={(item) => item.postID}
  renderItem={({ item }) => {
    // Get an array of postIDs from the item object
    const postIDs = Object.keys(item);

    // Find the index of the current postID
    const currentIndex = postIDs.indexOf(item.postID);

    // Get the next postID if it exists
    const nextPostID = postIDs[currentIndex + 1];

    // Get the next child based on the next postID
    const nextChild = nextPostID ? item[nextPostID] : null;

    // Access postID from the next child
    const nextPostIDValue = nextChild ? nextChild.postID : null;

    return (
      <View style={styles.post}>
        <Text>Hello {item.postID}</Text>
        <Text>Next Post ID: {nextPostIDValue}</Text>
        {/* Your post content goes here */}
      </View>
    );
  }}
  numColumns={3}
/>
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
