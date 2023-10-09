// ProfilePicture.js
import React, { useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ProfilePicture = () => {
  const [imageSource, setImageSource] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set the selected image as the profile picture
        setImageSource({ uri: response.uri });
      }
    });
  };

  return (
    <View style={[styles.container]}>
      <Image
        source={imageSource || require('./splash.png')}
        style={styles.image}
      />
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default ProfilePicture;
