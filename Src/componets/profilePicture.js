// ProfilePicture.js
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Button,Alert, TouchableOpacity } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import { useCurrentUser  } from "../componets/tab";
import * as ImagePicker from 'expo-image-picker';
import {ref as refS,uploadBytes,getDownloadURL, getStorage} from "firebase/storage";
import { db, uploadToFirebase,listFiles } from '../componets/config';
import { storage } from '../componets/config';
import { ref as refD,set } from 'firebase/database';


const ProfilePicture = () => {
  // const [cameraPermissions, requestPermission] = ImagePicker.useCameraPermissions();

  const currentUser = useCurrentUser();
  const [imageSource, setImageSource] = useState('');
  const [files,setFiles] = useState([]);
  
 
useEffect(() => {
  const func = async () => {
    const imageStorage = getStorage();
    const  imgRef = refS(imageStorage,"images/"+ currentUser.uid);
    // console.log("TTTTTT"+ imgRef);
    await getDownloadURL(imgRef).then((x)=>{
      setImageSource(x);
      
    })
  }
  listFiles().then((listResp)=>{
    const files = listResp.map((value)=>{
      return {name: value.fullPath}
    })
    
    setFiles(files);
    func();
  })
  
},[]);
console.log(files)

/**
 * 
 */

  
  const selectImage  = async () => {
    // No permissions request is necessary for launching the image library
    // const{granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!granted){
    //   return;
    // }
    try{
    const camResponse = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    

    if (!camResponse.canceled) {
      // setImageSource(camResponse.assets[0].uri);
      const {uri} = camResponse.assets[0];//grabs image elemets
      
      // const fileName = uri.split('/').pop();// for image name//add somthing to grab user id or username
      // const fileType =  fileName.split('.').pop();
      // const newFileName = currentUser.uid + fileType;
     const uploadResp = await uploadToFirebase(uri,currentUser.uid ,(v)=> console.log(v));
     const imageStorage = getStorage();
     const  imgRef = refS(imageStorage,"images/"+ currentUser.uid);
     // console.log("TTTTTT"+ imgRef);
     await getDownloadURL(imgRef).then((x)=>{
       setImageSource(x);
       
     })
     listFiles().then((listResp)=>{
      const files = listResp.map((value)=>{
        return {name: value.fullPath}
      })
      
      setFiles(files)
    })

    }
  } catch(e){
    Alert.alert("Error Uploading Image " + e.message);
  }
  };

return (
  <View style={[styles.container]}>
    <TouchableOpacity onPress={selectImage}>
    {imageSource && <Image source={{ uri: imageSource }} style={styles.image} />}
    {/* <Button title="Select Image" onPress={selectImage} /> */}
    </TouchableOpacity>
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
