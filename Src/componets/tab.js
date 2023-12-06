//tab.js
import * as React from 'react';
import { Text, View,Image,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, useWindowDimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RecepiScreen from '../Pages/RecepiSceen';
import HomeScreen from '../Pages/homeScreen';
import SettingsScreen from '../Pages/settingsScreen';
import LoginScreen from '../Pages/loginScreen';
import ProfileScreen from '../Pages/profileScreen';
import AddFoodScreen from '../Pages/addFoodScreen';
import FoodProfile from '../componets/foodProfile'
import { useState,useEffect } from 'react';
import { onAuthStateChanged} from '@firebase/auth';
import { User } from '@firebase/auth';
import { FIREBASE_AUTH } from './config';
export const UserContext = React.createContext();





const Tab = createBottomTabNavigator();

export default function MyTabs() {
   const [currentUser, setUser] = useState(null);//maybe add back <User | null> 
   const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      
        console.log("AAAAAAA1:", authUser);
        setUser(authUser);
        console.log("AAAAA2:", currentUser);
      
    });
  }, []);
  return (
    <UserContext.Provider value={currentUser}>
    <Tab.Navigator screenOptions={{
      tabBarStyle: { position: 'absolute', },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color:'grey'
      },headerBackground: () =>(       
        <View>
          
        
         <Image  style={{height:120, width:120, alignSelf: Platform.OS == 'ios' ? 'flex-start':'center'}} source={require("../../assets/MealFinderLogo2.png")}/>
         
         </View>
      ),
      
    }}>
      <Tab.Screen name="Home"  component={HomeScreen} options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),
    }} />
      <Tab.Screen name="Profile" component={ProfileScreen } options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" color={color} size={size} />
      ),
    }}/>
      
     <Tab.Screen name="Recipe" component={RecepiScreen} options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="fast-food-outline" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Login"  component={LoginScreen}  options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="log-in-outline" color={color} size={size} />
      ),
    }}/>
    <Tab.Screen name="Settings" component={SettingsScreen} options={{
     
     tabBarIcon: ({ color, size }) => (
       <Ionicons name="settings-outline" color={color} size={size} />
     ),
   }}/>
   <Tab.Screen name="Add-Recipe" component={AddFoodScreen} options={{
     tabBarButton:()=> null,
     tabBarIcon: ({ color, size }) => (
       <Ionicons name="settings-outline" color={color} size={size} />
     ),
   }}/>
   <Tab.Screen
          name="Recipie-Profile-name"
          component={FoodProfile}
          options={({ route }) => ({
            tabBarButton: () => null,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
            headerTitle: route.params?.post?.title || 'Recipe Profile',
            headerTitleStyle: {
              maxWidth: windowWidth * 0.5     , // Adjust the percentage as needed
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          })}
        />
    
    </Tab.Navigator>
    </UserContext.Provider>
  );

}
export function useCurrentUser() {
  return React.useContext(UserContext);
}