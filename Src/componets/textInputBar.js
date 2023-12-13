//textInputBar.js
import React, { useState,useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IngredientSelection from './ingredientSelection'; // Assuming the correct import path
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextInputBar = ({ onSearch, onClear }) => {
  const [text, setText] = useState('');
  const [showAddIngredientsModal, setShowAddIngredientsModal] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSearch = () => {
    if (text.trim() === '') {
      // Handle an empty search query, e.g., return all results
      if (onSearch) {
        onSearch('', selectedIngredients);
      }
      return;
    }
    // Pass the search query and selected ingredients to the parent component
    if (onSearch) {
      onSearch(text, selectedIngredients);
    }
  };

  const handleClear = () => {
    // Clear the search text and reset the search results
    setText('');
    if (onSearch) {
      onSearch('', selectedIngredients, onClear);
    }
  };

  const handleAddIngredient = () => {
    // Open the modal to add ingredients
    setShowAddIngredientsModal(true);
  };

  const handleIngredientSelect = (ingredient) => {
    // Update the selectedIngredients state by adding the selected ingredient
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    // Call the onSearch callback with the current search query and updated ingredients
    if (onSearch) {
      onSearch(text, [...selectedIngredients, ingredient]);
    }
  };
  
  const saveIngredients = async (ingredients) => {
    try {
      await AsyncStorage.setItem('selectedIngredients', JSON.stringify(ingredients));
    } catch (error) {
      console.error('Error saving ingredients:', error.message);
    }
  };
  const handleModalClose = () => {
    // Close the modal
    setShowAddIngredientsModal(false);
  };
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const storedIngredients = await AsyncStorage.getItem('selectedIngredients');
        if (storedIngredients !== null) {
          setSelectedIngredients(JSON.parse(storedIngredients));
        }
      } catch (error) {
        console.error('Error loading ingredients:', error.message);
      }
    };

    loadIngredients();
  }, []); // Empty dependency array to run only once on mount

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(text) => setText(text)}
            value={text}
            onSubmitEditing={handleSearch}
          />

          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>

          {text.trim() !== '' && ( // Render the clear button only when there's text in the search bar
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity onPress={handleAddIngredient}>
            <Text> Add ingredient </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              {' '}
              filters <Ionicons name="filter-outline" size={16} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Ingredients Modal */}
      <Modal visible={showAddIngredientsModal} animationType="slide">
        {/* Use the IngredientSelection component */}
        <IngredientSelection onSelect={handleIngredientSelect} onClose={handleModalClose} />

      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  inputContainer: {
    width: '100%', // Set width to 100% to take full width
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 200,
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.3, // for iOS
    shadowRadius: 3, // for iOS
  },
});

export default TextInputBar;
