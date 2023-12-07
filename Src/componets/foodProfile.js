import React, { useState,useEffect } from 'react';
import { Text, View,Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputBar from '../componets/textInputBar';
import {ref as refS,uploadBytes,getDownloadURL, getStorage} from "firebase/storage";
import {getDatabase,ref as refD, onValue,set,get} from "firebase/database";

import { getUserFromID,getUserProfile } from './config';

/** title:title,
    author:userID,
    cooktime:cooktime,
    preptime:preptime,
    description:description,
    directions:directions,
    ingredients:ingredients,
    image:newPostID + ".jpg",
    averageRating:0,
    ratings:[],
    caloriePerServing:caloriePerServing,
    servingSize:servingSize,
    totalServings:servingSize*/
export default function  FoodProfile({route} ) {
  const { post } = route.params;
  const tempImage = require("../../assets/imageplaceholder.png");
  const [imageUrl, setImageUrl] = useState(null);
  const [numReviews, setNumReviews] = useState(0);
  const[authorOfPost, setAuthorOfPost] = useState([]);

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
    const postAuthor = getUserProfile(post.author);
    setAuthorOfPost(postAuthor);

  }, [post.image, post.ratings]);
  
    return (  
      <View >
        <Text>food profile!{post.title}</Text>
       <View style ={{flexDirection:'row'}}>
            <View style ={{flexDirection:"column"}}>
                <Text>Cooktime:            {post.cooktime}</Text>
                <Text>Preptime:            {post.preptime}</Text>
                <Text>Serving Size:        {post.servingSize}</Text>
                <Text>Total Serving:       {post.totalServings}</Text>
                <Text>Calories per serving:{post.caloriePerServing}</Text>
                <Text>Calories per serving:{numReviews}</Text>
                <Text></Text>
            </View>
            <View style ={{flexDirection:'column'}}>
                <Image source={imageUrl ? { uri: imageUrl } : tempImage} style={{ flex: 2, width: 200, height: 100}} />
                <Text>by: {post.author}</Text>
            </View>
            
        </View> 
        <Text>Calories per serving:{numReviews}</Text>
        <Text>Calories per serving:{authorOfPost._j  ? authorOfPost._j.username : 'Loading...' }</Text>
       
      </View>
    );
  } 