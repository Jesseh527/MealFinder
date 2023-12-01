import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button, Touchable, TouchableOpacity,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // If you're using Expo

const TextInputBar = ({ onSearch }) => {
  const [text, setText] = useState('');

  const handleSearch = () => {
    if (text.trim() === '') {
      // Optionally handle empty search query
      return;
    }
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style = {{flexDirection: 'column'}}>
        <View style = {{flexDirection:'row'}}>
          <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(text) => setText(text)}
          value={text}
          onSubmitEditing={handleSearch}
          
        />
        
          <TouchableOpacity style ={{flex:0}}><Ionicons name="search" size={24} color="black" onPress={handleSearch} /></TouchableOpacity>

        </View>
      
        <View style = {{flexDirection:'row'}}>
          <TouchableOpacity><Text> Add ingreedent </Text></TouchableOpacity>
          <TouchableOpacity><Text> filters <Ionicons name="filter-outline" size={16} color="black"  /></Text></TouchableOpacity>

        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor:'white',
    borderRadius: 200,
  },
});

export default TextInputBar;