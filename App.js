import * as React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyTabs from './Src/componets/tab';


export default function App() {
  return (
    <NavigationContainer   >
      
      <MyTabs />
    </NavigationContainer>
  );
}

