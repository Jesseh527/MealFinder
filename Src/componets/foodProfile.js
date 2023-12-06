import React, { useState } from 'react';
import { Text, View,Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputBar from '../componets/textInputBar';
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
    return (  
      <View >
        <Text>food profile!{post.title}</Text>
       
        
       
      </View>
    );
  }