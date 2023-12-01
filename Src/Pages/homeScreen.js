import React, { useState } from 'react';
import { Text, View,Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputBar from '../componets/textInputBar';
export default function HomeScreen() {
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (query) => {
    // Perform your search logic here and update searchResults state
    // For now, we'll just update it with a mock result
    setSearchResults([{ id: 1, name: 'Result 1' }, { id: 2, name: 'Result 2' }]);
  }
    return (  
      <View >
        <Text>Home!</Text>
        <TextInputBar onSearch={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      </View>
    );
  }