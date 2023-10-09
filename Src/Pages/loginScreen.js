// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ProfilePicture from '../componets/profilePicture';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here, you can add logic to authenticate the user
    if (username === 'your_username' && password === 'your_password') {
      alert('Login successful!');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
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
