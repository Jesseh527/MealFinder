import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity>
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
