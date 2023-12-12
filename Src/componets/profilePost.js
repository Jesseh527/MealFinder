// searchPostBoxes.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {ref as refS,uploadBytes,getDownloadURL, getStorage} from "firebase/storage";
import { TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const profilePost = ({ post, navigation }) => {
  const tempImage = require("../../assets/imageplaceholder.png");
  const [imageUrl, setImageUrl] = useState(null);
  const [numReviews, setNumReviews] = useState(0);

  // const navigation = useNavigation();

  const getPostImage = async (uri) => {
    try {
      const imageStorage = getStorage();
      const imgRef = refS(imageStorage, "recipeImages/" + uri);
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);
      
      
    } catch (e) {
      console.error("Error downloading Post Image " + e.message);
    }
  };

  useEffect(() => {
    getPostImage(post.image);
  }, [post.image]);
  return (
    <View style={styles.container}>
     <Image source={imageUrl}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    height: 150,
    // Add shadow properties
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.3, // for iOS
    shadowRadius: 3, // for iOS
  },
  input: {
    flex: 1,
    padding: 8,
  },
  imageView: {
    flexDirection: 'column',
  },
  leftContainerView: {
    flexDirection: 'column',
    flex: 1.5,
    padding: 5,
  },
  rightContainerView: {
    flexDirection: 'column',
    flex: 3,
  },
  
});

export default profilePost;
