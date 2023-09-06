import * as React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RecepiScreen from '../Pages/RecepiSceen';
import HomeScreen from '../Pages/homeScreen';
import SettingsScreen from '../Pages/settingsScreen';
import LoginScreen from '../Pages/loginScreen';
import ProfieScreen from '../Pages/profileScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    
    <Tab.Navigator screenOptions={{
      tabBarStyle: { position: 'absolute', },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color:'grey'
      },headerBackground: () =>(       
        <View>
          
        
         <Image  style={{height:120, width:120, alignSelf:'center'}} source={require("../../assets/MealFinderLogo2.png")}/>
         </View>
      ),
      
    }}>
      <Tab.Screen name="Home"  component={HomeScreen} options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      ),
    }} />
      <Tab.Screen name="Profie" component={ProfieScreen} options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
     
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="settings-outline" color={color} size={size} />
      ),
    }}/>
     <Tab.Screen name="Recepi" component={RecepiScreen} options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="fast-food-outline" color={color} size={size} />
      ),
    }}/>
      <Tab.Screen name="Login" component={LoginScreen} options={{
      
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="log-in-outline" color={color} size={size} />
      ),
    }}/>
    
    </Tab.Navigator>
   
  );

}