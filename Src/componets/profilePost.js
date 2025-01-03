//profilePost.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ref as refS, getDownloadURL, getStorage } from 'firebase/storage';
import { getRecipInfo } from './config';

const ProfilePost = ({ postId, navigation }) => {
  // Placeholder image for testing
  const tempImage = require("../../assets/imageplaceholder.png");

  // State to store the image URL
  const [imageUrl, setImageUrl] = useState(null);

  // Function to navigate to the post details screen
  const navToPost = async (id) => {
    try {
      const recipes = await getRecipInfo(id);

      if (!recipes) {
        console.error('Recipe data is undefined or null');
        return;
      }

      const matchingRecipe = recipes[id];
      navigation.navigate('Recipie-Profile-name2', { post: matchingRecipe });
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  // Function to fetch and set the image URL
  const getPostImage = async (uri) => {
    try {
      const imageStorage = getStorage();
      const imgRef = refS(imageStorage, "recipeImages/" + uri + ".jpg");
      const url = await getDownloadURL(imgRef);
      setImageUrl(url);
    } catch (e) {
      console.error("Error downloading Post Image " + e.message);
    }
  };

  // Fetch the image URL when the component mounts
  useEffect(() => {
    getPostImage(postId);
  }, [postId]);

  return (
    <TouchableOpacity onPress={() => navToPost(postId)}>
      <View style={styles.container}>
        <Image source={imageUrl ? { uri: imageUrl } : tempImage} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    overflow: 'hidden',
    margin: 2, // Add margin to each item
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
export default ProfilePost;
