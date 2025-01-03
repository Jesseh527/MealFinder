  import * as React from 'react';
  import { Text, View,Image } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import { useState,useEffect } from 'react';
  import MyTabs from './Src/componets/tab';
  import { User,onAuthStateChanged} from '@firebase/auth';
  import { FIREBASE_AUTH } from './Src/componets/config';

  export default function App() {
    // const[user,setUser] = useState<User | null>(null);
    // useEffect(()=>{
    //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
    //     console.log('user',user);
    //     setUser(user);
    //   });
    // },[]);
    return (
      <NavigationContainer  >
        
        <MyTabs></MyTabs>
      </NavigationContainer>
    );
  }

