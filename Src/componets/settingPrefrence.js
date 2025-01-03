// import React, {useState} from 'react';
// import { Text, View,Image, Switch, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// // may pass arguments vvvv
// export default function SettingsPrefrence() {
//     <View>

//     </View>

// }
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

 export default function SettingsPrefrence(){
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputText.trim() !== '') {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  return (
    <View>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter an item..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="+" onPress={addItem} style={styles.input} />
      
      
    </View>
    <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text  style={styles.item}>{item}</Text>}
        horizontal ={true}
        contentContainerStyle={styles.listContent}      
        />
          {/* <FlatList
    horizontal={true}
    data={items}
    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
    keyExtractor={(item) => item.id}
    // extraData={selectedId}
  /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    padding: 16,
    flexDirection:'row',
    flexWrap: 'wrap'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    lexWrap: 'wrap',
    
paddingLeft:10      
  },
  listContent: {
    paddingHorizontal: 10, // Add horizontal padding to create space between items
  },
});

