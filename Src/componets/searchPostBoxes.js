// searchPostBoxes.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {ref as refS,uploadBytes,getDownloadURL, getStorage} from "firebase/storage";
import { TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const SearchPostBoxes = ({ post, navigation }) => {
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
    const reviewsCount = Object.keys(post.ratings || {}).length;
    setNumReviews(reviewsCount);
  }, [post.image, post.ratings]);
  return (
    <View style={styles.container}>
      <View style={styles.leftContainerView}>
        <Image source={imageUrl ? { uri: imageUrl } : tempImage} style={{ flex: 2, width: "90%", height: "90%" }} />
        <View style ={{flexDirection:'row', flex:0}}>
        <Text>{post.averageRating}/5.0</Text>
        <Text style ={{paddingLeft:5, color:'#B59410', fontWeight:"bold"}} >{numReviews}</Text>
        </View>
      </View>
      <View style={styles.rightContainerView}>
        <Text>{post.title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text> preptime:{post.preptime} </Text>
          <Text> cooktime:{post.cooktime} </Text>
        </View>
        <Text>{post.description}</Text>
      </View>
      <TouchableOpacity style ={{position: "absolute", bottom: 0, right: 0}} onPress={()=> navigation.navigate('Recipie-Profile-name',{post})}>
        <Text style={{  color: "#24A0ED" }}>more...</Text>
      </TouchableOpacity>
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

export default SearchPostBoxes;
