import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const ItemList = ({ data, onRemoveItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View>
          <Text>{item}</Text>
          <Button title="Remove" onPress={() => onRemoveItem(item)} />
        </View>
      )}
      keyExtractor={(item) => item.toString()}
    />
  );
};

const ItemManagement = () => {
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [hatedFoods, setHatedFoods] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [text, setText] = useState('');

  const addItem = (item, list, setList) => {
    if (item.trim() !== '') {
      setList((prevList) => [...prevList, item]);
      setText('');
    }
  };

  const removeItem = (item, list, setList) => {
    setList((prevList) => prevList.filter((i) => i !== item));
  };

  return (
    <View>
      <TextInput
        placeholder="Enter an item..."
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <Button
        title="Add to Favorite Foods"
        onPress={() => addItem(text, favoriteFoods, setFavoriteFoods)}
      />
      <Button
        title="Add to Hated Foods"
        onPress={() => addItem(text, hatedFoods, setHatedFoods)}
      />
      <Button
        title="Add to Allergies"
        onPress={() => addItem(text, allergies, setAllergies)}
      />
      <Text>Favorite Foods:</Text>
      <ItemList data={favoriteFoods} onRemoveItem={(item) => removeItem(item, favoriteFoods, setFavoriteFoods)} />
      <Text>Hated Foods:</Text>
      <ItemList data={hatedFoods} onRemoveItem={(item) => removeItem(item, hatedFoods, setHatedFoods)} />
      <Text>Allergies:</Text>
      <ItemList data={allergies} onRemoveItem={(item) => removeItem(item, allergies, setAllergies)} />
    </View>
  );
};

export default ItemManagement;
