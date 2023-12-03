import React, { useState } from 'react';
import { Text, View,Image, FlatList, TouchableOpacity,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputBar from '../componets/textInputBar';
export default function HomeScreen({navigation}) {
    const addMeal = () =>{
      
    }
    return (  
      <View >
        <Text>Home!</Text>
       <View style ={{flexDirection:'row', justifyContent:'space-evenly'}}>
        <TouchableOpacity style = {{backgroundColor:'blue', height:100,width:100}}>
          <Text>Search for meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{backgroundColor:'red', height:100,width:100}} onPress={()=> navigation.navigate('Add-Recipe')}>
          <Text>add meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{backgroundColor:'green', height:100,width:100}} >
          <Text>search byt photos</Text>
        </TouchableOpacity>
        
       </View>
      </View>
    );
  }