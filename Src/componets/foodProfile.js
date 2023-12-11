import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import { ref as refS, getDownloadURL, getStorage } from 'firebase/storage';
import { getUserProfile } from './config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCurrentUser  } from "../componets/tab"
import { updateUserRating, updatePostRating,db } from './config';
import {getDatabase,ref as refD, onValue,set,get,update} from "firebase/database";


export default function FoodProfile({ route,navigation }) {
  const { post } = route.params;
  const tempImage = require('../../assets/imageplaceholder.png');
  const [imageUrl, setImageUrl] = useState(null);
  const [numReviews, setNumReviews] = useState(0);
  const [authorOfPost, setAuthorOfPost] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const currentUser = useCurrentUser();
  const [postAverageRating, setPostAverageRating] = useState(0);


  const getPostImage = async (uri) => {
    try {
      const imageStorage = getStorage();
      const imgRef = refS(imageStorage, 'recipeImages/' + uri);
      const url = await getDownloadURL(imgRef);

      setImageUrl(url);
    } catch (e) {
      console.error('Error downloading Post Image ' + e.message);
    }
  };
  const getUserRating = () =>{
    if(currentUser == null){
      return 0
    }
    const userId = currentUser.uid;
  const postRatings = post.ratings || {};

  // Check if the user has rated the post
  if (postRatings.hasOwnProperty(userId)) {
    return postRatings[userId];
  } else {
    return 0;
  }
    
  }
  useEffect(() => {
    getPostImage(post.image);
    const reviewsCount = Object.keys(post.ratings || {}).length;
    setNumReviews(reviewsCount);
    const postAuthor = getUserProfile(post.author);
    setAuthorOfPost(postAuthor);
    setPostAverageRating(post.averageRating || 0);
   
    const userRating = getUserRating(); 
    setUserRating(userRating);
    
  }, [post.image, post.ratings]);

  const renderIngredients = () => {
    const ingredientsList = post.ingredients || {};
    return Object.keys(ingredientsList).map((key) => {
      const ingredient = ingredientsList[key];
      return (
        <View key={key}>
          <Text>{`${ingredient.amount} ${ingredient.name}`}</Text>
        </View>
      );
    });
  };
  const handleStarPress = async (rating) => {
    if (!currentUser) {
      // If the user is not logged in, show an alert
      Alert.alert(
        'Login Required',
        'You need to log in to rate this post. Do you want to log in?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Log In',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]
      );
    } else {
      try {
        // Update the user's rating in the database
        console.log('1')// for debuuging purposes
        // console.log(currentUser.uid);
        // console.log(post.postID);
        // console.log(post.key);
        await updateUserRating(currentUser.uid, post.postID, rating);
        console.log('2')
        // Update the post's average rating in the database
        await updatePostRating(post.postID);
        console.log('3')
        // Update the local state with the new user rating
        const updatedPostRef = refD(db, `recipe/${post.postID}`);
        const updatedPostSnapshot = await get(updatedPostRef);
        const updatedPostData = updatedPostSnapshot.val();
  
        // Update the local state with the new user rating and post data
        setUserRating(rating);
        setNumReviews(Object.keys(updatedPostData.ratings || {}).length);
        setPostAverageRating(updatedPostData.averageRating);
        // You can update other relevant state variables as needed
        // ...
  
        // Optionally, you can fetch the updated post data and update the state
        // with the new average rating and number of reviews
        // ...

      } catch (error) {
        console.error('Error updating ratings:', error.message);
        // Handle the error as needed
      }
    }
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Ionicons name={i <= userRating ? 'star' : 'star-outline'} size={30} color="#FFD700" />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <ScrollView>
      <View>
        
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text>Cooktime: {post.cooktime}</Text>
            <Text>Preptime: {post.preptime}</Text>
            <Text>Serving Size: {post.servingSize}</Text>
            <Text>Total Serving: {post.totalServings}</Text>
            <Text>Calories per serving: {post.caloriePerServing}</Text>
            <Text></Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Image source={imageUrl ? { uri: imageUrl } : tempImage} style={{ flex: 2, width: 200, height: 100 }} />
            <Text>food profile!{post.title}</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('User-Profile-name',{authorOfPost})}>
              <Text>by: {authorOfPost._j ? authorOfPost._j.username : 'Loading...'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.headerText}>Rating:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>{renderStars()}</View>
            <Text style={{ marginLeft: 10 }}>{postAverageRating.toFixed(2)}/5</Text>
            <Text style={{ marginLeft: 10 }}>{numReviews} reviews</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style ={styles.headerText}>Description:</Text>
          <Text>{post.description}</Text>
        </View>
        <View style={styles.container}>
          <Text style ={styles.headerText}>Ingreedients:</Text>
          {renderIngredients()}
        </View>
        <View style={styles.container}>
          <Text style ={styles.headerText}>Directions:</Text>
          <Text>{post.directions}</Text>
        </View>
        
        <View style={{width:100,height:100}}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    // Remove fixed height
    // height: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 20,  // Adjust the font size as needed
    fontWeight: 'bold',
  },
});