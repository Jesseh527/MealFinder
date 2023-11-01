// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
import { getDatabase, ref, set,update,onValue,data,get } from "firebase/database";
import {FIREBASE_AUTH, db} from "../componets/config"
import { async } from '@firebase/util';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { useCurrentUser  } from "../componets/tab"
const LoginScreen = () => {
  const currentUser = useCurrentUser();
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
      console.log("ZZZZZZZZZZZZZZZZZZZZZZZ",currentUser )
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
    try{7
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
 
   
  };
  
  
  return (
    <View style={styles.container}>
      {currentUser  == null ? (
        !isLogin ? ( // Sign up
          <View>
            <Text>Signup Screen</Text>
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
            <View style={{ flexDirection: 'row', paddingLeft: '40%', justifyContent: 'space-between' }}>
              <Button title="Sign up" onPress={handleSignup} />
              <Text onPress={() => setIsLogin(true)}>Already have an account?</Text>
            </View>
          </View>
        ) : (
          // Login
          <View>
            <Text>Login Screen</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', paddingLeft: '40%', justifyContent: 'space-between' }}>
              <Button title="Login" onPress={handleLogin} />
              <Text onPress={() => setIsLogin(false)}>Don't have an account?</Text>
            </View>
          </View>
        )
      ) : (
        // User is logged in
        <View>
        <Text>Hello: {currentUser.email}</Text>
          <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
        </View>
      )}
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
    width:250,
    borderColor: 'gray',
    alignSelf:"center",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default LoginScreen;
