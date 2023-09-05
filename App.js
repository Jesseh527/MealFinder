import * as React from 'react';
import { Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

const logoimage =require("./assets/MealFinderLogo2.png");
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    
    <Tab.Navigator screenOptions={{
      tabBarStyle: { position: 'absolute', },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color:'grey'
      },headerBackground: () =>(       
        <View>
          
        
         <Image  style={{height:100, width:100, alignSelf:'center'}} source={require("./assets/MealFinderLogo2.png")}/>
         </View>
      ),
      
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profie" component={SettingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Login" component={SettingsScreen} />
    </Tab.Navigator>
   
  );
}

export default function App() {
  return (
    <NavigationContainer   >
      
      <MyTabs />
    </NavigationContainer>
  );
}
