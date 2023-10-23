// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
import { getDatabase, ref, set,update,onValue,data,get } from "firebase/database";
import {db} from "../componets/config"

const LoginScreen = () => {
  const [isLogin,setIsLogin] = useState(false);
  const [authLogin, setAuthLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // use later

  const handleLogin = () => {//cahnage it
    // const starCountRef = ref(db, 'user/' + username );
    
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   alert(data)
//   if(data.password == password){
//     (authLogin) => setAuthLogin(true)
//   }else{alert("wrong password")}
//   updateStarCount(postElement, data);
// })

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${username}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

  };



  const handleSignup = () => {
    set(ref(db, 'users/' + username), { // change SET to UPDATE to update current data
      username: username,
      email:email,
      password:password,
      profile:{
        bio: "About...",
        profileImage: './splash.png'
      }
    }).then(()=>{
      //data saved
      alert('data updated')
      setAuthLogin(true)
      
    })
    .catch((error)=>{
      //failed
      alert(error);
    })
  };
  
  if(!authLogin){
    if(!isLogin){
  return (//sign up
    


    <View style={styles.container}>
      <Text>signup Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      />
      <View style ={{flexDirection: 'row', paddingLeft:'40%', justifyContent:'space-between'}}>
      <Button style ={{ justifyContent:'space-between', padding:10}} title="sign up" onPress={handleSignup} />
      <Text style ={{ justifyContent:'space-between', padding:10}} title = "already have an acount" onPress={(isLogin) => setIsLogin(true)}>"already have an acount"</Text>
      </View>
    </View>
  );
    }else{return (//login
    


    <View style={styles.container}>
      <Text>Login Screen</Text>
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(username) => setUsername(username)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      />
      
      <View style ={{flexDirection: 'row', paddingLeft:'40%', justifyContent:'space-between'}}>
      <Button style ={{ justifyContent:'space-between', padding:10}} title="Login" onPress={handleLogin}  />
      <Text style ={{ justifyContent:'space-between', padding:10}} title = "already have an acount" onPress={(isLogin) => setIsLogin(false)}>"dont have an account?"</Text>
      </View>
    </View>
  );
  };
}return(
  <View>
    <Button title='Logout' onPress={setAuthLogin(false)}/>
  </View>
);
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
