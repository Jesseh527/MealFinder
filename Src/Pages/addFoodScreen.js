import React, { useState } from 'react';
import { Text, View,Image, FlatList, TouchableOpacity,StyleSheet,Button,TextInput,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputBar from '../componets/textInputBar';
import { useCurrentUser  } from "../componets/tab";
import * as ImagePicker from 'expo-image-picker';


export default function AddFoodScreen({navigation}) {
    const currentUser = useCurrentUser();
    const tempImage = require("../../assets/imageplaceholder.png");
    const uploadImagePlaceHolder = require("../../assets/uploadImagePlaceHolder.png")
  const [postName, setPostName] = useState('');
  const [numReviews, setNumReviews] = useState();
  const [imageSource, setImageSource] = useState(uploadImagePlaceHolder);

    const addMeal = () =>{
      
    }
    const selectImage  = async () => {
     
        try{
        const camResponse = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(camResponse);
    
        if (!camResponse.canceled) {
          // setImageSource(camResponse.assets[0].uri);
          const {uri} = camResponse.assets[0];//grabs image elemets
          console.log(uri);
          console.log(uri.uri);
          setImageSource({uri});
        
        }
      } catch(e){
        Alert.alert("Error Uploading Image " + e.message);
      }
      };
    
    return (  
        <View style={styles.container}>
        {currentUser  == null ? (<View>
  
          <Text style ={{fontSize:20,padding:15}}>Please log in to acces your profile</Text>
          <Button title='click her to go to your profile' onPress={()=> navigation.navigate('Login')}/>
  
        </View>
        ):(  
        
        <View style ={{flexDirection:'row'}}>
            <View style ={{flex:1}}>
                <TouchableOpacity onPress={selectImage} style = {{backgroundColor:"grey"}}><Image source={imageSource} style ={{width:'100%',height: 100}} ></Image></TouchableOpacity>
            </View>   
            <View style ={{flex:1, flexDirection:'column'}}> 
                <TextInput
                    placeholder="Title"
                    value={postName}sad
                    onChangeText={(postName) => setPostName(postName)}
                    style={styles.input}
                    />
                <View style ={{flexDirection:'row'}}>
                    <Text>preptime in minutes </Text>
                    
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text>cooktime in minutes </Text>
                </View>
            </View>  
        </View>     ) }
        
  
      </View>
    );
  }
const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        marginBottom: 20,
    },
    profileInfo: {
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    username: {
        fontSize: 20,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 16,
        color: 'gray',
    },
    bio: {
        marginTop: 20,
    },
    bioText: {
        fontSize: 16,
    },  
    postsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
        post: {
        width: '32%',
        aspectRatio: 1,
        backgroundColor: 'lightgray',
        marginBottom: 10,
    },input: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 0,
        elevation: 5, // for Android
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 0, height: 2 }, // for iOS
        shadowOpacity: 0.3, // for iOS
        shadowRadius: 3, // for iOS
            
      },
});
