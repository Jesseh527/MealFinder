import React, {useState} from 'react';
import { Text, View,Image, Switch, StyleSheet,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsPrefrence from '../componets/settingPrefrence';
// import FavoriteFoods from '../componets/foodPref';
export default function SettingsScreen() {
  

  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark(previousState => !previousState);

  const [isLikes, setIsLikes] = useState(false);
  const toggleLikes = () => setIsLikes(previousState => !previousState);

  const [isReviews, setIsReviews] = useState(false);
  const toggleReviews = () => setIsReviews(previousState => !previousState);

  const [isNewPost, setIsNewPost] = useState(false);
  const toggleNewPost = () => setIsNewPost(previousState => !previousState);
  
    return (
      // <ScrollView style ={{flex:1}}>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft:30 }}>
        <Text>Settings!</Text>

        <View><Text style = {styles.mainSetting}>Accesibility</Text>
        <View style= {[styles.mainSetting,{paddingLeft:30, flexDirection:'row'}]}><Text style = {styles.subSettingText}>Dark mode</Text>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isDark ? 'blue' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleDark}
        value={isDark}
        style= {{paddingLeft:0}}
        
      /></View>
        </View>

        

        <View><Text style = {styles.mainSetting}>Notifications</Text>
        <View style= {{paddingLeft:30}}>
          <View style = {{flexDirection:'row'}}><Text style = {styles.subSettingText}>Likes</Text><Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isLikes ? 'blue' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleLikes}
        value={isLikes}
        style= {{paddingLeft:40}}
        
      /></View>
      <View style = {{flexDirection:'row'}}><Text style = {styles.subSettingText}>Reviews</Text><Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isReviews ? 'blue' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleReviews}
        value={isReviews}
        style= {{paddingLeft:20}}
        
      /></View>
      <View style = {{flexDirection:'row'}}><Text style = {styles.subSettingText}>New Post</Text><Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isNewPost ? 'blue' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleNewPost}
        value={isNewPost}
        style= {{paddingLeft:10,alignSelf:'flex-end'}}
        
        
      /></View>
          
            </View>
        </View>
        <View><Text style = {styles.mainSetting}>Prefrences</Text>
        <View style= {{paddingLeft:30}}>
            {/* <Text style = {styles.subSettingText}>Favorate food</Text> 
            <Text style = {styles.subSettingText}>Hated foods</Text> 
            <SettingsPrefrence></SettingsPrefrence>
            <Text style = {styles.subSettingText}>Alergys</Text> */}
            
            </View>
        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: '#20232a',
      borderRadius: 6,
      backgroundColor: '#61dafb',
      color: '#20232a',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
    mainSetting:{
      fontSize:20,
      padding:10
      },
    subSetting:{
      alignContent:"space-around",
      flexDirection:'row',
    },
    subSettingText:{
      alignContent:"space-around",
      flexDirection:'row',
      fontSize:15,
      paddingTop:10
    },

  });