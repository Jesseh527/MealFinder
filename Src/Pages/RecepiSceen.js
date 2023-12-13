  // RecipiScreen.js
  import React, { useState, useEffect } from 'react';
  import { Text, View, FlatList } from 'react-native';
  import TextInputBar from '../componets/textInputBar';
  import SearchPostBoxes from '../componets/searchPostBoxes';
  import { getRecipInfo } from '../componets/config';

  export default function RecipeScreen({ navigation }) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    // console.log('b');
    // console.log(ingredients);

    //   console.log("YES");
    // console.log(recipe.ingredients);
    // console.log(recipeIngredients);
    // console.log(recipeIngredients[0].name);

    // const handleSearch = async (query, ingredients) => {
    //   console.clear();
    //   try {
    //     const recipes = await getRecipInfo();
    //     console.log('Search Query:', query);
    //     console.log('Selected Ingredients:', ingredients);
    
    //     let filteredRecipes;
    
    //     if (query.trim() === '' && ingredients.length === 0) {
    //       // If both query and ingredients are empty, show all recipes
    //       filteredRecipes = Object.values(recipes);
    //     } else {
    //       // Filter recipes based on the search query and selected ingredients
    //       filteredRecipes = Object.values(recipes).filter((recipe) => {
    //         const titleMatch = recipe.title?.toLowerCase().includes(query.toLowerCase()) || '';
    //         const descriptionMatch = recipe.description?.toLowerCase().includes(query.toLowerCase()) || '';
    //         if (ingredients.length > 0) {
    //           // Check if selectedIngredients is not empty before accessing its first element
    //           const firstSelectedIngredient = ingredients[0]?.trim().toLowerCase();
    //           console.log(ingredients);
    //           console.log(firstSelectedIngredient);
    //           if (firstSelectedIngredient) {
    //             const recipeIngredients = Object.values(recipe.ingredients || {});
    //             const ingredientNames = recipeIngredients.map((ingredient) => ingredient.name.trim().toLowerCase());
    
    //             console.log('First Selected Ingredient:', firstSelectedIngredient);
    //             console.log('Recipe Ingredients:', recipeIngredients);
    //             console.log('Ingredient Names:', ingredientNames);
    
    //             const ingredientsIncluded = ingredientNames.includes(firstSelectedIngredient);
    
    //             console.log('Ingredients Included:', ingredientsIncluded);
    
    //             return (titleMatch || descriptionMatch) && ingredientsIncluded;
    //           }
    //         }
    
    //         return titleMatch || descriptionMatch;
    //       });
    //     }
    const handleSearch = async (query, ingredients) => {
      console.clear();
      try {
        const recipes = await getRecipInfo();
        console.log('Search Query:', query);
        console.log('Selected Ingredients:', ingredients);
    
        let filteredRecipes;
    
        if (query.trim() === '' && ingredients.length === 0) {
          // If both query and ingredients are empty, show all recipes
          filteredRecipes = Object.values(recipes);
        } else {
          // Filter recipes based on the search query and selected ingredients
          filteredRecipes = Object.values(recipes).filter((recipe) => {
            const titleMatch = recipe.title?.toLowerCase().includes(query.toLowerCase()) || '';
            const descriptionMatch = recipe.description?.toLowerCase().includes(query.toLowerCase()) || '';
    
            if (ingredients.length > 0) {
              const recipeIngredients = Object.values(recipe.ingredients || {});
              const ingredientNames = recipeIngredients.map((ingredient) => ingredient.name.trim().toLowerCase());
    
              console.log('Recipe Ingredients:', recipeIngredients);
              console.log('Ingredient Names:', ingredientNames);
              console.log(ingredients.some((selectedIngredient) => {
                console.log(`Checking selected ingredient: ${selectedIngredient}`);
                // Rest of your logic
              }));
              const ingredientsIncluded = ingredients.some((selectedIngredient) => {
                const selected = selectedIngredient.trim().toLowerCase();
                console.log('Selected:', selected);
              
                const ingredientIncluded = ingredientNames.some((ingredientName) => {
                  const recipe = ingredientName;
                  const match = recipe.toLowerCase().includes(selected);

                  console.log(`5Recipe Ingredient: ${recipe}, Selected Ingredient: ${selected}, Match: ${match}`);
                  return match;
                });
                
                console.log(`Selected Ingredient: ${selectedIngredient}, Ingredient Included: ${ingredientIncluded}`);
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
      handleSearch(searchQuery, selectedIngredients);
    }, [searchQuery, selectedIngredients]);

    const keyExtractor = (item) => item?.recipe_ID || String(Math.random());

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <TextInputBar onSearch={handleSearch} />
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
  }