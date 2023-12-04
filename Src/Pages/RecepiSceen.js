//RecipiScreen.js
import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import TextInputBar from '../componets/textInputBar';
import SearchPostBoxes from '../componets/searchPostBoxes';
import { getRecipInfo } from '../componets/config';
// ... (your imports)

export default function RecepiScreen() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    try {
      // ... (your existing search logic)
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const keyExtractor = (item) => item?.recipe_ID || String(Math.random());

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <TextInputBar onSearch={setSearchQuery} />
      <FlatList
        style={{ flex: 1 }} // Make sure FlatList takes up all available space
        data={searchResults}
        renderItem={({ item }) => {
          return <SearchPostBoxes post={item} />;
        }}
        keyExtractor={keyExtractor}
      />
      <View style ={{width:10,height:50}}></View>
    </View>
  );
}
