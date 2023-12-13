// RecipeScreen.js

import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import TextInputBar from '../componets/textInputBar';
import SearchPostBoxes from '../componets/searchPostBoxes';
import { getRecipInfo } from '../componets/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeScreen = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const isMounted = useRef(true);


  const loadIngredients = async () => {
    try {
      const storedIngredients = await AsyncStorage.getItem('selectedIngredients');
      if (storedIngredients !== null) {
        setSelectedIngredients(JSON.parse(storedIngredients));
      }
      // Pass the searchQuery and selectedIngredients to handleSearch
      handleSearch(searchQuery, selectedIngredients);
    } catch (error) {
      console.error('Error loading ingredients:', error.message);
    }
  };
  
  const handleSearch = async (query, ingredients) => {
    console.clear();
    try {
      const recipes = await getRecipInfo();
      if (!isMounted.current) {
        // Component is unmounted, do not proceed
        return;
      }
      console.log('Search Query:', query);
      console.log('Selected Ingredients:', ingredients);

      let filteredRecipes;

      if (query.trim() === '' && ingredients.length === 0) {
        // If both query and ingredients are empty, show all recipes
        filteredRecipes = Object.values(recipes);
      } else {
        // Filter recipes based on the search query and selected ingredients
        filteredRecipes = Object.values(recipes).filter((recipe) => {
          const titleMatch =
            recipe.title?.toLowerCase().includes(query.toLowerCase()) || '';
          const descriptionMatch =
            recipe.description?.toLowerCase().includes(query.toLowerCase()) || '';

          if (ingredients.length > 0) {
            const recipeIngredients = Object.values(recipe.ingredients || {});
            const ingredientNames = recipeIngredients.map((ingredient) =>
              ingredient.name.trim().toLowerCase()
            );

            console.log('Recipe Ingredients:', recipeIngredients);
            console.log('Ingredient Names:', ingredientNames);

            const ingredientsIncluded = ingredients.some((selectedIngredient) => {
              const selected = selectedIngredient.trim().toLowerCase();
              console.log('Selected:', selected);

              const ingredientIncluded = ingredientNames.some((ingredientName) => {
                const match = ingredientName.includes(selected);
                console.log(
                  `Recipe Ingredient: ${ingredientName}, Selected Ingredient: ${selected}, Match: ${match}`
                );
                return match;
              });

              console.log(
                `Selected Ingredient: ${selectedIngredient}, Ingredient Included: ${ingredientIncluded}`
              );
              return ingredientIncluded;
            });

            console.log('Ingredients Included:', ingredientsIncluded);

            return (titleMatch || descriptionMatch) && ingredientsIncluded;
          }
          return titleMatch || descriptionMatch;
        });
      }

      // Update the state with the filtered results
      setSearchResults(filteredRecipes);
    } catch (error) {
      console.error('Error handling search:', error.message);
    }
  };

  useEffect(() => {
    // Set the mounted flag to true when the component mounts
    isMounted.current = true;

    // Cleanup function to set the mounted flag to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // const storedIngredients =  AsyncStorage.getItem('selectedIngredients');
    // setSelectedIngredients(storedIngredients);

    handleSearch(searchQuery, selectedIngredients);
  }, [searchQuery, selectedIngredients]);

  const keyExtractor = (item) => item?.recipe_ID || String(Math.random());

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <TextInputBar
        onSearch={loadIngredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <FlatList
        style={{ flex: 1 }} // Make sure FlatList takes up all available space
        data={searchResults}
        renderItem={({ item }) => {
          return <SearchPostBoxes post={item} navigation={navigation} />;
        }}
        keyExtractor={keyExtractor}
      />
      <View style={{ width: 10, height: 50 }}></View>
    </View>
  );
};

export default RecipeScreen;
