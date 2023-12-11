import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { ref as refS, getDownloadURL, getStorage } from 'firebase/storage';
import { getUserProfile } from './config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FoodProfile({ route }) {
  const { post } = route.params;
  const tempImage = require('../../assets/imageplaceholder.png');
  const [imageUrl, setImageUrl] = useState(null);
  const [numReviews, setNumReviews] = useState(0);
  const [authorOfPost, setAuthorOfPost] = useState([]);
  const [userRating, setUserRating] = useState(0);

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

  useEffect(() => {
    getPostImage(post.image);
    const reviewsCount = Object.keys(post.ratings || {}).length;
    setNumReviews(reviewsCount);
    const postAuthor = getUserProfile(post.author);
    setAuthorOfPost(postAuthor);
    //match userid to post rating if it dosnt exsist add/update it 
    // const userRating = getUserRating(); // Implement this function
    // setUserRating(userRating);
    
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
  const handleStarPress = (rating) => {
    // Logic to update the rating in the database
    // You may need to use Firebase's database functions for this
    // For example: updateRating(postId, userId, rating);
    setUserRating(rating);
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
            <Text>by: {authorOfPost._j ? authorOfPost._j.username : 'Loading...'}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.headerText}>Rating:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>{renderStars()}</View>
            <Text style={{ marginLeft: 10 }}>{post.averageRating.toFixed(2)}/5</Text>
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