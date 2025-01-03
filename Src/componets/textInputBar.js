// TextInputBar.js

import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IngredientSelection from './ingredientSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextInputBar = ({
  onSearch,
  onClear,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const [text, setText] = useState('');
  const [showAddIngredientsModal, setShowAddIngredientsModal] = useState(false);

  const handleSearch = () => {
    if (text.trim() === '') {
      if (onSearch) {
        onSearch('', selectedIngredients);
      }
      return;
    }
    if (onSearch) {
      onSearch(text, selectedIngredients);
    }
  };

  const handleClear = () => {
    setText('');
    if (onSearch) {
      onSearch('', selectedIngredients, onClear);
    }
  };

  const handleAddIngredient = () => {
    setShowAddIngredientsModal(true);
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
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
        <View style={{width:1,height:15}} ></View>
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

          {text.trim() !== '' && (
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

      <Modal visible={showAddIngredientsModal} animationType="slide">
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
    width: '100%',
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    ...Platform.select({
      ios: {
        height: 40, // Specify a fixed height on iOS to prevent issues
      },
    }),
  },
});

export default TextInputBar;
