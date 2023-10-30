// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
import { getDatabase, ref, set,update,onValue,data,get } from "firebase/database";
import {FIREBASE_AUTH, db} from "../componets/config"
import { async } from '@firebase/util';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";

const LoginScreen = () => {
  const [isLogin,setIsLogin] = useState(false);
  const [authLogin, setAuthLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // use later
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth,email,password)
      console.log("log in success: " + email + ":" + password)
      console.log(response)
    }catch(error){
      console.log(error)
      alert("sign in failed: "+ error.message);
    }
    finally{
      setLoading(false);
    }
   };



  const handleSignup = async () => {
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth,email,password)
      console.log(response)
      alert("check your email ");

    }catch(error){
      console.log(error)
      alert("sign in failed: "+ error.message);
    }
    finally{
      setLoading(false);
    }
 
    // set(ref(db, 'users/' + username), { // change SET to UPDATE to update current data
    //   username: username,
    //   email:email,
    //   password:password,
    //   profile:{
    //     bio: "About...",
    //     profileImage: './splash.png'
    //   }
    // }).then(()=>{
    //   //data saved
    //   alert('data updated')
    //   setAuthLogin(true)
      
    // })
    // .catch((error)=>{
    //   //failed
    //   alert(error);
    // })
  };
  
  if(!authLogin){
    if(!isLogin){
  return (//sign up
    


    <View style={styles.container}>
    <KeyboardAvoidingView behavior='padding'>
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
      </KeyboardAvoidingView>
    </View>
  );
    }else{return (//login
    


    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
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
      </KeyboardAvoidingView>
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
