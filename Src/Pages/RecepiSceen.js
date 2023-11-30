//RecipiScreen.js
import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import TextInputBar from '../componets/textInputBar';
import SearchPostBoxes from '../componets/searchPostBoxes';
import { getRecipInfo } from '../componets/config';

export default function RecepiScreen() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    try {
      const recipes = await getRecipInfo();
      console.log(recipes)
      if (!recipes) {
        console.error('Recipe data is undefined or null');
        return;
      }
  
      let filteredRecipes;
  
      if (query.trim() === '') {
        // If the query is blank, show all recipes
        filteredRecipes = Object.values(recipes);
      } else {
        // Filter recipes based on the search query
        filteredRecipes = Object.values(recipes).filter(
          (recipe) =>
            (recipe.title?.toLowerCase()?.includes(query.toLowerCase()) || '') ||
            (recipe.description?.toLowerCase()?.includes(query.toLowerCase()) || '')
        );
      }
  
      // Update the state with the filtered results
      setSearchResults(filteredRecipes);
      console.log(filteredRecipes)
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  // const keyExtractor = (item, index) => item?.recipe_ID || String(index);
  const keyExtractor = (item) => item?.recipe_ID || String(Math.random());


  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <Text>Home!</Text>

      <TextInputBar onSearch={setSearchQuery} />
      {/* <SearchPostBoxes posts= {searchResults[0]}/> */}
      <View>
      <FlatList style ={{width:400}}//FIX change to have screen widht
          data={searchResults}
          renderItem={({ item }) => {
            console.log('LOG simi is bad', item);
            return <SearchPostBoxes post={item} />;
          }}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
}
