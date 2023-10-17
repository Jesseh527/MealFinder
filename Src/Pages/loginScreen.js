// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ProfilePicture from '../componets/profilePicture';
import { getDatabase, ref, set } from "firebase/database";
import {db} from "../componets/config"

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // use later
  const handleLogin = () => {
    // Here, you can add logic to authenticate the user
    // if (username === 'your_username' && password === 'your_password') {
    //   alert('Login successful!');
    // } else {
    //   alert('Login failed. Please check your credentials.');
    // }
    set(ref(db, 'users/' + username), { // change SET to UPDATE to update current data
      username: email,
      email: username,
      password:password
    }).then(()=>{
      //data saved
      alert('data updated')
    })
    .catch((error)=>{
      //failed
      alert(error);
    })
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
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
      <Button title="Login" onPress={handleLogin} />
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
