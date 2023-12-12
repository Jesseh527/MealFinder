//ingredientSelection.js
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IngredientSelection = ({ onSelect, onClose }) => {
  const [ingredients, setIngredients] = useState([]);

  const [newIngredient, setNewIngredient] = useState('');

  const handleIngredientSelect = (ingredient) => {
    // Call the onSelect callback with the selected ingredient
    onSelect(ingredient);
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      // Add the new ingredient to the list
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      // Clear the input field
      setNewIngredient('');
    }
  };

  const handleDeleteIngredient = (ingredient) => {
    // Remove the specified ingredient from the list
    setIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalHeading}>Select Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientItemContainer}>
            <TouchableOpacity onPress={() => handleIngredientSelect(item)}>
              <Text style={styles.ingredientItem}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteIngredient(item)} style={styles.deleteButton}>
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new ingredient..."
          onChangeText={(text) => setNewIngredient(text)}
          value={newIngredient}
        />
        <TouchableOpacity onPress={handleAddIngredient} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};




const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },ingredientItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteButton: {},

});

export default IngredientSelection;
