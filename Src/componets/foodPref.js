import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList,Image,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ItemList = ({ data, onRemoveItem }) => {
  return (
    <FlatList
      style = {{flexDirection:'row'}}
      numColumns={3}
      data={data}
      renderItem={({ item }) => (
        <View style= {{ flexDirection:'row', paddingRight:10} }>
          <Text>{item}</Text>
          
          <TouchableOpacity onPress={() => onRemoveItem(item)}>
            <Ionicons name='remove-circle-outline' size={25} style ={{height:25,width:25}}/>
          </TouchableOpacity>
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
    if (item.trim() !== '' && item.trim() ) {
      setList((prevList) => [...prevList, item]);
      setText('');
      
    }
  };

  const removeItem = (item, list, setList) => {
    setList((prevList) => prevList.filter((i) => i !== item));
  };

  return (
    <View>
    <View style = {{flexDirection: 'row'}}>
      <TextInput
        placeholder="Enter an item to add to a list"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      {/* <TouchableOpacity>
        <Ionicons name='heart-outline' size={25} style ={{height:25,width:25}}/>
        onPress={() => addItem(text, favoriteFoods, setFavoriteFoods)}
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => addItem(text, favoriteFoods, setFavoriteFoods)}>
      <Ionicons name='heart-outline'  size={25} style ={{height:25,width:25}}/>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => addItem(text, hatedFoods, setHatedFoods)}>
  <Ionicons name='heart-dislike-outline' size={25} style ={{height:25,width:25}}/>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => addItem(text, allergies, setAllergies)}>
  <Ionicons name='warning-outline' size={25} style ={{height:25,width:25}}/>
  </TouchableOpacity>
      </View>

      <View>
      <Text>Favorite Foods:</Text>
      <ItemList data={favoriteFoods} onRemoveItem={(item) => removeItem(item, favoriteFoods, setFavoriteFoods)} />
      <Text>Hated Foods:</Text>
      <ItemList data={hatedFoods} onRemoveItem={(item) => removeItem(item, hatedFoods, setHatedFoods)} />
      <Text>Allergies:</Text>
      <ItemList data={allergies} onRemoveItem={(item) => removeItem(item, allergies, setAllergies)} />
    </View>
    </View>
  );
};

export default ItemManagement;
