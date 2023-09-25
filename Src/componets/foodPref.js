// FavoriteFoods.js
// need to install Async and v4 AND uuidv4
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { v4 as uuidv4 } from 'uuid';

export default function FavoriteFoods() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState('');

  useEffect(() => {
    // Load favorite foods from AsyncStorage
    AsyncStorage.getItem('favoriteFoods').then((data) => {
      if (data) {
        setFoods(JSON.parse(data));
      }
    });
  }, []);

  const addFood = () => {
    if (newFood) {
      const foodItem = { id: uuidv4(), name: newFood };
      setFoods([...foods, foodItem]);
      AsyncStorage.setItem('favoriteFoods', JSON.stringify([...foods, foodItem]));
      setNewFood('');
    }
  };

  const removeFood = (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
    AsyncStorage.setItem('favoriteFoods', JSON.stringify(updatedFoods));
  };

  return (
    <View>
      <Text>Favorite Foods</Text>
      <TextInput
        placeholder="Add a favorite food"
        value={newFood}
        onChangeText={(text) => setNewFood(text)}
      />
      <Button title="Add" onPress={addFood} />
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => removeFood(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
