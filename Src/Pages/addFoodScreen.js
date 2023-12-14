  import React, { useState } from 'react';
  import { Text, View, Image, FlatList, TouchableOpacity, StyleSheet, Button, TextInput, Alert, ScrollView,KeyboardAvoidingView, Platform  } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { TextInputMask } from 'react-native-masked-text';
  import * as ImagePicker from 'expo-image-picker';
  import { useCurrentUser } from '../componets/tab';
  import { uploadToFirebase,generateUniqueId,createNewPost } from '../componets/config';
  // import { Alert } from 'react-native-alert';

  export default function AddFoodScreen({ navigation }) {
    const currentUser = useCurrentUser(); // Replace with your actual user check
    const tempImage = require("../../assets/imageplaceholder.png");
    const uploadImagePlaceHolder = require("../../assets/uploadImagePlaceHolder.png");
    const [postName, setPostName] = useState('');
    const [imageSource, setImageSource] = useState(uploadImagePlaceHolder);
    const [cookTimeValue, setCookTimeValue] = useState(0);
    const [prepTimeValue, setPrepTimeValue] = useState(0);
    const [caloriePerServing, setCaloriePerServing] = useState(0);
    const [servingSize, setServingSize] = useState('');
    const [totalServing,setTotalServings] = useState(0)
    const [description, setDescription] = useState('');
    const [directions, setDirections] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [ingredientList, setIngredientList] = useState([]);
    
    
    const  resetRecipieConst = ()=>{
      setPostName('');
    setImageSource(uploadImagePlaceHolder);
    setCookTimeValue(0);
    setPrepTimeValue(0);
    setCaloriePerServing(0);
    setServingSize('');
    setTotalServings(0);
    setDescription('');
    setDirections('');
    setIngredient('');
    setAmount('');
    setIngredientList([]);

    }
    const handleCookInputChange = (text) => {
      const numericText = text.replace(/[^0-9]/g, '');
      const truncatedText = numericText.slice(0, 4);
      setCookTimeValue(truncatedText);
    };

    const handlePrepInputChange = (text) => {
      const numericText = text.replace(/[^0-9]/g, '');
      const truncatedText = numericText.slice(0, 4);
      setPrepTimeValue(truncatedText);
    };

    const addIngredient = () => {
      if (ingredient && amount) {
          const index = Object.keys(ingredientList).length;
          const newIngredient = { name: ingredient, amount };
          setIngredientList({ ...ingredientList, [index]: newIngredient });
          setIngredient('');
          setAmount('');
        }
      console.log(ingredientList);
    };

    const removeIngredient = (index) => {
      // Convert the index from string to number
      const numericIndex = parseInt(index, 10);
    
      // Create a copy of the current ingredient list
      const updatedList = { ...ingredientList };
    
      // Delete the specified index from the copy
      delete updatedList[numericIndex];
    
      // Update the indices of the remaining items
      Object.keys(updatedList).forEach((key) => {
        const numericKey = parseInt(key, 10);
        if (numericKey > numericIndex) {
          // Decrement the index for items after the deleted item
          const updatedNumericKey = numericKey - 1;
          updatedList[updatedNumericKey] = updatedList[key];
          delete updatedList[key];
        }
      });
    
      // Set the updated ingredient list in the state
      setIngredientList(updatedList);
    };
    
    const uploadRecipe = async () => {
      Alert.alert('Confirm', 'Are you sure you want to submit this recipe?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Recipe submission canceled!'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              console.log('begin');
    
              const newPostID = generateUniqueId();
              
              const uploadResp = await uploadToFirebase(imageSource.uri, 'recipeImages/' + newPostID + '.jpg', (v) => console.log(v + ' : ' + imageSource));
              console.log('success:' + uploadResp);
              createNewPost(postName, cookTimeValue, prepTimeValue, description, directions, ingredientList, currentUser.uid, newPostID, caloriePerServing, servingSize, totalServing);
              resetRecipieConst();
    
              // Show success alert
              Alert.alert('Success', 'Recipe submitted successfully!');
            } catch (error) {
              // Handle any errors here
              console.error('Error:', error);
            }
          },
        },
      ]);
    };

    const selectImage = async () => {
      try {
        const camResponse = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!camResponse.canceled) {
          const { uri } = camResponse.assets[0];
          setImageSource({ uri });
        }
      } catch (e) {
        Alert.alert("Error Uploading Image " + e.message);
      }
    };

    return (
      <KeyboardAvoidingView
        style={styles.container}
      >
      <ScrollView style={styles.container}>
        {currentUser == null ? (
          <View>
            <Text style={{ fontSize: 20, padding: 15 }}>Please log in to access your profile</Text>
            <Button title='Click here to go to your profile' onPress={() => navigation.navigate('Login')} />
          </View>
        ) : (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={selectImage} style={{ backgroundColor: "grey" }}>
                  <Image source={imageSource} style={{ width: '100%', height: 150 }} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <TextInput
                  placeholder="Title"
                  value={postName}
                  onChangeText={(postName) => setPostName(postName)}
                  style={styles.input}
                />
                <View style={{ flexDirection: 'row', paddingBottom: 5, paddingTop: 5 }}>
                  <Text style={{ paddingTop: 10 }}>Prep time in minutes </Text>
                  <TextInput
                    style={styles.numInput}
                    value={prepTimeValue}
                    onChangeText={handlePrepInputChange}
                    placeholder="0"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10 }}>Cook time in minutes </Text>
                  <TextInput
                    style={styles.numInput}
                    value={cookTimeValue}
                    onChangeText={handleCookInputChange}
                    placeholder="0"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
                
              
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10 }}>calorie Per Serving </Text>
                  <TextInput
                    style={styles.numInput}
                    value={caloriePerServing}
                    onChangeText={setCaloriePerServing}
                    placeholder="0"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10 }}>serving size             </Text>
                  <TextInput
                    style={styles.numInput}
                    value={servingSize}
                    onChangeText={setServingSize}
                    placeholder="serving size"
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ paddingTop: 10 }}>total servingss        </Text>
                  <TextInput
                    style={styles.numInput}
                    value={totalServing}
                    onChangeText={setTotalServings}
                    placeholder="0"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
            <TextInput
              style={styles.longInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
            />
            <TextInput
              style={styles.longInput}
              value={directions}
              onChangeText={setDirections}
              placeholder="Directions"
              multiline={true}
              numberOfLines={4}
            />
            <View>
            <Text>Ingredients:</Text>
              <View style={{ flexDirection: 'row' }}>
                
                <TextInput
                  placeholder="Name"
                  value={ingredient}
                  onChangeText={(ingredient) => setIngredient(ingredient)}
                  style={[styles.input,{flex:1}]}
                />
                <TextInput
                  placeholder="Amount"
                  value={amount}
                  onChangeText={(amount) => setAmount(amount)}
                  style={[styles.input,{flex:1}]}
                />
                <Button title='Add' onPress={addIngredient} />
              </View>
              <View>
      {Object.keys(ingredientList).map((index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, overflow: 'hidden', }}>
        <ScrollView horizontal>
          <Text>{`${index}{name: ${ingredientList[index].name}, amount: ${ingredientList[index].amount}}`}</Text>
        </ScrollView>
        <TouchableOpacity onPress={() => removeIngredient(index)} style={{ marginLeft: 10 }}>
          <Text style={{ color: 'red' }}>Remove</Text>
        </TouchableOpacity>
      </View>
                  
                ))}
                <Button title='PUBLISH RECIPIE' onPress={uploadRecipe}></Button>
                <View style = {{height:100, width:100}}></View>
              </View>
              <Button title='PUBLISH RECIPIE' onPress={uploadRecipe}></Button>
            </View>
          </View>
        )}
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    input: {
      padding: 8,
      backgroundColor: 'white',
      borderRadius: 0,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    numInput: {
      padding: 8,
      backgroundColor: 'white',
      borderRadius: 0,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      height: 40,
      width: '80%',
    },
    longInput: {
      padding: 8,
      backgroundColor: 'white',
      borderRadius: 0,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      height: 120,
      paddingLeft: 10,
      marginTop: 10,
    },
  });
