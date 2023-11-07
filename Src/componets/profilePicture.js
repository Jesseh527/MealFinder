// ProfilePicture.js
import React, { useState } from 'react';
import { Image, StyleSheet, View, Button } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import { useCurrentUser  } from "../componets/tab";
import * as ImagePicker from 'expo-image-picker';
import {ref as refS,uploadBytes,getDownloadURL} from "firebase/storage";
import { db, uploadToFirebase } from '../componets/config';
import { storage } from '../componets/config';
import { ref as refD,set } from 'firebase/database';


const ProfilePicture = () => {
  // const [cameraPermissions, requestPermission] = ImagePicker.useCameraPermissions();

  const currentUser = useCurrentUser();
  const [imageSource, setImageSource] = useState('');
 
  // const submitData = () =>{
  //   const storageRef = refS(storage,'image');

  //   uploadBytes(storageRef,imageSource).then((snapshot) => {
  //     console.log("uploaded a blod or file")
  //   }).catch((error)=>{
  //     console.log(error.message)
  //   })
  // }

  // const handleChange = (e) =>{
  //   if(e.target.files[0]){
  //     setImageSource(e.target.file[0])
  //   }
  // }
  
  const selectImage  = async () => {
    // No permissions request is necessary for launching the image library
    // const{granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!granted){
    //   return;
    // }
    let camResponse = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("ayo");

    if (!camResponse.canceled) {
      setImageSource(camResponse.assets[0].uri);
      const {uri,fileName} = camResponse.assets[0];
     const uploadResp = await uploadToFirebase(uri,fileName);

    }
  };
//   if(cameraPermissions?.status !== ImagePicker.PermissionStatus.GRANTED){
//   return (
//     <View style={[styles.container]}>
//       <Image
//         source={imageSource}
//         style={styles.image} 
//       />
//       <Button title="Select Image" onPress={requestPermission} />
//     </View>
//   );
// };
return (
  <View style={[styles.container]}>
    {imageSource && <Image source={{ uri: imageSource }} style={styles.image} />}
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
    borderRadius: 200
  },
});

export default ProfilePicture;
